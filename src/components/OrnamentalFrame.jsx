import React from 'react';

/**
 * OrnamentalFrame Component
 * Renders traditional South Indian temple-inspired corner flourishes,
 * delicate gold-inlay borders, and auspicious motifs framing the cinematic viewport.
 * Uses pointer-events: none so it never interferes with user scrolling or clicks.
 */
export default function OrnamentalFrame() {
  return (
    <div
      className="ornamental-frame-overlay"
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 'var(--z-ornamental-frame, 20)',
        boxSizing: 'border-box',
        paddingTop: 'max(var(--frame-inset, clamp(8px, 2.2vw, 28px)), env(safe-area-inset-top, 0px))',
        paddingBottom: 'max(var(--frame-inset, clamp(8px, 2.2vw, 28px)), env(safe-area-inset-bottom, 0px))',
        paddingLeft: 'max(var(--frame-inset, clamp(8px, 2.2vw, 28px)), env(safe-area-inset-left, 0px))',
        paddingRight: 'max(var(--frame-inset, clamp(8px, 2.2vw, 28px)), env(safe-area-inset-right, 0px))',
      }}
    >
      {/* Outer Fine Gold Border Container */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          border: '1px solid rgba(182, 138, 67, 0.4)',
          borderRadius: '4px',
          boxShadow: 'inset 0 0 20px rgba(0, 0, 0, 0.35)',
        }}
      >
        {/* Subtle secondary inner border */}
        <div
          style={{
            position: 'absolute',
            top: '4px',
            left: '4px',
            right: '4px',
            bottom: '4px',
            border: '1px solid rgba(182, 138, 67, 0.15)',
            borderRadius: '2px',
          }}
        />

        {/* Top-Left Corner Ornament */}
        <CornerOrnament
          style={{ position: 'absolute', top: '-2px', left: '-2px' }}
        />

        {/* Top-Right Corner Ornament */}
        <CornerOrnament
          style={{
            position: 'absolute',
            top: '-2px',
            right: '-2px',
            transform: 'scaleX(-1)',
          }}
        />

        {/* Bottom-Left Corner Ornament */}
        <CornerOrnament
          style={{
            position: 'absolute',
            bottom: '-2px',
            left: '-2px',
            transform: 'scaleY(-1)',
          }}
        />

        {/* Bottom-Right Corner Ornament */}
        <CornerOrnament
          style={{
            position: 'absolute',
            bottom: '-2px',
            right: '-2px',
            transform: 'scale(-1, -1)',
          }}
        />

        {/* Top Center Auspicious Bindu / Lotus Accent */}
        <div
          style={{
            position: 'absolute',
            top: '-7px',
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'var(--color-maroon-dark, #4A121A)',
            padding: '0 12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <svg width="24" height="14" viewBox="0 0 24 14" fill="none">
            <path
              d="M12 0L14.5 4.5L19 6L14.5 7.5L12 12L9.5 7.5L5 6L9.5 4.5L12 0Z"
              fill="var(--color-antique-gold, #B68A43)"
            />
            <circle cx="12" cy="6" r="1.5" fill="#F8F3E9" />
          </svg>
        </div>

        {/* Bottom Center Auspicious Accent */}
        <div
          style={{
            position: 'absolute',
            bottom: '-7px',
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'var(--color-maroon-deepest, #27080D)',
            padding: '0 12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <svg width="24" height="14" viewBox="0 0 24 14" fill="none">
            <path
              d="M12 14L9.5 9.5L5 8L9.5 6.5L12 2L14.5 6.5L19 8L14.5 9.5L12 14Z"
              fill="var(--color-antique-gold, #B68A43)"
            />
            <circle cx="12" cy="8" r="1.5" fill="#F8F3E9" />
          </svg>
        </div>
      </div>
    </div>
  );
}

/**
 * Traditional Temple Corner SVG Flourish
 */
function CornerOrnament({ style }) {
  return (
    <svg
      width="38"
      height="38"
      viewBox="0 0 38 38"
      fill="none"
      style={style}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Outer corner L bracket */}
      <path
        d="M2 36V2H36"
        stroke="var(--color-antique-gold, #B68A43)"
        strokeWidth="2"
        strokeLinecap="square"
      />
      {/* Inner corner flourish */}
      <path
        d="M7 28V7H28"
        stroke="var(--color-antique-gold, #B68A43)"
        strokeWidth="1"
        strokeOpacity="0.6"
      />
      {/* Diagonal temple motif */}
      <path
        d="M2 2L16 16"
        stroke="var(--color-gold-light, #DFBA73)"
        strokeWidth="1"
        strokeLinecap="round"
      />
      {/* Tiny decorative diamond */}
      <polygon
        points="16,13 19,16 16,19 13,16"
        fill="var(--color-antique-gold, #B68A43)"
      />
    </svg>
  );
}

