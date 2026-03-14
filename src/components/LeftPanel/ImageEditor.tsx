import { useState, useRef } from 'react'
import { useCardStore } from '@renderer/store/useCardStore'
import { storageGetSettings, isElectron } from '@renderer/lib/storage'

type Tab = 'upload' | 'search'

interface UnsplashPhoto {
  id: string
  urls: { small: string; regular: string }
  alt_description: string | null
  user: { name: string }
}

export function ImageEditor() {
  const { currentPage, updateCurrentPage } = useCardStore()
  const [tab, setTab] = useState<Tab>('upload')
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<UnsplashPhoto[]>([])
  const [searching, setSearching] = useState(false)
  const [searchError, setSearchError] = useState('')
  const [analyzing, setAnalyzing] = useState(false)
  const [analyzeResult, setAnalyzeResult] = useState<string | null>(null)
  const fileRef = useRef<HTMLInputElement>(null)
  const rawBase64Ref = useRef<{ data: string; mime: string } | null>(null)

  const opacity = currentPage.imageOpacity ?? 0.25

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const mime = file.type as 'image/jpeg' | 'image/png' | 'image/gif' | 'image/webp'
    const reader = new FileReader()
    reader.onload = (ev) => {
      const dataUrl = ev.target?.result as string
      updateCurrentPage({ imageUrl: dataUrl })
      setAnalyzeResult(null)
      // Store raw base64 for Claude Vision (strip data URL prefix)
      const base64 = dataUrl.split(',')[1]
      if (base64) rawBase64Ref.current = { data: base64, mime }
    }
    reader.readAsDataURL(file)
    e.target.value = ''
  }

  const handleAnalyzeColors = async () => {
    if (!rawBase64Ref.current || !isElectron) return
    setAnalyzing(true)
    setAnalyzeResult(null)
    try {
      const result = await window.electronAPI.analyzePhoto(rawBase64Ref.current.data, rawBase64Ref.current.mime)
      updateCurrentPage({
        backgroundColor: result.backgroundColor,
        accentColor: result.accentColor,
        textColor: result.textColor,
        templateId: result.templateId as import('@renderer/types').TemplateId
      })
      setAnalyzeResult('색상이 적용되었습니다.')
    } catch (err) {
      setAnalyzeResult(err instanceof Error ? err.message : '분석 중 오류가 발생했습니다.')
    } finally {
      setAnalyzing(false)
    }
  }

  const handleSearch = async () => {
    if (!query.trim()) return
    setSearching(true)
    setSearchError('')
    setResults([])
    try {
      const settings = await storageGetSettings()
      const key = settings.unsplashAccessKey
      if (!key) {
        setSearchError('설정에서 Unsplash Access Key를 먼저 입력해주세요.')
        return
      }
      const res = await fetch(
        `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=12&orientation=squarish`,
        { headers: { Authorization: `Client-ID ${key}` } }
      )
      if (!res.ok) throw new Error(`Unsplash API 오류: ${res.status}`)
      const json = await res.json() as { results: UnsplashPhoto[] }
      setResults(json.results)
      if (json.results.length === 0) setSearchError('검색 결과가 없습니다.')
    } catch (err) {
      setSearchError(err instanceof Error ? err.message : '검색 중 오류가 발생했습니다.')
    } finally {
      setSearching(false)
    }
  }

  const applyImage = (url: string) => {
    updateCurrentPage({ imageUrl: url })
  }

  const clearImage = () => {
    updateCurrentPage({ imageUrl: undefined })
  }

  return (
    <div className="space-y-3">
      {/* Tab switcher */}
      <div className="flex rounded-lg bg-gray-100 dark:bg-gray-700/50 p-0.5">
        {(['upload', 'search'] as Tab[]).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`flex-1 py-1.5 rounded-md text-xs font-semibold transition-all ${
              tab === t
                ? 'bg-white dark:bg-gray-600 text-gray-800 dark:text-gray-100 shadow-sm'
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
            }`}
          >
            {t === 'upload' ? '업로드' : 'Unsplash 검색'}
          </button>
        ))}
      </div>

      {/* Upload tab */}
      {tab === 'upload' && (
        <div>
          <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
          <button
            onClick={() => fileRef.current?.click()}
            className="w-full py-2.5 rounded-xl text-xs font-semibold border-2 border-dashed border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-400 hover:border-blue-400 hover:text-blue-500 dark:hover:border-blue-400 dark:hover:text-blue-400 transition-colors"
          >
            이미지 파일 선택
          </button>
        </div>
      )}

      {/* Search tab */}
      {tab === 'search' && (
        <div className="space-y-2">
          <div className="flex gap-1.5">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              placeholder="예: nature, coffee, city..."
              className="flex-1 px-3 py-2 rounded-xl text-xs bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-800 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleSearch}
              disabled={searching || !query.trim()}
              className="px-3 py-2 rounded-xl text-xs font-semibold bg-blue-500 text-white disabled:opacity-40 hover:bg-blue-600 transition-colors"
            >
              {searching ? '...' : '검색'}
            </button>
          </div>

          {searchError && (
            <p className="text-xs text-red-500">{searchError}</p>
          )}

          {results.length > 0 && (
            <div className="grid grid-cols-3 gap-1.5 max-h-48 overflow-y-auto scrollbar-thin">
              {results.map((photo) => (
                <button
                  key={photo.id}
                  onClick={() => applyImage(photo.urls.regular)}
                  className="aspect-square rounded-lg overflow-hidden border-2 border-transparent hover:border-blue-400 transition-all"
                  title={photo.alt_description ?? photo.user.name}
                >
                  <img
                    src={photo.urls.small}
                    alt={photo.alt_description ?? ''}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Current image preview + controls */}
      {currentPage.imageUrl && (
        <div className="space-y-2">
          <div className="relative rounded-xl overflow-hidden aspect-square bg-gray-100 dark:bg-gray-700">
            <img
              src={currentPage.imageUrl}
              alt="selected"
              className="w-full h-full object-cover"
              style={{ opacity }}
            />
            <button
              onClick={clearImage}
              className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/80 transition-colors"
            >
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          {/* AI color analysis — Electron only */}
          {isElectron && rawBase64Ref.current && (
            <div>
              <button
                onClick={handleAnalyzeColors}
                disabled={analyzing}
                className="w-full py-2 rounded-xl text-xs font-semibold transition-colors disabled:opacity-50 flex items-center justify-center gap-1.5"
                style={{
                  background: analyzing ? undefined : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  backgroundColor: analyzing ? '#e5e7eb' : undefined,
                  color: analyzing ? '#9ca3af' : 'white'
                }}
              >
                {analyzing ? (
                  <>
                    <svg className="animate-spin w-3 h-3" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    분석 중...
                  </>
                ) : (
                  <>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="3" /><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" />
                    </svg>
                    AI로 색상 추출
                  </>
                )}
              </button>
              {analyzeResult && (
                <p className={`text-xs mt-1.5 text-center ${analyzeResult.includes('오류') || analyzeResult.includes('Error') ? 'text-red-500' : 'text-green-500 dark:text-green-400'}`}>
                  {analyzeResult}
                </p>
              )}
            </div>
          )}

          {/* Opacity slider */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs text-gray-500 dark:text-gray-400">이미지 투명도</span>
              <span className="text-xs font-mono text-gray-600 dark:text-gray-300">{Math.round(opacity * 100)}%</span>
            </div>
            <input
              type="range"
              min={0.05}
              max={1}
              step={0.05}
              value={opacity}
              onChange={(e) => updateCurrentPage({ imageOpacity: parseFloat(e.target.value) })}
              className="w-full h-1.5 accent-blue-500"
            />
          </div>
        </div>
      )}
    </div>
  )
}
