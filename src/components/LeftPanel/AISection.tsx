import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useCardStore } from '@renderer/store/useCardStore'
import { useAIGenerate } from '@renderer/hooks/useAIGenerate'

export function AISection() {
  const { rawText, setRawText, isGenerating } = useCardStore()
  const { generate } = useAIGenerate()
  const [error, setError] = useState<string | null>(null)

  const handleGenerate = async () => {
    setError(null)
    const result = await generate()
    if (!result.success) {
      setError(result.error ?? '생성 실패')
    }
  }

  return (
    <div className="space-y-3">
      <div>
        <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
          소재 텍스트
        </label>
        <textarea
          value={rawText}
          onChange={(e) => setRawText(e.target.value)}
          rows={5}
          placeholder="카드뉴스로 만들고 싶은 내용을 자유롭게 작성하세요.&#10;&#10;예: 봄철에는 피부가 건조해지기 쉽습니다. 수분 크림을 아침저녁으로 바르고..."
          className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
        />
      </div>

      <motion.button
        onClick={handleGenerate}
        disabled={isGenerating || !rawText.trim()}
        whileHover={isGenerating || !rawText.trim() ? {} : { scale: 1.02 }}
        whileTap={isGenerating || !rawText.trim() ? {} : { scale: 0.98 }}
        className="w-full py-3 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        style={{
          background: isGenerating || !rawText.trim()
            ? undefined
            : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          backgroundColor: isGenerating || !rawText.trim() ? '#e5e7eb' : undefined,
          color: isGenerating || !rawText.trim() ? '#9ca3af' : 'white'
        }}
      >
        <AnimatePresence mode="wait">
          {isGenerating ? (
            <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="flex items-center gap-2">
              <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              AI가 카드를 구성하는 중...
            </motion.div>
          ) : (
            <motion.div key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="flex items-center gap-2">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
              AI로 카드 자동 생성
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="text-xs text-red-500 dark:text-red-400 bg-red-50 dark:bg-red-950/30 rounded-xl px-3 py-2"
          >
            {error}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
