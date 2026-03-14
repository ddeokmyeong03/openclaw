import { motion, AnimatePresence } from 'framer-motion'
import { useCardStore } from '@renderer/store/useCardStore'
import { MinimalTemplate } from '@renderer/components/templates/MinimalTemplate'
import { BoldTemplate } from '@renderer/components/templates/BoldTemplate'
import { ElegantTemplate } from '@renderer/components/templates/ElegantTemplate'
import { GradientTemplate } from '@renderer/components/templates/GradientTemplate'
import { MagazineTemplate } from '@renderer/components/templates/MagazineTemplate'
import type { TemplateId, CardProps } from '@renderer/types'

// Card native size
const CARD_NATIVE = 1080
// Display size inside phone screen (screen width = 369px, minus left/right margins)
const CARD_DISPLAY = 345
const SCALE = CARD_DISPLAY / CARD_NATIVE

const TEMPLATE_MAP: Record<TemplateId, React.ComponentType<CardProps>> = {
  minimal: MinimalTemplate,
  bold: BoldTemplate,
  elegant: ElegantTemplate,
  gradient: GradientTemplate,
  magazine: MagazineTemplate
}

// Fake Instagram post header (avatar + username)
function InstagramHeader() {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        padding: '10px 14px',
        backgroundColor: '#FFFFFF'
      }}
    >
      {/* Avatar */}
      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)',
          padding: 2,
          flexShrink: 0
        }}
      >
        <div
          style={{
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            backgroundColor: '#E8E8E8',
            border: '2px solid white'
          }}
        />
      </div>
      {/* Username */}
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 12, fontWeight: 600, color: '#262626', fontFamily: 'system-ui' }}>
          mybrand_official
        </div>
      </div>
      {/* More dots */}
      <div style={{ display: 'flex', gap: 3, paddingRight: 4 }}>
        {[0, 1, 2].map((i) => (
          <div key={i} style={{ width: 3, height: 3, borderRadius: '50%', backgroundColor: '#262626' }} />
        ))}
      </div>
    </div>
  )
}

// Fake Instagram action bar (like, comment, share, save)
function InstagramActions() {
  return (
    <div style={{ backgroundColor: '#FFFFFF', padding: '0 14px 8px' }}>
      {/* Actions row */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, paddingTop: 10 }}>
        {/* Heart */}
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#262626" strokeWidth="2">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        </svg>
        {/* Comment */}
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#262626" strokeWidth="2">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
        {/* Share */}
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#262626" strokeWidth="2">
          <line x1="22" y1="2" x2="11" y2="13" />
          <polygon points="22 2 15 22 11 13 2 9 22 2" />
        </svg>
        <div style={{ flex: 1 }} />
        {/* Bookmark */}
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#262626" strokeWidth="2">
          <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
        </svg>
      </div>
      {/* Like count */}
      <div style={{ fontSize: 11, fontWeight: 600, color: '#262626', marginTop: 6, fontFamily: 'system-ui' }}>
        좋아요 1,284개
      </div>
    </div>
  )
}

export function CardPreview() {
  const { card } = useCardStore()
  const ActiveTemplate = TEMPLATE_MAP[card.templateId]

  return (
    <div style={{ width: '100%', backgroundColor: '#FAFAFA' }}>
      {/* Status bar */}
      <div
        style={{
          backgroundColor: '#FFFFFF',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '14px 20px 8px',
          fontSize: 11,
          fontWeight: 600,
          color: '#000',
          fontFamily: 'system-ui'
        }}
      >
        <span>9:41</span>
        <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
          {/* Signal bars */}
          <svg width="17" height="12" viewBox="0 0 17 12" fill="#000">
            <rect x="0" y="4" width="3" height="8" rx="1" />
            <rect x="4.5" y="2.5" width="3" height="9.5" rx="1" />
            <rect x="9" y="1" width="3" height="11" rx="1" />
            <rect x="13.5" y="0" width="3" height="12" rx="1" opacity="0.3" />
          </svg>
          {/* WiFi */}
          <svg width="16" height="12" viewBox="0 0 16 12" fill="none" stroke="#000" strokeWidth="1.5">
            <path d="M1 4.5C4 1 12 1 15 4.5" strokeLinecap="round" />
            <path d="M3.5 7C5.5 4.5 10.5 4.5 12.5 7" strokeLinecap="round" />
            <circle cx="8" cy="10" r="1.5" fill="#000" stroke="none" />
          </svg>
          {/* Battery */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <div style={{ width: 22, height: 12, border: '1.5px solid #000', borderRadius: 3, padding: '2px 2px', display: 'flex', alignItems: 'center' }}>
              <div style={{ width: '75%', height: '100%', backgroundColor: '#000', borderRadius: 1 }} />
            </div>
            <div style={{ width: 2, height: 5, backgroundColor: '#000', borderRadius: '0 1px 1px 0', opacity: 0.4 }} />
          </div>
        </div>
      </div>

      {/* Instagram top nav */}
      <div
        style={{
          backgroundColor: '#FFFFFF',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '4px 14px 10px',
          borderBottom: '0.5px solid #EFEFEF'
        }}
      >
        {/* Instagram wordmark (simplified) */}
        <span style={{ fontSize: 18, fontWeight: 700, fontFamily: 'Georgia, serif', color: '#262626', letterSpacing: '-0.5px' }}>
          Instagram
        </span>
        <div style={{ display: 'flex', gap: 18, alignItems: 'center' }}>
          {/* Heart */}
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#262626" strokeWidth="2">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
          {/* DM */}
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#262626" strokeWidth="2">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.29 6.29l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
          </svg>
        </div>
      </div>

      {/* Post */}
      <InstagramHeader />

      {/* Card image area — zoom 방식으로 1080px → 345px 축소 (GPU 없이도 repaint 정상 작동) */}
      <div
        style={{
          width: CARD_DISPLAY,
          height: CARD_DISPLAY,
          overflow: 'hidden',
          flexShrink: 0
        }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={card.templateId}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{
              width: CARD_NATIVE,
              height: CARD_NATIVE,
              zoom: SCALE
            }}
          >
            <ActiveTemplate data={card} />
          </motion.div>
        </AnimatePresence>
      </div>

      <InstagramActions />
    </div>
  )
}
