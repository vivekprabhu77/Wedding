import React from 'react';
import { motion, useTransform } from 'framer-motion';

/**
 * BrideVarmala Component
 * High-detail traditional South Indian bridal illustration of Chi. Sou. Rashmitha.
 *
 * Refined Features:
 * - Kanjeevaram Bridal Silk Saree in royal crimson/maroon with gold zari buttas & broad temple border
 * - Gold Vaddanam / Kamarbandh (ornate waist belt) cinching saree pleats
 * - Kasu Malai (traditional gold coin garland) + Temple Choker necklace
 * - Traditional Jhumkas (temple earrings) and Mukku Pudaka (gold nose stud)
 * - Maang Tikka (Nethi Chutti) & Suryan-Chandran hair ornaments
 * - Elaborate bridal braid crowned with fresh white Jasmine (Mallige) Veni flowers
 * - Mehendi adorned hands, gold kadas & red bridal glass bangles
 * - Natural two-handed arm articulation: forearms and hands elevate naturally in front of chest
 * - Separate loose garland (held in hands) vs draped garland (worn around neck)
 *
 * @param {number} width - Render width in pixels
 * @param {MotionValue|number} armProgress - 0 = holding/resting, 1 = raised placing garland
 * @param {MotionValue|number} headTilt - degrees of respectful head bow
 * @param {MotionValue|number|boolean} showDrapedGarland - opacity/visibility of neck-worn garland
 * @param {MotionValue|number|boolean} showHeldGarland - opacity/visibility of hand-held garland
 */
