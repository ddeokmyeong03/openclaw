import { create } from 'zustand'
import type { Project } from '@renderer/types'

interface ProjectStore {
  projects: Project[]
  isLoading: boolean
  loadProjects: () => Promise<void>
  saveProject: (project: Project) => Promise<void>
  deleteProject: (id: string) => Promise<void>
}

export const useProjectStore = create<ProjectStore>((set, get) => ({
  projects: [],
  isLoading: false,

  loadProjects: async () => {
    set({ isLoading: true })
    const projects = await window.electronAPI.getProjects()
    set({ projects, isLoading: false })
  },

  saveProject: async (project) => {
    await window.electronAPI.saveProject(project)
    const { projects } = get()
    const idx = projects.findIndex((p) => p.id === project.id)
    if (idx >= 0) {
      const updated = [...projects]
      updated[idx] = project
      set({ projects: updated })
    } else {
      set({ projects: [project, ...projects] })
    }
  },

  deleteProject: async (id) => {
    await window.electronAPI.deleteProject(id)
    set({ projects: get().projects.filter((p) => p.id !== id) })
  }
}))
