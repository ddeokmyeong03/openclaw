import { motion } from 'framer-motion'
import { useCardStore } from '@renderer/store/useCardStore'
import { TEMPLATES } from '@renderer/components/templates'
import type { TemplateId } from '@renderer/types'

export function TemplateSelector() {
  const { card, updateCard } = useCardStore()

  const COLOR_PRESETS: Record<TemplateId, { bg: string; accent: string; text: string }> = {
    minimal: { bg: '#FFFFFF', accent: '#3B82F6', text: '#1A1A1A' },
    bold: { bg: '#F8F8F8', accent: '#E11D48', text: '#111111' },
    elegant: { bg: '#F5F0EB', accent: '#92400E', text: '#2C2C2C' },
    gradient: { bg: '#DBEAFE', accent: '#6366F1', text: '#1E1B4B' },
    magazine: { bg: '#FFFFFF', accent: '#F97316', text: '#111827' }
  }

  const handleSelect = (id: TemplateId) => {
    const preset = COLOR_PRESETS[id]
    updateCard({ templateId: id, ...preset })
  }

  return (
    <div className="grid grid-cols-5 gap-2">
      {TEMPLATES.map((t) => {
        const isSelected = card.templateId === t.id
        return (
          <motion.button
            key={t.id}
            onClick={() => handleSelect(t.id)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`relative flex flex-col items-center gap-2 p-2 rounded-xl border-2 transition-all ${
              isSelected
                ? 'border-blue-500 shadow-md shadow-blue-500/20'
                : 'border-transparent hover:border-gray-200 dark:hover:border-gray-600'
            }`}
          >
            {/* Thumbnail */}
            <div
              className="w-full aspect-square rounded-lg overflow-hidden"
              style={{ background: t.thumbnailBg }}
            >
              {/* Mini preview lines */}
              <div className="w-full h-full flex flex-col justify-center items-center gap-1 p-2">
                <div className="w-3/4 h-1 bg-white/40 rounded" />
                <div className="w-1/2 h-1 bg-white/30 rounded" />
                <div className="w-2/3 h-0.5 bg-white/20 rounded" />
              </div>
            </div>
            <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
              {t.nameKo}
            </span>
            {isSelected && (
              <motion.div
                layoutId="template-indicator"
                className="absolute -top-1 -right-1 w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center"
              >
                <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                  <path d="M1.5 4L3 5.5L6.5 2" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </motion.div>
            )}
          </motion.button>
        )
      })}
    </div>
  )
}
