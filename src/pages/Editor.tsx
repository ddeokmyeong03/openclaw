import { useEffect, useState, useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { TopBar } from '@renderer/components/TopBar'
import { LeftPanel } from '@renderer/components/LeftPanel'
import { RightPanel } from '@renderer/components/RightPanel'
import { SettingsModal } from '@renderer/components/SettingsModal'
import { useCardStore } from '@renderer/store/useCardStore'
import { useProjectStore } from '@renderer/store/useProjectStore'

type SaveState = 'idle' | 'saving' | 'saved'

interface EditorProps {
  theme: 'light' | 'dark'
  onToggleTheme: () => void
}

export function Editor({ theme, onToggleTheme }: EditorProps) {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { pages, rawText, setPages, setRawText } = useCardStore()
  const { projects, loadProjects, saveProject } = useProjectStore()
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [saveState, setSaveState] = useState<SaveState>('idle')
  const [projectTitle, setProjectTitle] = useState('')
  const [notFound, setNotFound] = useState(false)
  const [showSettings, setShowSettings] = useState(false)

  // 프로젝트 로드
  useEffect(() => {
    const init = async () => {
      let list = projects
      if (list.length === 0) {
        await loadProjects()
        list = useProjectStore.getState().projects
      }
      const project = list.find((p) => p.id === id)
      if (!project) {
        setNotFound(true)
        return
      }
      setProjectTitle(project.title)
      setPages(project.pages)
      setRawText(project.rawText)
    }
    init()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  const handleSave = useCallback(async () => {
    if (!id || saveState === 'saving') return
    setSaveState('saving')
    const list = useProjectStore.getState().projects
    const project = list.find((p) => p.id === id)
    if (!project) return
    const currentPages = useCardStore.getState().pages
    const currentRawText = useCardStore.getState().rawText
    await saveProject({
      ...project,
      pages: currentPages,
      rawText: currentRawText,
      updatedAt: new Date().toISOString()
    })
    setSaveState('saved')
    setTimeout(() => setSaveState('idle'), 2000)
  }, [id, saveProject, saveState])

  // Ctrl+S / Cmd+S
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault()
        handleSave()
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [handleSave])

  if (notFound) {
    return (
      <div className={`h-[100dvh] flex flex-col items-center justify-center gap-4 ${theme === 'dark' ? 'dark' : ''}`}>
        <div className="bg-gray-50 dark:bg-gray-900 w-full h-full flex flex-col items-center justify-center gap-4">
          <p className="text-gray-500 dark:text-gray-400">프로젝트를 찾을 수 없습니다.</p>
          <button
            onClick={() => navigate('/')}
            className="px-4 py-2 text-sm text-blue-500 border border-blue-200 rounded-xl hover:bg-blue-50 transition-colors"
          >
            대시보드로 돌아가기
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className={`h-[100dvh] flex flex-col ${theme === 'dark' ? 'dark' : ''}`}>
      <div className="flex flex-col h-full bg-panel-light dark:bg-panel-dark">
        <TopBar
          theme={theme}
          onToggleTheme={onToggleTheme}
          isEditOpen={isEditOpen}
          onToggleEdit={() => setIsEditOpen((v) => !v)}
          onBack={() => navigate('/')}
          title={projectTitle}
          saveState={saveState}
          onSave={handleSave}
          onOpenSettings={() => setShowSettings(true)}
        />

        <main className="flex flex-row flex-1 min-h-0 pt-12">
          <aside className={`
            md:relative md:flex md:flex-col md:w-[380px] md:flex-shrink-0 md:h-full
            md:border-r md:border-gray-100 md:dark:border-gray-700/50
            md:bg-panel-light md:dark:bg-panel-dark md:translate-x-0 md:z-auto
            fixed inset-y-0 left-0 top-12 z-40 w-4/5 max-w-[380px] flex flex-col h-[calc(100dvh-3rem)]
            bg-panel-light dark:bg-panel-dark border-r border-gray-100 dark:border-gray-700/50
            transition-transform duration-300
            ${isEditOpen ? 'translate-x-0' : '-translate-x-full'}
          `}>
            <LeftPanel />
          </aside>

          {isEditOpen && (
            <div
              className="md:hidden fixed inset-0 top-12 z-30 bg-black/40"
              onClick={() => setIsEditOpen(false)}
            />
          )}

          <section className="flex flex-1 h-full bg-gray-50 dark:bg-gray-900 items-center justify-center overflow-hidden">
            <RightPanel />
          </section>
        </main>
      </div>

      <AnimatePresence>
        {showSettings && <SettingsModal onClose={() => setShowSettings(false)} />}
      </AnimatePresence>
    </div>
  )
}
