import type { Project } from './index'

type AIPage = {
  pageType: 'cover' | 'body' | 'closing'
  title: string
  body: string
  hashtags: string
  logoText: string
}

declare global {
  interface Window {
    electronAPI: {
      showSaveDialog: () => Promise<string | undefined>
      exportCard: (dataUrl: string, filePath: string) => Promise<{ success: boolean }>
      getProjects: () => Promise<Project[]>
      saveProject: (project: Project) => Promise<{ success: boolean }>
      deleteProject: (id: string) => Promise<{ success: boolean }>
      getSettings: () => Promise<Record<string, string>>
      setSettings: (settings: Record<string, string>) => Promise<{ success: boolean }>
      generatePages: (rawText: string) => Promise<AIPage[]>
    }
  }
}

export {}
