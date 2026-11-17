import {
  anvilCumulonimbus,
  calloutTag,
  cardBox,
  chartAxes,
  cloudShape,
  curvedArrow,
  cycleNodeRing,
  flowArrow,
  keyTakeawayStrip,
  lightningBolt,
  rainDrops,
  soilCutaway,
  titledCard,
} from '../lib/diagramPrimitives';
import { buildPlateShell, escXml, PALETTE, renderSvgTextLines, wrapLines } from '../lib/plateRenderer';
import type { RawDatasetEntry, TopicEnrichment } from '../../src/types/encyclopedia';

export function buildWeatherPlateSvg(entry: RawDatasetEntry, enrichment?: TopicEnrichment): string {
  const id = entry.id;
  const title = enrichment?.diagramTitle ?? entry.title;
  const subtitle = enrichment?.diagramCaption ?? entry.scientific_topic;
  const finding = entry.scientific_evidence.finding;
  const kind = (enrichment?.diagramKind ?? 'atmospheric-water-budget') as string;
  let bodySvg = '';

  // 1. Horizontal &amp; Multi-Level Cloud Wind Transport (ATM-001, ATM-011, ATM-042)
  if (id === 'ATM-001' || id === 'ATM-011' || id === 'ATM-042') {
    const mode = id === 'ATM-001' ? 'synoptic' : id === 'ATM-011' ? 'shear' : 'river';
    bodySvg = `
      <rect x="46" y="142" width="1108" height="456" rx="8" fill="#E9F2F7" stroke="${PALETTE.border}" stroke-width="1.2" />
      <rect x="46" y="142" width="1108" height="145" fill="#DCE9F5" />
      <rect x="46" y="287" width="1108" height="175" fill="#ECF4F9" />
      <path d="M 46 534 L 470 534 L 520 496 L 780 496 Q 920 436 1030 466 L 1154 499 L 1154 598 L 46 598 Z" fill="#C9B99B" stroke="#7A6B52" stroke-width="1.5" />
      <rect x="46" y="534" width="445" height="64" fill="#2B6CB0" fill-opacity="0.72" />
      <text x="240" y="571" font-family="Noto Sans, sans-serif" font-size="14" font-weight="700" fill="#FFFFFF" text-anchor="middle">OCEAN SOURCE BASIN</text>
      <text x="875" y="571" font-family="Noto Sans, sans-serif" font-size="14" font-weight="700" fill="#2A241A" text-anchor="middle">${mode === 'river' ? 'INLAND WATERSHED RECEIVING MOISTURE' : 'CONTINENTAL INTERIOR &amp; TOPOGRAPHY'}</text>
      ${
        mode === 'synoptic'
          ? `
            ${cloudShape(270, 322, 0.9, '#FFFFFF', '#5C728A')}
            ${cloudShape(590, 292, 1.05, '#F2F6FA', '#506478', true)}
            ${cloudShape(900, 262, 1.15, '#E2EAF2', '#425568', true)}
            ${flowArrow(140, 322, 200, 322, PALETTE.blue, 3)}
            ${flowArrow(385, 307, 470, 294, PALETTE.blue, 3.2)}
            ${flowArrow(715, 282, 775, 270, PALETTE.blue, 3.2)}
            ${rainDrops(825, 298, 165, 145, 7, 4)}
            ${calloutTag(270, 224, 'Marine Vapor Uplift', PALETTE.blue, '#FFFFFF', PALETTE.blue)}
            ${calloutTag(590, 200, 'Advection Over Coastline', PALETTE.emerald, '#FFFFFF', PALETTE.emerald)}
            ${calloutTag(900, 180, 'Inland Condensation &amp; Rain', PALETTE.slate, '#FFFFFF', PALETTE.slate)}
          `
          : mode === 'shear'
          ? `
            <text x="72" y="175" font-family="Noto Sans, sans-serif" font-size="12.5" font-weight="700" fill="${PALETTE.slate}">UPPER-TROPOSPHERE JET STEERING (200–300 hPa · 100–300 km/h)</text>
            ${flowArrow(160, 198, 1020, 198, PALETTE.rust, 3.5)}
            <text x="72" y="308" font-family="Noto Sans, sans-serif" font-size="12.5" font-weight="700" fill="${PALETTE.blue}">MID-LEVEL STEERING WINDS (500–700 hPa)</text>
            ${cloudShape(460, 358, 0.95, '#FFFFFF', '#5A6F85')}
            ${cloudShape(810, 322, 1.05, '#E4ECF4', '#4B5E73', true)}
            ${flowArrow(160, 348, 340, 348, PALETTE.blue, 2.8)}
            ${flowArrow(570, 340, 690, 328, PALETTE.blue, 2.8)}
            ${curvedArrow('M 230 515 Q 360 472 430 405', PALETTE.emerald, 2.4)}
            <circle cx="965" cy="248" r="14" fill="#FAF6EC" stroke="${PALETTE.rust}" stroke-width="2" />
            <line x1="965" y1="262" x2="965" y2="293" stroke="${PALETTE.ink}" stroke-width="1.3" />
            <rect x="955" y="293" width="20" height="14" fill="${PALETTE.gold}" />
            ${calloutTag(965, 227, 'Radiosonde Wind Sensor', PALETTE.rust, '#FFFFFF', PALETTE.rust)}
          `
          : `
            <path d="M 90 482 C 310 467, 450 387, 650 317 C 790 267, 920 262, 1070 297 L 1070 357 C 910 327, 790 337, 650 387 C 460 452, 310 522, 90 527 Z" fill="#1B7F8E" fill-opacity="0.28" stroke="#1B7F8E" stroke-width="2" />
            ${cloudShape(640, 292, 1.0, '#F5F9FC', '#4A6178')}
            ${cloudShape(950, 262, 1.1, '#DDE7F2', '#3F5266', true)}
            ${flowArrow(140, 497, 380, 427, PALETTE.cyan, 3.2)}
            ${flowArrow(430, 407, 660, 330, PALETTE.cyan, 3.2)}
            ${flowArrow(720, 312, 910, 287, PALETTE.cyan, 3.2)}
            ${rainDrops(890, 302, 140, 145, 6, 4)}
            ${calloutTag(430, 357, 'Concentrated Water-Vapor Plume (Atmospheric River)', PALETTE.cyan, '#FFFFFF', PALETTE.cyan)}
            ${calloutTag(950, 178, 'Orographic Lifting &amp; Heavy Rain', PALETTE.emerald, '#FFFFFF', PALETTE.emerald)}
          `
      }
      ${keyTakeawayStrip([
        { label: 'Driving Pressure Gradients', detail: 'Differential solar heating sets up horizontal pressure differences that drive regional wind corridors.', color: PALETTE.blue },
        { label: 'Moisture Mass Flux', detail: 'Moving air transports invisible water vapor and suspended cloud decks hundreds to thousands of km inland.', color: PALETTE.emerald },
        { label: 'Observed Scientific Finding', detail: finding, color: PALETTE.gold },
      ], 624)}
    `;

  // 2. Cloud Formation, Convection &amp; Water Vapor Condensation (ATM-002, ATM-032)
  } else if (kind === 'cloud-formation-convection' || id === 'ATM-032') {
    const isVaporFocus = id === 'ATM-032';
    bodySvg = `
      <rect x="46" y="142" width="1108" height="456" rx="8" fill="#EEF4F8" stroke="${PALETTE.border}" stroke-width="1.2" />
      <circle cx="135" cy="212" r="36" fill="#F2B949" stroke="#C98316" stroke-width="2" />
      ${flowArrow(175, 242, 305, 482, PALETTE.ochre, 2.2, true)}
      <rect x="46" y="520" width="1108" height="78" fill="#B5A07D" fill-opacity="0.45" />
      <text x="120" y="564" font-family="Noto Sans, sans-serif" font-size="13" font-weight="700" fill="#3D3122">${isVaporFocus ? 'EVAPORATING WATER SURFACES (INVISIBLE GAS)' : 'WARMED MOIST SURFACE AIR'}</text>
      <line x1="65" y1="368" x2="1135" y2="368" stroke="${PALETTE.blue}" stroke-width="1.8" stroke-dasharray="7 5" />
      ${calloutTag(210, 398, 'Lifting Condensation Level (RH ≈ 100%)', PALETTE.blue, '#FFFFFF', PALETTE.blue)}
      ${curvedArrow('M 275 512 Q 320 432 340 372', PALETTE.rust, 2.8)}
      ${curvedArrow('M 555 512 Q 560 417 560 327', PALETTE.rust, 3.0)}
      ${curvedArrow('M 865 512 Q 860 402 860 297', PALETTE.rust, 3.2)}
      ${cloudShape(345, 318, 0.72, '#FFFFFF', '#708499')}
      ${cloudShape(560, 278, 1.0, '#F3F7FB', '#5A6E82', true)}
      ${cloudShape(860, 242, 1.25, '#DCE6F0', '#415569', true)}
      ${
        isVaporFocus
          ? `${calloutTag(295, 454, 'Invisible Water Vapor Molecules (H₂O Gas)', PALETTE.cyan, '#FFFFFF', PALETTE.cyan)}
             ${calloutTag(560, 188, 'Condensation onto Aerosols (CCN ~0.1 µm)', PALETTE.emerald, '#FFFFFF', PALETTE.emerald)}
             ${calloutTag(860, 154, 'Visible Liquid Droplets (~20 µm)', PALETTE.blue, '#FFFFFF', PALETTE.blue)}
             <circle cx="240" cy="482" r="5" fill="${PALETTE.cyan}" fill-opacity="0.55" />
             <circle cx="268" cy="466" r="5" fill="${PALETTE.cyan}" fill-opacity="0.55" />
             <circle cx="290" cy="492" r="5" fill="${PALETTE.cyan}" fill-opacity="0.55" />`
          : `${calloutTag(345, 244, '1. Cumulus Humilis', PALETTE.slate, '#FFFFFF', PALETTE.slate)}
             ${calloutTag(560, 198, '2. Updraft Merging (Congestus)', PALETTE.emerald, '#FFFFFF', PALETTE.emerald)}
             ${calloutTag(860, 158, '3. Deep Convective Cluster', PALETTE.rust, '#FFFFFF', PALETTE.rust)}
             ${rainDrops(800, 288, 120, 190, 5, 4)}`
      }
      ${keyTakeawayStrip([
        { label: 'Adiabatic Cooling', detail: 'As warm moist air ascends into lower-pressure air aloft, it expands and cools toward saturation.', color: PALETTE.rust },
        { label: isVaporFocus ? 'Phase Transition Threshold' : 'Latent Heat Release', detail: isVaporFocus ? 'Invisible vapor becomes visible cloud droplets only upon cooling onto aerosol condensation nuclei.' : 'Condensation releases latent heat, fueling buoyant updraft growth and multi-cell merging.', color: PALETTE.emerald },
        { label: 'Observed Phenomenon', detail: finding, color: PALETTE.gold },
      ], 624)}
    `;

  // 3. Stratified vs Piled Cloud Morphology (ATM-003, ATM-034)
  } else if (kind === 'cloud-morphology-layers') {
    const isAltFocus = id === 'ATM-034';
    bodySvg = isAltFocus
      ? `
        ${cardBox({ x: 46, y: 142, w: 620, h: 456, fill: '#EEF5FA', stroke: PALETTE.blue, strokeWidth: 1.4, accentTop: PALETTE.blue })}
        <text x="356" y="162" font-family="Noto Sans, sans-serif" font-size="13.5" font-weight="700" fill="#FFFFFF" text-anchor="middle">WMO TEN CLOUD GENERA BY ALTITUDE &amp; VERTICAL EXTENT</text>
        ${titledCard({ x: 74, y: 192, w: 270, h: 175, badge: 'High (6–13 km · Ice)', title: 'Cirrus, Cirrostratus, Cirrocumulus', body: 'Fibrous ice-crystal veils and rippled mackerel skies ahead of warm fronts.', accent: PALETTE.cyan })}
        ${titledCard({ x: 368, y: 192, w: 270, h: 175, badge: 'Middle (2–7 km · Mixed)', title: 'Altostratus &amp; Altocumulus', body: 'Supercooled droplet/ice sheets and mid-level convective wave bands.', accent: PALETTE.blue })}
        ${titledCard({ x: 74, y: 386, w: 270, h: 175, badge: 'Low (&lt;2 km · Liquid)', title: 'Stratus, Stratocumulus, Nimbostratus', body: 'Layered coastal fog-decks, cellular rolls, and steady rain-bearing decks.', accent: PALETTE.slate })}
        ${titledCard({ x: 368, y: 386, w: 270, h: 175, badge: 'Vertical (0.5–16 km)', title: 'Cumulus &amp; Cumulonimbus', body: 'Buoyant fair-weather puffs towering into thunderstorm anvils.', accent: PALETTE.emerald })}

        ${cardBox({ x: 688, y: 142, w: 466, h: 456, fill: PALETTE.paperCard, stroke: PALETTE.gold, strokeWidth: 1.4, accentTop: PALETTE.gold })}
        <text x="921" y="162" font-family="Noto Sans, sans-serif" font-size="13.5" font-weight="700" fill="#FFFFFF" text-anchor="middle">MORPHOLOGICAL CLASSIFICATION CONTEXT</text>
        ${titledCard({ x: 710, y: 192, w: 422, h: 120, title: entry.scientific_topic, body: finding, accent: PALETTE.blue })}
        ${titledCard({ x: 710, y: 326, w: 422, h: 120, title: 'Temperature &amp; Phase Control', body: 'Cloud altitude sets temperature, separating warm liquid base layers from crystalline high-tropospheric wisps.', accent: PALETTE.emerald })}
        ${titledCard({ x: 710, y: 460, w: 422, h: 120, title: 'Taxonomic Boundary', body: entry.limitations || 'WMO 10 cloud genera organize observable shapes by altitude and stability.', accent: PALETTE.gold })}
        ${keyTakeawayStrip([
          { label: 'Atmospheric Stability Control', detail: 'Stable layers spread air horizontally into flat sheets; buoyant instability piles cumulus towers aloft.', color: PALETTE.blue },
          { label: 'Editorial Guardrail', detail: 'WMO 10 cloud genera organize observable shapes by altitude and stability.', color: PALETTE.gold },
        ], 624)}
      `
      : `
      <rect x="46" y="142" width="1108" height="456" rx="8" fill="#E8F1F8" stroke="${PALETTE.border}" stroke-width="1.2" />
      <line x1="125" y1="164" x2="125" y2="578" stroke="${PALETTE.ink}" stroke-width="2" />
      ${[
        { y: 578, km: '0 km (Surface)' },
        { y: 478, km: '2 km (Low)' },
        { y: 348, km: '6 km (Middle)' },
        { y: 208, km: '12+ km (High)' },
      ]
        .map(
          (lvl) => `
          <line x1="115" y1="${lvl.y}" x2="1125" y2="${lvl.y}" stroke="${PALETTE.border}" stroke-dasharray="4 4" />
          <text x="110" y="${lvl.y + 4}" font-family="Noto Sans, sans-serif" font-size="12" font-weight="700" fill="${PALETTE.ink}" text-anchor="end">${lvl.km}</text>
        `
        )
        .join('')}
      ${cardBox({ x: 155, y: 162, w: 465, h: 422, fill: '#F7FAFC', stroke: PALETTE.blue, strokeWidth: 1.3 })}
      <text x="387" y="190" font-family="Noto Sans, sans-serif" font-size="13.5" font-weight="700" fill="${PALETTE.blue}" text-anchor="middle">STABLE AIR · HORIZONTAL STRATIFORM SHEETS</text>
      <path d="M 195 228 Q 290 215 370 231 M 310 218 Q 430 208 550 225" fill="none" stroke="#6E8CA8" stroke-width="3" stroke-linecap="round" />
      <text x="387" y="252" font-family="Noto Sans, sans-serif" font-size="12" font-weight="600" fill="${PALETTE.inkMuted}" text-anchor="middle">High Cirrus (>6 km · Ice Crystals)</text>
      <rect x="190" y="320" width="390" height="32" rx="14" fill="#CBD9E6" stroke="#6C8299" stroke-width="1.5" />
      <text x="387" y="341" font-family="Noto Sans, sans-serif" font-size="12" font-weight="600" fill="${PALETTE.ink}" text-anchor="middle">Altostratus Sheet (2–6 km)</text>
      <rect x="180" y="454" width="415" height="44" rx="18" fill="#B6C6D6" stroke="#53687D" stroke-width="1.6" />
      <text x="387" y="481" font-family="Noto Sans, sans-serif" font-size="12.5" font-weight="700" fill="${PALETTE.ink}" text-anchor="middle">Nimbostratus / Stratus Deck (&lt;2 km)</text>
      ${rainDrops(220, 500, 320, 68, 10, 2)}

      ${cardBox({ x: 642, y: 162, w: 492, h: 422, fill: '#F7FAFC', stroke: PALETTE.emerald, strokeWidth: 1.3 })}
      <text x="888" y="190" font-family="Noto Sans, sans-serif" font-size="13.5" font-weight="700" fill="${PALETTE.emerald}" text-anchor="middle">UNSTABLE AIR · VERTICALLY PILED CUMULUS</text>
      ${anvilCumulonimbus(675, 204, 320, 315)}
      ${cloudShape(1025, 438, 0.72, '#FFFFFF', '#5C728A')}
      ${flowArrow(828, 535, 828, 295, PALETTE.rust, 2.8)}
      ${calloutTag(828, 566, 'Strong Convective Updraft', PALETTE.rust, '#FFFFFF', PALETTE.rust)}
      ${calloutTag(1025, 372, 'Fair-Weather Cumulus', PALETTE.slate, '#FFFFFF', PALETTE.slate)}
      ${keyTakeawayStrip([
        { label: 'Atmospheric Stability Control', detail: 'Stable layers spread air horizontally into flat sheets; buoyant instability piles cumulus towers aloft.', color: PALETTE.blue },
        { label: 'Liquid vs. Ice Regimes', detail: 'Low clouds carry liquid droplets; middle/high clouds hold supercooled drops or frozen ice crystals.', color: PALETTE.emerald },
        { label: 'Editorial Guardrail', detail: 'Observed piled clouds give natural context without equating Arabic "rukaman" to technical WMO taxonomy.', color: PALETTE.gold },
      ], 624)}
    `;

  // 4. Precipitation Microphysics: ATM-004 (growth pathways), ATM-025 (terminal velocity curve), ATM-005 (non-precipitating), ATM-033 (mixed-phase)
  } else if (kind === 'precipitation-coalescence' || kind === 'cloud-droplet-microphysics') {
    if (id === 'ATM-025') {
      // Gravitational Terminal Velocity Curve vs Updraft Suspension
      bodySvg = `
        ${cardBox({ x: 46, y: 142, w: 620, h: 458, fill: PALETTE.paperCard, stroke: PALETTE.blue, strokeWidth: 1.4, accentTop: PALETTE.blue })}
        <text x="356" y="162" font-family="Noto Sans, sans-serif" font-size="13.5" font-weight="700" fill="#FFFFFF" text-anchor="middle">PARTICLE SIZE VS. TERMINAL FALL SPEED (GRAVITY VS. UPDRAFT)</text>
        ${chartAxes({
          x: 120,
          y: 205,
          w: 495,
          h: 315,
          xLabel: 'Water Particle Radius / Regime (µm)',
          yLabel: 'Terminal Fall Speed (m/s)',
          xTicks: ['10 µm (Cloud)', '100 µm (Drizzle)', '500 µm (Drop)', '1000 µm (Rain)', '2.5 mm'],
          yTicks: ['0', '2', '4', '6', '8', '10 m/s'],
        })}
        <!-- Updraft threshold band -->
        <rect x="120" y="458" width="495" height="62" fill="${PALETTE.rust}" fill-opacity="0.14" />
        <line x1="120" y1="458" x2="615" y2="458" stroke="${PALETTE.rust}" stroke-width="1.8" stroke-dasharray="6 4" />
        <text x="606" y="502" font-family="Noto Sans, sans-serif" font-size="11.5" font-weight="700" fill="${PALETTE.rust}" text-anchor="end">Weak Updraft Band (~1.8 m/s · Droplets Stay Suspended)</text>
        <!-- Terminal Velocity Curve -->
        <path d="M 122 518 C 210 512, 275 495, 340 432 C 415 362, 505 282, 608 228" fill="none" stroke="${PALETTE.blue}" stroke-width="3.5" />
        <circle cx="340" cy="432" r="5" fill="${PALETTE.emerald}" />
        <circle cx="500" cy="295" r="6" fill="${PALETTE.blue}" />
        ${calloutTag(455, 258, 'Raindrop (~6.5–9 m/s overcomes updraft)', PALETTE.blue, '#FFFFFF', PALETTE.blue)}

        ${cardBox({ x: 688, y: 142, w: 466, h: 458, fill: PALETTE.paperCard, stroke: PALETTE.emerald, strokeWidth: 1.4, accentTop: PALETTE.emerald })}
        <text x="921" y="162" font-family="Noto Sans, sans-serif" font-size="13.5" font-weight="700" fill="#FFFFFF" text-anchor="middle">CONDENSATION ALOFT TO SURFACE RAIN</text>
        ${titledCard({ x: 710, y: 192, w: 422, h: 120, badge: '1. Suspension', title: 'Microscopic Droplets (~10–20 µm)', body: 'Terminal fall speed is ~0.01 m/s; even gentle 0.5 m/s updrafts keep clouds buoyantly suspended in the sky.', accent: PALETTE.slate })}
        ${titledCard({ x: 710, y: 326, w: 422, h: 120, badge: '2. Growth', title: 'Coalescence &amp; Ice Melting', body: 'When drops reach >0.5–2.0 mm, mass scales with r³ while drag rises more slowly, driving net downward acceleration.', accent: PALETTE.blue })}
        ${titledCard({ x: 710, y: 460, w: 422, h: 120, badge: '3. Descent', title: 'Sub-Cloud Humidity Matters', body: 'Raindrops survive descent only if air below the cloud base is moist enough to avoid virga evaporation.', accent: PALETTE.gold })}
        ${keyTakeawayStrip([
          { label: 'Gravitational Threshold', detail: finding, color: PALETTE.blue },
          { label: 'Physical Law Contrast', detail: 'Clouds float not because water is weightless, but because microscopic droplet drag matches rising air currents.', color: PALETTE.emerald },
        ], 624)}
      `;
    } else {
      const isMixed = id === 'ATM-033';
      const isNonPrecip = id === 'ATM-005';
      bodySvg = `
        ${cardBox({ x: 46, y: 142, w: 540, h: 458, fill: PALETTE.paperCard, stroke: PALETTE.blue, strokeWidth: 1.4, accentTop: PALETTE.blue })}
        <text x="316" y="162" font-family="Noto Sans, sans-serif" font-size="13.5" font-weight="700" fill="#FFFFFF" text-anchor="middle">${isMixed ? 'MIXED-PHASE CLOUD TEMPERATURE BANDS' : isNonPrecip ? 'CLOUD WATER FRACTION &amp; PRECIPITATION THRESHOLD' : 'PARTICLE VOLUME &amp; SCALE PROGRESSION'}</text>
        ${
          isMixed
            ? `
              <rect x="74" y="192" width="484" height="84" rx="5" fill="#DCEAF7" stroke="${PALETTE.blue}" />
              <text x="92" y="220" font-family="Noto Sans, sans-serif" font-size="13.5" font-weight="700" fill="${PALETTE.blue}">TOP ZONE (&lt; −40 °C): PURE ICE CRYSTALS</text>
              <text x="92" y="244" font-family="Noto Sans, sans-serif" font-size="12" fill="${PALETTE.ink}">Spontaneous homogeneous freezing produces wispy anvil cirrus crystals.</text>
              <rect x="74" y="288" width="484" height="104" rx="5" fill="#E6F2EE" stroke="${PALETTE.emerald}" />
              <text x="92" y="316" font-family="Noto Sans, sans-serif" font-size="13.5" font-weight="700" fill="${PALETTE.emerald}">MIXED-PHASE ZONE (0 °C to −40 °C)</text>
              <text x="92" y="340" font-family="Noto Sans, sans-serif" font-size="12" fill="${PALETTE.ink}">Ice crystals &amp; supercooled liquid droplets coexist together!</text>
              <text x="92" y="362" font-family="Noto Sans, sans-serif" font-size="12" fill="${PALETTE.inkMuted}">Bergeron-Findeisen vapor transfer rapidly grows snow/graupel.</text>
              <rect x="74" y="404" width="484" height="84" rx="5" fill="#F9F1DF" stroke="${PALETTE.ochre}" />
              <text x="92" y="432" font-family="Noto Sans, sans-serif" font-size="13.5" font-weight="700" fill="${PALETTE.ochre}">WARM BASE (&gt; 0 °C): LIQUID DROPLETS</text>
              <text x="92" y="456" font-family="Noto Sans, sans-serif" font-size="12" fill="${PALETTE.ink}">Falling ice crystals melt back into rain or sustain liquid collision-coalescence.</text>
            `
            : isNonPrecip
            ? `
              ${[
                { lbl: 'Fair-Weather Cumulus (~10 µm · Never Precipitates)', w: 22, note: 'Suspended', col: PALETTE.slate, y: 210 },
                { lbl: 'High Cirrus Wisps (Ice Crystals · Too Small to Reach Ground)', w: 34, note: 'Sublimates', col: PALETTE.cyan, y: 282 },
                { lbl: 'Virga Streaks (Falls &amp; Evaporates in Dry Sub-Cloud Air)', w: 58, note: 'Evaporates', col: PALETTE.ochre, y: 354 },
                { lbl: 'Deep Nimbostratus / Cumulonimbus (&gt;1,000 µm Drops)', w: 92, note: 'Reaches Soil', col: PALETTE.blue, y: 426 },
              ]
                .map(
                  (r) => `
                  <text x="74" y="${r.y}" font-family="Noto Sans, sans-serif" font-size="12" font-weight="700" fill="${PALETTE.ink}">${r.lbl}</text>
                  <rect x="74" y="${r.y + 8}" width="484" height="24" rx="4" fill="#EAE6DA" />
                  <rect x="74" y="${r.y + 8}" width="${(484 * r.w) / 100}" height="24" rx="4" fill="${r.col}" />
                  <text x="${r.w >= 70 ? 86 : 86 + (484 * r.w) / 100}" y="${r.y + 24}" font-family="Noto Sans, sans-serif" font-size="11" font-weight="700" fill="${r.w >= 70 ? '#FFFFFF' : r.col}">${r.note}</text>
                `
                )
                .join('')}
            `
            : `
              <circle cx="135" cy="304" r="4" fill="${PALETTE.rust}" />
              <text x="135" y="339" font-family="Noto Sans, sans-serif" font-size="12.5" font-weight="700" fill="${PALETTE.ink}" text-anchor="middle">CCN Aerosol</text>
              <text x="135" y="356" font-family="Noto Sans, sans-serif" font-size="11.5" fill="${PALETTE.inkMuted}" text-anchor="middle">~0.1 µm</text>
              ${flowArrow(162, 304, 222, 304, PALETTE.emerald, 2.2)}
              <circle cx="265" cy="304" r="16" fill="#DCEAF7" stroke="${PALETTE.blue}" stroke-width="2" />
              <text x="265" y="339" font-family="Noto Sans, sans-serif" font-size="12.5" font-weight="700" fill="${PALETTE.ink}" text-anchor="middle">Cloud Droplet</text>
              <text x="265" y="356" font-family="Noto Sans, sans-serif" font-size="11.5" fill="${PALETTE.inkMuted}" text-anchor="middle">~20 µm (1×)</text>
              ${flowArrow(298, 304, 368, 304, PALETTE.blue, 2.6)}
              <circle cx="465" cy="304" r="72" fill="#2B6CB0" fill-opacity="0.22" stroke="${PALETTE.blue}" stroke-width="2.5" />
              <circle cx="465" cy="304" r="16" fill="#2B6CB0" fill-opacity="0.45" />
              <text x="465" y="402" font-family="Noto Sans, sans-serif" font-size="13.5" font-weight="700" fill="${PALETTE.blue}" text-anchor="middle">Raindrop (~2,000 µm)</text>
              <text x="465" y="420" font-family="Noto Sans, sans-serif" font-size="12" fill="${PALETTE.inkMuted}" text-anchor="middle">≈ 1,000,000× droplet volume</text>
            `
        }
        <rect x="74" y="498" width="484" height="82" rx="6" fill="#F2EFE4" stroke="${PALETTE.border}" />
        ${renderSvgTextLines(wrapLines(isMixed ? 'High-altitude clouds and mid-latitude storms generate rain predominantly through cold mixed-phase ice crystal growth.' : 'Tiny 20 µm droplets fall slowly (<1 cm/s) and stay aloft or evaporate below cloud base unless coalescing to ~500–2,000 µm.', 62, 3), 92, 524, 18, { fontSize: 12.5, fill: PALETTE.ink })}

        ${cardBox({ x: 608, y: 142, w: 546, h: 458, fill: PALETTE.paperCard, stroke: PALETTE.emerald, strokeWidth: 1.4, accentTop: PALETTE.emerald })}
        <text x="881" y="162" font-family="Noto Sans, sans-serif" font-size="13.5" font-weight="700" fill="#FFFFFF" text-anchor="middle">${isNonPrecip ? 'NON-PRECIPITATING VS. RAIN-BEARING CLOUDS' : isMixed ? 'BERGERON VAPOR GROWTH MECHANISM' : 'WARM VS. COLD PRECIPITATION PATHWAYS'}</text>
        <rect x="632" y="190" width="498" height="175" rx="6" fill="#EDF4FA" stroke="${PALETTE.border}" />
        ${cloudShape(750, 254, 0.78, '#FFFFFF', '#78899B')}
        <text x="750" y="322" font-family="Noto Sans, sans-serif" font-size="12" font-weight="700" fill="${PALETTE.inkMuted}" text-anchor="middle">${isNonPrecip ? 'Fair-Weather Cloud (Virga Evaporates)' : 'Warm Cloud: Collision–Coalescence'}</text>
        ${curvedArrow('M 730 292 Q 750 306 770 292', PALETTE.rust, 1.8, true)}
        ${cloudShape(1005, 254, 0.85, '#CEDCEB', '#485E73', true)}
        ${rainDrops(955, 284, 100, 65, 5, 2)}
        <text x="1005" y="352" font-family="Noto Sans, sans-serif" font-size="12" font-weight="700" fill="${PALETTE.blue}" text-anchor="middle">${isMixed ? 'Cold Cloud: Ice Melts to Rain' : 'Terminal Fall &gt; Updraft Speed'}</text>
        ${titledCard({ x: 632, y: 382, w: 498, h: 95, title: isMixed ? 'Vapor Pressure Contrast' : 'Collision &amp; Coalescence', body: isMixed ? 'Lower saturation vapor pressure over ice crystals draws molecules away from nearby supercooled droplets.' : 'Larger collector drops fall faster, sweeping up slower droplets along their wake until gravity overcomes updrafts.', accent: PALETTE.blue })}
        ${titledCard({ x: 632, y: 488, w: 498, h: 95, title: 'Boundary &amp; Limitation', body: entry.limitations || 'Not every visible cloud precipitates; sub-cloud humidity and updraft strength govern ground rainfall.', accent: PALETTE.gold })}
        ${keyTakeawayStrip([
          { label: 'Observed Natural Reality', detail: finding, color: PALETTE.emerald },
          { label: 'Hydrologic Turnover', detail: 'Every cloud requires sustained lift, nuclei, and favorable humidity below base to deliver surface rain.', color: PALETTE.blue },
        ], 624)}
      `;
    }

  // 5. Lightning &amp; Thunder (ATM-013, ATM-014, ATM-015, ATM-016)
  } else if (kind === 'lightning-charge-separation' || kind === 'lightning-thunder-acoustics') {
    const isFlash = id === 'ATM-015';
    const isSeparate = id === 'ATM-016';
    const isThunder = id === 'ATM-013';
    bodySvg = `
      ${
        isThunder
          ? `
            ${cardBox({ x: 46, y: 142, w: 600, h: 456, fill: '#121E2D', stroke: PALETTE.gold, strokeWidth: 1.5, accentTop: PALETTE.slate })}
            <text x="346" y="162" font-family="Noto Sans, sans-serif" font-size="13.5" font-weight="700" fill="#FFFFFF" text-anchor="middle">LIGHTNING CHANNEL EXPLOSIVE THERMAL EXPANSION</text>
            <!-- Concentric cylindrical acoustic blast wavefronts -->
            <circle cx="245" cy="312" r="26" fill="#FDE68A" fill-opacity="0.35" stroke="#FDE68A" stroke-width="2" />
            <circle cx="245" cy="312" r="62" fill="none" stroke="#85C7F2" stroke-width="2.4" stroke-dasharray="5 3" />
            <circle cx="245" cy="312" r="98" fill="none" stroke="#85C7F2" stroke-width="1.8" stroke-dasharray="5 3" opacity="0.8" />
            <circle cx="245" cy="312" r="134" fill="none" stroke="#85C7F2" stroke-width="1.3" stroke-dasharray="5 3" opacity="0.55" />
            ${lightningBolt(245, 195, 245, 428, '#F7C948', 5)}
            ${calloutTag(485, 246, '~25,000 °C Ionized Plasma', '#121E2D', '#FDE68A', '#F7C948')}
            ${calloutTag(485, 316, '10–30 atm Overpressure Shock', '#FFFFFF', '#1E3A5F', '#85C7F2')}
            ${calloutTag(485, 386, 'Decays to ~343 m/s Acoustic Wave', '#FFFFFF', '#0D3B2E', PALETTE.emerald)}
            <!-- N-wave pressure waveform inset -->
            <rect x="74" y="468" width="544" height="110" rx="6" fill="#F9F6EE" stroke="${PALETTE.border}" />
            <text x="92" y="492" font-family="Noto Sans, sans-serif" font-size="12" font-weight="700" fill="${PALETTE.ink}">Acoustic N-Wave Pressure Signature (ms scale):</text>
            <line x1="96" y1="538" x2="594" y2="538" stroke="${PALETTE.border}" stroke-dasharray="4 3" />
            <path d="M 96 538 L 195 538 L 210 498 L 315 568 L 330 538 L 415 538 Q 445 516 475 552 Q 505 524 545 544 L 594 538" fill="none" stroke="${PALETTE.rust}" stroke-width="2.8" />
          `
          : isFlash
          ? `
            ${cardBox({ x: 46, y: 142, w: 600, h: 456, fill: '#0E1726', stroke: PALETTE.gold, strokeWidth: 1.5, accentTop: PALETTE.ochre })}
            <text x="346" y="162" font-family="Noto Sans, sans-serif" font-size="13.5" font-weight="700" fill="#FFFFFF" text-anchor="middle">OPTICAL LUMINANCE VS. NIGHT-ADAPTED VISION</text>
            <!-- Logarithmic illuminance bar comparison -->
            <rect x="72" y="196" width="548" height="222" rx="6" fill="#FAF6EC" stroke="${PALETTE.border}" />
            <text x="92" y="222" font-family="Noto Sans, sans-serif" font-size="12.5" font-weight="700" fill="${PALETTE.ink}">Logarithmic Optical Intensity Comparison (Photometric Scale):</text>
            <text x="92" y="256" font-family="Noto Sans, sans-serif" font-size="12" font-weight="600" fill="${PALETTE.inkMuted}">Storm Night Background (~0.01 lx)</text>
            <rect x="92" y="264" width="28" height="16" rx="3" fill="${PALETTE.slate}" />
            <text x="92" y="306" font-family="Noto Sans, sans-serif" font-size="12" font-weight="600" fill="${PALETTE.inkMuted}">Indoor Reading Light (~400 lx)</text>
            <rect x="92" y="314" width="165" height="16" rx="3" fill="${PALETTE.blue}" />
            <text x="92" y="356" font-family="Noto Sans, sans-serif" font-size="12" font-weight="700" fill="${PALETTE.rust}">Close Lightning Return Stroke (&gt;10⁶ cd/m² Peak Radiance)</text>
            <rect x="92" y="364" width="495" height="22" rx="3" fill="#E3A420" stroke="${PALETTE.rust}" />
            <!-- Pupil constriction & rhodopsin bleaching panel -->
            <rect x="72" y="434" width="548" height="142" rx="6" fill="#18263B" stroke="#F7C948" />
            <circle cx="155" cy="505" r="38" fill="#DFC99B" stroke="#9E7828" stroke-width="2" />
            <circle cx="155" cy="505" r="24" fill="#0B131E" />
            <text x="155" y="560" font-family="Noto Sans, sans-serif" font-size="11" font-weight="700" fill="#DFC99B" text-anchor="middle">Dark-Adapted Pupil</text>
            ${flowArrow(208, 505, 290, 505, '#F5C451', 3)}
            <circle cx="348" cy="505" r="38" fill="#DFC99B" stroke="#9E7828" stroke-width="2" />
            <circle cx="348" cy="505" r="8" fill="#0B131E" />
            <text x="348" y="560" font-family="Noto Sans, sans-serif" font-size="11" font-weight="700" fill="#FDE68A" text-anchor="middle">Flash Bleach (~1 ms)</text>
            <text x="415" y="492" font-family="Noto Sans, sans-serif" font-size="12" font-weight="700" fill="#FFFFFF">Temporary Afterimage</text>
            <text x="415" y="514" font-family="Noto Sans, sans-serif" font-size="11.5" fill="#CBD5E1">Photopigments recover within seconds;</text>
            <text x="415" y="532" font-family="Noto Sans, sans-serif" font-size="11.5" fill="#CBD5E1">rapid pupillary reflex protects retina.</text>
          `
          : `
            <rect x="46" y="142" width="600" height="456" rx="8" fill="#172436" stroke="${PALETTE.gold}" stroke-width="1.5" />
            <rect x="46" y="548" width="600" height="50" fill="#28362B" />
            <text x="346" y="578" font-family="Noto Sans, sans-serif" font-size="12.5" font-weight="700" fill="#DFC99B" text-anchor="middle">GROUND SURFACE (INDUCED + CHARGE UNDER STORM)</text>
            ${anvilCumulonimbus(85, 166, 520, 290)}
            <text x="320" y="218" font-family="Noto Sans, sans-serif" font-size="17" font-weight="800" fill="#9E422B" text-anchor="middle">+ + + UPPER ICE ANVIL (+)</text>
            <text x="320" y="390" font-family="Noto Sans, sans-serif" font-size="17" font-weight="800" fill="#1B7F8E" text-anchor="middle">− − − MID-LEVEL GRAUPEL (−)</text>
            ${lightningBolt(305, 408, 295, 548, '#F7C948', 4.5)}
            ${
              isSeparate
                ? `<circle cx="300" cy="476" r="34" fill="none" stroke="#85C7F2" stroke-width="1.8" stroke-dasharray="4 3" />
                   <circle cx="300" cy="476" r="64" fill="none" stroke="#85C7F2" stroke-width="1.5" stroke-dasharray="4 3" opacity="0.75" />
                   <text x="415" y="472" font-family="Noto Sans, sans-serif" font-size="12" font-weight="700" fill="#85C7F2">Acoustic Wavefront (~343 m/s)</text>`
                : `<text x="412" y="472" font-family="Noto Sans, sans-serif" font-size="12" font-weight="700" fill="#FDE68A">~20,000–30,000 °C Ionized Channel</text>`
            }
            <circle cx="535" cy="524" r="7" fill="#DFC99B" />
            <line x1="535" y1="531" x2="535" y2="548" stroke="#DFC99B" stroke-width="2.5" />
            <text x="535" y="507" font-family="Noto Sans, sans-serif" font-size="11.5" font-weight="600" fill="#FFFFFF" text-anchor="middle">Observer</text>
          `
      }

      ${cardBox({ x: 668, y: 142, w: 486, h: 456, fill: PALETTE.paperCard, stroke: PALETTE.gold, strokeWidth: 1.4, accentTop: PALETTE.emerald })}
      <text x="911" y="162" font-family="Noto Sans, sans-serif" font-size="13.5" font-weight="700" fill="#FFFFFF" text-anchor="middle">${
        isFlash
          ? 'OPTICAL BRIGHTNESS &amp; RETINAL RECOVERY'
          : isSeparate
          ? 'ONE DISCHARGE · TWO ARRIVAL SPEEDS'
          : isThunder
          ? 'SUPERSONIC EXPANSION PHYSICS OF THUNDER'
          : 'CHARGE SEPARATION &amp; DIELECTRIC BREAKDOWN'
      }</text>
      ${
        isSeparate
          ? `
            ${chartAxes({
              x: 735,
              y: 205,
              w: 390,
              h: 225,
              xLabel: 'Distance from Lightning Strike (km)',
              yLabel: 'Arrival Delay (sec)',
              xTicks: ['0 km', '1 km', '2 km', '3 km', '5 km'],
              yTicks: ['0s', '5s', '10s', '15s'],
            })}
            <line x1="735" y1="428" x2="1125" y2="428" stroke="${PALETTE.ochre}" stroke-width="3" />
            <text x="930" y="416" font-family="Noto Sans, sans-serif" font-size="11.5" font-weight="700" fill="${PALETTE.ochre}" text-anchor="middle">Optical Flash (~3×10⁸ m/s · ~0.00001 s)</text>
            <line x1="735" y1="430" x2="1125" y2="215" stroke="${PALETTE.blue}" stroke-width="3" />
            <text x="920" y="290" font-family="Noto Sans, sans-serif" font-size="11.5" font-weight="700" fill="${PALETTE.blue}" transform="rotate(-28 920 290)">Sound Wave (~343 m/s · ~3 s per km)</text>
            ${titledCard({ x: 690, y: 485, w: 442, h: 98, title: 'Unified Cause, Divergent Propagation', body: 'One electrical channel emits both light and acoustic compression; the 10⁶× velocity ratio explains the flash-to-bang lag.', accent: PALETTE.emerald })}
          `
          : `
            ${titledCard({ x: 690, y: 190, w: 442, h: 118, badge: 'Step 01 · Mechanism', title: 'Ice Crystal &amp; Graupel Charge Partitioning', body: 'Colliding updraft ice crystals carry positive charge aloft while falling graupel concentrates negative charge mid-cloud.', accent: PALETTE.blue })}
            ${titledCard({ x: 690, y: 322, w: 442, h: 122, badge: isFlash ? 'Step 02 · Luminance' : 'Step 02 · Breakdown', title: isFlash ? 'Extreme Contrast &amp; Afterimages' : '~20,000–30,000 °C Rapid Channel Heating', body: isFlash ? 'Intense narrow-millisecond optical emission against dark storm clouds triggers temporary photoreceptor bleaching, not permanent damage.' : 'Air around the ionized leader heats 5× hotter than the Sun’s photosphere in microseconds.', accent: PALETTE.ochre })}
            ${titledCard({ x: 690, y: 458, w: 442, h: 122, badge: isThunder ? 'Step 03 · Shockwave' : 'Step 03 · Observation', title: isThunder ? 'Explosive Pressure Expansion (Thunder)' : 'Acoustic Propagation &amp; Distance', body: 'Overpressurized plasma snaps outward as a shockwave decaying into audible thunder (~343 m/s).', accent: PALETTE.rust })}
          `
      }
      ${keyTakeawayStrip([
        { label: 'Physical Evidence', detail: finding, color: PALETTE.emerald },
        { label: 'Verification Context', detail: 'Tafsir &amp; atmospheric physics agree thunderstorms involve coupled electrical and acoustic energy releases.', color: PALETTE.gold },
      ], 624)}
    `;

  // 6. Hail &amp; Severe Storms (ATM-017, ATM-018, ATM-019, ATM-020, ATM-021, ATM-022, ATM-049)
  } else if (kind === 'hail-updraft-growth' || kind === 'cumulonimbus-storm-cell' || kind === 'thunderstorm-lifecycle-hazards' || kind === 'severe-wind-storms') {
    if (kind === 'hail-updraft-growth' || kind === 'cumulonimbus-storm-cell') {
      const isAnvilFocus = id === 'ATM-018';
      bodySvg = isAnvilFocus
        ? `
          <rect x="46" y="142" width="1108" height="456" rx="8" fill="#EDF3F8" stroke="${PALETTE.border}" stroke-width="1.2" />
          ${cardBox({ x: 68, y: 162, w: 612, h: 416, fill: PALETTE.paperCard, stroke: PALETTE.slate, strokeWidth: 1.3, accentTop: PALETTE.slate })}
          <text x="374" y="182" font-family="Noto Sans, sans-serif" font-size="13.5" font-weight="700" fill="#FFFFFF" text-anchor="middle">TROPOSPHERIC ALTITUDE PROFILE OF CUMULONIMBUS (0–18 KM)</text>
          <rect x="92" y="205" width="564" height="72" rx="5" fill="#E3EDF7" stroke="${PALETTE.blue}" />
          <text x="112" y="232" font-family="Noto Sans, sans-serif" font-size="12.5" font-weight="700" fill="${PALETTE.blue}">12–18 km · Tropopause Anvil Plateau (~−55 °C Ice Cirrus)</text>
          <text x="112" y="256" font-family="Noto Sans, sans-serif" font-size="11.5" fill="${PALETTE.inkMuted}">Buoyant plume hits stable stratosphere and spreads horizontally ~50–150 km.</text>
          <rect x="92" y="289" width="564" height="78" rx="5" fill="#E8F3F0" stroke="${PALETTE.emerald}" />
          <text x="112" y="316" font-family="Noto Sans, sans-serif" font-size="12.5" font-weight="700" fill="${PALETTE.emerald}">4–12 km · Mixed-Phase Updraft Core (0 °C to −40 °C)</text>
          <text x="112" y="340" font-family="Noto Sans, sans-serif" font-size="11.5" fill="${PALETTE.inkMuted}">Charge separation triggers lightning; strong updrafts grow graupel/hail conditionally.</text>
          <rect x="92" y="379" width="564" height="78" rx="5" fill="#F9F2E2" stroke="${PALETTE.ochre}" />
          <text x="112" y="406" font-family="Noto Sans, sans-serif" font-size="12.5" font-weight="700" fill="${PALETTE.ochre}">1–4 km · Lifted Condensation Level (LCL) &amp; Rain Shaft</text>
          <text x="112" y="430" font-family="Noto Sans, sans-serif" font-size="11.5" fill="${PALETTE.inkMuted}">Warm moist surface boundary air condenses into flat dark convective base.</text>
          <rect x="92" y="469" width="564" height="86" rx="5" fill="#F6EBE8" stroke="${PALETTE.rust}" />
          <text x="112" y="496" font-family="Noto Sans, sans-serif" font-size="12.5" font-weight="700" fill="${PALETTE.rust}">0–1 km · Surface Inflow &amp; Cold-Pool Outflow Gust Front</text>
          <text x="112" y="520" font-family="Noto Sans, sans-serif" font-size="11.5" fill="${PALETTE.inkMuted}">Downdrafts spread cool air ahead of storm, lifting fresh warm air upward.</text>

          ${cardBox({ x: 700, y: 162, w: 432, h: 416, fill: PALETTE.paperCard, stroke: PALETTE.blue, strokeWidth: 1.3 })}
          <text x="916" y="192" font-family="Noto Sans, sans-serif" font-size="14" font-weight="700" fill="${PALETTE.emerald}" text-anchor="middle">DEEP CUMULONIMBUS VERTICAL EXTENT</text>
          ${titledCard({ x: 722, y: 214, w: 388, h: 108, title: 'Tropopause Anvil (~12–18 km)', body: 'Rising air hits stable stratospheric inversion and spreads horizontally into an anvil plateau resembling towering cloud mountains.', accent: PALETTE.slate })}
          ${titledCard({ x: 722, y: 334, w: 388, h: 108, title: 'Conditional Hail Formation', body: 'Many deep convective clouds generate rain and lightning only; large hail develops specifically inside vigorous supercell/multicell updrafts.', accent: PALETTE.blue })}
          ${titledCard({ x: 722, y: 454, w: 388, h: 108, title: 'Rhetorical &amp; Scientific Balance', body: 'Verse imagery (“mountains with hail”) captures visual scale without equating storm clouds to geological rock.', accent: PALETTE.gold })}
          ${keyTakeawayStrip([
            { label: 'Convective Intensity', detail: 'Hailstones form only inside strong storm updrafts containing supercooled liquid water.', color: PALETTE.rust },
            { label: 'Scientific Evidence Finding', detail: finding, color: PALETTE.gold },
          ], 624)}
        `
        : `
        <rect x="46" y="142" width="1108" height="456" rx="8" fill="#EDF3F8" stroke="${PALETTE.border}" stroke-width="1.2" />
        ${anvilCumulonimbus(80, 158, 580, 395)}
        <line x1="72" y1="364" x2="680" y2="364" stroke="${PALETTE.blue}" stroke-width="1.8" stroke-dasharray="6 4" />
        <text x="90" y="356" font-family="Noto Sans, sans-serif" font-size="12" font-weight="700" fill="${PALETTE.blue}">0 °C Freezing Level (~3.5–4.5 km)</text>
        ${curvedArrow('M 290 524 Q 320 354 370 234', PALETTE.rust, 3.2)}
        ${curvedArrow('M 390 229 Q 455 314 420 404', PALETTE.blue, 2.8, true)}
        ${curvedArrow('M 405 409 Q 355 349 365 259', PALETTE.rust, 2.6, true)}
        ${curvedArrow('M 465 394 L 505 554', PALETTE.blue, 3.2)}
        <circle cx="512" cy="564" r="14" fill="#FFFFFF" stroke="${PALETTE.blue}" stroke-width="2" />
        <circle cx="512" cy="564" r="9" fill="none" stroke="#9AB8D4" stroke-width="1.2" />
        <text x="536" y="569" font-family="Noto Sans, sans-serif" font-size="12" font-weight="700" fill="${PALETTE.ink}">Layered Hailstone</text>
        ${calloutTag(230, 448, 'Updraft > 20–35 m/s', PALETTE.rust, '#FFFFFF', PALETTE.rust)}
        ${calloutTag(390, 204, 'Supercooled (−10 to −25 °C) Zone', PALETTE.blue, '#FFFFFF', PALETTE.blue)}

        ${cardBox({ x: 700, y: 162, w: 432, h: 416, fill: PALETTE.paperCard, stroke: PALETTE.blue, strokeWidth: 1.3 })}
        <text x="916" y="192" font-family="Noto Sans, sans-serif" font-size="14" font-weight="700" fill="${PALETTE.blue}" text-anchor="middle">HAILSTONE ONION-SHELL CROSS-SECTION</text>
        <circle cx="916" cy="298" r="80" fill="#E6F1FA" stroke="${PALETTE.blue}" stroke-width="2" />
        <circle cx="916" cy="298" r="58" fill="#CFE2F4" stroke="#5A89B8" stroke-width="1.5" stroke-dasharray="4 3" />
        <circle cx="916" cy="298" r="36" fill="#F8FCFF" stroke="#46729E" stroke-width="1.5" />
        <circle cx="916" cy="298" r="14" fill="#A5C4E0" />
        <text x="916" y="398" font-family="Noto Sans, sans-serif" font-size="12" font-weight="600" fill="${PALETTE.ink}" text-anchor="middle">Clear (wet) &amp; opaque (dry) ice layers record updraft cycles</text>
        ${titledCard({ x: 722, y: 422, w: 388, h: 136, title: 'Gravity Exceeds Updraft Support', body: 'Each cycle through supercooled water adds ice shells until stone mass overcomes vertical wind force.', accent: PALETTE.emerald })}
        ${keyTakeawayStrip([
          { label: 'Convective Intensity', detail: 'Hailstones form only inside strong storm updrafts containing supercooled liquid water.', color: PALETTE.rust },
          { label: 'Scientific Evidence Finding', detail: finding, color: PALETTE.gold },
        ], 624)}
      `;
    } else if (kind === 'severe-wind-storms') {
      const mode = id === 'ATM-021' ? 'duration' : id === 'ATM-022' ? 'aeolian' : 'mechanisms';
      if (mode === 'duration') {
        // ATM-021: Synoptic High-Low Isobar Map & Sustained Barometric Gradient
        bodySvg = `
          ${cardBox({ x: 46, y: 142, w: 610, h: 456, fill: '#EBF3F8', stroke: PALETTE.blue, strokeWidth: 1.4, accentTop: PALETTE.blue })}
          <text x="351" y="162" font-family="Noto Sans, sans-serif" font-size="13.5" font-weight="700" fill="#FFFFFF" text-anchor="middle">SYNOPTIC HIGH–LOW ISOBAR PRESSURE GRADIENT</text>
          <ellipse cx="215" cy="355" rx="130" ry="118" fill="none" stroke="${PALETTE.rust}" stroke-width="2.2" />
          <ellipse cx="215" cy="355" rx="88" ry="80" fill="none" stroke="${PALETTE.rust}" stroke-width="1.8" stroke-dasharray="4 3" />
          <circle cx="215" cy="355" r="38" fill="${PALETTE.rustLight}" stroke="${PALETTE.rust}" stroke-width="2" />
          <text x="215" y="353" font-family="Noto Sans, sans-serif" font-size="22" font-weight="800" fill="${PALETTE.rust}" text-anchor="middle">L</text>
          <text x="215" y="372" font-family="Noto Sans, sans-serif" font-size="11" font-weight="700" fill="${PALETTE.rust}" text-anchor="middle">972 hPa</text>
          <ellipse cx="485" cy="355" rx="120" ry="110" fill="none" stroke="${PALETTE.blue}" stroke-width="2.2" />
          <circle cx="485" cy="355" r="42" fill="${PALETTE.blueLight}" stroke="${PALETTE.blue}" stroke-width="2" />
          <text x="485" y="353" font-family="Noto Sans, sans-serif" font-size="22" font-weight="800" fill="${PALETTE.blue}" text-anchor="middle">H</text>
          <text x="485" y="372" font-family="Noto Sans, sans-serif" font-size="11" font-weight="700" fill="${PALETTE.blue}" text-anchor="middle">1034 hPa</text>
          ${flowArrow(430, 305, 285, 305, PALETTE.emerald, 3)}
          ${flowArrow(430, 355, 285, 355, PALETTE.emerald, 3.4)}
          ${flowArrow(430, 405, 285, 405, PALETTE.emerald, 3)}
          ${calloutTag(351, 212, 'Persistent Blocking Holds Steep Pressure Gradient Days', PALETTE.slate, '#FFFFFF', PALETTE.slate)}
          <rect x="74" y="492" width="554" height="86" rx="5" fill="${PALETTE.paperCard}" stroke="${PALETTE.border}" />
          ${renderSvgTextLines(wrapLines('Unlike brief convective gusts (~30 min), blocking highs and stalled extratropical cyclones sustain high wind stress for 2–7 consecutive days.', 68, 3), 92, 520, 18, { fontSize: 12.5, fill: PALETTE.ink })}

          ${cardBox({ x: 678, y: 142, w: 476, h: 456, fill: PALETTE.paperCard, stroke: PALETTE.gold, strokeWidth: 1.4, accentTop: PALETTE.slate })}
          <text x="916" y="162" font-family="Noto Sans, sans-serif" font-size="13.5" font-weight="700" fill="#FFFFFF" text-anchor="middle">DURATION, SCALE &amp; HISTORICAL DISTINCTION</text>
          ${titledCard({ x: 700, y: 192, w: 432, h: 120, title: 'Sustained Synoptic Gales', body: 'Continuous wind fields depend on planetary Rossby wave blocking and slow frontal progression across hundreds of kilometers.', accent: PALETTE.blue })}
          ${titledCard({ x: 700, y: 326, w: 432, h: 120, title: 'Cumulative Stress Fatigue', body: 'Extended multi-day wind loading accelerates tree uprooting, wave surge, and structural fatigue beyond peak-gust estimates.', accent: PALETTE.rust })}
          ${titledCard({ x: 700, y: 460, w: 432, h: 120, title: 'Editorial Distinction', body: entry.limitations || 'Historical multi-day storms remain outside empirical meteorology without retrofitting modern storm labels.', accent: PALETTE.gold })}
          ${keyTakeawayStrip([
            { label: 'Atmospheric Energetics', detail: finding, color: PALETTE.rust },
            { label: 'Historical Distinction', detail: 'Meteorology explains sustained storm physics without assigning empirical mechanisms to historical theological narratives.', color: PALETTE.gold },
          ], 624)}
        `;
      } else if (mode === 'aeolian') {
        // ATM-022: Aeolian Saltation, Creep & Dust Suspension Cross-Section
        bodySvg = `
          ${cardBox({ x: 46, y: 142, w: 610, h: 456, fill: '#F9F3E6', stroke: PALETTE.ochre, strokeWidth: 1.4, accentTop: PALETTE.ochre })}
          <text x="351" y="162" font-family="Noto Sans, sans-serif" font-size="13.5" font-weight="700" fill="#FFFFFF" text-anchor="middle">AEOLIAN SAND SALTATION &amp; MINERAL DUST PLUMES</text>
          <rect x="70" y="458" width="562" height="118" fill="#C7A778" stroke="#8C6D46" />
          <text x="351" y="544" font-family="Noto Sans, sans-serif" font-size="13" font-weight="700" fill="#3B2C1A" text-anchor="middle">ARID SURFACE &amp; UNANCHORED TOPSOIL</text>
          ${flowArrow(96, 250, 585, 250, PALETTE.rust, 3.5)}
          ${calloutTag(275, 228, 'High-Velocity Dry Wind Shear', PALETTE.rust, '#FFFFFF', PALETTE.rust)}
          <!-- Suspension plume (<20 um) -->
          <path d="M 135 415 Q 290 292 595 274" fill="none" stroke="${PALETTE.ochre}" stroke-width="2.5" stroke-dasharray="5 3" />
          <text x="415" y="295" font-family="Noto Sans, sans-serif" font-size="12" font-weight="700" fill="${PALETTE.ochre}">Fine Dust Suspension (&lt;20 µm · km aloft)</text>
          <!-- Saltation hopping sand grains -->
          <path d="M 110 458 Q 165 378 220 458 Q 280 375 340 458 Q 405 382 470 458 Q 525 388 575 458" fill="none" stroke="#8C5A2B" stroke-width="2.4" />
          <text x="340" y="380" font-family="Noto Sans, sans-serif" font-size="12" font-weight="700" fill="#70441A" text-anchor="middle">Saltating Sand Grains (70–500 µm hopping hops)</text>
          <text x="340" y="492" font-family="Noto Sans, sans-serif" font-size="12" font-weight="600" fill="#4A3219" text-anchor="middle">Surface Creep (&gt;500 µm rolling particles)</text>

          ${cardBox({ x: 678, y: 142, w: 476, h: 456, fill: PALETTE.paperCard, stroke: PALETTE.gold, strokeWidth: 1.4, accentTop: PALETTE.rust })}
          <text x="916" y="162" font-family="Noto Sans, sans-serif" font-size="13.5" font-weight="700" fill="#FFFFFF" text-anchor="middle">EROSIVE REGIMES &amp; NON-UNIQUE ORIGINS</text>
          ${titledCard({ x: 700, y: 192, w: 432, h: 120, title: 'Aeolian Abrasion &amp; Deflation', body: 'Saltating sand grains act like sandpaper along dry ground, stripping fertile topsoil and sculpting desert dunes.', accent: PALETTE.ochre })}
          ${titledCard({ x: 700, y: 326, w: 432, h: 120, title: 'Diverse Meteorological Causes', body: 'Severe winds span haboob thunderstorm outflows, synoptic cyclones, katabatic gusts, and supercell downbursts.', accent: PALETTE.blue })}
          ${titledCard({ x: 700, y: 460, w: 432, h: 120, title: 'Scholarly Caution', body: entry.limitations || 'Narratives should not be collapsed into one modern meteorological storm class without explicit evidence.', accent: PALETTE.gold })}
          ${keyTakeawayStrip([
            { label: 'Atmospheric Energetics', detail: finding, color: PALETTE.rust },
            { label: 'Historical Distinction', detail: 'Extreme wind physics identifies multiple transport regimes without claiming historical classification.', color: PALETTE.gold },
          ], 624)}
        `;
      } else {
        bodySvg = `
          <rect x="46" y="142" width="1108" height="456" rx="8" fill="#EDF3F8" stroke="${PALETTE.border}" stroke-width="1.2" />
          ${titledCard({ x: 72, y: 166, w: 334, h: 220, badge: 'Hazard 01', title: 'Convective Downburst', body: 'Rain-cooled downdrafts strike terrain and flare outward in damaging straight-line gust fronts.', accent: PALETTE.blue })}
          ${titledCard({ x: 432, y: 166, w: 334, h: 220, badge: 'Hazard 02', title: 'Tornadic Supercell Vortex', body: 'Vertical wind shear tilts horizontal spin upward into tightly wound high-velocity columns.', accent: PALETTE.rust })}
          ${titledCard({ x: 792, y: 166, w: 334, h: 220, badge: 'Fluid Law', title: 'Wind Force Scales With Velocity²', body: 'Doubling wind speed quadruples dynamic aerodynamic pressure (F ∝ v²), escalating structural and vegetation damage.', accent: PALETTE.ochre })}
          <rect x="72" y="406" width="1054" height="172" rx="6" fill="${PALETTE.paperCard}" stroke="${PALETTE.border}" />
          <text x="94" y="432" font-family="Noto Sans, sans-serif" font-size="13" font-weight="700" fill="${PALETTE.slate}">BEAUFORT WIND FORCE &amp; KINETIC ENERGY SCALING</text>
          ${flowArrow(96, 484, 290, 484, PALETTE.emerald, 2)}
          <text x="190" y="516" font-family="Noto Sans, sans-serif" font-size="12" font-weight="600" fill="${PALETTE.ink}" text-anchor="middle">Moderate Breeze (~20 km/h)</text>
          ${flowArrow(340, 484, 620, 484, PALETTE.ochre, 3.2)}
          <text x="480" y="516" font-family="Noto Sans, sans-serif" font-size="12" font-weight="600" fill="${PALETTE.ink}" text-anchor="middle">Sustained Gale (~70 km/h · 12× load)</text>
          ${flowArrow(670, 484, 1070, 484, PALETTE.rust, 4.5)}
          <text x="870" y="516" font-family="Noto Sans, sans-serif" font-size="12" font-weight="700" fill="${PALETTE.rust}" text-anchor="middle">Violent Storm (&gt;120 km/h · Severe Structural Load)</text>
          <text x="94" y="556" font-family="Noto Sans, sans-serif" font-size="12" fill="${PALETTE.inkMuted}">${escXml(entry.limitations || 'Historical events lie outside empirical meteorology; modern physics identifies multiple windstorm causes.')}</text>
          ${keyTakeawayStrip([
            { label: 'Atmospheric Energetics', detail: finding, color: PALETTE.rust },
            { label: 'Historical Distinction', detail: 'Meteorology explains physical storm origins without assigning empirical mechanism to historical accounts.', color: PALETTE.gold },
          ], 624)}
        `;
      }
    } else {
      const isRisk = id === 'ATM-049';
      bodySvg = isRisk
        ? `
          ${cardBox({ x: 46, y: 142, w: 620, h: 456, fill: '#F8F4EE', stroke: PALETTE.rust, strokeWidth: 1.4, accentTop: PALETTE.rust })}
          <text x="356" y="162" font-family="Noto Sans, sans-serif" font-size="13.5" font-weight="700" fill="#FFFFFF" text-anchor="middle">SURFACE HAZARD ZONES OF SEVERE CONVECTIVE CELLS</text>
          ${titledCard({ x: 74, y: 192, w: 270, h: 175, badge: '1. Straight-Line Wind', title: 'Downburst Gust Front (&gt;90 km/h)', body: 'Rain-cooled air hits terrain and surges radially outward ahead of precipitation.', accent: PALETTE.ochre })}
          ${titledCard({ x: 368, y: 192, w: 270, h: 175, badge: '2. Electrical Hazard', title: 'Cloud-to-Ground Lightning Zone', body: 'Strikes precede and trail heavy rain shafts across exposed ridges, water &amp; trees.', accent: PALETTE.rust })}
          ${titledCard({ x: 74, y: 386, w: 270, h: 175, badge: '3. Ice Impact Core', title: 'Localized Severe Hail Swath', body: 'Dense ice shafts strip crops, fracture glass, and pose trauma risks outdoors.', accent: PALETTE.blue })}
          ${titledCard({ x: 368, y: 386, w: 270, h: 175, badge: '4. Hydrologic Surge', title: 'Wadi &amp; Basin Flash Flooding', body: 'Intense >50 mm/hr downpours overwhelm arid drainage channels within minutes.', accent: PALETTE.cyan })}

          ${cardBox({ x: 688, y: 142, w: 466, h: 456, fill: PALETTE.paperCard, stroke: PALETTE.emerald, strokeWidth: 1.4, accentTop: PALETTE.emerald })}
          <text x="921" y="162" font-family="Noto Sans, sans-serif" font-size="13.5" font-weight="700" fill="#FFFFFF" text-anchor="middle">RISK REDUCTION &amp; FORECAST RESPONSE</text>
          ${titledCard({ x: 710, y: 192, w: 422, h: 120, title: entry.scientific_topic, body: finding, accent: PALETTE.rust })}
          ${titledCard({ x: 710, y: 326, w: 422, h: 120, title: 'Doppler Radar &amp; Early Warning', body: 'Mesocyclone rotation signatures, lightning networks, and rain gauges add critical lead time.', accent: PALETTE.blue })}
          ${titledCard({ x: 710, y: 460, w: 422, h: 120, title: 'Protective Mitigation', body: 'Grounded buildings, flash-flood barriers, and avoiding dry riverbeds lower fatalities drastically.', accent: PALETTE.emerald })}
          ${keyTakeawayStrip([
            { label: 'Surface Vulnerability', detail: finding, color: PALETTE.rust },
            { label: 'Protective Response', detail: 'Early warning, watershed drainage, and enclosed shelter sharply lower weather casualties.', color: PALETTE.emerald },
          ], 624)}
        `
        : `
        <rect x="46" y="142" width="1108" height="456" rx="8" fill="#EDF3F8" stroke="${PALETTE.border}" stroke-width="1.2" />
        ${[
          { x: 72, title: '1. Cumulus Updraft Stage', sub: 'Warm humid air rises buoyantly without rain.', color: PALETTE.emerald, rain: false },
          { x: 432, title: '2. Mature Cell (Peak Hazards)', sub: 'Coexisting updrafts + downdrafts produce thunder &amp; rain.', color: PALETTE.rust, rain: true },
          { x: 792, title: '3. Dissipating Anvil Stage', sub: 'Downdraft cuts warm inflow (~30–60 min lifetime).', color: PALETTE.slate, rain: false },
        ]
          .map(
            (st) => `
            ${cardBox({ x: st.x, y: 164, w: 334, h: 414, fill: PALETTE.paperCard, stroke: st.color, strokeWidth: 1.4, accentTop: st.color })}
            <text x="${st.x + 167}" y="184" font-family="Noto Sans, sans-serif" font-size="12.5" font-weight="700" fill="#FFFFFF" text-anchor="middle">${escXml(st.title)}</text>
            ${cloudShape(st.x + 167, 294, 0.95, st.rain ? '#D5E0EC' : '#F4F8FB', st.color, st.rain)}
            ${st.rain ? rainDrops(st.x + 100, 324, 130, 120, 6, 3) + lightningBolt(st.x + 210, 319, st.x + 205, 429, '#E3A420', 3) : ''}
            ${flowArrow(st.x + 120, 429, st.x + 120, 334, PALETTE.rust, 2.5)}
            ${st.rain ? flowArrow(st.x + 215, 334, st.x + 215, 434, PALETTE.blue, 2.5) : ''}
            <rect x="${st.x + 18}" y="468" width="298" height="90" rx="4" fill="#F4F0E5" />
            ${renderSvgTextLines(wrapLines(st.sub, 38, 4), st.x + 28, 492, 18, { fontSize: 12.5, fill: PALETTE.ink })}
          `
          )
          .join('')}
        ${keyTakeawayStrip([
          { label: 'Acute Weather Awareness', detail: finding, color: PALETTE.rust },
          { label: 'Protective Response', detail: 'Early warning, watershed drainage, and enclosed shelter sharply lower weather casualties.', color: PALETTE.emerald },
        ], 624)}
      `;
    }

  // 7. Atmosphere Shield, Energy Balance &amp; Thermal Shelter (ATM-035, 036, 038, 039, 040, 041)
  } else if (kind === 'atmosphere-layers-uv-protection' || kind === 'cloud-radiative-energy-balance' || kind === 'thermal-shelter-radiation') {
    const isThermalProfile = id === 'ATM-036';
    const isRadiative = kind === 'cloud-radiative-energy-balance';
    const isShelter = kind === 'thermal-shelter-radiation';
    if (isThermalProfile) {
      // ATM-036: Temperature Profile Chart across Atmosphere Layers! (distinct from ATM-035)
      bodySvg = `
        ${cardBox({ x: 46, y: 142, w: 620, h: 456, fill: PALETTE.paperCard, stroke: PALETTE.blue, strokeWidth: 1.4, accentTop: PALETTE.blue })}
        <text x="356" y="162" font-family="Noto Sans, sans-serif" font-size="13.5" font-weight="700" fill="#FFFFFF" text-anchor="middle">ATMOSPHERIC THERMAL STRATIFICATION PROFILE (0–100 km)</text>
        ${chartAxes({
          x: 125,
          y: 204,
          w: 500,
          h: 320,
          xLabel: 'Mean Air Temperature (°C)',
          yLabel: 'Altitude (km)',
          xTicks: ['-90°C', '-60°C', '-30°C', '0°C', '+15°C'],
          yTicks: ['0 km', '25 km', '50 km', '75 km', '100 km'],
        })}
        <path d="M 590 524 L 285 450 L 535 365 L 175 245 L 340 205" fill="none" stroke="${PALETTE.rust}" stroke-width="3.5" />
        ${calloutTag(275, 430, 'Tropopause (−56°C · ~12 km)', PALETTE.blue, '#FFFFFF', PALETTE.blue)}
        ${calloutTag(485, 345, 'Stratopause (~0°C · Ozone Heating)', PALETTE.ochre, '#FFFFFF', PALETTE.ochre)}
        ${calloutTag(355, 224, 'Mesopause (−85°C · Coldest Layer)', PALETTE.slate, '#FFFFFF', PALETTE.slate)}

        ${cardBox({ x: 688, y: 142, w: 466, h: 456, fill: PALETTE.paperCard, stroke: PALETTE.emerald, strokeWidth: 1.4, accentTop: PALETTE.emerald })}
        <text x="921" y="162" font-family="Noto Sans, sans-serif" font-size="13.5" font-weight="700" fill="#FFFFFF" text-anchor="middle">GRAVITATIONAL CONFINEMENT WITHOUT A SOLID DOME</text>
        ${titledCard({ x: 710, y: 192, w: 422, h: 120, title: 'Barometric Density Decay', body: 'Gravity holds ~75–80% of total gas mass below ~12 km; density thins smoothly exponentially into space.', accent: PALETTE.blue })}
        ${titledCard({ x: 710, y: 326, w: 422, h: 120, title: 'Thermal Inversion Boundaries', body: 'Ozone UV absorption warms the stratosphere, creating a stable lid that caps most surface storms at the tropopause.', accent: PALETTE.ochre })}
        ${titledCard({ x: 710, y: 460, w: 422, h: 120, title: 'Clarification on "Raised Canopy"', body: 'Modern science confirms physical gravity and fluid stratification rather than rigid celestial spheres.', accent: PALETTE.gold })}
        ${keyTakeawayStrip([
          { label: 'Atmospheric Evidence', detail: finding, color: PALETTE.blue },
          { label: 'Habitable Pressure Range', detail: 'Sea-level ~1013 hPa sustains liquid surface water, respiration, and weather cycles.', color: PALETTE.emerald },
        ], 624)}
      `;
    } else if (isRadiative) {
      const isShade = id === 'ATM-038';
      bodySvg = isShade
        ? `
          ${cardBox({ x: 46, y: 142, w: 610, h: 456, fill: PALETTE.paperCard, stroke: PALETTE.blue, strokeWidth: 1.4, accentTop: PALETTE.blue })}
          <text x="351" y="162" font-family="Noto Sans, sans-serif" font-size="13.5" font-weight="700" fill="#FFFFFF" text-anchor="middle">CLOUD OPTICAL DEPTH VS. SURFACE SOLAR IRRADIANCE</text>
          <text x="76" y="214" font-family="Noto Sans, sans-serif" font-size="13" font-weight="700" fill="${PALETTE.ochre}">Clear Midday Sky (~950 W/m² Direct Insolation)</text>
          <rect x="76" y="226" width="540" height="32" rx="5" fill="#EAE6DA" /><rect x="76" y="226" width="505" height="32" rx="5" fill="#D98B2B" />
          <text x="76" y="294" font-family="Noto Sans, sans-serif" font-size="13" font-weight="700" fill="${PALETTE.blue}">High Thin Cirrus Veil (~720 W/m² Diffuse + Direct)</text>
          <rect x="76" y="306" width="540" height="32" rx="5" fill="#EAE6DA" /><rect x="76" y="306" width="382" height="32" rx="5" fill="#4B89C4" />
          <text x="76" y="374" font-family="Noto Sans, sans-serif" font-size="13" font-weight="700" fill="${PALETTE.slate}">Thick Overcast Storm Deck (~115 W/m² Deep Shade)</text>
          <rect x="76" y="386" width="540" height="32" rx="5" fill="#EAE6DA" /><rect x="76" y="386" width="66" height="32" rx="5" fill="${PALETTE.slate}" />
          <rect x="76" y="448" width="540" height="122" rx="6" fill="#EDF4FA" stroke="${PALETTE.blue}" />
          ${renderSvgTextLines(wrapLines('Dense liquid droplets scatter incoming solar photons via Mie &amp; geometric optics, cutting daytime UV and heat stress across shaded terrain while warming surface air cooler than sunbaked bare soil.', 68, 4), 94, 478, 18, { fontSize: 12.5, fill: PALETTE.ink })}

          ${cardBox({ x: 678, y: 142, w: 476, h: 456, fill: PALETTE.paperCard, stroke: PALETTE.gold, strokeWidth: 1.4, accentTop: PALETTE.ochre })}
          <text x="916" y="162" font-family="Noto Sans, sans-serif" font-size="13.5" font-weight="700" fill="#FFFFFF" text-anchor="middle">SHORTWAVE SCATTERING &amp; MICROCLIMATE SHADE</text>
          ${titledCard({ x: 700, y: 192, w: 432, h: 120, title: 'Optical Thickness Governs Shade', body: 'Cumulus and stratus clouds reflect 30–70% of incident shortwave radiation back toward space depending on water content.', accent: PALETTE.blue })}
          ${titledCard({ x: 700, y: 326, w: 432, h: 120, title: 'Thermal Comfort &amp; Crop Buffer', body: 'Partial cloud cover reduces peak afternoon heat extremes and leaf evapotranspiration shock.', accent: PALETTE.emerald })}
          ${titledCard({ x: 700, y: 460, w: 432, h: 120, title: 'Dual Radiative Caveat', body: 'At night, low clouds trap outgoing thermal infrared radiation, keeping overcast nights warmer than clear skies.', accent: PALETTE.gold })}
          ${keyTakeawayStrip([
            { label: 'Radiative Balance (~340 W/m²)', detail: finding, color: PALETTE.blue },
            { label: 'Optical Variability', detail: 'Cloud shade depends rapidly on droplet size, optical depth, and solar elevation angle.', color: PALETTE.ochre },
          ], 624)}
        `
        : `
          <rect x="46" y="142" width="1108" height="456" rx="8" fill="#EAF2F8" stroke="${PALETTE.border}" stroke-width="1.2" />
          <circle cx="595" cy="184" r="24" fill="#F2B949" stroke="#C98316" stroke-width="2" />
          ${cardBox({ x: 74, y: 224, w: 500, h: 350, fill: '#F8FBFE', stroke: PALETTE.blue, strokeWidth: 1.4, accentTop: PALETTE.blue })}
          <text x="324" y="244" font-family="Noto Sans, sans-serif" font-size="13" font-weight="700" fill="#FFFFFF" text-anchor="middle">LOW THICK STRATOCUMULUS (NET ALBEDO COOLING)</text>
          ${cloudShape(324, 346, 1.35, '#CBD8E6', '#4E6378', true)}
          ${curvedArrow('M 190 267 Q 255 317 230 332 Q 175 292 145 257', PALETTE.ochre, 3)}
          <text x="324" y="428" font-family="Noto Sans, sans-serif" font-size="12.5" font-weight="700" fill="${PALETTE.ochre}" text-anchor="middle">High Albedo Reflects 30–70% of Sunlight</text>
          <rect x="96" y="460" width="456" height="92" rx="4" fill="#EEF4FA" />
          ${renderSvgTextLines(wrapLines('Low thick clouds predominantly cool Earth by reflecting shortwave sunlight back into space.', 58, 4), 110, 482, 18, { fontSize: 12.5, fill: PALETTE.ink })}

          ${cardBox({ x: 626, y: 224, w: 500, h: 350, fill: '#F8FBFE', stroke: PALETTE.rust, strokeWidth: 1.4, accentTop: PALETTE.rust })}
          <text x="876" y="244" font-family="Noto Sans, sans-serif" font-size="13" font-weight="700" fill="#FFFFFF" text-anchor="middle">HIGH THIN CIRRUS DECK (NET INFRARED WARMING)</text>
          <path d="M 700 327 Q 870 310 1050 330 M 730 347 Q 890 337 1030 352" fill="none" stroke="#6E8BA6" stroke-width="3.5" stroke-linecap="round" />
          ${flowArrow(840, 502, 840, 360, PALETTE.rust, 2.8)}
          ${flowArrow(910, 360, 910, 487, PALETTE.rust, 2.4, true)}
          <text x="876" y="420" font-family="Noto Sans, sans-serif" font-size="12.5" font-weight="700" fill="${PALETTE.rust}" text-anchor="middle">Transmits Sunlight · Traps Thermal Infrared</text>
          <rect x="648" y="460" width="456" height="92" rx="4" fill="#FAF0EC" />
          ${renderSvgTextLines(wrapLines('High ice clouds transmit shortwave sunlight while absorbing and re-emitting outgoing thermal infrared radiation back toward Earth.', 58, 4), 662, 482, 18, { fontSize: 12.5, fill: PALETTE.ink })}
          ${keyTakeawayStrip([
            { label: 'Radiative Balance (~340 W/m²)', detail: finding, color: PALETTE.blue },
            { label: 'Competing Dual Effects', detail: 'Clouds simultaneously cool via sunlight reflection and warm via infrared greenhouse trapping.', color: PALETTE.rust },
          ], 624)}
        `;
    } else if (isShelter) {
      const isCold = id === 'ATM-041';
      bodySvg = `
        <rect x="46" y="142" width="1108" height="456" rx="8" fill="${isCold ? '#EBF1F6' : '#F7EFE0'}" stroke="${PALETTE.border}" stroke-width="1.2" />
        ${cardBox({ x: 74, y: 164, w: 495, h: 412, fill: PALETTE.paperCard, stroke: isCold ? PALETTE.blue : PALETTE.ochre, strokeWidth: 1.4, accentTop: isCold ? PALETTE.blue : PALETTE.ochre })}
        <text x="321" y="184" font-family="Noto Sans, sans-serif" font-size="13" font-weight="700" fill="#FFFFFF" text-anchor="middle">${isCold ? 'THERMAL INSULATION &amp; WIND-CHILL PROTECTION' : 'SOLAR RADIATION INTERCEPTION &amp; SHADE'}</text>
        ${
          isCold
            ? `
              <rect x="175" y="255" width="290" height="175" rx="8" fill="#E3D7BF" stroke="#6E5A3E" stroke-width="3" />
              <rect x="195" y="275" width="250" height="135" rx="5" fill="#FBF8F1" stroke="${PALETTE.ochre}" stroke-width="2" />
              <text x="320" y="345" font-family="Noto Sans, sans-serif" font-size="14" font-weight="700" fill="${PALETTE.ochre}" text-anchor="middle">Trapped Still Air (Low Conductivity)</text>
              ${flowArrow(92, 310, 165, 310, PALETTE.blue, 3)}
              ${flowArrow(92, 375, 165, 375, PALETTE.blue, 3)}
              <text x="125" y="292" font-family="Noto Sans, sans-serif" font-size="12" font-weight="700" fill="${PALETTE.blue}" text-anchor="middle">Cold Gale</text>
              <text x="321" y="485" font-family="Noto Sans, sans-serif" font-size="13" font-weight="600" fill="${PALETTE.ink}" text-anchor="middle">Wool, layered textiles &amp; shelters curb convective &amp; conductive loss</text>
            `
            : `
              <circle cx="155" cy="248" r="28" fill="#F2B949" />
              ${flowArrow(185, 258, 405, 318, PALETTE.ochre, 3)}
              <path d="M 380 342 L 495 342 L 495 452 L 380 452 Z" fill="#D5C8AD" stroke="#6B5B3E" stroke-width="2" />
              <polygon points="365,342 437,292 510,342" fill="#7D5E38" />
              <rect x="495" y="402" width="52" height="50" fill="#5D6F7D" fill-opacity="0.32" />
              <text x="321" y="494" font-family="Noto Sans, sans-serif" font-size="13" font-weight="700" fill="${PALETTE.ink}" text-anchor="middle">Canopies &amp; walls block direct beam irradiance (~800–1,000 W/m²)</text>
            `
        }
        ${cardBox({ x: 630, y: 164, w: 496, h: 412, fill: PALETTE.paperCard, stroke: PALETTE.emerald, strokeWidth: 1.4, accentTop: PALETTE.emerald })}
        <text x="878" y="184" font-family="Noto Sans, sans-serif" font-size="13" font-weight="700" fill="#FFFFFF" text-anchor="middle">MICROCLIMATE &amp; HUMAN THERMOREGULATION</text>
        ${titledCard({ x: 652, y: 212, w: 452, h: 105, title: 'Conduction &amp; Still Air', body: 'Still air inside fabrics, adobe walls, and caves resists conductive heat transfer far better than moving air.', accent: PALETTE.blue })}
        ${titledCard({ x: 652, y: 330, w: 452, h: 105, title: 'Convection &amp; Sweating / Shivering', body: 'Human physiology balances core ~37 °C via vasodilation/sweating in heat and shivering/insulation in cold.', accent: PALETTE.ochre })}
        ${titledCard({ x: 652, y: 448, w: 452, h: 105, title: 'Environmental Context', detail: '', body: entry.limitations || 'Architectural materials complement physiological adaptation across extreme climates.', accent: PALETTE.emerald } as any)}
        ${keyTakeawayStrip([
          { label: 'Thermophysical Principle', detail: finding, color: isCold ? PALETTE.blue : PALETTE.ochre },
          { label: 'Protective Value', detail: 'Shade, airflow control, and clothing insulation reduce dangerous thermal stress.', color: PALETTE.emerald },
        ], 624)}
      `;
    } else {
      // ATM-035 Protected Canopy
      bodySvg = `
        <rect x="46" y="142" width="1108" height="456" rx="8" fill="#0E1C2E" stroke="${PALETTE.gold}" stroke-width="1.3" />
        ${[
          { y: 158, h: 78, lbl: 'THERMOSPHERE &amp; MESOSPHERE (50–500 km)', sub: 'Rarified gas; frictional heating ablates most small meteoroids', fill: '#162C47', tc: '#DCE8F5' },
          { y: 236, h: 118, lbl: 'STRATOSPHERE &amp; OZONE LAYER (15–50 km)', sub: 'Absorbs ~100% UV-C &amp; &gt;90% UV-B solar radiation (O₃ shield)', fill: '#1F566E', tc: '#E2F5F7' },
          { y: 354, h: 145, lbl: 'TROPOSPHERE WEATHER ZONE (0–18 km · ~75–80% MASS)', sub: 'Breathable pressure, water vapor, clouds &amp; hydrological weather', fill: '#3E82A3', tc: '#FFFFFF' },
        ]
          .map(
            (band) => `
            <rect x="70" y="${band.y}" width="665" height="${band.h}" fill="${band.fill}" stroke="#7FA9C9" stroke-width="1" />
            <text x="90" y="${band.y + 30}" font-family="Noto Sans, sans-serif" font-size="13.5" font-weight="700" fill="${band.tc}">${band.lbl}</text>
            <text x="90" y="${band.y + 54}" font-family="Noto Sans, sans-serif" font-size="12" fill="${band.tc}" fill-opacity="0.9">${band.sub}</text>
          `
          )
          .join('')}
        <rect x="70" y="499" width="665" height="82" fill="#2E5438" />
        <text x="402" y="545" font-family="Noto Sans, sans-serif" font-size="14" font-weight="700" fill="#DFC99B" text-anchor="middle">EARTH SURFACE (~1013 hPa HABITABLE BIOSPHERE)</text>
        ${flowArrow(540, 152, 540, 286, '#F5C451', 3)}
        ${calloutTag(540, 188, 'UV-C / UV-B Blocked', '#1A1A1A', '#FDE68A', '#F5C451')}
        ${flowArrow(655, 152, 655, 495, '#A3E4D7', 2.8)}
        ${calloutTag(642, 444, 'Visible Light Passes', '#0D3B2E', '#D4EFF2', '#A3E4D7')}
        ${cardBox({ x: 758, y: 158, w: 374, h: 423, fill: PALETTE.paperCard, stroke: PALETTE.gold, strokeWidth: 1.4 })}
        ${titledCard({ x: 778, y: 178, w: 334, h: 120, title: 'Gravity-Bound Protection', body: 'Earth’s gravity binds gases smoothly into space without any rigid mechanical dome.', accent: PALETTE.blue })}
        ${titledCard({ x: 778, y: 311, w: 334, h: 120, title: 'Selective Optical Window', body: 'Ozone blocks high-energy UV-C/UV-B while remaining transparent to life-giving visible light.', accent: PALETTE.emerald })}
        ${titledCard({ x: 778, y: 443, w: 334, h: 120, title: 'Selective Boundaries', body: 'Large asteroids, UV-A light, and surface storms remain natural physical exceptions.', accent: PALETTE.gold })}
        ${keyTakeawayStrip([
          { label: 'Atmospheric Shield Summary', detail: finding, color: PALETTE.emerald },
          { label: 'Earth Energy Context', detail: 'Combined atmospheric absorption and magnetospheric deflection support terrestrial surface life.', color: PALETTE.blue },
        ], 624)}
      `;
    }

  // 8. Water Quality, Scavenging &amp; Aquifer/Spring Recharge (ATM-026, 027, 043, 044, 046)
  } else if (kind === 'wet-deposition-water-quality' || kind === 'rainfall-groundwater-replenishment') {
    if (id === 'ATM-046') {
      // Rainwater to Safe Drinking-Water Treatment Sequence
      bodySvg = `
        <rect x="46" y="142" width="1108" height="456" rx="8" fill="#EEF5F9" stroke="${PALETTE.border}" stroke-width="1.2" />
        ${[
          { step: '1. Rain &amp; Catchment', detail: 'Fresh rain ~pH 5.6 absorbs gases and washes surface dust/spores.', col: PALETTE.cyan },
          { step: '2. Reservoir Settling', detail: 'Heavy suspended silt and particulates settle under gravity.', col: PALETTE.blue },
          { step: '3. Sand/Soil Percolation', detail: 'Natural aquifers &amp; filter media strip suspended microbes &amp; haze.', col: PALETTE.emerald },
          { step: '4. Verified Treatment', detail: 'Boiling, UV, or municipal disinfection yields safe potable water.', col: PALETTE.gold },
        ]
          .map((s, i) => {
            const x = 72 + i * 268;
            return `${titledCard({ x, y: 185, w: 242, h: 255, badge: `Step 0${i + 1}`, title: s.step, body: s.detail, accent: s.col })}
              ${i < 3 ? flowArrow(x + 244, 312, x + 266, 312, PALETTE.blue, 2.5) : ''}`;
          })
          .join('')}
        <rect x="72" y="468" width="1056" height="108" rx="6" fill="${PALETTE.paperCard}" stroke="${PALETTE.gold}" />
        <text x="96" y="498" font-family="Noto Sans, sans-serif" font-size="13.5" font-weight="700" fill="${PALETTE.emerald}">PUBLIC HEALTH BOUNDARY: RAINWATER IS NATURAL FRESHWATER, NOT STERILE</text>
        ${renderSvgTextLines(wrapLines(finding + ' ' + (entry.limitations || 'Untreated runoff or contaminated cisterns can harbor pathogens and require public-health filtration.'), 128, 3), 96, 524, 18, { fontSize: 12.5, fill: PALETTE.ink })}
        ${keyTakeawayStrip([
          { label: 'Freshwater Supply Role', detail: 'Rainfall replenishes freshwater springs, lakes, and rivers essential for human hydration and agriculture.', color: PALETTE.cyan },
          { label: 'Safety Qualification', detail: 'Potability depends on clean catchment, soil filtration, or modern treatment—not rainfall in isolation.', color: PALETTE.gold },
        ], 624)}
      `;
    } else if (id === 'ATM-043') {
      // Runoff vs Soil vs Aquifer Partitioning Bars
      bodySvg = `
        ${cardBox({ x: 46, y: 142, w: 620, h: 456, fill: PALETTE.paperCard, stroke: PALETTE.cyan, strokeWidth: 1.4, accentTop: PALETTE.cyan })}
        <text x="356" y="162" font-family="Noto Sans, sans-serif" font-size="13.5" font-weight="700" fill="#FFFFFF" text-anchor="middle">CONTINENTAL RAINFALL PARTITIONING BY PATHWAY</text>
        ${[
          { label: 'Evapotranspiration (Vegetation &amp; Soil Return)', pct: 62, col: PALETTE.olive, y: 225 },
          { label: 'Surface Runoff (Streams, Rivers &amp; Lakes)', pct: 26, col: PALETTE.blue, y: 325 },
          { label: 'Deep Percolation (Aquifer &amp; Groundwater Recharge)', pct: 12, col: PALETTE.emerald, y: 425 },
        ]
          .map(
            (b) => `
            <text x="76" y="${b.y}" font-family="Noto Sans, sans-serif" font-size="13" font-weight="700" fill="${PALETTE.ink}">${b.label}</text>
            <rect x="76" y="${b.y + 12}" width="520" height="34" rx="5" fill="#EAE6DA" stroke="${PALETTE.border}" />
            <rect x="76" y="${b.y + 12}" width="${(520 * b.pct) / 100}" height="34" rx="5" fill="${b.col}" />
            <text x="${92 + (520 * b.pct) / 100}" y="${b.y + 34}" font-family="Noto Sans, sans-serif" font-size="13" font-weight="700" fill="${b.col}">~${b.pct}% (Regional Average)</text>
          `
          )
          .join('')}
        <text x="76" y="535" font-family="Noto Sans, sans-serif" font-size="12" fill="${PALETTE.inkMuted}">Note: Exact percentages vary strongly with rainfall intensity, soil porosity, slope, and urbanization.</text>

        ${cardBox({ x: 688, y: 142, w: 466, h: 456, fill: PALETTE.paperCard, stroke: PALETTE.emerald, strokeWidth: 1.4, accentTop: PALETTE.emerald })}
        <text x="921" y="162" font-family="Noto Sans, sans-serif" font-size="13.5" font-weight="700" fill="#FFFFFF" text-anchor="middle">RECHARGE DRIVERS &amp; SUSTAINABLE YIELD</text>
        ${titledCard({ x: 710, y: 192, w: 422, h: 120, title: 'Soil Pore &amp; Root Channels', body: 'Intact vegetated topsoils slow rainfall impact and guide infiltration downward instead of triggering flash runoff.', accent: PALETTE.olive })}
        ${titledCard({ x: 710, y: 326, w: 422, h: 120, title: 'Subsurface Aquifer Storage', body: 'Permeable sand, gravel, and fractured limestone store water underground for months to centuries.', accent: PALETTE.blue })}
        ${titledCard({ x: 710, y: 460, w: 422, h: 120, title: 'Extraction Balance Limit', body: 'Pumping aquifers faster than rainfall replenishment causes water-table depletion and land subsidence.', accent: PALETTE.rust })}
        ${keyTakeawayStrip([
          { label: 'Hydrological Finding', detail: finding, color: PALETTE.cyan },
          { label: 'Resource Replenishment', detail: 'Long-term freshwater security requires conserving permeable recharge zones and preventing over-extraction.', color: PALETTE.emerald },
        ], 624)}
      `;
    } else {
      const isAquifer = id === 'ATM-044';
      const isCleanAir = id === 'ATM-027';
      const isQuality = id === 'ATM-026';
      bodySvg = isQuality
        ? `
          ${cardBox({ x: 46, y: 142, w: 575, h: 456, fill: PALETTE.paperCard, stroke: PALETTE.cyan, strokeWidth: 1.4, accentTop: PALETTE.cyan })}
          <text x="333" y="162" font-family="Noto Sans, sans-serif" font-size="13.5" font-weight="700" fill="#FFFFFF" text-anchor="middle">RAINWATER CATCHMENT CONTAMINATION PATHWAYS</text>
          <!-- Roof + Cistern Schematic -->
          <polygon points="88,266 235,204 382,266" fill="#9E7828" stroke="#5C4430" stroke-width="2" />
          <text x="235" y="254" font-family="Noto Sans, sans-serif" font-size="12" font-weight="700" fill="#FFFFFF" text-anchor="middle">Catchment Roof / Surface</text>
          ${rainDrops(105, 174, 240, 48, 8, 2)}
          <polyline points="382,266 435,266 435,342" fill="none" stroke="${PALETTE.blue}" stroke-width="4" />
          <rect x="405" y="342" width="150" height="105" rx="6" fill="#D4EFF2" stroke="${PALETTE.cyan}" stroke-width="2" />
          <text x="480" y="392" font-family="Noto Sans, sans-serif" font-size="12.5" font-weight="700" fill="${PALETTE.ink}" text-anchor="middle">Storage Cistern</text>
          <text x="480" y="414" font-family="Noto Sans, sans-serif" font-size="11.5" fill="${PALETTE.rust}" text-anchor="middle">Requires Filtration</text>
          <rect x="76" y="466" width="514" height="110" rx="6" fill="#FAF0EC" stroke="${PALETTE.rust}" />
          ${renderSvgTextLines(wrapLines('Key quality factors: dissolved atmospheric CO₂ (~pH 5.6), roof bird/dust wash, and microbial coliforms in open storage make treatment mandatory before drinking.', 64, 4), 94, 494, 18, { fontSize: 12.5, fill: PALETTE.ink })}

          ${cardBox({ x: 642, y: 142, w: 512, h: 456, fill: PALETTE.paperCard, stroke: PALETTE.emerald, strokeWidth: 1.4, accentTop: PALETTE.emerald })}
          <text x="898" y="162" font-family="Noto Sans, sans-serif" font-size="13.5" font-weight="700" fill="#FFFFFF" text-anchor="middle">ATMOSPHERIC SCAVENGING &amp; POTABILITY LIMITS</text>
          ${titledCard({ x: 664, y: 192, w: 468, h: 120, title: 'Dilution &amp; Particle Removal', body: 'Falling drops capture soot, pollen, dust, and water-soluble trace gases, lowering urban airborne particulate haze.', accent: PALETTE.blue })}
          ${titledCard({ x: 664, y: 326, w: 468, h: 120, title: 'Surface Runoff Trade-Off', body: 'First-flush roof and street runoff carries concentrated hydrocarbons, feces, and heavy metals into drains.', accent: PALETTE.rust })}
          ${titledCard({ x: 664, y: 460, w: 468, h: 120, title: 'Evidential Guardrail', body: entry.limitations || 'Natural rainfall refreshes landscapes without implying sterile laboratory purity.', accent: PALETTE.gold })}
          ${keyTakeawayStrip([
            { label: 'Core Finding', detail: finding, color: PALETTE.cyan },
            { label: 'Public Health Context', detail: 'Safe drinking water requires clean first-flush diversion, sand filtration, or boiling/UV disinfection.', color: PALETTE.emerald },
          ], 624)}
        `
        : `
        <rect x="46" y="142" width="1108" height="456" rx="8" fill="#EEF4F8" stroke="${PALETTE.border}" stroke-width="1.2" />
        ${cloudShape(290, 218, 1.05, '#D2DFEC', '#4F6378', true)}
        ${rainDrops(205, 255, 175, 130, 8, 4)}
        ${soilCutaway(68, 396, 540, 185, true)}
        ${
          isAquifer
            ? `
              <path d="M 68 478 L 450 478 L 540 436 L 608 436 L 608 522 L 68 522 Z" fill="#3B82C4" fill-opacity="0.45" />
              ${flowArrow(240, 398, 240, 472, PALETTE.cyan, 2.5)}
              ${curvedArrow('M 330 498 Q 460 496 528 438', PALETTE.blue, 3)}
              ${calloutTag(512, 376, 'Artesian Spring Emergence', PALETTE.blue, '#FFFFFF', PALETTE.blue)}
              <text x="260" y="508" font-family="Noto Sans, sans-serif" font-size="13" font-weight="700" fill="#FFFFFF" text-anchor="middle">POROUS AQUIFER WATER TABLE</text>
            `
            : `
              ${calloutTag(338, 360, 'Wet Scavenging Clears Suspended Dust &amp; Smoke', PALETTE.rust, '#FFFFFF', PALETTE.rust)}
              <text x="338" y="462" font-family="Noto Sans, sans-serif" font-size="13" font-weight="700" fill="#FFFFFF" text-anchor="middle">WET DEPOSITION ONTO SOIL &amp; OCEAN</text>
            `
        }
        ${cardBox({ x: 642, y: 162, w: 486, h: 416, fill: PALETTE.paperCard, stroke: PALETTE.cyan, strokeWidth: 1.4, accentTop: PALETTE.cyan })}
        <text x="885" y="182" font-family="Noto Sans, sans-serif" font-size="13.5" font-weight="700" fill="#FFFFFF" text-anchor="middle">${isAquifer ? 'INFILTRATION &amp; ARTESIAN SPRING HYDROLOGY' : isCleanAir ? 'RAINOUT VS. BELOW-CLOUD WASHOUT' : 'ATMOSPHERIC SCAVENGING &amp; SURFACE CLEANSING'}</text>
        ${titledCard({ x: 664, y: 208, w: 442, h: 110, title: isAquifer ? 'Subsurface Flow Routing' : isCleanAir ? 'In-Cloud &amp; Below-Cloud Scavenging' : 'Dilution &amp; Particle Removal', body: isAquifer ? 'Confining clay or rock strata direct infiltrated water laterally along hydraulic gradients until emerging at springs.' : 'Falling drops capture soot, pollen, dust, and water-soluble trace gases (SO₂, NOₓ, NH₃), clearing air visibility.', accent: PALETTE.blue })}
        ${titledCard({ x: 664, y: 330, w: 442, h: 110, title: isAquifer ? 'Spring Residence Time' : 'Chemical Transfer Trade-Off', body: isAquifer ? 'Spring discharge filters particulates through mineral pores over seasons to decades, buffering droughts.' : 'Cleaning air moves captured pollutants onto soils and streams, creating acid rain if fossil sulfur/nitrogen emissions are high.', accent: PALETTE.emerald })}
        ${titledCard({ x: 664, y: 452, w: 442, h: 110, title: 'Evidential Guardrail', body: entry.limitations || 'Natural rainfall refreshes landscapes without implying sterile laboratory purity.', accent: PALETTE.gold })}
        ${keyTakeawayStrip([
          { label: 'Core Finding', detail: finding, color: PALETTE.cyan },
          { label: 'Environmental Context', detail: isAquifer ? 'Springs visibly link seasonal mountain rainfall to year-round valley streamflows.' : 'Atmospheric cleansing sustains air clarity while transferring nutrients and aerosols to soils.', color: PALETTE.emerald },
        ], 624)}
      `;
    }

  // 9. Ecological Renewal, Agriculture, Pollination (ATM-007, 008, 010, 028, 029, 045)
  } else if (kind === 'soil-moisture-ecological-renewal' || kind === 'wind-pollination-aerosols') {
    if (kind === 'wind-pollination-aerosols') {
      bodySvg = `
        <rect x="46" y="142" width="1108" height="456" rx="8" fill="#F4F6EE" stroke="${PALETTE.border}" stroke-width="1.2" />
        ${titledCard({ x: 72, y: 164, w: 500, h: 195, badge: 'Botanical Vector', title: '1. Anemophilous Wind Pollination', body: 'Grasses, wheat, olives, conifers, and date palms release lightweight pollen dispersed by moving air across open canopies.', accent: PALETTE.olive })}
        ${titledCard({ x: 628, y: 164, w: 500, h: 195, badge: 'Atmospheric Physics', title: '2. Cloud Condensation Nuclei &amp; Moisture', body: 'Winds transport marine vapor along with microscopic sea-salt and mineral dust nuclei (~0.1 µm) required for cloud droplet formation.', accent: PALETTE.blue })}
        <rect x="72" y="380" width="1056" height="196" rx="6" fill="${PALETTE.paperCard}" stroke="${PALETTE.gold}" stroke-width="1.4" />
        <text x="600" y="410" font-family="Liberation Serif, serif" font-size="16" font-weight="700" fill="${PALETTE.ink}" text-anchor="middle">AIRBORNE BIOLOGICAL &amp; METEOROLOGICAL FLUXES</text>
        ${flowArrow(145, 460, 435, 460, PALETTE.olive, 3)}
        ${calloutTag(290, 448, 'Pollen Grains (10–100 µm)', PALETTE.olive, '#FFFFFF', PALETTE.olive)}
        ${flowArrow(495, 460, 765, 460, PALETTE.blue, 3)}
        ${calloutTag(630, 448, 'Sea-Salt / Dust CCN (~0.1 µm)', PALETTE.blue, '#FFFFFF', PALETTE.blue)}
        ${flowArrow(815, 460, 1065, 460, PALETTE.cyan, 3)}
        ${calloutTag(940, 448, 'Water Vapor Transport', PALETTE.cyan, '#FFFFFF', PALETTE.cyan)}
        <text x="600" y="548" font-family="Noto Sans, sans-serif" font-size="12.5" font-weight="600" fill="${PALETTE.inkMuted}" text-anchor="middle">Tafsir Guardrail: Classical commentators note both rain-bearing cloud stirring and plant fertilization senses for 15:22.</text>
        ${keyTakeawayStrip([
          { label: 'Essential Co-Factors', detail: finding, color: PALETTE.olive },
          { label: 'Hermeneutic Care', detail: 'Avoid reducing Arabic "lawaqih" strictly to one modern mechanism to the exclusion of classical tafsir.', color: PALETTE.gold },
        ], 624)}
      `;
    } else if (id === 'ATM-008' || id === 'ATM-029' || id === 'ATM-045') {
      const subMode = id === 'ATM-008' ? 'uptake' : id === 'ATM-029' ? 'yield' : 'diversity';
      bodySvg = `
        ${cardBox({ x: 46, y: 142, w: 610, h: 456, fill: '#F4F8F1', stroke: PALETTE.olive, strokeWidth: 1.4, accentTop: PALETTE.olive })}
        <text x="351" y="162" font-family="Noto Sans, sans-serif" font-size="13.5" font-weight="700" fill="#FFFFFF" text-anchor="middle">${
          subMode === 'uptake'
            ? 'TRANSPIRATION STREAM: SOIL WATER → XYLEM → LEAF STOMATA'
            : subMode === 'yield'
            ? 'SEASONAL RAINFALL VS. CROP GRAIN PRODUCTION CURVE'
            : 'HYDRO-CLIMATIC NICHES &amp; CROP SPECIES ADAPTATION'
        }</text>
        ${
          subMode === 'uptake'
            ? `
              ${rainDrops(105, 195, 140, 95, 5, 2)}
              ${soilCutaway(80, 440, 540, 125, true)}
              <!-- Stem + Leaves + Roots -->
              <rect x="338" y="255" width="16" height="190" fill="#4D7E3E" />
              <path d="M 346 445 Q 290 485 265 520 M 346 445 Q 345 500 342 532 M 346 445 Q 405 490 430 518" fill="none" stroke="#DFC798" stroke-width="3" />
              <path d="M 354 325 Q 420 275 470 305 Q 420 345 354 325 Z" fill="#5A9647" stroke="#2D5927" />
              <path d="M 338 300 Q 270 250 220 280 Q 270 320 338 300 Z" fill="#5A9647" stroke="#2D5927" />
              ${flowArrow(346, 430, 346, 260, PALETTE.cyan, 2.8)}
              ${calloutTag(220, 412, 'Root Hair Water &amp; Nitrate Uptake', PALETTE.emerald, '#FFFFFF', PALETTE.emerald)}
              ${calloutTag(485, 240, 'CO₂ + Light + H₂O → Sugars (Photosynthesis)', PALETTE.olive, '#FFFFFF', PALETTE.olive)}
            `
            : subMode === 'yield'
            ? `
              ${chartAxes({
                x: 118,
                y: 205,
                w: 500,
                h: 310,
                xLabel: 'Seasonal Rainfall Availability (mm)',
                yLabel: 'Relative Crop Yield (%)',
                xTicks: ['150 mm (Arid)', '350 mm', '550 mm (Optimal)', '800 mm', '1200 mm (Logged)'],
                yTicks: ['0%', '25%', '50%', '75%', '100%'],
              })}
              <path d="M 122 495 Q 290 245 435 235 Q 530 245 610 315" fill="none" stroke="${PALETTE.emerald}" stroke-width="3.5" />
              <circle cx="430" cy="236" r="6" fill="${PALETTE.gold}" />
              ${calloutTag(415, 222, 'Optimal Moisture + Drainage', PALETTE.emerald, '#FFFFFF', PALETTE.emerald)}
              ${calloutTag(535, 348, 'Waterlogging Oxygen Loss', PALETTE.rust, '#FFFFFF', PALETTE.rust)}
            `
            : `
              ${titledCard({ x: 74, y: 192, w: 554, h: 112, title: 'Arid / Semi-Arid Flora (~100–350 mm/yr)', body: 'Date palms, millet, and xerophytes use deep taproots &amp; waxy cuticles to conserve scant water.', accent: PALETTE.ochre })}
              ${titledCard({ x: 74, y: 318, w: 554, h: 112, title: 'Temperate Grain Belt (~450–800 mm/yr)', body: 'Wheat, barley, and legumes synchronize vegetative spring growth with seasonal front rains.', accent: PALETTE.olive })}
              ${titledCard({ x: 74, y: 444, w: 554, h: 112, title: 'Humid Tropical Paddy (~1,200+ mm/yr)', body: 'Paddy rice and dense fruit canopies thrive under high monsoon rainfall &amp; warm solar flux.', accent: PALETTE.emerald })}
            `
        }
        ${cardBox({ x: 678, y: 142, w: 476, h: 456, fill: PALETTE.paperCard, stroke: PALETTE.gold, strokeWidth: 1.4, accentTop: PALETTE.gold })}
        <text x="916" y="162" font-family="Noto Sans, sans-serif" font-size="13.5" font-weight="700" fill="#FFFFFF" text-anchor="middle">AGRONOMIC &amp; BOTANICAL CO-FACTORS</text>
        ${titledCard({ x: 700, y: 192, w: 432, h: 120, title: 'Core Botanical Mechanism', body: finding, accent: PALETTE.emerald })}
        ${titledCard({ x: 700, y: 326, w: 432, h: 120, title: 'Beyond Water Alone', body: 'Sunlight, atmospheric CO₂, mineral nutrients (N, P, K), soil aeration, and species genetics act jointly.', accent: PALETTE.blue })}
        ${titledCard({ x: 700, y: 460, w: 432, h: 120, title: 'Editorial Qualification', body: entry.limitations || 'Agricultural abundance reflects multiple climatic and human cultivation practices alongside rain.', accent: PALETTE.gold })}
        ${keyTakeawayStrip([
          { label: 'Plant-Atmosphere Link', detail: 'Solar-driven rainfall cycles deliver fresh solvent water required for every terrestrial crop food web.', color: PALETTE.olive },
          { label: 'Evidentiary Integrity', detail: `Evidence Grade ${entry.evidence_grade} · NOAA / FAO Meteorological &amp; Agronomic Consensus.`, color: PALETTE.gold },
        ], 624)}
      `;
    } else if (id === 'ATM-028') {
      // ATM-028: Seed Imbibition, Hormone Activation & Metabolic Reawakening Chart
      bodySvg = `
        ${cardBox({ x: 46, y: 142, w: 620, h: 456, fill: PALETTE.paperCard, stroke: PALETTE.emerald, strokeWidth: 1.4, accentTop: PALETTE.emerald })}
        <text x="356" y="162" font-family="Noto Sans, sans-serif" font-size="13.5" font-weight="700" fill="#FFFFFF" text-anchor="middle">PHYSIOLOGICAL PHASES OF SEED IMBIBITION &amp; EMERGENCE</text>
        ${chartAxes({
          x: 118,
          y: 204,
          w: 505,
          h: 310,
          xLabel: 'Hours After Moisture Contact',
          yLabel: 'Water Uptake &amp; Enzyme Activity (%)',
          xTicks: ['0 h (Dry)', '8 h (Phase I)', '24 h (Phase II)', '48 h (Phase III)', '72 h (Root)'],
          yTicks: ['0%', '25%', '50%', '75%', '100%'],
        })}
        <path d="M 122 490 Q 175 315 245 305 L 405 300 Q 495 292 615 220" fill="none" stroke="${PALETTE.cyan}" stroke-width="3.5" />
        <path d="M 122 498 L 235 492 Q 355 430 475 280 L 615 242" fill="none" stroke="${PALETTE.emerald}" stroke-width="3" stroke-dasharray="6 4" />
        ${calloutTag(240, 275, 'I. Rapid Water Imbibition', PALETTE.cyan, '#FFFFFF', PALETTE.cyan)}
        ${calloutTag(385, 360, 'II. Gibberellin → α-Amylase Activation', PALETTE.ochre, '#FFFFFF', PALETTE.ochre)}
        ${calloutTag(515, 218, 'III. Radicle Emergence', PALETTE.emerald, '#FFFFFF', PALETTE.emerald)}

        ${cardBox({ x: 688, y: 142, w: 466, h: 456, fill: PALETTE.paperCard, stroke: PALETTE.gold, strokeWidth: 1.4, accentTop: PALETTE.gold })}
        <text x="921" y="162" font-family="Noto Sans, sans-serif" font-size="13.5" font-weight="700" fill="#FFFFFF" text-anchor="middle">BIOCHEMICAL DORMANCY BREAKDOWN</text>
        ${titledCard({ x: 710, y: 192, w: 422, h: 120, title: '1. Reversible Metabolic Arrest', body: 'Desiccated orthodox seeds drop below ~10% moisture, pausing cellular respiration without dying.', accent: PALETTE.ochre })}
        ${titledCard({ x: 710, y: 326, w: 422, h: 120, title: '2. Starch Hydrolysis &amp; Respiration', body: 'Hydration triggers gibberellin signaling, digesting stored endosperm starch into sugars for root elongation.', accent: PALETTE.emerald })}
        ${titledCard({ x: 710, y: 460, w: 422, h: 120, title: 'Vital Environmental Co-Factors', body: 'Imbibition still fails without soil oxygen for ATP synthesis, suitable temperature, and viable embryos.', accent: PALETTE.gold })}
        ${keyTakeawayStrip([
          { label: 'Ecological Renewal Finding', detail: finding, color: PALETTE.emerald },
          { label: 'Vital Preconditions', detail: 'Post-rain germination requires viable seed coats, oxygen, moisture, and non-extreme soil temperatures.', color: PALETTE.ochre },
        ], 624)}
      `;
    } else {
      // ATM-007 Barren Soil -> Awakened Greening
      bodySvg = `
        <rect x="46" y="142" width="1108" height="456" rx="8" fill="#F4F6EE" stroke="${PALETTE.border}" stroke-width="1.2" />
        ${cardBox({ x: 70, y: 164, w: 495, h: 412, fill: '#FAF5EB', stroke: PALETTE.ochre, strokeWidth: 1.4, accentTop: PALETTE.ochre })}
        <text x="317" y="184" font-family="Noto Sans, sans-serif" font-size="13" font-weight="700" fill="#FFFFFF" text-anchor="middle">1. BARREN SOIL UNDER MOISTURE DEFICIT</text>
        ${soilCutaway(100, 348, 435, 145, false)}
        <ellipse cx="220" cy="398" rx="14" ry="8" fill="#C9A86A" stroke="#5C4430" />
        <ellipse cx="385" cy="405" rx="14" ry="8" fill="#C9A86A" stroke="#5C4430" />
        <text x="317" y="532" font-family="Noto Sans, sans-serif" font-size="12.5" font-weight="600" fill="${PALETTE.ink}" text-anchor="middle">Viable dormant seeds &amp; perennial rootstocks preserve embryonic potential</text>

        ${flowArrow(574, 372, 624, 372, PALETTE.blue, 3.5)}

        ${cardBox({ x: 634, y: 164, w: 495, h: 412, fill: '#F3F8F2', stroke: PALETTE.emerald, strokeWidth: 1.4, accentTop: PALETTE.emerald })}
        <text x="881" y="184" font-family="Noto Sans, sans-serif" font-size="13" font-weight="700" fill="#FFFFFF" text-anchor="middle">2. POST-RAIN ECOLOGICAL RENEWAL</text>
        ${rainDrops(715, 204, 320, 120, 10, 3)}
        ${soilCutaway(664, 348, 435, 145, true)}
        <path d="M 780 348 L 780 284 M 780 310 Q 755 294 745 280 M 780 304 Q 805 290 815 276" fill="none" stroke="#3D7A37" stroke-width="3" stroke-linecap="round" />
        <path d="M 780 348 Q 765 398 752 432 M 780 348 Q 795 400 812 428" fill="none" stroke="#D9C398" stroke-width="2" />
        <path d="M 960 348 L 960 274 M 960 300 Q 935 284 922 270 M 960 296 Q 985 282 998 268" fill="none" stroke="#3D7A37" stroke-width="3" stroke-linecap="round" />
        <path d="M 960 348 Q 945 398 935 432 M 960 348 Q 975 400 990 428" fill="none" stroke="#D9C398" stroke-width="2" />
        <text x="881" y="532" font-family="Noto Sans, sans-serif" font-size="12.5" font-weight="600" fill="${PALETTE.emerald}" text-anchor="middle">Biomass, soil microbes &amp; food webs rebound rapidly</text>
        ${keyTakeawayStrip([
          { label: 'Ecological Renewal Finding', detail: finding, color: PALETTE.emerald },
          { label: 'Vital Preconditions', detail: 'Post-rain greening depends on intact topsoil, seed viability, oxygen, and non-extreme heat.', color: PALETTE.ochre },
        ], 624)}
      `;
    }

  // 10. Planetary Circulation, Water Budgets, &amp; Integrated System (ATM-006, 009, 012, 023, 024, 030, 031, 037, 047, 048, 050)
  } else {
    let leftVisual = '';
    let leftTitle = '';
    if (id === 'ATM-006') {
      leftTitle = 'LATITUDINAL PRECIPITATION &amp; EVAPORATION ZONES';
      leftVisual = `
        ${chartAxes({ x: 112, y: 204, w: 515, h: 315, xLabel: 'Latitude Band', yLabel: 'Mean Annual Rainfall (mm)', xTicks: ['60°S', '30°S (Arid)', '0° (Tropics)', '30°N (Arid)', '60°N'], yTicks: ['0', '600', '1200', '1800', '2400 mm'] })}
        <path d="M 115 415 Q 175 425 245 452 Q 320 465 372 232 Q 425 462 495 450 Q 565 405 624 435" fill="none" stroke="${PALETTE.blue}" stroke-width="3.5" />
        ${calloutTag(372, 214, 'ITCZ Equatorial Rain Peak (~2,200 mm)', PALETTE.blue, '#FFFFFF', PALETTE.blue)}
        ${calloutTag(240, 488, 'Subtropical Desert Belt (~250 mm)', PALETTE.ochre, '#FFFFFF', PALETTE.ochre)}
      `;
    } else if (id === 'ATM-048') {
      leftTitle = 'HUMAN FRESHWATER WITHDRAWAL DEPENDENCE ON RAIN';
      leftVisual = `
        <text x="82" y="218" font-family="Noto Sans, sans-serif" font-size="13.5" font-weight="700" fill="${PALETTE.ink}">Agricultural Irrigation &amp; Rain-Fed Cropland (~70%)</text>
        <rect x="82" y="232" width="540" height="36" rx="5" fill="#EAE6DA" /><rect x="82" y="232" width="378" height="36" rx="5" fill="${PALETTE.olive}" />
        <text x="82" y="308" font-family="Noto Sans, sans-serif" font-size="13.5" font-weight="700" fill="${PALETTE.ink}">Industrial, Energy &amp; Cooling Systems (~19%)</text>
        <rect x="82" y="322" width="540" height="36" rx="5" fill="#EAE6DA" /><rect x="82" y="322" width="103" height="36" rx="5" fill="${PALETTE.slate}" />
        <text x="82" y="398" font-family="Noto Sans, sans-serif" font-size="13.5" font-weight="700" fill="${PALETTE.ink}">Municipal Drinking &amp; Household Sanitation (~11%)</text>
        <rect x="82" y="412" width="540" height="36" rx="5" fill="#EAE6DA" /><rect x="82" y="412" width="60" height="36" rx="5" fill="${PALETTE.cyan}" />
        <rect x="82" y="476" width="540" height="92" rx="6" fill="#EDF5F9" stroke="${PALETTE.cyan}" />
        ${renderSvgTextLines(wrapLines('Atmosphere holds ~12,900 km³ vapor at any moment (~8–10 d residence), recycling ~110,000 km³/yr rain over continents to sustain civilization.', 68, 4), 98, 502, 18, { fontSize: 12.5, fill: PALETTE.ink })}
      `;
    } else if (id === 'ATM-047' || id === 'ATM-037') {
      leftTitle = id === 'ATM-047' ? 'SYNOPTIC PRESSURE TENDENCY &amp; WEATHER CHANGE' : 'GOVERNING ATMOSPHERIC CONSERVATION EQUATIONS';
      leftVisual =
        id === 'ATM-047'
          ? `
            ${chartAxes({ x: 112, y: 204, w: 500, h: 315, xLabel: 'Time (Hours)', yLabel: 'Sea-Level Pressure (hPa)', xTicks: ['0h', '12h', '24h (Trough)', '36h', '48h Ridge'], yTicks: ['990', '1000', '1010', '1020 hPa'] })}
            <path d="M 118 250 Q 260 275 362 465 Q 480 295 606 245" fill="none" stroke="${PALETTE.rust}" stroke-width="3.5" />
            ${calloutTag(335, 496, 'Falling Pressure → Rain', PALETTE.rust, '#FFFFFF', PALETTE.rust)}
            ${calloutTag(480, 228, 'Rising Pressure → Clear Sky', PALETTE.blue, '#FFFFFF', PALETTE.blue)}
          `
          : `
            ${cycleNodeRing(351, 370, 142, [
              { label: 'Momentum Law', sub: 'Pressure + Coriolis + Friction', color: PALETTE.blue },
              { label: 'Mass Continuity', sub: 'Air Convergence = Uplift', color: PALETTE.emerald },
              { label: '1st Thermo Law', sub: 'Latent + Solar Heating', color: PALETTE.rust },
              { label: 'Moisture Phase', sub: 'Clausius–Clapeyron Law', color: PALETTE.cyan },
            ])}
            <text x="351" y="366" font-family="Liberation Serif, serif" font-size="11.5" font-weight="700" fill="${PALETTE.ink}" text-anchor="middle">ATMOSPHERIC</text>
            <text x="351" y="382" font-family="Liberation Serif, serif" font-size="11.5" font-weight="700" fill="${PALETTE.ink}" text-anchor="middle">DYNAMICS</text>
          `;
    } else if (id === 'ATM-023') {
      // Distinct Dual Lifting Regimes: Frontal Wedge vs Orographic Mountain Lift
      leftTitle = 'TWO PRIMARY RAIN-LIFTING REGIMES: FRONTAL &amp; OROGRAPHIC';
      leftVisual = `
        <rect x="70" y="200" width="562" height="172" rx="6" fill="#EBF3F9" stroke="${PALETTE.blue}" />
        <text x="86" y="222" font-family="Noto Sans, sans-serif" font-size="12" font-weight="700" fill="${PALETTE.blue}">A. SYNOPTIC FRONTAL WEDGE LIFT</text>
        <polygon points="72,370 72,300 285,370" fill="#A3C4E0" stroke="${PALETTE.blue}" />
        <text x="140" y="352" font-family="Noto Sans, sans-serif" font-size="11.5" font-weight="700" fill="#1F3D5C" text-anchor="middle">Dense Cold Air</text>
        ${curvedArrow('M 295 352 Q 340 315 395 278', PALETTE.rust, 2.8)}
        ${cloudShape(430, 268, 0.7, '#DCE7F2', '#4B6378', true)}
        ${rainDrops(385, 290, 85, 70, 5, 2)}

        <rect x="70" y="388" width="562" height="172" rx="6" fill="#F2F6EE" stroke="${PALETTE.emerald}" />
        <text x="86" y="410" font-family="Noto Sans, sans-serif" font-size="12" font-weight="700" fill="${PALETTE.emerald}">B. OROGRAPHIC LIFT &amp; RAIN SHADOW</text>
        <polygon points="290,558 415,454 545,558" fill="#8B7D65" stroke="#5A5041" />
        ${curvedArrow('M 110,522 Q 225,512 325,456', PALETTE.cyan, 2.8)}
        ${cloudShape(345, 456, 0.68, '#D4E1EE', '#475D73', true)}
        ${rainDrops(290, 476, 90, 68, 5, 2)}
        ${calloutTag(538, 492, 'Dry Rain Shadow', PALETTE.ochre, '#FFFFFF', PALETTE.ochre)}
      `;
    } else if (id === 'ATM-024') {
      // Distinct Ocean Evaporation -> Land Freshwater Balance Budget
      leftTitle = 'GLOBAL OCEAN–LAND FRESHWATER DISTILLATION FLUX';
      leftVisual = `
        ${titledCard({ x: 82, y: 204, w: 235, h: 120, badge: '86% Source', title: 'Marine Evaporation', body: '~430,000 km³/yr distilled fresh vapor leaves salts in oceans.', accent: PALETTE.blue })}
        ${flowArrow(322, 264, 388, 264, PALETTE.cyan, 3.5)}
        ${titledCard({ x: 394, y: 204, w: 235, h: 120, badge: 'Vapor Export', title: 'Net Wind Transport', body: '~40,000 km³/yr pure vapor advects inland over coastal basins.', accent: PALETTE.cyan })}
        ${flowArrow(512, 328, 512, 378, PALETTE.emerald, 3.5)}
        ${titledCard({ x: 394, y: 384, w: 235, h: 120, badge: 'Watersheds', title: 'Land Precipitation', body: '~110,000 km³/yr replenishes rivers, lakes, crops, and aquifers.', accent: PALETTE.emerald })}
        ${flowArrow(388, 444, 322, 444, PALETTE.slate, 3.5)}
        ${titledCard({ x: 82, y: 384, w: 235, h: 120, badge: 'Runoff Loop', title: 'River Return Flow', body: '~40,000 km³/yr drains back to oceans, closing steady global balance.', accent: PALETTE.slate })}
        <text x="351" y="546" font-family="Noto Sans, sans-serif" font-size="12" font-weight="600" fill="${PALETTE.inkMuted}" text-anchor="middle">Natural solar distillation removes sea salts before clouds rain over continents.</text>
      `;
    } else if (kind === 'moisture-transport-winds') {
      leftTitle = 'ONSHORE MOISTURE ADVECTION &amp; LIFTING';
      leftVisual = `
        <rect x="70" y="212" width="562" height="330" rx="6" fill="#EBF3F9" stroke="${PALETTE.border}" />
        <rect x="70" y="458" width="245" height="84" fill="#2B6CB0" fill-opacity="0.75" />
        <path d="M 315 542 L 315 458 L 470 458 L 632 392 L 632 542 Z" fill="#BCA67E" />
        ${flowArrow(120, 418, 290, 418, PALETTE.cyan, 3)}
        ${curvedArrow('M 295 418 Q 390 402 480 298', PALETTE.blue, 3.2)}
        ${cloudShape(495, 268, 1.0, '#D4E1EE', '#475D73', true)}
        ${rainDrops(440, 298, 120, 125, 5, 3)}
        ${calloutTag(205, 394, 'Evaporative Marine Moisture', PALETTE.cyan, '#FFFFFF', PALETTE.cyan)}
        ${calloutTag(495, 198, 'Frontal / Orographic Uplift', PALETTE.blue, '#FFFFFF', PALETTE.blue)}
      `;
    } else if (kind === 'atmospheric-circulation-belts') {
      const isSeason = id === 'ATM-030';
      const isSynth = id === 'ATM-050';
      leftTitle = isSeason ? 'SEASONAL SOLAR TILT &amp; RAIN-BELT MIGRATION' : isSynth ? 'INTEGRATED EARTH-ATMOSPHERE SYSTEM MATRIX' : 'PLANETARY THREE-CELL WIND &amp; HEAT TRANSPORT';
      leftVisual = isSynth
        ? `
          ${cycleNodeRing(351, 370, 144, [
            { label: 'Solar Input', sub: 'Differential Heating', color: PALETTE.ochre },
            { label: 'Wind Circulation', sub: 'Hadley / Ferrel Cells', color: PALETTE.blue },
            { label: 'Hydrologic Flux', sub: 'Evap → Cloud → Rain', color: PALETTE.cyan },
            { label: 'Biosphere Renewal', sub: 'Soils &amp; Watersheds', color: PALETTE.emerald },
          ])}
          <text x="351" y="366" font-family="Liberation Serif, serif" font-size="11.5" font-weight="700" fill="${PALETTE.emerald}" text-anchor="middle">COUPLED</text>
          <text x="351" y="382" font-family="Liberation Serif, serif" font-size="11.5" font-weight="700" fill="${PALETTE.emerald}" text-anchor="middle">SYSTEM</text>
        `
        : isSeason
        ? `
          ${chartAxes({ x: 122, y: 208, w: 486, h: 300, xLabel: 'Annual Solar Calendar (23.4° Axial Tilt)', yLabel: 'Peak Rain-Belt Latitude', xTicks: ['Jan', 'Apr (Eqx)', 'Jul (Solstice)', 'Oct (Eqx)', 'Dec'], yTicks: ['15°S', '0°', '15°N', '25°N'] })}
          <path d="M 126 445 Q 250 385 368 242 Q 490 365 604 445" fill="none" stroke="${PALETTE.ochre}" stroke-width="3.5" />
          <line x1="122" y1="392" x2="608" y2="392" stroke="${PALETTE.cyan}" stroke-width="1.8" stroke-dasharray="5 4" />
          ${calloutTag(368, 228, 'July Monsoon / ITCZ Shifts North (+18°N)', PALETTE.ochre, '#FFFFFF', PALETTE.ochre)}
          ${calloutTag(240, 472, 'Jan Southern Summer Shift (−10°S)', PALETTE.blue, '#FFFFFF', PALETTE.blue)}
        `
        : `
          <circle cx="351" cy="370" r="168" fill="#D4E8F5" stroke="${PALETTE.blue}" stroke-width="2" />
          <ellipse cx="351" cy="370" rx="162" ry="38" fill="none" stroke="${PALETTE.ochre}" stroke-width="2" stroke-dasharray="6 4" />
          <text x="351" y="375" font-family="Noto Sans, sans-serif" font-size="12" font-weight="700" fill="${PALETTE.ochre}" text-anchor="middle">EQUATORIAL CONVERGENCE (ITCZ)</text>
          ${curvedArrow('M 235 347 Q 200 282 265 257', PALETTE.rust, 2.5)}
          ${curvedArrow('M 465 347 Q 500 282 435 257', PALETTE.rust, 2.5)}
          ${curvedArrow('M 245 402 Q 210 467 280 492', PALETTE.blue, 2.5)}
          ${curvedArrow('M 455 402 Q 490 467 420 492', PALETTE.blue, 2.5)}
          ${calloutTag(172, 292, 'Hadley Cell (0°–30°)', PALETTE.rust, '#FFFFFF', PALETTE.rust)}
          ${calloutTag(530, 292, 'Ferrel Cell (30°–60°)', PALETTE.emerald, '#FFFFFF', PALETTE.emerald)}
          ${calloutTag(351, 568, 'Jet Streams &amp; Trade Winds Redistribute Heat', PALETTE.slate, '#FFFFFF', PALETTE.slate)}
        `;
    } else {
      // ATM-031 Clouds as Atmospheric Bridge
      leftTitle = 'ATMOSPHERIC WATER BUDGET &amp; CLOUD BRIDGE (~12,900 km³)';
      leftVisual = `
        ${cycleNodeRing(351, 370, 144, [
          { label: 'Evaporation', sub: 'Oceans (~86%) &amp; Land', color: PALETTE.cyan },
          { label: 'Vapor Storage', sub: '~12,900 km³ (~9 d)', color: PALETTE.blue },
          { label: 'Condensation', sub: 'Cloud Nucleation', color: PALETTE.slate },
          { label: 'Precipitation', sub: '~505,000 km³/yr', color: PALETTE.emerald },
        ])}
        <text x="351" y="366" font-family="Liberation Serif, serif" font-size="11.5" font-weight="700" fill="${PALETTE.emerald}" text-anchor="middle">WATER</text>
        <text x="351" y="382" font-family="Liberation Serif, serif" font-size="11.5" font-weight="700" fill="${PALETTE.emerald}" text-anchor="middle">TURNOVER</text>
      `;
    }

    bodySvg = `
      ${cardBox({ x: 46, y: 142, w: 610, h: 456, fill: PALETTE.paperCard, stroke: PALETTE.emerald, strokeWidth: 1.4, accentTop: PALETTE.emerald })}
      <text x="351" y="162" font-family="Noto Sans, sans-serif" font-size="13.5" font-weight="700" fill="#FFFFFF" text-anchor="middle">${leftTitle}</text>
      ${leftVisual}
      ${cardBox({ x: 678, y: 142, w: 476, h: 456, fill: PALETTE.paperCard, stroke: PALETTE.gold, strokeWidth: 1.4, accentTop: PALETTE.gold })}
      <text x="916" y="162" font-family="Noto Sans, sans-serif" font-size="13.5" font-weight="700" fill="#FFFFFF" text-anchor="middle">SCIENTIFIC VARIABLES &amp; INTERPRETIVE BOUNDS</text>
      ${titledCard({ x: 700, y: 192, w: 432, h: 120, title: entry.scientific_topic, body: finding, accent: PALETTE.emerald })}
      ${titledCard({ x: 700, y: 326, w: 432, h: 120, title: 'Dynamic Atmospheric Role', body: enrichment?.whatItMeans ?? 'Measured atmospheric physics demonstrates coupled fluid and radiative behavior across scales.', accent: PALETTE.blue })}
      ${titledCard({ x: 700, y: 460, w: 432, h: 120, title: 'Scholarly Scope &amp; Guardrail', body: entry.limitations || 'Scriptural reflections highlight observable provision without claiming numerical hydrological constants.', accent: PALETTE.gold })}
      ${keyTakeawayStrip([
        { label: 'Planetary Integration', detail: 'Atmospheric circulation unites solar heat, marine evaporation, wind advection, and regional rain.', color: PALETTE.emerald },
        { label: 'Verified Consensus', detail: `Evidence Grade ${entry.evidence_grade} · ${entry.evidence_sources[0]?.author_or_institution ?? 'NOAA / NASA Earth Observatory'}.`, color: PALETTE.gold },
      ], 624)}
    `;
  }

  return buildPlateShell({
    title,
    subtitle: wrapLines(subtitle, 108, 1)[0],
    figureCode: id,
    discipline: 'Chapter 04 · Weather &amp; Atmospheric Science',
    bodySvg,
    footerNote: `Scientific Reference Plate ${id} · Science of Creation Encyclopedia · NOAA / NASA Reference Context`,
    accentColor: PALETTE.blue,
  });
}
