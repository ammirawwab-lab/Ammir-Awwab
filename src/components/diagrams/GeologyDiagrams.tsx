import React from 'react';
import { GeologyDiagramKind } from '../../types/encyclopedia';

interface GeologyDiagramProps {
  kind: GeologyDiagramKind;
  title: string;
  caption: string;
}

export const GeologyDiagram: React.FC<GeologyDiagramProps> = ({
  kind,
  title,
  caption,
}) => {
  const renderSvg = () => {
    switch (kind) {
      case 'earth-habitable-zones':
        return (
          <svg viewBox="0 0 460 175" className="w-full h-auto" role="img" aria-label={title}>
            {/* Sky / Atmosphere envelope */}
            <path
              d="M20,48 Q230,22 440,48"
              fill="none"
              stroke="var(--gold-hairline)"
              strokeDasharray="3 3"
            />
            <text x="230" y="25" textAnchor="middle" fill="var(--page-muted)" fontSize="8.5">
              Atmosphere (78% N₂, 21% O₂)
            </text>

            {/* Terrain profile: Mountains -> Plains -> Coast -> Ocean Basin */}
            <path
              d="M20,108 L65,58 L98,92 L135,52 L175,104 L285,104 L322,126 L440,126 L440,156 L20,156 Z"
              fill="var(--page-bg-secondary)"
              stroke="var(--accent-gold)"
              strokeWidth="1.2"
            />
            {/* Water in ocean basin */}
            <path
              d="M285,108 L440,108 L440,126 L322,126 Z"
              fill="#7EB8AE"
              fillOpacity="0.28"
              stroke="#7EB8AE"
              strokeWidth="0.9"
            />
            <text x="102" y="132" textAnchor="middle" fill="var(--page-ink)" fontSize="8.5" fontWeight="600">
              Mountain Uplift
            </text>
            <text x="230" y="96" textAnchor="middle" fill="var(--accent-gold)" fontSize="8.5" fontWeight="600">
              Habitable Plains &amp; Soil
            </text>
            <text x="382" y="120" textAnchor="middle" fill="var(--page-ink)" fontSize="8.5">
              Ocean Basin (~71%)
            </text>
            <text x="230" y="169" textAnchor="middle" fill="var(--page-muted)" fontSize="8">
              Solid Continental Crust (~30–70 km thick) · Mean Earth Radius 6,371 km
            </text>
          </svg>
        );

      case 'mountain-isostasy-roots':
        return (
          <svg viewBox="0 0 460 175" className="w-full h-auto" role="img" aria-label={title}>
            <defs>
              <marker id="arrow-iso" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                <path d="M0,0 L6,3 L0,6 Z" fill="var(--accent-gold)" />
              </marker>
            </defs>
            {/* Upper mantle background */}
            <rect x="24" y="96" width="412" height="62" fill="var(--page-bg-secondary)" fillOpacity="0.55" />
            <text x="392" y="146" textAnchor="end" fill="var(--page-muted)" fontSize="8.5">
              Denser Upper Mantle
            </text>

            {/* Continental Crust + Deep Mountain Root (Airy Isostasy) */}
            <path
              d="M24,78 L145,78 L195,32 L225,52 L255,26 L305,78 L436,78 L436,104 L315,104 Q255,152 225,148 Q195,152 135,104 L24,104 Z"
              fill="var(--page-bg)"
              stroke="var(--accent-gold)"
              strokeWidth="1.4"
            />
            <text x="80" y="94" textAnchor="middle" fill="var(--page-muted)" fontSize="8">
              Normal Crust (~35 km)
            </text>
            <text x="230" y="78" textAnchor="middle" fill="var(--page-ink)" fontSize="9" fontWeight="600">
              Mountain Range
            </text>
            <text x="230" y="126" textAnchor="middle" fill="var(--accent-gold)" fontSize="9" fontWeight="600">
              Deep Crustal Root (~70 km)
            </text>

            {/* Buoyancy arrows */}
            <line x1="210" y1="158" x2="210" y2="140" stroke="var(--accent-gold)" strokeWidth="1.2" markerEnd="url(#arrow-iso)" />
            <line x1="250" y1="158" x2="250" y2="140" stroke="var(--accent-gold)" strokeWidth="1.2" markerEnd="url(#arrow-iso)" />
            <text x="230" y="170" textAnchor="middle" fill="var(--page-muted)" fontSize="8">
              Isostatic Buoyancy Balance (varies across ranges; peg analogy is non-technical)
            </text>
          </svg>
        );

      case 'plate-tectonics-collision':
        return (
          <svg viewBox="0 0 460 175" className="w-full h-auto" role="img" aria-label={title}>
            <defs>
              <marker id="arrow-pt" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                <path d="M0,0 L6,3 L0,6 Z" fill="var(--accent-gold)" />
              </marker>
            </defs>
            {/* Left Plate pushing right */}
            <path d="M24,84 L180,84 L218,128 L24,128 Z" fill="var(--page-bg-secondary)" stroke="var(--accent-gold)" strokeWidth="1.2" />
            <line x1="56" y1="106" x2="132" y2="106" stroke="var(--accent-gold)" strokeWidth="1.6" markerEnd="url(#arrow-pt)" />
            <text x="94" y="99" textAnchor="middle" fill="var(--page-ink)" fontSize="8.5" fontWeight="600">
              Plate A (~4–5 cm/yr)
            </text>

            {/* Right Plate pushing left + Mountain Fold Belt */}
            <path d="M180,84 L225,38 L256,56 L285,42 L318,84 L436,84 L436,128 L218,128 Z" fill="var(--page-bg)" stroke="var(--accent-gold)" strokeWidth="1.3" />
            <line x1="404" y1="106" x2="328" y2="106" stroke="var(--accent-gold)" strokeWidth="1.6" markerEnd="url(#arrow-pt)" />
            <text x="368" y="99" textAnchor="middle" fill="var(--page-ink)" fontSize="8.5" fontWeight="600">
              Plate B
            </text>

            {/* Active Thrust Fault & Seismic Focus */}
            <line x1="184" y1="84" x2="236" y2="124" stroke="#E07A5F" strokeWidth="1.5" strokeDasharray="3 2" />
            <circle cx="212" cy="105" r="5" fill="#E07A5F" />
            <circle cx="212" cy="105" r="11" stroke="#E07A5F" strokeOpacity="0.6" fill="none" />
            <text x="256" y="24" textAnchor="middle" fill="var(--accent-gold)" fontSize="9" fontWeight="600">
              Collision Raises Mountains &amp; Generates Earthquakes
            </text>
            <text x="230" y="156" textAnchor="middle" fill="var(--page-muted)" fontSize="8.5">
              Active thrust faults along convergent boundaries make mountain belts seismically active
            </text>
          </svg>
        );

      case 'mountain-mineral-strata':
        return (
          <svg viewBox="0 0 460 175" className="w-full h-auto" role="img" aria-label={title}>
            {/* Folded colored mineral bands */}
            <path d="M30,140 L90,52 L175,86 L255,34 L345,76 L430,140 Z" fill="var(--page-bg-secondary)" stroke="var(--accent-gold)" strokeWidth="1.2" />
            {/* Red iron-oxide band */}
            <path d="M55,120 Q150,72 255,66 Q340,78 402,120 L388,132 Q332,96 255,84 Q152,88 70,132 Z" fill="#C2593F" fillOpacity="0.45" stroke="#C2593F" strokeOpacity="0.8" />
            {/* Pale limestone/calcite band */}
            <path d="M70,132 Q152,88 255,84 Q332,96 388,132 L374,140 L84,140 Z" fill="#EAE2D3" fillOpacity="0.55" stroke="var(--hairline)" />
            {/* Dark basalt/organic band */}
            <path d="M128,140 Q215,108 326,140 Z" fill="#1F2937" fillOpacity="0.65" stroke="var(--page-muted)" />

            <text x="255" y="22" textAnchor="middle" fill="var(--accent-gold)" fontSize="9" fontWeight="600">
              Mineral Composition Controls Rock Color
            </text>
            <text x="115" y="160" textAnchor="middle" fill="#E07A5F" fontSize="8">
              Red: Iron Oxides (Fe₂O₃)
            </text>
            <text x="242" y="160" textAnchor="middle" fill="var(--page-ink)" fontSize="8">
              White: Calcite / Quartz
            </text>
            <text x="366" y="160" textAnchor="middle" fill="var(--page-muted)" fontSize="8">
              Dark: Basalt / Carbon
            </text>
          </svg>
        );

      case 'mountain-passes-watersheds':
        return (
          <svg viewBox="0 0 460 175" className="w-full h-auto" role="img" aria-label={title}>
            <defs>
              <marker id="arrow-ws" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                <path d="M0,0 L6,3 L0,6 Z" fill="#7EB8AE" />
              </marker>
            </defs>
            {/* Mountain peaks with eroded saddle pass in center */}
            <path
              d="M24,136 L98,42 L168,94 L230,94 L305,36 L436,136 Z"
              fill="var(--page-bg-secondary)"
              stroke="var(--accent-gold)"
              strokeWidth="1.3"
            />
            {/* Pass highlight */}
            <path d="M168,94 Q200,104 230,94" fill="none" stroke="var(--accent-gold)" strokeWidth="2.2" />
            <text x="199" y="82" textAnchor="middle" fill="var(--accent-gold)" fontSize="9" fontWeight="600">
              Mountain Pass (Saddle)
            </text>

            {/* Orographic rain cloud & rivers */}
            <ellipse cx="320" cy="24" rx="34" ry="10" fill="var(--page-bg)" stroke="var(--page-muted)" />
            <text x="320" y="27" textAnchor="middle" fill="var(--page-muted)" fontSize="7.5">Precipitation</text>

            <path d="M305,46 Q332,90 385,134" fill="none" stroke="#7EB8AE" strokeWidth="1.6" markerEnd="url(#arrow-ws)" />
            <path d="M102,52 Q84,96 46,134" fill="none" stroke="#7EB8AE" strokeWidth="1.6" markerEnd="url(#arrow-ws)" />

            <text x="72" y="156" textAnchor="middle" fill="#7EB8AE" fontSize="8.5">
              Watershed Runoff
            </text>
            <text x="366" y="156" textAnchor="middle" fill="#7EB8AE" fontSize="8.5">
              River Drainage Basin
            </text>
          </svg>
        );

      case 'rock-excavation-weathering':
        return (
          <svg viewBox="0 0 460 175" className="w-full h-auto" role="img" aria-label={title}>
            {/* Stratified Cliff Face */}
            <rect x="46" y="34" width="368" height="108" fill="var(--page-bg-secondary)" stroke="var(--accent-gold)" strokeWidth="1.2" />
            {[62, 88, 114].map((y) => (
              <line key={y} x1="46" y1={y} x2="414" y2={y} stroke="var(--hairline)" strokeDasharray="4 2" />
            ))}
            {/* Carved chamber / entrance */}
            <path d="M196,142 L196,86 Q230,68 264,86 L264,142 Z" fill="var(--page-bg)" stroke="var(--accent-gold)" strokeWidth="1.4" />
            <text x="230" y="114" textAnchor="middle" fill="var(--page-ink)" fontSize="8.5" fontWeight="600">
              Excavated
            </text>
            <text x="230" y="126" textAnchor="middle" fill="var(--page-ink)" fontSize="8.5" fontWeight="600">
              Chamber
            </text>

            <text x="118" y="52" textAnchor="middle" fill="var(--page-muted)" fontSize="8">
              Horizontal Bedding Planes
            </text>
            <text x="344" y="52" textAnchor="middle" fill="var(--page-muted)" fontSize="8">
              Cohesive Sandstone / Tuff
            </text>
            <text x="230" y="160" textAnchor="middle" fill="var(--page-muted)" fontSize="8.5">
              Rock engineering depends on compressive strength, fracture spacing &amp; slope drainage
            </text>
          </svg>
        );

      case 'erosion-mass-wasting':
        return (
          <svg viewBox="0 0 460 175" className="w-full h-auto" role="img" aria-label={title}>
            <defs>
              <marker id="arrow-er" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                <path d="M0,0 L6,3 L0,6 Z" fill="var(--accent-gold)" />
              </marker>
            </defs>
            {/* Mountain slope */}
            <path d="M36,136 L112,38 L168,78 L280,136 L432,136 Z" fill="var(--page-bg-secondary)" stroke="var(--accent-gold)" strokeWidth="1.2" />
            {/* Downslope transport arrow */}
            <line x1="138" y1="54" x2="255" y2="114" stroke="var(--accent-gold)" strokeWidth="1.4" markerEnd="url(#arrow-er)" />
            {/* Fragmented rock grains / alluvial fan */}
            {[
              [236, 128, 4],
              [254, 130, 3.5],
              [274, 132, 3],
              [296, 133, 2.5],
              [318, 134, 2],
              [344, 134, 1.5],
            ].map(([cx, cy, r], idx) => (
              <circle key={idx} cx={cx} cy={cy} r={r} fill="var(--accent-gold)" fillOpacity="0.8" />
            ))}
            <text x="108" y="26" textAnchor="middle" fill="var(--accent-gold)" fontSize="9" fontWeight="600">
              1. Weathering
            </text>
            <text x="218" y="72" textAnchor="middle" fill="var(--page-ink)" fontSize="8.5" fontWeight="600">
              2. Erosion &amp; Transport
            </text>
            <text x="342" y="118" textAnchor="middle" fill="var(--page-muted)" fontSize="8.5">
              3. Sediment Deposition
            </text>
            <text x="230" y="160" textAnchor="middle" fill="var(--page-muted)" fontSize="8">
              Gradual geological denudation unfolds over millions of years (distinct from eschatology)
            </text>
          </svg>
        );

      case 'earthquake-fault-mechanics':
        return (
          <svg viewBox="0 0 460 175" className="w-full h-auto" role="img" aria-label={title}>
            <defs>
              <marker id="arrow-eq" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                <path d="M0,0 L6,3 L0,6 Z" fill="#E07A5F" />
              </marker>
            </defs>
            {/* Crust block cut by fault line */}
            <path d="M36,44 L245,44 L215,138 L36,138 Z" fill="var(--page-bg-secondary)" stroke="var(--gold-hairline)" />
            <path d="M245,44 L424,44 L424,138 L215,138 Z" fill="var(--page-bg)" stroke="var(--gold-hairline)" />

            {/* Fault slip arrows */}
            <line x1="216" y1="68" x2="206" y2="98" stroke="#E07A5F" strokeWidth="1.4" markerEnd="url(#arrow-eq)" />
            <line x1="242" y1="108" x2="252" y2="78" stroke="#E07A5F" strokeWidth="1.4" markerEnd="url(#arrow-eq)" />

            {/* Hypocenter (Focus) and seismic rings */}
            <circle cx="228" cy="96" r="5" fill="#E07A5F" />
            <circle cx="228" cy="96" r="14" stroke="#E07A5F" strokeOpacity="0.65" fill="none" />
            <circle cx="228" cy="96" r="24" stroke="#E07A5F" strokeOpacity="0.35" strokeDasharray="3 2" fill="none" />

            {/* Epicenter on surface */}
            <line x1="228" y1="44" x2="228" y2="91" stroke="var(--page-muted)" strokeDasharray="2 2" />
            <circle cx="228" cy="44" r="4" fill="var(--accent-gold)" />
            <text x="228" y="32" textAnchor="middle" fill="var(--accent-gold)" fontSize="9" fontWeight="600">
              Epicenter (Surface)
            </text>
            <text x="316" y="102" fill="#E07A5F" fontSize="8.5" fontWeight="600">
              Hypocenter (Focus)
            </text>
            <text x="230" y="160" textAnchor="middle" fill="var(--page-muted)" fontSize="8">
              Sudden fault slip releases stored elastic strain as radiating seismic P- and S-waves
            </text>
          </svg>
        );

      case 'geologic-time-strata':
        return (
          <svg viewBox="0 0 460 175" className="w-full h-auto" role="img" aria-label={title}>
            <defs>
              <marker id="arrow-gt" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                <path d="M0,0 L6,3 L0,6 Z" fill="var(--accent-gold)" />
              </marker>
            </defs>
            {/* Horizontal Timeline */}
            <line x1="36" y1="88" x2="424" y2="88" stroke="var(--accent-gold)" strokeWidth="1.5" markerEnd="url(#arrow-gt)" />
            {[
              { x: 48, top: '4.54B yr', bot: 'Earth Accretion' },
              { x: 148, top: '~4.4B yr', bot: 'Oldest Minerals' },
              { x: 256, top: '~3.8B yr', bot: 'Early Oceans & Crust' },
              { x: 386, top: 'Present', bot: 'Modern Continents' },
            ].map((t) => (
              <g key={t.top}>
                <circle cx={t.x} cy="88" r="4.5" fill="var(--accent-gold)" />
                <text x={t.x} y="66" textAnchor="middle" fill="var(--accent-gold)" fontSize="9" fontWeight="600">
                  {t.top}
                </text>
                <text x={t.x} y="110" textAnchor="middle" fill="var(--page-ink)" fontSize="8.5">
                  {t.bot}
                </text>
              </g>
            ))}
            <text x="230" y="24" textAnchor="middle" fill="var(--page-ink)" fontSize="9.5" fontWeight="600">
              Radiometric Chronology of Earth History
            </text>
            <text x="230" y="156" textAnchor="middle" fill="var(--page-muted)" fontSize="8">
              Measured via isotope decay in meteorites &amp; zircons (distinct from theological day imagery)
            </text>
          </svg>
        );

      case 'soil-hydrology-aquifer':
        return (
          <svg viewBox="0 0 460 175" className="w-full h-auto" role="img" aria-label={title}>
            <defs>
              <marker id="arrow-aq" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                <path d="M0,0 L6,3 L0,6 Z" fill="#7EB8AE" />
              </marker>
            </defs>
            {/* Rain arrows */}
            {[95, 135, 175].map((x) => (
              <line key={x} x1={x} y1="18" x2={x} y2="48" stroke="#7EB8AE" strokeWidth="1.2" strokeDasharray="3 2" markerEnd="url(#arrow-aq)" />
            ))}
            <text x="135" y="13" textAnchor="middle" fill="#7EB8AE" fontSize="8.5" fontWeight="600">
              Rainfall &amp; Infiltration
            </text>

            {/* Surface & hillside */}
            <path d="M24,54 L250,54 L318,96 L436,96 L436,154 L24,154 Z" fill="var(--page-bg-secondary)" stroke="var(--accent-gold)" strokeWidth="1.2" />

            {/* Saturated Aquifer Zone */}
            <path d="M24,94 L314,94 L436,94 L436,126 L24,126 Z" fill="#7EB8AE" fillOpacity="0.25" />
            <line x1="24" y1="94" x2="314" y2="94" stroke="#7EB8AE" strokeWidth="1.4" strokeDasharray="4 2" />
            {/* Confining clay bedrock */}
            <rect x="24" y="126" width="412" height="28" fill="var(--page-bg)" fillOpacity="0.65" stroke="var(--hairline)" />

            {/* Groundwater flow & Spring */}
            <line x1="85" y1="110" x2="295" y2="104" stroke="#7EB8AE" strokeWidth="1.5" markerEnd="url(#arrow-aq)" />
            <circle cx="318" cy="96" r="4" fill="#7EB8AE" />
            <text x="355" y="84" fill="#7EB8AE" fontSize="8.5" fontWeight="600">
              Natural Spring
            </text>
            <text x="155" y="76" textAnchor="middle" fill="var(--page-muted)" fontSize="8">
              Unsaturated Soil / Root Zone
            </text>
            <text x="155" y="116" textAnchor="middle" fill="var(--page-ink)" fontSize="8.5" fontWeight="600">
              Porous Aquifer (~30.1% of global freshwater)
            </text>
            <text x="230" y="143" textAnchor="middle" fill="var(--page-muted)" fontSize="8">
              Impermeable Bedrock / Clay Confining Layer
            </text>
          </svg>
        );

      case 'clay-weathering-ceramics':
        return (
          <svg viewBox="0 0 460 175" className="w-full h-auto" role="img" aria-label={title}>
            <defs>
              <marker id="arrow-cl" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                <path d="M0,0 L6,3 L0,6 Z" fill="var(--accent-gold)" />
              </marker>
            </defs>
            {/* Stage 1: Parent Rock */}
            <rect x="26" y="46" width="96" height="72" rx="3" fill="var(--page-bg-secondary)" stroke="var(--accent-gold)" />
            <text x="74" y="80" textAnchor="middle" fill="var(--page-ink)" fontSize="8.5" fontWeight="600">Silicate Rock</text>
            <text x="74" y="94" textAnchor="middle" fill="var(--page-muted)" fontSize="7.5">Weathering</text>

            <line x1="128" y1="82" x2="168" y2="82" stroke="var(--accent-gold)" markerEnd="url(#arrow-cl)" />

            {/* Stage 2: Wet Plastic Clay Platelets */}
            <rect x="176" y="46" width="112" height="72" rx="3" fill="var(--page-bg-secondary)" stroke="var(--gold-hairline)" />
            {[58, 72, 86, 100].map((y) => (
              <line key={y} x1="194" y1={y} x2="270" y2={y} stroke="var(--accent-gold)" strokeWidth="2" />
            ))}
            <text x="232" y="34" textAnchor="middle" fill="var(--accent-gold)" fontSize="8.5" fontWeight="600">
              Hydrated Clay Sheets (&lt;2 µm)
            </text>
            <text x="232" y="132" textAnchor="middle" fill="var(--page-muted)" fontSize="8">
              Water lubricates sliding platelets
            </text>

            <line x1="294" y1="82" x2="334" y2="82" stroke="var(--accent-gold)" markerEnd="url(#arrow-cl)" />

            {/* Stage 3: Fired Ceramic */}
            <rect x="342" y="46" width="92" height="72" rx="3" fill="#C2593F" fillOpacity="0.25" stroke="#E07A5F" />
            <text x="388" y="78" textAnchor="middle" fill="var(--page-ink)" fontSize="8.5" fontWeight="600">Hard Ceramic</text>
            <text x="388" y="94" textAnchor="middle" fill="var(--page-muted)" fontSize="7.5">Dried / Fired</text>

            <text x="230" y="160" textAnchor="middle" fill="var(--page-muted)" fontSize="8">
              Clay mineralogy &amp; water-rock chemistry govern plasticity, permeability, and ceramic hardening
            </text>
          </svg>
        );

      case 'iron-metallurgy':
        return (
          <svg viewBox="0 0 460 175" className="w-full h-auto" role="img" aria-label={title}>
            <defs>
              <marker id="arrow-met" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                <path d="M0,0 L6,3 L0,6 Z" fill="var(--accent-gold)" />
              </marker>
            </defs>
            {/* Box 1: Origins */}
            <rect x="24" y="42" width="124" height="82" rx="3" fill="var(--page-bg-secondary)" stroke="var(--gold-hairline)" />
            <text x="86" y="64" textAnchor="middle" fill="var(--accent-gold)" fontSize="8.5" fontWeight="600">
              Crustal Ores &amp; Origins
            </text>
            <text x="86" y="82" textAnchor="middle" fill="var(--page-ink)" fontSize="8">
              Fe ~5% of Earth’s crust
            </text>
            <text x="86" y="96" textAnchor="middle" fill="var(--page-muted)" fontSize="7.5">
              Primordial stellar accretion
            </text>
            <text x="86" y="110" textAnchor="middle" fill="var(--page-muted)" fontSize="7.5">
              + crustal ore deposits
            </text>

            <line x1="154" y1="83" x2="184" y2="83" stroke="var(--accent-gold)" markerEnd="url(#arrow-met)" />

            {/* Box 2: Smelting / Melting */}
            <rect x="190" y="42" width="118" height="82" rx="3" fill="#E07A5F" fillOpacity="0.16" stroke="#E07A5F" />
            <text x="249" y="64" textAnchor="middle" fill="#E07A5F" fontSize="8.5" fontWeight="600">
              High-Temp Melting
            </text>
            <text x="249" y="84" textAnchor="middle" fill="var(--page-ink)" fontSize="8">
              Copper Mp: 1,085 °C
            </text>
            <text x="249" y="100" textAnchor="middle" fill="var(--page-ink)" fontSize="8">
              Iron Mp: 1,538 °C
            </text>

            <line x1="314" y1="83" x2="344" y2="83" stroke="var(--accent-gold)" markerEnd="url(#arrow-met)" />

            {/* Box 3: Engineering Alloys */}
            <rect x="350" y="42" width="88" height="82" rx="3" fill="var(--page-bg-secondary)" stroke="var(--accent-gold)" />
            <text x="394" y="68" textAnchor="middle" fill="var(--accent-gold)" fontSize="8.5" fontWeight="600">
              Alloys &amp; Use
            </text>
            <text x="394" y="86" textAnchor="middle" fill="var(--page-ink)" fontSize="8">
              Steel (Fe + C)
            </text>
            <text x="394" y="100" textAnchor="middle" fill="var(--page-muted)" fontSize="7.5">
              Castings &amp; Tools
            </text>

            <text x="230" y="156" textAnchor="middle" fill="var(--page-muted)" fontSize="8">
              Note: Terrestrial iron has both primordial planetary and crustal geological origins
            </text>
          </svg>
        );

      case 'earth-interior-layers':
        return (
          <svg viewBox="0 0 460 175" className="w-full h-auto" role="img" aria-label={title}>
            {/* Concentric wedge cross-section of Earth's 4 seismic regions */}
            <circle cx="135" cy="88" r="68" fill="var(--page-bg-secondary)" stroke="var(--accent-gold)" strokeWidth="1.5" />
            <circle cx="135" cy="88" r="62" fill="var(--page-bg)" stroke="var(--gold-hairline)" />
            <circle cx="135" cy="88" r="37" fill="#E07A5F" fillOpacity="0.28" stroke="#E07A5F" />
            <circle cx="135" cy="88" r="16" fill="var(--accent-gold)" fillOpacity="0.75" stroke="var(--accent-gold)" />

            {/* Leader lines to labels on right */}
            <line x1="135" y1="22" x2="245" y2="34" stroke="var(--page-muted)" strokeWidth="0.8" />
            <line x1="184" y1="54" x2="245" y2="66" stroke="var(--page-muted)" strokeWidth="0.8" />
            <line x1="168" y1="92" x2="245" y2="98" stroke="#E07A5F" strokeWidth="0.8" />
            <line x1="149" y1="92" x2="245" y2="130" stroke="var(--accent-gold)" strokeWidth="0.8" />

            <text x="252" y="37" fill="var(--page-ink)" fontSize="8.5" fontWeight="600">
              1. Crust (~5–70 km)
            </text>
            <text x="252" y="69" fill="var(--page-ink)" fontSize="8.5" fontWeight="600">
              2. Mantle (~2,890 km deep)
            </text>
            <text x="252" y="101" fill="#E07A5F" fontSize="8.5" fontWeight="600">
              3. Liquid Outer Core (~2,260 km thick)
            </text>
            <text x="252" y="133" fill="var(--accent-gold)" fontSize="8.5" fontWeight="600">
              4. Solid Inner Core (~1,220 km radius)
            </text>

            <text x="230" y="168" textAnchor="middle" fill="var(--page-muted)" fontSize="8">
              Four primary geophysical regions inferred from seismic waves (not 7 literal geological layers)
            </text>
          </svg>
        );
    }
  };

  return (
    <figure className="p-3 border border-[var(--gold-hairline)] bg-[var(--page-bg-secondary)]/55 rounded-sm">
      <div className="flex items-center justify-between gap-2 pb-1.5 mb-2 border-b border-[var(--hairline)]">
        <span className="text-[10px] uppercase tracking-[0.16em] font-semibold text-[var(--accent-gold)]">
          Geological Diagram
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
