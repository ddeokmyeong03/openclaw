import type { CardProps } from '@renderer/types'

const FONT_SIZE_MAP = {
  sm: { title: 80, body: 36, hashtag: 28, label: 24 },
  md: { title: 100, body: 42, hashtag: 32, label: 28 },
  lg: { title: 120, body: 50, hashtag: 38, label: 34 }
}

export function BoldTemplate({ data }: CardProps) {
  const size = FONT_SIZE_MAP[data.fontSize]

  return (
    <div
      style={{
        width: 1080,
        height: 1080,
        backgroundColor: data.backgroundColor,
        fontFamily: `'${data.fontFamily}', sans-serif`,
        display: 'flex',
        flexDirection: 'column',
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

      {/* Top accent color block — takes ~55% height */}
      <div
        style={{
          backgroundColor: data.accentColor,
          flex: '0 0 590px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          padding: '60px 80px',
          position: 'relative'
        }}
      >
        {/* Label */}
        <div
          style={{
            position: 'absolute',
            top: 52,
            left: 80,
            display: 'flex',
            alignItems: 'center',
            gap: 16
          }}
        >
          <div style={{ width: 32, height: 32, borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.3)' }} />
          <span
            style={{
              fontSize: size.label,
              fontWeight: 700,
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.9)'
            }}
          >
            {data.logoText || 'BRAND'}
          </span>
        </div>

        {/* Category */}
        {data.category && (
          <div style={{ position: 'absolute', top: 52, right: 80 }}>
            <span style={{
              fontSize: size.label * 0.85,
              fontWeight: 500,
              color: 'rgba(255,255,255,0.75)',
              letterSpacing: '0.1em',
              textTransform: 'uppercase'
            }}>
              {data.category}
            </span>
          </div>
        )}

        {/* Title */}
        <h1
          style={{
            fontSize: size.title,
            fontWeight: 900,
            lineHeight: 1.05,
            letterSpacing: '-0.03em',
            color: '#FFFFFF',
            margin: 0,
            textShadow: '0 4px 24px rgba(0,0,0,0.15)'
          }}
        >
          {data.title}
        </h1>
      </div>

      {/* Bottom content block */}
      <div
        style={{
          flex: 1,
          backgroundColor: data.backgroundColor,
          padding: '52px 80px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}
      >
        {data.subtitle && (
          <p style={{
            fontSize: size.body * 0.8,
            fontWeight: 600,
            color: data.accentColor,
            margin: '0 0 16px',
            letterSpacing: '0.03em'
          }}>
            {data.subtitle}
          </p>
        )}
        <p
          style={{
            fontSize: size.body,
            fontWeight: 400,
            lineHeight: 1.6,
            color: data.textColor,
            margin: 0
          }}
        >
          {data.body}
        </p>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span
            style={{
              fontSize: size.hashtag,
              color: data.accentColor,
              fontWeight: 600
            }}
          >
            {data.hashtags}
          </span>
          {/* Decorative slash */}
          <div
            style={{
              width: 80,
              height: 6,
              backgroundColor: data.accentColor,
              borderRadius: 3
            }}
          />
        </div>
      </div>
    </div>
  )
}
