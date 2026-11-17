import React from 'react';
import { DiagramKind } from '../../types/encyclopedia';

interface CosmologyDiagramProps {
  kind: DiagramKind;
  title: string;
  caption: string;
}

export const CosmologyDiagram: React.FC<CosmologyDiagramProps> = ({
  kind,
  title,
  caption,
}) => {
  const renderSvg = () => {
    switch (kind) {
      case 'big-bang-timeline':
        return (
          <svg
            viewBox="0 0 460 175"
            className="w-full h-auto"
            role="img"
            aria-label={title}
          >
            <defs>
              <linearGradient id="bb-cone" x1="0%" y1="50%" x2="100%" y2="50%">
                <stop offset="0%" stopColor="var(--accent-gold)" stopOpacity="0.65" />
                <stop offset="28%" stopColor="var(--accent-gold)" stopOpacity="0.22" />
                <stop offset="100%" stopColor="var(--accent-gold)" stopOpacity="0.06" />
              </linearGradient>
              <marker id="arrow-gold" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                <path d="M0,0 L6,3 L0,6 Z" fill="var(--accent-gold)" />
              </marker>
            </defs>

            {/* Expanding cosmic horn */}
            <path
              d="M36,88 Q90,52 175,44 Q290,34 428,22 L428,154 Q290,142 175,132 Q90,124 36,88 Z"
              fill="url(#bb-cone)"
              stroke="var(--accent-gold)"
              strokeWidth="1"
              strokeOpacity="0.7"
            />
            {/* Central time axis */}
            <line
              x1="36"
              y1="88"
              x2="438"
              y2="88"
              stroke="var(--page-muted)"
              strokeWidth="0.8"
              strokeDasharray="3 3"
              markerEnd="url(#arrow-gold)"
            />

            {/* Hot early singularity glow */}
            <circle cx="36" cy="88" r="6" fill="var(--accent-gold)" />
            <circle cx="36" cy="88" r="11" stroke="var(--accent-gold)" strokeOpacity="0.45" fill="none" />

            {/* Milestone ticks */}
            {[
              { x: 112, top: '380k yr', bot: 'CMB Light' },
              { x: 205, top: '~300M yr', bot: '1st Stars' },
              { x: 318, top: '9.2B yr', bot: 'Solar System' },
              { x: 408, top: '13.8B yr', bot: 'Present' },
            ].map((m) => (
              <g key={m.top}>
                <line
                  x1={m.x}
                  y1="44"
                  x2={m.x}
                  y2="132"
                  stroke="var(--gold-hairline)"
                  strokeWidth="0.9"
                />
                <circle cx={m.x} cy="88" r="3" fill="var(--accent-gold)" />
                <text
                  x={m.x}
                  y="20"
                  textAnchor="middle"
                  fill="var(--accent-gold)"
                  fontSize="9"
                  fontWeight="600"
                >
                  {m.top}
                </text>
                <text
                  x={m.x}
                  y="165"
                  textAnchor="middle"
                  fill="var(--page-muted)"
                  fontSize="8.5"
                >
                  {m.bot}
                </text>
              </g>
            ))}

            {/* Small galaxy icons */}
            <ellipse cx="262" cy="68" rx="9" ry="4" transform="rotate(-20 262 68)" stroke="var(--page-ink)" strokeOpacity="0.65" fill="none" />
            <ellipse cx="368" cy="108" rx="11" ry="4.5" transform="rotate(15 368 108)" stroke="var(--page-ink)" strokeOpacity="0.7" fill="none" />
            <circle cx="368" cy="108" r="1.8" fill="var(--accent-gold)" />

            <text x="36" y="165" textAnchor="middle" fill="var(--page-ink)" fontSize="8.5" fontWeight="600">
              Hot Dense
            </text>
            <text x="36" y="20" textAnchor="middle" fill="var(--page-muted)" fontSize="8.5">
              t = 0
            </text>
          </svg>
        );

      case 'cosmic-expansion':
        return (
          <svg viewBox="0 0 460 175" className="w-full h-auto" role="img" aria-label={title}>
            <defs>
              <marker id="arrow-exp" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                <path d="M0,0 L6,3 L0,6 Z" fill="var(--accent-gold)" />
              </marker>
            </defs>

            {/* Earlier Grid t1 */}
            <text x="95" y="18" textAnchor="middle" fill="var(--accent-gold)" fontSize="9.5" fontWeight="600">
              Earlier Epoch (t₁)
            </text>
            <g stroke="var(--hairline)" strokeWidth="0.8">
              {[40, 68, 96, 124].map((y) => (
                <line key={`h1-${y}`} x1="40" y1={y} x2="150" y2={y} />
              ))}
              {[50, 80, 110, 140].map((x) => (
                <line key={`v1-${x}`} x1={x} y1="30" x2={x} y2="134" />
              ))}
            </g>
            <circle cx="65" cy="54" r="4" fill="var(--accent-gold)" />
            <circle cx="125" cy="110" r="4" fill="var(--accent-gold)" />
            {/* Short wavelength */}
            <path d="M72,54 Q76,46 80,54 T88,54 T96,54" fill="none" stroke="#60A5FA" strokeWidth="1.5" />
            <text x="95" y="150" textAnchor="middle" fill="var(--page-muted)" fontSize="8.5">
              Shorter wavelength (λ₁)
            </text>

            {/* Transition Arrow */}
            <line x1="172" y1="82" x2="225" y2="82" stroke="var(--accent-gold)" strokeWidth="1.4" markerEnd="url(#arrow-exp)" />
            <text x="198" y="72" textAnchor="middle" fill="var(--page-ink)" fontSize="8.5" fontWeight="600">
              Space
            </text>
            <text x="198" y="96" textAnchor="middle" fill="var(--page-muted)" fontSize="8">
              expands
            </text>

            {/* Later Expanded Grid t2 */}
            <text x="342" y="18" textAnchor="middle" fill="var(--accent-gold)" fontSize="9.5" fontWeight="600">
              Later Epoch (t₂)
            </text>
            <g stroke="var(--hairline)" strokeWidth="0.8">
              {[28, 63, 98, 133].map((y) => (
                <line key={`h2-${y}`} x1="250" y1={y} x2="434" y2={y} />
              ))}
              {[265, 312, 359, 406].map((x) => (
                <line key={`v2-${x}`} x1={x} y1="24" x2={x} y2="138" />
              ))}
            </g>
            <circle cx="288" cy="46" r="4.5" fill="var(--accent-gold)" />
            <circle cx="390" cy="116" r="4.5" fill="var(--accent-gold)" />
            {/* Stretched redshifted wavelength */}
            <path d="M296,46 Q306,34 316,46 T336,46 T356,46 T376,46" fill="none" stroke="#E07A5F" strokeWidth="1.6" />
            <text x="342" y="153" textAnchor="middle" fill="var(--page-muted)" fontSize="8.5">
              Stretched wavelength (λ₂ &gt; λ₁ · Redshift)
            </text>
          </svg>
        );

      case 'early-plasma-recombination':
        return (
          <svg viewBox="0 0 460 175" className="w-full h-auto" role="img" aria-label={title}>
            <defs>
              <marker id="arrow-rec" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                <path d="M0,0 L6,3 L0,6 Z" fill="var(--accent-gold)" />
              </marker>
            </defs>

            {/* Left panel: Opaque Plasma */}
            <rect x="20" y="26" width="175" height="114" rx="4" fill="var(--page-bg-secondary)" stroke="var(--gold-hairline)" />
            <text x="107" y="18" textAnchor="middle" fill="var(--accent-gold)" fontSize="9" fontWeight="600">
              &lt; 380,000 yrs · Opaque Plasma (&gt;3,000 K)
            </text>
            {/* Scattering photon zigzag */}
            <path d="M40,90 L64,60 L92,102 L124,52 L152,96 L176,72" fill="none" stroke="var(--accent-gold)" strokeWidth="1.3" strokeDasharray="3 2" />
            {[
              [64, 60],
              [92, 102],
              [124, 52],
              [152, 96],
            ].map(([cx, cy], idx) => (
              <circle key={idx} cx={cx} cy={cy} r="3.5" fill="var(--page-ink)" fillOpacity="0.7" />
            ))}
            <text x="107" y="156" textAnchor="middle" fill="var(--page-muted)" fontSize="8.5">
              Free electrons scatter light repeatedly
            </text>

            {/* Transition */}
            <line x1="205" y1="83" x2="252" y2="83" stroke="var(--accent-gold)" strokeWidth="1.4" markerEnd="url(#arrow-rec)" />
            <text x="228" y="73" textAnchor="middle" fill="var(--page-ink)" fontSize="8.5" fontWeight="600">
              Cooling
            </text>

            {/* Right panel: Neutral Atoms & Free Light */}
            <rect x="262" y="26" width="178" height="114" rx="4" fill="var(--page-bg-secondary)" stroke="var(--gold-hairline)" />
            <text x="351" y="18" textAnchor="middle" fill="var(--accent-gold)" fontSize="9" fontWeight="600">
              &gt; 380,000 yrs · Transparent Gas
            </text>
            {/* Straight light rays */}
            <line x1="274" y1="56" x2="424" y2="56" stroke="var(--accent-gold)" strokeWidth="1.3" markerEnd="url(#arrow-rec)" />
            <line x1="274" y1="112" x2="424" y2="112" stroke="var(--accent-gold)" strokeWidth="1.3" markerEnd="url(#arrow-rec)" />
            {/* Neutral H atoms */}
            {[
              [315, 84],
              [375, 84],
            ].map(([cx, cy], idx) => (
              <g key={idx}>
                <circle cx={cx} cy={cy} r="10" stroke="var(--page-muted)" strokeDasharray="2 2" fill="none" />
                <circle cx={cx} cy={cy} r="3" fill="var(--accent-gold)" />
                <circle cx={cx + 10} cy={cy} r="2" fill="var(--page-ink)" />
              </g>
            ))}
            <text x="351" y="156" textAnchor="middle" fill="var(--page-muted)" fontSize="8.5">
              Neutral atoms form · CMB photons travel freely
            </text>
          </svg>
        );

      case 'cosmic-hierarchy':
        return (
          <svg viewBox="0 0 460 175" className="w-full h-auto" role="img" aria-label={title}>
            <defs>
              <marker id="arrow-h" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                <path d="M0,0 L6,3 L0,6 Z" fill="var(--accent-gold)" />
              </marker>
            </defs>
            {[
              { x: 56, r: 12, label: 'Earth', scale: '12,742 km' },
              { x: 146, r: 22, label: 'Solar System', scale: '~10¹⁰ km' },
              { x: 256, r: 34, label: 'Milky Way', scale: '~100,000 ly' },
              { x: 382, r: 46, label: 'Cosmic Web', scale: '~93B ly obs.' },
            ].map((node, i, arr) => (
              <g key={node.label}>
                <circle
                  cx={node.x}
                  cy="78"
                  r={node.r}
                  fill="var(--page-bg-secondary)"
                  stroke="var(--accent-gold)"
                  strokeWidth="1.1"
                  strokeOpacity={0.9 - i * 0.12}
                />
                {i === 2 && (
                  <ellipse
                    cx={node.x}
                    cy="78"
                    rx="24"
                    ry="8"
                    transform={`rotate(-20 ${node.x} 78)`}
                    stroke="var(--page-ink)"
                    strokeOpacity="0.6"
                    fill="none"
                  />
                )}
                {i === 3 && (
                  <path
                    d="M352,60 L382,78 L412,56 M382,78 L362,108 M382,78 L408,104"
                    stroke="var(--accent-gold)"
                    strokeWidth="0.9"
                    strokeOpacity="0.7"
                  />
                )}
                <circle cx={node.x} cy="78" r="2.5" fill="var(--accent-gold)" />
                <text x={node.x} y="144" textAnchor="middle" fill="var(--page-ink)" fontSize="9.5" fontWeight="600">
                  {node.label}
                </text>
                <text x={node.x} y="158" textAnchor="middle" fill="var(--page-muted)" fontSize="8.5">
                  {node.scale}
                </text>
                {i < arr.length - 1 && (
                  <line
                    x1={node.x + node.r + 5}
                    y1="78"
                    x2={arr[i + 1].x - arr[i + 1].r - 5}
                    y2="78"
                    stroke="var(--accent-gold)"
                    strokeWidth="1"
                    markerEnd="url(#arrow-h)"
                  />
                )}
              </g>
            ))}
            <text x="230" y="16" textAnchor="middle" fill="var(--page-muted)" fontSize="8.5">
              Continuous gravitational hierarchy (observational scale comparison, not 7 rigid shells)
            </text>
          </svg>
        );

      case 'cosmic-fate-scenarios':
        return (
          <svg viewBox="0 0 460 175" className="w-full h-auto" role="img" aria-label={title}>
            {/* Axes */}
            <line x1="55" y1="142" x2="430" y2="142" stroke="var(--page-muted)" strokeWidth="1" />
            <line x1="55" y1="22" x2="55" y2="142" stroke="var(--page-muted)" strokeWidth="1" />
            <text x="242" y="162" textAnchor="middle" fill="var(--page-muted)" fontSize="8.5">
              Cosmic Time (Billions of Years)
            </text>
            <text
              x="22"
              y="82"
              textAnchor="middle"
              fill="var(--page-muted)"
              fontSize="8.5"
              transform="rotate(-90 22 82)"
            >
              Scale Factor
            </text>

            {/* Past curve up to Now */}
            <path d="M55,142 Q120,104 185,88" fill="none" stroke="var(--page-ink)" strokeWidth="1.6" />
            <line x1="185" y1="26" x2="185" y2="142" stroke="var(--gold-hairline)" strokeDasharray="3 3" />
            <circle cx="185" cy="88" r="3.5" fill="var(--accent-gold)" />
            <text x="185" y="18" textAnchor="middle" fill="var(--accent-gold)" fontSize="8.5" fontWeight="600">
              Present (13.8B yr)
            </text>

            {/* Scenario 1: Accelerating Expansion */}
            <path d="M185,88 Q280,68 415,24" fill="none" stroke="var(--accent-gold)" strokeWidth="1.8" />
            <text x="332" y="34" fill="var(--accent-gold)" fontSize="8.5" fontWeight="600">
              Accelerating (Current Fit)
            </text>

            {/* Scenario 2: Coasting */}
            <path d="M185,88 L415,74" fill="none" stroke="var(--page-muted)" strokeWidth="1.1" strokeDasharray="4 3" />
            <text x="348" y="68" fill="var(--page-muted)" fontSize="8">
              Coasting Model
            </text>

            {/* Scenario 3: Theoretical Recollapse */}
            <path d="M185,88 Q295,86 375,140" fill="none" stroke="#E07A5F" strokeWidth="1.2" strokeDasharray="3 3" />
            <text x="334" y="122" fill="#E07A5F" fontSize="8">
              Theoretical Recollapse
            </text>
          </svg>
        );

      case 'stellar-lifecycle':
        return (
          <svg viewBox="0 0 460 175" className="w-full h-auto" role="img" aria-label={title}>
            <defs>
              <marker id="arrow-st" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                <path d="M0,0 L6,3 L0,6 Z" fill="var(--accent-gold)" />
              </marker>
            </defs>
            {/* Nebula */}
            <ellipse cx="48" cy="88" rx="26" ry="18" fill="var(--page-bg-secondary)" stroke="var(--accent-gold)" strokeDasharray="3 2" />
            <text x="48" y="91" textAnchor="middle" fill="var(--page-ink)" fontSize="8.5">Nebula</text>

            <line x1="76" y1="88" x2="114" y2="88" stroke="var(--accent-gold)" markerEnd="url(#arrow-st)" />

            {/* Branch Top: Sun-like star */}
            <circle cx="145" cy="54" r="12" fill="var(--accent-gold)" fillOpacity="0.85" />
            <text x="145" y="34" textAnchor="middle" fill="var(--page-ink)" fontSize="8.5" fontWeight="600">Sun-like Star</text>
            <line x1="162" y1="54" x2="212" y2="54" stroke="var(--accent-gold)" markerEnd="url(#arrow-st)" />

            <circle cx="242" cy="54" r="20" fill="#E07A5F" fillOpacity="0.35" stroke="#E07A5F" />
            <text x="242" y="57" textAnchor="middle" fill="var(--page-ink)" fontSize="8">Red Giant</text>
            <line x1="266" y1="54" x2="318" y2="54" stroke="var(--accent-gold)" markerEnd="url(#arrow-st)" />

            <circle cx="348" cy="54" r="5" fill="var(--page-ink)" />
            <circle cx="348" cy="54" r="14" stroke="var(--gold-hairline)" strokeDasharray="2 2" fill="none" />
            <text x="348" y="34" textAnchor="middle" fill="var(--page-muted)" fontSize="8">White Dwarf</text>

            {/* Branch Bottom: Massive star */}
            <circle cx="145" cy="126" r="16" fill="#93C5FD" fillOpacity="0.4" stroke="#93C5FD" />
            <text x="145" y="156" textAnchor="middle" fill="var(--page-ink)" fontSize="8.5" fontWeight="600">Massive Star</text>
            <line x1="165" y1="126" x2="212" y2="126" stroke="var(--accent-gold)" markerEnd="url(#arrow-st)" />

            <polygon points="242,106 248,120 262,126 248,132 242,146 236,132 222,126 236,120" fill="var(--accent-gold)" fillOpacity="0.35" stroke="var(--accent-gold)" />
            <text x="242" y="156" textAnchor="middle" fill="var(--page-muted)" fontSize="8">Supernova</text>
            <line x1="266" y1="126" x2="318" y2="126" stroke="var(--accent-gold)" markerEnd="url(#arrow-st)" />

            <circle cx="348" cy="126" r="7" fill="var(--page-ink)" stroke="var(--accent-gold)" />
            <text x="348" y="156" textAnchor="middle" fill="var(--page-muted)" fontSize="8">Neutron Star / BH</text>

            <text x="415" y="88" textAnchor="middle" fill="var(--page-muted)" fontSize="8">H → He</text>
            <text x="415" y="100" textAnchor="middle" fill="var(--page-muted)" fontSize="8">Fusion</text>
          </svg>
        );

      case 'celestial-navigation':
        return (
          <svg viewBox="0 0 460 175" className="w-full h-auto" role="img" aria-label={title}>
            {/* Horizon line */}
            <line x1="36" y1="138" x2="424" y2="138" stroke="var(--page-muted)" strokeWidth="1.2" />
            <text x="48" y="153" fill="var(--page-muted)" fontSize="8.5">Local Horizon (North)</text>
            <text x="400" y="153" textAnchor="end" fill="var(--page-muted)" fontSize="8.5">Observer</text>

            {/* Celestial dome arc */}
            <path d="M56,138 A174,116 0 0,1 404,138" fill="none" stroke="var(--gold-hairline)" strokeDasharray="3 3" />

            {/* Polaris */}
            <circle cx="118" cy="54" r="4.5" fill="var(--accent-gold)" />
            <circle cx="118" cy="54" r="9" stroke="var(--accent-gold)" strokeOpacity="0.4" fill="none" />
            <text x="118" y="38" textAnchor="middle" fill="var(--accent-gold)" fontSize="9.5" fontWeight="600">
              Polaris (North Star)
            </text>

            {/* Sightline from observer to Polaris */}
            <circle cx="340" cy="138" r="3" fill="var(--page-ink)" />
            <line x1="340" y1="138" x2="124" y2="57" stroke="var(--accent-gold)" strokeWidth="1.3" strokeDasharray="4 2" />

            {/* Altitude angle arc */}
            <path d="M275,138 A65,65 0 0,1 282,116" fill="none" stroke="var(--accent-gold)" strokeWidth="1.4" />
            <text x="242" y="126" fill="var(--page-ink)" fontSize="9" fontWeight="600">
              θ ≈ Latitude
            </text>

            {/* Apparent star trails */}
            <path d="M88,36 A40,40 0 0,1 148,36" fill="none" stroke="var(--page-muted)" strokeWidth="0.9" />
            <circle cx="290" cy="46" r="2" fill="var(--page-ink)" />
            <circle cx="345" cy="72" r="2" fill="var(--page-ink)" />
          </svg>
        );

      case 'orbital-mechanics':
        return (
          <svg viewBox="0 0 460 175" className="w-full h-auto" role="img" aria-label={title}>
            <defs>
              <marker id="arrow-orb" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                <path d="M0,0 L6,3 L0,6 Z" fill="var(--accent-gold)" />
              </marker>
            </defs>
            {/* Elliptical orbit */}
            <ellipse
              cx="230"
              cy="88"
              rx="155"
              ry="60"
              fill="none"
              stroke="var(--accent-gold)"
              strokeWidth="1.3"
            />
            {/* Sun at one focus */}
            <circle cx="155" cy="88" r="14" fill="var(--accent-gold)" />
            <circle cx="155" cy="88" r="20" stroke="var(--accent-gold)" strokeOpacity="0.35" fill="none" />
            <text x="155" y="120" textAnchor="middle" fill="var(--page-ink)" fontSize="8.5" fontWeight="600">
              Focal Body (Sun)
            </text>

            {/* Perihelion & Aphelion labels */}
            <circle cx="75" cy="88" r="4.5" fill="var(--page-ink)" stroke="var(--accent-gold)" />
            <text x="48" y="74" textAnchor="middle" fill="var(--page-muted)" fontSize="8">Perihelion</text>
            <text x="48" y="106" textAnchor="middle" fill="var(--accent-gold)" fontSize="8">(Faster)</text>

            <circle cx="385" cy="88" r="4.5" fill="var(--page-ink)" stroke="var(--accent-gold)" />
            <text x="415" y="74" textAnchor="middle" fill="var(--page-muted)" fontSize="8">Aphelion</text>
            <text x="415" y="106" textAnchor="middle" fill="var(--page-muted)" fontSize="8">(Slower)</text>

            {/* Planet in upper quadrant with force & velocity vectors */}
            <circle cx="290" cy="33" r="6" fill="var(--page-bg)" stroke="var(--accent-gold)" strokeWidth="1.5" />
            {/* Velocity vector (tangent) */}
            <line x1="290" y1="33" x2="232" y2="26" stroke="var(--page-ink)" strokeWidth="1.3" markerEnd="url(#arrow-orb)" />
            <text x="255" y="18" textAnchor="middle" fill="var(--page-ink)" fontSize="8.5">Velocity (v)</text>
            {/* Gravity vector (radial inward) */}
            <line x1="290" y1="33" x2="225" y2="60" stroke="var(--accent-gold)" strokeWidth="1.4" markerEnd="url(#arrow-orb)" />
            <text x="288" y="64" fill="var(--accent-gold)" fontSize="8.5" fontWeight="600">Gravity (Fg)</text>
          </svg>
        );

      case 'solar-galactic-motion':
        return (
          <svg viewBox="0 0 460 175" className="w-full h-auto" role="img" aria-label={title}>
            <defs>
              <marker id="arrow-gal" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                <path d="M0,0 L6,3 L0,6 Z" fill="var(--accent-gold)" />
              </marker>
            </defs>
            {/* Galactic disk representation */}
            <ellipse cx="230" cy="88" rx="175" ry="60" fill="var(--page-bg-secondary)" stroke="var(--hairline)" />
            <ellipse cx="230" cy="88" rx="115" ry="38" fill="none" stroke="var(--gold-hairline)" strokeDasharray="4 3" />
            {/* Galactic core */}
            <circle cx="230" cy="88" r="14" fill="var(--accent-gold)" fillOpacity="0.8" />
            <text x="230" y="116" textAnchor="middle" fill="var(--page-muted)" fontSize="8.5">
              Milky Way Core (~26,000 ly away)
            </text>

            {/* Sun position & velocity vector */}
            <circle cx="332" cy="70" r="6" fill="var(--accent-gold)" stroke="var(--page-ink)" />
            <line x1="332" y1="70" x2="310" y2="42" stroke="var(--accent-gold)" strokeWidth="1.5" markerEnd="url(#arrow-gal)" />
            <text x="360" y="42" fill="var(--accent-gold)" fontSize="8.5" fontWeight="600">
              Sun (~230 km/s)
            </text>
            <text x="368" y="156" textAnchor="middle" fill="var(--page-muted)" fontSize="8.5">
              1 Galactic Orbit ≈ 225–250M yrs
            </text>
            <text x="95" y="156" textAnchor="middle" fill="var(--page-muted)" fontSize="8.5">
              Solar spin: ~25d (equator)
            </text>
          </svg>
        );

      case 'sun-moon-comparison':
        return (
          <svg viewBox="0 0 460 175" className="w-full h-auto" role="img" aria-label={title}>
            <defs>
              <marker id="arrow-sm" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                <path d="M0,0 L6,3 L0,6 Z" fill="var(--accent-gold)" />
              </marker>
            </defs>
            {/* Sun on Left */}
            <circle cx="96" cy="84" r="46" fill="var(--accent-gold)" fillOpacity="0.22" stroke="var(--accent-gold)" strokeWidth="1.4" />
            <circle cx="96" cy="84" r="18" fill="var(--accent-gold)" fillOpacity="0.65" />
            <text x="96" y="87" textAnchor="middle" fill="var(--page-ink)" fontSize="8.5" fontWeight="700">H → He</text>
            <text x="96" y="24" textAnchor="middle" fill="var(--accent-gold)" fontSize="9.5" fontWeight="600">
              Sun (Star · Self-Luminous)
            </text>
            <text x="96" y="150" textAnchor="middle" fill="var(--page-muted)" fontSize="8.5">
              Ø 1.39M km · Core ~15M °C
            </text>

            {/* Sunlight rays travelling to Moon */}
            <line x1="150" y1="74" x2="296" y2="74" stroke="var(--accent-gold)" strokeWidth="1.2" markerEnd="url(#arrow-sm)" />
            <line x1="150" y1="94" x2="296" y2="94" stroke="var(--accent-gold)" strokeWidth="1.2" markerEnd="url(#arrow-sm)" />
            <text x="223" y="64" textAnchor="middle" fill="var(--page-ink)" fontSize="8.5">
              Incident Sunlight
            </text>

            {/* Reflected light toward Earth */}
            <line x1="322" y1="96" x2="262" y2="132" stroke="var(--page-ink)" strokeWidth="1.1" strokeDasharray="3 2" markerEnd="url(#arrow-sm)" />
            <text x="242" y="128" fill="var(--page-muted)" fontSize="8">~12% reflected</text>

            {/* Moon on Right */}
            <circle cx="346" cy="84" r="22" fill="var(--page-bg-secondary)" stroke="var(--page-muted)" strokeWidth="1.3" />
            <path d="M346,62 A22,22 0 0,0 346,106 Z" fill="var(--accent-gold)" fillOpacity="0.4" />
            <text x="346" y="24" textAnchor="middle" fill="var(--page-ink)" fontSize="9.5" fontWeight="600">
              Moon (Natural Satellite)
            </text>
            <text x="346" y="150" textAnchor="middle" fill="var(--page-muted)" fontSize="8.5">
              Ø 3,475 km · No Fusion
            </text>
          </svg>
        );

      case 'lunar-phases-eclipses':
        return (
          <svg viewBox="0 0 460 175" className="w-full h-auto" role="img" aria-label={title}>
            {/* Sunlight direction from Right */}
            {[46, 86, 126].map((y) => (
              <line key={y} x1="438" y1={y} x2="395" y2={y} stroke="var(--accent-gold)" strokeWidth="1.2" />
            ))}
            <text x="414" y="28" textAnchor="middle" fill="var(--accent-gold)" fontSize="8.5" fontWeight="600">
              Sunlight
            </text>

            {/* Lunar Orbit Ring */}
            <circle cx="215" cy="88" r="56" fill="none" stroke="var(--gold-hairline)" strokeDasharray="3 3" />
            {/* Earth at center */}
            <circle cx="215" cy="88" r="14" fill="var(--page-bg-secondary)" stroke="var(--accent-gold)" strokeWidth="1.3" />
            <text x="215" y="91" textAnchor="middle" fill="var(--page-ink)" fontSize="8" fontWeight="600">Earth</text>

            {/* 4 Cardinal Moon Positions */}
            {/* New Moon (right, facing Sun) */}
            <circle cx="271" cy="88" r="8" fill="var(--page-bg)" stroke="var(--page-muted)" />
            <text x="312" y="91" fill="var(--page-muted)" fontSize="8">New</text>

            {/* First Quarter (top) */}
            <circle cx="215" cy="32" r="8" fill="var(--page-bg)" stroke="var(--page-muted)" />
            <path d="M215,24 A8,8 0 0,1 215,40 Z" fill="var(--accent-gold)" />
            <text x="215" y="16" textAnchor="middle" fill="var(--page-muted)" fontSize="8">First Quarter</text>

            {/* Full Moon (left) */}
            <circle cx="159" cy="88" r="8" fill="var(--accent-gold)" fillOpacity="0.85" stroke="var(--accent-gold)" />
            <text x="122" y="91" textAnchor="end" fill="var(--accent-gold)" fontSize="8" fontWeight="600">Full Moon</text>

            {/* Third Quarter (bottom) */}
            <circle cx="215" cy="144" r="8" fill="var(--page-bg)" stroke="var(--page-muted)" />
            <path d="M215,136 A8,8 0 0,1 215,152 Z" fill="var(--accent-gold)" />
            <text x="215" y="166" textAnchor="middle" fill="var(--page-muted)" fontSize="8">Last Quarter</text>

            <text x="64" y="152" textAnchor="middle" fill="var(--page-ink)" fontSize="8.5" fontWeight="600">
              Cycle: 29.53 days
            </text>
          </svg>
        );

      case 'earth-rotation-day-night':
        return (
          <svg viewBox="0 0 460 175" className="w-full h-auto" role="img" aria-label={title}>
            <defs>
              <marker id="arrow-dn" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                <path d="M0,0 L6,3 L0,6 Z" fill="var(--accent-gold)" />
              </marker>
            </defs>
            {/* Solar Rays from Left */}
            {[46, 74, 102, 130].map((y) => (
              <line key={y} x1="28" y1={y} x2="144" y2={y} stroke="var(--accent-gold)" strokeWidth="1.2" markerEnd="url(#arrow-dn)" />
            ))}
            <text x="82" y="32" textAnchor="middle" fill="var(--accent-gold)" fontSize="9" fontWeight="600">
              Solar Rays
            </text>

            {/* Earth Sphere */}
            <circle cx="240" cy="88" r="52" fill="var(--page-bg-secondary)" stroke="var(--accent-gold)" strokeWidth="1.2" />
            {/* Day hemisphere */}
            <path d="M240,36 A52,52 0 0,0 240,140 Z" fill="var(--accent-gold)" fillOpacity="0.28" />
            {/* Tilted Axis 23.4° */}
            <line x1="220" y1="152" x2="260" y2="24" stroke="var(--page-ink)" strokeWidth="1.2" strokeDasharray="3 2" />
            <text x="275" y="28" fill="var(--page-ink)" fontSize="8.5">23.44° Axial Tilt</text>

            {/* Rotation arrow */}
            <path d="M214,68 A28,10 0 0,0 264,68" fill="none" stroke="var(--accent-gold)" strokeWidth="1.4" markerEnd="url(#arrow-dn)" />

            <text x="205" y="92" textAnchor="middle" fill="var(--page-ink)" fontSize="9.5" fontWeight="600">Day</text>
            <text x="272" y="92" textAnchor="middle" fill="var(--page-muted)" fontSize="9.5" fontWeight="600">Night</text>
            <text x="240" y="166" textAnchor="middle" fill="var(--page-muted)" fontSize="8.5">
              Sidereal Spin: 23 h 56 m 4 s · Solar Day: 24 h
            </text>
          </svg>
        );

      case 'atmosphere-shield':
        return (
          <svg viewBox="0 0 460 175" className="w-full h-auto" role="img" aria-label={title}>
            {/* Curved Earth surface at bottom */}
            <path d="M24,158 Q230,122 436,158 L436,170 L24,170 Z" fill="var(--page-bg-secondary)" stroke="var(--accent-gold)" />
            <text x="230" y="160" textAnchor="middle" fill="var(--page-ink)" fontSize="8.5" fontWeight="600">Earth Surface (0 km)</text>

            {/* Troposphere */}
            <path d="M24,132 Q230,96 436,132" fill="none" stroke="var(--hairline)" strokeWidth="1" />
            <text x="48" y="128" fill="var(--page-muted)" fontSize="8">Troposphere (0–12 km · Weather)</text>

            {/* Stratosphere & Ozone Band */}
            <path d="M24,102 Q230,66 436,102" fill="none" stroke="var(--accent-gold)" strokeWidth="2.5" strokeOpacity="0.45" />
            <text x="230" y="88" textAnchor="middle" fill="var(--accent-gold)" fontSize="8.5" fontWeight="600">
              Stratospheric Ozone (~15–35 km · UV-B Filter)
            </text>

            {/* Mesosphere & Thermosphere */}
            <path d="M24,62 Q230,26 436,62" fill="none" stroke="var(--gold-hairline)" strokeDasharray="3 3" />
            <text x="348" y="54" textAnchor="middle" fill="var(--page-muted)" fontSize="8">Mesosphere &amp; Thermosphere</text>

            {/* Deflected UV / Meteoroid */}
            <path d="M108,16 L136,78 L98,42" fill="none" stroke="#E07A5F" strokeWidth="1.2" />
            <text x="90" y="20" fill="#E07A5F" fontSize="8">Harmful UV-B attenuated</text>
          </svg>
        );

      case 'scientific-observation':
        return (
          <svg viewBox="0 0 460 175" className="w-full h-auto" role="img" aria-label={title}>
            {/* Spectrum Bar */}
            <text x="230" y="22" textAnchor="middle" fill="var(--accent-gold)" fontSize="9.5" fontWeight="600">
              Electromagnetic Spectrum in Observational Astronomy
            </text>
            {[
              { x: 30, w: 75, label: 'Radio', sub: 'Cold Gas / CMB' },
              { x: 110, w: 75, label: 'Infrared', sub: 'JWST / Dust' },
              { x: 190, w: 75, label: 'Visible', sub: 'Stars / Galaxies' },
              { x: 270, w: 75, label: 'Ultraviolet', sub: 'Hot Young Stars' },
              { x: 350, w: 80, label: 'X-Ray', sub: 'Black Holes' },
            ].map((band) => (
              <g key={band.label}>
                <rect
                  x={band.x}
                  y="44"
                  width={band.w}
                  height="38"
                  rx="2"
                  fill="var(--page-bg-secondary)"
                  stroke="var(--gold-hairline)"
                />
                <text x={band.x + band.w / 2} y="62" textAnchor="middle" fill="var(--page-ink)" fontSize="9" fontWeight="600">
                  {band.label}
                </text>
                <text x={band.x + band.w / 2} y="75" textAnchor="middle" fill="var(--page-muted)" fontSize="7.5">
                  {band.sub}
                </text>
              </g>
            ))}

            {/* Wavelength illustration */}
            <path
              d="M36,120 Q56,98 76,120 T116,120 T156,120 Q170,104 184,120 T212,120 T240,120 Q248,108 256,120 T272,120 T288,120 T304,120 T320,120 T336,120 T352,120 T368,120 T384,120 T400,120 T416,120"
              fill="none"
              stroke="var(--accent-gold)"
              strokeWidth="1.4"
            />
            <text x="64" y="152" fill="var(--page-muted)" fontSize="8.5">Long Wavelength</text>
            <text x="396" y="152" textAnchor="end" fill="var(--page-muted)" fontSize="8.5">Short Wavelength / High Energy</text>
          </svg>
        );
    }
  };

  return (
    <figure className="p-3 border border-[var(--gold-hairline)] bg-[var(--page-bg-secondary)]/55 rounded-sm">
      <div className="flex items-center justify-between gap-2 pb-1.5 mb-2 border-b border-[var(--hairline)]">
        <span className="text-[10px] uppercase tracking-[0.16em] font-semibold text-[var(--accent-gold)]">
          Scientific Diagram
        </span>
        <span className="text-[11px] font-editorial italic text-[var(--page-ink)] truncate">
          {title}
        </span>
      </div>
      <div className="w-full overflow-hidden">{renderSvg()}</div>
      <figcaption className="mt-2 pt-1.5 border-t border-[var(--hairline)] text-[11px] leading-snug text-[var(--page-muted)]">
        {caption}
      </figcaption>
    </figure>
  );
};
