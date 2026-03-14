import { useState, useEffect } from 'react'
import { useCardStore } from '@renderer/store/useCardStore'
import { storageGetSettings, storageSetSettings } from '@renderer/lib/storage'
import type { TemplateId, FontFamily } from '@renderer/types'

interface StylePreset {
  id: string
  name: string
  templateId: TemplateId
  backgroundColor: string
  accentColor: string
  textColor: string
  fontFamily: FontFamily
  savedAt: string
}

const PRESETS_KEY = 'stylePresets'

async function loadPresets(): Promise<StylePreset[]> {
  const settings = await storageGetSettings()
  try {
    return JSON.parse(settings[PRESETS_KEY] ?? '[]') as StylePreset[]
  } catch {
    return []
  }
}

async function savePresets(presets: StylePreset[]): Promise<void> {
  const settings = await storageGetSettings()
  await storageSetSettings({ ...settings, [PRESETS_KEY]: JSON.stringify(presets) })
}

export function StylePresets() {
  const { currentPage, updateCurrentPage } = useCardStore()
  const [presets, setPresets] = useState<StylePreset[]>([])
  const [name, setName] = useState('')
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    loadPresets().then(setPresets)
  }, [])

  const handleSave = async () => {
    if (!name.trim()) return
    setSaving(true)
    const newPreset: StylePreset = {
      id: `preset-${Date.now()}`,
      name: name.trim(),
      templateId: currentPage.templateId,
      backgroundColor: currentPage.backgroundColor,
      accentColor: currentPage.accentColor,
      textColor: currentPage.textColor,
      fontFamily: currentPage.fontFamily,
      savedAt: new Date().toISOString()
    }
    const updated = [newPreset, ...presets]
    await savePresets(updated)
    setPresets(updated)
    setName('')
    setSaving(false)
  }

  const handleApply = (preset: StylePreset) => {
    updateCurrentPage({
      templateId: preset.templateId,
      backgroundColor: preset.backgroundColor,
      accentColor: preset.accentColor,
      textColor: preset.textColor,
      fontFamily: preset.fontFamily
    })
  }

  const handleDelete = async (id: string) => {
    const updated = presets.filter((p) => p.id !== id)
    await savePresets(updated)
    setPresets(updated)
  }

  return (
    <div className="space-y-3">
      {/* Save current style */}
      <div className="flex gap-1.5">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSave()}
          placeholder="스타일 이름 입력..."
          maxLength={20}
          className="flex-1 px-3 py-2 rounded-xl text-xs bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-800 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleSave}
          disabled={saving || !name.trim()}
          className="px-3 py-2 rounded-xl text-xs font-semibold bg-blue-500 text-white disabled:opacity-40 hover:bg-blue-600 transition-colors whitespace-nowrap"
        >
          저장
        </button>
      </div>

      {/* Current style preview swatch */}
      <div className="flex items-center gap-2 px-1">
        <span className="text-xs text-gray-400 dark:text-gray-500 shrink-0">현재 스타일</span>
        <div className="flex gap-1">
          {[currentPage.backgroundColor, currentPage.accentColor, currentPage.textColor].map((c, i) => (
            <div key={i} className="w-4 h-4 rounded-full border border-gray-200 dark:border-gray-600" style={{ backgroundColor: c }} />
          ))}
        </div>
        <span className="text-xs text-gray-400 dark:text-gray-500 truncate">{currentPage.templateId}</span>
      </div>

      {/* Saved presets list */}
      {presets.length === 0 ? (
        <p className="text-xs text-gray-400 dark:text-gray-500 text-center py-2">
          저장된 스타일이 없습니다
        </p>
      ) : (
        <div className="space-y-2 max-h-48 overflow-y-auto scrollbar-thin">
          {presets.map((preset) => (
            <div
              key={preset.id}
              className="flex items-center gap-2 px-3 py-2 rounded-xl bg-gray-50 dark:bg-gray-700/50 border border-gray-100 dark:border-gray-700 group"
            >
              {/* Color swatches */}
              <div className="flex gap-0.5 shrink-0">
                {[preset.backgroundColor, preset.accentColor, preset.textColor].map((c, i) => (
                  <div key={i} className="w-3.5 h-3.5 rounded-full border border-gray-200 dark:border-gray-600" style={{ backgroundColor: c }} />
                ))}
              </div>

              {/* Name */}
              <span className="flex-1 text-xs font-medium text-gray-700 dark:text-gray-200 truncate">
                {preset.name}
              </span>

              {/* Template badge */}
              <span className="text-xs text-gray-400 dark:text-gray-500 shrink-0 hidden group-hover:block">
                {preset.templateId}
              </span>

              {/* Actions */}
              <div className="flex gap-1 shrink-0">
                <button
                  onClick={() => handleApply(preset)}
                  className="text-xs text-blue-500 hover:text-blue-600 font-semibold px-1.5 py-0.5 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-colors"
                >
                  적용
                </button>
                <button
                  onClick={() => handleDelete(preset.id)}
                  className="w-5 h-5 flex items-center justify-center rounded-lg text-gray-400 hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                >
                  <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
