import { app, shell, BrowserWindow, ipcMain, dialog } from 'electron'
import { join } from 'path'
import { writeFile } from 'fs/promises'

// Headless/container environment compatibility
// disable-gpu: GPU 초기화 실패 방지
// disable-software-rasterizer는 제거 — 소프트웨어 렌더러가 있어야 DOM 업데이트가 화면에 반영됨
app.commandLine.appendSwitch('disable-gpu')
app.commandLine.appendSwitch('disable-gpu-sandbox')
app.commandLine.appendSwitch('no-sandbox')

const isDev = process.env.NODE_ENV === 'development'

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

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

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
  // Block shortcut keys in production
  if (!isDev) {
    app.on('browser-window-created', (_, window) => {
      window.webContents.on('before-input-event', (event, input) => {
        if (input.key === 'F12') event.preventDefault()
      })
    })
  }

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

  createWindow()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
