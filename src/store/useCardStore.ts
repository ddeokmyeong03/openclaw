import { create } from 'zustand'
import type { CardData, CardPage } from '@renderer/types'

export const DEFAULT_CARD: CardData = {
  title: '당신의 브랜드 이야기',
  body: '핵심 메시지를 간결하게 전달하세요. 독자의 관심을 사로잡는 한 문장이면 충분합니다.',
  hashtags: '#카드뉴스 #인스타그램 #콘텐츠마케팅',
  templateId: 'minimal',
  backgroundColor: '#FFFFFF',
  accentColor: '#3B82F6',
  textColor: '#1A1A1A',
  fontFamily: 'Pretendard',
  fontSize: 'md',
  logoText: 'MY BRAND'
}

export const DEFAULT_PAGE: CardPage = {
  ...DEFAULT_CARD,
  id: 'page-1',
  pageType: 'cover'
}

interface CardStore {
  pages: CardPage[]
  currentPageIndex: number
  rawText: string
  isGenerating: boolean

  // 현재 페이지 (derived)
  currentPage: CardPage

  // 현재 페이지 필드 업데이트
  updateCurrentPage: (patch: Partial<CardPage>) => void

  // 페이지 탐색
  setCurrentPage: (index: number) => void

  // 페이지 전체 교체 (프로젝트 로드 시)
  setPages: (pages: CardPage[]) => void

  // 페이지 추가
  addPage: (page: CardPage) => void

  // 페이지 삭제
  removePage: (index: number) => void

  // 원본 텍스트
  setRawText: (text: string) => void

  // AI 생성 상태
  setIsGenerating: (v: boolean) => void

  // 초기화
  resetPages: () => void
}

export const useCardStore = create<CardStore>((set, get) => ({
  pages: [{ ...DEFAULT_PAGE }],
  currentPageIndex: 0,
  rawText: '',
  isGenerating: false,

  get currentPage() {
    const { pages, currentPageIndex } = get()
    return pages[currentPageIndex] ?? pages[0]
  },

  updateCurrentPage: (patch) =>
    set((state) => {
      const updated = [...state.pages]
      updated[state.currentPageIndex] = { ...updated[state.currentPageIndex], ...patch }
      return { pages: updated }
    }),

  setCurrentPage: (index) =>
    set((state) => ({
      currentPageIndex: Math.max(0, Math.min(index, state.pages.length - 1))
    })),

  setPages: (pages) =>
    set({ pages, currentPageIndex: 0 }),

  addPage: (page) =>
    set((state) => ({ pages: [...state.pages, page] })),

  removePage: (index) =>
    set((state) => {
      if (state.pages.length <= 1) return state
      const updated = state.pages.filter((_, i) => i !== index)
      const newIndex = Math.min(state.currentPageIndex, updated.length - 1)
      return { pages: updated, currentPageIndex: newIndex }
    }),

  setRawText: (text) => set({ rawText: text }),

  setIsGenerating: (v) => set({ isGenerating: v }),

  resetPages: () =>
    set({ pages: [{ ...DEFAULT_PAGE }], currentPageIndex: 0 })
}))
