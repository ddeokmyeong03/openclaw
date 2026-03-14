import { ContentEditor } from './ContentEditor'
import { TemplateSelector } from './TemplateSelector'
import { ColorPicker } from './ColorPicker'
import { FontSelector } from './FontSelector'
import { ExportButton } from './ExportButton'
import { AISection } from './AISection'
import { ImageEditor } from './ImageEditor'
import { StylePresets } from './StylePresets'
import { useCardStore } from '@renderer/store/useCardStore'

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border-b border-gray-100 dark:border-gray-700/50 pb-6">
      <h3 className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-3">
        {title}
      </h3>
      {children}
    </div>
  )
}

export function LeftPanel() {
  const { resetPages } = useCardStore()

  return (
    <div className="flex flex-col h-full">
      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto px-6 pt-3 pb-6 space-y-5">
        <Section title="AI 생성">
          <AISection />
        </Section>

        <Section title="내용 편집">
          <ContentEditor />
        </Section>

        <Section title="템플릿">
          <TemplateSelector />
        </Section>

        <Section title="색상">
          <ColorPicker />
        </Section>

        <Section title="서체">
          <FontSelector />
        </Section>

        <Section title="이미지">
          <ImageEditor />
        </Section>

        <Section title="스타일 프리셋">
          <StylePresets />
        </Section>

        {/* Reset button */}
        <div>
          <button
            onClick={resetPages}
            className="text-xs text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors underline underline-offset-2"
          >
            기본값으로 초기화
          </button>
        </div>
      </div>

      {/* Sticky export button */}
      <div className="px-6 py-4 border-t border-gray-100 dark:border-gray-700/50 bg-panel-light dark:bg-panel-dark">
        <ExportButton />
      </div>
    </div>
  )
}
