import { contextBridge, ipcRenderer } from 'electron'
import type { Project } from '../../src/types'

contextBridge.exposeInMainWorld('electronAPI', {
  // PNG 내보내기
  showSaveDialog: (): Promise<string | undefined> =>
    ipcRenderer.invoke('show-save-dialog'),
  exportCard: (dataUrl: string, filePath: string): Promise<{ success: boolean }> =>
    ipcRenderer.invoke('export-card', dataUrl, filePath),

  // 프로젝트 CRUD
  getProjects: (): Promise<Project[]> =>
    ipcRenderer.invoke('projects:getAll'),
  saveProject: (project: Project): Promise<{ success: boolean }> =>
    ipcRenderer.invoke('projects:save', project),
  deleteProject: (id: string): Promise<{ success: boolean }> =>
    ipcRenderer.invoke('projects:delete', id),

  // 설정
  getSettings: (): Promise<Record<string, string>> =>
    ipcRenderer.invoke('settings:get'),
  setSettings: (settings: Record<string, string>): Promise<{ success: boolean }> =>
    ipcRenderer.invoke('settings:set', settings),

  // AI 카드 생성
  generatePages: (rawText: string): Promise<{
    pageType: 'cover' | 'body' | 'closing'
    title: string
    subtitle: string
    category: string
    body: string
    hashtags: string
    logoText: string
  }[]> => ipcRenderer.invoke('ai:generatePages', rawText),

  // AI 사진 분석 (색상 추출)
  analyzePhoto: (imageBase64: string, mimeType: string): Promise<{
    backgroundColor: string
    accentColor: string
    textColor: string
    templateId: string
  }> => ipcRenderer.invoke('ai:analyzePhoto', imageBase64, mimeType)
})
