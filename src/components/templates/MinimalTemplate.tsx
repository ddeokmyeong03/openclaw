import type { CardProps } from '@renderer/types'

const FONT_SIZE_MAP = {
  sm: { title: 72, body: 36, hashtag: 28 },
  md: { title: 88, body: 42, hashtag: 32 },
  lg: { title: 108, body: 50, hashtag: 38 }
}

export function MinimalTemplate({ data }: CardProps) {
  const size = FONT_SIZE_MAP[data.fontSize]

  return (
    <div
      style={{
        width: 1080,
        height: 1080,
        backgroundColor: data.backgroundColor,
        fontFamily: `'${data.fontFamily}', sans-serif`,
        color: data.textColor,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '100px',
        boxSizing: 'border-box',
        position: 'relative'
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
            pointerEvents: 'none'
          }}
        />
      )}

      {/* Top decoration */}
      <div
        style={{
          position: 'absolute',
          top: 60,
          left: 100,
          right: 100,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <span
          style={{
            fontSize: 28,
            fontWeight: 300,
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color: data.accentColor,
            opacity: 0.9
          }}
        >
          {data.logoText || 'BRAND'}
        </span>
        <div
          style={{
            width: 40,
            height: 2,
            backgroundColor: data.accentColor
          }}
        />
      </div>

      {/* Center content */}
      <div style={{ width: '100%', textAlign: 'center' }}>
        {/* Category */}
        {data.category && (
          <div style={{ marginBottom: 24 }}>
            <span style={{
              fontSize: size.hashtag,
              fontWeight: 600,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: data.accentColor,
              opacity: 0.85
            }}>
              {data.category}
            </span>
          </div>
        )}

        {/* Accent line */}
        <div
          style={{
            width: 60,
            height: 4,
            backgroundColor: data.accentColor,
            margin: `0 auto ${data.category ? '32px' : '48px'}`
          }}
        />

        {/* Title */}
        <h1
          style={{
            fontSize: size.title,
            fontWeight: 700,
            lineHeight: 1.2,
            letterSpacing: '-0.02em',
            margin: '0 0 28px',
            color: data.textColor
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
            margin: '0 0 28px',
            letterSpacing: '0.02em'
          }}>
            {data.subtitle}
          </p>
        )}

        {/* Divider */}
        <div
          style={{
            width: 120,
            height: 1,
            backgroundColor: data.textColor,
            opacity: 0.15,
            margin: '0 auto 36px'
          }}
        />

        {/* Body */}
        <p
          style={{
            fontSize: size.body,
            fontWeight: 400,
            lineHeight: 1.7,
            color: data.textColor,
            opacity: 0.75,
            margin: 0,
            whiteSpace: 'pre-wrap'
          }}
        >
          {data.body}
        </p>
      </div>

      {/* Bottom hashtags */}
      <div
        style={{
          position: 'absolute',
          bottom: 70,
          left: 100,
          right: 100,
          textAlign: 'center'
        }}
      >
        <span
          style={{
            fontSize: size.hashtag,
            color: data.accentColor,
            fontWeight: 500,
            letterSpacing: '0.05em'
          }}
        >
          {data.hashtags}
        </span>
      </div>
    </div>
  )
}
