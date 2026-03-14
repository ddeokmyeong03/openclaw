import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('electronAPI', {
  showSaveDialog: (): Promise<string | undefined> =>
    ipcRenderer.invoke('show-save-dialog'),
  exportCard: (dataUrl: string, filePath: string): Promise<{ success: boolean }> =>
    ipcRenderer.invoke('export-card', dataUrl, filePath)
})
