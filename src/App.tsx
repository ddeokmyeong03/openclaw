import { useState } from 'react'
import { TopBar } from './components/TopBar'
import { LeftPanel } from './components/LeftPanel'
import { RightPanel } from './components/RightPanel'

export function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')
  const [mobileTab, setMobileTab] = useState<'edit' | 'preview'>('edit')

  const toggleTheme = () => setTheme((t) => (t === 'light' ? 'dark' : 'light'))

  return (
    <div className={`h-[100dvh] flex flex-col ${theme === 'dark' ? 'dark' : ''}`}>
      <div className="flex flex-col h-full bg-panel-light dark:bg-panel-dark">
        <TopBar theme={theme} onToggleTheme={toggleTheme} />

        {/* Mobile tab bar */}
        <div className="md:hidden flex pt-12 border-b border-gray-100 dark:border-gray-700/50 bg-panel-light dark:bg-panel-dark">
          <button
            onClick={() => setMobileTab('edit')}
            className={`flex-1 py-2.5 text-sm font-semibold transition-colors ${
              mobileTab === 'edit'
                ? 'text-blue-500 border-b-2 border-blue-500'
                : 'text-gray-400 dark:text-gray-500'
            }`}
          >
            편집
          </button>
          <button
            onClick={() => setMobileTab('preview')}
            className={`flex-1 py-2.5 text-sm font-semibold transition-colors ${
              mobileTab === 'preview'
                ? 'text-blue-500 border-b-2 border-blue-500'
                : 'text-gray-400 dark:text-gray-500'
            }`}
          >
            미리보기
          </button>
        </div>

        <main className="flex flex-row flex-1 min-h-0 md:pt-12">
          {/* Left panel: content & controls */}
          <aside className={`${mobileTab === 'edit' ? 'flex' : 'hidden'} md:flex flex-col w-full md:w-[380px] md:flex-shrink-0 h-full border-r border-gray-100 dark:border-gray-700/50 bg-panel-light dark:bg-panel-dark`}>
            <LeftPanel />
          </aside>

          {/* Right panel: iPhone preview */}
          <section className={`${mobileTab === 'preview' ? 'flex' : 'hidden'} md:flex flex-1 h-full bg-gray-50 dark:bg-gray-900 items-center justify-center overflow-hidden`}>
            <RightPanel />
          </section>
        </main>
      </div>
    </div>
  )
}
