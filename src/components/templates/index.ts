import type { TemplateConfig, TemplateId } from '@renderer/types'

export const TEMPLATES: TemplateConfig[] = [
  {
    id: 'minimal',
    name: 'Minimal',
    nameKo: '미니멀',
    thumbnailBg: '#FFFFFF',
    description: '깔끔하고 심플한 흰 배경 스타일'
  },
  {
    id: 'bold',
    name: 'Bold',
    nameKo: '볼드',
    thumbnailBg: '#1A1A2E',
    description: '강렬한 대비와 임팩트 있는 타이포'
  },
  {
    id: 'elegant',
    name: 'Elegant',
    nameKo: '엘레강트',
    thumbnailBg: '#F5F0EB',
    description: '세련되고 우아한 크림 톤 디자인'
  },
  {
    id: 'gradient',
    name: 'Gradient',
    nameKo: '그라디언트',
    thumbnailBg: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    description: '화려한 그라디언트와 글래스 효과'
  },
  {
    id: 'magazine',
    name: 'Magazine',
    nameKo: '매거진',
    thumbnailBg: '#FF6B35',
    description: '에디토리얼 매거진 레이아웃'
  }
]

export function getTemplate(id: TemplateId): TemplateConfig {
  return TEMPLATES.find((t) => t.id === id) ?? TEMPLATES[0]
}
