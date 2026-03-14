import { useCardStore } from '@renderer/store/useCardStore'

const PALETTE_PRESETS = [
  { label: '블루', bg: '#FFFFFF', accent: '#3B82F6', text: '#1A1A1A' },
  { label: '로즈', bg: '#FFF1F2', accent: '#E11D48', text: '#1A0A0E' },
  { label: '아메', bg: '#F5F0EB', accent: '#92400E', text: '#2C1810' },
  { label: '퍼플', bg: '#EDE9FE', accent: '#7C3AED', text: '#1E1B4B' },
  { label: '그린', bg: '#F0FDF4', accent: '#16A34A', text: '#052E16' },
  { label: '다크', bg: '#1A1A2E', accent: '#E94560', text: '#FFFFFF' }
]

interface ColorSwatchProps {
  label: string
  value: string
  onChange: (v: string) => void
}

function ColorSwatch({ label, value, onChange }: ColorSwatchProps) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-gray-600 dark:text-gray-400">{label}</span>
      <div className="flex items-center gap-2">
        <div
          className="w-8 h-8 rounded-lg border border-gray-200 dark:border-gray-600 cursor-pointer shadow-sm overflow-hidden"
          style={{ backgroundColor: value }}
        >
          <input
            type="color"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="opacity-0 w-full h-full cursor-pointer"
          />
        </div>
        <span className="text-xs font-mono text-gray-500 dark:text-gray-400 w-16">{value}</span>
      </div>
    </div>
  )
}

export function ColorPicker() {
  const { card, updateCard } = useCardStore()

  return (
    <div className="space-y-4">
      {/* Quick palette presets */}
      <div>
        <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
          팔레트 프리셋
        </label>
        <div className="flex gap-2 flex-wrap">
          {PALETTE_PRESETS.map((p) => (
            <button
              key={p.label}
              onClick={() => updateCard({ backgroundColor: p.bg, accentColor: p.accent, textColor: p.text })}
              title={p.label}
              className="w-8 h-8 rounded-full border-2 border-white dark:border-gray-700 shadow-md hover:scale-110 transition-transform overflow-hidden relative"
              style={{ background: `linear-gradient(135deg, ${p.bg} 50%, ${p.accent} 50%)` }}
            />
          ))}
        </div>
      </div>

      {/* Individual color pickers */}
      <div className="space-y-3">
        <ColorSwatch
          label="배경 색상"
          value={card.backgroundColor}
          onChange={(v) => updateCard({ backgroundColor: v })}
        />
        <ColorSwatch
          label="강조 색상"
          value={card.accentColor}
          onChange={(v) => updateCard({ accentColor: v })}
        />
        <ColorSwatch
          label="텍스트 색상"
          value={card.textColor}
          onChange={(v) => updateCard({ textColor: v })}
        />
      </div>
    </div>
  )
}
