import React from 'react';
import { motion } from 'framer-motion';
import { WEDDING_DETAILS } from '../data/weddingDetails';
import { LocationRouteMotif } from '../illustrations/MandapIllustration';

/**
 * VenueDirectionsAction Component
 * Integrated ceremonial location experience featuring:
 * - Animated dotted journey path & traditional location marker
 * - Gilded temple-inspired "GET DIRECTIONS" Google Maps anchor (external navigation)
 * - Supporting welcoming message
 *
 * Strictly opens centralized draft Google Maps URL without requesting visitor location.
 */
export default function VenueDirectionsAction({
  pathProgress,
  pinOpacity,
  pinY,
  pinScale,
  ctaOpacity,
  ctaY,
  noteOpacity,
  noteY,
  isCompact = false,
  isShortViewport = false,
  reducedMotion = false,
}) {
  const { venue } = WEDDING_DETAILS;

  return (
    <div
      className="venue-directions-experience"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        marginTop: isCompact ? (isShortViewport ? '5px' : '10px') : '12px',
      }}
    >
      {/* Illustrated Route Line & Temple Location Pin */}
      <LocationRouteMotif
        pathProgress={pathProgress}
        pinOpacity={pinOpacity}
        pinY={pinY}
        pinScale={pinScale}
        isCompact={isCompact}
        isShortViewport={isShortViewport}
      />

      {/* Ceremonial "GET DIRECTIONS" External Action */}
      <motion.div
        style={{
          opacity: ctaOpacity,
          y: ctaY,
          marginTop: isCompact ? (isShortViewport ? '6px' : '10px') : '10px',
          width: isCompact ? '100%' : 'auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <a
          href={venue.googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Get directions to ${venue.name}, ${venue.location} on Google Maps`}
          className="ceremonial-directions-cta"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '9px',
            minHeight: '48px',
            minWidth: isCompact ? 'min(228px, 90%)' : 'auto',
            padding: isCompact ? '10px 22px' : '11px 28px',
            background:
              'linear-gradient(135deg, #F5E5C0 0%, #DFBA73 45%, #B68A43 100%)',
            color: 'var(--color-maroon-deepest, #27080D)',
            border: '1px solid #FFF2D6',
            outline: '1px solid rgba(182, 138, 67, 0.45)',
            outlineOffset: '3px',
            borderRadius: '3px',
            fontFamily: 'var(--font-display)',
            fontSize: isCompact ? '0.76rem' : '0.84rem',
            fontWeight: 700,
            letterSpacing: isCompact ? '0.14em' : '0.16em',
            textTransform: 'uppercase',
            textDecoration: 'none',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.45), inset 0 1px 0 rgba(255, 255, 255, 0.4)',
            cursor: 'pointer',
            transition: reducedMotion ? 'none' : 'transform 0.25s ease, box-shadow 0.25s ease, filter 0.25s ease',
          }}
          onMouseEnter={(e) => {
            if (!reducedMotion) {
              e.currentTarget.style.transform = 'translateY(-1px)';
            }
            e.currentTarget.style.filter = 'brightness(1.06)';
            e.currentTarget.style.boxShadow =
              '0 10px 28px rgba(182, 138, 67, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.5)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'none';
            e.currentTarget.style.filter = 'none';
            e.currentTarget.style.boxShadow =
              '0 8px 24px rgba(0, 0, 0, 0.45), inset 0 1px 0 rgba(255, 255, 255, 0.4)';
          }}
        >
          {/* Illustrated Compass / Pin Glyph */}
          <svg
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.1"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M12 22s-7-6.2-7-12a7 7 0 1 1 14 0c0 5.8-7 12-7 12z" />
            <circle cx="12" cy="10" r="2.5" />
          </svg>
          <span>{venue.directionsLabel || 'GET DIRECTIONS'}</span>
          <span aria-hidden="true" style={{ fontSize: '0.75rem', opacity: 0.75 }}>
            ↗
          </span>
        </a>
      </motion.div>

      {/* Supporting Warm Welcoming Line */}
      <motion.p
        style={{
          opacity: noteOpacity,
          y: noteY,
          fontFamily: 'var(--font-editorial)',
          fontStyle: 'italic',
          fontSize: isCompact
            ? isShortViewport
              ? '0.86rem'
              : 'clamp(0.9rem, 3.6vw, 0.98rem)'
            : 'clamp(0.95rem, 1.5vw, 1.12rem)',
          color: 'var(--color-champagne, #E6D5B8)',
          letterSpacing: '0.02em',
          marginTop: isCompact ? (isShortViewport ? '8px' : '12px') : '10px',
          marginBottom: 0,
        }}
      >
        {venue.supportingNote || 'We look forward to welcoming you'}
      </motion.p>
    </div>
  );
}

