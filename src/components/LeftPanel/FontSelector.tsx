import { useCardStore } from '@renderer/store/useCardStore'
import type { FontFamily } from '@renderer/types'

const FONTS: { value: FontFamily; label: string; preview: string }[] = [
  { value: 'Pretendard', label: 'Pretendard', preview: '가나다 ABCabc' },
  { value: 'Noto Sans KR', label: 'Noto Sans KR', preview: '가나다 ABCabc' },
  { value: 'Noto Serif KR', label: 'Noto Serif KR', preview: '가나다 ABCabc' },
  { value: 'Black Han Sans', label: 'Black Han Sans', preview: '가나다 ABC' },
  { value: 'Gowun Dodum', label: 'Gowun Dodum', preview: '가나다 ABCabc' }
]

export function FontSelector() {
  const { card, updateCard } = useCardStore()

  return (
    <div className="space-y-4">
      {/* Font family */}
      <div>
        <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
          폰트
        </label>
        <div className="space-y-2">
          {FONTS.map((f) => (
            <button
              key={f.value}
              onClick={() => updateCard({ fontFamily: f.value })}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl border transition-all text-left ${
                card.fontFamily === f.value
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/30'
                  : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
              }`}
            >
              <span
                className="text-sm font-medium text-gray-800 dark:text-gray-200"
                style={{ fontFamily: `'${f.value}', sans-serif` }}
              >
                {f.preview}
              </span>
              <span className="text-xs text-gray-400 ml-2 flex-shrink-0">{f.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Font size */}
      <div>
        <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
          크기
        </label>
        <div className="flex gap-2">
          {(['sm', 'md', 'lg'] as const).map((size) => (
            <button
              key={size}
              onClick={() => updateCard({ fontSize: size })}
              className={`flex-1 py-2.5 rounded-xl border text-sm font-semibold transition-all ${
                card.fontSize === size
                  ? 'border-blue-500 bg-blue-500 text-white shadow-md'
                  : 'border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-400 hover:border-blue-300'
              }`}
            >
              {size === 'sm' ? '소' : size === 'md' ? '중' : '대'}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
