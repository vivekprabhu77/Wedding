import React from 'react';
import { motion, useTransform } from 'framer-motion';
import { useSceneTimeline } from '../hooks/useWeddingTimeline';
import { useViewportTier } from '../hooks/useViewportTier';
import { WEDDING_DETAILS } from '../data/weddingDetails';
import CeremonialFrame from '../components/CeremonialFrame';
import OrnamentalDateReveal from '../components/OrnamentalDateReveal';
import MuhurthamTimeReveal from '../components/MuhurthamTimeReveal';
import LagnamReveal from '../components/LagnamReveal';

/**
 * Scene 5: THE MUHURTHAM — Auspicious Wedding Date Reveal (56% – 70% of Master Timeline)
 *
 * An authentic traditional South Indian ceremonial date reveal:
 * - STAGE 1 (0.00 – 0.22): Ceremonial Awakening (Sacred temple arch, brass lamps, kalasha medallion).
 * - STAGE 2 (0.20 – 0.48): The Wedding Date (THE AUSPICIOUS DAY -> THURSDAY -> Monumental 26 -> NOVEMBER 2026).
 * - STAGE 3 (0.48 – 0.68): The Muhurtham Time (THE MUHURTHAM -> 11:15 AM).
 * - STAGE 4 (0.66 – 0.84): Makara Lagnam (Concluding auspicious announcement).
 * - STAGE 5 (0.82 – 1.00): Final Harmonious Composition (Date + Time + Lagnam + Calendar action).
 */
