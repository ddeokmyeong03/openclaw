import { useCardStore } from '@renderer/store/useCardStore'

export function ContentEditor() {
  const { card, updateCard } = useCardStore()

  return (
    <div className="space-y-5">
      {/* Title */}
      <div>
        <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
          제목
        </label>
        <textarea
          value={card.title}
          onChange={(e) => updateCard({ title: e.target.value })}
          rows={2}
          maxLength={50}
          placeholder="카드뉴스 제목을 입력하세요"
          className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
        />
        <div className="flex justify-end mt-1">
          <span className="text-xs text-gray-400">{card.title.length}/50</span>
        </div>
      </div>

      {/* Body */}
      <div>
        <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
          본문
        </label>
        <textarea
          value={card.body}
          onChange={(e) => updateCard({ body: e.target.value })}
          rows={4}
          maxLength={200}
          placeholder="핵심 메시지를 간결하게 작성하세요"
          className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
        />
        <div className="flex justify-end mt-1">
          <span className="text-xs text-gray-400">{card.body.length}/200</span>
        </div>
      </div>

      {/* Hashtags */}
      <div>
        <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
          해시태그
        </label>
        <input
          type="text"
          value={card.hashtags}
          onChange={(e) => updateCard({ hashtags: e.target.value })}
          placeholder="#태그1 #태그2 #태그3"
          className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
        />
      </div>

      {/* Logo/Brand text */}
      <div>
        <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
          브랜드명
        </label>
        <input
          type="text"
          value={card.logoText || ''}
          onChange={(e) => updateCard({ logoText: e.target.value })}
          placeholder="MY BRAND"
          maxLength={20}
          className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
        />
      </div>
    </div>
  )
}
