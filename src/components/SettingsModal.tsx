import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { storageGetSettings, storageSetSettings } from '@renderer/lib/storage'

interface SettingsModalProps {
  onClose: () => void
}

export function SettingsModal({ onClose }: SettingsModalProps) {
  const [apiKey, setApiKey] = useState('')
  const [unsplashKey, setUnsplashKey] = useState('')
  const [saved, setSaved] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    storageGetSettings().then((s) => {
      setApiKey(s.claudeApiKey ?? '')
      setUnsplashKey(s.unsplashAccessKey ?? '')
      setLoading(false)
    })
  }, [])

  const handleSave = async () => {
    const current = await storageGetSettings()
    await storageSetSettings({ ...current, claudeApiKey: apiKey.trim(), unsplashAccessKey: unsplashKey.trim() })
    setSaved(true)
    setTimeout(() => {
      setSaved(false)
      onClose()
    }, 1000)
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
        initial={{ scale: 0.95, y: 8 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.95, y: 8 }}
        className="bg-white dark:bg-gray-800 rounded-2xl p-6 w-full max-w-md shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-base font-bold text-gray-900 dark:text-gray-100">설정</h2>
          <button
            onClick={onClose}
            className="w-7 h-7 flex items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1.5">
              Claude API 키
            </label>
            <p className="text-xs text-gray-400 dark:text-gray-500 mb-2">
              AI 카드 자동 생성에 사용됩니다.{' '}
              <span className="text-blue-500">console.anthropic.com</span>
              에서 발급받을 수 있습니다.
            </p>
            {loading ? (
              <div className="h-10 bg-gray-100 dark:bg-gray-700 rounded-xl animate-pulse" />
            ) : (
              <input
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="sk-ant-..."
                className="w-full px-3 py-2.5 rounded-xl text-sm bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-800 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
              />
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1.5">
              Unsplash Access Key
            </label>
            <p className="text-xs text-gray-400 dark:text-gray-500 mb-2">
              이미지 검색에 사용됩니다.{' '}
              <span className="text-blue-500">unsplash.com/developers</span>
              에서 발급받을 수 있습니다.
            </p>
            {loading ? (
              <div className="h-10 bg-gray-100 dark:bg-gray-700 rounded-xl animate-pulse" />
            ) : (
              <input
                type="password"
                value={unsplashKey}
                onChange={(e) => setUnsplashKey(e.target.value)}
                placeholder="Access Key..."
                className="w-full px-3 py-2.5 rounded-xl text-sm bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-800 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
              />
            )}
          </div>

          <div className="flex gap-2 pt-1">
            <button
              onClick={onClose}
              className="flex-1 py-2.5 rounded-xl text-sm text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              취소
            </button>
            <button
              onClick={handleSave}
              disabled={loading || saved}
              className="flex-1 py-2.5 rounded-xl text-sm text-white font-semibold transition-colors disabled:opacity-50"
              style={{ backgroundColor: saved ? '#22c55e' : '#3b82f6' }}
            >
              {saved ? '저장됨 ✓' : '저장'}
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
