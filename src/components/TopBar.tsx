import { motion } from 'framer-motion'

interface TopBarProps {
  theme: 'light' | 'dark'
  onToggleTheme: () => void
  isEditOpen?: boolean
  onToggleEdit?: () => void
}

export function TopBar({ theme, onToggleTheme, isEditOpen, onToggleEdit }: TopBarProps) {
  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 h-12 flex items-center justify-between px-5 border-b border-gray-100 dark:border-gray-700/50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm"
      style={{ WebkitAppRegion: 'drag' } as React.CSSProperties}
    >
      {/* Hamburger button — mobile only */}
      <div className="w-20 flex items-center" style={{ WebkitAppRegion: 'no-drag' } as React.CSSProperties}>
        <motion.button
          onClick={onToggleEdit}
          whileTap={{ scale: 0.9 }}
          className="md:hidden w-8 h-8 flex flex-col items-center justify-center gap-1.5"
          aria-label="편집 패널 열기"
        >
          <span className={`block w-5 h-0.5 bg-gray-600 dark:bg-gray-300 transition-all duration-300 origin-center ${isEditOpen ? 'translate-y-2 rotate-45' : ''}`} />
          <span className={`block w-5 h-0.5 bg-gray-600 dark:bg-gray-300 transition-all duration-300 ${isEditOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-5 h-0.5 bg-gray-600 dark:bg-gray-300 transition-all duration-300 origin-center ${isEditOpen ? '-translate-y-2 -rotate-45' : ''}`} />
        </motion.button>
      </div>

      {/* App name */}
      <div className="flex items-center gap-2">
        <div className="w-5 h-5 rounded bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
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
      </div>

      {/* Right controls */}
      <div
        className="flex items-center gap-2"
        style={{ WebkitAppRegion: 'no-drag' } as React.CSSProperties}
      >
        {/* Theme toggle */}
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
