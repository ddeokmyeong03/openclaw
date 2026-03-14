import { motion } from 'framer-motion'
import { useCardStore } from '@renderer/store/useCardStore'

function NavButton({
  onClick,
  disabled,
  children,
  title
}: {
  onClick: () => void
  disabled: boolean
  children: React.ReactNode
  title: string
}) {
  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      whileTap={disabled ? {} : { scale: 0.9 }}
      title={title}
      className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors text-sm font-medium"
    >
      {children}
    </motion.button>
  )
}

export function PageNavigation() {
  const { pages, currentPageIndex, setCurrentPage } = useCardStore()
  const total = pages.length
  const current = currentPageIndex + 1

  if (total <= 1) return null

  return (
    <div className="flex items-center gap-1 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl px-3 py-1.5 shadow-sm border border-gray-100 dark:border-gray-700">
      {/* 첫 장 */}
      <NavButton
        onClick={() => setCurrentPage(0)}
        disabled={currentPageIndex === 0}
        title="첫 장"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <polyline points="11 17 6 12 11 7" />
          <polyline points="18 17 13 12 18 7" />
        </svg>
      </NavButton>

      {/* 앞 장 */}
      <NavButton
        onClick={() => setCurrentPage(currentPageIndex - 1)}
        disabled={currentPageIndex === 0}
        title="앞 장"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </NavButton>

      {/* 현재 / 전체 */}
      <span className="px-2 text-sm font-semibold text-gray-700 dark:text-gray-200 tabular-nums min-w-[48px] text-center">
        {current} / {total}
      </span>

      {/* 뒷 장 */}
      <NavButton
        onClick={() => setCurrentPage(currentPageIndex + 1)}
        disabled={currentPageIndex === total - 1}
        title="뒷 장"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </NavButton>

      {/* 맨 뒷 장 */}
      <NavButton
        onClick={() => setCurrentPage(total - 1)}
        disabled={currentPageIndex === total - 1}
        title="맨 뒷 장"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <polyline points="13 17 18 12 13 7" />
          <polyline points="6 17 11 12 6 7" />
        </svg>
      </NavButton>
    </div>
  )
}
