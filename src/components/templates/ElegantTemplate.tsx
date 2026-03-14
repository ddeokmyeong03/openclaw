import type { CardProps } from '@renderer/types'

const FONT_SIZE_MAP = {
  sm: { title: 72, body: 34, hashtag: 26, label: 22 },
  md: { title: 88, body: 40, hashtag: 30, label: 26 },
  lg: { title: 108, body: 48, hashtag: 36, label: 32 }
}

export function ElegantTemplate({ data }: CardProps) {
  const size = FONT_SIZE_MAP[data.fontSize]

  return (
    <div
      style={{
        width: 1080,
        height: 1080,
        backgroundColor: data.backgroundColor,
        fontFamily: `'${data.fontFamily}', sans-serif`,
        display: 'flex',
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
            opacity: data.imageOpacity ?? 0.2,
            pointerEvents: 'none',
            zIndex: 0
          }}
        />
      )}

      {/* Left vertical accent bar */}
      <div
        style={{
          width: 8,
          backgroundColor: data.accentColor,
          flexShrink: 0
        }}
      />

      {/* Main content */}
      <div
        style={{
          flex: 1,
          padding: '90px 90px 90px 80px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}
      >
        {/* Top: brand + category */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <span
            style={{
              fontSize: size.label,
              fontWeight: 300,
              letterSpacing: '0.4em',
              textTransform: 'uppercase',
              color: data.accentColor
            }}
          >
            {data.logoText || 'BRAND'}
          </span>
          {data.category && (
            <span style={{
              fontSize: size.label * 0.9,
              fontWeight: 500,
              color: data.textColor,
              opacity: 0.5,
              letterSpacing: '0.1em',
              textTransform: 'uppercase'
            }}>
              {data.category}
            </span>
          )}
        </div>

        {/* Center: title + divider + body */}
        <div>
          <h1
            style={{
              fontSize: size.title,
              fontWeight: 600,
              lineHeight: 1.25,
              letterSpacing: '-0.01em',
              color: data.textColor,
              margin: '0 0 52px'
            }}
          >
            {data.title}
          </h1>

          {/* Subtitle */}
          {data.subtitle && (
            <p style={{
              fontSize: size.body * 0.85,
              fontWeight: 500,
              color: data.accentColor,
              margin: '-36px 0 36px',
              letterSpacing: '0.02em'
            }}>
              {data.subtitle}
            </p>
          )}

          {/* Thin line with dot */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 48 }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: data.accentColor }} />
            <div style={{ flex: 1, height: 1, backgroundColor: data.textColor, opacity: 0.12 }} />
          </div>

          <p
            style={{
              fontSize: size.body,
              fontWeight: 300,
              lineHeight: 1.8,
              color: data.textColor,
              opacity: 0.7,
              margin: 0,
              whiteSpace: 'pre-wrap'
            }}
          >
            {data.body}
          </p>
        </div>

        {/* Bottom: hashtags */}
        <div>
          <span
            style={{
              fontSize: size.hashtag,
              fontWeight: 400,
              color: data.accentColor,
              letterSpacing: '0.05em'
            }}
          >
            {data.hashtags}
          </span>
        </div>
      </div>

      {/* Right decorative column */}
      <div
        style={{
          width: 120,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 12,
          paddingRight: 40,
          flexShrink: 0
        }}
      >
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            style={{
              width: 6,
              height: 6,
              borderRadius: '50%',
              backgroundColor: data.accentColor,
              opacity: i === 2 ? 1 : 0.25
            }}
          />
        ))}
      </div>
    </div>
  )
}