export default function BrideVarmala({
  width = 280,
  armProgress = 0,
  headTilt = 0,
  showDrapedGarland = 0,
  showHeldGarland = 1,
  className = '',
  style = {},
}) {
  const height = width * 1.57; // 280 x 440 aspect ratio

  // Natural two-handed elevation: hands lift upward and slightly forward in front of chest
  const handsElevationY = typeof armProgress === 'number'
    ? armProgress * -38
    : useTransform(armProgress, [0, 1], [0, -38]);

  const leftArmTilt = typeof armProgress === 'number'
    ? armProgress * -16
    : useTransform(armProgress, [0, 1], [0, -16]);

  const rightArmTilt = typeof armProgress === 'number'
    ? armProgress * 16
    : useTransform(armProgress, [0, 1], [0, 16]);

  const headRotation = typeof headTilt === 'number'
    ? headTilt
    : useTransform(headTilt, (v) => v);

  return (
    <div
      className={`bride-varmala-actor ${className}`}
      style={{
        display: 'inline-block',
        position: 'relative',
        width: `${width}px`,
        height: `${height}px`,
        ...style,
      }}
      aria-label="Bride Chi. Sou. Rashmitha"
    >
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 280 440"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Royal Crimson / Maroon Kanjeevaram Silk Gradient */}
          <linearGradient id="gRashmithaSaree" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#A01D30" />
            <stop offset="40%" stopColor="#821424" />
            <stop offset="80%" stopColor="#5C0C18" />
            <stop offset="100%" stopColor="#3C060E" />
          </linearGradient>

          {/* Saree Pallu & Blouse Accent Gradient */}
          <linearGradient id="gRashmithaBlouse" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8A1727" />
            <stop offset="50%" stopColor="#6E0F1D" />
            <stop offset="100%" stopColor="#480711" />
          </linearGradient>

          {/* Pure Antique Temple Gold Zari Gradient */}
          <linearGradient id="gRashmithaGoldZari" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#9C712C" />
            <stop offset="25%" stopColor="#DFBA73" />
            <stop offset="50%" stopColor="#FFF2D6" />
            <stop offset="75%" stopColor="#DFBA73" />
            <stop offset="100%" stopColor="#9C712C" />
          </linearGradient>

          {/* Warm Radiant Skin Tone Gradient */}
          <linearGradient id="gSkinToneBride" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#EBC2A0" />
            <stop offset="50%" stopColor="#D9A880" />
            <stop offset="100%" stopColor="#C28C63" />
          </linearGradient>

          {/* Dark Silky Hair Gradient */}
          <linearGradient id="gHairBride" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#251610" />
            <stop offset="100%" stopColor="#0F0805" />
          </linearGradient>

          {/* Garland Petal Gradients */}
          <radialGradient id="gRosePetalBride" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#C92A3E" />
            <stop offset="70%" stopColor="#8E1424" />
            <stop offset="100%" stopColor="#5E0914" />
          </radialGradient>
          <radialGradient id="gJasmineFloretBride" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="65%" stopColor="#FFFDF7" />
            <stop offset="100%" stopColor="#E2DBCA" />
          </radialGradient>
        </defs>

        {/* ========================================================
            1. BRIDAL BRAID & JASMINE VENI (BACKGROUND LAYER)
            ======================================================== */}
        <g id="bride-hair-braid">
          <path
            d="M164 125 C178 170, 186 240, 182 350 C180 360, 172 360, 170 350 C172 240, 166 170, 154 125 Z"
            fill="url(#gHairBride)"
          />
          <circle cx="168" cy="145" r="5" fill="url(#gJasmineFloretBride)" stroke="url(#gRashmithaGoldZari)" strokeWidth="0.5" />
          <circle cx="171" cy="165" r="5.5" fill="#FFFFFF" stroke="url(#gRashmithaGoldZari)" strokeWidth="0.5" />
          <circle cx="173" cy="185" r="5.5" fill="url(#gJasmineFloretBride)" stroke="url(#gRashmithaGoldZari)" strokeWidth="0.5" />
          <circle cx="174" cy="205" r="5.5" fill="#FFFFFF" stroke="url(#gRashmithaGoldZari)" strokeWidth="0.5" />
          <circle cx="175" cy="225" r="5.5" fill="url(#gJasmineFloretBride)" stroke="url(#gRashmithaGoldZari)" strokeWidth="0.5" />
          <circle cx="176" cy="245" r="5.5" fill="#FFFFFF" stroke="url(#gRashmithaGoldZari)" strokeWidth="0.5" />
          <circle cx="176" cy="265" r="4.5" fill="url(#gJasmineFloretBride)" stroke="url(#gRashmithaGoldZari)" strokeWidth="0.5" />
          <circle cx="177" cy="285" r="4.5" fill="#FFFFFF" stroke="url(#gRashmithaGoldZari)" strokeWidth="0.5" />
          <circle cx="177" cy="305" r="4" fill="url(#gJasmineFloretBride)" stroke="url(#gRashmithaGoldZari)" strokeWidth="0.5" />
          <circle cx="176" cy="350" r="5" fill="url(#gRashmithaGoldZari)" />
          <line x1="174" y1="355" x2="174" y2="368" stroke="url(#gRashmithaGoldZari)" strokeWidth="1.2" />
          <line x1="176" y1="355" x2="176" y2="370" stroke="url(#gRashmithaGoldZari)" strokeWidth="1.2" />
          <line x1="178" y1="355" x2="178" y2="368" stroke="url(#gRashmithaGoldZari)" strokeWidth="1.2" />
        </g>

        {/* ========================================================
            2. LOWER BODY: KANJEEVARAM SILK SAREE PLEATS & HEM
            ======================================================== */}
        <g id="bride-saree-skirt">
          <path
            d="M84 265 L66 405 C66 422, 102 426, 140 426 C178 426, 214 422, 214 405 L196 265 Z"
            fill="url(#gRashmithaSaree)"
            stroke="rgba(182, 138, 67, 0.5)"
            strokeWidth="1.2"
          />

          {/* Gold Buttas */}
          <g fill="url(#gRashmithaGoldZari)" opacity="0.85">
            <circle cx="94" cy="295" r="2.2" />
            <circle cx="120" cy="290" r="2.2" />
            <circle cx="160" cy="290" r="2.2" />
            <circle cx="186" cy="295" r="2.2" />

            <circle cx="85" cy="330" r="2.2" />
            <circle cx="108" cy="325" r="2.2" />
            <circle cx="140" cy="320" r="2.2" />
            <circle cx="172" cy="325" r="2.2" />
            <circle cx="195" cy="330" r="2.2" />

            <circle cx="82" cy="365" r="2.2" />
            <circle cx="106" cy="360" r="2.2" />
            <circle cx="140" cy="355" r="2.2" />
            <circle cx="174" cy="360" r="2.2" />
            <circle cx="198" cy="365" r="2.2" />
          </g>

          {/* Saree Pleats */}
          <path
            d="M112 265 C108 310, 106 365, 106 422 L174 422 C174 365, 172 310, 168 265 Z"
            fill="url(#gRashmithaSaree)"
            stroke="rgba(182, 138, 67, 0.65)"
            strokeWidth="1.2"
          />
          <line x1="120" y1="265" x2="118" y2="422" stroke="rgba(223, 186, 115, 0.45)" strokeWidth="1" />
          <line x1="130" y1="265" x2="128" y2="422" stroke="rgba(223, 186, 115, 0.45)" strokeWidth="1" />
          <line x1="140" y1="265" x2="140" y2="422" stroke="url(#gRashmithaGoldZari)" strokeWidth="2" />
          <line x1="150" y1="265" x2="152" y2="422" stroke="rgba(223, 186, 115, 0.45)" strokeWidth="1" />
          <line x1="160" y1="265" x2="162" y2="422" stroke="rgba(223, 186, 115, 0.45)" strokeWidth="1" />

          {/* Saree Hem Border */}
          <path
            d="M66 400 C92 414, 140 416, 214 400 L214 424 C140 426, 92 424, 66 422 Z"
            fill="url(#gRashmithaGoldZari)"
          />
          <path
            d="M72 400 L76 392 L80 400 L84 392 L88 400 L92 392 L96 400 L100 392 L104 400 L108 392 L112 400 L116 392 L120 400 L124 392 L128 400 L132 392 L136 400 L140 392 L144 400 L148 392 L152 400 L156 392 L160 400 L164 392 L168 400 L172 392 L176 400 L180 392 L184 400 L188 392 L192 400 L196 392 L200 400 L204 392 L208 400"
            stroke="url(#gRashmithaGoldZari)"
            strokeWidth="1.2"
            fill="none"
          />

          {/* Dainty Anklets & Feet */}
          <ellipse cx="118" cy="426" rx="12" ry="4" fill="url(#gSkinToneBride)" />
          <ellipse cx="162" cy="426" rx="12" ry="4" fill="url(#gSkinToneBride)" />
          <line x1="108" y1="424" x2="128" y2="424" stroke="url(#gRashmithaGoldZari)" strokeWidth="1.5" />
          <line x1="152" y1="424" x2="172" y2="424" stroke="url(#gRashmithaGoldZari)" strokeWidth="1.5" />
        </g>

        {/* ========================================================
            3. TORSO, BLOUSE & PALLU WITH GOLD VADDANAM
            ======================================================== */}
        <g id="bride-torso-blouse">
          <path
            d="M92 165 C82 195, 80 232, 84 265 L196 265 C200 232, 198 195, 188 165 C172 158, 154 156, 140 156 C126 156, 108 158, 92 165 Z"
            fill="url(#gRashmithaBlouse)"
            stroke="rgba(182, 138, 67, 0.5)"
            strokeWidth="1.2"
          />
          <path
            d="M94 165 C108 200, 140 240, 188 265 L196 265 C150 225, 118 185, 106 165 Z"
            fill="url(#gRashmithaSaree)"
          />
          <path
            d="M96 166 C110 202, 142 242, 190 266"
            stroke="url(#gRashmithaGoldZari)"
            strokeWidth="4"
            fill="none"
          />

          {/* Gold Vaddanam (Waist Belt) */}
          <rect x="84" y="260" width="112" height="10" fill="url(#gRashmithaGoldZari)" rx="2" />
          <circle cx="140" cy="265" r="4.5" fill="url(#gRashmithaGoldZari)" stroke="#821424" strokeWidth="1" />
          <circle cx="140" cy="265" r="2" fill="#821424" />

          {/* Temple Choker Necklace */}
          <path
            d="M124 162 C132 168, 148 168, 156 162"
            stroke="url(#gRashmithaGoldZari)"
            strokeWidth="3.5"
            fill="none"
          />
          {/* Kasu Malai (Coin Garland) */}
          <path
            d="M116 165 C122 195, 158 195, 164 165"
            stroke="url(#gRashmithaGoldZari)"
            strokeWidth="2.5"
            fill="none"
          />
          <circle cx="140" cy="192" r="5" fill="url(#gRashmithaGoldZari)" />
          <circle cx="140" cy="192" r="2.5" fill="#821424" />
          <circle cx="140" cy="198" r="1.5" fill="#FFFFFF" />
        </g>

        {/* ========================================================
            4. HEAD, JASMINE VENI & BRIDAL ADORNMENTS (TILTABLE)
            ======================================================== */}
        <motion.g
          id="bride-head-assembly"
          style={{
            originX: '140px',
            originY: '155px',
            rotate: headRotation,
          }}
        >
          <path
            d="M132 136 L132 162 C137 164, 143 164, 148 162 L148 136 Z"
            fill="url(#gSkinToneBride)"
            stroke="rgba(194, 140, 99, 0.4)"
            strokeWidth="1"
          />

          <path
            d="M122 108 C122 140, 132 146, 140 146 C148 146, 158 140, 158 108 C158 92, 122 92, 122 108 Z"
            fill="url(#gSkinToneBride)"
            stroke="rgba(194, 140, 99, 0.5)"
            strokeWidth="1"
          />

          {/* Jhumkas */}
          <g>
            <circle cx="120" cy="116" r="2.5" fill="url(#gRashmithaGoldZari)" />
            <path d="M118 120 L122 120 L123 124 L117 124 Z" fill="url(#gRashmithaGoldZari)" />
            <circle cx="120" cy="126" r="1.2" fill="#FFFFFF" />
          </g>
          <g>
            <circle cx="160" cy="116" r="2.5" fill="url(#gRashmithaGoldZari)" />
            <path d="M158 120 L162 120 L163 124 L157 124 Z" fill="url(#gRashmithaGoldZari)" />
            <circle cx="160" cy="126" r="1.2" fill="#FFFFFF" />
          </g>

          {/* Eyebrows */}
          <path d="M126 104 Q132 101 137 103" stroke="#1F120B" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M143 103 Q148 101 154 104" stroke="#1F120B" strokeWidth="1.8" strokeLinecap="round" />

          {/* Kohl-lined Almond Eyes */}
          <path d="M127 110 Q132 107 137 110 Q132 113 127 110 Z" fill="#FFFFFF" />
          <circle cx="132" cy="110" r="1.8" fill="#150C07" />
          <circle cx="132.6" cy="109.4" r="0.6" fill="#FFFFFF" />

          <path d="M143 110 Q148 107 153 110 Q148 113 143 110 Z" fill="#FFFFFF" />
          <circle cx="148" cy="110" r="1.8" fill="#150C07" />
          <circle cx="148.6" cy="109.4" r="0.6" fill="#FFFFFF" />

          {/* Dainty Nose & Mukku Pudaka */}
          <path d="M140 105 L140 118 Q138 121 136 120" stroke="rgba(194, 140, 99, 0.9)" strokeWidth="1.2" fill="none" strokeLinecap="round" />
          <circle cx="137" cy="117" r="1.2" fill="url(#gRashmithaGoldZari)" />
          <circle cx="137" cy="117" r="0.5" fill="#FFFFFF" />

          {/* Sweet Bridal Smile */}
          <path d="M136 128 Q140 131 144 128" stroke="#A01D30" strokeWidth="1.4" fill="none" strokeLinecap="round" />

          {/* Auspicious Round Kumkuma Bindi */}
          <circle cx="140" cy="104" r="2.2" fill="#A01D30" />

          {/* Central Parted Hair */}
          <path
            d="M122 105 C124 88, 134 84, 140 84 C146 84, 156 88, 158 105 C152 100, 128 100, 122 105 Z"
            fill="url(#gHairBride)"
          />

          {/* Jasmine (Mallige) Veni */}
          <g id="jasmine-veni">
            <path
              d="M116 102 C116 72, 130 64, 140 64 C150 64, 164 72, 164 102"
              stroke="#FFFFFF"
              strokeWidth="9"
              strokeLinecap="round"
              fill="none"
            />
            <circle cx="120" cy="94" r="4.5" fill="url(#gJasmineFloretBride)" stroke="url(#gRashmithaGoldZari)" strokeWidth="0.4" />
            <circle cx="124" cy="84" r="4.5" fill="#FFFFFF" stroke="url(#gRashmithaGoldZari)" strokeWidth="0.4" />
            <circle cx="131" cy="74" r="5" fill="url(#gJasmineFloretBride)" stroke="url(#gRashmithaGoldZari)" strokeWidth="0.4" />
            <circle cx="140" cy="68" r="5.2" fill="#FFFFFF" stroke="url(#gRashmithaGoldZari)" strokeWidth="0.4" />
            <circle cx="149" cy="74" r="5" fill="url(#gJasmineFloretBride)" stroke="url(#gRashmithaGoldZari)" strokeWidth="0.4" />
            <circle cx="156" cy="84" r="4.5" fill="#FFFFFF" stroke="url(#gRashmithaGoldZari)" strokeWidth="0.4" />
            <circle cx="160" cy="94" r="4.5" fill="url(#gJasmineFloretBride)" stroke="url(#gRashmithaGoldZari)" strokeWidth="0.4" />
          </g>

          {/* Maang Tikka */}
          <line x1="140" y1="84" x2="140" y2="100" stroke="url(#gRashmithaGoldZari)" strokeWidth="2" />
          <circle cx="140" cy="100" r="3.2" fill="url(#gRashmithaGoldZari)" />
          <circle cx="140" cy="100" r="1.6" fill="#A01D30" />
          <circle cx="140" cy="103.5" r="1" fill="#FFFFFF" />

          {/* Suryan & Chandran */}
          <circle cx="130" cy="88" r="3" fill="url(#gRashmithaGoldZari)" />
          <path d="M148 86 Q152 88 150 92 Q153 90 151 86 Z" fill="url(#gRashmithaGoldZari)" />
        </motion.g>

        {/* ========================================================
            5. DRAPED VARMALA AROUND BRIDE'S NECK (POST-EXCHANGE)
            Strictly hidden initially! Only visible when showDrapedGarland > 0
            Starts right behind neck at (124, 150) and (156, 150)
            ======================================================== */}
        <motion.g
          id="bride-draped-varmala"
          style={{ opacity: showDrapedGarland }}
        >
          {/* Main Garland Swag draped around neck and over saree */}
          <path
            d="M124 150 C108 185, 106 235, 118 270 C126 298, 136 316, 140 322 C144 316, 154 298, 162 270 C174 235, 172 185, 156 150"
            stroke="url(#gRosePetalBride)"
            strokeWidth="14"
            strokeLinecap="round"
            fill="none"
          />

          {/* Left Strand Flowers */}
          <circle cx="122" cy="162" r="5.5" fill="url(#gJasmineFloretBride)" />
          <circle cx="116" cy="182" r="6" fill="url(#gRosePetalBride)" />
          <circle cx="112" cy="202" r="5" fill="url(#gRashmithaGoldZari)" />
          <circle cx="110" cy="222" r="6" fill="url(#gRosePetalBride)" />
          <circle cx="111" cy="242" r="5.5" fill="url(#gJasmineFloretBride)" />
          <circle cx="116" cy="262" r="6" fill="url(#gRosePetalBride)" />
          <circle cx="124" cy="282" r="5" fill="url(#gRashmithaGoldZari)" />
          <circle cx="132" cy="300" r="6" fill="url(#gRosePetalBride)" />
          <circle cx="137" cy="314" r="5" fill="url(#gJasmineFloretBride)" />

          {/* Right Strand Flowers */}
          <circle cx="158" cy="162" r="5.5" fill="url(#gJasmineFloretBride)" />
          <circle cx="164" cy="182" r="6" fill="url(#gRosePetalBride)" />
          <circle cx="168" cy="202" r="5" fill="url(#gRashmithaGoldZari)" />
          <circle cx="170" cy="222" r="6" fill="url(#gRosePetalBride)" />
          <circle cx="169" cy="242" r="5.5" fill="url(#gJasmineFloretBride)" />
          <circle cx="164" cy="262" r="6" fill="url(#gRosePetalBride)" />
          <circle cx="156" cy="282" r="5" fill="url(#gRashmithaGoldZari)" />
          <circle cx="148" cy="300" r="6" fill="url(#gRosePetalBride)" />
          <circle cx="143" cy="314" r="5" fill="url(#gJasmineFloretBride)" />

          {/* Grand Central Gold Medallion & Tassel at Garland Base */}
          <circle cx="140" cy="324" r="8" fill="url(#gRashmithaGoldZari)" />
          <circle cx="140" cy="324" r="4.5" fill="#A01D30" />
          <path d="M140 332 L135 346 L145 346 Z" fill="url(#gRashmithaGoldZari)" />
        </motion.g>

        {/* ========================================================
            6. ARTICULATED BRIDAL ARMS & HANDS (NATURAL DUAL-ARM ELEVATION)
            Both shoulders stay anchored; forearms & hands elevate naturally in front of chest!
            ======================================================== */}
        <g id="bride-arms-assembly">
          {/* Left Shoulder & Upper Arm */}
          <motion.g
            id="bride-left-arm"
            style={{
              originX: '98px',
              originY: '166px',
              rotate: leftArmTilt,
            }}
          >
            <path
              d="M96 166 C80 192, 76 222, 80 240 C84 245, 96 245, 98 238 C98 220, 102 195, 112 174 Z"
              fill="url(#gRashmithaBlouse)"
              stroke="rgba(182, 138, 67, 0.45)"
              strokeWidth="1"
            />
            <rect x="79" y="218" width="16" height="4" fill="url(#gRashmithaGoldZari)" transform="rotate(-15 79 218)" />
          </motion.g>

          {/* Right Shoulder & Upper Arm */}
          <motion.g
            id="bride-right-arm"
            style={{
              originX: '182px',
              originY: '166px',
              rotate: rightArmTilt,
            }}
          >
            <path
              d="M184 166 C200 192, 204 222, 200 240 C196 245, 184 245, 182 238 C182 220, 178 195, 168 174 Z"
              fill="url(#gRashmithaBlouse)"
              stroke="rgba(182, 138, 67, 0.45)"
              strokeWidth="1"
            />
            <rect x="185" y="218" width="16" height="4" fill="url(#gRashmithaGoldZari)" transform="rotate(15 185 218)" />
          </motion.g>

          {/* Both Forearms & Hands: Move together in front of chest */}
          <motion.g
            id="bride-forearms-hands"
            style={{
              y: handsElevationY,
            }}
          >
            {/* Left Forearm with Glass Bangles & Mehendi */}
            <path
              d="M80 238 C86 246, 104 254, 118 250 C122 248, 120 240, 114 240 C104 242, 92 236, 88 232 Z"
              fill="url(#gSkinToneBride)"
            />
            <line x1="94" y1="238" x2="94" y2="246" stroke="#A01D30" strokeWidth="2.5" />
            <line x1="98" y1="240" x2="98" y2="248" stroke="url(#gRashmithaGoldZari)" strokeWidth="2.5" />
            <line x1="102" y1="242" x2="102" y2="250" stroke="#A01D30" strokeWidth="2.5" />
            <ellipse cx="120" cy="248" rx="6.5" ry="4.5" fill="url(#gSkinToneBride)" />
            <circle cx="119" cy="248" r="1.5" fill="#7E1522" />
            <path d="M118 244 Q126 244 127 248" stroke="rgba(194, 140, 99, 0.8)" strokeWidth="1" fill="none" />

            {/* Right Forearm with Glass Bangles & Mehendi */}
            <path
              d="M200 238 C194 246, 176 254, 162 250 C158 248, 160 240, 166 240 C176 242, 188 236, 192 232 Z"
              fill="url(#gSkinToneBride)"
            />
            <line x1="186" y1="238" x2="186" y2="246" stroke="#A01D30" strokeWidth="2.5" />
            <line x1="182" y1="240" x2="182" y2="248" stroke="url(#gRashmithaGoldZari)" strokeWidth="2.5" />
            <line x1="178" y1="242" x2="178" y2="250" stroke="#A01D30" strokeWidth="2.5" />
            <ellipse cx="160" cy="248" rx="6.5" ry="4.5" fill="url(#gSkinToneBride)" />
            <circle cx="161" cy="248" r="1.5" fill="#7E1522" />
            <path d="M162 244 Q154 244 153 248" stroke="rgba(194, 140, 99, 0.8)" strokeWidth="1" fill="none" />

            {/* ========================================================
                LOOSE FLORAL GARLAND HELD IN BRIDE'S HANDS
                Visible initially! Disappears when bride lifts garland.
                ======================================================== */}
            <motion.g
              id="bride-held-garland"
              style={{ opacity: showHeldGarland }}
            >
              <path
                d="M118 248 C120 275, 132 286, 140 286 C148 286, 160 275, 162 248"
                stroke="url(#gRosePetalBride)"
                strokeWidth="12"
                strokeLinecap="round"
                fill="none"
              />
              <circle cx="122" cy="254" r="5" fill="url(#gRosePetalBride)" />
              <circle cx="126" cy="265" r="4.5" fill="url(#gJasmineFloretBride)" />
              <circle cx="132" cy="275" r="5" fill="url(#gRosePetalBride)" />
              <circle cx="140" cy="284" r="5.5" fill="url(#gRashmithaGoldZari)" />
              <circle cx="148" cy="275" r="5" fill="url(#gRosePetalBride)" />
              <circle cx="154" cy="265" r="4.5" fill="url(#gJasmineFloretBride)" />
              <circle cx="158" cy="254" r="5" fill="url(#gRosePetalBride)" />
              <circle cx="140" cy="291" r="3.5" fill="url(#gRashmithaGoldZari)" />
            </motion.g>
          </motion.g>
        </g>
      </svg>
    </div>
  );
}
