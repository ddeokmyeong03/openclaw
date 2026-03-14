interface IPhoneMockupProps {
  children: React.ReactNode
}

const PHONE_W = 393
const PHONE_H = 852
const SCREEN_X = 12
const SCREEN_Y = 12
const SCREEN_W = 369
const SCREEN_H = 828
const CORNER_RADIUS = 48

export function IPhoneMockup({ children }: IPhoneMockupProps) {
  return (
    <div
      style={{
        width: PHONE_W,
        height: PHONE_H,
        position: 'relative',
        flexShrink: 0
      }}
    >
      {/* Screen content — sits behind the SVG frame */}
      <div
        style={{
          position: 'absolute',
          left: SCREEN_X,
          top: SCREEN_Y,
          width: SCREEN_W,
          height: SCREEN_H,
          borderRadius: CORNER_RADIUS - 4,
          backgroundColor: '#FFFFFF',
          overflow: 'hidden',
          zIndex: 0
        }}
      >
        {children}
      </div>

      {/* SVG iPhone frame — on top, with screen area punched out via mask */}
      <svg
        width={PHONE_W}
        height={PHONE_H}
        viewBox={`0 0 ${PHONE_W} ${PHONE_H}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 10,
          pointerEvents: 'none'
        }}
      >
        <defs>
          <linearGradient id="phoneBodyGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#3A3A3A" />
            <stop offset="50%" stopColor="#1A1A1A" />
            <stop offset="100%" stopColor="#0D0D0D" />
          </linearGradient>
          <linearGradient id="phoneSideGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#444444" />
            <stop offset="100%" stopColor="#1F1F1F" />
          </linearGradient>
          {/*
            Mask: white = visible (phone body), black = transparent (screen hole)
            This punches a clean hole through the phone body so the screen content shows through
          */}
          <mask id="screenCutout">
            <rect x="0" y="0" width={PHONE_W} height={PHONE_H} fill="white" />
            <rect
              x={SCREEN_X}
              y={SCREEN_Y}
              width={SCREEN_W}
              height={SCREEN_H}
              rx={CORNER_RADIUS - 4}
              fill="black"
            />
          </mask>
        </defs>

        {/* Phone body with screen area masked out */}
        <rect
          x="0" y="0"
          width={PHONE_W}
          height={PHONE_H}
          rx={CORNER_RADIUS}
          fill="url(#phoneBodyGrad)"
          mask="url(#screenCutout)"
        />

        {/* Screen edge highlight (subtle inner glow) */}
        <rect
          x={SCREEN_X}
          y={SCREEN_Y}
          width={SCREEN_W}
          height={SCREEN_H}
          rx={CORNER_RADIUS - 4}
          fill="none"
          stroke="rgba(255,255,255,0.06)"
          strokeWidth="1"
        />

        {/* Dynamic Island */}
        <rect
          x={PHONE_W / 2 - 62}
          y={26}
          width={124}
          height={36}
          rx={18}
          fill="#0A0A0A"
        />
        {/* Front camera dot */}
        <circle cx={PHONE_W / 2 + 32} cy={44} r={6} fill="#111111" />
        <circle cx={PHONE_W / 2 + 32} cy={44} r={3} fill="#0A1A2E" opacity={0.7} />

        {/* Side buttons - Left volume */}
        <rect x="-3" y="178" width="5" height="50" rx="2.5" fill="url(#phoneSideGrad)" />
        <rect x="-3" y="244" width="5" height="50" rx="2.5" fill="url(#phoneSideGrad)" />
        {/* Silent toggle */}
        <rect x="-3" y="130" width="5" height="30" rx="2.5" fill="url(#phoneSideGrad)" />

        {/* Power button - Right */}
        <rect x={PHONE_W - 2} y="198" width="5" height="78" rx="2.5" fill="url(#phoneSideGrad)" />

        {/* Home indicator */}
        <rect
          x={PHONE_W / 2 - 66}
          y={PHONE_H - 18}
          width={132}
          height={5}
          rx="2.5"
          fill="rgba(255,255,255,0.22)"
        />

        {/* Outer body edge highlight */}
        <rect
          x="0.5" y="0.5"
          width={PHONE_W - 1}
          height={PHONE_H - 1}
          rx={CORNER_RADIUS - 0.5}
          fill="none"
          stroke="rgba(255,255,255,0.07)"
          strokeWidth="1"
        />
      </svg>
    </div>
  )
}
