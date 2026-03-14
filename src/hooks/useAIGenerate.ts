import { useCardStore } from '@renderer/store/useCardStore'
import { isElectron } from '@renderer/lib/storage'
import type { CardPage } from '@renderer/types'

export function useAIGenerate() {
  const { currentPage, rawText, setPages, setIsGenerating } = useCardStore()

  const generate = async (): Promise<{ success: boolean; error?: string }> => {
    if (!rawText.trim()) {
      return { success: false, error: '소재 텍스트를 먼저 입력해주세요.' }
    }
    if (!isElectron) {
      return { success: false, error: 'AI 생성은 Electron 앱에서만 사용 가능합니다.' }
    }

    setIsGenerating(true)
    try {
      const aiPages = await window.electronAPI.generatePages(rawText)

      // AI 응답(내용) + 현재 페이지 스타일을 합쳐 CardPage[] 생성
      const style = {
        templateId: currentPage.templateId,
        backgroundColor: currentPage.backgroundColor,
        accentColor: currentPage.accentColor,
        textColor: currentPage.textColor,
        fontFamily: currentPage.fontFamily,
        fontSize: currentPage.fontSize
      }

      const pages: CardPage[] = aiPages.map((ap, i) => ({
        id: `page-${Date.now()}-${i}`,
        ...style,
        pageType: ap.pageType,
        title: ap.title,
        subtitle: ap.subtitle || undefined,
        category: ap.category || undefined,
        body: ap.body,
        hashtags: ap.hashtags,
        logoText: ap.logoText || undefined
      }))

      setPages(pages)
      return { success: true }
    } catch (err) {
      const message = err instanceof Error ? err.message : '알 수 없는 오류가 발생했습니다.'
      return { success: false, error: message }
    } finally {
      setIsGenerating(false)
    }
  }

  return { generate }
}
