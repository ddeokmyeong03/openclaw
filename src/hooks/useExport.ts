import { useState } from 'react'
import { createRoot } from 'react-dom/client'
import html2canvas from 'html2canvas'
import { useCardStore } from '@renderer/store/useCardStore'
import { MinimalTemplate } from '@renderer/components/templates/MinimalTemplate'
import { BoldTemplate } from '@renderer/components/templates/BoldTemplate'
import { ElegantTemplate } from '@renderer/components/templates/ElegantTemplate'
import { GradientTemplate } from '@renderer/components/templates/GradientTemplate'
import { MagazineTemplate } from '@renderer/components/templates/MagazineTemplate'
import type { TemplateId, CardProps, CardData } from '@renderer/types'
import React from 'react'

const TEMPLATE_MAP: Record<TemplateId, React.ComponentType<CardProps>> = {
  minimal: MinimalTemplate,
  bold: BoldTemplate,
  elegant: ElegantTemplate,
  gradient: GradientTemplate,
  magazine: MagazineTemplate
}

/** html2canvas로 1080×1080 PNG dataURL 생성 */
async function renderToPNG(card: CardData): Promise<string> {
  const container = document.createElement('div')
  container.style.cssText = `
    position: fixed;
    top: 0;
    left: -9999px;
    width: 1080px;
    height: 1080px;
    overflow: hidden;
    pointer-events: none;
    z-index: -9999;
  `
  document.body.appendChild(container)

  const ActiveTemplate = TEMPLATE_MAP[card.templateId]
  const root = createRoot(container)
  root.render(React.createElement(ActiveTemplate, { data: card, isExporting: true }))

  // 폰트 로딩 + 두 프레임 대기
  await document.fonts.ready
  await new Promise((r) => requestAnimationFrame(r))
  await new Promise((r) => requestAnimationFrame(r))

  const canvas = await html2canvas(container, {
    width: 1080,
    height: 1080,
    scale: 1,
    useCORS: true,
    logging: false,
    backgroundColor: card.backgroundColor ?? '#FFFFFF'
  })

  root.unmount()
  document.body.removeChild(container)

  return canvas.toDataURL('image/png', 1.0)
}

export function useExport() {
  const [isExporting, setIsExporting] = useState(false)
  const { currentPage } = useCardStore()

  const exportToPNG = async (): Promise<boolean> => {
    if (isExporting) return false
    setIsExporting(true)

    try {
      const dataUrl = await renderToPNG(currentPage)

      if (window.electronAPI) {
        const filePath = await window.electronAPI.showSaveDialog()
        if (!filePath) return false

        await window.electronAPI.exportCard(dataUrl, filePath)
        return true
      }

      // 브라우저 fallback
      const link = document.createElement('a')
      link.href = dataUrl
      link.download = `카드뉴스_${Date.now()}.png`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      return true

    } catch (err) {
      console.error('[Export] 실패:', err)
      return false
    } finally {
      setIsExporting(false)
    }
  }

  return { exportToPNG, isExporting }
}
