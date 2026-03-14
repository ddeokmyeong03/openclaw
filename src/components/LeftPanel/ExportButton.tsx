import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useExport } from '@renderer/hooks/useExport'

type ExportState = 'idle' | 'loading' | 'done' | 'error'

export function ExportButton() {
  const { exportToPNG, isExporting } = useExport()
  const [state, setState] = useState<ExportState>('idle')

  const handleExport = async () => {
    setState('loading')
    const success = await exportToPNG()
    if (success) {
      setState('done')
      setTimeout(() => setState('idle'), 2500)
    } else {
      setState('error')
      setTimeout(() => setState('idle'), 2500)
    }
  }

  const bgClass =
    state === 'done'
      ? 'bg-green-500 text-white'
      : state === 'error'
      ? 'bg-red-500 text-white'
      : state === 'loading'
      ? 'bg-gray-300 dark:bg-gray-600 text-gray-500 cursor-not-allowed'
      : 'bg-blue-500 hover:bg-blue-600 text-white shadow-lg shadow-blue-500/30'

  return (
    <motion.button
      onClick={handleExport}
      disabled={isExporting}
      whileHover={{ scale: isExporting ? 1 : 1.02 }}
      whileTap={{ scale: isExporting ? 1 : 0.98 }}
      className={`w-full py-4 rounded-2xl font-bold text-base transition-all relative overflow-hidden ${bgClass}`}
    >
      <AnimatePresence mode="wait">
        {state === 'loading' ? (
          <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="flex items-center justify-center gap-2">
            <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            <span>내보내는 중...</span>
          </motion.div>
        ) : state === 'done' ? (
          <motion.div key="done" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className="flex items-center justify-center gap-2">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M3 9L7 13L15 5" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span>저장 완료!</span>
          </motion.div>
        ) : state === 'error' ? (
          <motion.div key="error" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className="flex items-center justify-center gap-2">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M9 4V9M9 12.5V13" stroke="white" strokeWidth="2" strokeLinecap="round" />
              <circle cx="9" cy="9" r="7.5" stroke="white" strokeWidth="1.5" />
            </svg>
            <span>저장 실패 — 콘솔 확인</span>
          </motion.div>
        ) : (
          <motion.div key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="flex items-center justify-center gap-2">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M9 2V11M9 11L6 8M9 11L12 8" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M3 14H15" stroke="white" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <span>PNG로 내보내기</span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  )
}
