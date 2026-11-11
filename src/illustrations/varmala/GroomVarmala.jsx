import React from 'react';
import { motion, useTransform } from 'framer-motion';

/**
 * GroomVarmala Component
 * High-detail traditional South Indian wedding illustration of Chi. Vighnesh.
 *
 * Refined Features:
 * - Mysore Peta / Royal Silk Turban in deep maroon & gold with Kalgi feather brooch
 * - Chandan & Kumkum Tilak on forehead
 * - Auspicious Kadukkam (gold ear studs) & chiseled South Indian profile
 * - Raw silk cream Kurta with fine antique-gold zari embroidery along collar & placket
 * - Angavastram (shawl) with rich zari borders draped across shoulder and chest
 * - Dhoti / Veshti (Panche) in madi/kacche style with golden kasavu borders
 * - Natural two-handed arm articulation: forearms and hands elevate naturally in front of chest
 * - Separate loose garland (held in hands) vs draped garland (worn around neck)
 *
 * @param {number} width - Render width in pixels
 * @param {MotionValue|number} armProgress - 0 = holding/resting, 1 = raised placing garland
 * @param {MotionValue|number} headTilt - degrees of respectful head bow
 * @param {MotionValue|number|boolean} showDrapedGarland - opacity/visibility of neck-worn garland
 * @param {MotionValue|number|boolean} showHeldGarland - opacity/visibility of hand-held garland
 */
