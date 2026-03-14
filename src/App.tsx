import { useState } from 'react'
import { TopBar } from './components/TopBar'
import { LeftPanel } from './components/LeftPanel'
import { RightPanel } from './components/RightPanel'

export function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')
  const [isEditOpen, setIsEditOpen] = useState(false)

  const toggleTheme = () => setTheme((t) => (t === 'light' ? 'dark' : 'light'))

  return (
    <div className={`h-[100dvh] flex flex-col ${theme === 'dark' ? 'dark' : ''}`}>
      <div className="flex flex-col h-full bg-panel-light dark:bg-panel-dark">
        <TopBar
          theme={theme}
          onToggleTheme={toggleTheme}
          isEditOpen={isEditOpen}
          onToggleEdit={() => setIsEditOpen((v) => !v)}
        />

        <main className="flex flex-row flex-1 min-h-0 pt-12">
          {/* Left panel — desktop: always visible / mobile: drawer overlay */}
          <aside className={`
            md:relative md:flex md:flex-col md:w-[380px] md:flex-shrink-0 md:h-full
            md:border-r md:border-gray-100 md:dark:border-gray-700/50
            md:bg-panel-light md:dark:bg-panel-dark md:translate-x-0 md:z-auto
            fixed inset-y-0 left-0 top-12 z-40 w-4/5 max-w-[380px] flex flex-col h-[calc(100dvh-3rem)]
            bg-panel-light dark:bg-panel-dark border-r border-gray-100 dark:border-gray-700/50
            transition-transform duration-300
            ${isEditOpen ? 'translate-x-0' : '-translate-x-full'}
          `}>
            <LeftPanel />
          </aside>

          {/* Backdrop — mobile only */}
          {isEditOpen && (
            <div
              className="md:hidden fixed inset-0 top-12 z-30 bg-black/40"
              onClick={() => setIsEditOpen(false)}
            />
          )}

          {/* Right panel: iPhone preview */}
          <section className="flex flex-1 h-full bg-gray-50 dark:bg-gray-900 items-center justify-center overflow-hidden">
            <RightPanel />
          </section>
        </main>
      </div>
    </div>
  )
}
