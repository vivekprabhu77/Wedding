import React from 'react';

/**
 * BrideIllustration Component
 * Premium luxury editorial fashion illustration of Chi. Sou. Rashmitha.
 * Royal magenta pleated lehenga, gold-embroidered designer choli, jhumkas, and jasmine gajra.
 */
export default function BrideIllustration({
  width = 240,
  className = '',
  style = {},
}) {
  return (
    <div
      className={`bride-illustration ${className}`}
      style={{
        display: 'inline-block',
        position: 'relative',
        width: typeof width === 'number' ? `${width}px` : width,
        filter: 'drop-shadow(0 16px 32px rgba(0, 0, 0, 0.45))',
        ...style,
      }}
      aria-label="Bride Chi. Sou. Rashmitha"
    >
      <img
        src="./illustrations/bride_editorial_transparent.png"
        alt="Bride Chi. Sou. Rashmitha"
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
