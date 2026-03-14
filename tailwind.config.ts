import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: ['./src/**/*.{ts,tsx,html}'],
  theme: {
    extend: {
      colors: {
        panel: {
          light: '#FAFAFA',
          dark: '#111827'
        },
        surface: {
          light: '#FFFFFF',
          dark: '#1F2937'
        }
      },
      fontFamily: {
        sans: ['Pretendard', 'Noto Sans KR', 'system-ui', 'sans-serif']
      }
    }
  },
  plugins: []
}

export default config
