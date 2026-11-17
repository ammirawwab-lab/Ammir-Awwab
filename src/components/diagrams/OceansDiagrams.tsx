import React from 'react';
import { OceansDiagramKind } from '../../types/encyclopedia';

interface OceansDiagramProps {
  kind: OceansDiagramKind;
  title: string;
  caption: string;
}

export const OceansDiagram: React.FC<OceansDiagramProps> = ({
  kind,
  title,
  caption,
}) => {
  const renderSvg = () => {
    switch (kind) {
      case 'water-cellular-biology':
        return (
          <svg viewBox="0 0 460 175" className="w-full h-auto" role="img" aria-label={title}>
            {/* Left panel: Polar H2O molecule */}
            <rect
              x="16"
              y="18"
              width="175"
              height="136"
              rx="4"
              fill="var(--page-bg-secondary)"
              stroke="var(--hairline)"
            />
            <text x="103" y="34" textAnchor="middle" fill="var(--accent-gold)" fontSize="8.5" fontWeight="600">
              Polar Water Molecule (H₂O)
            </text>
            {/* Oxygen */}
            <circle cx="103" cy="76" r="18" fill="#175E54" fillOpacity="0.45" stroke="#7EB8AE" strokeWidth="1.3" />
            <text x="103" y="79" textAnchor="middle" fill="var(--page-ink)" fontSize="10" fontWeight="700">
              O (δ⁻)
            </text>
            {/* Hydrogens at ~104.5° */}
            <line x1="88" y1="86" x2="67" y2="108" stroke="var(--accent-gold)" strokeWidth="1.4" />
            <line x1="118" y1="86" x2="139" y2="108" stroke="var(--accent-gold)" strokeWidth="1.4" />
            <circle cx="63" cy="112" r="11" fill="var(--page-bg)" stroke="var(--accent-gold)" strokeWidth="1.1" />
            <text x="63" y="115" textAnchor="middle" fill="var(--page-ink)" fontSize="8" fontWeight="600">
              H⁺
            </text>
            <circle cx="143" cy="112" r="11" fill="var(--page-bg)" stroke="var(--accent-gold)" strokeWidth="1.1" />
            <text x="143" y="115" textAnchor="middle" fill="var(--page-ink)" fontSize="8" fontWeight="600">
              H⁺
            </text>
            <text x="103" y="142" textAnchor="middle" fill="var(--page-muted)" fontSize="7.5">
              104.5° bond angle · Hydrogen bonding
            </text>

            {/* Right panel: Cell hydration & solvent transport */}
            <rect
              x="206"
              y="18"
              width="238"
              height="136"
              rx="4"
              fill="var(--page-bg-secondary)"
              stroke="var(--hairline)"
            />
            <text x="325" y="34" textAnchor="middle" fill="var(--accent-gold)" fontSize="8.5" fontWeight="600">
              Aqueous Cellular Medium (~70%+ Water)
            </text>
            <ellipse
              cx="325"
              cy="88"
              rx="92"
              ry="42"
              fill="#7EB8AE"
              fillOpacity="0.14"
              stroke="#7EB8AE"
              strokeWidth="1.2"
            />
            <circle cx="305" cy="86" r="15" fill="var(--page-bg)" stroke="var(--accent-gold)" strokeWidth="1" />
            <text x="305" y="89" textAnchor="middle" fill="var(--page-ink)" fontSize="7.5" fontWeight="600">
              Nucleus
            </text>
            <circle cx="355" cy="76" r="5" fill="#7EB8AE" fillOpacity="0.65" />
            <circle cx="268" cy="78" r="4.5" fill="var(--accent-gold)" fillOpacity="0.7" />
            <circle cx="366" cy="98" r="4.5" fill="var(--accent-gold)" fillOpacity="0.7" />
            <text x="372" y="86" fill="var(--page-ink)" fontSize="7.5">
              Dissolved ions &amp;
            </text>
            <text x="372" y="96" fill="var(--page-ink)" fontSize="7.5">
              biomolecules
            </text>
            <text x="325" y="143" textAnchor="middle" fill="var(--page-muted)" fontSize="7.5">
              Essential for metabolism · Abiogenesis mechanisms remain open science
            </text>
          </svg>
        );

      case 'global-water-cycle':
        return (
          <svg viewBox="0 0 460 175" className="w-full h-auto" role="img" aria-label={title}>
            {/* Clouds */}
            <path
              d="M95,46 C85,46 80,36 88,30 C92,20 112,20 118,28 C128,24 142,32 138,44 Z"
              fill="var(--page-bg-secondary)"
              stroke="#7EB8AE"
              strokeWidth="1.1"
            />
            <path
              d="M285,42 C275,42 270,32 278,26 C284,16 306,16 314,25 C326,21 340,30 336,42 Z"
              fill="var(--page-bg-secondary)"
              stroke="var(--accent-gold)"
              strokeWidth="1.2"
            />
            <text x="210" y="29" textAnchor="middle" fill="var(--page-ink)" fontSize="8">
              Moisture Transport &amp; Condensation &rarr;
            </text>
            <line x1="146" y1="36" x2="268" y2="34" stroke="var(--accent-gold)" strokeWidth="1" strokeDasharray="3 2" />

            {/* Land & Ocean profile */}
            <path
              d="M20,126 L185,126 L230,118 L280,82 L335,72 L388,92 L440,98 L440,152 L20,152 Z"
              fill="var(--page-bg-secondary)"
              stroke="var(--hairline)"
            />
            {/* Ocean */}
            <path
              d="M20,118 L188,118 L188,152 L20,152 Z"
              fill="#7EB8AE"
              fillOpacity="0.26"
              stroke="#7EB8AE"
              strokeWidth="1.1"
            />
            <text x="104" y="138" textAnchor="middle" fill="var(--page-ink)" fontSize="8.5" fontWeight="600">
              Ocean Reservoir (~96.5%)
            </text>

            {/* Evaporation arrows */}
            <path d="M80,112 L80,62" stroke="#7EB8AE" strokeWidth="1.2" strokeDasharray="3 2" />
            <polygon points="80,56 76,64 84,64" fill="#7EB8AE" />
            <path d="M112,112 L112,62" stroke="#7EB8AE" strokeWidth="1.2" strokeDasharray="3 2" />
            <polygon points="112,56 108,64 116,64" fill="#7EB8AE" />
            <text x="96" y="88" textAnchor="middle" fill="var(--page-ink)" fontSize="7.5" fontWeight="600">
              Evaporation
            </text>

            {/* Precipitation */}
            <line x1="296" y1="48" x2="290" y2="74" stroke="var(--accent-gold)" strokeWidth="1.1" strokeDasharray="2 2" />
            <line x1="312" y1="48" x2="306" y2="68" stroke="var(--accent-gold)" strokeWidth="1.1" strokeDasharray="2 2" />
            <line x1="328" y1="48" x2="322" y2="68" stroke="var(--accent-gold)" strokeWidth="1.1" strokeDasharray="2 2" />
            <text x="368" y="56" fill="var(--accent-gold)" fontSize="8" fontWeight="600">
              Precipitation
            </text>

            {/* Runoff & Infiltration */}
            <path d="M276,84 Q236,108 192,116" fill="none" stroke="#7EB8AE" strokeWidth="1.3" />
            <polygon points="188,117 196,112 195,119" fill="#7EB8AE" />
            <text x="234" y="96" textAnchor="middle" fill="var(--page-ink)" fontSize="7.5">
              Runoff
            </text>
            <path d="M332,80 L332,126 Q300,136 196,138" fill="none" stroke="var(--accent-gold)" strokeWidth="1" strokeDasharray="3 2" />
            <text x="342" y="132" fill="var(--page-muted)" fontSize="7.5">
              Infiltration &amp; Groundwater Return
            </text>

            <text x="230" y="167" textAnchor="middle" fill="var(--page-muted)" fontSize="8">
              Mean atmospheric vapor residence ~8–10 days · Continuous global mass balance (USGS)
            </text>
          </svg>
        );

      case 'rain-soil-vegetation':
        return (
          <svg viewBox="0 0 460 175" className="w-full h-auto" role="img" aria-label={title}>
            {/* Raindrops */}
            {[65, 110, 155, 210, 260].map((x) => (
              <line
                key={x}
                x1={x}
                y1="16"
                x2={x - 8}
                y2="52"
                stroke="#7EB8AE"
                strokeWidth="1.1"
                strokeDasharray="3 3"
              />
            ))}
            <text x="160" y="24" textAnchor="middle" fill="#7EB8AE" fontSize="8.5" fontWeight="600">
              Rainfall Input
            </text>

            {/* Soil cross-section */}
            <rect x="20" y="68" width="420" height="32" fill="var(--page-bg-secondary)" stroke="var(--hairline)" />
            <rect x="20" y="100" width="420" height="50" fill="var(--page-bg)" stroke="var(--hairline)" />
            <text x="38" y="88" fill="var(--page-ink)" fontSize="8" fontWeight="600">
              Topsoil &amp; Dormant Seed Bank
            </text>
            <text x="38" y="128" fill="var(--page-muted)" fontSize="8">
              Root-Zone Moisture &amp; Dissolved Minerals
            </text>

            {/* Sprouting & mature plant */}
            <circle cx="105" cy="82" r="4" fill="var(--accent-gold)" />
            <path d="M105,78 Q108,60 116,50" fill="none" stroke="#7EB8AE" strokeWidth="1.5" />
            <text x="118" y="54" fill="var(--page-ink)" fontSize="7.5">
              Germination
            </text>

            {/* Plant stem + roots */}
            <line x1="330" y1="68" x2="330" y2="28" stroke="var(--accent-gold)" strokeWidth="1.8" />
            <ellipse cx="316" cy="40" rx="12" ry="5" fill="#7EB8AE" fillOpacity="0.45" stroke="#7EB8AE" />
            <ellipse cx="344" cy="36" rx="12" ry="5" fill="#7EB8AE" fillOpacity="0.45" stroke="#7EB8AE" />
            <circle cx="342" cy="50" r="4.5" fill="var(--accent-gold)" />
            <path d="M330,68 L314,98 M330,68 L330,112 M330,68 L348,100" stroke="var(--accent-gold)" strokeWidth="1.1" />
            <text x="366" y="42" fill="var(--page-ink)" fontSize="8" fontWeight="600">
              Transpiration &amp;
            </text>
            <text x="366" y="52" fill="var(--page-ink)" fontSize="8">
              Photosynthesis
            </text>

            <text x="230" y="166" textAnchor="middle" fill="var(--page-muted)" fontSize="8">
              Recovery requires moisture + viable seeds, mineral nutrients, sunlight, and suitable temperatures
            </text>
          </svg>
        );

      case 'groundwater-aquifer-springs':
        return (
          <svg viewBox="0 0 460 175" className="w-full h-auto" role="img" aria-label={title}>
            {/* Sloped hill to valley */}
            <path
              d="M20,38 L155,44 L265,94 L440,104 L440,152 L20,152 Z"
              fill="var(--page-bg-secondary)"
              stroke="var(--hairline)"
            />
            {/* Saturated Aquifer */}
            <path
              d="M20,88 L175,88 L265,96 L440,106 L440,126 L20,126 Z"
              fill="#7EB8AE"
              fillOpacity="0.25"
              stroke="#7EB8AE"
              strokeWidth="1.1"
            />
            {/* Confining clay/rock bed */}
            <rect x="20" y="126" width="420" height="24" fill="var(--page-bg)" stroke="var(--accent-gold)" strokeWidth="0.9" />
            <text x="230" y="142" textAnchor="middle" fill="var(--page-muted)" fontSize="8">
              Low-Permeability Confining Bedrock / Clay Layer
            </text>

            {/* Recharge arrows */}
            <line x1="75" y1="22" x2="75" y2="78" stroke="var(--accent-gold)" strokeWidth="1.2" strokeDasharray="3 2" />
            <polygon points="75,84 71,76 79,76" fill="var(--accent-gold)" />
            <text x="86" y="34" fill="var(--accent-gold)" fontSize="8" fontWeight="600">
              Infiltration Recharge
            </text>

            {/* Flow paths & Spring */}
            <path d="M85,104 L245,104" stroke="#7EB8AE" strokeWidth="1.3" />
            <polygon points="254,98 244,96 247,104" fill="#7EB8AE" />
            <circle cx="264" cy="94" r="5" fill="#7EB8AE" />
            <text x="282" y="84" fill="var(--page-ink)" fontSize="8.5" fontWeight="600">
              Natural Spring Discharge
            </text>
            <text x="115" y="116" textAnchor="middle" fill="var(--page-ink)" fontSize="8">
              Saturated Permeable Aquifer
            </text>

            <text x="230" y="167" textAnchor="middle" fill="var(--page-muted)" fontSize="8">
              Groundwater accounts for ~30.1% of global freshwater · Flow rates range from mm to m/day
            </text>
          </svg>
        );

      case 'river-drainage-basin':
        return (
          <svg viewBox="0 0 460 175" className="w-full h-auto" role="img" aria-label={title}>
            {/* Basin outline */}
            <path
              d="M36,34 C130,18 280,18 415,48 C438,85 430,130 395,146 C265,155 120,150 36,125 C18,95 18,62 36,34 Z"
              fill="var(--page-bg-secondary)"
              stroke="var(--gold-hairline)"
              strokeDasharray="4 3"
            />
            {/* Tributaries */}
            <path d="M62,48 Q125,70 185,84" fill="none" stroke="#7EB8AE" strokeWidth="1.3" />
            <path d="M58,108 Q122,94 185,84" fill="none" stroke="#7EB8AE" strokeWidth="1.3" />
            <path d="M185,84 Q260,82 325,92 Q365,98 410,98" fill="none" stroke="#7EB8AE" strokeWidth="2.8" />
            <path d="M235,44 Q248,68 265,85" fill="none" stroke="#7EB8AE" strokeWidth="1.2" />

            {/* Labels */}
            <text x="115" y="34" textAnchor="middle" fill="var(--accent-gold)" fontSize="8" fontWeight="600">
              Watershed Divide
            </text>
            <text x="110" y="70" fill="var(--page-ink)" fontSize="8">
              Headwater Tributaries
            </text>
            <text x="285" y="72" textAnchor="middle" fill="var(--page-ink)" fontSize="8.5" fontWeight="600">
              Main Channel &amp; Floodplain
            </text>
            <text x="392" y="116" textAnchor="middle" fill="#7EB8AE" fontSize="8" fontWeight="600">
              Delta / Sea Mouth
            </text>

            <text x="230" y="167" textAnchor="middle" fill="var(--page-muted)" fontSize="8">
              Drainage networks transport freshwater and suspended sediment from highlands to coastal basins
            </text>
          </svg>
        );

      case 'rainwater-quality-hygiene':
        return (
          <svg viewBox="0 0 460 175" className="w-full h-auto" role="img" aria-label={title}>
            {/* Step 1: Atmospheric Rain */}
            <rect x="18" y="24" width="128" height="118" rx="4" fill="var(--page-bg-secondary)" stroke="var(--hairline)" />
            <text x="82" y="42" textAnchor="middle" fill="var(--accent-gold)" fontSize="8.5" fontWeight="600">
              1. Atmospheric Fall
            </text>
            <text x="82" y="64" textAnchor="middle" fill="var(--page-ink)" fontSize="7.5">
              Low dissolved salts,
            </text>
            <text x="82" y="76" textAnchor="middle" fill="var(--page-ink)" fontSize="7.5">
              absorbs CO₂ (~pH 5.6)
            </text>
            <text x="82" y="92" textAnchor="middle" fill="var(--page-muted)" fontSize="7.5">
              + airborne dust/aerosols
            </text>

            <text x="158" y="86" textAnchor="middle" fill="var(--accent-gold)" fontSize="13">
              &rarr;
            </text>

            {/* Step 2: Catchment & Storage */}
            <rect x="170" y="24" width="128" height="118" rx="4" fill="var(--page-bg-secondary)" stroke="var(--hairline)" />
            <text x="234" y="42" textAnchor="middle" fill="var(--accent-gold)" fontSize="8.5" fontWeight="600">
              2. Surface Contact
            </text>
            <text x="234" y="64" textAnchor="middle" fill="var(--page-ink)" fontSize="7.5">
              Roofs, runoff, and soil
            </text>
            <text x="234" y="76" textAnchor="middle" fill="var(--page-ink)" fontSize="7.5">
              may introduce microbes
            </text>
            <text x="234" y="92" textAnchor="middle" fill="var(--page-muted)" fontSize="7.5">
              or chemical pollutants
            </text>

            <text x="310" y="86" textAnchor="middle" fill="var(--accent-gold)" fontSize="13">
              &rarr;
            </text>

            {/* Step 3: Safe Treatment */}
            <rect x="322" y="24" width="120" height="118" rx="4" fill="var(--page-bg-secondary)" stroke="#7EB8AE" />
            <text x="382" y="42" textAnchor="middle" fill="#7EB8AE" fontSize="8.5" fontWeight="600">
              3. Treatment &amp; Hygiene
            </text>
            <text x="382" y="64" textAnchor="middle" fill="var(--page-ink)" fontSize="7.5">
              Settling, filtration,
            </text>
            <text x="382" y="76" textAnchor="middle" fill="var(--page-ink)" fontSize="7.5">
              and sealed clean storage
            </text>
            <text x="382" y="92" textAnchor="middle" fill="var(--page-muted)" fontSize="7.5">
              determine safe potability
            </text>

            <text x="230" y="164" textAnchor="middle" fill="var(--page-muted)" fontSize="8">
              Untreated rainwater is not automatically safe to drink; water quality depends on handling
            </text>
          </svg>
        );

      case 'freshwater-vs-seawater':
        return (
          <svg viewBox="0 0 460 175" className="w-full h-auto" role="img" aria-label={title}>
            {/* Left bar: Freshwater */}
            <rect x="24" y="24" width="190" height="118" rx="4" fill="var(--page-bg-secondary)" stroke="#7EB8AE" />
            <text x="119" y="43" textAnchor="middle" fill="#7EB8AE" fontSize="9" fontWeight="600">
              Freshwater (Rivers &amp; Lakes)
            </text>
            <text x="119" y="64" textAnchor="middle" fill="var(--page-ink)" fontSize="11" fontWeight="700">
              &lt; 0.5 g/kg Salinity
            </text>
            <text x="119" y="84" textAnchor="middle" fill="var(--page-muted)" fontSize="8">
              Density: ~1,000 kg/m³ (4 °C)
            </text>
            <text x="119" y="102" textAnchor="middle" fill="var(--page-ink)" fontSize="7.5">
              Low dissolved ions · Palatable
            </text>
            <text x="119" y="116" textAnchor="middle" fill="var(--page-muted)" fontSize="7.5">
              Supports freshwater osmoregulators
            </text>

            {/* Right bar: Seawater */}
            <rect x="246" y="24" width="190" height="118" rx="4" fill="var(--page-bg-secondary)" stroke="var(--accent-gold)" />
            <text x="341" y="43" textAnchor="middle" fill="var(--accent-gold)" fontSize="9" fontWeight="600">
              Open-Ocean Seawater
            </text>
            <text x="341" y="64" textAnchor="middle" fill="var(--page-ink)" fontSize="11" fontWeight="700">
              ~35 g/kg Salinity (35 PSU)
            </text>
            <text x="341" y="84" textAnchor="middle" fill="var(--page-muted)" fontSize="8">
              Density: ~1,025 kg/m³ (surface)
            </text>
            <text x="341" y="102" textAnchor="middle" fill="var(--page-ink)" fontSize="7.5">
              Rich in Na⁺, Cl⁻, Mg²⁺, SO₄²⁻
            </text>
            <text x="341" y="116" textAnchor="middle" fill="var(--page-muted)" fontSize="7.5">
              Supports marine-adapted organisms
            </text>

            <text x="230" y="164" textAnchor="middle" fill="var(--page-muted)" fontSize="8">
              Brackish estuaries bridge these two regimes dynamically (0.5–30 PSU) · Source: NOAA / EPA
            </text>
          </svg>
        );

      case 'estuary-salinity-mixing':
        return (
          <svg viewBox="0 0 460 175" className="w-full h-auto" role="img" aria-label={title}>
            <defs>
              <linearGradient id="estuaryGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#7EB8AE" stopOpacity="0.22" />
                <stop offset="50%" stopColor="#4A8C8B" stopOpacity="0.34" />
                <stop offset="100%" stopColor="#175E54" stopOpacity="0.52" />
              </linearGradient>
            </defs>

            {/* Estuary water column */}
            <rect x="24" y="34" width="412" height="104" fill="url(#estuaryGrad)" stroke="var(--hairline)" />
            {/* Sloped halocline (NOT a vertical wall!) */}
            <path
              d="M95,138 Q210,104 335,44"
              fill="none"
              stroke="var(--accent-gold)"
              strokeWidth="1.5"
              strokeDasharray="4 3"
            />
            {/* River outflow */}
            <path d="M36,52 L175,52" stroke="#7EB8AE" strokeWidth="1.6" />
            <polygon points="183,52 173,48 173,56" fill="#7EB8AE" />
            <text x="95" y="45" textAnchor="middle" fill="var(--page-ink)" fontSize="8" fontWeight="600">
              River Outflow (~1,000 kg/m³)
            </text>

            {/* Incoming denser seawater */}
            <path d="M420,120 L250,120" stroke="var(--accent-gold)" strokeWidth="1.6" />
            <polygon points="242,120 252,116 252,124" fill="var(--accent-gold)" />
            <text x="352" y="112" textAnchor="middle" fill="var(--page-ink)" fontSize="8" fontWeight="600">
              Denser Seawater (~1,025 kg/m³)
            </text>

            {/* Dynamic mixing eddies */}
            <path d="M210,72 Q226,64 238,76 Q226,88 214,80" fill="none" stroke="var(--page-ink)" strokeWidth="1" opacity="0.7" />
            <path d="M256,88 Q272,80 284,92 Q272,104 260,96" fill="none" stroke="var(--page-ink)" strokeWidth="1" opacity="0.7" />
            <text x="235" y="106" textAnchor="middle" fill="var(--accent-gold)" fontSize="8" fontWeight="600">
              Dynamic Mixing &amp; Salinity Gradient
            </text>

            <text x="230" y="156" textAnchor="middle" fill="var(--page-muted)" fontSize="8">
              Freshwater and seawater mix dynamically via tides, wind, and shear — never an impermeable barrier (NOAA)
            </text>
          </svg>
        );

      case 'ocean-photic-zones':
        return (
          <svg viewBox="0 0 460 175" className="w-full h-auto" role="img" aria-label={title}>
            {/* Three depth zones */}
            <rect x="24" y="20" width="412" height="36" fill="#7EB8AE" fillOpacity="0.32" stroke="var(--hairline)" />
            <rect x="24" y="56" width="412" height="44" fill="#175E54" fillOpacity="0.34" stroke="var(--hairline)" />
            <rect x="24" y="100" width="412" height="48" fill="#061A14" fillOpacity="0.55" stroke="var(--hairline)" />

            {/* Sunlight rays */}
            <line x1="70" y1="8" x2="70" y2="54" stroke="var(--accent-gold)" strokeWidth="1.5" />
            <line x1="88" y1="8" x2="88" y2="92" stroke="var(--accent-gold)" strokeWidth="1" strokeDasharray="3 2" opacity="0.7" />

            <text x="115" y="36" fill="var(--page-ink)" fontSize="8.5" fontWeight="600">
              Euphotic (Sunlit) Zone · 0–200 m
            </text>
            <text x="115" y="48" fill="var(--page-muted)" fontSize="7.5">
              Sufficient light for photosynthesis; red wavelengths absorbed fastest
            </text>

            <text x="115" y="75" fill="var(--page-ink)" fontSize="8.5" fontWeight="600">
              Mesopelagic (Twilight) Zone · 200–1,000 m
            </text>
            <text x="115" y="88" fill="var(--page-muted)" fontSize="7.5">
              Dim blue light persists; too weak for plant photosynthesis
            </text>

            <text x="115" y="121" fill="var(--page-ink)" fontSize="8.5" fontWeight="600">
              Aphotic (Midnight) Zone · &gt; 1,000 m
            </text>
            <text x="115" y="134" fill="var(--page-muted)" fontSize="7.5">
              No sunlight penetration; only bioluminescence illuminates organisms
            </text>

            <text x="230" y="166" textAnchor="middle" fill="var(--page-muted)" fontSize="8">
              Measured optical attenuation in seawater (NOAA) · Distinct from rhetorical parable context
            </text>
          </svg>
        );

      case 'ocean-wave-systems':
        return (
          <svg viewBox="0 0 460 175" className="w-full h-auto" role="img" aria-label={title}>
            {/* Surface waves & swell */}
            <text x="26" y="24" fill="var(--accent-gold)" fontSize="8.5" fontWeight="600">
              Air–Sea Surface Waves &amp; Swell
            </text>
            <path
              d="M24,48 Q44,32 64,48 T104,48 T144,48 T184,48 T224,48 T264,48 T304,48 T344,48 T384,48 T436,48"
              fill="none"
              stroke="#7EB8AE"
              strokeWidth="1.8"
            />
            <text x="345" y="24" textAnchor="middle" fill="var(--page-muted)" fontSize="7.5">
              Wind-driven surface oscillations
            </text>

            {/* Density layer (Pycnocline) & Internal Wave */}
            <line x1="24" y1="88" x2="436" y2="88" stroke="var(--hairline)" strokeDasharray="3 3" />
            <text x="26" y="82" fill="var(--page-muted)" fontSize="7.5">
              Warmer, less-dense upper ocean layer
            </text>
            <path
              d="M24,116 Q76,96 128,116 T232,116 T336,116 T436,116"
              fill="none"
              stroke="var(--accent-gold)"
              strokeWidth="1.6"
            />
            <text x="26" y="140" fill="var(--page-ink)" fontSize="8.5" fontWeight="600">
              Subsurface Internal Waves (along density pycnocline)
            </text>
            <text x="230" y="166" textAnchor="middle" fill="var(--page-muted)" fontSize="8">
              Surface waves and internal density waves obey different restoring forces · Interpretive links require caution
            </text>
          </svg>
        );

      case 'storm-waves-surge-tsunami':
        return (
          <svg viewBox="0 0 460 175" className="w-full h-auto" role="img" aria-label={title}>
            {/* Three distinct columns */}
            <rect x="18" y="20" width="134" height="128" rx="4" fill="var(--page-bg-secondary)" stroke="var(--hairline)" />
            <text x="85" y="38" textAnchor="middle" fill="#7EB8AE" fontSize="8.5" fontWeight="600">
              1. Wind Storm Waves
            </text>
            <path d="M32,74 Q48,54 64,74 T96,74 T128,74" fill="none" stroke="#7EB8AE" strokeWidth="1.6" />
            <text x="85" y="96" textAnchor="middle" fill="var(--page-ink)" fontSize="7.5">
              Cause: Wind speed,
            </text>
            <text x="85" y="108" textAnchor="middle" fill="var(--page-ink)" fontSize="7.5">
              duration &amp; open fetch
            </text>
            <text x="85" y="126" textAnchor="middle" fill="var(--page-muted)" fontSize="7.5">
              Period: ~2–20 seconds
            </text>

            <rect x="163" y="20" width="134" height="128" rx="4" fill="var(--page-bg-secondary)" stroke="var(--hairline)" />
            <text x="230" y="38" textAnchor="middle" fill="var(--accent-gold)" fontSize="8.5" fontWeight="600">
              2. Storm Surge
            </text>
            <path d="M178,78 Q230,58 282,66 L282,84 L178,84 Z" fill="var(--accent-gold)" fillOpacity="0.28" stroke="var(--accent-gold)" />
            <text x="230" y="100" textAnchor="middle" fill="var(--page-ink)" fontSize="7.5">
              Cause: Cyclone winds
            </text>
            <text x="230" y="112" textAnchor="middle" fill="var(--page-ink)" fontSize="7.5">
              &amp; low air pressure
            </text>
            <text x="230" y="128" textAnchor="middle" fill="var(--page-muted)" fontSize="7.5">
              Abnormal sea-level rise
            </text>

            <rect x="308" y="20" width="134" height="128" rx="4" fill="var(--page-bg-secondary)" stroke="var(--hairline)" />
            <text x="375" y="38" textAnchor="middle" fill="var(--page-ink)" fontSize="8.5" fontWeight="600">
              3. Tsunami
            </text>
            <path d="M322,74 Q375,62 428,74" fill="none" stroke="var(--page-ink)" strokeWidth="1.8" />
            <text x="375" y="96" textAnchor="middle" fill="var(--page-ink)" fontSize="7.5">
              Cause: Undersea fault,
            </text>
            <text x="375" y="108" textAnchor="middle" fill="var(--page-ink)" fontSize="7.5">
              landslide, or eruption
            </text>
            <text x="375" y="126" textAnchor="middle" fill="var(--page-muted)" fontSize="7.5">
              Wavelength: &gt;100 km
            </text>

            <text x="230" y="166" textAnchor="middle" fill="var(--page-muted)" fontSize="8">
              Physically distinct ocean hazards — wind waves, storm surge, and tsunamis must not be conflated (NOAA)
            </text>
          </svg>
        );

      case 'ship-buoyancy-displacement':
        return (
          <svg viewBox="0 0 460 175" className="w-full h-auto" role="img" aria-label={title}>
            {/* Waterline */}
            <rect x="24" y="84" width="412" height="66" fill="#7EB8AE" fillOpacity="0.24" stroke="#7EB8AE" />
            {/* Ship hull */}
            <path
              d="M130,66 L330,66 L305,112 L155,112 Z"
              fill="var(--page-bg-secondary)"
              stroke="var(--accent-gold)"
              strokeWidth="1.5"
            />
            <rect x="195" y="42" width="70" height="24" fill="var(--page-bg)" stroke="var(--accent-gold)" />
            <text x="230" y="58" textAnchor="middle" fill="var(--page-ink)" fontSize="8" fontWeight="600">
              Hollow Hull
            </text>

            {/* Force vectors */}
            <line x1="230" y1="68" x2="230" y2="128" stroke="var(--page-ink)" strokeWidth="1.6" />
            <polygon points="230,134 226,125 234,125" fill="var(--page-ink)" />
            <text x="240" y="128" fill="var(--page-ink)" fontSize="8" fontWeight="600">
              Weight (mg)
            </text>

            <line x1="175" y1="128" x2="175" y2="74" stroke="var(--accent-gold)" strokeWidth="1.8" />
            <polygon points="175,68 171,77 179,77" fill="var(--accent-gold)" />
            <text x="95" y="102" textAnchor="middle" fill="var(--accent-gold)" fontSize="8" fontWeight="600">
              Buoyant Force
            </text>
            <text x="95" y="114" textAnchor="middle" fill="var(--page-muted)" fontSize="7.5">
              F_B = ρ · V_disp · g
            </text>

            <text x="372" y="102" textAnchor="middle" fill="var(--page-ink)" fontSize="8">
              Displaced Seawater
            </text>
            <text x="372" y="114" textAnchor="middle" fill="var(--page-muted)" fontSize="7.5">
              (~1,025 kg/m³)
            </text>

            <text x="230" y="166" textAnchor="middle" fill="var(--page-muted)" fontSize="8">
              Archimedes’ Principle: A vessel floats when displaced fluid weight equals total ship weight (OpenStax)
            </text>
          </svg>
        );

      case 'maritime-navigation-routes':
        return (
          <svg viewBox="0 0 460 175" className="w-full h-auto" role="img" aria-label={title}>
            {/* Ocean chart background */}
            <rect x="20" y="20" width="420" height="128" rx="4" fill="var(--page-bg-secondary)" stroke="var(--hairline)" />
            {/* Currents */}
            <path d="M40,56 Q160,36 280,58 T415,52" fill="none" stroke="#7EB8AE" strokeWidth="1.4" strokeDasharray="5 3" />
            <path d="M45,114 Q175,130 300,112 T415,118" fill="none" stroke="#7EB8AE" strokeWidth="1.4" strokeDasharray="5 3" />
            {/* Ship silhouette */}
            <path d="M180,82 L270,82 L256,96 L194,96 Z" fill="var(--accent-gold)" fillOpacity="0.35" stroke="var(--accent-gold)" strokeWidth="1.3" />
            <line x1="225" y1="82" x2="225" y2="58" stroke="var(--accent-gold)" strokeWidth="1.2" />
            <polygon points="227,60 250,74 227,78" fill="#7EB8AE" fillOpacity="0.45" stroke="#7EB8AE" />
            {/* Heading arrow */}
            <line x1="280" y1="89" x2="345" y2="89" stroke="var(--page-ink)" strokeWidth="1.4" />
            <polygon points="352,89 343,85 343,93" fill="var(--page-ink)" />

            <text x="115" y="44" fill="#7EB8AE" fontSize="8" fontWeight="600">
              Surface Ocean Currents
            </text>
            <text x="316" y="80" textAnchor="middle" fill="var(--page-ink)" fontSize="8">
              Propulsion &amp; Course
            </text>
            <text x="230" y="138" textAnchor="middle" fill="var(--page-muted)" fontSize="7.5">
              Low water drag enables heavy cargo transit along global maritime corridors
            </text>
            <text x="230" y="166" textAnchor="middle" fill="var(--page-muted)" fontSize="8">
              Navigation balances hull buoyancy, propulsion, winds, waves, and ocean currents
            </text>
          </svg>
        );

      case 'marine-food-web-fisheries':
        return (
          <svg viewBox="0 0 460 175" className="w-full h-auto" role="img" aria-label={title}>
            {/* 4 Trophic tiers */}
            <rect x="20" y="28" width="96" height="106" rx="4" fill="var(--page-bg-secondary)" stroke="#7EB8AE" />
            <text x="68" y="48" textAnchor="middle" fill="#7EB8AE" fontSize="8.5" fontWeight="600">
              Phytoplankton
            </text>
            <text x="68" y="66" textAnchor="middle" fill="var(--page-ink)" fontSize="7.5">
              Sunlit producers
            </text>
            <text x="68" y="80" textAnchor="middle" fill="var(--page-muted)" fontSize="7">
              Fix carbon via
            </text>
            <text x="68" y="92" textAnchor="middle" fill="var(--page-muted)" fontSize="7">
              photosynthesis
            </text>

            <text x="126" y="84" textAnchor="middle" fill="var(--accent-gold)" fontSize="12">
              &rarr;
            </text>

            <rect x="136" y="28" width="96" height="106" rx="4" fill="var(--page-bg-secondary)" stroke="var(--hairline)" />
            <text x="184" y="48" textAnchor="middle" fill="var(--page-ink)" fontSize="8.5" fontWeight="600">
              Zooplankton
            </text>
            <text x="184" y="66" textAnchor="middle" fill="var(--page-ink)" fontSize="7.5">
              &amp; Shellfish
            </text>
            <text x="184" y="80" textAnchor="middle" fill="var(--page-muted)" fontSize="7">
              Primary marine
            </text>
            <text x="184" y="92" textAnchor="middle" fill="var(--page-muted)" fontSize="7">
              consumers
            </text>

            <text x="242" y="84" textAnchor="middle" fill="var(--accent-gold)" fontSize="12">
              &rarr;
            </text>

            <rect x="252" y="28" width="96" height="106" rx="4" fill="var(--page-bg-secondary)" stroke="var(--hairline)" />
            <text x="300" y="48" textAnchor="middle" fill="var(--page-ink)" fontSize="8.5" fontWeight="600">
              Fish &amp; Reefs
            </text>
            <text x="300" y="66" textAnchor="middle" fill="var(--page-ink)" fontSize="7.5">
              Pelagic &amp; benthic
            </text>
            <text x="300" y="80" textAnchor="middle" fill="var(--page-muted)" fontSize="7">
              Protein &amp; lipids
            </text>
            <text x="300" y="92" textAnchor="middle" fill="var(--page-muted)" fontSize="7">
              in food webs
            </text>

            <text x="358" y="84" textAnchor="middle" fill="var(--accent-gold)" fontSize="12">
              &rarr;
            </text>

            <rect x="368" y="28" width="76" height="106" rx="4" fill="var(--page-bg-secondary)" stroke="var(--accent-gold)" />
            <text x="406" y="48" textAnchor="middle" fill="var(--accent-gold)" fontSize="8.5" fontWeight="600">
              Fisheries
            </text>
            <text x="406" y="68" textAnchor="middle" fill="var(--page-ink)" fontSize="7.5">
              Human food
            </text>
            <text x="406" y="80" textAnchor="middle" fill="var(--page-ink)" fontSize="7.5">
              depends on
            </text>
            <text x="406" y="92" textAnchor="middle" fill="var(--page-muted)" fontSize="7">
              ecosystem
            </text>
            <text x="406" y="104" textAnchor="middle" fill="var(--page-muted)" fontSize="7">
              health
            </text>

            <text x="230" y="160" textAnchor="middle" fill="var(--page-muted)" fontSize="8">
              Marine fisheries rely on healthy plankton productivity, reef habitats, and nutrient cycling (NOAA / UNEP)
            </text>
          </svg>
        );

      case 'pearl-nacre-deposition':
        return (
          <svg viewBox="0 0 460 175" className="w-full h-auto" role="img" aria-label={title}>
            {/* Left: Mollusc shell & mantle */}
            <path
              d="M36,110 C36,52 145,40 198,86 C150,136 52,138 36,110 Z"
              fill="var(--page-bg-secondary)"
              stroke="var(--accent-gold)"
              strokeWidth="1.3"
            />
            <path
              d="M52,106 C54,68 135,58 176,88 C136,120 62,122 52,106 Z"
              fill="#7EB8AE"
              fillOpacity="0.2"
              stroke="#7EB8AE"
            />
            <circle cx="116" cy="92" r="9" fill="var(--page-bg)" stroke="var(--accent-gold)" strokeWidth="1.2" />
            <text x="116" y="34" textAnchor="middle" fill="var(--page-ink)" fontSize="8.5" fontWeight="600">
              Bivalve Mollusc &amp; Mantle Tissue
            </text>

            {/* Right: Magnified cross-section of nacre layers */}
            <rect x="235" y="24" width="205" height="122" rx="4" fill="var(--page-bg-secondary)" stroke="var(--hairline)" />
            <text x="337" y="42" textAnchor="middle" fill="var(--accent-gold)" fontSize="8.5" fontWeight="600">
              Concentric Nacre Cross-Section
            </text>
            <circle cx="295" cy="92" r="32" fill="none" stroke="var(--accent-gold)" strokeWidth="1.2" />
            <circle cx="295" cy="92" r="24" fill="none" stroke="#7EB8AE" strokeWidth="1.1" />
            <circle cx="295" cy="92" r="16" fill="none" stroke="var(--accent-gold)" strokeWidth="1" />
            <circle cx="295" cy="92" r="7" fill="var(--page-ink)" fillOpacity="0.6" />

            <text x="342" y="76" fill="var(--page-ink)" fontSize="7.5" fontWeight="600">
              Irritant / Tissue Nucleus
            </text>
            <text x="342" y="92" fill="var(--page-muted)" fontSize="7.5">
              Aragonite (CaCO₃)
            </text>
            <text x="342" y="103" fill="var(--page-muted)" fontSize="7.5">
              + Conchiolin protein
            </text>
            <text x="342" y="118" fill="#7EB8AE" fontSize="7.5">
              Secreted by pearl sac
            </text>

            <text x="230" y="166" textAnchor="middle" fill="var(--page-muted)" fontSize="8">
              Natural pearls typically form around biological irritants or epithelial injury—not exclusively sand grains
            </text>
          </svg>
        );

      case 'coral-reef-anatomy':
        return (
          <svg viewBox="0 0 460 175" className="w-full h-auto" role="img" aria-label={title}>
            {/* Left: Single Coral Polyp Animal */}
            <rect x="20" y="22" width="195" height="126" rx="4" fill="var(--page-bg-secondary)" stroke="var(--hairline)" />
            <text x="117" y="38" textAnchor="middle" fill="var(--accent-gold)" fontSize="8.5" fontWeight="600">
              Coral Polyp (Marine Animal)
            </text>
            {/* Calcium carbonate cup */}
            <path d="M72,130 L78,96 L156,96 L162,130 Z" fill="var(--page-bg)" stroke="var(--accent-gold)" strokeWidth="1.2" />
            {/* Polyp body + tentacles */}
            <rect x="92" y="68" width="50" height="36" rx="6" fill="#7EB8AE" fillOpacity="0.32" stroke="#7EB8AE" strokeWidth="1.2" />
            <path d="M94,68 Q86,52 80,56 M106,68 Q104,48 100,52 M118,68 Q118,46 122,50 M130,68 Q134,48 138,54 M140,68 Q148,54 152,60" fill="none" stroke="#7EB8AE" strokeWidth="1.3" />
            <text x="117" y="118" textAnchor="middle" fill="var(--page-muted)" fontSize="7.5">
              CaCO₃ Skeleton Cup
            </text>
            <text x="117" y="88" textAnchor="middle" fill="var(--page-ink)" fontSize="7">
              Symbiotic algae + gut
            </text>

            {/* Right: Reef Ecosystem */}
            <rect x="232" y="22" width="208" height="126" rx="4" fill="var(--page-bg-secondary)" stroke="#7EB8AE" />
            <text x="336" y="38" textAnchor="middle" fill="#7EB8AE" fontSize="8.5" fontWeight="600">
              Coral Reef Ecosystem
            </text>
            <text x="336" y="64" textAnchor="middle" fill="var(--page-ink)" fontSize="8" fontWeight="600">
              &lt; 1% of Ocean Floor
            </text>
            <text x="336" y="80" textAnchor="middle" fill="var(--accent-gold)" fontSize="9.5" fontWeight="700">
              ~25% of Marine Species
            </text>
            <text x="336" y="102" textAnchor="middle" fill="var(--page-muted)" fontSize="7.5">
              Corals are cnidarian animals, not plants;
            </text>
            <text x="336" y="114" textAnchor="middle" fill="var(--page-muted)" fontSize="7.5">
              reefs buffer coasts &amp; support fisheries
            </text>

            <text x="230" y="166" textAnchor="middle" fill="var(--page-muted)" fontSize="8">
              Colonial coral animals build calcium-carbonate frameworks supporting dense biodiversity (NOAA / UNEP)
            </text>
          </svg>
        );
    }
  };

  return (
    <figure className="my-2.5 p-3 border border-[var(--gold-hairline)] bg-[var(--page-bg-secondary)]/55 rounded-sm">
      <div className="flex items-center justify-between gap-2 pb-1.5 mb-2 border-b border-[var(--hairline)]">
        <span className="text-[11px] uppercase tracking-[0.16em] text-[var(--accent-gold)] font-semibold">
          Oceanographic Diagram · {title}
        </span>
        <span className="text-[10px] uppercase tracking-[0.14em] text-[#7EB8AE] dark:text-[#7EB8AE]">
          Marine Reference
        </span>
      </div>

      <div className="w-full overflow-hidden">{renderSvg()}</div>

      <figcaption className="mt-2 pt-1.5 border-t border-[var(--hairline)] font-editorial italic text-xs text-[var(--page-muted)] leading-snug">
        {caption}
      </figcaption>
    </figure>
  );
};
