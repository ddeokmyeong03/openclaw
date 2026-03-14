import { app, shell, BrowserWindow, ipcMain, dialog } from 'electron'
import { join } from 'path'
import { writeFile, readFile } from 'fs/promises'
import type { Project } from '../../src/types'

app.commandLine.appendSwitch('disable-gpu')
app.commandLine.appendSwitch('disable-gpu-sandbox')
app.commandLine.appendSwitch('no-sandbox')

const isDev = process.env.NODE_ENV === 'development'

// --- JSON 파일 헬퍼 ---

async function readJSON<T>(filePath: string, fallback: T): Promise<T> {
  try {
    const data = await readFile(filePath, 'utf-8')
    return JSON.parse(data) as T
  } catch {
    return fallback
  }
}

async function writeJSON(filePath: string, data: unknown): Promise<void> {
  await writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8')
}

// --- 경로 ---

const getProjectsPath = () => join(app.getPath('userData'), 'projects.json')
const getSettingsPath = () => join(app.getPath('userData'), 'settings.json')

// --- AI 페이지 생성 ---

interface AIPage {
  pageType: 'cover' | 'body' | 'closing'
  title: string
  body: string
  hashtags: string
  logoText: string
}

async function callClaudeAPI(apiKey: string, rawText: string): Promise<AIPage[]> {
  const prompt = `당신은 인스타그램 카드뉴스 전문 작가입니다.
다음 텍스트를 분석하여 인스타그램 카드뉴스 구성을 만들어주세요.

[원본 텍스트]
${rawText}

[출력 형식]
마크다운이나 추가 설명 없이 순수 JSON만 반환하세요.
{
  "pages": [
    {
      "pageType": "cover",
      "title": "제목",
      "body": "부제목 또는 핵심 메시지",
      "hashtags": "#태그1 #태그2 #태그3",
      "logoText": "브랜드/카테고리"
    }
  ]
}

[규칙]
- 첫 페이지: cover (표지) — title 20자 이내, body 40자 이내
- 중간 페이지: body (본문) — 핵심 포인트 하나씩, title 15자 이내, body 80자 이내
- 마지막 페이지: closing (마무리) — 요약 또는 행동 유도
- 총 페이지 수: 내용에 맞게 3~7페이지
- hashtags: cover와 closing 페이지에만 포함 (나머지는 빈 문자열 "")
- logoText: cover 페이지에만 포함 (10자 이내), 나머지는 빈 문자열 ""
- 모든 내용은 자연스러운 한국어로 작성`

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01'
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-6',
      max_tokens: 4096,
      messages: [{ role: 'user', content: prompt }]
    })
  })

  if (!response.ok) {
    const err = await response.text()
    throw new Error(`Claude API 오류 (${response.status}): ${err}`)
  }

  const data = await response.json() as { content: { type: string; text: string }[] }
  const text = data.content.find((c) => c.type === 'text')?.text ?? ''

  // JSON 블록 추출 (```json ... ``` 또는 순수 JSON)
  const jsonMatch = text.match(/```json\s*([\s\S]*?)\s*```/) ?? text.match(/(\{[\s\S]*\})/)
  const jsonText = jsonMatch ? (jsonMatch[1] ?? jsonMatch[0]) : text

  const parsed = JSON.parse(jsonText) as { pages: AIPage[] }
  return parsed.pages
}

// --- Window ---

function createWindow(): void {
  const mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 1100,
    minHeight: 700,
    show: false,
    titleBarStyle: process.platform === 'darwin' ? 'hiddenInset' : 'default',
    backgroundColor: '#FAFAFA',
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false,
      contextIsolation: true
    }
  })

  mainWindow.on('ready-to-show', () => mainWindow.show())

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  if (isDev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

app.whenReady().then(() => {
  if (!isDev) {
    app.on('browser-window-created', (_, window) => {
      window.webContents.on('before-input-event', (event, input) => {
        if (input.key === 'F12') event.preventDefault()
      })
    })
  }

  // PNG 내보내기
  ipcMain.handle('show-save-dialog', async () => {
    const result = await dialog.showSaveDialog({
      title: '카드뉴스 저장',
      defaultPath: `카드뉴스_${Date.now()}.png`,
      filters: [{ name: 'PNG Image', extensions: ['png'] }]
    })
    return result.filePath
  })

  ipcMain.handle('export-card', async (_, dataUrl: string, filePath: string) => {
    const base64Data = dataUrl.replace(/^data:image\/png;base64,/, '')
    await writeFile(filePath, base64Data, 'base64')
    return { success: true }
  })

  // 프로젝트 CRUD
  ipcMain.handle('projects:getAll', async () => readJSON<Project[]>(getProjectsPath(), []))

  ipcMain.handle('projects:save', async (_, project: Project) => {
    const projects = await readJSON<Project[]>(getProjectsPath(), [])
    const idx = projects.findIndex((p) => p.id === project.id)
    if (idx >= 0) projects[idx] = project
    else projects.unshift(project)
    await writeJSON(getProjectsPath(), projects)
    return { success: true }
  })

  ipcMain.handle('projects:delete', async (_, id: string) => {
    const projects = await readJSON<Project[]>(getProjectsPath(), [])
    await writeJSON(getProjectsPath(), projects.filter((p) => p.id !== id))
    return { success: true }
  })

  // 설정 (API 키 등)
  ipcMain.handle('settings:get', async () => readJSON<Record<string, string>>(getSettingsPath(), {}))

  ipcMain.handle('settings:set', async (_, settings: Record<string, string>) => {
    await writeJSON(getSettingsPath(), settings)
    return { success: true }
  })

  // AI 카드 생성
  ipcMain.handle('ai:generatePages', async (_, rawText: string) => {
    const settings = await readJSON<Record<string, string>>(getSettingsPath(), {})
    const apiKey = settings.claudeApiKey
    if (!apiKey) throw new Error('Claude API 키가 설정되지 않았습니다. 설정에서 API 키를 입력하세요.')
    return callClaudeAPI(apiKey, rawText)
  })

  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})
