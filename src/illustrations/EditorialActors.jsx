import React from 'react';

/**
 * EditorialBride Component
 * Renders the luxury faceless fashion illustration of Chi. Sou. Rashmitha.
 * Holding loose varmala garland in front, royal magenta lehenga and gold choli.
 */
export function EditorialBride({
  width = 240,
  className = '',
  style = {},
}) {
  return (
    <div
      className={`editorial-bride-actor ${className}`}
      style={{
        display: 'inline-block',
        position: 'relative',
        width: typeof width === 'number' ? `${width}px` : width,
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

/**
 * EditorialGroom Component
 * Renders the luxury faceless fashion illustration of Chi. Vighnesh.
 * Holding loose varmala garland in front, tailored champagne raw silk bandhgala sherwani.
 */
export function EditorialGroom({
  width = 240,
  className = '',
  style = {},
}) {
  return (
    <div
      className={`editorial-groom-actor ${className}`}
      style={{
        display: 'inline-block',
        position: 'relative',
        width: typeof width === 'number' ? `${width}px` : width,
        ...style,
      }}
      aria-label="Groom Chi. Vighnesh"
    >
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

/**
 * EditorialGroomPlaces Component (Varmala Exchange Stage 4)
 * Groom gently raises his hands with the crimson & jasmine Varmala
 * placing it over the bowed head of the bride onto her shoulders.
 */
export function EditorialGroomPlaces({
  width = 330,
  className = '',
  style = {},
}) {
  return (
    <div
      className={`editorial-groom-places ${className}`}
      style={{
        display: 'inline-block',
        position: 'relative',
        width: typeof width === 'number' ? `${width}px` : width,
        ...style,
      }}
      aria-label="Groom placing Varmala on Bride"
    >
      <img
        src="./illustrations/varmala_groom_places_transparent.png"
        alt="Groom placing garland on Bride"
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

/**
 * EditorialBridePlaces Component (Varmala Exchange Stage 5)
 * Bride (already wearing her garland) raises her hands placing the second
 * sacred Varmala over the reverently bowed head of the groom.
 */
export function EditorialBridePlaces({
  width = 330,
  className = '',
  style = {},
}) {
  return (
    <div
      className={`editorial-bride-places ${className}`}
      style={{
        display: 'inline-block',
        position: 'relative',
        width: typeof width === 'number' ? `${width}px` : width,
        ...style,
      }}
      aria-label="Bride placing Varmala on Groom"
    >
      <img
        src="./illustrations/varmala_bride_places_transparent.png"
        alt="Bride placing garland on Groom"
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

/**
 * EditorialCoupleAdorned Component (Varmala Stage 6 & Celebration)
 * Chi. Vighnesh & Chi. Sou. Rashmitha standing close together side-by-side,
 * BOTH proudly wearing their magnificent sacred Varmala garlands in royal harmony.
 */
export function EditorialCoupleAdorned({
  width = 320,
  className = '',
  style = {},
}) {
  return (
    <div
      className={`editorial-couple-adorned ${className}`}
      style={{
        display: 'inline-block',
        position: 'relative',
        width: typeof width === 'number' ? `${width}px` : width,
        ...style,
      }}
      aria-label="Couple Vighnesh and Rashmitha adorned with Varmalas"
    >
      <img
        src="./illustrations/varmala_couple_adorned_transparent.png"
        alt="Vighnesh and Rashmitha adorned with Varmalas"
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

/**
 * EditorialCouple Component (Legacy Alias)
 */
export function EditorialCouple(props) {
  return <EditorialCoupleAdorned {...props} />;
}
