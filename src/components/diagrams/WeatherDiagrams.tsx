import React from 'react';
import { WeatherDiagramKind } from '../../types/encyclopedia';

interface WeatherDiagramProps {
  kind: WeatherDiagramKind;
  title: string;
  caption: string;
}

export const WeatherDiagram: React.FC<WeatherDiagramProps> = ({
  kind,
  title,
  caption,
}) => {
  const renderSvg = () => {
    switch (kind) {
      case 'wind-cloud-transport':
        return (
          <svg viewBox="0 0 460 175" className="w-full h-auto" role="img" aria-label={title}>
            {/* Ocean & Land */}
            <rect x="20" y="122" width="160" height="28" fill="#5D8EB8" fillOpacity="0.24" stroke="#7EB0D6" />
            <text x="100" y="140" textAnchor="middle" fill="var(--page-ink)" fontSize="8" fontWeight="600">
              Ocean Moisture Source
            </text>
            <path d="M180,122 L265,122 L335,96 L440,104 L440,150 L180,150 Z" fill="var(--page-bg-secondary)" stroke="var(--hairline)" />
            <text x="325" y="138" textAnchor="middle" fill="var(--page-muted)" fontSize="8">
              Inland Terrain &amp; Watersheds
            </text>

            {/* Wind streamlines aloft */}
            <path d="M40,56 Q140,46 250,52 T420,48" fill="none" stroke="var(--accent-gold)" strokeWidth="1.5" strokeDasharray="5 3" />
            <polygon points="426,48 417,44 417,52" fill="var(--accent-gold)" />
            <path d="M48,74 Q145,66 255,70 T390,66" fill="none" stroke="#8FB4D4" strokeWidth="1.2" />
            <polygon points="396,66 387,62 387,70" fill="#8FB4D4" />
            <text x="120" y="38" textAnchor="middle" fill="var(--accent-gold)" fontSize="8.5" fontWeight="600">
              Tropospheric Wind Steering &rarr;
            </text>

            {/* Clouds moving */}
            <path d="M90,64 C80,64 76,54 84,48 C89,39 107,39 114,47 C124,43 136,51 132,64 Z" fill="var(--page-bg-secondary)" stroke="#8FB4D4" strokeWidth="1.2" />
            <path d="M275,62 C263,62 258,50 267,42 C273,31 296,31 305,40 C318,35 332,45 327,62 Z" fill="var(--page-bg-secondary)" stroke="var(--accent-gold)" strokeWidth="1.2" />

            {/* Rain over land */}
            <line x1="286" y1="68" x2="280" y2="96" stroke="#8FB4D4" strokeWidth="1.1" strokeDasharray="2 2" />
            <line x1="302" y1="68" x2="296" y2="96" stroke="#8FB4D4" strokeWidth="1.1" strokeDasharray="2 2" />
            <line x1="318" y1="68" x2="312" y2="92" stroke="#8FB4D4" strokeWidth="1.1" strokeDasharray="2 2" />
            <text x="366" y="84" fill="#8FB4D4" fontSize="8" fontWeight="600">
              Precipitation
            </text>

            <text x="230" y="166" textAnchor="middle" fill="var(--page-muted)" fontSize="8">
              Horizontal winds at different altitudes transport clouds, water vapor, and storm systems inland (NOAA)
            </text>
          </svg>
        );

      case 'cloud-formation-convection':
        return (
          <svg viewBox="0 0 460 175" className="w-full h-auto" role="img" aria-label={title}>
            {/* Ground heated */}
            <rect x="20" y="128" width="420" height="22" fill="var(--page-bg-secondary)" stroke="var(--hairline)" />
            <text x="230" y="142" textAnchor="middle" fill="var(--page-ink)" fontSize="8" fontWeight="600">
              Solar Surface Heating &amp; Moist Air Convergence
            </text>

            {/* Rising warm moist air */}
            <path d="M135,122 Q125,102 135,84" fill="none" stroke="var(--accent-gold)" strokeWidth="1.5" />
            <polygon points="135,78 131,86 139,86" fill="var(--accent-gold)" />
            <path d="M175,122 Q185,102 175,84" fill="none" stroke="var(--accent-gold)" strokeWidth="1.5" />
            <polygon points="175,78 171,86 179,86" fill="var(--accent-gold)" />
            <text x="80" y="104" textAnchor="middle" fill="var(--page-muted)" fontSize="7.5">
              Rising air expands
            </text>
            <text x="80" y="114" textAnchor="middle" fill="var(--page-muted)" fontSize="7.5">
              &amp; cools adiabatically
            </text>

            {/* LCL Condensation line */}
            <line x1="20" y1="74" x2="440" y2="74" stroke="#8FB4D4" strokeWidth="1" strokeDasharray="4 3" />
            <text x="368" y="86" textAnchor="middle" fill="#8FB4D4" fontSize="7.5" fontWeight="600">
              Dew-Point / Saturation Level
            </text>

            {/* Merging clouds */}
            <path d="M110,74 C98,74 92,62 102,54 C108,42 130,42 138,50 C148,38 172,38 182,50 C196,46 212,56 206,74 Z" fill="var(--page-bg-secondary)" stroke="#8FB4D4" strokeWidth="1.3" />
            <path d="M235,74 C224,74 218,60 228,50 C235,34 260,30 272,42 C284,26 312,26 324,42 C338,40 350,54 344,74 Z" fill="#5D8EB8" fillOpacity="0.22" stroke="var(--accent-gold)" strokeWidth="1.4" />
            <text x="218" y="60" textAnchor="middle" fill="var(--accent-gold)" fontSize="11">
              &rarr;
            </text>
            <text x="152" y="32" textAnchor="middle" fill="var(--page-ink)" fontSize="7.5">
              Early Cumulus
            </text>
            <text x="290" y="22" textAnchor="middle" fill="var(--accent-gold)" fontSize="8" fontWeight="600">
              Merged Cloud System
            </text>

            <text x="230" y="166" textAnchor="middle" fill="var(--page-muted)" fontSize="8">
              Condensation requires cooling, saturation, and nuclei (~0.1 µm); clouds gather when moist updrafts organize (NOAA)
            </text>
          </svg>
        );

      case 'cloud-morphology-layers':
        return (
          <svg viewBox="0 0 460 175" className="w-full h-auto" role="img" aria-label={title}>
            {/* Altitude bands */}
            <line x1="56" y1="22" x2="56" y2="144" stroke="var(--hairline)" />
            <text x="48" y="34" textAnchor="end" fill="var(--page-muted)" fontSize="7.5">
              12 km
            </text>
            <text x="48" y="66" textAnchor="end" fill="var(--page-muted)" fontSize="7.5">
              6 km
            </text>
            <text x="48" y="102" textAnchor="end" fill="var(--page-muted)" fontSize="7.5">
              2 km
            </text>
            <text x="48" y="142" textAnchor="end" fill="var(--page-muted)" fontSize="7.5">
              0 km
            </text>

            <line x1="56" y1="62" x2="440" y2="62" stroke="var(--hairline)" strokeDasharray="3 3" />
            <line x1="56" y1="100" x2="440" y2="100" stroke="var(--hairline)" strokeDasharray="3 3" />

            {/* High Cirrus */}
            <path d="M84,36 Q116,28 150,36 M94,44 Q128,38 164,44" fill="none" stroke="#8FB4D4" strokeWidth="1.4" />
            <text x="122" y="54" textAnchor="middle" fill="#8FB4D4" fontSize="7.5" fontWeight="600">
              High Ice Clouds (Cirrus)
            </text>

            {/* Mid Altostratus / Layered */}
            <rect x="80" y="76" width="136" height="14" rx="7" fill="var(--page-bg-secondary)" stroke="var(--hairline)" />
            <text x="148" y="72" textAnchor="middle" fill="var(--page-ink)" fontSize="7.5">
              Mid-Level Layers (Alto-)
            </text>

            {/* Low Stratus */}
            <rect x="74" y="112" width="160" height="18" rx="6" fill="var(--page-bg-secondary)" stroke="#8FB4D4" />
            <text x="154" y="124" textAnchor="middle" fill="var(--page-ink)" fontSize="7.5" fontWeight="600">
              Layered Stratus Sheet (&lt;2 km)
            </text>

            {/* Vertically Piled Cumulonimbus */}
            <path
              d="M285,124 C272,124 270,104 282,96 C278,80 294,68 308,70 C306,52 324,38 344,36 C324,32 318,22 365,22 C412,22 406,32 386,36 C404,42 414,62 404,76 C418,86 416,104 402,110 C412,118 404,124 390,124 Z"
              fill="#5D8EB8"
              fillOpacity="0.22"
              stroke="var(--accent-gold)"
              strokeWidth="1.4"
            />
            <text x="346" y="88" textAnchor="middle" fill="var(--accent-gold)" fontSize="8" fontWeight="600">
              Vertically Developed
            </text>
            <text x="346" y="99" textAnchor="middle" fill="var(--page-ink)" fontSize="7.5">
              Convective Mass
            </text>

            <text x="230" y="164" textAnchor="middle" fill="var(--page-muted)" fontSize="8">
              Clouds take layered or vertically piled forms by stability; modern classification requires tafsir care before equating to 24:43
            </text>
          </svg>
        );

      case 'precipitation-coalescence':
        return (
          <svg viewBox="0 0 460 175" className="w-full h-auto" role="img" aria-label={title}>
            {/* Panel 1: Nuclei + Droplet */}
            <rect x="18" y="22" width="128" height="122" rx="4" fill="var(--page-bg-secondary)" stroke="var(--hairline)" />
            <text x="82" y="40" textAnchor="middle" fill="#8FB4D4" fontSize="8.5" fontWeight="600">
              1. Cloud Droplets
            </text>
            <circle cx="62" cy="74" r="4" fill="var(--accent-gold)" />
            <circle cx="82" cy="84" r="6" fill="#8FB4D4" fillOpacity="0.55" stroke="#8FB4D4" />
            <circle cx="102" cy="68" r="5" fill="#8FB4D4" fillOpacity="0.55" stroke="#8FB4D4" />
            <text x="82" y="108" textAnchor="middle" fill="var(--page-ink)" fontSize="7.5">
              ~20 µm diameter
            </text>
            <text x="82" y="122" textAnchor="middle" fill="var(--page-muted)" fontSize="7">
              Too light to fall through
            </text>
            <text x="82" y="132" textAnchor="middle" fill="var(--page-muted)" fontSize="7">
              rising cloud updrafts
            </text>

            <text x="157" y="84" textAnchor="middle" fill="var(--accent-gold)" fontSize="13">
              &rarr;
            </text>

            {/* Panel 2: Coalescence / Ice Growth */}
            <rect x="168" y="22" width="134" height="122" rx="4" fill="var(--page-bg-secondary)" stroke="var(--hairline)" />
            <text x="235" y="40" textAnchor="middle" fill="var(--accent-gold)" fontSize="8.5" fontWeight="600">
              2. Particle Growth
            </text>
            <circle cx="222" cy="76" r="12" fill="#8FB4D4" fillOpacity="0.4" stroke="var(--accent-gold)" />
            <circle cx="242" cy="64" r="4" fill="#8FB4D4" />
            <path d="M240,66 L230,72" stroke="var(--accent-gold)" strokeWidth="1" />
            <text x="235" y="108" textAnchor="middle" fill="var(--page-ink)" fontSize="7.5">
              Collision–coalescence
            </text>
            <text x="235" y="122" textAnchor="middle" fill="var(--page-muted)" fontSize="7">
              (warm) or ice-crystal
            </text>
            <text x="235" y="132" textAnchor="middle" fill="var(--page-muted)" fontSize="7">
              growth (cold clouds)
            </text>

            <text x="313" y="84" textAnchor="middle" fill="var(--accent-gold)" fontSize="13">
              &rarr;
            </text>

            {/* Panel 3: Raindrop Fall */}
            <rect x="324" y="22" width="118" height="122" rx="4" fill="var(--page-bg-secondary)" stroke="#8FB4D4" />
            <text x="383" y="40" textAnchor="middle" fill="#8FB4D4" fontSize="8.5" fontWeight="600">
              3. Falling Raindrop
            </text>
            <path d="M383,56 C394,74 396,88 383,92 C370,88 372,74 383,56 Z" fill="#8FB4D4" fillOpacity="0.45" stroke="#8FB4D4" strokeWidth="1.2" />
            <line x1="383" y1="95" x2="383" y2="108" stroke="var(--accent-gold)" strokeWidth="1.2" />
            <polygon points="383,112 379,105 387,105" fill="var(--accent-gold)" />
            <text x="383" y="126" textAnchor="middle" fill="var(--page-ink)" fontSize="7.5">
              ~2,000 µm (~2 mm)
            </text>
            <text x="383" y="137" textAnchor="middle" fill="var(--page-muted)" fontSize="7">
              Gravity beats updraft
            </text>

            <text x="230" y="166" textAnchor="middle" fill="var(--page-muted)" fontSize="8">
              Roughly 1 million cloud droplets combine by volume to form one typical raindrop (NOAA JetStream)
            </text>
          </svg>
        );

      case 'cloud-droplet-microphysics':
        return (
          <svg viewBox="0 0 460 175" className="w-full h-auto" role="img" aria-label={title}>
            {/* Left: Non-precipitating fair-weather cloud */}
            <rect x="20" y="22" width="200" height="124" rx="4" fill="var(--page-bg-secondary)" stroke="var(--hairline)" />
            <text x="120" y="39" textAnchor="middle" fill="#8FB4D4" fontSize="8.5" fontWeight="600">
              Fair-Weather Cloud (No Rain)
            </text>
            <path d="M68,84 C58,84 54,72 64,66 C70,54 90,54 98,62 C110,56 126,64 122,76 C132,80 128,84 118,84 Z" fill="#8FB4D4" fillOpacity="0.2" stroke="#8FB4D4" />
            <path d="M140,86 L160,64 M156,86 L176,64" stroke="var(--page-muted)" strokeWidth="1" strokeDasharray="2 2" />
            <text x="120" y="106" textAnchor="middle" fill="var(--page-ink)" fontSize="7.5">
              Small liquid droplets (~10–20 µm)
            </text>
            <text x="120" y="119" textAnchor="middle" fill="var(--page-muted)" fontSize="7.5">
              Evaporate back into vapor in dry air
            </text>
            <text x="120" y="133" textAnchor="middle" fill="var(--accent-gold)" fontSize="7.5" fontWeight="600">
              Not every cloud produces rain
            </text>

            {/* Right: Mixed-phase storm cloud */}
            <rect x="238" y="22" width="202" height="124" rx="4" fill="var(--page-bg-secondary)" stroke="var(--accent-gold)" />
            <text x="339" y="39" textAnchor="middle" fill="var(--accent-gold)" fontSize="8.5" fontWeight="600">
              Mixed-Phase Deep Cloud
            </text>
            <rect x="256" y="48" width="166" height="24" fill="#8FB4D4" fillOpacity="0.22" stroke="var(--hairline)" />
            <text x="339" y="63" textAnchor="middle" fill="var(--page-ink)" fontSize="7.5">
              &lt; -15 °C · Ice crystals &amp; supercooled drops
            </text>
            <rect x="256" y="72" width="166" height="24" fill="#5D8EB8" fillOpacity="0.22" stroke="var(--hairline)" />
            <text x="339" y="87" textAnchor="middle" fill="var(--page-ink)" fontSize="7.5">
              0 to -15 °C · Supercooled liquid + riming
            </text>
            <rect x="256" y="96" width="166" height="24" fill="var(--page-bg)" stroke="var(--hairline)" />
            <text x="339" y="111" textAnchor="middle" fill="var(--page-ink)" fontSize="7.5">
              &gt; 0 °C · Melting ice &amp; warm raindrops
            </text>
            <text x="339" y="135" textAnchor="middle" fill="#8FB4D4" fontSize="7.5" fontWeight="600">
              Precipitates when growth overcomes updrafts
            </text>

            <text x="230" y="166" textAnchor="middle" fill="var(--page-muted)" fontSize="8">
              Clouds hold liquid water, ice, or both; microphysical phase transitions are modern meteorology, not stated in 24:43
            </text>
          </svg>
        );

      case 'atmospheric-water-budget':
        return (
          <svg viewBox="0 0 460 175" className="w-full h-auto" role="img" aria-label={title}>
            {/* Three reservoirs */}
            <rect x="22" y="28" width="124" height="110" rx="4" fill="var(--page-bg-secondary)" stroke="#8FB4D4" />
            <text x="84" y="47" textAnchor="middle" fill="#8FB4D4" fontSize="8.5" fontWeight="600">
              Ocean Evaporation
            </text>
            <text x="84" y="72" textAnchor="middle" fill="var(--page-ink)" fontSize="10" fontWeight="700">
              ~86% of Vapor
            </text>
            <text x="84" y="92" textAnchor="middle" fill="var(--page-muted)" fontSize="7.5">
              Solar heat lifts vapor,
            </text>
            <text x="84" y="104" textAnchor="middle" fill="var(--page-muted)" fontSize="7.5">
              leaving salts behind
            </text>

            <text x="158" y="84" textAnchor="middle" fill="var(--accent-gold)" fontSize="13">
              &rarr;
            </text>

            <rect x="170" y="28" width="124" height="110" rx="4" fill="var(--page-bg-secondary)" stroke="var(--accent-gold)" />
            <text x="232" y="47" textAnchor="middle" fill="var(--accent-gold)" fontSize="8.5" fontWeight="600">
              Atmosphere &amp; Clouds
            </text>
            <text x="232" y="72" textAnchor="middle" fill="var(--page-ink)" fontSize="10" fontWeight="700">
              ~12,900 km³
            </text>
            <text x="232" y="92" textAnchor="middle" fill="var(--page-muted)" fontSize="7.5">
              ~0.001% of Earth water
            </text>
            <text x="232" y="104" textAnchor="middle" fill="var(--page-muted)" fontSize="7.5">
              ~8–10 day turnover
            </text>

            <text x="306" y="84" textAnchor="middle" fill="var(--accent-gold)" fontSize="13">
              &rarr;
            </text>

            <rect x="318" y="28" width="122" height="110" rx="4" fill="var(--page-bg-secondary)" stroke="#8FB4D4" />
            <text x="379" y="47" textAnchor="middle" fill="#8FB4D4" fontSize="8.5" fontWeight="600">
              Land Precipitation
            </text>
            <text x="379" y="72" textAnchor="middle" fill="var(--page-ink)" fontSize="10" fontWeight="700">
              Seasonal &amp; Regional
            </text>
            <text x="379" y="92" textAnchor="middle" fill="var(--page-muted)" fontSize="7.5">
              Feeds rivers, soils,
            </text>
            <text x="379" y="104" textAnchor="middle" fill="var(--page-muted)" fontSize="7.5">
              crops, and aquifers
            </text>

            <text x="230" y="162" textAnchor="middle" fill="var(--page-muted)" fontSize="8">
              Rapid atmospheric moisture cycling sustains continents even though air holds a tiny fraction of total water (NOAA)
            </text>
          </svg>
        );

      case 'soil-moisture-ecological-renewal':
        return (
          <svg viewBox="0 0 460 175" className="w-full h-auto" role="img" aria-label={title}>
            {/* Left: Dry dormant soil */}
            <rect x="20" y="34" width="175" height="110" rx="4" fill="var(--page-bg-secondary)" stroke="var(--hairline)" />
            <text x="107" y="52" textAnchor="middle" fill="var(--page-muted)" fontSize="8.5" fontWeight="600">
              Dry Period (Dormancy)
            </text>
            <line x1="36" y1="88" x2="178" y2="88" stroke="var(--hairline)" />
            <circle cx="82" cy="108" r="4" fill="var(--accent-gold)" opacity="0.7" />
            <circle cx="128" cy="112" r="4" fill="var(--accent-gold)" opacity="0.7" />
            <text x="107" y="132" textAnchor="middle" fill="var(--page-muted)" fontSize="7.5">
              Dormant seeds &amp; dry topsoil
            </text>

            <text x="210" y="90" textAnchor="middle" fill="var(--accent-gold)" fontSize="14">
              &rarr;
            </text>

            {/* Right: Rainfall revival */}
            <rect x="225" y="24" width="215" height="120" rx="4" fill="var(--page-bg-secondary)" stroke="#8FB4D4" />
            <text x="332" y="42" textAnchor="middle" fill="#8FB4D4" fontSize="8.5" fontWeight="600">
              Rainfall + Soil + Sunlight = Growth
            </text>
            {[260, 295, 330, 365, 400].map((x) => (
              <line key={x} x1={x} y1="48" x2={x - 6} y2="74" stroke="#8FB4D4" strokeWidth="1.1" strokeDasharray="2 2" />
            ))}
            <rect x="240" y="84" width="185" height="46" fill="#5D8EB8" fillOpacity="0.18" stroke="var(--hairline)" />
            {/* Sprout */}
            <line x1="295" y1="84" x2="295" y2="56" stroke="var(--accent-gold)" strokeWidth="1.6" />
            <ellipse cx="284" cy="66" rx="10" ry="4.5" fill="#8FB4D4" fillOpacity="0.45" stroke="#8FB4D4" />
            <ellipse cx="306" cy="62" rx="10" ry="4.5" fill="#8FB4D4" fillOpacity="0.45" stroke="#8FB4D4" />
            <path d="M295,84 L283,108 M295,84 L295,116 M295,84 L308,108" stroke="var(--accent-gold)" strokeWidth="1.1" />
            <text x="372" y="102" textAnchor="middle" fill="var(--page-ink)" fontSize="7.5">
              Root uptake &amp;
            </text>
            <text x="372" y="113" textAnchor="middle" fill="var(--page-ink)" fontSize="7.5">
              photosynthesis
            </text>

            <text x="230" y="164" textAnchor="middle" fill="var(--page-muted)" fontSize="8">
              Ecological recovery requires moisture plus viable seeds, soil nutrients, light, and suitable temperatures
            </text>
          </svg>
        );

      case 'moisture-transport-winds':
        return (
          <svg viewBox="0 0 460 175" className="w-full h-auto" role="img" aria-label={title}>
            <rect x="20" y="116" width="150" height="32" fill="#5D8EB8" fillOpacity="0.28" stroke="#8FB4D4" />
            <text x="95" y="136" textAnchor="middle" fill="var(--page-ink)" fontSize="8" fontWeight="600">
              Warm Ocean Vapor Source
            </text>
            <path d="M170,116 L285,116 L370,70 L440,78 L440,148 L170,148 Z" fill="var(--page-bg-secondary)" stroke="var(--hairline)" />

            {/* Vapor arrows ascending with wind */}
            <path d="M72,110 Q90,82 140,76 L265,68 Q315,58 340,36" fill="none" stroke="var(--accent-gold)" strokeWidth="1.6" />
            <polygon points="346,31 335,34 341,41" fill="var(--accent-gold)" />
            <text x="205" y="54" textAnchor="middle" fill="var(--accent-gold)" fontSize="8.5" fontWeight="600">
              Advected Moisture Lifted &amp; Cooled
            </text>

            {/* Cloud & rain */}
            <path d="M315,48 C302,48 298,34 308,26 C316,14 340,14 350,24 C364,20 378,32 372,48 Z" fill="var(--page-bg-secondary)" stroke="#8FB4D4" strokeWidth="1.2" />
            <line x1="330" y1="52" x2="324" y2="84" stroke="#8FB4D4" strokeWidth="1.2" strokeDasharray="2 2" />
            <line x1="346" y1="52" x2="340" y2="80" stroke="#8FB4D4" strokeWidth="1.2" strokeDasharray="2 2" />
            <text x="275" y="102" textAnchor="middle" fill="var(--page-muted)" fontSize="7.5">
              Dry winds do not yield rain
            </text>

            <text x="230" y="166" textAnchor="middle" fill="var(--page-muted)" fontSize="8">
              Winds precede rain when transporting moist air into regions of cooling and ascent (NOAA)
            </text>
          </svg>
        );

      case 'wind-pollination-aerosols':
        return (
          <svg viewBox="0 0 460 175" className="w-full h-auto" role="img" aria-label={title}>
            {/* Left: Botanical wind pollination */}
            <rect x="18" y="22" width="202" height="122" rx="4" fill="var(--page-bg-secondary)" stroke="var(--hairline)" />
            <text x="119" y="40" textAnchor="middle" fill="var(--accent-gold)" fontSize="8.5" fontWeight="600">
              1. Biological Wind Pollination
            </text>
            <line x1="56" y1="128" x2="56" y2="74" stroke="#8FB4D4" strokeWidth="1.8" />
            <circle cx="56" cy="70" r="6" fill="var(--accent-gold)" />
            <line x1="180" y1="128" x2="180" y2="74" stroke="#8FB4D4" strokeWidth="1.8" />
            <circle cx="180" cy="70" r="6" fill="#8FB4D4" />
            <path d="M68,72 Q118,58 168,70" fill="none" stroke="var(--accent-gold)" strokeWidth="1.2" strokeDasharray="3 3" />
            <circle cx="105" cy="65" r="2.2" fill="var(--accent-gold)" />
            <circle cx="132" cy="64" r="2.2" fill="var(--accent-gold)" />
            <text x="119" y="98" textAnchor="middle" fill="var(--page-ink)" fontSize="7.5">
              Anemophilous pollen dispersal
            </text>
            <text x="119" y="112" textAnchor="middle" fill="var(--page-muted)" fontSize="7">
              (grasses, pines, many trees)
            </text>

            {/* Right: Cloud aerosol / moisture seeding */}
            <rect x="240" y="22" width="202" height="122" rx="4" fill="var(--page-bg-secondary)" stroke="#8FB4D4" />
            <text x="341" y="40" textAnchor="middle" fill="#8FB4D4" fontSize="8.5" fontWeight="600">
              2. Moisture &amp; Cloud Nuclei Transport
            </text>
            <path d="M292,82 C282,82 278,70 288,64 C294,52 316,52 324,60 C336,56 350,64 344,82 Z" fill="#5D8EB8" fillOpacity="0.24" stroke="#8FB4D4" />
            <circle cx="385" cy="72" r="2.5" fill="var(--accent-gold)" />
            <circle cx="398" cy="64" r="2" fill="var(--accent-gold)" />
            <circle cx="394" cy="82" r="2" fill="var(--accent-gold)" />
            <path d="M408,74 L356,74" stroke="var(--accent-gold)" strokeWidth="1.2" />
            <polygon points="350,74 358,70 358,78" fill="var(--accent-gold)" />
            <text x="341" y="102" textAnchor="middle" fill="var(--page-ink)" fontSize="7.5">
              Winds transport vapor, sea salt
            </text>
            <text x="341" y="114" textAnchor="middle" fill="var(--page-muted)" fontSize="7">
              &amp; dust nuclei feeding clouds
            </text>

            <text x="230" y="164" textAnchor="middle" fill="var(--page-muted)" fontSize="8">
              Tafsir Note: 15:22 (lawāqiḥ) carries broad interpretive range—do not assert wind pollination as its sole meaning
            </text>
          </svg>
        );

      case 'atmospheric-circulation-belts':
        return (
          <svg viewBox="0 0 460 175" className="w-full h-auto" role="img" aria-label={title}>
            {/* Earth semicircle / atmospheric cells */}
            <circle cx="155" cy="88" r="56" fill="#5D8EB8" fillOpacity="0.18" stroke="#8FB4D4" strokeWidth="1.3" />
            <line x1="99" y1="88" x2="211" y2="88" stroke="var(--accent-gold)" strokeWidth="1" strokeDasharray="3 2" />
            <line x1="107" y1="60" x2="203" y2="60" stroke="var(--hairline)" />
            <line x1="107" y1="116" x2="203" y2="116" stroke="var(--hairline)" />
            {/* Trade wind & Westerlies arrows */}
            <path d="M180,78 L138,84" stroke="var(--accent-gold)" strokeWidth="1.3" />
            <polygon points="132,85 141,80 141,87" fill="var(--accent-gold)" />
            <path d="M132,48 L178,44" stroke="#8FB4D4" strokeWidth="1.3" />
            <polygon points="184,43 175,40 176,48" fill="#8FB4D4" />
            <text x="155" y="154" textAnchor="middle" fill="var(--page-muted)" fontSize="7.5">
              Equatorial Heating &amp; Circulation Cells
            </text>

            {/* Right summary boxes */}
            <rect x="242" y="24" width="198" height="118" rx="4" fill="var(--page-bg-secondary)" stroke="var(--hairline)" />
            <text x="341" y="42" textAnchor="middle" fill="var(--accent-gold)" fontSize="8.5" fontWeight="600">
              Global Atmospheric Circulation
            </text>
            <text x="256" y="62" fill="var(--page-ink)" fontSize="7.5" fontWeight="600">
              • Hadley Cell (0°–30°):
            </text>
            <text x="266" y="74" fill="var(--page-muted)" fontSize="7.5">
              Trade winds &amp; tropical rain belts
            </text>
            <text x="256" y="92" fill="var(--page-ink)" fontSize="7.5" fontWeight="600">
              • Ferrel Cell &amp; Jet Streams (30°–60°):
            </text>
            <text x="266" y="104" fill="var(--page-muted)" fontSize="7.5">
              Mid-latitude cyclones &amp; seasonal shifts
            </text>
            <text x="256" y="122" fill="var(--page-ink)" fontSize="7.5" fontWeight="600">
              • Polar Cell (60°–90°):
            </text>
            <text x="266" y="134" fill="var(--page-muted)" fontSize="7.5">
              Cold air outflow &amp; heat balance
            </text>

            <text x="230" y="166" textAnchor="middle" fill="var(--page-muted)" fontSize="8">
              Differential solar heating and Earth’s rotation organize global winds, humidity, and weather patterns (NOAA)
            </text>
          </svg>
        );

      case 'lightning-charge-separation':
        return (
          <svg viewBox="0 0 460 175" className="w-full h-auto" role="img" aria-label={title}>
            {/* Cloud silhouette */}
            <path
              d="M110,104 C92,104 86,84 102,74 C98,52 122,36 146,40 C158,20 198,18 220,30 C248,18 292,28 296,52 C320,56 326,82 308,94 C316,102 308,104 292,104 Z"
              fill="var(--page-bg-secondary)"
              stroke="#8FB4D4"
              strokeWidth="1.3"
            />
            {/* Charges */}
            <text x="200" y="42" textAnchor="middle" fill="var(--accent-gold)" fontSize="11" fontWeight="700">
              + + + + (Ice crystals aloft)
            </text>
            <text x="200" y="92" textAnchor="middle" fill="#8FB4D4" fontSize="11" fontWeight="700">
              &minus; &minus; &minus; &minus; (Heavier graupel)
            </text>

            {/* Lightning bolt to ground */}
            <polyline
              points="210,102 198,118 214,122 200,144"
              fill="none"
              stroke="var(--accent-gold)"
              strokeWidth="2.2"
            />
            <line x1="20" y1="146" x2="440" y2="146" stroke="var(--hairline)" strokeWidth="1.4" />
            <text x="200" y="158" textAnchor="middle" fill="var(--accent-gold)" fontSize="8" fontWeight="600">
              + + Ground Induced Charge (Strike)
            </text>

            {/* Mechanism note */}
            <rect x="332" y="34" width="110" height="96" rx="4" fill="var(--page-bg-secondary)" stroke="var(--hairline)" />
            <text x="387" y="52" textAnchor="middle" fill="var(--accent-gold)" fontSize="8" fontWeight="600">
              Charge Mechanism
            </text>
            <text x="387" y="70" textAnchor="middle" fill="var(--page-ink)" fontSize="7.5">
              Updraft collisions
            </text>
            <text x="387" y="82" textAnchor="middle" fill="var(--page-ink)" fontSize="7.5">
              among ice, graupel
            </text>
            <text x="387" y="94" textAnchor="middle" fill="var(--page-ink)" fontSize="7.5">
              &amp; supercooled drops
            </text>
            <text x="387" y="114" textAnchor="middle" fill="var(--page-muted)" fontSize="7">
              Intracloud or ground
            </text>

            <text x="230" y="170" textAnchor="middle" fill="var(--page-muted)" fontSize="7.5">
              Lightning occurs within clouds, between clouds, or to ground once electric potential overcomes air insulation (NOAA)
            </text>
          </svg>
        );

      case 'lightning-thunder-acoustics':
        return (
          <svg viewBox="0 0 460 175" className="w-full h-auto" role="img" aria-label={title}>
            {/* Discharge origin */}
            <polyline points="60,24 48,66 64,72 52,116" fill="none" stroke="var(--accent-gold)" strokeWidth="2.5" />
            <text x="58" y="134" textAnchor="middle" fill="var(--accent-gold)" fontSize="8" fontWeight="600">
              Electrical Channel
            </text>
            <text x="58" y="145" textAnchor="middle" fill="var(--page-muted)" fontSize="7">
              ~20,000–30,000 °C
            </text>

            {/* Optical Flash */}
            <line x1="76" y1="54" x2="365" y2="54" stroke="var(--accent-gold)" strokeWidth="1.6" />
            <polygon points="373,54 363,50 363,58" fill="var(--accent-gold)" />
            <text x="225" y="44" textAnchor="middle" fill="var(--accent-gold)" fontSize="8.5" fontWeight="600">
              1. Optical Flash (~3×10⁸ m/s · Nearly Instantaneous)
            </text>

            {/* Acoustic Shockwave / Thunder */}
            <path d="M84,96 Q104,84 124,96 T164,96 T204,96 T244,96 T284,96 T324,96 T364,96" fill="none" stroke="#8FB4D4" strokeWidth="1.7" />
            <polygon points="373,96 363,92 363,100" fill="#8FB4D4" />
            <text x="225" y="80" textAnchor="middle" fill="#8FB4D4" fontSize="8.5" fontWeight="600">
              2. Acoustic Thunder Wave (~343 m/s · Rapid Air Expansion)
            </text>
            <text x="225" y="118" textAnchor="middle" fill="var(--page-ink)" fontSize="8">
              Flash-to-Bang Delay: ~3 seconds per km (~5 seconds per mile)
            </text>

            {/* Observer */}
            <circle cx="398" cy="70" r="10" fill="var(--page-bg-secondary)" stroke="var(--page-ink)" />
            <text x="398" y="96" textAnchor="middle" fill="var(--page-ink)" fontSize="8" fontWeight="600">
              Observer
            </text>

            <text x="230" y="166" textAnchor="middle" fill="var(--page-muted)" fontSize="8">
              Lightning (electrical) and thunder (acoustic) are distinct effects of one storm discharge event (NOAA / NWS)
            </text>
          </svg>
        );

      case 'hail-updraft-growth':
        return (
          <svg viewBox="0 0 460 175" className="w-full h-auto" role="img" aria-label={title}>
            {/* Freezing level line */}
            <line x1="20" y1="92" x2="275" y2="92" stroke="#8FB4D4" strokeDasharray="4 3" />
            <text x="30" y="86" fill="#8FB4D4" fontSize="7.5" fontWeight="600">
              0 °C Freezing Level
            </text>

            {/* Storm updraft loop */}
            <path d="M120,136 C120,62 120,30 165,30 C210,30 210,72 175,92 C145,108 148,54 190,48" fill="none" stroke="var(--accent-gold)" strokeWidth="1.5" />
            <polygon points="122,48 117,58 127,58" fill="var(--accent-gold)" />
            <text x="72" y="54" textAnchor="middle" fill="var(--accent-gold)" fontSize="8" fontWeight="600">
              Strong Updraft
            </text>
            <text x="72" y="65" textAnchor="middle" fill="var(--page-muted)" fontSize="7">
              (&gt;15–30 m/s)
            </text>

            {/* Falling hail */}
            <line x1="226" y1="64" x2="226" y2="128" stroke="#8FB4D4" strokeWidth="1.4" strokeDasharray="3 2" />
            <polygon points="226,136 222,126 230,126" fill="#8FB4D4" />
            <circle cx="226" cy="108" r="6" fill="var(--page-bg)" stroke="#8FB4D4" strokeWidth="1.4" />
            <text x="252" y="114" fill="var(--page-ink)" fontSize="7.5">
              Falls when weight
            </text>
            <text x="252" y="124" fill="var(--page-ink)" fontSize="7.5">
              exceeds updraft
            </text>

            {/* Cross-section of layered hailstone */}
            <rect x="305" y="22" width="136" height="122" rx="4" fill="var(--page-bg-secondary)" stroke="var(--hairline)" />
            <text x="373" y="40" textAnchor="middle" fill="var(--accent-gold)" fontSize="8.5" fontWeight="600">
              Layered Hailstone
            </text>
            <circle cx="373" cy="82" r="26" fill="none" stroke="#8FB4D4" strokeWidth="1.4" />
            <circle cx="373" cy="82" r="18" fill="none" stroke="var(--accent-gold)" strokeWidth="1.1" />
            <circle cx="373" cy="82" r="10" fill="none" stroke="#8FB4D4" strokeWidth="1.1" />
            <circle cx="373" cy="82" r="3.5" fill="var(--page-ink)" />
            <text x="373" y="122" textAnchor="middle" fill="var(--page-muted)" fontSize="7">
              Alternating clear &amp; milky ice
            </text>
            <text x="373" y="133" textAnchor="middle" fill="var(--page-muted)" fontSize="7">
              from supercooled droplet accretion
            </text>

            <text x="230" y="166" textAnchor="middle" fill="var(--page-muted)" fontSize="8">
              Hail forms only in suitable strong thunderstorm updrafts with supercooled water; not every storm produces hail (NOAA)
            </text>
          </svg>
        );

      case 'cumulonimbus-storm-cell':
        return (
          <svg viewBox="0 0 460 175" className="w-full h-auto" role="img" aria-label={title}>
            {/* Tropopause lid */}
            <line x1="20" y1="26" x2="440" y2="26" stroke="var(--hairline)" strokeDasharray="4 3" />
            <text x="355" y="21" textAnchor="middle" fill="var(--page-muted)" fontSize="7.5">
              Tropopause (~12–18 km)
            </text>

            {/* Giant Anvil Cloud */}
            <path
              d="M140,114 C122,114 118,90 135,80 C128,58 148,42 172,46 C158,34 150,26 225,26 C315,26 306,36 276,48 C292,58 296,82 280,94 C292,104 284,114 266,114 Z"
              fill="#5D8EB8"
              fillOpacity="0.22"
              stroke="var(--accent-gold)"
              strokeWidth="1.4"
            />
            <text x="218" y="42" textAnchor="middle" fill="var(--page-ink)" fontSize="8" fontWeight="600">
              Spreading Ice Anvil
            </text>
            <text x="210" y="72" textAnchor="middle" fill="var(--accent-gold)" fontSize="8" fontWeight="600">
              Deep Vertical Tower
            </text>
            <text x="210" y="84" textAnchor="middle" fill="var(--page-muted)" fontSize="7.5">
              Updrafts, supercooled water &amp; hail
            </text>

            {/* Precipitation & lightning */}
            <line x1="175" y1="116" x2="170" y2="144" stroke="#8FB4D4" strokeWidth="1.3" strokeDasharray="2 2" />
            <line x1="190" y1="116" x2="185" y2="144" stroke="#8FB4D4" strokeWidth="1.3" strokeDasharray="2 2" />
            <polyline points="236,114 228,128 240,132 230,146" fill="none" stroke="var(--accent-gold)" strokeWidth="1.8" />

            {/* Interpretive boundary callout */}
            <rect x="315" y="46" width="128" height="90" rx="4" fill="var(--page-bg-secondary)" stroke="var(--hairline)" />
            <text x="379" y="64" textAnchor="middle" fill="var(--accent-gold)" fontSize="8" fontWeight="600">
              24:43 Context Note
            </text>
            <text x="379" y="80" textAnchor="middle" fill="var(--page-ink)" fontSize="7.2">
              Cumulonimbus height
            </text>
            <text x="379" y="92" textAnchor="middle" fill="var(--page-ink)" fontSize="7.2">
              resembles peaks, yet
            </text>
            <text x="379" y="104" textAnchor="middle" fill="var(--page-muted)" fontSize="7.2">
              modern cloud taxonomy
            </text>
            <text x="379" y="116" textAnchor="middle" fill="var(--page-muted)" fontSize="7.2">
              requires tafsir caution
            </text>

            <text x="230" y="166" textAnchor="middle" fill="var(--page-muted)" fontSize="8">
              Deep cumulonimbus clouds produce rain, lightning, and hail; avoid equating 24:43 imagery strictly with modern cloud types
            </text>
          </svg>
        );

      case 'thunderstorm-lifecycle-hazards':
        return (
          <svg viewBox="0 0 460 175" className="w-full h-auto" role="img" aria-label={title}>
            {/* 3 Stages */}
            <rect x="18" y="22" width="134" height="122" rx="4" fill="var(--page-bg-secondary)" stroke="var(--hairline)" />
            <text x="85" y="40" textAnchor="middle" fill="#8FB4D4" fontSize="8.5" fontWeight="600">
              1. Cumulus Stage
            </text>
            <path d="M56,82 C48,82 46,70 54,64 C60,54 80,54 88,62 C98,58 110,66 106,82 Z" fill="#8FB4D4" fillOpacity="0.22" stroke="#8FB4D4" />
            <line x1="82" y1="118" x2="82" y2="86" stroke="var(--accent-gold)" strokeWidth="1.5" />
            <polygon points="82,82 78,90 86,90" fill="var(--accent-gold)" />
            <text x="85" y="134" textAnchor="middle" fill="var(--page-muted)" fontSize="7.5">
              Warm moist updraft only
            </text>

            <rect x="163" y="22" width="134" height="122" rx="4" fill="var(--page-bg-secondary)" stroke="var(--accent-gold)" />
            <text x="230" y="40" textAnchor="middle" fill="var(--accent-gold)" fontSize="8.5" fontWeight="600">
              2. Mature Stage (Peak)
            </text>
            <path d="M196,80 C186,80 184,66 194,58 C200,44 226,42 238,52 C252,48 266,60 260,80 Z" fill="#5D8EB8" fillOpacity="0.28" stroke="var(--accent-gold)" />
            <line x1="212" y1="118" x2="212" y2="84" stroke="var(--accent-gold)" strokeWidth="1.4" />
            <line x1="246" y1="82" x2="246" y2="116" stroke="#8FB4D4" strokeWidth="1.4" />
            <polygon points="246,120 242,112 250,112" fill="#8FB4D4" />
            <text x="230" y="134" textAnchor="middle" fill="var(--page-ink)" fontSize="7.5">
              Heavy rain, lightning, hail, gusts
            </text>

            <rect x="308" y="22" width="134" height="122" rx="4" fill="var(--page-bg-secondary)" stroke="var(--hairline)" />
            <text x="375" y="40" textAnchor="middle" fill="var(--page-ink)" fontSize="8.5" fontWeight="600">
              3. Dissipating Stage
            </text>
            <path d="M346,78 C338,78 336,68 344,62 C350,54 374,54 382,62 C392,58 402,66 398,78 Z" fill="var(--page-bg)" stroke="var(--hairline)" />
            <line x1="375" y1="82" x2="375" y2="116" stroke="#8FB4D4" strokeWidth="1.2" strokeDasharray="2 2" />
            <text x="375" y="134" textAnchor="middle" fill="var(--page-muted)" fontSize="7.5">
              Downdraft chokes inflow
            </text>

            <text x="230" y="164" textAnchor="middle" fill="var(--page-muted)" fontSize="8">
              NOAA single-cell lifecycle (~30–60 min); peak mature stage concentrates lightning, hail, wind, and flash-flood hazards
            </text>
          </svg>
        );

      case 'severe-wind-storms':
        return (
          <svg viewBox="0 0 460 175" className="w-full h-auto" role="img" aria-label={title}>
            <rect x="18" y="22" width="134" height="120" rx="4" fill="var(--page-bg-secondary)" stroke="var(--hairline)" />
            <text x="85" y="40" textAnchor="middle" fill="var(--accent-gold)" fontSize="8.5" fontWeight="600">
              Synoptic Gales
            </text>
            <path d="M34,68 L130,68 M40,84 L126,84" stroke="#8FB4D4" strokeWidth="1.5" />
            <text x="85" y="108" textAnchor="middle" fill="var(--page-ink)" fontSize="7.5">
              Steep pressure gradients;
            </text>
            <text x="85" y="120" textAnchor="middle" fill="var(--page-muted)" fontSize="7.5">
              can persist for days
            </text>

            <rect x="163" y="22" width="134" height="120" rx="4" fill="var(--page-bg-secondary)" stroke="var(--hairline)" />
            <text x="230" y="40" textAnchor="middle" fill="#8FB4D4" fontSize="8.5" fontWeight="600">
              Downbursts &amp; Gusts
            </text>
            <path d="M230,54 L230,86 M230,86 L192,94 M230,86 L268,94" stroke="var(--accent-gold)" strokeWidth="1.4" />
            <text x="230" y="112" textAnchor="middle" fill="var(--page-ink)" fontSize="7.5">
              Intense convective outflow
            </text>
            <text x="230" y="124" textAnchor="middle" fill="var(--page-muted)" fontSize="7.5">
              damaging structures &amp; trees
            </text>

            <rect x="308" y="22" width="134" height="120" rx="4" fill="var(--page-bg-secondary)" stroke="var(--hairline)" />
            <text x="375" y="40" textAnchor="middle" fill="var(--page-ink)" fontSize="8.5" fontWeight="600">
              Dust &amp; Aeolian Erosion
            </text>
            <path d="M324,78 Q355,66 385,78 T424,74" fill="none" stroke="#8FB4D4" strokeWidth="1.5" strokeDasharray="3 2" />
            <text x="375" y="108" textAnchor="middle" fill="var(--page-ink)" fontSize="7.5">
              Soil &amp; sand transport;
            </text>
            <text x="375" y="120" textAnchor="middle" fill="var(--page-muted)" fontSize="7.5">
              distinct from cyclones
            </text>

            <text x="230" y="164" textAnchor="middle" fill="var(--page-muted)" fontSize="8">
              Severe windstorms differ physically in origin; historical judgment narratives are not modern storm diagnostics
            </text>
          </svg>
        );

      case 'wet-deposition-water-quality':
        return (
          <svg viewBox="0 0 460 175" className="w-full h-auto" role="img" aria-label={title}>
            <rect x="18" y="22" width="134" height="122" rx="4" fill="var(--page-bg-secondary)" stroke="#8FB4D4" />
            <text x="85" y="40" textAnchor="middle" fill="#8FB4D4" fontSize="8.5" fontWeight="600">
              1. Wet Deposition
            </text>
            <line x1="65" y1="54" x2="60" y2="90" stroke="#8FB4D4" strokeWidth="1.3" strokeDasharray="2 2" />
            <line x1="105" y1="54" x2="100" y2="90" stroke="#8FB4D4" strokeWidth="1.3" strokeDasharray="2 2" />
            <circle cx="82" cy="70" r="2.5" fill="var(--accent-gold)" />
            <text x="85" y="108" textAnchor="middle" fill="var(--page-ink)" fontSize="7.5">
              Scavenges dust, soot
            </text>
            <text x="85" y="120" textAnchor="middle" fill="var(--page-muted)" fontSize="7">
              &amp; soluble gases (~pH 5.6)
            </text>

            <text x="158" y="84" textAnchor="middle" fill="var(--accent-gold)" fontSize="13">
              &rarr;
            </text>

            <rect x="168" y="22" width="134" height="122" rx="4" fill="var(--page-bg-secondary)" stroke="var(--hairline)" />
            <text x="235" y="40" textAnchor="middle" fill="var(--accent-gold)" fontSize="8.5" fontWeight="600">
              2. Catchment Contact
            </text>
            <text x="235" y="68" textAnchor="middle" fill="var(--page-ink)" fontSize="7.5">
              Roofs, soil &amp; runoff add
            </text>
            <text x="235" y="80" textAnchor="middle" fill="var(--page-ink)" fontSize="7.5">
              microbes or pollutants
            </text>
            <text x="235" y="108" textAnchor="middle" fill="var(--accent-gold)" fontSize="7.5" fontWeight="600">
              Rain does NOT sterilize
            </text>
            <text x="235" y="120" textAnchor="middle" fill="var(--page-muted)" fontSize="7">
              or ensure automatic safety
            </text>

            <text x="310" y="84" textAnchor="middle" fill="var(--accent-gold)" fontSize="13">
              &rarr;
            </text>

            <rect x="320" y="22" width="122" height="122" rx="4" fill="var(--page-bg-secondary)" stroke="#8FB4D4" />
            <text x="381" y="40" textAnchor="middle" fill="#8FB4D4" fontSize="8.5" fontWeight="600">
              3. Safe Supply
            </text>
            <text x="381" y="68" textAnchor="middle" fill="var(--page-ink)" fontSize="7.5">
              Filtration, disinfection
            </text>
            <text x="381" y="80" textAnchor="middle" fill="var(--page-ink)" fontSize="7.5">
              &amp; clean storage protect
            </text>
            <text x="381" y="92" textAnchor="middle" fill="var(--page-ink)" fontSize="7.5">
              drinking-water quality
            </text>

            <text x="230" y="164" textAnchor="middle" fill="var(--page-muted)" fontSize="8">
              Distinguish ritual/surface cleansing and wet deposition from microbiological drinking-water potability (NOAA)
            </text>
          </svg>
        );

      case 'atmosphere-layers-uv-protection':
        return (
          <svg viewBox="0 0 460 175" className="w-full h-auto" role="img" aria-label={title}>
            {/* Atmospheric bands */}
            <rect x="24" y="20" width="412" height="32" fill="#5D8EB8" fillOpacity="0.14" stroke="var(--hairline)" />
            <rect x="24" y="52" width="412" height="42" fill="var(--accent-gold)" fillOpacity="0.14" stroke="var(--accent-gold)" />
            <rect x="24" y="94" width="412" height="50" fill="#5D8EB8" fillOpacity="0.24" stroke="#8FB4D4" />

            <text x="276" y="39" fill="var(--page-muted)" fontSize="8">
              Upper Atmosphere (~50+ km) · Burns small meteoroids
            </text>
            <text x="276" y="70" fill="var(--accent-gold)" fontSize="8.5" fontWeight="600">
              Stratospheric Ozone (~15–35 km)
            </text>
            <text x="276" y="83" fill="var(--page-ink)" fontSize="7.5">
              Absorbs ~100% UV-C &amp; &gt;90% UV-B
            </text>
            <text x="276" y="116" fill="var(--page-ink)" fontSize="8.5" fontWeight="600">
              Troposphere (0–18 km) · Weather &amp; Breathable Air
            </text>
            <text x="276" y="129" fill="var(--page-muted)" fontSize="7.5">
              ~75–80% atmospheric mass; UV-A &amp; visible light reach surface
            </text>

            {/* Solar UV rays */}
            <line x1="60" y1="8" x2="60" y2="68" stroke="var(--accent-gold)" strokeWidth="1.6" />
            <text x="60" y="84" textAnchor="middle" fill="var(--accent-gold)" fontSize="7" fontWeight="600">
              UV-C / UV-B
            </text>
            <text x="60" y="93" textAnchor="middle" fill="var(--page-muted)" fontSize="6.5">
              Mostly absorbed
            </text>

            <line x1="125" y1="8" x2="125" y2="142" stroke="#8FB4D4" strokeWidth="1.5" />
            <polygon points="125,146 121,138 129,138" fill="#8FB4D4" />
            <text x="165" y="108" fill="#8FB4D4" fontSize="7">
              Visible &amp; UV-A pass
            </text>

            <text x="230" y="166" textAnchor="middle" fill="var(--page-muted)" fontSize="8">
              Atmosphere provides specific, partial protection (UV absorption &amp; thermal moderation)—not an absolute shield (NASA)
            </text>
          </svg>
        );

      case 'cloud-radiative-energy-balance':
        return (
          <svg viewBox="0 0 460 175" className="w-full h-auto" role="img" aria-label={title}>
            {/* Left: Albedo cooling */}
            <rect x="20" y="22" width="202" height="122" rx="4" fill="var(--page-bg-secondary)" stroke="#8FB4D4" />
            <text x="121" y="40" textAnchor="middle" fill="#8FB4D4" fontSize="8.5" fontWeight="600">
              Shortwave Albedo Cooling
            </text>
            <path d="M84,82 C74,82 70,70 80,64 C86,52 108,52 116,60 C128,56 142,64 138,82 Z" fill="#8FB4D4" fillOpacity="0.28" stroke="#8FB4D4" />
            <line x1="56" y1="48" x2="92" y2="66" stroke="var(--accent-gold)" strokeWidth="1.5" />
            <line x1="92" y1="66" x2="128" y2="46" stroke="var(--accent-gold)" strokeWidth="1.5" />
            <polygon points="133,43 123,44 127,51" fill="var(--accent-gold)" />
            <text x="121" y="106" textAnchor="middle" fill="var(--page-ink)" fontSize="7.5">
              Low thick clouds reflect
            </text>
            <text x="121" y="118" textAnchor="middle" fill="var(--page-muted)" fontSize="7.5">
              incoming sunlight &amp; shade surface
            </text>

            {/* Right: Infrared greenhouse warming */}
            <rect x="238" y="22" width="202" height="122" rx="4" fill="var(--page-bg-secondary)" stroke="var(--accent-gold)" />
            <text x="339" y="40" textAnchor="middle" fill="var(--accent-gold)" fontSize="8.5" fontWeight="600">
              Longwave Infrared Trapping
            </text>
            <path d="M304,76 C294,76 290,66 300,60 C306,52 328,52 336,58 C348,54 362,62 358,76 Z" fill="var(--accent-gold)" fillOpacity="0.2" stroke="var(--accent-gold)" />
            <line x1="318" y1="112" x2="318" y2="82" stroke="#8FB4D4" strokeWidth="1.4" strokeDasharray="3 2" />
            <line x1="342" y1="82" x2="342" y2="112" stroke="var(--accent-gold)" strokeWidth="1.4" />
            <polygon points="342,116 338,108 346,108" fill="var(--accent-gold)" />
            <text x="339" y="128" textAnchor="middle" fill="var(--page-ink)" fontSize="7.5">
              Clouds absorb &amp; re-emit infrared
            </text>

            <text x="230" y="164" textAnchor="middle" fill="var(--page-muted)" fontSize="8">
              Clouds exert both cooling (solar reflection) and warming (infrared trapping); net impact depends on cloud height &amp; thickness (NASA)
            </text>
          </svg>
        );

      case 'thermal-shelter-radiation':
        return (
          <svg viewBox="0 0 460 175" className="w-full h-auto" role="img" aria-label={title}>
            {/* Left: Heat shade */}
            <rect x="20" y="22" width="202" height="122" rx="4" fill="var(--page-bg-secondary)" stroke="var(--accent-gold)" />
            <text x="121" y="40" textAnchor="middle" fill="var(--accent-gold)" fontSize="8.5" fontWeight="600">
              1. Shelter from Direct Heat
            </text>
            <line x1="56" y1="48" x2="94" y2="74" stroke="var(--accent-gold)" strokeWidth="1.5" />
            <line x1="82" y1="48" x2="120" y2="74" stroke="var(--accent-gold)" strokeWidth="1.5" />
            <path d="M62,78 L180,78" stroke="var(--page-ink)" strokeWidth="2.4" />
            <rect x="76" y="82" width="90" height="30" fill="#5D8EB8" fillOpacity="0.18" />
            <text x="121" y="100" textAnchor="middle" fill="var(--page-ink)" fontSize="7.5" fontWeight="600">
              Shaded Cooler Zone
            </text>
            <text x="121" y="128" textAnchor="middle" fill="var(--page-muted)" fontSize="7.2">
              Blocks solar radiation load
            </text>

            {/* Right: Cold insulation */}
            <rect x="238" y="22" width="202" height="122" rx="4" fill="var(--page-bg-secondary)" stroke="#8FB4D4" />
            <text x="339" y="40" textAnchor="middle" fill="#8FB4D4" fontSize="8.5" fontWeight="600">
              2. Insulation Against Cold
            </text>
            <rect x="284" y="64" width="110" height="44" rx="8" fill="none" stroke="#8FB4D4" strokeWidth="2" />
            <rect x="296" y="74" width="86" height="24" rx="4" fill="#5D8EB8" fillOpacity="0.22" stroke="var(--accent-gold)" />
            <text x="339" y="89" textAnchor="middle" fill="var(--page-ink)" fontSize="7.5" fontWeight="600">
              Trapped Still Air Layer
            </text>
            <text x="339" y="128" textAnchor="middle" fill="var(--page-muted)" fontSize="7.2">
              Slows convective &amp; conductive loss
            </text>

            <text x="230" y="164" textAnchor="middle" fill="var(--page-muted)" fontSize="8">
              Shade reduces solar radiative heating, while clothing and shelter trap air to limit heat loss in cold environments
            </text>
          </svg>
        );

      case 'rainfall-groundwater-replenishment':
        return (
          <svg viewBox="0 0 460 175" className="w-full h-auto" role="img" aria-label={title}>
            <path d="M20,46 L160,50 L265,94 L440,104 L440,150 L20,150 Z" fill="var(--page-bg-secondary)" stroke="var(--hairline)" />
            <path d="M20,88 L175,88 L265,96 L440,106 L440,126 L20,126 Z" fill="#5D8EB8" fillOpacity="0.26" stroke="#8FB4D4" />
            <rect x="20" y="126" width="420" height="24" fill="var(--page-bg)" stroke="var(--accent-gold)" strokeWidth="0.9" />
            <text x="230" y="141" textAnchor="middle" fill="var(--page-muted)" fontSize="7.5">
              Confining Clay / Low-Permeability Bedrock
            </text>

            {/* Rain */}
            {[60, 95, 130].map((x) => (
              <line key={x} x1={x} y1="16" x2={x - 6} y2="40" stroke="#8FB4D4" strokeWidth="1.2" strokeDasharray="2 2" />
            ))}
            <line x1="95" y1="50" x2="95" y2="82" stroke="var(--accent-gold)" strokeWidth="1.3" strokeDasharray="3 2" />
            <polygon points="95,86 91,78 99,78" fill="var(--accent-gold)" />
            <text x="150" y="34" fill="#8FB4D4" fontSize="8" fontWeight="600">
              Infiltration Recharge
            </text>

            {/* Runoff & Spring */}
            <path d="M168,54 L256,92" stroke="#8FB4D4" strokeWidth="1.4" />
            <text x="232" y="66" fill="var(--page-ink)" fontSize="7.5">
              Surface Runoff
            </text>
            <path d="M98,106 L252,106" stroke="#8FB4D4" strokeWidth="1.3" />
            <circle cx="264" cy="94" r="4.5" fill="var(--accent-gold)" />
            <text x="342" y="88" textAnchor="middle" fill="var(--accent-gold)" fontSize="8" fontWeight="600">
              Spring / Baseflow Emergence
            </text>

            <text x="230" y="166" textAnchor="middle" fill="var(--page-muted)" fontSize="8">
              Rain recharges soils, rivers, and aquifers; spring timescales vary from seasonal flow to ancient fossil groundwater
            </text>
          </svg>
        );
    }
  };

  return (
    <figure className="my-2.5 p-3 border border-[var(--gold-hairline)] bg-[var(--page-bg-secondary)]/55 rounded-sm">
      <div className="flex items-center justify-between gap-2 pb-1.5 mb-2 border-b border-[var(--hairline)]">
        <span className="text-[11px] uppercase tracking-[0.16em] text-[var(--accent-gold)] font-semibold">
          Atmospheric Diagram · {title}
        </span>
        <span className="text-[10px] uppercase tracking-[0.14em] text-[#8FB4D4]">
          Meteorological Reference
        </span>
      </div>

      <div className="w-full overflow-hidden">{renderSvg()}</div>

      <figcaption className="mt-2 pt-1.5 border-t border-[var(--hairline)] font-editorial italic text-xs text-[var(--page-muted)] leading-snug">
        {caption}
      </figcaption>
    </figure>
  );
};
