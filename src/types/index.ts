export type TemplateId = 'minimal' | 'bold' | 'elegant' | 'gradient' | 'magazine'

export type FontFamily =
  | 'Pretendard'
  | 'Noto Sans KR'
  | 'Noto Serif KR'
  | 'Black Han Sans'
  | 'Gowun Dodum'

export interface CardData {
  title: string
  body: string
  hashtags: string
  templateId: TemplateId
  backgroundColor: string
  accentColor: string
  textColor: string
  fontFamily: FontFamily
  fontSize: 'sm' | 'md' | 'lg'
  logoText?: string
}

export interface CardPage extends CardData {
  id: string
  pageType: 'cover' | 'body' | 'closing'
}

export interface CardProps {
  data: CardData
  isExporting?: boolean
}

export interface TemplateConfig {
  id: TemplateId
  name: string
  nameKo: string
  thumbnailBg: string
  description: string
}

export interface Project {
  id: string
  title: string
  rawText: string
  pages: CardPage[]
  createdAt: string
  updatedAt: string
}
