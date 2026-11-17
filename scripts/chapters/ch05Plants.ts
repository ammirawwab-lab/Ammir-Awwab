import {
  calloutTag,
  cardBox,
  chartAxes,
  curvedArrow,
  cycleNodeRing,
  flowArrow,
  hexagonCell,
  keyTakeawayStrip,
  leafShape,
  rainDrops,
  soilCutaway,
  titledCard,
} from '../lib/diagramPrimitives';
import { buildPlateShell, escXml, PALETTE, renderSvgTextLines, wrapLines } from '../lib/plateRenderer';
import type { RawDatasetEntry, TopicEnrichment } from '../../src/types/encyclopedia';

export function buildPlantsPlateSvg(entry: RawDatasetEntry, enrichment?: TopicEnrichment): string {
  const id = entry.id;
  const title = enrichment?.diagramTitle ?? entry.title;
  const subtitle = enrichment?.diagramCaption ?? entry.scientific_topic;
  const finding = entry.scientific_evidence.finding;
  const kind = (enrichment?.diagramKind ?? 'plant-growth-requirements') as string;
  let bodySvg = '';

  // 1. Photosynthesis, Vascular Transport & Core Growth Co-Factors (BOT-001, BOT-028, BOT-045, BOT-046)
  if (
    kind === 'plant-growth-requirements' ||
    kind === 'xylem-phloem-water-transport' ||
    kind === 'photosynthesis-light-co2'
  ) {
    if (kind === 'xylem-phloem-water-transport') {
      // BOT-045: Side-by-side Xylem (upward H2O/minerals) vs Phloem (bidirectional sucrose) vascular tubes
      bodySvg = `
        ${cardBox({ x: 46, y: 142, w: 620, h: 456, fill: '#F3F8F1', stroke: PALETTE.emerald, strokeWidth: 1.4, accentTop: PALETTE.emerald })}
        <text x="356" y="162" font-family="Noto Sans, sans-serif" font-size="13.5" font-weight="700" fill="#FFFFFF" text-anchor="middle">VASCULAR STEM TRANSPORT: XYLEM VS. PHLOEM PATHWAYS</text>
        <!-- Xylem vessel column -->
        <rect x="130" y="210" width="90" height="330" rx="12" fill="#D4EFF2" stroke="${PALETTE.cyan}" stroke-width="2.5" />
        <text x="175" y="198" font-family="Noto Sans, sans-serif" font-size="13.5" font-weight="700" fill="${PALETTE.cyan}" text-anchor="middle">XYLEM VESSELS</text>
        ${flowArrow(175, 515, 175, 232, PALETTE.blue, 3.8)}
        <text x="175" y="564" font-family="Noto Sans, sans-serif" font-size="12" font-weight="600" fill="${PALETTE.ink}" text-anchor="middle">Unidirectional Upward Flow</text>
        <text x="175" y="582" font-family="Noto Sans, sans-serif" font-size="11.5" fill="${PALETTE.inkMuted}" text-anchor="middle">(Water + Soil Minerals)</text>
        <!-- Transpiration pull leaf at top -->
        ${leafShape(200, 198, 108, 44, '#5A9647', '#2D5927')}
        <text x="310" y="256" font-family="Noto Sans, sans-serif" font-size="11.5" font-weight="700" fill="${PALETTE.olive}" text-anchor="middle">Stomatal Pull</text>
        <!-- Phloem sieve-tube column -->
        <rect x="440" y="210" width="90" height="330" rx="12" fill="#F3E5C0" stroke="${PALETTE.gold}" stroke-width="2.5" />
        <line x1="440" y1="315" x2="530" y2="315" stroke="${PALETTE.gold}" stroke-width="2" stroke-dasharray="4 4" />
        <line x1="440" y1="425" x2="530" y2="425" stroke="${PALETTE.gold}" stroke-width="2" stroke-dasharray="4 4" />
        <text x="485" y="198" font-family="Noto Sans, sans-serif" font-size="13.5" font-weight="700" fill="${PALETTE.gold}" text-anchor="middle">PHLOEM SIEVE TUBES</text>
        ${flowArrow(468, 250, 468, 495, PALETTE.ochre, 3.2)}
        ${flowArrow(504, 495, 504, 250, PALETTE.emerald, 3.2)}
        <text x="485" y="564" font-family="Noto Sans, sans-serif" font-size="12" font-weight="600" fill="${PALETTE.ink}" text-anchor="middle">Bidirectional Translocation</text>
        <text x="485" y="582" font-family="Noto Sans, sans-serif" font-size="11.5" fill="${PALETTE.inkMuted}" text-anchor="middle">(Photosynthetic Sugars · Source → Sink)</text>

        ${cardBox({ x: 688, y: 142, w: 466, h: 456, fill: PALETTE.paperCard, stroke: PALETTE.gold, strokeWidth: 1.4, accentTop: PALETTE.gold })}
        <text x="921" y="162" font-family="Noto Sans, sans-serif" font-size="13.5" font-weight="700" fill="#FFFFFF" text-anchor="middle">WATER FUNCTIONS INSIDE PLANT CELLS</text>
        ${titledCard({ x: 710, y: 192, w: 422, h: 120, title: 'Cohesion–Tension Pull', body: 'Hydrogen bonding lets continuous water columns rise up dead hollow xylem vessels from roots to tall canopies.', accent: PALETTE.cyan })}
        ${titledCard({ x: 710, y: 326, w: 422, h: 120, title: 'Turgor Pressure & Solute Carrier', body: 'Water inflates cell vacuoles to hold leaves toward light while transporting mineral ions and hormones.', accent: PALETTE.emerald })}
        ${titledCard({ x: 710, y: 460, w: 422, h: 120, title: 'Photosynthetic Electron Donor', body: 'Inside thylakoids, water splits (2H₂O → O₂ + 4H⁺ + 4e⁻) to power glucose synthesis.', accent: PALETTE.gold })}
      `;
    } else if (kind === 'photosynthesis-light-co2') {
      // BOT-046: Chloroplast & Leaf Stomata Reaction Schematic
      bodySvg = `
        ${cardBox({ x: 46, y: 142, w: 620, h: 456, fill: '#F1F7EF', stroke: PALETTE.olive, strokeWidth: 1.4, accentTop: PALETTE.olive })}
        <text x="356" y="162" font-family="Noto Sans, sans-serif" font-size="13.5" font-weight="700" fill="#FFFFFF" text-anchor="middle">PHOTOSYNTHESIS INSIDE LEAF CHLOROPLASTS</text>
        <ellipse cx="356" cy="348" rx="235" ry="125" fill="#DFEAD5" stroke="#2D5927" stroke-width="2.5" />
        <ellipse cx="356" cy="348" rx="220" ry="112" fill="#F2F8ED" stroke="#4B6B38" stroke-width="1.2" stroke-dasharray="5 3" />
        <!-- Thylakoid stacks vs Calvin cycle -->
        <rect x="195" y="290" width="120" height="115" rx="8" fill="#5A9647" fill-opacity="0.25" stroke="#2D5927" stroke-width="1.5" />
        <text x="255" y="318" font-family="Noto Sans, sans-serif" font-size="13" font-weight="700" fill="#1F421A" text-anchor="middle">Thylakoid Stacks</text>
        <text x="255" y="340" font-family="Noto Sans, sans-serif" font-size="11.5" fill="${PALETTE.ink}" text-anchor="middle">Light + H₂O → ATP + NADPH</text>
        <text x="255" y="362" font-family="Noto Sans, sans-serif" font-size="12" font-weight="700" fill="${PALETTE.blue}" text-anchor="middle">+ O₂ Released</text>
        ${flowArrow(322, 348, 392, 348, PALETTE.emerald, 2.8)}
        <circle cx="465" cy="348" r="64" fill="#F7E7CA" stroke="${PALETTE.ochre}" stroke-width="1.8" />
        <text x="465" y="336" font-family="Noto Sans, sans-serif" font-size="13" font-weight="700" fill="${PALETTE.ochre}" text-anchor="middle">Calvin Cycle</text>
        <text x="465" y="356" font-family="Noto Sans, sans-serif" font-size="11.5" fill="${PALETTE.ink}" text-anchor="middle">CO₂ → C₆H₁₂O₆</text>
        <text x="465" y="374" font-family="Noto Sans, sans-serif" font-size="11" fill="${PALETTE.inkMuted}" text-anchor="middle">(Stroma Glucose)</text>
        <circle cx="105" cy="222" r="24" fill="#F2B949" stroke="#C98316" />
        ${flowArrow(132, 238, 215, 290, PALETTE.ochre, 2.8)}
        <text x="356" y="528" font-family="Liberation Serif, serif" font-size="16" font-weight="700" fill="${PALETTE.emerald}" text-anchor="middle">6 CO₂ + 6 H₂O + Light Energy → C₆H₁₂O₆ (Sugar) + 6 O₂</text>
        <text x="356" y="556" font-family="Noto Sans, sans-serif" font-size="12" fill="${PALETTE.inkMuted}" text-anchor="middle">Red (640–680 nm) and Blue (430–460 nm) wavelengths power chlorophyll a &amp; b absorption.</text>

        ${cardBox({ x: 688, y: 142, w: 466, h: 456, fill: PALETTE.paperCard, stroke: PALETTE.gold, strokeWidth: 1.4, accentTop: PALETTE.gold })}
        <text x="921" y="162" font-family="Noto Sans, sans-serif" font-size="13.5" font-weight="700" fill="#FFFFFF" text-anchor="middle">SOLAR CONVERSION &amp; STOMATAL REGULATION</text>
        ${titledCard({ x: 710, y: 192, w: 422, h: 120, title: 'Photons Drive Primary Productivity', body: 'Sunlight powers almost every terrestrial crop and forest food web on Earth through leaf chlorophyll.', accent: PALETTE.ochre })}
        ${titledCard({ x: 710, y: 326, w: 422, h: 120, title: 'Stomatal Gas Exchange Trade-off', body: 'Microscopic leaf stomata open to admit atmospheric CO₂ while losing moisture by transpiration.', accent: PALETTE.blue })}
        ${titledCard({ x: 710, y: 460, w: 422, h: 120, title: 'Scientific Guardrail', body: 'Light cannot fix carbon alone without adequate root water, soil minerals, and enzyme temperature limits.', accent: PALETTE.gold })}
      `;
    } else {
      // BOT-001 vs BOT-028: Multi-Factor Growth Web vs Earth Crop Nutrient Cycle
      const isEarthCrop = id === 'BOT-028';
      bodySvg = `
        ${cardBox({ x: 46, y: 142, w: 610, h: 456, fill: '#F4F8F1', stroke: PALETTE.emerald, strokeWidth: 1.4, accentTop: PALETTE.emerald })}
        <text x="351" y="162" font-family="Noto Sans, sans-serif" font-size="13.5" font-weight="700" fill="#FFFFFF" text-anchor="middle">${isEarthCrop ? 'SOIL NUTRIENT EXCHANGE &amp; BIOMASS HARVEST' : 'FIVE ESSENTIAL ENVIRONMENTAL CO-FACTORS'}</text>
        ${
          isEarthCrop
            ? `
              ${soilCutaway(82, 412, 538, 155, true)}
              <rect x="342" y="248" width="16" height="170" fill="#4D7E3E" />
              ${leafShape(356, 272, 118, 48, '#5A9647', '#2D5927')}
              ${leafShape(226, 290, 116, 48, '#4F8A45', '#2D5927')}
              <path d="M 350 415 Q 290 465 260 518 M 350 415 Q 352 475 350 532 M 350 415 Q 412 465 445 516" fill="none" stroke="#DFC798" stroke-width="3" />
              ${calloutTag(205, 456, 'Nitrate (NO₃⁻), Phosphate &amp; K⁺', PALETTE.ochre, '#FFFFFF', PALETTE.ochre)}
              ${calloutTag(495, 456, 'Symbiotic Soil Microbiota', PALETTE.emerald, '#FFFFFF', PALETTE.emerald)}
              ${calloutTag(351, 224, 'Edible Grains, Tubers &amp; Foliage', PALETTE.olive, '#FFFFFF', PALETTE.olive)}
            `
            : `
              ${cycleNodeRing(351, 370, 142, [
                { label: 'Sunlight (PAR)', sub: '400–700 nm Photons', color: PALETTE.ochre },
                { label: 'Liquid Water', sub: 'Turgor &amp; Electron Donor', color: PALETTE.cyan },
                { label: 'Carbon Dioxide', sub: 'Stomatal Carbon Source', color: PALETTE.slate },
                { label: 'Mineral Nutrients', sub: 'Soil N, P, K, Mg, Fe', color: PALETTE.olive },
                { label: 'Temperature &amp; Genetics', sub: 'Enzyme Optimum Range', color: PALETTE.emerald },
              ])}
              <text x="351" y="366" font-family="Liberation Serif, serif" font-size="14" font-weight="700" fill="${PALETTE.emerald}" text-anchor="middle">PLANT</text>
              <text x="351" y="384" font-family="Liberation Serif, serif" font-size="14" font-weight="700" fill="${PALETTE.emerald}" text-anchor="middle">GROWTH</text>
            `
        }
        ${cardBox({ x: 678, y: 142, w: 476, h: 456, fill: PALETTE.paperCard, stroke: PALETTE.gold, strokeWidth: 1.4, accentTop: PALETTE.gold })}
        <text x="916" y="162" font-family="Noto Sans, sans-serif" font-size="13.5" font-weight="700" fill="#FFFFFF" text-anchor="middle">BOTANICAL PHYSIOLOGY &amp; BOUNDARIES</text>
        ${titledCard({ x: 700, y: 192, w: 432, h: 120, title: entry.scientific_topic, body: finding, accent: PALETTE.emerald })}
        ${titledCard({ x: 700, y: 326, w: 432, h: 120, title: 'Liebig’s Law of the Minimum', body: 'Plant yield is paced by whichever essential factor (water, nitrogen, phosphorus, or light) is scarcest.', accent: PALETTE.olive })}
        ${titledCard({ x: 700, y: 460, w: 432, h: 120, title: 'Editorial Scope', body: entry.limitations || 'Descriptive texts highlight vegetation richness alongside co-occurring biological and soil conditions.', accent: PALETTE.gold })}
      `;
    }
    bodySvg += keyTakeawayStrip([
      { label: 'Botanical Integration', detail: finding, color: PALETTE.emerald },
      { label: 'Reference Standard', detail: `Evidence Grade ${entry.evidence_grade} · FAO / RHS / OpenStax Botany.`, color: PALETTE.gold },
    ], 624);

  // 2. Seeds, Embryo Anatomy & Germination (BOT-002, BOT-003, BOT-004, BOT-047)
  } else if (kind === 'seed-germination-stages' || kind === 'seed-anatomy-embryo') {
    if (kind === 'seed-anatomy-embryo') {
      // BOT-004: Wheat Caryopsis Grain vs Date Palm Pit cross-section
      bodySvg = `
        ${cardBox({ x: 46, y: 142, w: 540, h: 456, fill: '#FAF6EC', stroke: PALETTE.ochre, strokeWidth: 1.4, accentTop: PALETTE.ochre })}
        <text x="316" y="162" font-family="Noto Sans, sans-serif" font-size="13.5" font-weight="700" fill="#FFFFFF" text-anchor="middle">MONOCOT CEREAL GRAIN (WHEAT CARYOPSIS)</text>
        <ellipse cx="265" cy="365" rx="115" ry="155" fill="#F2DFA8" stroke="#8E6B23" stroke-width="3" />
        <ellipse cx="265" cy="335" rx="95" ry="110" fill="#FFF9E6" stroke="#B59348" stroke-width="1.5" />
        <text x="265" y="335" font-family="Noto Sans, sans-serif" font-size="14" font-weight="700" fill="${PALETTE.ink}" text-anchor="middle">Starchy Endosperm</text>
        <text x="265" y="355" font-family="Noto Sans, sans-serif" font-size="11.5" fill="${PALETTE.inkMuted}" text-anchor="middle">(Energy Reserves)</text>
        <ellipse cx="242" cy="465" rx="46" ry="36" fill="#D7EAE2" stroke="${PALETTE.emerald}" stroke-width="2" />
        <text x="242" y="469" font-family="Noto Sans, sans-serif" font-size="12" font-weight="700" fill="${PALETTE.emerald}" text-anchor="middle">Embryo (Germ)</text>
        ${calloutTag(460, 265, 'Pericarp + Seed Coat (Bran)', PALETTE.ochre, '#FFFFFF', PALETTE.ochre)}
        ${calloutTag(465, 395, 'Aleurone Protein Layer', PALETTE.gold, '#FFFFFF', PALETTE.gold)}
        ${calloutTag(465, 485, 'Scutellum + Radicle Axis', PALETTE.emerald, '#FFFFFF', PALETTE.emerald)}

        ${cardBox({ x: 614, y: 142, w: 540, h: 456, fill: '#FAF6EC', stroke: PALETTE.emerald, strokeWidth: 1.4, accentTop: PALETTE.emerald })}
        <text x="884" y="162" font-family="Noto Sans, sans-serif" font-size="13.5" font-weight="700" fill="#FFFFFF" text-anchor="middle">WOODY PALM ENDOSPERM (DATE PIT / DICOT CONTRAST)</text>
        <ellipse cx="825" cy="365" rx="78" ry="155" fill="#B88952" stroke="#5C3D1E" stroke-width="3" />
        <ellipse cx="825" cy="365" rx="64" ry="138" fill="#E3CEAB" stroke="#855E34" stroke-width="1.5" />
        <circle cx="882" cy="365" r="18" fill="#5A9647" stroke="#2D5927" stroke-width="2" />
        <text x="825" y="365" font-family="Noto Sans, sans-serif" font-size="13" font-weight="700" fill="${PALETTE.ink}" text-anchor="middle">Dense Hemicellulose</text>
        <text x="825" y="384" font-family="Noto Sans, sans-serif" font-size="11.5" fill="${PALETTE.inkMuted}" text-anchor="middle">Endosperm</text>
        ${calloutTag(1015, 295, 'Hard Protective Pit', PALETTE.rust, '#FFFFFF', PALETTE.rust)}
        ${calloutTag(1015, 372, 'Dorsal Embryo Pore', PALETTE.emerald, '#FFFFFF', PALETTE.emerald)}
        ${calloutTag(1015, 455, 'Cotyledon / Shoot Axis', PALETTE.blue, '#FFFFFF', PALETTE.blue)}
      `;
    } else {
      const mode = id === 'BOT-002' ? 'roots' : id === 'BOT-047' ? 'cycle' : 'imbibition';
      bodySvg = `
        <rect x="46" y="142" width="1108" height="456" rx="8" fill="#F5F7F0" stroke="${PALETTE.border}" stroke-width="1.2" />
        ${
          mode === 'cycle'
            ? `
              ${cycleNodeRing(350, 370, 140, [
                { label: 'Mature Seed Dispersal', sub: 'Wind, Water, Animals', color: PALETTE.ochre },
                { label: 'Dormancy Bank', sub: 'Viability Over Years', color: PALETTE.slate },
                { label: 'Germination', sub: 'H₂O + O₂ + Warmth', color: PALETTE.blue },
                { label: 'Flowering &amp; Seed Set', sub: 'Generational Renewal', color: PALETTE.emerald },
              ])}
              ${titledCard({ x: 675, y: 175, w: 452, h: 120, title: 'Protective Embryo Arrest', body: 'Low metabolic moisture lets dormant embryos survive frost or dry seasons until conditions align.', accent: PALETTE.slate })}
              ${titledCard({ x: 675, y: 310, w: 452, h: 120, title: 'Seedling Establishment', body: 'Stored endosperm fuels roots and true leaves before plants synthesize independent sugars.', accent: PALETTE.olive })}
              ${titledCard({ x: 675, y: 445, w: 452, h: 120, title: 'Generational Continuity', body: 'Seed structures bridge parent generations across environments and years.', accent: PALETTE.emerald })}
            `
            : mode === 'roots'
            ? `
              ${cardBox({ x: 72, y: 168, w: 506, h: 404, fill: PALETTE.paperCard, stroke: PALETTE.cyan, strokeWidth: 1.4, accentTop: PALETTE.cyan })}
              <text x="325" y="188" font-family="Noto Sans, sans-serif" font-size="13" font-weight="700" fill="#FFFFFF" text-anchor="middle">1. RADICLE &amp; ROOT HAIR OSMOTIC ABSORPTION</text>
              ${soilCutaway(98, 285, 454, 175, true)}
              <path d="M 325 225 L 325 432" stroke="#EAD4A6" stroke-width="14" stroke-linecap="round" />
              <path d="M 318 320 L 258 338 M 318 360 L 245 380 M 332 332 L 392 350 M 332 375 L 402 394" stroke="#F7E8C6" stroke-width="3" stroke-linecap="round" />
              ${flowArrow(215, 345, 295, 345, PALETTE.cyan, 2.8)}
              ${calloutTag(185, 322, 'H₂O + Mineral Ion Uptake', PALETTE.cyan, '#FFFFFF', PALETTE.cyan)}
              ${calloutTag(440, 415, 'Positive Gravitropism (Anchorage)', PALETTE.ochre, '#FFFFFF', PALETTE.ochre)}
              <rect x="98" y="476" width="454" height="76" rx="4" fill="#EDF5F9" />
              ${renderSvgTextLines(wrapLines('Microscopic root hairs expand surface area up to 10× while positive gravitropism guides roots down into moist soil horizons.', 58, 3), 112, 500, 18, { fontSize: 12, fill: PALETTE.ink })}

              ${cardBox({ x: 622, y: 168, w: 506, h: 404, fill: PALETTE.paperCard, stroke: PALETTE.emerald, strokeWidth: 1.4, accentTop: PALETTE.emerald })}
              <text x="875" y="188" font-family="Noto Sans, sans-serif" font-size="13" font-weight="700" fill="#FFFFFF" text-anchor="middle">2. SHOOT APICAL MERISTEM &amp; PHOTOTROPISM</text>
              <circle cx="715" cy="238" r="22" fill="#F2B949" stroke="#C98316" stroke-width="1.5" />
              ${flowArrow(742, 248, 825, 280, PALETTE.ochre, 2.8)}
              <path d="M 875 452 Q 872 365 848 292" fill="none" stroke="#3D7A37" stroke-width="12" stroke-linecap="round" />
              ${leafShape(848, 286, 78, 34, '#5A9647', '#2D5927')}
              ${leafShape(770, 296, 78, 34, '#4F8A45', '#2D5927')}
              ${calloutTag(995, 286, 'Auxin Bends Stem Toward Light', PALETTE.emerald, '#FFFFFF', PALETTE.emerald)}
              ${calloutTag(980, 385, 'Hypocotyl / Epicotyl Lift', PALETTE.olive, '#FFFFFF', PALETTE.olive)}
              <rect x="648" y="476" width="454" height="76" rx="4" fill="#EEF5EC" />
              ${renderSvgTextLines(wrapLines('Upward shoot growth deploys blue-light phototropin sensors so young leaves capture solar PAR photons immediately above ground.', 58, 3), 662, 500, 18, { fontSize: 12, fill: PALETTE.ink })}
            `
            : `
              ${[
                { label: '1. Dormant Seed', sub: 'Dry seed coat shelters quiescent embryo; requires H₂O + O₂.', x: 70, radicle: 0, shoot: 0 },
                { label: '2. Imbibition &amp; Rupture', sub: 'Water uptake swells cells; hormones activate enzymes &amp; crack testa.', x: 344, radicle: 18, shoot: 0 },
                { label: '3. Radicle Anchoring', sub: 'Positive gravitropism guides primary root downward for moisture.', x: 618, radicle: 58, shoot: 18 },
                { label: '4. Shoot Emergence', sub: 'Phototropic stem pushes above soil to unfurl green cotyledons.', x: 892, radicle: 82, shoot: 78 },
              ]
                .map(
                  (st) => `
                  ${cardBox({ x: st.x, y: 165, w: 254, h: 412, fill: PALETTE.paperCard, stroke: PALETTE.olive, strokeWidth: 1.3, accentTop: PALETTE.olive })}
                  <text x="${st.x + 127}" y="185" font-family="Noto Sans, sans-serif" font-size="12.5" font-weight="700" fill="#FFFFFF" text-anchor="middle">${st.label}</text>
                  ${soilCutaway(st.x + 16, 330, 222, 132, st.radicle > 0)}
                  <ellipse cx="${st.x + 127}" cy="368" rx="22" ry="13" fill="#C9A258" stroke="#6B4D1E" stroke-width="2" />
                  ${st.radicle > 0 ? `<path d="M ${st.x + 127} 381 Q ${st.x + 122} ${381 + st.radicle * 0.6} ${st.x + 127} ${381 + st.radicle}" fill="none" stroke="#EAD4A6" stroke-width="3.5" stroke-linecap="round" />` : ''}
                  ${st.shoot > 0 ? `<path d="M ${st.x + 127} 355 Q ${st.x + 131} ${355 - st.shoot * 0.5} ${st.x + 127} ${355 - st.shoot}" fill="none" stroke="#4F8A45" stroke-width="4" stroke-linecap="round" />` : ''}
                  ${st.shoot > 50 ? leafShape(st.x + 127, 260, 44, 22, '#5A9647', '#2D5927') + leafShape(st.x + 83, 264, 44, 22, '#4F8A45', '#2D5927') : ''}
                  <rect x="${st.x + 16}" y="476" width="222" height="86" rx="4" fill="#F2EFE4" />
                  ${renderSvgTextLines(wrapLines(st.sub, 30, 4), st.x + 26, 498, 17, { fontSize: 12, fill: PALETTE.ink })}
                `
                )
                .join('')}
            `
        }
      `;
    }
    bodySvg += keyTakeawayStrip([
      { label: 'Embryonic & Seed Finding', detail: finding, color: PALETTE.olive },
      { label: 'Scientific Context', detail: 'Imbibition, enzymatic mobilization, oxygen access, and soil porosity govern seedling success.', color: PALETTE.emerald },
    ], 624);

  // 3. Crops, Cereals, Soil & Drought Stress (BOT-005, 006, 026, 027, 029, 030, 031, 032, 049)
  } else if (
    kind === 'crop-growth-stages' ||
    kind === 'cereal-grain-structures' ||
    kind === 'soil-layers-root-interaction' ||
    kind === 'plant-water-drought-stress'
  ) {
    if (kind === 'cereal-grain-structures') {
      const isHumanFood = id === 'BOT-027';
      bodySvg = `
        ${cardBox({ x: 46, y: 142, w: 620, h: 456, fill: '#FAF6EC', stroke: PALETTE.gold, strokeWidth: 1.4, accentTop: PALETTE.gold })}
        <text x="356" y="162" font-family="Noto Sans, sans-serif" font-size="13.5" font-weight="700" fill="#FFFFFF" text-anchor="middle">${isHumanFood ? 'WHOLE GRAIN ANATOMY &amp; HUMAN DIETARY ENERGY' : 'CLUSTERED SPIKELET ARCHITECTURE (WHEAT EAR &amp; RICE PANICLE)'}</text>
        ${
          isHumanFood
            ? `
              <rect x="85" y="218" width="540" height="58" rx="6" fill="#E3CEAB" stroke="#855E34" />
              <text x="105" y="252" font-family="Noto Sans, sans-serif" font-size="13.5" font-weight="700" fill="${PALETTE.ink}">1. Outer Bran Layers (~14%): Dietary Fiber, B-Vitamins &amp; Iron</text>
              <rect x="85" y="294" width="540" height="82" rx="6" fill="#FFF7DF" stroke="#B89446" />
              <text x="105" y="330" font-family="Noto Sans, sans-serif" font-size="13.5" font-weight="700" fill="${PALETTE.ink}">2. Starchy Endosperm (~83%): Complex Carbohydrates &amp; Storage Proteins</text>
              <text x="105" y="354" font-family="Noto Sans, sans-serif" font-size="12" fill="${PALETTE.inkMuted}">Supplies &gt;45% of global human caloric intake via wheat, rice &amp; maize.</text>
              <rect x="85" y="394" width="540" height="58" rx="6" fill="#D7EAE2" stroke="${PALETTE.emerald}" />
              <text x="105" y="428" font-family="Noto Sans, sans-serif" font-size="13.5" font-weight="700" fill="${PALETTE.emerald}">3. Lipid-Rich Embryo Germ (~3%): Vitamin E, Folate &amp; Essential Oils</text>
            `
            : `
              <!-- Wheat Spike Stem + Alternating Spikelets -->
              <line x1="210" y1="540" x2="210" y2="215" stroke="#857142" stroke-width="4" />
              ${[0, 1, 2, 3, 4, 5].map((i) => {
                const y = 235 + i * 42;
                return `<ellipse cx="192" cy="${y}" rx="16" ry="10" transform="rotate(-25 192 ${y})" fill="#DFC37A" stroke="#7A5F24" stroke-width="1.4" />
                  <ellipse cx="228" cy="${y + 16}" rx="16" ry="10" transform="rotate(25 228 ${y + 16})" fill="#DFC37A" stroke="#7A5F24" stroke-width="1.4" />`;
              }).join('')}
              <text x="210" y="568" font-family="Noto Sans, sans-serif" font-size="13" font-weight="700" fill="${PALETTE.ink}" text-anchor="middle">Wheat / Barley Ear (Compact Spike)</text>
              <!-- Rice Panicle branching -->
              <line x1="485" y1="540" x2="485" y2="335" stroke="#5E7A40" stroke-width="4" />
              <path d="M 485 335 Q 435 280 415 240 M 485 335 Q 485 265 488 220 M 485 335 Q 540 285 562 245" fill="none" stroke="#6E8C49" stroke-width="2.5" />
              ${[415, 488, 562].map((px, i) => `<circle cx="${px}" cy="${240 + (i === 1 ? -15 : 5)}" r="7" fill="#E3C776" stroke="#7A5F24" /><circle cx="${px - 10}" cy="${270}" r="7" fill="#E3C776" stroke="#7A5F24" />`).join('')}
              <text x="485" y="568" font-family="Noto Sans, sans-serif" font-size="13" font-weight="700" fill="${PALETTE.ink}" text-anchor="middle">Rice / Oat Panicle (Branched Clusters)</text>
            `
        }
        ${cardBox({ x: 688, y: 142, w: 466, h: 456, fill: PALETTE.paperCard, stroke: PALETTE.emerald, strokeWidth: 1.4, accentTop: PALETTE.emerald })}
        <text x="921" y="162" font-family="Noto Sans, sans-serif" font-size="13.5" font-weight="700" fill="#FFFFFF" text-anchor="middle">CEREAL MORPHOLOGY &amp; TAFSIR CAUTION</text>
        ${titledCard({ x: 710, y: 192, w: 422, h: 120, title: 'Dry Non-Dehiscent Fruit (Caryopsis)', body: 'Cereal grains fuse seed coat directly to the fruit wall, yielding compact energy-dense harvests.', accent: PALETTE.gold })}
        ${titledCard({ x: 710, y: 326, w: 422, h: 120, title: 'High Caloric Yield Density', body: 'Dense spikelet clustering permits compact harvesting and long-term dry grain storage across seasons.', accent: PALETTE.emerald })}
        ${titledCard({ x: 710, y: 460, w: 422, h: 120, title: 'Lexical & Context Boundary', body: entry.limitations || 'Verify Arabic "habban mutarakiban" against classical tafsir rather than imposing botanical jargon.', accent: PALETTE.rust })}
      `;
    } else if (kind === 'crop-growth-stages') {
      const mode = id === 'BOT-005' ? 'phenology' : id === 'BOT-026' ? 'foodweb' : 'seasons';
      bodySvg = `
        ${cardBox({ x: 46, y: 142, w: 1108, h: 456, fill: PALETTE.paperCard, stroke: PALETTE.olive, strokeWidth: 1.4, accentTop: PALETTE.olive })}
        <text x="600" y="162" font-family="Noto Sans, sans-serif" font-size="13.5" font-weight="700" fill="#FFFFFF" text-anchor="middle">${mode === 'phenology' ? 'CEREAL PHENOLOGY: VEGETATIVE GREEN SHOOT TO GRAIN FILLING' : mode === 'foodweb' ? 'AGRICULTURAL CROPS &amp; HUMAN FOOD-SYSTEM FOUNDATION' : 'PHOTOPERIOD, VERNALIZATION &amp; SEASONAL CROP CYCLES'}</text>
        ${
          mode === 'phenology'
            ? `
              ${[
                { n: '1. Germination', d: 'Radicle &amp; coleoptile emerge; root establishment.', h: 65, c: '#7AB362' },
                { n: '2. Vegetative Leafing', d: 'Green foliage harvests sunlight &amp; fixes CO₂ sugars.', h: 135, c: '#5A9647' },
                { n: '3. Booting &amp; Flowering', d: 'Meristem shifts from leaf production to floral spikes.', h: 185, c: '#3D7A37' },
                { n: '4. Grain Filling', d: 'Phloem redirects starch &amp; protein into golden kernels.', h: 215, c: '#C8A253' },
              ]
                .map((st, i) => {
                  const x = 82 + i * 265;
                  return `<rect x="${x}" y="${430 - st.h}" width="235" height="${st.h}" rx="5" fill="${st.c}" fill-opacity="0.88" />
                    <text x="${x + 117}" y="462" font-family="Noto Sans, sans-serif" font-size="13.5" font-weight="700" fill="${PALETTE.ink}" text-anchor="middle">${st.n}</text>
                    ${renderSvgTextLines(wrapLines(st.d, 28, 3), x + 117, 486, 17, { fontSize: 12, fill: PALETTE.inkMuted, anchor: 'middle' })}`;
                })
                .join('')}
            `
            : mode === 'foodweb'
            ? `
              ${titledCard({ x: 80, y: 205, w: 320, h: 170, badge: 'Staple Cereals', title: 'Wheat, Rice, Maize &amp; Millet', body: 'Starchy monocot grains supply baseline human calories across civilizations.', accent: PALETTE.ochre })}
              ${titledCard({ x: 440, y: 205, w: 320, h: 170, badge: 'Pulses &amp; Oils', title: 'Lentils, Chickpeas &amp; Olives', body: 'Symbiotic nitrogen-fixing legumes &amp; oil crops balance amino acids and lipids.', accent: PALETTE.emerald })}
              ${titledCard({ x: 800, y: 205, w: 320, h: 170, badge: 'Horticulture', title: 'Dates, Figs, Grapes &amp; Citrus', body: 'Perennial orchards supply dietary micronutrients, potassium &amp; phytochemicals.', accent: PALETTE.blue })}
              <rect x="80" y="405" width="1040" height="162" rx="6" fill="#F2F6EE" stroke="${PALETTE.olive}" />
              ${renderSvgTextLines(wrapLines('Agronomic Yield Equation: Photosynthetic Sunlight × Soil Fertility × Irrigation Reliability × Cultivar Selection × Pest Stewardship.', 76, 3), 600, 456, 22, { fontSize: 14, fontWeight: 700, fill: PALETTE.emerald, anchor: 'middle' })}
              <text x="600" y="538" font-family="Noto Sans, sans-serif" font-size="12.5" fill="${PALETTE.inkMuted}" text-anchor="middle">Human harvest nutrition combines diverse crop groups rather than any single plant species.</text>
            `
            : `
              ${chartAxes({ x: 134, y: 210, w: 506, h: 295, xLabel: 'Annual Seasonal Progression', yLabel: 'Biomass / Growth Activity', xTicks: ['Winter (Dormant)', 'Spring Sprout', 'Summer Canopy', 'Autumn'], yTicks: ['Low', 'Moderate', 'Peak'], yLabelOffset: 68 })}
              <path d="M 138 475 C 218 470, 280 300, 390 232 C 468 220, 550 305, 634 415" fill="none" stroke="${PALETTE.emerald}" stroke-width="3.5" />
              ${calloutTag(390, 212, 'Long-Day Summer Biomass Peak', PALETTE.emerald, '#FFFFFF', PALETTE.emerald)}
              ${titledCard({ x: 700, y: 210, w: 420, h: 145, title: 'Phytochrome &amp; Day-Length Clocks', body: 'Plants measure night duration to synchronize spring leafout, flowering, and seed ripening with climate.', accent: PALETTE.blue })}
              ${titledCard({ x: 700, y: 375, w: 420, h: 145, title: 'Vernalization Chilling', body: 'Winter wheat and stone fruits require sustained winter chill hours before unlocking fertile spring blooms.', accent: PALETTE.ochre })}
            `
        }
      `;
    } else if (kind === 'soil-layers-root-interaction') {
      const isCompare = id === 'BOT-030';
      bodySvg = `
        ${cardBox({ x: 46, y: 142, w: 610, h: 456, fill: PALETTE.paperCard, stroke: PALETTE.ochre, strokeWidth: 1.4, accentTop: PALETTE.ochre })}
        <text x="351" y="162" font-family="Noto Sans, sans-serif" font-size="13.5" font-weight="700" fill="#FFFFFF" text-anchor="middle">${isCompare ? 'SOIL TEXTURE &amp; PH CONTROL ON VEGETATION TYPES' : 'SOIL HORIZONS &amp; RHIZOSPHERE INTERACTION'}</text>
        ${
          isCompare
            ? `
              ${titledCard({ x: 74, y: 196, w: 554, h: 110, badge: 'Well-Drained Sandy / Saline', title: 'Date Palms, Tamarix &amp; Desert Halophytes', body: 'Coarse pores drain fast; deep roots tolerate lower organic humus &amp; alkaline minerals.', accent: PALETTE.ochre })}
              ${titledCard({ x: 74, y: 320, w: 554, h: 110, badge: 'Fertile Alluvial Loam', title: 'Wheat, Vegetables, Orchard Vines &amp; Clover', body: 'Balanced sand-silt-clay matrix optimizes air porosity alongside capillary water &amp; nutrient retention.', accent: PALETTE.emerald })}
              ${titledCard({ x: 74, y: 444, w: 554, h: 110, badge: 'Heavy Hydric Clay', title: 'Paddy Rice, Reeds &amp; Floodplain Willows', body: 'Fine clay platelets hold standing surface moisture suited to hypoxia-tolerant wetland roots.', accent: PALETTE.blue })}
            `
            : `
              <rect x="74" y="196" width="554" height="58" fill="#3B3124" /><text x="94" y="230" font-family="Noto Sans, sans-serif" font-size="13" font-weight="700" fill="#F1EBE0">O Horizon (Leaf Litter &amp; Decomposing Organic Humus)</text>
              <rect x="74" y="254" width="554" height="86" fill="#5E4632" /><text x="94" y="286" font-family="Noto Sans, sans-serif" font-size="13" font-weight="700" fill="#FFFFFF">A Horizon (Topsoil · Dense Fine Roots, Earthworms &amp; Fungi)</text>
              <rect x="74" y="340" width="554" height="106" fill="#8C6747" /><text x="94" y="376" font-family="Noto Sans, sans-serif" font-size="13" font-weight="700" fill="#FFFFFF">B Horizon (Subsoil · Leached Clay Minerals &amp; Deep Taproots)</text>
              <rect x="74" y="446" width="554" height="122" fill="#8D8B84" /><text x="94" y="486" font-family="Noto Sans, sans-serif" font-size="13" font-weight="700" fill="#FFFFFF">C Horizon (Weathered Parent Bedrock Supplying Minerals)</text>
            `
        }
        ${cardBox({ x: 678, y: 142, w: 476, h: 456, fill: PALETTE.paperCard, stroke: PALETTE.emerald, strokeWidth: 1.4, accentTop: PALETTE.emerald })}
        <text x="916" y="162" font-family="Noto Sans, sans-serif" font-size="13.5" font-weight="700" fill="#FFFFFF" text-anchor="middle">LIVING SOIL ECOLOGY &amp; BOUNDARIES</text>
        ${titledCard({ x: 700, y: 192, w: 432, h: 120, title: 'Mycorrhizal Fungal Symbiosis', body: 'Microscopic fungal hyphae multiply root absorptive area for phosphorus and trace zinc uptake.', accent: PALETTE.emerald })}
        ${titledCard({ x: 700, y: 326, w: 432, h: 120, title: 'Nitrogen-Fixing Bacteria', body: 'Rhizobium nodules convert inert atmospheric N₂ into plant-usable ammonium inside legume roots.', accent: PALETTE.blue })}
        ${titledCard({ x: 700, y: 460, w: 432, h: 120, title: 'Soil-Free Exceptions', body: 'Epiphytic orchids and aquatic duckweeds absorb nutrients directly from rain or water without topsoil.', accent: PALETTE.gold })}
      `;
    } else {
      // BOT-031 vs BOT-049 drought stress & rain dependency
      const isDryRevival = id === 'BOT-031';
      bodySvg = `
        ${cardBox({ x: 46, y: 142, w: 620, h: 456, fill: PALETTE.paperCard, stroke: PALETTE.rust, strokeWidth: 1.4, accentTop: PALETTE.rust })}
        <text x="356" y="162" font-family="Noto Sans, sans-serif" font-size="13.5" font-weight="700" fill="#FFFFFF" text-anchor="middle">${isDryRevival ? 'DROUGHT STOMATAL CLOSURE VS. RAIN RECOVERY' : 'RAINFED DEFICIT VS. SUPPLEMENTAL IRRIGATION YIELD'}</text>
        ${
          isDryRevival
            ? `
              ${chartAxes({
                x: 118,
                y: 205,
                w: 505,
                h: 310,
                xLabel: 'Soil Moisture Availability (% Field Capacity)',
                yLabel: 'Photosynthetic &amp; Stomatal Conductance (%)',
                xTicks: ['Dry (15%)', 'Stress (35%)', 'Recovery Rain', 'Optimal (85%)'],
                yTicks: ['0%', '25%', '50%', '75%', '100%'],
              })}
              <path d="M 122 492 Q 245 480 355 340 Q 465 232 618 222" fill="none" stroke="${PALETTE.emerald}" stroke-width="3.5" />
              <line x1="122" y1="450" x2="618" y2="275" stroke="${PALETTE.blue}" stroke-width="2.2" stroke-dasharray="6 4" />
              ${calloutTag(225, 456, 'ABA closes leaf stomata to stop wilting', PALETTE.rust, '#FFFFFF', PALETTE.rust)}
              ${calloutTag(485, 214, 'Turgor &amp; CO₂ assimilation rebound', PALETTE.emerald, '#FFFFFF', PALETTE.emerald)}
            `
            : `
              ${[
                { label: 'Severe Rainfed Drought (&lt;30% Moisture · Yield Collapse)', pct: 22, col: PALETTE.rust, y: 210 },
                { label: 'Variable Rainfed Grain (Moderate Deficit Stress)', pct: 54, col: PALETTE.ochre, y: 292 },
                { label: 'Mulched + Rainwater-Harvested Contour Field', pct: 76, col: PALETTE.cyan, y: 374 },
                { label: 'Targeted Drip Irrigation at Flowering &amp; Grain Fill', pct: 92, col: PALETTE.emerald, y: 456 },
              ]
                .map(
                  (r) => `
                  <text x="76" y="${r.y}" font-family="Noto Sans, sans-serif" font-size="12.5" font-weight="700" fill="${PALETTE.ink}">${r.label}</text>
                  <rect x="76" y="${r.y + 10}" width="536" height="28" rx="4" fill="#EAE6DA" />
                  <rect x="76" y="${r.y + 10}" width="${(536 * r.pct) / 100}" height="28" rx="4" fill="${r.col}" />
                  <text x="${r.pct >= 70 ? 88 : 88 + (536 * r.pct) / 100}" y="${r.y + 29}" font-family="Noto Sans, sans-serif" font-size="11.5" font-weight="700" fill="${r.pct >= 70 ? '#FFFFFF' : r.col}">${r.pct}% Relative Grain Yield</text>
                `
                )
                .join('')}
              <text x="356" y="556" font-family="Noto Sans, sans-serif" font-size="12" font-weight="600" fill="${PALETTE.inkMuted}" text-anchor="middle">Over 80% of global cropland is rainfed, making seasonal precipitation timing critical.</text>
            `
        }

        ${cardBox({ x: 688, y: 142, w: 466, h: 456, fill: PALETTE.paperCard, stroke: PALETTE.gold, strokeWidth: 1.4, accentTop: PALETTE.gold })}
        <text x="921" y="162" font-family="Noto Sans, sans-serif" font-size="13.5" font-weight="700" fill="#FFFFFF" text-anchor="middle">HYDROLOGICAL FOOD SECURITY MECHANISMS</text>
        ${titledCard({ x: 710, y: 192, w: 422, h: 120, title: 'Rainfed Crop Vulnerability', body: 'Over 80% of global cropland relies directly on rainfall; dry spells sharply curtail grain filling.', accent: PALETTE.rust })}
        ${titledCard({ x: 710, y: 326, w: 422, h: 120, title: 'Watershed &amp; Drip Conservation', body: 'Mulching, terracing, and drip irrigation stretch limited rain through dry weeks.', accent: PALETTE.cyan })}
        ${titledCard({ x: 710, y: 460, w: 422, h: 120, title: 'Physiological Boundaries', body: 'Severe desiccation kills unadapted tissues before rain arrives; drought tolerance varies hugely across species.', accent: PALETTE.gold })}
      `;
    }
    bodySvg += keyTakeawayStrip([
      { label: 'Agronomic Insight', detail: finding, color: PALETTE.emerald },
      { label: 'Verified Science Context', detail: `Evidence Grade ${entry.evidence_grade} · FAO Soils &amp; Agronomy Consensus.`, color: PALETTE.gold },
    ], 624);

  // 4. Palms, Vineyards, Olives, Pomegranates & Fruit Biology (BOT-009, 010, 011, 012, 013, 014, 015, 016, 018, 025, 033, 034, 035, 048)
  } else if (
    kind === 'fruit-formation-ripening' ||
    kind === 'fruit-diversity-traits' ||
    kind === 'date-palm-inflorescence' ||
    kind === 'garden-orchard-ecosystem'
  ) {
    let sceneTitle = 'FLOWER OVARY METAMORPHOSIS TO MATURE FRUIT';
    let leftCustom = '';
    if (kind === 'date-palm-inflorescence') {
      sceneTitle = id === 'BOT-011' ? 'DATE PALM CROWN &amp; PENDULOUS FRUIT CLUSTERS' : 'PHOENIX DACTYLIFERA ENCLOSED SPATHE &amp; RACHILLAE';
      leftCustom = `
        <!-- Palm Crown Silhouette + Spathe/Clusters -->
        <rect x="295" y="340" width="44" height="232" fill="#8C6D46" stroke="#543E24" stroke-width="2" />
        <path d="M 317 345 Q 200 265 110 295 M 317 345 Q 220 225 145 205 M 317 345 Q 317 195 317 185 M 317 345 Q 425 225 495 210 M 317 345 Q 440 270 535 298" fill="none" stroke="#3D7A37" stroke-width="7" stroke-linecap="round" />
        <!-- Hanging Golden Date Strands / Enclosed Spathe -->
        ${
          id === 'BOT-012'
            ? `<path d="M 332 342 Q 420 355 468 388 Q 418 410 332 375 Z" fill="#C9A258" stroke="#6B4D1E" stroke-width="2" />
               <line x1="395" y1="380" x2="495" y2="438" stroke="${PALETTE.gold}" stroke-width="2.5" />
               <line x1="340" y1="352" x2="215" y2="305" stroke="${PALETTE.emerald}" stroke-width="2" />
               ${calloutTag(495, 458, 'Fibrous Spathe Splits to Reveal Strands', PALETTE.ochre, '#FFFFFF', PALETTE.ochre)}
               ${calloutTag(185, 290, 'Rachillae Spikelets Pack Dozens of Florets', PALETTE.emerald, '#FFFFFF', PALETTE.emerald)}`
            : `<line x1="302" y1="348" x2="255" y2="432" stroke="#A67C23" stroke-width="3" />
               <line x1="336" y1="348" x2="388" y2="432" stroke="#A67C23" stroke-width="3" />
               ${[0, 1, 2, 3, 4].map((i) => `<ellipse cx="${242 + i * 7}" cy="${425 + (i % 2) * 14}" rx="7" ry="11" fill="#C97D28" stroke="#6E3B10" /><ellipse cx="${375 + i * 7}" cy="${425 + (i % 2) * 14}" rx="7" ry="11" fill="#C97D28" stroke="#6E3B10" />`).join('')}
               ${calloutTag(180, 480, 'Pendulous Branching Date Clusters', PALETTE.ochre, '#FFFFFF', PALETTE.ochre)}`
        }
      `;
    } else if (id === 'BOT-015' || kind === 'garden-orchard-ecosystem') {
      const isOlive = id === 'BOT-015';
      const isCalendar = id === 'BOT-035';
      const isOasis = id === 'BOT-048';
      sceneTitle = isOlive
        ? 'OLIVE TREE DROUGHT SYMBIOSIS &amp; DRUPE COMPOSITION'
        : isCalendar
        ? 'PERENNIAL ORCHARD SEASONAL PHENOLOGY &amp; HARVEST STAGGER'
        : isOasis
        ? 'OASIS MICROCLIMATE SHADING &amp; FURROW IRRIGATION ZONES'
        : 'LAYERED AGROFORESTRY ORCHARD STRATA';
      leftCustom = isOlive
        ? `
          <rect x="82" y="455" width="536" height="110" fill="#B5A07D" fill-opacity="0.4" />
          <path d="M 330 455 Q 325 360 350 320 Q 375 360 370 455 Z" fill="#6E5A3E" />
          <ellipse cx="350" cy="272" rx="145" ry="72" fill="#7D9668" fill-opacity="0.88" stroke="#4B6B38" stroke-width="2" />
          <ellipse cx="475" cy="405" rx="34" ry="44" fill="#6B7D38" stroke="#3B4D1E" stroke-width="2" />
          <text x="475" y="472" font-family="Noto Sans, sans-serif" font-size="12" font-weight="700" fill="${PALETTE.olive}" text-anchor="middle">Olive Drupe (~15–30% Oleic Lipid)</text>
          ${calloutTag(215, 225, 'Silvery Underside Curbs Water Loss', PALETTE.olive, '#FFFFFF', PALETTE.olive)}
          ${calloutTag(210, 520, 'Deep Anchoring Roots + Mycorrhizae', PALETTE.ochre, '#FFFFFF', PALETTE.ochre)}
        `
        : isCalendar
        ? `
          ${titledCard({ x: 74, y: 196, w: 266, h: 170, badge: 'Spring', title: 'Chill Break &amp; Pollination', body: 'Almonds, pomegranates &amp; date spathes flower as winter chilling ends.', accent: PALETTE.plum })}
          ${titledCard({ x: 368, y: 196, w: 266, h: 170, badge: 'Summer', title: 'Early Figs, Grapes &amp; Stone Fruit', body: 'High irradiance drives sugar translocation into early orchard berries.', accent: PALETTE.ochre })}
          ${titledCard({ x: 74, y: 386, w: 266, h: 170, badge: 'Autumn', title: 'Late Dates, Olives &amp; Pomegranates', body: 'Oil synthesis and late-season dates extend harvest storage into winter.', accent: PALETTE.olive })}
          ${titledCard({ x: 368, y: 386, w: 266, h: 170, badge: 'Winter', title: 'Dormancy &amp; Mulch Renewal', body: 'Deep taproots conserve reserves while winter rains recharge subsoil.', accent: PALETTE.blue })}
        `
        : isOasis
        ? `
          <!-- Spatial oasis palm canopy + irrigation furrow zoning -->
          <rect x="74" y="445" width="564" height="122" fill="#8C6F4E" />
          <rect x="115" y="445" width="110" height="24" fill="#2B6CB0" fill-opacity="0.75" />
          <rect x="485" y="445" width="110" height="24" fill="#2B6CB0" fill-opacity="0.75" />
          <text x="170" y="461" font-family="Noto Sans, sans-serif" font-size="11" font-weight="700" fill="#FFFFFF" text-anchor="middle">Falaj Furrow</text>
          <text x="540" y="461" font-family="Noto Sans, sans-serif" font-size="11" font-weight="700" fill="#FFFFFF" text-anchor="middle">Falaj Furrow</text>
          <rect x="336" y="295" width="38" height="150" fill="#6B4F35" />
          <path d="M 355 298 Q 230 225 140 258 M 355 298 Q 355 190 355 182 M 355 298 Q 480 225 570 258" fill="none" stroke="#3D7A37" stroke-width="6" stroke-linecap="round" />
          <ellipse cx="220" cy="405" rx="68" ry="38" fill="#5B8C45" fill-opacity="0.88" stroke="#2D5927" />
          <ellipse cx="490" cy="405" rx="68" ry="38" fill="#5B8C45" fill-opacity="0.88" stroke="#2D5927" />
          ${calloutTag(355, 224, 'Date Canopy Cuts Solar Heat Load 40–60%', PALETTE.emerald, '#FFFFFF', PALETTE.emerald)}
          ${calloutTag(220, 362, 'Understory Citrus / Figs', PALETTE.olive, '#FFFFFF', PALETTE.olive)}
          ${calloutTag(490, 362, 'Alfalfa / Herbs Shade Soil', PALETTE.ochre, '#FFFFFF', PALETTE.ochre)}
        `
        : `
          ${titledCard({ x: 74, y: 196, w: 554, h: 105, title: 'Canopy Layer (Dates, Olives &amp; Nut Trees)', body: 'Tall perennial crowns moderate wind, reduce evaporation &amp; create dappled shade.', accent: PALETTE.emerald })}
          ${titledCard({ x: 74, y: 315, w: 554, h: 105, title: 'Midstory Vines &amp; Shrubs (Grapes, Figs &amp; Pomegranates)', body: 'Climbing trellises and fruiting shrubs exploit filtered light &amp; microclimate warmth.', accent: PALETTE.plum })}
          ${titledCard({ x: 74, y: 434, w: 554, h: 105, title: 'Groundcover &amp; Irrigated Channels', body: 'Herbs, legumes, and soil mulch preserve organic matter &amp; check hillside erosion.', accent: PALETTE.ochre })}
        `;
    } else if (kind === 'fruit-diversity-traits') {
      const isPom = id === 'BOT-016';
      const isBiochem = id === 'BOT-034';
      sceneTitle = isPom
        ? 'POMEGRANATE ARIL CHAMBERS &amp; PERICARP ANATOMY'
        : isBiochem
        ? 'BIOCHEMICAL BASIS OF FRUIT SUGAR, ACID &amp; PIGMENT TRAITS'
        : 'SHARED CULTIVATION · GENETIC FRUIT VARIATION';
      leftCustom = isPom
        ? `
          <circle cx="222" cy="375" r="122" fill="#B84B3E" stroke="#6E221B" stroke-width="4" />
          <circle cx="222" cy="375" r="105" fill="#F5E1BE" stroke="#C99E58" stroke-width="2" />
          <line x1="222" y1="270" x2="222" y2="480" stroke="#E0C394" stroke-width="5" />
          <line x1="117" y1="375" x2="327" y2="375" stroke="#E0C394" stroke-width="5" />
          ${[
            [172, 325], [195, 305], [268, 325], [288, 345], [168, 415], [195, 435], [268, 415], [288, 435],
          ]
            .map(([ax, ay]) => `<circle cx="${ax}" cy="${ay}" r="12" fill="#A62332" stroke="#6B101C" stroke-width="1.2" />`)
            .join('')}
          <line x1="325" y1="295" x2="395" y2="275" stroke="${PALETTE.rust}" stroke-width="2" />
          <line x1="265" y1="375" x2="395" y2="365" stroke="${PALETTE.ochre}" stroke-width="2" />
          <line x1="295" y1="435" x2="395" y2="455" stroke="${PALETTE.plum}" stroke-width="2" />
          ${calloutTag(505, 275, 'Leathery Calyx &amp; Pericarp Rind', PALETTE.rust, '#FFFFFF', PALETTE.rust)}
          ${calloutTag(505, 365, 'Spongy Carpellary Septa', PALETTE.ochre, '#FFFFFF', PALETTE.ochre)}
          ${calloutTag(505, 455, 'Polyphenol-Rich Arils', PALETTE.plum, '#FFFFFF', PALETTE.plum)}
        `
        : isBiochem
        ? `
          ${[
            { trait: 'Soluble Sugars (Fructose, Glucose &amp; Sucrose Balance)', pct: 88, col: PALETTE.ochre, y: 210 },
            { trait: 'Organic Acids (Citric &amp; Malic Tartness Profile)', pct: 58, col: PALETTE.olive, y: 292 },
            { trait: 'Anthocyanins, Lycopene &amp; Carotenoid Pigments', pct: 74, col: PALETTE.plum, y: 374 },
            { trait: 'Pectin Cell-Wall Turgor &amp; Aroma Ester Volatiles', pct: 66, col: PALETTE.emerald, y: 456 },
          ]
            .map(
              (t) => `
              <text x="76" y="${t.y}" font-family="Noto Sans, sans-serif" font-size="12.5" font-weight="700" fill="${PALETTE.ink}">${t.trait}</text>
              <rect x="76" y="${t.y + 10}" width="536" height="28" rx="4" fill="#EAE6DA" />
              <rect x="76" y="${t.y + 10}" width="${(536 * t.pct) / 100}" height="28" rx="4" fill="${t.col}" />
            `
            )
            .join('')}
          <text x="356" y="556" font-family="Noto Sans, sans-serif" font-size="12" font-weight="600" fill="${PALETTE.inkMuted}" text-anchor="middle">Gene expression + sunlit microclimate + harvest maturity shape distinct flavors.</text>
        `
        : `
          ${titledCard({ x: 74, y: 196, w: 554, h: 108, title: 'Same Field Soil &amp; Water, Divergent Alleles', body: 'Cultivar DNA regulates distinct sugar transporters, citric/malic acid balance &amp; volatile esters.', accent: PALETTE.emerald })}
          ${titledCard({ x: 74, y: 318, w: 554, h: 108, title: 'Pigment &amp; Texture Differentiation', body: 'Carotenoids (yellow/orange), anthocyanins (red/purple), &amp; pectin firmness vary independently.', accent: PALETTE.plum })}
          ${titledCard({ x: 74, y: 440, w: 554, h: 108, title: 'Horticultural Grafting &amp; Selection', body: 'Farmers propagate elite scions onto shared rootstocks, proving heredity shapes fruit traits.', accent: PALETTE.ochre })}
        `;
    } else {
      // BOT-010, BOT-014, BOT-025, BOT-033
      const isRipen = id === 'BOT-033';
      const isOvarySeq = id === 'BOT-010';
      const isGrape = id === 'BOT-014';
      sceneTitle = isGrape
        ? 'GRAPEVINE TENDRILS, PHLOEM LOADING &amp; BERRY CLUSTERS'
        : isRipen
        ? 'BIOCHEMICAL FRUIT RIPENING TRANSITION CURVE'
        : isOvarySeq
        ? 'FLOWER OVARY METAMORPHOSIS TO MATURE FRUIT'
        : 'FLESHY FRUIT TAXONOMY &amp; SEED DISPERSAL VECTORS';
      leftCustom = isRipen
        ? `
          ${chartAxes({ x: 112, y: 205, w: 515, h: 300, xLabel: 'Developmental Maturation Stage', yLabel: 'Biochemical Concentration', xTicks: ['Immature Green', 'Color Break', 'Ripe Stage', 'Senescent'], yTicks: ['Low', 'Med', 'High'] })}
          <path d="M 118 465 Q 320 435 475 238 L 620 228" fill="none" stroke="${PALETTE.ochre}" stroke-width="3.5" />
          <path d="M 118 245 Q 305 268 475 445 L 620 475" fill="none" stroke="${PALETTE.olive}" stroke-width="3" stroke-dasharray="6 4" />
          ${calloutTag(480, 224, 'Soluble Sugars + Pigments Rise', PALETTE.ochre, '#FFFFFF', PALETTE.ochre)}
          ${calloutTag(310, 325, 'Chlorophyll + Harsh Acids Decline', PALETTE.olive, '#FFFFFF', PALETTE.olive)}
        `
        : isOvarySeq
        ? `
          ${titledCard({ x: 74, y: 204, w: 168, h: 245, title: '1. Pollinated Carpel', body: 'Pollen tube delivers sperm nuclei to ovules inside basal ovary.', accent: PALETTE.plum })}
          ${flowArrow(246, 325, 274, 325, PALETTE.emerald, 2.8)}
          ${titledCard({ x: 278, y: 204, w: 176, h: 245, title: '2. Auxin Expansion', body: 'Fertilized seeds emit auxin &amp; gibberellins driving pericarp growth.', accent: PALETTE.olive })}
          ${flowArrow(458, 325, 486, 325, PALETTE.ochre, 2.8)}
          ${titledCard({ x: 490, y: 204, w: 148, h: 245, title: '3. Ethylene Ripening', body: 'Cell walls soften and starch turns into palatable sugars.', accent: PALETTE.ochre })}
          <text x="356" y="516" font-family="Noto Sans, sans-serif" font-size="12" font-weight="600" fill="${PALETTE.inkMuted}" text-anchor="middle">True botanical fruits develop from mature ovaries enclosing fertilized seeds.</text>
        `
        : isGrape
        ? `
          <path d="M 220 220 Q 335 205 440 240" fill="none" stroke="#5A4632" stroke-width="5" />
          <path d="M 335 215 Q 355 250 330 278" fill="none" stroke="#4F8A45" stroke-width="3" />
          ${[
            [295, 310], [335, 310], [375, 310],
            [275, 352], [315, 352], [355, 352], [395, 352],
            [295, 394], [335, 394], [375, 394],
            [315, 436], [355, 436], [335, 475],
          ]
            .map(([gx, gy]) => `<circle cx="${gx}" cy="${gy}" r="22" fill="#6B3FA0" fill-opacity="0.88" stroke="#3D1F61" stroke-width="1.5" />`)
            .join('')}
          <text x="335" y="542" font-family="Noto Sans, sans-serif" font-size="13" font-weight="700" fill="${PALETTE.plum}" text-anchor="middle">Phloem Translocates Sucrose Into Expanding Berries</text>
        `
        : `
          ${titledCard({ x: 74, y: 196, w: 554, h: 108, badge: 'Multi-Seeded', title: 'True Berries &amp; Hesperidia (Grapes, Dates, Citrus)', body: 'Soft juicy mesocarp &amp; endocarp attract birds and mammals to swallow intact seeds.', accent: PALETTE.plum })}
          ${titledCard({ x: 74, y: 318, w: 554, h: 108, badge: 'Single Stony Pit', title: 'Drupes &amp; Pomes (Olives, Peaches, Apples)', body: 'Hardened lignified endocarp shields embryo inside during gut passage.', accent: PALETTE.olive })}
          ${titledCard({ x: 74, y: 440, w: 554, h: 108, badge: 'Ecological Role', title: 'Endozoochory &amp; Seed Scarification', body: 'Animals deposit seeds miles from parent canopies inside nutrient-rich droppings.', accent: PALETTE.ochre })}
        `;
    }

    bodySvg = `
      ${cardBox({ x: 46, y: 142, w: 620, h: 456, fill: PALETTE.paperCard, stroke: PALETTE.olive, strokeWidth: 1.4, accentTop: PALETTE.olive })}
      <text x="356" y="162" font-family="Noto Sans, sans-serif" font-size="13.5" font-weight="700" fill="#FFFFFF" text-anchor="middle">${sceneTitle}</text>
      ${leftCustom}
      ${cardBox({ x: 688, y: 142, w: 466, h: 456, fill: PALETTE.paperCard, stroke: PALETTE.gold, strokeWidth: 1.4, accentTop: PALETTE.gold })}
      <text x="921" y="162" font-family="Noto Sans, sans-serif" font-size="13.5" font-weight="700" fill="#FFFFFF" text-anchor="middle">BOTANICAL STRUCTURE &amp; TAXONOMIC SCOPE</text>
      ${titledCard({ x: 710, y: 192, w: 422, h: 120, title: entry.scientific_topic, body: finding, accent: PALETTE.olive })}
      ${titledCard({ x: 710, y: 326, w: 422, h: 120, title: 'Pollination to Maturation', body: enrichment?.whatItMeans ?? 'Botanical development involves genetic regulation, hormone signaling, and pollinator co-evolution.', accent: PALETTE.emerald })}
      ${titledCard({ x: 710, y: 460, w: 422, h: 120, title: 'Taxonomic Boundary', body: entry.limitations || 'Simple, aggregate (strawberry/raspberry), multiple (fig/pineapple), and parthenocarpic fruits differ.', accent: PALETTE.gold })}
      ${keyTakeawayStrip([
        { label: 'Horticultural Finding', detail: finding, color: PALETTE.olive },
        { label: 'Reference Standard', detail: `Evidence Grade ${entry.evidence_grade} · Kew / FAO Horticultural Botany.`, color: PALETTE.gold },
      ], 624)}
    `;

  // 5. Reproduction, Double Fertilization, Wind/Animal Pollination & Honeybee Ecology (BOT-013, 019, 020, 021, 022, 023, 024)
  } else if (
    kind === 'plant-reproductive-diversity' ||
    kind === 'fertilisation-seed-development' ||
    kind === 'wind-pollination-anemophily' ||
    kind === 'animal-assisted-pollination' ||
    kind === 'honeybee-biology-nesting'
  ) {
    if (kind === 'honeybee-biology-nesting') {
      const isNest = id === 'BOT-024';
      bodySvg = `
        ${cardBox({ x: 46, y: 142, w: 620, h: 456, fill: '#FAF4E2', stroke: PALETTE.gold, strokeWidth: 1.4, accentTop: PALETTE.gold })}
        <text x="356" y="162" font-family="Noto Sans, sans-serif" font-size="13.5" font-weight="700" fill="#FFFFFF" text-anchor="middle">${isNest ? 'APIS MELLIFERA NESTING NICHES: CLIFFS, TREES &amp; HIVES' : 'HEXAGONAL BEESWAX COMB &amp; ENZYMATIC HONEY PRODUCTION'}</text>
        ${
          isNest
            ? `
              ${titledCard({ x: 74, y: 196, w: 554, h: 110, badge: 'Niche 01 · Geological', title: 'Mountain Rock Crevices &amp; Limestone Caves', body: 'Sheltered dry overhangs guard feral colonies against winds, direct rain &amp; temperature swings.', accent: PALETTE.slate })}
              ${titledCard({ x: 74, y: 320, w: 554, h: 110, badge: 'Niche 02 · Arboreal', title: 'Hollow Old-Growth Tree Trunks &amp; Branches', body: 'Insulating wooden cavities support perennial brood combs with narrow defendable entrances.', accent: PALETTE.olive })}
              ${titledCard({ x: 74, y: 444, w: 554, h: 110, badge: 'Niche 03 · Apiculture', title: 'Managed Timber, Clay &amp; Movable-Frame Hives', body: 'Beekeeping uses bee-space tolerances (~7–9 mm) to allow sustainable nectar harvesting.', accent: PALETTE.gold })}
            `
            : `
              <!-- Hexagonal honeycomb lattice -->
              ${[0, 1, 2, 3, 4].flatMap((r) => [0, 1, 2, 3, 4, 5].map((c) => {
                const cx = 190 + c * 52 + (r % 2) * 26;
                const cy = 248 + r * 44;
                return hexagonCell(cx, cy, 28, (r + c) % 3 === 0 ? '#E6B645' : '#F7E19C', '#9E7828');
              })).join('')}
              <rect x="82" y="485" width="540" height="88" rx="5" fill="${PALETTE.paperCard}" stroke="${PALETTE.gold}" />
              <text x="352" y="516" font-family="Noto Sans, sans-serif" font-size="13" font-weight="700" fill="${PALETTE.ochre}" text-anchor="middle">Nectar Sucrose → Invertase + Wing-Fan Evaporation (~17–18% Moisture Honey)</text>
              <text x="352" y="542" font-family="Noto Sans, sans-serif" font-size="12" fill="${PALETTE.inkMuted}" text-anchor="middle">Bees also move ~75%+ of flowering crop pollen while foraging.</text>
            `
        }
        ${cardBox({ x: 688, y: 142, w: 466, h: 456, fill: PALETTE.paperCard, stroke: PALETTE.emerald, strokeWidth: 1.4, accentTop: PALETTE.emerald })}
        <text x="921" y="162" font-family="Noto Sans, sans-serif" font-size="13.5" font-weight="700" fill="#FFFFFF" text-anchor="middle">POLLINATOR ECOLOGY &amp; COLONY BIOLOGY</text>
        ${titledCard({ x: 710, y: 192, w: 422, h: 120, title: 'Caste &amp; Foraging Behavior', body: 'Female worker bees forage nectar and pollen, communicate distance via waggle dances, and fan combs to ripen honey.', accent: PALETTE.gold })}
        ${titledCard({ x: 710, y: 326, w: 422, h: 120, title: 'Wax Gland Engineering', body: 'Four pairs of abdominal wax glands secrete beeswax molded into uniform 120°-junction hexagonal cells.', accent: PALETTE.olive })}
        ${titledCard({ x: 710, y: 460, w: 422, h: 120, title: 'Clarification', body: 'Honey’s nutritional chemistry depends on floral nectar sources; avoid extrapolating unverified clinical claims.', accent: PALETTE.rust })}
      `;
    } else {
      const mode = kind === 'wind-pollination-anemophily' ? 'wind' : kind === 'animal-assisted-pollination' ? 'animal' : kind === 'fertilisation-seed-development' ? 'doublefert' : 'reprodiv';
      bodySvg = `
        ${cardBox({ x: 46, y: 142, w: 620, h: 456, fill: '#F4F8F2', stroke: PALETTE.emerald, strokeWidth: 1.4, accentTop: PALETTE.emerald })}
        <text x="356" y="162" font-family="Noto Sans, sans-serif" font-size="13.5" font-weight="700" fill="#FFFFFF" text-anchor="middle">${
          mode === 'wind'
            ? 'ANEMOPHILY: EXPOSED STAMENS &amp; FEATHERY STIGMAS'
            : mode === 'animal'
            ? 'ENTOMOPHILY: FLORAL REWARDS &amp; POLLINATOR TRANSFER'
            : mode === 'doublefert'
            ? 'ANGIOSPERM POLLEN TUBE &amp; DOUBLE FERTILIZATION'
            : id === 'BOT-013'
            ? 'DIOECIOUS DATE PALM POLLINATION (MALE → FEMALE TREE)'
            : 'SPECTRUM OF PLANT REPRODUCTIVE SYSTEMS'
        }</text>
        ${
          mode === 'reprodiv'
            ? id === 'BOT-013'
              ? `
                ${titledCard({ x: 74, y: 204, w: 235, h: 245, badge: 'Male Date Palm (♂)', title: 'Staminate Pollen Spathe', body: 'Produces wind-carried pollen clouds on waxy floral strands (no fruit borne on male trees).', accent: PALETTE.ochre })}
                ${flowArrow(314, 326, 368, 326, PALETTE.emerald, 3)}
                ${titledCard({ x: 374, y: 204, w: 256, h: 245, badge: 'Female Date Palm (♀)', title: 'Pistillate Carpels → Dates', body: 'Hand-tying male strands onto receptive female clusters guarantees uniform orchard fruit set.', accent: PALETTE.emerald })}
                <text x="356" y="516" font-family="Noto Sans, sans-serif" font-size="11.5" font-weight="600" fill="${PALETTE.inkMuted}" text-anchor="middle">Phoenix dactylifera (~5% plant species) bears male and female flowers on separate trees.</text>
              `
              : `
                ${titledCard({ x: 74, y: 196, w: 554, h: 108, title: 'Hermaphroditic / Bisexual Flowers (~70%+ Angiosperms)', body: 'Individual blossoms carry both pollen anthers and seed ovules (e.g., apples, roses, tomatoes).', accent: PALETTE.emerald })}
                ${titledCard({ x: 74, y: 318, w: 554, h: 108, title: 'Monoecious &amp; Dioecious Plants (Maize, Dates, Holly)', body: 'Separate male and female flowers appear on one plant or distinct individual plants (like Phoenix dactylifera).', accent: PALETTE.ochre })}
                ${titledCard({ x: 74, y: 440, w: 554, h: 108, title: 'Spores &amp; Vegetative Clonal Reproduction', body: 'Ferns, mosses, strawberry runners &amp; potato tubers reproduce without binary animal-like pairing.', accent: PALETTE.blue })}
              `
            : mode === 'wind'
            ? `
              <!-- Wheat/grass spikelet with hanging anthers + feathery branched stigma -->
              <line x1="165" y1="520" x2="165" y2="255" stroke="#6B7D38" stroke-width="5" />
              <line x1="165" y1="295" x2="115" y2="335" stroke="#A68238" stroke-width="2" />
              <ellipse cx="115" cy="342" rx="14" ry="8" fill="#E3B342" stroke="#8C6214" />
              <line x1="165" y1="335" x2="122" y2="375" stroke="#A68238" stroke-width="2" />
              <ellipse cx="122" cy="382" rx="14" ry="8" fill="#E3B342" stroke="#8C6214" />
              ${flowArrow(145, 290, 310, 290, PALETTE.cyan, 2.8, true)}
              ${flowArrow(145, 340, 310, 330, PALETTE.cyan, 2.8, true)}
              <!-- Feathery plume stigma -->
              <path d="M 355 520 L 355 340 M 355 360 Q 320 310 305 275 M 355 360 Q 390 310 405 275 M 332 320 L 308 308 M 378 320 L 402 308 M 320 298 L 298 286 M 390 298 L 412 286" fill="none" stroke="#3D7A37" stroke-width="2.5" stroke-linecap="round" />
              ${calloutTag(225, 224, 'Smooth Buoyant Wind Pollen', PALETTE.cyan, '#FFFFFF', PALETTE.cyan)}
              ${calloutTag(485, 310, 'Feathery Stigma Sweeps Air', PALETTE.emerald, '#FFFFFF', PALETTE.emerald)}
              ${calloutTag(485, 425, 'Zero Nectar or Showy Petals', PALETTE.ochre, '#FFFFFF', PALETTE.ochre)}
            `
            : mode === 'animal'
            ? `
              <!-- Showy flower petals + nectar + bee transfer -->
              <circle cx="305" cy="365" r="78" fill="#F2D7DF" stroke="#B85675" stroke-width="2" />
              <circle cx="305" cy="365" r="46" fill="#F7E49E" stroke="${PALETTE.gold}" stroke-width="2" />
              <circle cx="305" cy="365" r="18" fill="#4B6B38" />
              <!-- Stylized bee hovering -->
              <ellipse cx="185" cy="285" rx="22" ry="13" fill="#E3A420" stroke="#3B2C1A" stroke-width="2" />
              <ellipse cx="180" cy="268" rx="14" ry="8" fill="#DCEAF7" fill-opacity="0.85" stroke="#5A738C" />
              ${flowArrow(205, 295, 275, 340, PALETTE.ochre, 2.8)}
              ${calloutTag(185, 232, 'Pollinator Vector (Bee / Bird)', PALETTE.ochre, '#FFFFFF', PALETTE.ochre)}
              ${calloutTag(490, 305, 'Pigmented Petals + Sugar Nectar', PALETTE.plum, '#FFFFFF', PALETTE.plum)}
              ${calloutTag(490, 425, 'Targeted Stigma Deposition', PALETTE.emerald, '#FFFFFF', PALETTE.emerald)}
            `
            : `
              <!-- Pistil + Stamen Floral Cross-Section (BOT-020 Double Fertilization) -->
              <path d="M 275 495 C 235 460, 235 370, 275 335 L 295 250 L 315 250 L 335 335 C 375 370, 375 460, 335 495 Z" fill="#E3EEDB" stroke="#2D5927" stroke-width="2.5" />
              <ellipse cx="305" cy="425" rx="34" ry="48" fill="#FAF6EC" stroke="#4B6B38" stroke-width="1.5" />
              <circle cx="305" cy="425" r="14" fill="#F2DFA8" stroke="${PALETTE.gold}" />
              <path d="M 305 248 L 305 415" fill="none" stroke="${PALETTE.ochre}" stroke-width="3" stroke-dasharray="4 3" />
              ${flowArrow(125, 238, 285, 245, PALETTE.ochre, 3)}
              ${calloutTag(165, 222, 'Pollen Grain on Stigma', PALETTE.ochre, '#FFFFFF', PALETTE.ochre)}
              ${calloutTag(470, 305, 'Pollen Tube Reaches Ovule', PALETTE.emerald, '#FFFFFF', PALETTE.emerald)}
              ${calloutTag(470, 425, '1N Zygote + 3N Endosperm Formed', PALETTE.blue, '#FFFFFF', PALETTE.blue)}
            `
        }
        ${cardBox({ x: 688, y: 142, w: 466, h: 456, fill: PALETTE.paperCard, stroke: PALETTE.gold, strokeWidth: 1.4, accentTop: PALETTE.gold })}
        <text x="921" y="162" font-family="Noto Sans, sans-serif" font-size="13.5" font-weight="700" fill="#FFFFFF" text-anchor="middle">MECHANISMS &amp; SCIENTIFIC CAUTIONS</text>
        ${titledCard({ x: 710, y: 192, w: 422, h: 120, title: entry.scientific_topic, body: finding, accent: PALETTE.emerald })}
        ${titledCard({ x: 710, y: 326, w: 422, h: 120, title: 'Outcrossing Diversity Benefit', body: 'Genetic recombination prevents inbreeding depression and equips seedlings for shifting pathogens.', accent: PALETTE.blue })}
        ${titledCard({ x: 710, y: 460, w: 422, h: 120, title: 'Hermeneutic &amp; Biology Guardrail', body: entry.limitations || 'Avoid projecting human male/female categories onto hermaphroditic or apomictic plant biology.', accent: PALETTE.rust })}
      `;
    }
    bodySvg += keyTakeawayStrip([
      { label: 'Pollination &amp; Reproduction Finding', detail: finding, color: PALETTE.emerald },
      { label: 'Taxonomic Accuracy', detail: `Evidence Grade ${entry.evidence_grade} · OpenStax Biology / Kew Science.`, color: PALETTE.gold },
    ], 624);

  // 6. Canopy Ecology, Biodiversity Clades, Forage Grasslands & Pigments (BOT-007, 008, 017, 036, 037, 038, 039, 040, 041, 042, 043, 044, 050)
  } else {
    let leftTitle = 'TERRESTRIAL PLANT BIODIVERSITY &amp; ORGAN STRUCTURE';
    let leftContent = '';
    if (kind === 'plant-pigments-light') {
      leftTitle = 'CHLOROPHYLL, CAROTENOID &amp; ANTHOCYANIN LIGHT ABSORPTION';
      leftContent = `
        ${chartAxes({ x: 112, y: 205, w: 505, h: 295, xLabel: 'Solar Wavelength Spectrum (nm)', yLabel: 'Relative Light Absorption', xTicks: ['400 nm (Violet)', '480 nm (Blue)', '550 nm (Green)', '660 nm (Red)', '720 nm'], yTicks: ['0%', '50%', '100%'] })}
        <path d="M 118 440 C 165 220, 215 245, 275 455 C 345 480, 425 460, 495 250 C 535 310, 575 480, 615 495" fill="none" stroke="${PALETTE.emerald}" stroke-width="3.5" />
        <path d="M 118 460 C 175 265, 245 275, 315 470 L 615 492" fill="none" stroke="${PALETTE.ochre}" stroke-width="2.5" stroke-dasharray="5 3" />
        ${calloutTag(205, 222, 'Blue Peak (~430–460 nm)', PALETTE.blue, '#FFFFFF', PALETTE.blue)}
        ${calloutTag(355, 430, 'Green Reflected (~550 nm)', PALETTE.olive, '#FFFFFF', PALETTE.olive)}
        ${calloutTag(510, 232, 'Red Peak (~660 nm)', PALETTE.rust, '#FFFFFF', PALETTE.rust)}
      `;
    } else if (kind === 'tree-canopy-ecosystem') {
      const mode = id === 'BOT-036' ? 'shade' : id === 'BOT-037' ? 'shelter' : 'carbon';
      leftTitle = mode === 'shade' ? 'TREE CANOPY RADIATIVE INTERCEPTION &amp; COOLING' : mode === 'shelter' ? 'ROOT STABILIZATION, WINDBREAKS &amp; WATERSHED SHIELD' : 'FOREST CARBON, OXYGEN &amp; BIODIVERSITY BALANCE';
      leftContent =
        mode === 'shade'
          ? `
            <circle cx="145" cy="215" r="24" fill="#F2B949" />
            <rect x="330" y="345" width="46" height="190" fill="#6E5238" />
            <ellipse cx="353" cy="295" rx="155" ry="92" fill="#3D7A37" fill-opacity="0.88" stroke="#244D20" stroke-width="2" />
            <rect x="85" y="535" width="530" height="42" fill="#8C6F4E" />
            ${flowArrow(175, 222, 265, 245, PALETTE.ochre, 3)}
            ${calloutTag(480, 215, 'Leaves Intercept 70–90% Direct PAR', PALETTE.ochre, '#FFFFFF', PALETTE.ochre)}
            ${calloutTag(485, 465, 'Transpiration Cooling Cools Sub-Canopy 2–6 °C', PALETTE.emerald, '#FFFFFF', PALETTE.emerald)}
          `
          : mode === 'shelter'
          ? `
            <!-- Windbreak trees + underground root architecture -->
            <rect x="74" y="425" width="564" height="145" fill="#7D6242" />
            <path d="M 355 425 L 355 545 M 355 450 Q 250 485 180 535 M 355 450 Q 460 485 530 535 M 355 485 Q 290 520 245 555 M 355 485 Q 420 520 465 555" fill="none" stroke="#E8D2A6" stroke-width="3.5" stroke-linecap="round" />
            <rect x="336" y="295" width="38" height="130" fill="#5E4632" />
            <ellipse cx="355" cy="272" rx="115" ry="68" fill="#3D7A37" stroke="#244D20" stroke-width="2" />
            ${flowArrow(85, 245, 220, 245, PALETTE.cyan, 3.2)}
            ${flowArrow(85, 295, 220, 295, PALETTE.cyan, 3.2)}
            ${flowArrow(485, 275, 610, 245, PALETTE.emerald, 2.2, true)}
            ${calloutTag(165, 218, 'Wind Velocity Cut 40–70%', PALETTE.cyan, '#FFFFFF', PALETTE.cyan)}
            ${calloutTag(355, 558, 'Fibrous &amp; Tap Roots Bind Topsoil Against Erosion', PALETTE.gold, '#FFFFFF', PALETTE.gold)}
          `
          : `
            ${cycleNodeRing(356, 366, 138, [
              { label: 'Atmospheric CO₂', sub: 'Stomatal Uptake', color: PALETTE.cyan },
              { label: 'Wood &amp; Leaf Biomass', sub: 'Long-Term Carbon Sink', color: PALETTE.emerald },
              { label: 'Canopy Habitat', sub: 'Pollinators &amp; Birds', color: PALETTE.plum },
              { label: 'Soil Mycorrhizae', sub: 'Litter Nutrient Return', color: PALETTE.ochre },
            ])}
            <text x="356" y="362" font-family="Liberation Serif, serif" font-size="11.5" font-weight="700" fill="${PALETTE.emerald}" text-anchor="middle">FOREST</text>
            <text x="356" y="378" font-family="Liberation Serif, serif" font-size="11.5" font-weight="700" fill="${PALETTE.emerald}" text-anchor="middle">ECOLOGY</text>
          `;
    } else if (kind === 'grassland-forage-senescence') {
      const isDry = id === 'BOT-042';
      const isRuminant = id === 'BOT-040';
      const isSoilCycle = id === 'BOT-043';
      leftTitle = isDry
        ? 'SENESCENCE NUTRIENT REMOBILIZATION &amp; LITTER CYCLING'
        : isRuminant
        ? 'RUMINANT FORAGE ENERGY FLOW FROM PASTURE CELLULOSE'
        : isSoilCycle
        ? 'GRAZING–SOIL ORGANIC CARBON &amp; ROOT RECOVERY CYCLE'
        : 'MERISTEMATIC GRASS GROWTH &amp; PASTURE REGENERATION';
      leftContent = isDry
        ? `
          ${cycleNodeRing(351, 370, 142, [
            { label: 'Active Green Season', sub: 'Photosynthesis &amp; Seed Fill', color: PALETTE.olive },
            { label: 'Senescence Trigger', sub: 'Chlorophyll Dismantled', color: PALETTE.ochre },
            { label: 'Dry Litter Layer', sub: 'Soil Mulch Cover', color: PALETTE.rust },
            { label: 'Microbial Decay', sub: 'N, P, K Mineral Return', color: PALETTE.emerald },
          ])}
          <text x="351" y="366" font-family="Liberation Serif, serif" font-size="12" font-weight="700" fill="${PALETTE.ochre}" text-anchor="middle">SEASONAL</text>
          <text x="351" y="382" font-family="Liberation Serif, serif" font-size="12" font-weight="700" fill="${PALETTE.ochre}" text-anchor="middle">NUTRIENT LOOP</text>
        `
        : isRuminant
        ? `
          <rect x="74" y="198" width="160" height="270" rx="8" fill="#E8F2E4" stroke="${PALETTE.olive}" stroke-width="1.5" />
          <text x="154" y="226" font-family="Noto Sans, sans-serif" font-size="13" font-weight="700" fill="${PALETTE.olive}" text-anchor="middle">1. Grass Biomass</text>
          <text x="154" y="250" font-family="Noto Sans, sans-serif" font-size="11.5" fill="${PALETTE.inkMuted}" text-anchor="middle">Cellulose &amp; Hemicellulose</text>
          <path d="M 110 430 L 125 300 M 145 430 L 152 285 M 180 430 L 194 305" stroke="#4F8A45" stroke-width="5" stroke-linecap="round" />
          ${flowArrow(238, 330, 278, 330, PALETTE.emerald, 3)}
          <rect x="282" y="198" width="168" height="270" rx="8" fill="#F6EFE0" stroke="${PALETTE.ochre}" stroke-width="1.5" />
          <text x="366" y="226" font-family="Noto Sans, sans-serif" font-size="13" font-weight="700" fill="${PALETTE.ochre}" text-anchor="middle">2. Rumen Symbiosis</text>
          <text x="366" y="250" font-family="Noto Sans, sans-serif" font-size="11.5" fill="${PALETTE.inkMuted}" text-anchor="middle">Anaerobic Microbial Cellulase</text>
          <circle cx="366" cy="348" r="56" fill="#E9D7B2" stroke="${PALETTE.gold}" stroke-width="1.5" />
          <text x="366" y="344" font-family="Noto Sans, sans-serif" font-size="12" font-weight="700" fill="${PALETTE.ink}" text-anchor="middle">VFA Energy</text>
          <text x="366" y="362" font-family="Noto Sans, sans-serif" font-size="11" fill="${PALETTE.inkMuted}" text-anchor="middle">Acetate / Propionate</text>
          ${flowArrow(454, 330, 490, 330, PALETTE.emerald, 3)}
          <rect x="494" y="198" width="144" height="270" rx="8" fill="#EBF4F0" stroke="${PALETTE.emerald}" stroke-width="1.5" />
          <text x="566" y="226" font-family="Noto Sans, sans-serif" font-size="13" font-weight="700" fill="${PALETTE.emerald}" text-anchor="middle">3. Milk &amp; Herd</text>
          <text x="566" y="254" font-family="Noto Sans, sans-serif" font-size="11.5" fill="${PALETTE.inkMuted}" text-anchor="middle">Livestock nutrition</text>
          <text x="566" y="274" font-family="Noto Sans, sans-serif" font-size="11.5" fill="${PALETTE.inkMuted}" text-anchor="middle">+ Manure return</text>
          <text x="356" y="532" font-family="Noto Sans, sans-serif" font-size="12.5" font-weight="600" fill="${PALETTE.ink}" text-anchor="middle">Pasture grasses convert sunlight into cellulose biomass unlocking ruminant food webs.</text>
        `
        : isSoilCycle
        ? `
          ${chartAxes({ x: 118, y: 205, w: 500, h: 290, xLabel: 'Grazing Pressure Intensity', yLabel: 'Root Biomass &amp; Forage Regrowth', xTicks: ['Ungrazed', 'Light Rotational', 'Moderate Rest', 'Overgrazed'], yTicks: ['25%', '50%', '75%', '100%'] })}
          <path d="M 125 320 Q 265 215 390 250 Q 515 335 612 468" fill="none" stroke="${PALETTE.emerald}" stroke-width="3.5" />
          ${calloutTag(290, 224, 'Optimal Rotational Rest Window', PALETTE.emerald, '#FFFFFF', PALETTE.emerald)}
          ${calloutTag(515, 412, 'Degradation &amp; Erosion Risk', PALETTE.rust, '#FFFFFF', PALETTE.rust)}
        `
        : `
          ${titledCard({ x: 74, y: 196, w: 554, h: 108, title: 'Basal Meristem Resilience (Poaceae Grasses)', body: 'Unlike trees that grow from fragile branch tips, grasses grow from protected base crowns and regrow cleanly after grazing.', accent: PALETTE.olive })}
          ${titledCard({ x: 74, y: 318, w: 554, h: 108, title: 'Microbial Cellulose Breakdown', body: 'Rumen microbes inside cattle, sheep, and goats ferment fibrous stems humans cannot digest directly.', accent: PALETTE.emerald })}
          ${titledCard({ x: 74, y: 440, w: 554, h: 108, title: 'Rotational Grazing Balance', body: 'Moderate seasonal grazing recycles nutrients, whereas chronic overgrazing exposes topsoil to erosion.', accent: PALETTE.ochre })}
        `;
    } else if (id === 'BOT-007') {
      leftTitle = 'FIVE MAJOR LAND PLANT CLADES (~390,000+ SPECIES)';
      leftContent = `
        ${[
          { label: 'Angiosperms (Flowering Plants · Seeds in Fruit)', pct: 90, count: '~300,000 sp.', col: PALETTE.emerald, y: 212 },
          { label: 'Bryophytes (Mosses &amp; Liverworts · Non-Vascular)', pct: 32, count: '~20,000 sp.', col: PALETTE.olive, y: 294 },
          { label: 'Pteridophytes (Ferns &amp; Horsetails · Spore Vascular)', pct: 24, count: '~11,000 sp.', col: PALETTE.teal, y: 376 },
          { label: 'Gymnosperms (Conifers, Cycads · Naked Seeds)', pct: 12, count: '~1,100 sp.', col: PALETTE.ochre, y: 458 },
        ]
          .map(
            (b) => `
            <text x="76" y="${b.y}" font-family="Noto Sans, sans-serif" font-size="13" font-weight="700" fill="${PALETTE.ink}">${b.label}</text>
            <rect x="76" y="${b.y + 10}" width="530" height="30" rx="5" fill="#EAE6DA" stroke="${PALETTE.border}" />
            <rect x="76" y="${b.y + 10}" width="${(530 * b.pct) / 100}" height="30" rx="5" fill="${b.col}" />
            <text x="${92 + (530 * b.pct) / 100}" y="${b.y + 30}" font-family="Noto Sans, sans-serif" font-size="12" font-weight="700" fill="${b.col}">${b.count}</text>
          `
          )
          .join('')}
      `;
    } else if (id === 'BOT-039') {
      leftTitle = 'EDIBLE PLANT ORGANS &amp; HUMAN MACRONUTRIENT SUPPLY';
      leftContent = `
        ${titledCard({ x: 74, y: 196, w: 266, h: 162, badge: 'Seeds &amp; Grains', title: 'Starch &amp; Protein Reserves', body: 'Wheat, rice, barley &amp; lentils pack concentrated carbohydrates, amino acids, and B-vitamins.', accent: PALETTE.gold })}
        ${titledCard({ x: 360, y: 196, w: 266, h: 162, badge: 'Fleshy Fruits', title: 'Vitamins, K⁺ &amp; Antioxidants', body: 'Dates, olives, pomegranates &amp; figs furnish simple sugars, oleic fat, and polyphenols.', accent: PALETTE.plum })}
        ${titledCard({ x: 74, y: 376, w: 266, h: 162, badge: 'Roots &amp; Tubers', title: 'Underground Storage Organs', body: 'Carrots, onions, and potatoes store starches, carotenoids, and prebiotic dietary fiber.', accent: PALETTE.ochre })}
        ${titledCard({ x: 360, y: 376, w: 266, h: 162, badge: 'Leaves &amp; Herbs', title: 'Folate, Vitamin K &amp; Minerals', body: 'Green leafy canopies provide chlorophyll magnesium, calcium, and water-soluble phytonutrients.', accent: PALETTE.emerald })}
      `;
    } else if (id === 'BOT-044') {
      leftTitle = 'BOTANICAL TRAIT SPECTRUM ACROSS BIOME CLIMATES';
      leftContent = `
        ${chartAxes({ x: 118, y: 205, w: 500, h: 295, xLabel: 'Mean Annual Water Availability', yLabel: 'Leaf Surface Area &amp; Cuticle Strategy', xTicks: ['Hyper-Arid', 'Mediterranean', 'Temperate', 'Rainforest'], yTicks: ['Low', 'Medium', 'High'] })}
        <circle cx="170" cy="450" r="26" fill="${PALETTE.ochre}" fill-opacity="0.25" stroke="${PALETTE.ochre}" stroke-width="2" />
        <text x="170" y="454" font-family="Noto Sans, sans-serif" font-size="11" font-weight="700" fill="${PALETTE.ochre}" text-anchor="middle">Spines / Waxy</text>
        <circle cx="345" cy="365" r="32" fill="${PALETTE.olive}" fill-opacity="0.25" stroke="${PALETTE.olive}" stroke-width="2" />
        <text x="345" y="369" font-family="Noto Sans, sans-serif" font-size="11" font-weight="700" fill="${PALETTE.olive}" text-anchor="middle">Sclerophyll</text>
        <circle cx="535" cy="258" r="36" fill="${PALETTE.emerald}" fill-opacity="0.25" stroke="${PALETTE.emerald}" stroke-width="2" />
        <text x="535" y="262" font-family="Noto Sans, sans-serif" font-size="11" font-weight="700" fill="${PALETTE.emerald}" text-anchor="middle">Broad Canopy</text>
      `;
    } else if (id === 'BOT-050') {
      leftTitle = 'SYNTHESIS: EARTH’S COUPLED BOTANICAL BIOSPHERE';
      leftContent = `
        ${cycleNodeRing(351, 370, 144, [
          { label: 'Solar Capture', sub: 'Chlorophyll PAR Conversion', color: PALETTE.ochre },
          { label: 'Soil &amp; Water Link', sub: 'Xylem Mineral Uptake', color: PALETTE.cyan },
          { label: 'Pollination Webs', sub: 'Wind &amp; Insect Vectors', color: PALETTE.olive },
          { label: 'Food &amp; O₂ Supply', sub: 'Sustaining Animal Life', color: PALETTE.emerald },
        ])}
        <text x="351" y="366" font-family="Liberation Serif, serif" font-size="12" font-weight="700" fill="${PALETTE.emerald}" text-anchor="middle">BOTANICAL</text>
        <text x="351" y="382" font-family="Liberation Serif, serif" font-size="12" font-weight="700" fill="${PALETTE.emerald}" text-anchor="middle">ORDER</text>
      `;
    } else {
      // BOT-008 & BOT-017
      const labelMap: Record<string, string> = {
        'BOT-008': 'VASCULAR BODY PLAN: ROOTS, STEMS, LEAVES &amp; FLOWERS',
        'BOT-017': 'CONTRASTING CROP STRATEGIES: GRAPES, OLIVES &amp; POMEGRANATE',
      };
      leftTitle = labelMap[id] ?? leftTitle;
      leftContent = `
        ${titledCard({ x: 74, y: 196, w: 554, h: 108, title: id === 'BOT-008' ? '1. Root System (Anchorage &amp; Absorption)' : '1. Grapevine (Climbing Vitis Liana)', body: id === 'BOT-008' ? 'Taproots and fibrous mats absorb water and nitrogen ions across variable depths.' : 'Clings via coiling tendrils, concentrating sugars inside fleshy berry clusters.', accent: PALETTE.emerald })}
        ${titledCard({ x: 74, y: 318, w: 554, h: 108, title: id === 'BOT-008' ? '2. Vascular Stem &amp; Canopy Foliage' : '2. Olive Tree (Evergreen Drought Xerophyte)', body: id === 'BOT-008' ? 'Xylem lifts sap upward while flat green blades optimize light capture for glucose production.' : 'Deep roots and waxy silver leaves withstand Mediterranean summer drought while storing oleic oil.', accent: PALETTE.olive })}
        ${titledCard({ x: 74, y: 440, w: 554, h: 108, title: id === 'BOT-008' ? '3. Floral &amp; Fruit Structures' : '3. Pomegranate (Multilocular Aril Shrub)', body: id === 'BOT-008' ? 'Protected carpels shield developing seeds and enlist wind or animals for dispersal.' : 'Leathery rind shields polyphenol-rich translucent seeds in divided chambers.', accent: PALETTE.plum })}
      `;
    }

    bodySvg = `
      ${cardBox({ x: 46, y: 142, w: 620, h: 456, fill: PALETTE.paperCard, stroke: PALETTE.olive, strokeWidth: 1.4, accentTop: PALETTE.olive })}
      <text x="356" y="162" font-family="Noto Sans, sans-serif" font-size="13.5" font-weight="700" fill="#FFFFFF" text-anchor="middle">${leftTitle}</text>
      ${leftContent}
      ${cardBox({ x: 688, y: 142, w: 466, h: 456, fill: PALETTE.paperCard, stroke: PALETTE.gold, strokeWidth: 1.4, accentTop: PALETTE.gold })}
      <text x="921" y="162" font-family="Noto Sans, sans-serif" font-size="13.5" font-weight="700" fill="#FFFFFF" text-anchor="middle">SCIENTIFIC FINDINGS &amp; LIMITATIONS</text>
      ${titledCard({ x: 710, y: 192, w: 422, h: 120, title: entry.scientific_topic, body: finding, accent: PALETTE.emerald })}
      ${titledCard({ x: 710, y: 326, w: 422, h: 120, title: 'Functional Context', body: enrichment?.whatItMeans ?? 'Botanical variation spans cellular pigments, root architecture, and ecosystem primary production.', accent: PALETTE.olive })}
      ${titledCard({ x: 710, y: 460, w: 422, h: 120, title: 'Scholarly Guardrail', body: entry.limitations || 'Descriptive botanical observations encourage reflection rather than asserting rigid universal rules.', accent: PALETTE.gold })}
      ${keyTakeawayStrip([
        { label: 'Core Botanical Reality', detail: finding, color: PALETTE.olive },
        { label: 'Verified Source', detail: `Evidence Grade ${entry.evidence_grade} · ${entry.evidence_sources[0]?.author_or_institution ?? 'FAO / Kew / RHS Botany'}.`, color: PALETTE.gold },
      ], 624)}
    `;
  }

  return buildPlateShell({
    title,
    subtitle: wrapLines(subtitle, 108, 1)[0],
    figureCode: id,
    discipline: 'Chapter 05 · Plants, Agriculture & Botany',
    bodySvg,
    footerNote: `Scientific Reference Plate ${id} · Science of Creation Encyclopedia · Botanical Consensus Context`,
    accentColor: PALETTE.olive,
  });
}