export default function GroomVarmala({
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
      className={`groom-varmala-actor ${className}`}
      style={{
        display: 'inline-block',
        position: 'relative',
        width: `${width}px`,
        height: `${height}px`,
        filter: 'drop-shadow(0 16px 32px rgba(0, 0, 0, 0.45))',
        ...style,
      }}
      aria-label="Groom Chi. Vighnesh"
    >
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 280 440"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Silk Dhoti & Kurta Fabric Gradient */}
          <linearGradient id="gVighneshSilk" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="45%" stopColor="#FAF6EE" />
            <stop offset="85%" stopColor="#EFE5D3" />
            <stop offset="100%" stopColor="#E0D2BA" />
          </linearGradient>

          {/* Deep Royal Maroon Silk for Mysore Peta & Border */}
          <linearGradient id="gVighneshMaroon" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#871A27" />
            <stop offset="40%" stopColor="#6C141E" />
            <stop offset="80%" stopColor="#4A0B13" />
            <stop offset="100%" stopColor="#30050B" />
          </linearGradient>

          {/* Brilliant Antique Gold Zari Brocade */}
          <linearGradient id="gVighneshGoldZari" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#9C712C" />
            <stop offset="30%" stopColor="#DFBA73" />
            <stop offset="55%" stopColor="#FFF2D6" />
            <stop offset="80%" stopColor="#DFBA73" />
            <stop offset="100%" stopColor="#9C712C" />
          </linearGradient>

          {/* Skin Tone Gradient (Warm South Indian Complexion) */}
          <linearGradient id="gSkinToneGroom" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#E5B993" />
            <stop offset="50%" stopColor="#D29E74" />
            <stop offset="100%" stopColor="#BA8358" />
          </linearGradient>

          {/* Dark Hair Shade */}
          <linearGradient id="gHairGroom" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2A1B14" />
            <stop offset="100%" stopColor="#120A07" />
          </linearGradient>

          {/* Floral Petal Gradients for Garland */}
          <radialGradient id="gRosePetal" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#C92A3E" />
            <stop offset="70%" stopColor="#8E1424" />
            <stop offset="100%" stopColor="#5E0914" />
          </radialGradient>
          <radialGradient id="gJasmineFloret" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="65%" stopColor="#FFFDF7" />
            <stop offset="100%" stopColor="#E2DBCA" />
          </radialGradient>
        </defs>

        {/* ========================================================
            1. LOWER BODY: TRADITIONAL SILK DHOTI / PANCHE (KACCHE)
            ======================================================== */}
        <g id="groom-dhoti-legs">
          {/* Dhoti Main Body (Madi / Kacche style) */}
          <path
            d="M80 270 L66 405 C66 420, 102 426, 116 426 L124 330 L132 330 L140 426 C154 426, 190 420, 190 405 L176 270 Z"
            fill="url(#gVighneshSilk)"
            stroke="rgba(182, 138, 67, 0.45)"
            strokeWidth="1.2"
          />

          {/* Left Leg Pleat Folds */}
          <path d="M80 280 C76 330, 74 380, 70 408" stroke="rgba(182, 138, 67, 0.5)" strokeWidth="1" />
          <path d="M96 275 C94 330, 92 380, 88 418" stroke="rgba(182, 138, 67, 0.35)" strokeWidth="1" />
          <path d="M112 285 C110 330, 108 385, 106 422" stroke="rgba(182, 138, 67, 0.35)" strokeWidth="1" />

          {/* Right Leg Pleat Folds */}
          <path d="M176 280 C180 330, 182 380, 186 408" stroke="rgba(182, 138, 67, 0.5)" strokeWidth="1" />
          <path d="M160 275 C162 330, 164 380, 168 418" stroke="rgba(182, 138, 67, 0.35)" strokeWidth="1" />
          <path d="M144 285 C146 330, 148 385, 150 422" stroke="rgba(182, 138, 67, 0.35)" strokeWidth="1" />

          {/* Central Pleats (Kacche Drape) cascading down */}
          <path
            d="M120 270 C116 310, 114 360, 114 420 L138 420 C138 360, 136 310, 132 270 Z"
            fill="url(#gVighneshSilk)"
            stroke="rgba(182, 138, 67, 0.6)"
            strokeWidth="1.2"
          />
          <line x1="126" y1="270" x2="126" y2="420" stroke="url(#gVighneshGoldZari)" strokeWidth="3" />

          {/* Broad Gold Zari Border along Dhoti Hem */}
          <path
            d="M66 402 C80 408, 104 416, 116 416 L116 424 C104 424, 80 416, 66 410 Z"
            fill="url(#gVighneshGoldZari)"
          />
          <path
            d="M190 402 C176 408, 152 416, 140 416 L140 424 C152 424, 176 416, 190 410 Z"
            fill="url(#gVighneshGoldZari)"
          />

          {/* Auspicious Footwear / Feet */}
          <ellipse cx="98" cy="425" rx="13" ry="4" fill="url(#gSkinToneGroom)" />
          <ellipse cx="158" cy="425" rx="13" ry="4" fill="url(#gSkinToneGroom)" />
          <path d="M86 425 Q98 421 110 425" stroke="url(#gVighneshGoldZari)" strokeWidth="2.5" fill="none" />
          <path d="M146 425 Q158 421 170 425" stroke="url(#gVighneshGoldZari)" strokeWidth="2.5" fill="none" />
        </g>

        {/* ========================================================
            2. TORSO & UPPER ATTIRE: RAW SILK KURTA & ANGAVASTRAM
            ======================================================== */}
        <g id="groom-kurta-torso">
          {/* Kurta Silhouette */}
          <path
            d="M86 160 C76 195, 74 235, 78 276 L178 276 C182 235, 180 195, 170 160 C154 154, 130 152, 116 154 C102 156, 92 158, 86 160 Z"
            fill="url(#gVighneshSilk)"
            stroke="rgba(182, 138, 67, 0.5)"
            strokeWidth="1.2"
          />

          {/* Waist Band / Kamaravastra in Gold & Maroon */}
          <rect x="76" y="265" width="104" height="11" fill="url(#gVighneshMaroon)" rx="1" />
          <rect x="76" y="266" width="104" height="3" fill="url(#gVighneshGoldZari)" />
          <rect x="76" y="272" width="104" height="3" fill="url(#gVighneshGoldZari)" />

          {/* Kurta Center Placket with Gold Buttons */}
          <rect x="124" y="160" width="8" height="75" fill="url(#gVighneshGoldZari)" rx="1" />
          <circle cx="128" cy="172" r="2" fill="#6C141E" />
          <circle cx="128" cy="188" r="2" fill="#6C141E" />
          <circle cx="128" cy="204" r="2" fill="#6C141E" />
          <circle cx="128" cy="220" r="2" fill="#6C141E" />

          {/* Traditional Angavastram (Silk Shawl) Draped over Left Shoulder */}
          <path
            d="M92 160 C80 190, 72 230, 70 276 L86 276 C86 230, 94 190, 104 160 Z"
            fill="url(#gVighneshMaroon)"
            stroke="url(#gVighneshGoldZari)"
            strokeWidth="1.2"
          />
          <path
            d="M102 160 C114 190, 138 235, 168 268 L178 265 C146 225, 122 185, 114 160 Z"
            fill="url(#gVighneshMaroon)"
            opacity="0.9"
          />
          <path
            d="M104 162 C116 192, 140 237, 170 270"
            stroke="url(#gVighneshGoldZari)"
            strokeWidth="3.5"
            fill="none"
          />
          {/* Angavastram Gold Border & Tassels on Left */}
          <rect x="70" y="272" width="16" height="4" fill="url(#gVighneshGoldZari)" />
          <line x1="72" y1="276" x2="72" y2="284" stroke="url(#gVighneshGoldZari)" strokeWidth="1" />
          <line x1="76" y1="276" x2="76" y2="284" stroke="url(#gVighneshGoldZari)" strokeWidth="1" />
          <line x1="80" y1="276" x2="80" y2="284" stroke="url(#gVighneshGoldZari)" strokeWidth="1" />
          <line x1="84" y1="276" x2="84" y2="284" stroke="url(#gVighneshGoldZari)" strokeWidth="1" />

          {/* Traditional Gold Kasu Necklace / Kantha Mala */}
          <path
            d="M106 166 C116 186, 140 186, 150 166"
            stroke="url(#gVighneshGoldZari)"
            strokeWidth="2.5"
            fill="none"
          />
          <circle cx="128" cy="184" r="3.5" fill="url(#gVighneshGoldZari)" />
          <circle cx="128" cy="184" r="1.5" fill="#871A27" />
        </g>

        {/* ========================================================
            3. HEAD, TURBAN & NOBLE FACIAL FEATURES (TILTABLE)
            ======================================================== */}
        <motion.g
          id="groom-head-assembly"
          style={{
            originX: '128px',
            originY: '155px',
            rotate: headRotation,
          }}
        >
          {/* Regal Neck */}
          <path
            d="M118 136 L118 162 C124 165, 132 165, 138 162 L138 136 Z"
            fill="url(#gSkinToneGroom)"
            stroke="rgba(186, 131, 88, 0.4)"
            strokeWidth="1"
          />

          {/* Chin & Jawline */}
          <path
            d="M108 108 C108 142, 120 148, 128 148 C136 148, 148 142, 148 108 C148 90, 108 90, 108 108 Z"
            fill="url(#gSkinToneGroom)"
            stroke="rgba(186, 131, 88, 0.5)"
            strokeWidth="1"
          />

          {/* South Indian Kadukkam (Gold Ear Studs) */}
          <circle cx="106" cy="116" r="3" fill="url(#gVighneshGoldZari)" />
          <circle cx="106" cy="116" r="1" fill="#871A27" />
          <circle cx="150" cy="116" r="3" fill="url(#gVighneshGoldZari)" />
          <circle cx="150" cy="116" r="1" fill="#871A27" />

          {/* Facial Features */}
          <path d="M114 104 Q121 101 125 103" stroke="#22120C" strokeWidth="2" strokeLinecap="round" />
          <path d="M131 103 Q135 101 142 104" stroke="#22120C" strokeWidth="2" strokeLinecap="round" />

          {/* Serene Kohl-lined Almond Eyes */}
          <path d="M115 110 Q120 107 125 110 Q120 113 115 110 Z" fill="#FFFFFF" />
          <circle cx="120" cy="110" r="1.8" fill="#1A0D08" />
          <circle cx="120.6" cy="109.4" r="0.6" fill="#FFFFFF" />

          <path d="M131 110 Q136 107 141 110 Q136 113 131 110 Z" fill="#FFFFFF" />
          <circle cx="136" cy="110" r="1.8" fill="#1A0D08" />
          <circle cx="136.6" cy="109.4" r="0.6" fill="#FFFFFF" />

          {/* Chiseled Nose */}
          <path d="M128 105 L129 119 Q128 122 125 122" stroke="rgba(186, 131, 88, 0.9)" strokeWidth="1.2" fill="none" strokeLinecap="round" />

          {/* Refined Groom Mustache */}
          <path
            d="M120 128 Q125 126 128 127 Q131 126 136 128 Q131 130 128 128 Q125 130 120 128 Z"
            fill="#22120C"
          />

          {/* Gentle Smile */}
          <path d="M124 133 Q128 136 132 133" stroke="#871A27" strokeWidth="1.2" fill="none" strokeLinecap="round" />

          {/* Sacred Chandan & Kumkuma Tilak */}
          <line x1="128" y1="96" x2="128" y2="108" stroke="#F5ECD7" strokeWidth="3.5" strokeLinecap="round" />
          <line x1="128" y1="98" x2="128" y2="106" stroke="#9E1B28" strokeWidth="1.6" strokeLinecap="round" />

          {/* Groom Hairline at Sides */}
          <path d="M106 102 C106 114, 110 120, 110 120 L107 106 Z" fill="url(#gHairGroom)" />
          <path d="M150 102 C150 114, 146 120, 146 120 L149 106 Z" fill="url(#gHairGroom)" />

          {/* Mysore Peta / Royal Silk Turban */}
          <g id="groom-mysore-peta">
            <path
              d="M100 96 C100 68, 110 52, 128 52 C146 52, 156 68, 156 96 C150 99, 106 99, 100 96 Z"
              fill="url(#gVighneshMaroon)"
              stroke="url(#gVighneshGoldZari)"
              strokeWidth="1.2"
            />
            <path
              d="M102 92 C114 74, 134 60, 154 58 C156 64, 156 70, 154 76 C136 78, 118 88, 104 96 Z"
              fill="url(#gVighneshMaroon)"
              opacity="0.9"
            />
            <path
              d="M103 82 C118 68, 138 56, 150 54"
              stroke="url(#gVighneshGoldZari)"
              strokeWidth="2.5"
              fill="none"
            />
            <path
              d="M105 72 C120 60, 138 52, 144 52"
              stroke="url(#gVighneshGoldZari)"
              strokeWidth="2"
              fill="none"
            />
            <path
              d="M101 92 Q128 99 155 92 L154 98 Q128 105 102 98 Z"
              fill="url(#gVighneshGoldZari)"
            />
            <circle cx="128" cy="74" r="5" fill="url(#gVighneshGoldZari)" />
            <circle cx="128" cy="74" r="2.5" fill="#871A27" />
            <path
              d="M128 69 C126 56, 122 42, 128 32 C134 42, 130 56, 128 69 Z"
              fill="url(#gVighneshGoldZari)"
              stroke="#FFF2D6"
              strokeWidth="0.8"
            />
            <circle cx="128" cy="83" r="2.2" fill="#FFFFFF" stroke="url(#gVighneshGoldZari)" strokeWidth="0.5" />
          </g>
        </motion.g>

        {/* ========================================================
            4. DRAPED VARMALA AROUND GROOM'S NECK (POST-EXCHANGE)
            Strictly hidden initially! Only visible when showDrapedGarland > 0
            Starts right behind neck at (114, 150) and (142, 150)
            ======================================================== */}
        <motion.g
          id="groom-draped-varmala"
          style={{ opacity: showDrapedGarland }}
        >
          {/* Main Garland Swag draped around neck and over chest */}
          <path
            d="M112 150 C96 185, 94 235, 106 270 C114 298, 124 316, 128 322 C132 316, 142 298, 150 270 C162 235, 160 185, 144 150"
            stroke="url(#gRosePetal)"
            strokeWidth="14"
            strokeLinecap="round"
            fill="none"
          />

          {/* Left Strand Flowers */}
          <circle cx="110" cy="162" r="5.5" fill="url(#gJasmineFloret)" />
          <circle cx="104" cy="182" r="6" fill="url(#gRosePetal)" />
          <circle cx="100" cy="202" r="5" fill="url(#gVighneshGoldZari)" />
          <circle cx="98" cy="222" r="6" fill="url(#gRosePetal)" />
          <circle cx="99" cy="242" r="5.5" fill="url(#gJasmineFloret)" />
          <circle cx="104" cy="262" r="6" fill="url(#gRosePetal)" />
          <circle cx="112" cy="282" r="5" fill="url(#gVighneshGoldZari)" />
          <circle cx="120" cy="300" r="6" fill="url(#gRosePetal)" />
          <circle cx="125" cy="314" r="5" fill="url(#gJasmineFloret)" />

          {/* Right Strand Flowers */}
          <circle cx="146" cy="162" r="5.5" fill="url(#gJasmineFloret)" />
          <circle cx="152" cy="182" r="6" fill="url(#gRosePetal)" />
          <circle cx="156" cy="202" r="5" fill="url(#gVighneshGoldZari)" />
          <circle cx="158" cy="222" r="6" fill="url(#gRosePetal)" />
          <circle cx="157" cy="242" r="5.5" fill="url(#gJasmineFloret)" />
          <circle cx="152" cy="262" r="6" fill="url(#gRosePetal)" />
          <circle cx="144" cy="282" r="5" fill="url(#gVighneshGoldZari)" />
          <circle cx="136" cy="300" r="6" fill="url(#gRosePetal)" />
          <circle cx="131" cy="314" r="5" fill="url(#gJasmineFloret)" />

          {/* Grand Central Gold Medallion & Tassel at Garland Base */}
          <circle cx="128" cy="324" r="8" fill="url(#gVighneshGoldZari)" />
          <circle cx="128" cy="324" r="4.5" fill="#871A27" />
          <path d="M128 332 L123 346 L133 346 Z" fill="url(#gVighneshGoldZari)" />
        </motion.g>

        {/* ========================================================
            5. ARTICULATED ARMS & HANDS (NATURAL DUAL-ARM ELEVATION)
            Both shoulders stay anchored; forearms & hands elevate naturally in front of chest!
            ======================================================== */}
        <g id="groom-arms-assembly">
          {/* Left Shoulder & Upper Arm */}
          <motion.g
            id="groom-left-arm"
            style={{
              originX: '88px',
              originY: '166px',
              rotate: leftArmTilt,
            }}
          >
            <path
              d="M86 164 C70 190, 64 220, 68 240 C72 245, 84 245, 86 238 C86 220, 92 195, 102 174 Z"
              fill="url(#gVighneshSilk)"
              stroke="rgba(182, 138, 67, 0.45)"
              strokeWidth="1"
            />
          </motion.g>

          {/* Right Shoulder & Upper Arm */}
          <motion.g
            id="groom-right-arm"
            style={{
              originX: '168px',
              originY: '166px',
              rotate: rightArmTilt,
            }}
          >
            <path
              d="M170 164 C186 190, 192 220, 188 240 C184 245, 172 245, 170 238 C170 220, 164 195, 154 174 Z"
              fill="url(#gVighneshSilk)"
              stroke="rgba(182, 138, 67, 0.45)"
              strokeWidth="1"
            />
          </motion.g>

          {/* Both Forearms & Hands: Move together in front of chest */}
          <motion.g
            id="groom-forearms-hands"
            style={{
              y: handsElevationY,
            }}
          >
            {/* Left Forearm extension towards front */}
            <path
              d="M68 238 C74 246, 92 254, 106 250 C110 248, 108 240, 102 240 C92 242, 80 236, 76 232 Z"
              fill="url(#gSkinToneGroom)"
            />
            {/* Gold Kankana */}
            <rect x="98" y="244" width="4" height="8" fill="url(#gVighneshGoldZari)" rx="1" />
            {/* Left Hand & Fingers */}
            <ellipse cx="108" cy="248" rx="7" ry="5" fill="url(#gSkinToneGroom)" />
            <path d="M106 244 Q114 244 116 248" stroke="rgba(186, 131, 88, 0.8)" strokeWidth="1" fill="none" />

            {/* Right Forearm extension towards front */}
            <path
              d="M188 238 C182 246, 164 254, 150 250 C146 248, 148 240, 154 240 C164 242, 176 236, 180 232 Z"
              fill="url(#gSkinToneGroom)"
            />
            {/* Gold Kada */}
            <rect x="154" y="244" width="4" height="8" fill="url(#gVighneshGoldZari)" rx="1" />
            {/* Right Hand & Fingers */}
            <ellipse cx="148" cy="248" rx="7" ry="5" fill="url(#gSkinToneGroom)" />
            <path d="M150 244 Q142 244 140 248" stroke="rgba(186, 131, 88, 0.8)" strokeWidth="1" fill="none" />

            {/* ========================================================
                LOOSE FLORAL GARLAND HELD IN GROOM'S HANDS
                Visible initially! Disappears when garland lifts in-flight.
                ======================================================== */}
            <motion.g
              id="groom-held-garland"
              style={{ opacity: showHeldGarland }}
            >
              <path
                d="M106 248 C108 275, 120 286, 128 286 C136 286, 148 275, 150 248"
                stroke="url(#gRosePetal)"
                strokeWidth="12"
                strokeLinecap="round"
                fill="none"
              />
              <circle cx="110" cy="254" r="5" fill="url(#gRosePetal)" />
              <circle cx="114" cy="265" r="4.5" fill="url(#gJasmineFloret)" />
              <circle cx="120" cy="275" r="5" fill="url(#gRosePetal)" />
              <circle cx="128" cy="284" r="5.5" fill="url(#gVighneshGoldZari)" />
              <circle cx="136" cy="275" r="5" fill="url(#gRosePetal)" />
              <circle cx="142" cy="265" r="4.5" fill="url(#gJasmineFloret)" />
              <circle cx="146" cy="254" r="5" fill="url(#gRosePetal)" />
              <circle cx="128" cy="291" r="3.5" fill="url(#gVighneshGoldZari)" />
            </motion.g>
          </motion.g>
        </g>
      </svg>
    </div>
  );
}
