import { IPhoneMockup } from './IPhoneMockup'
import { CardPreview } from './CardPreview'

export function RightPanel() {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-6">
      {/* Label */}
      <div className="flex items-center gap-2 text-xs text-gray-400 dark:text-gray-500">
        <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
        실시간 미리보기
      </div>

      {/* iPhone mockup — scale down to fit panel */}
      <div
        style={{
          transform: 'scale(0.78)',
          transformOrigin: 'center center'
        }}
      >
        <IPhoneMockup>
          <CardPreview />
        </IPhoneMockup>
      </div>

      {/* Instagram size hint */}
      <p className="text-xs text-gray-400 dark:text-gray-500">
        Instagram 1080 × 1080px 포맷
      </p>
    </div>
  )
}
