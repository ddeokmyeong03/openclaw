import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useProjectStore } from '@renderer/store/useProjectStore'
import { DEFAULT_PAGE } from '@renderer/store/useCardStore'
import { SettingsModal } from '@renderer/components/SettingsModal'
import type { Project } from '@renderer/types'

function formatDate(isoString: string): string {
  const d = new Date(isoString)
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')}`
}

function ProjectCard({
  project,
  onOpen,
  onDelete
}: {
  project: Project
  onOpen: () => void
  onDelete: () => void
}) {
  const [confirmDelete, setConfirmDelete] = useState(false)

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="group bg-white dark:bg-gray-800 rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
      onClick={onOpen}
    >
      {/* 색상 프리뷰 */}
      <div
        className="h-32 w-full relative"
        style={{ backgroundColor: project.pages[0].backgroundColor }}
      >
        <div
          className="absolute bottom-0 left-0 w-full h-1"
          style={{ backgroundColor: project.pages[0].accentColor }}
        />
        <div className="absolute inset-0 flex items-center justify-center px-4">
          <p
            className="text-center font-bold text-sm line-clamp-2 leading-snug"
            style={{ color: project.pages[0].textColor, fontFamily: project.pages[0].fontFamily }}
          >
            {project.pages[0].title}
          </p>
        </div>
        {/* 삭제 버튼 */}
        <div
          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={(e) => {
            e.stopPropagation()
            setConfirmDelete(true)
          }}
        >
          <div className="w-7 h-7 rounded-full bg-black/40 hover:bg-red-500 transition-colors flex items-center justify-center">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
              <polyline points="3 6 5 6 21 6" />
              <path d="M19 6l-1 14H6L5 6" />
              <path d="M10 11v6M14 11v6" />
              <path d="M9 6V4h6v2" />
            </svg>
          </div>
        </div>
      </div>

      {/* 정보 */}
      <div className="p-3">
        <p className="text-sm font-semibold text-gray-800 dark:text-gray-100 truncate">{project.title}</p>
        <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">{formatDate(project.createdAt)}</p>
      </div>

      {/* 삭제 확인 모달 */}
      <AnimatePresence>
        {confirmDelete && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
            onClick={(e) => {
              e.stopPropagation()
              setConfirmDelete(false)
            }}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 w-80 shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <p className="text-base font-semibold text-gray-800 dark:text-gray-100 mb-1">카드뉴스 삭제</p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-5">
                &ldquo;{project.title}&rdquo;을(를) 삭제하면 복구할 수 없습니다.
              </p>
              <div className="flex gap-2">
                <button
                  className="flex-1 py-2 rounded-xl text-sm text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  onClick={() => setConfirmDelete(false)}
                >
                  취소
                </button>
                <button
                  className="flex-1 py-2 rounded-xl text-sm text-white bg-red-500 hover:bg-red-600 transition-colors"
                  onClick={() => {
                    setConfirmDelete(false)
                    onDelete()
                  }}
                >
                  삭제
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

function NewProjectModal({ onClose, onCreate }: { onClose: () => void; onCreate: (title: string, rawText: string) => void }) {
  const [title, setTitle] = useState('')
  const [rawText, setRawText] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim()) return
    onCreate(title.trim(), rawText.trim())
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, y: 10 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.95, y: 10 }}
        className="bg-white dark:bg-gray-800 rounded-2xl p-6 w-full max-w-lg shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4">새 카드뉴스 만들기</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5">
              프로젝트 이름 <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="예: 봄철 피부 관리 꿀팁"
              maxLength={50}
              autoFocus
              className="w-full px-3 py-2.5 rounded-xl text-sm bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-800 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5">
              줄글 내용 <span className="text-gray-400 font-normal">(선택 · AI 분석에 사용됩니다)</span>
            </label>
            <textarea
              value={rawText}
              onChange={(e) => setRawText(e.target.value)}
              placeholder="카드뉴스로 만들고 싶은 내용을 자유롭게 작성하세요.&#10;예: 봄철에는 피부가 건조해지기 쉽습니다. 수분 크림을 아침저녁으로 바르고..."
              rows={6}
              className="w-full px-3 py-2.5 rounded-xl text-sm bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-800 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
          </div>

          <div className="flex gap-2 pt-1">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 rounded-xl text-sm text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              취소
            </button>
            <button
              type="submit"
              disabled={!title.trim()}
              className="flex-1 py-2.5 rounded-xl text-sm text-white bg-blue-500 hover:bg-blue-600 disabled:opacity-40 disabled:cursor-not-allowed transition-colors font-medium"
            >
              만들기
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  )
}

