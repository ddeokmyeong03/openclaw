import { useEffect, useRef, useState } from 'react'
import { IPhoneMockup } from './IPhoneMockup'
import { CardPreview } from './CardPreview'
import { PageNavigation } from '@renderer/components/PageNavigation'

const PHONE_W = 393
const PHONE_H = 852

export function RightPanel() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(0.78)

  useEffect(() => {
    const update = () => {
      if (!containerRef.current) return
      const { width, height } = containerRef.current.getBoundingClientRect()
      const scaleW = (width - 32) / PHONE_W
      const scaleH = (height - 100) / PHONE_H
      setScale(Math.min(scaleW, scaleH, 0.9))
    }
    update()
    const ro = new ResizeObserver(update)
    if (containerRef.current) ro.observe(containerRef.current)
    return () => ro.disconnect()
  }, [])

  return (
    <div ref={containerRef} className="flex flex-col items-center justify-center h-full gap-3">
      {/* Label */}
      <div className="flex items-center gap-2 text-xs text-gray-400 dark:text-gray-500">
        <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
        실시간 미리보기
      </div>

      {/* iPhone mockup */}
      <div style={{ width: PHONE_W * scale, height: PHONE_H * scale, flexShrink: 0, position: 'relative' }}>
        <div style={{ transform: `scale(${scale})`, transformOrigin: 'top left', position: 'absolute', width: PHONE_W, height: PHONE_H }}>
          <IPhoneMockup>
            <CardPreview />
          </IPhoneMockup>
        </div>
      </div>

      {/* 페이지 네비게이션 */}
      <PageNavigation />

      {/* Instagram size hint */}
      <p className="text-xs text-gray-400 dark:text-gray-500">
        Instagram 1080 × 1080px 포맷
      </p>
    </div>
  )
}
