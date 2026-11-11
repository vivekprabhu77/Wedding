import React from 'react';

/**
 * GroomIllustration Component
 * Premium luxury editorial fashion illustration of Chi. Vighnesh.
 * Tailored champagne raw silk bandhgala sherwani, ivory churidar, and traditional mojaris.
 */
export default function GroomIllustration({
  width = 240,
  className = '',
  style = {},
}) {
  return (
    <div
      className={`groom-illustration ${className}`}
      style={{
        display: 'inline-block',
        position: 'relative',
        width: typeof width === 'number' ? `${width}px` : width,
        ...style,
      }}
      aria-label="Groom Chi. Vighnesh"
    >
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: '-1%',
          left: '16%',
          width: '68%',
          height: '12px',
          background: 'radial-gradient(ellipse at center, rgba(0, 0, 0, 0.42) 0%, transparent 72%)',
          pointerEvents: 'none',
        }}
      />
      <img
        src="./illustrations/groom_editorial_transparent.png"
        alt="Groom Chi. Vighnesh"
        style={{
          width: '100%',
          height: 'auto',
          display: 'block',
          objectFit: 'contain',
        }}
        loading="eager"
      />
    </div>
  );
}