interface DashboardProps {
  theme: 'light' | 'dark'
  onToggleTheme: () => void
}

export function Dashboard({ theme, onToggleTheme }: DashboardProps) {
  const navigate = useNavigate()
  const { projects, isLoading, loadProjects, saveProject, deleteProject } = useProjectStore()
  const [showModal, setShowModal] = useState(false)
  const [showSettings, setShowSettings] = useState(false)

  useEffect(() => {
    loadProjects()
  }, [loadProjects])

  const handleCreate = async (title: string, rawText: string) => {
    const now = new Date().toISOString()
    const project: Project = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
      title,
      rawText,
      pages: [{ ...DEFAULT_PAGE, id: `page-${Date.now()}` }],
      createdAt: now,
      updatedAt: now
    }
    await saveProject(project)
    setShowModal(false)
    navigate(`/editor/${project.id}`)
  }

  return (
    <div className={`h-[100dvh] flex flex-col ${theme === 'dark' ? 'dark' : ''}`}>
      <div className="flex flex-col h-full bg-gray-50 dark:bg-gray-900">

        {/* 헤더 */}
        <div className="flex items-center justify-between px-8 pt-10 pb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <svg width="12" height="12" viewBox="0 0 10 10" fill="none">
                  <rect x="1" y="1" width="3.5" height="3.5" rx="0.5" fill="white" />
                  <rect x="5.5" y="1" width="3.5" height="3.5" rx="0.5" fill="white" opacity="0.7" />
                  <rect x="1" y="5.5" width="3.5" height="3.5" rx="0.5" fill="white" opacity="0.7" />
                  <rect x="5.5" y="5.5" width="3.5" height="3.5" rx="0.5" fill="white" opacity="0.4" />
                </svg>
              </div>
              <span className="text-xs font-semibold text-gray-400 dark:text-gray-500 tracking-widest uppercase">OpenClaw</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">내 카드뉴스</h1>
          </div>

          <div className="flex items-center gap-2">
            <motion.button
              onClick={() => setShowSettings(true)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="w-9 h-9 rounded-xl flex items-center justify-center text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              title="설정"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="3" />
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
              </svg>
            </motion.button>

            <motion.button
              onClick={onToggleTheme}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="w-9 h-9 rounded-xl flex items-center justify-center text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              title={theme === 'light' ? '다크 모드' : '라이트 모드'}
            >
              {theme === 'light' ? (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="5" />
                  <line x1="12" y1="1" x2="12" y2="3" />
                  <line x1="12" y1="21" x2="12" y2="23" />
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                  <line x1="1" y1="12" x2="3" y2="12" />
                  <line x1="21" y1="12" x2="23" y2="12" />
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                </svg>
              )}
            </motion.button>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold rounded-xl transition-colors shadow-sm shadow-blue-200 dark:shadow-none"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            새로 만들기
          </motion.button>
          </div>
        </div>

        {/* 콘텐츠 */}
        <div className="flex-1 overflow-y-auto px-8 pb-8">
          {isLoading ? (
            <div className="flex items-center justify-center h-64">
              <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : projects.length === 0 ? (
            /* 빈 상태 */
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center justify-center h-64 gap-4"
            >
              <div className="w-16 h-16 rounded-2xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-gray-300 dark:text-gray-600">
                  <rect x="3" y="3" width="8" height="8" rx="1" />
                  <rect x="13" y="3" width="8" height="8" rx="1" />
                  <rect x="3" y="13" width="8" height="8" rx="1" />
                  <rect x="13" y="13" width="8" height="8" rx="1" />
                </svg>
              </div>
              <div className="text-center">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">아직 만든 카드뉴스가 없어요</p>
                <p className="text-xs text-gray-400 dark:text-gray-600 mt-1">새로 만들기 버튼을 눌러 첫 번째 카드뉴스를 만들어보세요</p>
              </div>
              <button
                onClick={() => setShowModal(true)}
                className="mt-1 px-4 py-2 text-sm text-blue-500 border border-blue-200 dark:border-blue-800 rounded-xl hover:bg-blue-50 dark:hover:bg-blue-950 transition-colors"
              >
                새로 만들기
              </button>
            </motion.div>
          ) : (
            <motion.div
              layout
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4"
            >
              <AnimatePresence>
                {projects.map((project) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    onOpen={() => navigate(`/editor/${project.id}`)}
                    onDelete={() => deleteProject(project.id)}
                  />
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </div>

      <AnimatePresence>
        {showModal && (
          <NewProjectModal
            onClose={() => setShowModal(false)}
            onCreate={handleCreate}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showSettings && <SettingsModal onClose={() => setShowSettings(false)} />}
      </AnimatePresence>
    </div>
  )
}
