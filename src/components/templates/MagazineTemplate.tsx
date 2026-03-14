import type { CardProps } from '@renderer/types'

const FONT_SIZE_MAP = {
  sm: { title: 72, body: 34, hashtag: 26, label: 22, issue: 18 },
  md: { title: 88, body: 40, hashtag: 30, label: 26, issue: 22 },
  lg: { title: 108, body: 48, hashtag: 36, label: 32, issue: 28 }
}

export function MagazineTemplate({ data }: CardProps) {
  const size = FONT_SIZE_MAP[data.fontSize]
  const today = new Date()
  const issueLabel = `Vol.${today.getMonth() + 1} · ${today.getFullYear()}`

  return (
    <div
      style={{
        width: 1080,
        height: 1080,
        backgroundColor: data.backgroundColor,
        fontFamily: `'${data.fontFamily}', sans-serif`,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden'
      }}
    >
      {/* Header band */}
      <div
        style={{
          backgroundColor: data.accentColor,
          padding: '36px 80px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexShrink: 0
        }}
      >
        <span
          style={{
            fontSize: size.label,
            fontWeight: 900,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: '#FFFFFF'
          }}
        >
          {data.logoText || 'BRAND'}
        </span>
        <span
          style={{
            fontSize: size.issue,
            fontWeight: 300,
            color: 'rgba(255,255,255,0.8)',
            letterSpacing: '0.1em'
          }}
        >
          {issueLabel}
        </span>
      </div>

      {/* Main content area */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          padding: '70px 80px 60px',
          justifyContent: 'space-between'
        }}
      >
        {/* Issue number + title */}
        <div>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 16,
              marginBottom: 40
            }}
          >
            <span
              style={{
                fontSize: 100,
                fontWeight: 900,
                lineHeight: 1,
                color: data.accentColor,
                opacity: 0.15
              }}
            >
              01
            </span>
            <div
              style={{
                width: 2,
                height: 80,
                backgroundColor: data.accentColor,
                opacity: 0.2
              }}
            />
          </div>

          <h1
            style={{
              fontSize: size.title,
              fontWeight: 800,
              lineHeight: 1.15,
              letterSpacing: '-0.02em',
              color: data.textColor,
              margin: '0 0 44px'
            }}
          >
            {data.title}
          </h1>
        </div>

        {/* Body */}
        <div>
          {/* Category tag */}
          <div
            style={{
              display: 'inline-block',
              backgroundColor: data.accentColor,
              color: '#FFFFFF',
              fontSize: size.issue,
              fontWeight: 700,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              padding: '10px 24px',
              borderRadius: 4,
              marginBottom: 32
            }}
          >
            STORY
          </div>

          <p
            style={{
              fontSize: size.body,
              fontWeight: 400,
              lineHeight: 1.65,
              color: data.textColor,
              opacity: 0.75,
              margin: '0 0 48px',
              whiteSpace: 'pre-wrap'
            }}
          >
            {data.body}
          </p>

          {/* Bottom row */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderTop: `2px solid ${data.textColor}`,
              paddingTop: 32,
              opacity: 0.6
            }}
          >
            <span
              style={{
                fontSize: size.hashtag,
                color: data.accentColor,
                fontWeight: 500,
                opacity: 1
              }}
            >
              {data.hashtags}
            </span>
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: '50%',
                border: `2px solid ${data.accentColor}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <div
                style={{
                  width: 0,
                  height: 0,
                  borderTop: '10px solid transparent',
                  borderBottom: '10px solid transparent',
                  borderLeft: `16px solid ${data.accentColor}`,
                  marginLeft: 4
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
