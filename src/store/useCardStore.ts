import { create } from 'zustand'
import type { CardData } from '@renderer/types'

interface CardStore {
  card: CardData
  updateCard: (patch: Partial<CardData>) => void
  resetCard: () => void
}

const DEFAULT_CARD: CardData = {
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

export const useCardStore = create<CardStore>((set) => ({
  card: DEFAULT_CARD,
  updateCard: (patch) => set((state) => ({ card: { ...state.card, ...patch } })),
  resetCard: () => set({ card: DEFAULT_CARD })
}))
