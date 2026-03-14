import { useCardStore } from '@renderer/store/useCardStore'

const PAGE_TYPE_LABEL: Record<string, string> = {
  cover: '표지',
  body: '본문',
  closing: '마무리'
}

export function ContentEditor() {
  const { currentPage, currentPageIndex, pages, updateCurrentPage } = useCardStore()

  return (
    <div className="space-y-5">
      {/* Page info badge */}
      <div className="flex items-center gap-2">
        <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400">
          {currentPageIndex + 1} / {pages.length}
        </span>
        <span className="text-xs text-gray-400 dark:text-gray-500">
          {PAGE_TYPE_LABEL[currentPage.pageType] ?? currentPage.pageType}
        </span>
      </div>

      {/* Category */}
      <div>
        <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
          카테고리
        </label>
        <input
          type="text"
          value={currentPage.category || ''}
          onChange={(e) => updateCurrentPage({ category: e.target.value })}
          placeholder="예: 건강, 뷰티, 여행..."
          maxLength={20}
          className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
        />
      </div>

      {/* Title */}
      <div>
        <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
          제목
        </label>
        <textarea
          value={currentPage.title}
          onChange={(e) => updateCurrentPage({ title: e.target.value })}
          rows={2}
          maxLength={50}
          placeholder="카드뉴스 제목을 입력하세요"
          className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
        />
        <div className="flex justify-end mt-1">
          <span className="text-xs text-gray-400">{currentPage.title.length}/50</span>
        </div>
      </div>

      {/* Subtitle */}
      <div>
        <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
          소제목
        </label>
        <input
          type="text"
          value={currentPage.subtitle || ''}
          onChange={(e) => updateCurrentPage({ subtitle: e.target.value })}
          placeholder="부제목이나 핵심 키워드"
          maxLength={40}
          className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
        />
      </div>

      {/* Body */}
      <div>
        <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
          본문
        </label>
        <textarea
          value={currentPage.body}
          onChange={(e) => updateCurrentPage({ body: e.target.value })}
          rows={4}
          maxLength={200}
          placeholder="핵심 메시지를 간결하게 작성하세요"
          className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
        />
        <div className="flex justify-end mt-1">
          <span className="text-xs text-gray-400">{currentPage.body.length}/200</span>
        </div>
      </div>

      {/* Hashtags */}
      <div>
        <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
          해시태그
        </label>
        <input
          type="text"
          value={currentPage.hashtags}
          onChange={(e) => updateCurrentPage({ hashtags: e.target.value })}
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
          value={currentPage.logoText || ''}
          onChange={(e) => updateCurrentPage({ logoText: e.target.value })}
          placeholder="MY BRAND"
          maxLength={20}
          className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
        />
      </div>
    </div>
  )
}
