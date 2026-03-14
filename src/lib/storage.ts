/**
 * Electron IPC ↔ localStorage 추상화
 * Electron 환경: electronAPI IPC 사용
 * 웹 환경: localStorage 사용
 */

import type { Project } from '@renderer/types'

export const isElectron = typeof window !== 'undefined' && !!window.electronAPI

// --- 프로젝트 ---

export async function storageGetProjects(): Promise<Project[]> {
  if (isElectron) return window.electronAPI.getProjects()
  try {
    return JSON.parse(localStorage.getItem('projects') ?? '[]') as Project[]
  } catch {
    return []
  }
}

export async function storageSaveProject(project: Project): Promise<void> {
  if (isElectron) {
    await window.electronAPI.saveProject(project)
    return
  }
  const projects = await storageGetProjects()
  const idx = projects.findIndex((p) => p.id === project.id)
  if (idx >= 0) projects[idx] = project
  else projects.unshift(project)
  localStorage.setItem('projects', JSON.stringify(projects))
}

export async function storageDeleteProject(id: string): Promise<void> {
  if (isElectron) {
    await window.electronAPI.deleteProject(id)
    return
  }
  const projects = await storageGetProjects()
  localStorage.setItem('projects', JSON.stringify(projects.filter((p) => p.id !== id)))
}

// --- 설정 ---

export async function storageGetSettings(): Promise<Record<string, string>> {
  if (isElectron) return window.electronAPI.getSettings()
  try {
    return JSON.parse(localStorage.getItem('settings') ?? '{}') as Record<string, string>
  } catch {
    return {}
  }
}

export async function storageSetSettings(settings: Record<string, string>): Promise<void> {
  if (isElectron) {
    await window.electronAPI.setSettings(settings)
    return
  }
  localStorage.setItem('settings', JSON.stringify(settings))
}
