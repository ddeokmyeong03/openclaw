import type { CardProps } from '@renderer/types'

const FONT_SIZE_MAP = {
  sm: { title: 76, body: 36, hashtag: 28, label: 24 },
  md: { title: 92, body: 42, hashtag: 32, label: 28 },
  lg: { title: 112, body: 50, hashtag: 38, label: 34 }
}

function hexToRgb(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return `${r}, ${g}, ${b}`
}

export function GradientTemplate({ data }: CardProps) {
  const size = FONT_SIZE_MAP[data.fontSize]
  const accentRgb = hexToRgb(data.accentColor.length === 7 ? data.accentColor : '#3B82F6')

  return (
    <div
      style={{
        width: 1080,
        height: 1080,
        background: `linear-gradient(145deg, ${data.accentColor} 0%, ${data.backgroundColor} 100%)`,
        fontFamily: `'${data.fontFamily}', sans-serif`,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '80px',
        boxSizing: 'border-box',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Background image */}
      {data.imageUrl && (
        <img
          src={data.imageUrl}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: data.imageOpacity ?? 0.25,
            pointerEvents: 'none',
            zIndex: 0
          }}
        />
      )}

      {/* Background decorative circles */}
      <div
        style={{
          position: 'absolute',
          top: -200,
          right: -200,
          width: 600,
          height: 600,
          borderRadius: '50%',
          background: `rgba(255,255,255,0.06)`,
          pointerEvents: 'none'
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: -150,
          left: -150,
          width: 400,
          height: 400,
          borderRadius: '50%',
          background: `rgba(255,255,255,0.04)`,
          pointerEvents: 'none'
        }}
      />

      {/* Glassmorphism card */}
      <div
        style={{
          width: '100%',
          background: `rgba(255,255,255,0.12)`,
          borderRadius: 40,
          border: '1px solid rgba(255,255,255,0.25)',
          backdropFilter: 'blur(20px)',
          padding: '72px 80px',
          boxSizing: 'border-box',
          position: 'relative'
        }}
      >
        {/* Brand label + category */}
        <div style={{ marginBottom: 44, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <span
            style={{
              fontSize: size.label,
              fontWeight: 300,
              letterSpacing: '0.35em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.75)'
            }}
          >
            {data.logoText || 'BRAND'}
          </span>
          {data.category && (
            <span style={{
              fontSize: size.label * 0.85,
              fontWeight: 500,
              color: 'rgba(255,255,255,0.6)',
              letterSpacing: '0.1em',
              textTransform: 'uppercase'
            }}>
              {data.category}
            </span>
          )}
        </div>

        {/* Title */}
        <h1
          style={{
            fontSize: size.title,
            fontWeight: 800,
            lineHeight: 1.15,
            letterSpacing: '-0.02em',
            color: '#FFFFFF',
            margin: '0 0 40px',
            textShadow: '0 2px 20px rgba(0,0,0,0.2)'
          }}
        >
          {data.title}
        </h1>

        {/* Subtitle */}
        {data.subtitle && (
          <p style={{
            fontSize: size.body * 0.85,
            fontWeight: 500,
            color: 'rgba(255,255,255,0.85)',
            margin: '-24px 0 28px',
            letterSpacing: '0.02em'
          }}>
            {data.subtitle}
          </p>
        )}

        {/* Separator */}
        <div
          style={{
            width: 60,
            height: 3,
            backgroundColor: 'rgba(255,255,255,0.5)',
            borderRadius: 2,
            marginBottom: 36
          }}
        />

        {/* Body */}
        <p
          style={{
            fontSize: size.body,
            fontWeight: 400,
            lineHeight: 1.7,
            color: 'rgba(255,255,255,0.85)',
            margin: '0 0 44px',
            whiteSpace: 'pre-wrap'
          }}
        >
          {data.body}
        </p>

        {/* Hashtags */}
        <span
          style={{
            fontSize: size.hashtag,
            fontWeight: 500,
            color: 'rgba(255,255,255,0.65)',
            letterSpacing: '0.04em'
          }}
        >
          {data.hashtags}
        </span>
      </div>
    </div>
  )
}
