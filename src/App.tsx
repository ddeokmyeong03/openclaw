import { useState } from 'react'
import { TopBar } from './components/TopBar'
import { LeftPanel } from './components/LeftPanel'
import { RightPanel } from './components/RightPanel'

export function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')

  const toggleTheme = () => setTheme((t) => (t === 'light' ? 'dark' : 'light'))

  return (
    <div className={`h-[100dvh] flex flex-col ${theme === 'dark' ? 'dark' : ''}`}>
      <div className="flex flex-col h-full bg-panel-light dark:bg-panel-dark">
        <TopBar theme={theme} onToggleTheme={toggleTheme} />

        <main className="flex flex-row flex-1 min-h-0 pt-12">
          {/* Left panel: content & controls */}
          <aside className="w-full md:w-[380px] md:flex-shrink-0 h-full border-r border-gray-100 dark:border-gray-700/50 bg-panel-light dark:bg-panel-dark">
            <LeftPanel />
          </aside>

          {/* Right panel: iPhone preview — desktop only */}
          <section className="hidden md:flex flex-1 h-full bg-gray-50 dark:bg-gray-900 items-center justify-center overflow-hidden">
            <RightPanel />
          </section>
        </main>
      </div>
    </div>
  )
}