export default function MuhurthamScene() {
  const { localProgress, opacity, y, scale, isActive, sceneConfig } =
    useSceneTimeline('muhurtham');
  const { isCompact, isUltraNarrow, isShortViewport } = useViewportTier();

  // ========================================================
  // STAGE 1: CEREMONIAL AWAKENING (0.00 – 0.22)
  // ========================================================
  const frameScale = useTransform(localProgress, [0.0, 0.22, 0.88, 1.0], [0.93, 1.0, 1.0, 0.98]);
  const frameOpacity = useTransform(localProgress, [0.0, 0.18], [0.15, 1.0]);
  const lampGlow = useTransform(localProgress, [0.05, 0.25], [0.2, 0.65]);
  const contentY = useTransform(localProgress, [0.0, 0.35, 0.85, 1.0], [22, 0, 0, -18]);

  // ========================================================
  // STAGE 2: THE WEDDING DATE REVEAL (0.20 – 0.48)
  // ========================================================
  // 1. "THE AUSPICIOUS DAY"
  const labelOpacity = useTransform(localProgress, [0.18, 0.28], [0, 1]);
  const labelY = useTransform(localProgress, [0.18, 0.28], [12, 0]);

  // 2. "THURSDAY"
  const dayOpacity = useTransform(localProgress, [0.24, 0.34], [0, 1]);
  const dayY = useTransform(localProgress, [0.24, 0.34], [14, 0]);

  // 3. Dominant Monumental Hero "26"
  const dateNumberOpacity = useTransform(localProgress, [0.28, 0.40], [0, 1]);
  const dateNumberScale = useTransform(localProgress, [0.28, 0.42], [0.82, 1.0]);
  const dateNumberY = useTransform(localProgress, [0.28, 0.40], [18, 0]);

  // 4. "NOVEMBER 2026"
  const monthYearOpacity = useTransform(localProgress, [0.34, 0.46], [0, 1]);
  const monthYearY = useTransform(localProgress, [0.34, 0.46], [12, 0]);

  // 5. Kannada Inscription: ೨೬ ನವೆಂಬರ್ ೨೦೨೬, ಗುರುವಾರ
  const kannadaOpacity = useTransform(localProgress, [0.38, 0.50], [0, 1]);
  const kannadaY = useTransform(localProgress, [0.38, 0.50], [10, 0]);

  // ========================================================
  // STAGE 3: THE MUHURTHAM TIME (0.48 – 0.68)
  // ========================================================
  const timeContainerOpacity = useTransform(localProgress, [0.46, 0.56], [0, 1]);
  const timeContainerY = useTransform(localProgress, [0.46, 0.56], [14, 0]);

  const titleOpacity = useTransform(localProgress, [0.48, 0.58], [0, 1]);
  const titleY = useTransform(localProgress, [0.48, 0.58], [10, 0]);

  const timeOpacity = useTransform(localProgress, [0.52, 0.66], [0, 1]);
  const timeScale = useTransform(localProgress, [0.52, 0.66], [0.9, 1.0]);
  const timeY = useTransform(localProgress, [0.52, 0.66], [12, 0]);

  // ========================================================
  // STAGE 4: MAKARA LAGNAM (0.66 – 0.80)
  // ========================================================
  const lagnamContainerOpacity = useTransform(localProgress, [0.66, 0.74], [0, 1]);
  const lagnamContainerY = useTransform(localProgress, [0.66, 0.74], [12, 0]);

  const lagnamOpacity = useTransform(localProgress, [0.68, 0.79], [0, 1]);
  const lagnamScale = useTransform(localProgress, [0.68, 0.79], [0.92, 1.0]);
  const lagnamY = useTransform(localProgress, [0.68, 0.79], [10, 0]);

  // ========================================================
  // STAGE 5: FINAL COMPOSITION ACTIONS (0.76 – 0.85)
  // Complete before scene exit fade (0.90) & read-dwell gate
  // ========================================================
  const calendarActionsOpacity = useTransform(localProgress, [0.76, 0.85], [0, 1]);
  const calendarActionsY = useTransform(localProgress, [0.76, 0.85], [10, 0]);

  // Google Calendar URL (26 Nov 2026, 11:15 AM IST / 05:45 UTC)
  const googleCalUrl =
    'https://calendar.google.com/calendar/render?action=TEMPLATE&text=' +
    encodeURIComponent('Wedding: Chi. Vighnesh × Chi. Sou. Rashmitha') +
    '&dates=20261126T054500Z/20261126T083000Z&details=' +
    encodeURIComponent(
      `Auspicious Makara Lagna Muhurtham (11:15 AM) of Chi. Vighnesh and Chi. Sou. Rashmitha at ${WEDDING_DETAILS.venue.fullDisplay}.`
    ) +
    '&location=' +
    encodeURIComponent(WEDDING_DETAILS.venue.fullDisplay);

  // Apple Calendar / iCal Data URI
  const icsData = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Chi. Vighnesh & Chi. Sou. Rashmitha//Wedding Invitation//EN',
    'BEGIN:VEVENT',
    'SUMMARY:Wedding: Chi. Vighnesh × Chi. Sou. Rashmitha',
    'DESCRIPTION:Auspicious Makara Lagna Muhurtham (11:15 AM) of Chi. Vighnesh and Chi. Sou. Rashmitha',
    `LOCATION:${WEDDING_DETAILS.venue.fullDisplay}`,
    'DTSTART:20261126T054500Z',
    'DTEND:20261126T083000Z',
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');
  const icsUri = `data:text/calendar;charset=utf-8,${encodeURIComponent(icsData)}`;

  return (
    <motion.section
      id="scene-muhurtham"
      className="wedding-scene scene-muhurtham"
      aria-label={`${sceneConfig.title} (${sceneConfig.rangePercent})`}
      style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        paddingTop: isCompact
          ? 'max(14px, env(safe-area-inset-top, 0px))'
          : 'clamp(12px, 2.5vw, 24px)',
        paddingBottom: isCompact
          ? 'max(14px, env(safe-area-inset-bottom, 0px))'
          : 'clamp(12px, 2.5vw, 24px)',
        paddingLeft: isCompact
          ? 'max(12px, env(safe-area-inset-left, 0px))'
          : 'clamp(12px, 2.5vw, 24px)',
        paddingRight: isCompact
          ? 'max(12px, env(safe-area-inset-right, 0px))'
          : 'clamp(12px, 2.5vw, 24px)',
        opacity,
        y,
        scale,
        pointerEvents: isActive ? 'auto' : 'none',
        overflow: 'hidden',
      }}
    >
      <motion.div
        style={{
          y: contentY,
          maxWidth: '720px',
          width: '100%',
          margin: '0 auto',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {/* ========================================================
            TRADITIONAL CEREMONIAL SHRINE FRAME
            With brass Kuthuvillakku lamps, Kalasha, & corner brackets
            ======================================================== */}
        <CeremonialFrame
          frameScale={frameScale}
          frameOpacity={frameOpacity}
          lampGlow={lampGlow}
          isCompact={isCompact}
          isShortViewport={isShortViewport}
        >
          {/* ========================================================
              STAGE 2: THE WEDDING DATE REVEAL
              THE AUSPICIOUS DAY -> THURSDAY -> 26 -> NOVEMBER 2026
              ======================================================== */}
          <OrnamentalDateReveal
            labelOpacity={labelOpacity}
            labelY={labelY}
            dayOpacity={dayOpacity}
            dayY={dayY}
            dateNumberOpacity={dateNumberOpacity}
            dateNumberScale={dateNumberScale}
            dateNumberY={dateNumberY}
            monthYearOpacity={monthYearOpacity}
            monthYearY={monthYearY}
            kannadaOpacity={kannadaOpacity}
            kannadaY={kannadaY}
            isCompact={isCompact}
            isUltraNarrow={isUltraNarrow}
            isShortViewport={isShortViewport}
          />

          {/* ========================================================
              STAGE 3: THE MUHURTHAM TIME REVEAL
              THE MUHURTHAM -> 11:15 AM
              ======================================================== */}
          <MuhurthamTimeReveal
            containerOpacity={timeContainerOpacity}
            containerY={timeContainerY}
            titleOpacity={titleOpacity}
            titleY={titleY}
            timeOpacity={timeOpacity}
            timeScale={timeScale}
            timeY={timeY}
            isCompact={isCompact}
            isShortViewport={isShortViewport}
          />

          {/* ========================================================
              STAGE 4: MAKARA LAGNAM REVEAL
              Auspicious concluding announcement
              ======================================================== */}
          <LagnamReveal
            containerOpacity={lagnamContainerOpacity}
            containerY={lagnamContainerY}
            lagnamOpacity={lagnamOpacity}
            lagnamScale={lagnamScale}
            lagnamY={lagnamY}
            isCompact={isCompact}
            isShortViewport={isShortViewport}
          />

          {/* ========================================================
              STAGE 5: ADD TO CALENDAR ACTIONS (Harmonious Completion)
              ======================================================== */}
          <motion.div
            style={{
              opacity: calendarActionsOpacity,
              y: calendarActionsY,
              marginTop: isCompact
                ? isShortViewport
                  ? '10px'
                  : '14px'
                : 'clamp(12px, 2vh, 18px)',
              width: isCompact ? '100%' : 'auto',
              maxWidth: isCompact ? '320px' : 'none',
              marginLeft: 'auto',
              marginRight: 'auto',
              display: 'flex',
              flexWrap: isUltraNarrow ? 'wrap' : 'nowrap',
              alignItems: 'center',
              justifyContent: 'center',
              gap: isCompact ? '8px' : '10px',
            }}
          >
            {/* Google Calendar Link */}
            <a
              href={googleCalUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Add wedding date to Google Calendar"
              style={{
                flex: isCompact ? '1 1 0' : '0 0 auto',
                minHeight: isCompact ? (isShortViewport ? '38px' : '42px') : '40px',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                padding: isCompact ? '8px 10px' : '9px 16px',
                whiteSpace: 'nowrap',
                background: 'rgba(182, 138, 67, 0.18)',
                border: '1px solid var(--color-antique-gold)',
                color: 'var(--color-gold-bright)',
                fontFamily: 'var(--font-sans)',
                fontSize: isCompact ? '0.69rem' : '0.72rem',
                fontWeight: 600,
                letterSpacing: isCompact ? '0.04em' : '0.06em',
                textTransform: 'uppercase',
                borderRadius: '3px',
                cursor: 'pointer',
                textDecoration: 'none',
                transition: 'all 0.25s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'var(--color-antique-gold)';
                e.currentTarget.style.color = 'var(--color-maroon-deepest)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(182, 138, 67, 0.18)';
                e.currentTarget.style.color = 'var(--color-gold-bright)';
              }}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              Google Calendar
            </a>

            {/* Apple / iCal Download */}
            <a
              href={icsUri}
              download="Vighnesh_Rashmitha_Wedding.ics"
              aria-label="Download Apple Calendar / iCal event"
              style={{
                flex: isCompact ? '1 1 0' : '0 0 auto',
                minHeight: isCompact ? (isShortViewport ? '38px' : '42px') : '40px',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                padding: isCompact ? '8px 10px' : '9px 16px',
                whiteSpace: 'nowrap',
                background: 'rgba(245, 229, 192, 0.08)',
                border: '1px solid rgba(182, 138, 67, 0.45)',
                color: 'var(--color-cream)',
                fontFamily: 'var(--font-sans)',
                fontSize: isCompact ? '0.69rem' : '0.72rem',
                fontWeight: 600,
                letterSpacing: isCompact ? '0.04em' : '0.06em',
                textTransform: 'uppercase',
                borderRadius: '3px',
                cursor: 'pointer',
                textDecoration: 'none',
                transition: 'all 0.25s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(182, 138, 67, 0.35)';
                e.currentTarget.style.color = 'var(--color-ivory)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(245, 229, 192, 0.08)';
                e.currentTarget.style.color = 'var(--color-cream)';
              }}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Apple / iCal
            </a>
          </motion.div>
        </CeremonialFrame>
      </motion.div>
    </motion.section>
  );
}
