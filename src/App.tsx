import { useState } from 'react'
import { HashRouter, Routes, Route } from 'react-router-dom'
import { Dashboard } from './pages/Dashboard'
import { Editor } from './pages/Editor'

export function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')
  const toggleTheme = () => setTheme((t) => (t === 'light' ? 'dark' : 'light'))

  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Dashboard theme={theme} onToggleTheme={toggleTheme} />} />
        <Route path="/editor/:id" element={<Editor theme={theme} onToggleTheme={toggleTheme} />} />
      </Routes>
    </HashRouter>
  )
}
