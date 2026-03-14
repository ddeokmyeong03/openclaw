import { motion, AnimatePresence } from 'framer-motion'

type SaveState = 'idle' | 'saving' | 'saved'

interface TopBarProps {
  theme: 'light' | 'dark'
  onToggleTheme: () => void
  isEditOpen?: boolean
  onToggleEdit?: () => void
  onBack?: () => void
  title?: string
  saveState?: SaveState
  onSave?: () => void
  onOpenSettings?: () => void
}

export function TopBar({
  theme,
  onToggleTheme,
  isEditOpen,
  onToggleEdit,
  onBack,
  title,
  saveState,
  onSave,
  onOpenSettings
}: TopBarProps) {
  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 h-12 flex items-center justify-between px-5 border-b border-gray-100 dark:border-gray-700/50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm"
      style={{ WebkitAppRegion: 'drag' } as React.CSSProperties}
    >
      {/* 왼쪽: 뒤로 가기(에디터) or 햄버거(에디터 모바일) */}
      <div className="w-28 flex items-center gap-1" style={{ WebkitAppRegion: 'no-drag' } as React.CSSProperties}>
        {onBack ? (
          <motion.button
            onClick={onBack}
            whileTap={{ scale: 0.9 }}
            className="flex items-center gap-1.5 text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
            aria-label="대시보드로 돌아가기"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="15 18 9 12 15 6" />
            </svg>
            <span className="text-sm hidden sm:inline">대시보드</span>
          </motion.button>
        ) : null}

        {/* 모바일 햄버거 (에디터에서만) */}
        {onToggleEdit && (
          <motion.button
            onClick={onToggleEdit}
            whileTap={{ scale: 0.9 }}
            className="md:hidden w-8 h-8 flex flex-col items-center justify-center gap-1.5 ml-auto"
            aria-label="편집 패널 열기"
          >
            <span className={`block w-5 h-0.5 bg-gray-600 dark:bg-gray-300 transition-all duration-300 origin-center ${isEditOpen ? 'translate-y-2 rotate-45' : ''}`} />
            <span className={`block w-5 h-0.5 bg-gray-600 dark:bg-gray-300 transition-all duration-300 ${isEditOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-5 h-0.5 bg-gray-600 dark:bg-gray-300 transition-all duration-300 origin-center ${isEditOpen ? '-translate-y-2 -rotate-45' : ''}`} />
          </motion.button>
        )}
      </div>

      {/* 중앙: 앱 이름 or 프로젝트 제목 */}
      <div className="flex items-center gap-2 min-w-0">
        {!title ? (
          <>
            <div className="w-5 h-5 rounded bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0">
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <rect x="1" y="1" width="3.5" height="3.5" rx="0.5" fill="white" />
                <rect x="5.5" y="1" width="3.5" height="3.5" rx="0.5" fill="white" opacity="0.7" />
                <rect x="1" y="5.5" width="3.5" height="3.5" rx="0.5" fill="white" opacity="0.7" />
                <rect x="5.5" y="5.5" width="3.5" height="3.5" rx="0.5" fill="white" opacity="0.4" />
              </svg>
            </div>
            <span className="text-sm font-semibold text-gray-800 dark:text-gray-200 tracking-tight">
              카드뉴스 메이커
            </span>
          </>
        ) : (
          <span className="text-sm font-semibold text-gray-800 dark:text-gray-200 truncate max-w-[200px]">
            {title}
          </span>
        )}
      </div>

      {/* 오른쪽: 저장 버튼 + 테마 토글 */}
      <div
        className="w-28 flex items-center justify-end gap-2"
        style={{ WebkitAppRegion: 'no-drag' } as React.CSSProperties}
      >
        {/* 저장 버튼 (에디터에서만) */}
        {onSave && (
          <motion.button
            onClick={onSave}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            disabled={saveState === 'saving'}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors disabled:opacity-50"
            style={{
              backgroundColor: saveState === 'saved' ? '#22c55e' : '#3b82f6',
              color: 'white'
            }}
          >
            <AnimatePresence mode="wait">
              {saveState === 'saving' ? (
                <motion.div key="spin" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <div className="w-3 h-3 border border-white border-t-transparent rounded-full animate-spin" />
                </motion.div>
              ) : saveState === 'saved' ? (
                <motion.div key="check" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </motion.div>
              ) : (
                <motion.div key="save" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
                    <polyline points="17 21 17 13 7 13 7 21" />
                    <polyline points="7 3 7 8 15 8" />
                  </svg>
                </motion.div>
              )}
            </AnimatePresence>
            <span className="hidden sm:inline">
              {saveState === 'saving' ? '저장 중' : saveState === 'saved' ? '저장됨' : '저장'}
            </span>
          </motion.button>
        )}

        {/* 설정 버튼 */}
        {onOpenSettings && (
          <motion.button
            onClick={onOpenSettings}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            title="설정"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="3" />
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
            </svg>
          </motion.button>
        )}

        {/* 테마 토글 */}
        <motion.button
          onClick={onToggleTheme}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
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
      </div>
    </header>
  )
}
