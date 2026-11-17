import {
  calloutTag,
  cardBox,
  chartAxes,
  curvedArrow,
  cycleNodeRing,
  flowArrow,
  hexagonCell,
  keyTakeawayStrip,
  titledCard,
} from '../lib/diagramPrimitives';
import { buildPlateShell, escXml, PALETTE, renderSvgTextLines, wrapLines } from '../lib/plateRenderer';
import type { RawDatasetEntry, TopicEnrichment } from '../../src/types/encyclopedia';

export function buildAnimalsPlateSvg(entry: RawDatasetEntry, enrichment?: TopicEnrichment): string {
  const id = entry.id;
  const title = enrichment?.diagramTitle ?? entry.title;
  const subtitle = enrichment?.diagramCaption ?? entry.scientific_topic;
  const finding = entry.scientific_evidence.finding;
  const kind = (enrichment?.diagramKind ?? 'animal-biodiversity-classification') as string;
  let bodySvg = '';

  const buildRightMetaPanel = (heading: string, midTitle: string, midBody: string, accent = PALETTE.emerald) => `
    ${cardBox({ x: 688, y: 142, w: 466, h: 456, fill: PALETTE.paperCard, stroke: PALETTE.gold, strokeWidth: 1.4, accentTop: PALETTE.gold })}
    <text x="921" y="162" font-family="Noto Sans, sans-serif" font-size="13.5" font-weight="700" fill="#FFFFFF" text-anchor="middle">${escXml(heading)}</text>
    ${titledCard({ x: 710, y: 192, w: 422, h: 120, title: entry.scientific_topic, body: finding, accent })}
    ${titledCard({ x: 710, y: 326, w: 422, h: 120, title: midTitle, body: midBody, accent: PALETTE.blue })}
    ${titledCard({ x: 710, y: 460, w: 422, h: 120, title: 'Scientific &amp; Tafsir Boundary', body: entry.limitations || 'Zoological patterns reflect measurable physiology and ecology across diverse taxa.', accent: PALETTE.rust })}
  `;

  // 1. Bird Wing Anatomy, Aerodynamics, V-Flocking, Vocalization & Migration (ANI-008..013, ANI-045)
  if (
    kind === 'bird-wing-anatomy' ||
    kind === 'bird-flight-aerodynamics' ||
    kind === 'bird-flocking-formations' ||
    kind === 'bird-vocal-communication'
  ) {
    if (id === 'ANI-008') {
      bodySvg = `
        ${cardBox({ x: 46, y: 142, w: 620, h: 456, fill: '#EFF5F9', stroke: PALETTE.blue, strokeWidth: 1.4, accentTop: PALETTE.blue })}
        <text x="356" y="162" font-family="Noto Sans, sans-serif" font-size="13.5" font-weight="700" fill="#FFFFFF" text-anchor="middle">AVIAN AIRFOIL CAMBER &amp; PNEUMATIC BONE ARCHITECTURE</text>
        <!-- Wing airfoil cross-section -->
        <path d="M 110 302 C 135 232, 310 232, 545 304 C 365 294, 210 314, 110 302 Z" fill="#DDEAF4" stroke="${PALETTE.blue}" stroke-width="2.5" />
        ${curvedArrow('M 74 265 Q 250 205 565 268', PALETTE.cyan, 2.6)}
        ${curvedArrow('M 74 328 Q 270 338 565 322', PALETTE.slate, 2.2)}
        ${calloutTag(310, 210, 'Faster Airflow → Lower Pressure Above', PALETTE.cyan, '#FFFFFF', PALETTE.cyan)}
        ${calloutTag(310, 366, 'Higher Pressure Below → Net Upward Lift', PALETTE.blue, '#FFFFFF', PALETTE.blue)}
        <!-- Hollow pneumatic bone cutaway -->
        <rect x="92" y="408" width="528" height="164" rx="6" fill="${PALETTE.paperCard}" stroke="${PALETTE.gold}" />
        <text x="114" y="434" font-family="Noto Sans, sans-serif" font-size="13" font-weight="700" fill="${PALETTE.ink}">Trabecular Struts Inside Hollow Pneumatic Humerus:</text>
        <ellipse cx="210" cy="505" rx="75" ry="42" fill="#F5EBD6" stroke="#7A6238" stroke-width="3" />
        <line x1="158" y1="488" x2="210" y2="540" stroke="#A68B5B" stroke-width="2.5" />
        <line x1="205" y1="466" x2="256" y2="520" stroke="#A68B5B" stroke-width="2.5" />
        <line x1="168" y1="532" x2="255" y2="482" stroke="#A68B5B" stroke-width="2.5" />
        <text x="315" y="492" font-family="Noto Sans, sans-serif" font-size="12.5" font-weight="700" fill="${PALETTE.emerald}">High Stiffness-to-Weight Ratio</text>
        ${renderSvgTextLines(wrapLines('Air-filled bone cavities crossed by diagonal internal struts minimize skeletal weight while resisting torsion during powered wingbeats.', 44, 3), 315, 514, 17, { fontSize: 12, fill: PALETTE.inkMuted })}
        ${buildRightMetaPanel('FLIGHT MORPHOLOGY &amp; BIOMECHANICS', 'Keratin Primary Feathers', enrichment?.whatItMeans ?? 'Barbs and interlocking barbules form lightweight, airtight trailing flight surfaces.', PALETTE.blue)}
      `;
    } else if (id === 'ANI-009') {
      bodySvg = `
        ${cardBox({ x: 46, y: 142, w: 620, h: 456, fill: '#EBF3FA', stroke: PALETTE.blue, strokeWidth: 1.4, accentTop: PALETTE.blue })}
        <text x="356" y="162" font-family="Noto Sans, sans-serif" font-size="13.5" font-weight="700" fill="#FFFFFF" text-anchor="middle">FOUR AERODYNAMIC FORCES IN STEADY GLIDING &amp; FLAPPING</text>
        <!-- Central stylized bird silhouette -->
        <path d="M 270 368 Q 355 340 435 362 Q 375 385 270 368 Z" fill="#2F4858" />
        <path d="M 335 352 Q 395 272 470 296 Q 405 335 355 355 Z" fill="#4A6B82" />
        <circle cx="445" cy="356" r="10" fill="#2F4858" />
        ${flowArrow(355, 340, 355, 212, PALETTE.emerald, 4)}
        ${calloutTag(355, 200, 'LIFT (Wing Pressure + Circulation)', PALETTE.emerald, '#FFFFFF', PALETTE.emerald)}
        ${flowArrow(355, 385, 355, 518, PALETTE.rust, 4)}
        ${calloutTag(355, 548, 'WEIGHT (Gravitational Mass = mg)', PALETTE.rust, '#FFFFFF', PALETTE.rust)}
        ${flowArrow(458, 362, 588, 362, PALETTE.blue, 4)}
        ${calloutTag(556, 398, 'THRUST (Wingbeat)', PALETTE.blue, '#FFFFFF', PALETTE.blue)}
        ${flowArrow(258, 362, 128, 362, PALETTE.ochre, 4)}
        ${calloutTag(155, 398, 'DRAG (Air Resistance)', PALETTE.ochre, '#FFFFFF', PALETTE.ochre)}
        ${buildRightMetaPanel('PHYSICAL SUPPORT VIA ATMOSPHERE', 'Buoyancy &amp; Fluid Air', 'Air acts as a continuous compressible fluid (~1.22 kg/m³) that exerts real upward aerodynamic reaction when deflected downward by wings.', PALETTE.emerald)}
      `;
    } else if (id === 'ANI-010' || id === 'ANI-012') {
      const isMig = id === 'ANI-012';
      bodySvg = `
        ${cardBox({ x: 46, y: 142, w: 620, h: 456, fill: '#EDF4F8', stroke: PALETTE.cyan, strokeWidth: 1.4, accentTop: PALETTE.cyan })}
        <text x="356" y="162" font-family="Noto Sans, sans-serif" font-size="13.5" font-weight="700" fill="#FFFFFF" text-anchor="middle">${isMig ? 'TRANSCONTINENTAL BIRD MIGRATION NAVIGATION CUES' : 'AERODYNAMIC V-FORMATION &amp; WINGTIP UPWASH SAVING'}</text>
        ${
          isMig
            ? `
              <circle cx="356" cy="368" r="154" fill="#DCEAF7" stroke="${PALETTE.blue}" stroke-width="2" />
              <ellipse cx="356" cy="368" rx="150" ry="62" fill="none" stroke="${PALETTE.cyan}" stroke-dasharray="5 3" stroke-width="1.6" />
              <path d="M 310 250 C 295 315, 330 390, 305 478" fill="none" stroke="${PALETTE.rust}" stroke-width="3.5" stroke-dasharray="6 3" />
              <path d="M 412 248 C 430 322, 398 395, 420 475" fill="none" stroke="${PALETTE.emerald}" stroke-width="3.5" />
              ${calloutTag(210, 238, 'Geomagnetic Cryptochrome Compass', PALETTE.rust, '#FFFFFF', PALETTE.rust)}
              ${calloutTag(505, 285, 'Solar &amp; Stellar Azimuth Clock', PALETTE.ochre, '#FFFFFF', PALETTE.ochre)}
              ${calloutTag(356, 548, 'Seasonal Photoperiod Triggers Fat Fueling (Zugunruhe)', PALETTE.emerald, '#FFFFFF', PALETTE.emerald)}
            `
            : `
              <!-- V-formation aerodynamic schematic -->
              ${[
                [356, 224],
                [290, 282], [422, 282],
                [224, 340], [488, 340],
                [158, 398], [554, 398],
              ]
                .map(([bx, by]) => `<path d="M ${bx - 22} ${by + 8} Q ${bx} ${by - 12} ${bx + 22} ${by + 8} Q ${bx} ${by - 2} ${bx - 22} ${by + 8} Z" fill="${PALETTE.slate}" />`)
                .join('')}
              ${curvedArrow('M 332 232 Q 305 256 292 272', PALETTE.cyan, 2.2, true)}
              ${curvedArrow('M 380 232 Q 407 256 420 272', PALETTE.cyan, 2.2, true)}
              <rect x="86" y="458" width="540" height="114" rx="6" fill="${PALETTE.paperCard}" stroke="${PALETTE.cyan}" />
              ${renderSvgTextLines(wrapLines('Trailing birds position wingtips in the rising upwash vortices shed by leaders, reducing induced drag and cutting metabolic heart rate by ~11–20% over long flights.', 68, 4), 104, 488, 18, { fontSize: 12.5, fill: PALETTE.ink })}
            `
        }
        ${buildRightMetaPanel(isMig ? 'SENSORY ORIENTATION BIOLOGY' : 'COLLECTIVE AERODYNAMIC COORDINATION', isMig ? 'Multi-Sensory Redundancy' : 'Rotating Leadership', isMig ? 'Migratory birds combine magnetic fields, polarized sky patterns, landmarks, and olfactory gradients.' : 'Formation leaders trade positions smoothly to distribute energetic savings across the flock.', PALETTE.cyan)}
      `;
    } else {
      // ANI-011 & ANI-045 Vocal communication / Hoopoe
      const isHoopoe = id === 'ANI-045';
      bodySvg = `
        ${cardBox({ x: 46, y: 142, w: 620, h: 456, fill: PALETTE.paperCard, stroke: PALETTE.plum, strokeWidth: 1.4, accentTop: PALETTE.plum })}
        <text x="356" y="162" font-family="Noto Sans, sans-serif" font-size="13.5" font-weight="700" fill="#FFFFFF" text-anchor="middle">${isHoopoe ? 'HOOPOE (UPUPA EPOPS) ACOUSTIC &amp; FORAGING ADAPTATIONS' : 'AVIAN VOCAL SPECTROGRAM &amp; ANIMAL SIGNALLING CHANNELS'}</text>
        ${chartAxes({ x: 118, y: 205, w: 505, h: 245, xLabel: 'Time (Seconds)', yLabel: 'Acoustic Frequency (kHz)', xTicks: ['0.0s', '0.5s', '1.0s', '1.5s', '2.0s'], yTicks: ['1 kHz', '3 kHz', '6 kHz', '9 kHz'] })}
        ${
          isHoopoe
            ? `<rect x="175" y="395" width="46" height="18" rx="4" fill="${PALETTE.ochre}" />
               <rect x="240" y="395" width="46" height="18" rx="4" fill="${PALETTE.ochre}" />
               <rect x="305" y="395" width="46" height="18" rx="4" fill="${PALETTE.ochre}" />
               <rect x="445" y="395" width="46" height="18" rx="4" fill="${PALETTE.ochre}" />
               <text x="345" y="378" font-family="Noto Sans, sans-serif" font-size="12" font-weight="700" fill="${PALETTE.ochre}" text-anchor="middle">Signature Low Triplet "Hoop-poop-poop" (~500–800 Hz)</text>`
            : `<path d="M 140 390 Q 195 250 250 340 Q 320 215 390 365 Q 470 240 565 320" fill="none" stroke="${PALETTE.plum}" stroke-width="4" />
               ${calloutTag(355, 224, 'Syrinx Dual-Membrane Modulation', PALETTE.plum, '#FFFFFF', PALETTE.plum)}`
        }
        <rect x="76" y="486" width="554" height="92" rx="6" fill="#F4EFE3" stroke="${PALETTE.border}" />
        ${renderSvgTextLines(wrapLines(isHoopoe ? 'The Eurasian Hoopoe uses a long curved bill to probe larvae and communicates via rhythmic territorial trisyllabic calls—distinct from prophetic historical narratives.' : 'Animals transmit species-specific alarm, territorial, mating, and foraging information via bioacoustics, odors, and visual displays.', 68, 3), 94, 514, 18, { fontSize: 12.5, fill: PALETTE.ink })}
        ${buildRightMetaPanel('BIOACOUSTICS &amp; SIGNAL INTERPRETATION', 'Distinct From Human Syntax', 'Animal vocalizations coordinate ecological survival without possessing open-ended recursive human language.', PALETTE.plum)}
      `;
    }

  // 2. Ants, Social Insects, Honeybees, Spiders, Flies/Mosquitoes (ANI-014..026, ANI-044)
  } else if (
    kind === 'ant-colony-organisation' ||
    kind === 'ant-chemical-signalling' ||
    kind === 'social-insect-collective-defence' ||
    kind === 'honeybee-colony-castes' ||
    kind === 'honeybee-foraging-navigation' ||
    kind === 'honey-enzymatic-formation' ||
    kind === 'bee-flower-pollination' ||
    kind === 'spider-silk-web-architecture' ||
    kind === 'fly-vs-mosquito-biology'
  ) {
    if (id === 'ANI-014') {
      bodySvg = `
        ${cardBox({ x: 46, y: 142, w: 620, h: 456, fill: '#FAF4E8', stroke: PALETTE.ochre, strokeWidth: 1.4, accentTop: PALETTE.ochre })}
        <text x="356" y="162" font-family="Noto Sans, sans-serif" font-size="13.5" font-weight="700" fill="#FFFFFF" text-anchor="middle">SUBTERRANEAN ANT COLONY ARCHITECTURE &amp; CASTE LABOUR</text>
        <rect x="72" y="218" width="568" height="354" rx="6" fill="#8C6747" stroke="#5C4430" />
        <rect x="72" y="218" width="568" height="24" fill="#638748" />
        <!-- Tunnels and chambers -->
        <path d="M 340 242 L 340 315 L 205 352 M 340 315 L 480 345 M 340 315 L 340 468 L 220 500 M 340 468 L 485 502" fill="none" stroke="#3D2B1C" stroke-width="14" stroke-linecap="round" />
        <ellipse cx="205" cy="352" rx="68" ry="28" fill="#DFC798" stroke="#5C4430" stroke-width="2" />
        <text x="205" y="357" font-family="Noto Sans, sans-serif" font-size="12" font-weight="700" fill="${PALETTE.ink}" text-anchor="middle">Seed Granary</text>
        <ellipse cx="480" cy="345" rx="68" ry="28" fill="#DFC798" stroke="#5C4430" stroke-width="2" />
        <text x="480" y="350" font-family="Noto Sans, sans-serif" font-size="12" font-weight="700" fill="${PALETTE.ink}" text-anchor="middle">Brood Nursery</text>
        <ellipse cx="220" cy="500" rx="74" ry="28" fill="#EFE0BE" stroke="#5C4430" stroke-width="2" />
        <text x="220" y="505" font-family="Noto Sans, sans-serif" font-size="12" font-weight="700" fill="${PALETTE.emerald}" text-anchor="middle">Queen Chamber</text>
        <ellipse cx="485" cy="502" rx="68" ry="28" fill="#C4B699" stroke="#5C4430" stroke-width="2" />
        <text x="485" y="507" font-family="Noto Sans, sans-serif" font-size="12" font-weight="700" fill="${PALETTE.ink}" text-anchor="middle">Ventilation / Midden</text>
        ${calloutTag(340, 206, 'Guarded Mound Entrance', PALETTE.emerald, '#FFFFFF', PALETTE.emerald)}
        ${buildRightMetaPanel('DECENTRALIZED SUPERORGANISM ORDER', 'Emergent Stigmergy', 'No single boss micromanages the colony; millions of local chemical and tactile interactions self-organize foraging and repairs.', PALETTE.ochre)}
      `;
    } else if (id === 'ANI-015' || id === 'ANI-016' || id === 'ANI-044') {
      const mode = id === 'ANI-015' ? 'trail' : id === 'ANI-016' ? 'alarm' : 'instinct';
      bodySvg = `
        ${cardBox({ x: 46, y: 142, w: 620, h: 456, fill: PALETTE.paperCard, stroke: PALETTE.rust, strokeWidth: 1.4, accentTop: PALETTE.rust })}
        <text x="356" y="162" font-family="Noto Sans, sans-serif" font-size="13.5" font-weight="700" fill="#FFFFFF" text-anchor="middle">${mode === 'trail' ? 'TRAIL PHEROMONE REINFORCEMENT FEEDBACK LOOP' : mode === 'alarm' ? 'ALARM PHEROMONE PLUME &amp; COLLECTIVE DEFENCE' : 'INNATE FIXED ACTION PATTERNS VS. LEARNED PLASTICITY'}</text>
        ${
          mode === 'trail'
            ? `
              <circle cx="145" cy="355" r="46" fill="#D7EAE2" stroke="${PALETTE.emerald}" stroke-width="2" />
              <text x="145" y="360" font-family="Noto Sans, sans-serif" font-size="13" font-weight="700" fill="${PALETTE.emerald}" text-anchor="middle">NEST</text>
              <circle cx="565" cy="355" r="46" fill="#F3E5C0" stroke="${PALETTE.ochre}" stroke-width="2" />
              <text x="565" y="360" font-family="Noto Sans, sans-serif" font-size="13" font-weight="700" fill="${PALETTE.ochre}" text-anchor="middle">FOOD</text>
              <path d="M 190 335 Q 355 245 520 335" fill="none" stroke="${PALETTE.border}" stroke-width="2.5" stroke-dasharray="6 4" />
              <path d="M 190 368 Q 355 412 520 368" fill="none" stroke="${PALETTE.rust}" stroke-width="5" />
              ${calloutTag(355, 255, 'Long Detour (Volatile Signal Decays)', PALETTE.slate, '#FFFFFF', PALETTE.slate)}
              ${calloutTag(355, 438, 'Shortest Path Reinforced Exponentially', PALETTE.rust, '#FFFFFF', PALETTE.rust)}
              <text x="356" y="532" font-family="Noto Sans, sans-serif" font-size="12.5" fill="${PALETTE.ink}" text-anchor="middle">Antennal chemoreceptors steer workers up steepest pheromone concentration gradients.</text>
            `
            : mode === 'alarm'
            ? `
              <circle cx="356" cy="355" r="145" fill="${PALETTE.rust}" fill-opacity="0.12" stroke="${PALETTE.rust}" stroke-dasharray="5 3" />
              <circle cx="356" cy="355" r="95" fill="${PALETTE.rust}" fill-opacity="0.2" stroke="${PALETTE.rust}" stroke-dasharray="4 3" />
              <circle cx="356" cy="355" r="45" fill="${PALETTE.rust}" fill-opacity="0.35" stroke="${PALETTE.rust}" stroke-width="2" />
              <text x="356" y="352" font-family="Noto Sans, sans-serif" font-size="13" font-weight="700" fill="${PALETTE.rust}" text-anchor="middle">ALERT ZONE</text>
              <text x="356" y="370" font-family="Noto Sans, sans-serif" font-size="11" fill="${PALETTE.ink}" text-anchor="middle">(Undecane / Terpenes)</text>
              ${flowArrow(235, 355, 298, 355, PALETTE.emerald, 2.5)}
              ${flowArrow(475, 355, 412, 355, PALETTE.emerald, 2.5)}
              ${calloutTag(356, 224, 'Rapid Chemical Diffusion Alerts Nearby Workers &amp; Soldiers', PALETTE.rust, '#FFFFFF', PALETTE.rust)}
              ${calloutTag(356, 542, 'Retreat Underground or Form Defensive Mandible Perimeter', PALETTE.emerald, '#FFFFFF', PALETTE.emerald)}
            `
            : `
              ${titledCard({ x: 74, y: 196, w: 554, h: 112, badge: 'Hardwired Circuitry', title: 'Innate Instincts (Genetic Behavioral Programs)', body: 'Orb-weaving, honeybee waggle grammar, and newborn suckling operate without formal instruction.', accent: PALETTE.emerald })}
              ${titledCard({ x: 74, y: 324, w: 554, h: 112, badge: 'Flexible Learning', title: 'Landmark Memory &amp; Associative Conditioning', body: 'Ants, octopuses, crows, and mammals update foraging routes using experience and social cues.', accent: PALETTE.blue })}
              ${titledCard({ x: 74, y: 452, w: 554, h: 112, badge: 'Ethology Caution', title: 'Natural Instinct Without Moral Agency', body: 'Innate biochemical signaling achieves complex coordination without human deliberative speech.', accent: PALETTE.gold })}
            `
        }
        ${buildRightMetaPanel('CHEMOSENSORY &amp; ETHOLOGY MECHANISM', '20+ Exocrine Glands', enrichment?.whatItMeans ?? 'Exocrine secretions encode trail geometry, colony identity, and threat urgency.', PALETTE.rust)}
      `;
    } else if (kind === 'honeybee-foraging-navigation' || kind === 'honeybee-colony-castes') {
      const isWaggle = kind === 'honeybee-foraging-navigation';
      const isAgeCaste = id === 'ANI-023';
      bodySvg = `
        ${cardBox({ x: 46, y: 142, w: 620, h: 456, fill: '#FAF4E2', stroke: PALETTE.gold, strokeWidth: 1.4, accentTop: PALETTE.gold })}
        <text x="356" y="162" font-family="Noto Sans, sans-serif" font-size="13.5" font-weight="700" fill="#FFFFFF" text-anchor="middle">${isWaggle ? 'VON FRISCH FIGURE-8 WAGGLE DANCE VECTOR LANGUAGE' : isAgeCaste ? 'WORKER BEE TEMPORAL POLYETHISM (LIFESPAN TASKS)' : 'THREE HONEYBEE COLONY CASTES &amp; COMB HIERARCHY'}</text>
        ${
          isWaggle
            ? `
              <circle cx="145" cy="222" r="24" fill="#F2B949" stroke="#C98316" />
              <text x="145" y="264" font-family="Noto Sans, sans-serif" font-size="11.5" font-weight="700" fill="${PALETTE.ochre}" text-anchor="middle">Solar Azimuth (Up)</text>
              <!-- Figure-8 dance path on vertical comb -->
              <circle cx="365" cy="365" r="138" fill="#F7E19C" fill-opacity="0.45" stroke="#A67C23" stroke-width="2" />
              <line x1="365" y1="227" x2="365" y2="503" stroke="${PALETTE.inkMuted}" stroke-dasharray="4 4" />
              <path d="M 365 445 L 425 285" stroke="${PALETTE.rust}" stroke-width="5" stroke-dasharray="6 4" />
              <path d="M 425 285 C 495 270, 495 455, 365 445" fill="none" stroke="${PALETTE.emerald}" stroke-width="2.5" />
              <path d="M 425 285 C 315 245, 245 385, 365 445" fill="none" stroke="${PALETTE.blue}" stroke-width="2.5" />
              ${calloutTag(475, 245, 'Waggle Angle α = Angle From Sun', PALETTE.rust, '#FFFFFF', PALETTE.rust)}
              ${calloutTag(365, 538, 'Waggle Run Duration (~1 s ≈ ~1 km Flight Distance)', PALETTE.emerald, '#FFFFFF', PALETTE.emerald)}
            `
            : isAgeCaste
            ? `
              ${[
                { days: 'Days 1–4', task: 'Cell Cleaner', desc: 'Polishes brood cells &amp; warms eggs.', col: PALETTE.cyan, x: 74 },
                { days: 'Days 5–11', task: 'Nurse Bee', desc: 'Feeds royal jelly &amp; pollen to larvae.', col: PALETTE.emerald, x: 224 },
                { days: 'Days 12–20', task: 'Wax &amp; Guard', desc: 'Extrudes wax scales &amp; defends hive.', col: PALETTE.ochre, x: 374 },
                { days: 'Days 21–42', task: 'Field Forager', desc: 'Collects nectar, pollen &amp; propolis.', col: PALETTE.blue, x: 524 },
              ]
                .map(
                  (c) => `
                  ${cardBox({ x: c.x, y: 210, w: 136, h: 330, fill: PALETTE.paperCard, stroke: c.col, strokeWidth: 1.4, accentTop: c.col })}
                  <text x="${c.x + 68}" y="230" font-family="Noto Sans, sans-serif" font-size="11.5" font-weight="700" fill="#FFFFFF" text-anchor="middle">${c.days}</text>
                  <text x="${c.x + 68}" y="278" font-family="Noto Sans, sans-serif" font-size="13" font-weight="700" fill="${c.col}" text-anchor="middle">${c.task}</text>
                  ${renderSvgTextLines(wrapLines(c.desc, 16, 4), c.x + 68, 320, 18, { fontSize: 12, fill: PALETTE.inkMuted, anchor: 'middle' })}
                `
                )
                .join('')}
            `
            : `
              ${[0, 1, 2].flatMap((r) => [0, 1, 2, 3, 4].map((c) => hexagonCell(180 + c * 52 + (r % 2) * 26, 250 + r * 44, 28))).join('')}
              ${titledCard({ x: 74, y: 400, w: 175, h: 172, title: 'Queen (1)', body: 'Diploid female laying ~1,500 eggs/day; regulates hive via mandibular pheromones.', accent: PALETTE.plum })}
              ${titledCard({ x: 268, y: 400, w: 175, h: 172, title: 'Workers (~50k)', body: 'Sterile females building wax comb, nursing brood &amp; foraging nectar.', accent: PALETTE.emerald })}
              ${titledCard({ x: 462, y: 400, w: 175, h: 172, title: 'Drones (~500)', body: 'Haploid males dedicated solely to seasonal mating flights.', accent: PALETTE.blue })}
            `
        }
        ${buildRightMetaPanel('APIS MELLIFERA COLONY PHYSIOLOGY', 'Hexagonal 120° Mechanics', 'Equilateral hexagonal prism tiling encloses maximal storage volume per gram of secreted beeswax.', PALETTE.gold)}
      `;
    } else if (kind === 'honey-enzymatic-formation' || kind === 'bee-flower-pollination') {
      const isColor = id === 'ANI-020';
      const isPoll = kind === 'bee-flower-pollination';
      const isCropImpact = id === 'ANI-022';
      bodySvg = `
        ${cardBox({ x: 46, y: 142, w: 620, h: 456, fill: '#FAF5E6', stroke: PALETTE.ochre, strokeWidth: 1.4, accentTop: PALETTE.ochre })}
        <text x="356" y="162" font-family="Noto Sans, sans-serif" font-size="13.5" font-weight="700" fill="#FFFFFF" text-anchor="middle">${isColor ? 'FLORAL SOURCE, POLLEN &amp; PFUND COLOR SPECTRUM' : isCropImpact ? 'CROP POLLINATION DEPENDENCE ON INSECT VECTORS' : isPoll ? 'BEE ELECTROSTATIC POLLEN TRANSFER SYMBIOSIS' : 'NECTAR → ENZYMATIC HYDROLYSIS → RIPENED HONEY'}</text>
        ${
          isColor
            ? `
              ${[
                { name: 'Acacia / Clover (Water-White)', hex: '#F6E8B8', min: 'Low Mineral (0.04%) · High Fructose', y: 205 },
                { name: 'Wildflower / Sidr (Light Amber)', hex: '#E0AC41', min: 'Moderate Flavonoids &amp; Pollen Diversity', y: 295 },
                { name: 'Chestnut / Forest Honeydew', hex: '#A16022', min: 'Rich Potassium, Iron &amp; Phenolics', y: 385 },
                { name: 'Buckwheat (Dark Amber)', hex: '#4F2912', min: 'Highest Antioxidants &amp; Trace Minerals (~0.5%)', y: 475 },
              ]
                .map(
                  (h, i) => `
                  <rect x="78" y="${h.y}" width="110" height="68" rx="6" fill="${h.hex}" stroke="#5C4430" stroke-width="1.5" />
                  <rect x="202" y="${h.y}" width="430" height="68" rx="6" fill="${PALETTE.paperCard}" stroke="${PALETTE.border}" />
                  <text x="220" y="${h.y + 28}" font-family="Noto Sans, sans-serif" font-size="13.5" font-weight="700" fill="${PALETTE.ink}">${i + 1}. ${h.name}</text>
                  <text x="220" y="${h.y + 50}" font-family="Noto Sans, sans-serif" font-size="12" fill="${PALETTE.inkMuted}">${h.min}</text>
                `
                )
                .join('')}
            `
            : isCropImpact
            ? `
              ${[
                { label: 'Almonds &amp; Orchard Apples (Entomophilous)', pct: 95, col: PALETTE.emerald, y: 215 },
                { label: 'Squash, Melons, Cucumbers &amp; Berries', pct: 86, col: PALETTE.olive, y: 300 },
                { label: 'Coffee, Oilseed Rape &amp; Sunflowers', pct: 55, col: PALETTE.ochre, y: 385 },
                { label: 'Wheat, Rice &amp; Maize (Wind Pollinated)', pct: 5, col: PALETTE.slate, y: 470 },
              ]
                .map(
                  (b) => `
                  <text x="78" y="${b.y}" font-family="Noto Sans, sans-serif" font-size="13" font-weight="700" fill="${PALETTE.ink}">${b.label}</text>
                  <rect x="78" y="${b.y + 12}" width="530" height="32" rx="5" fill="#EAE6DA" />
                  <rect x="78" y="${b.y + 12}" width="${(530 * b.pct) / 100}" height="32" rx="5" fill="${b.col}" />
                  <text x="${b.pct >= 50 ? 92 : 92 + (530 * b.pct) / 100}" y="${b.y + 33}" font-family="Noto Sans, sans-serif" font-size="12.5" font-weight="700" fill="${b.pct >= 50 ? '#FFFFFF' : b.col}">~${b.pct}% Pollinator Boost</text>
                `
                )
                .join('')}
            `
            : isPoll
            ? `
              ${titledCard({ x: 76, y: 196, w: 554, h: 112, badge: 'Step 01 · Attraction', title: 'UV Nectar Guides &amp; Floral Fragrance', body: 'Petals display ultraviolet patterns invisible to humans, guiding positively charged flying bees straight to anthers.', accent: PALETTE.plum })}
              ${titledCard({ x: 76, y: 324, w: 554, h: 112, badge: 'Step 02 · Harvesting', title: 'Plumose Hairs &amp; Corbicula Baskets', body: 'Branched body hairs capture thousands of pollen grains; hind-leg combs pack them for hive protein.', accent: PALETTE.ochre })}
              ${titledCard({ x: 76, y: 452, w: 554, h: 112, badge: 'Step 03 · Cross-Pollination', title: 'Conspecific Stigma Deposition', body: 'Floral constancy ensures bees visit matching species consecutively, boosting fruit and seed genetic vigor.', accent: PALETTE.emerald })}
            `
            : `
              ${titledCard({ x: 76, y: 196, w: 554, h: 108, badge: '1. Floral Nectar (~70% Water)', title: 'Sucrose Foraging Into Honey Crop', body: 'Bees imbibe dilute floral nectar and carry it inside a specialized foregut honey stomach distinct from digestion.', accent: PALETTE.cyan })}
              ${flowArrow(353, 306, 353, 330, PALETTE.gold, 2.5)}
              ${titledCard({ x: 76, y: 334, w: 554, h: 108, badge: '2. Enzymatic Catalysis', title: 'Invertase &amp; Glucose Oxidase Action', body: 'Gland enzymes split sucrose into glucose + fructose and produce trace gluconic acid + H₂O₂.', accent: PALETTE.ochre })}
              ${flowArrow(353, 444, 353, 468, PALETTE.emerald, 2.5)}
              ${titledCard({ x: 76, y: 472, w: 554, h: 108, badge: '3. Hive Dehumidification (~17.5% Water)', title: 'Wing-Fan Evaporation &amp; Wax Capping', body: 'Trophallaxis and active wing ventilation reduce moisture below fermentation threshold before sealing.', accent: PALETTE.emerald })}
            `
        }
        ${buildRightMetaPanel('BIOCHEMISTRY &amp; MUTUALISM', 'Antimicrobial &amp; Nutritional Limits', 'Low water activity (~0.60) and acidic pH ~3.9 inhibit spoilage; clinical claims must stay strictly evidence-graded.', PALETTE.ochre)}
      `;
    } else if (kind === 'spider-silk-web-architecture') {
      bodySvg = `
        ${cardBox({ x: 46, y: 142, w: 620, h: 456, fill: '#F3F6FA', stroke: PALETTE.slate, strokeWidth: 1.4, accentTop: PALETTE.slate })}
        <text x="356" y="162" font-family="Noto Sans, sans-serif" font-size="13.5" font-weight="700" fill="#FFFFFF" text-anchor="middle">ORB-WEB RADIAL ENGINEERING &amp; DRAGLINE BIOPOLYMERS</text>
        <!-- Concentric orb web -->
        <circle cx="245" cy="345" r="142" fill="none" stroke="#8599AD" stroke-width="1.3" />
        <circle cx="245" cy="345" r="112" fill="none" stroke="#8599AD" stroke-width="1.3" />
        <circle cx="245" cy="345" r="82" fill="none" stroke="#8599AD" stroke-width="1.3" />
        <circle cx="245" cy="345" r="52" fill="none" stroke="#8599AD" stroke-width="1.3" />
        <circle cx="245" cy="345" r="24" fill="none" stroke="#8599AD" stroke-width="1.3" />
        ${[0, 30, 60, 90, 120, 150].map((deg) => {
          const rad = (deg * Math.PI) / 180;
          const dx = 152 * Math.cos(rad);
          const dy = 152 * Math.sin(rad);
          return `<line x1="${(245 - dx).toFixed(1)}" y1="${(345 - dy).toFixed(1)}" x2="${(245 + dx).toFixed(1)}" y2="${(345 + dy).toFixed(1)}" stroke="${PALETTE.slate}" stroke-width="1.4" />`;
        }).join('')}
        ${calloutTag(245, 535, 'Major Ampullate Radials (~1.1 GPa) + Viscid Spiral', PALETTE.slate, '#FFFFFF', PALETTE.slate)}
        <!-- Mechanical bar comparison -->
        <rect x="425" y="210" width="215" height="305" rx="6" fill="${PALETTE.paperCard}" stroke="${PALETTE.border}" />
        <text x="532" y="236" font-family="Noto Sans, sans-serif" font-size="12" font-weight="700" fill="${PALETTE.ink}" text-anchor="middle">Tensile Toughness (MJ/m³)</text>
        <rect x="455" y="268" width="42" height="190" rx="4" fill="${PALETTE.emerald}" />
        <text x="476" y="478" font-family="Noto Sans, sans-serif" font-size="11" font-weight="700" fill="${PALETTE.emerald}" text-anchor="middle">Silk (~160)</text>
        <rect x="518" y="395" width="42" height="63" rx="4" fill="${PALETTE.ochre}" />
        <text x="539" y="478" font-family="Noto Sans, sans-serif" font-size="11" font-weight="700" fill="${PALETTE.ochre}" text-anchor="middle">Kevlar (~50)</text>
        <rect x="580" y="444" width="42" height="14" rx="3" fill="${PALETTE.slate}" />
        <text x="601" y="478" font-family="Noto Sans, sans-serif" font-size="11" font-weight="700" fill="${PALETTE.slate}" text-anchor="middle">Steel (~6)</text>
        ${buildRightMetaPanel('BIOMATERIAL STRENGTH VS. ECOLOGICAL FRAGILITY', 'Paradoxical Metaphor Precision', 'While nanoscale fibroin crystals rival steel per unit weight, microscopic micrometer-thin webs tear instantly under weather or large impact.', PALETTE.slate)}
      `;
    } else {
      // ANI-025 Fly vs ANI-026 Mosquito
      const isMosquito = id === 'ANI-026';
      bodySvg = `
        ${cardBox({ x: 46, y: 142, w: 620, h: 456, fill: PALETTE.paperCard, stroke: isMosquito ? PALETTE.rust : PALETTE.cyan, strokeWidth: 1.4, accentTop: isMosquito ? PALETTE.rust : PALETTE.cyan })}
        <text x="356" y="162" font-family="Noto Sans, sans-serif" font-size="13.5" font-weight="700" fill="#FFFFFF" text-anchor="middle">${isMosquito ? 'CULICIDAE MOSQUITO: 6-STYLET PROBOSCIS &amp; HOLOMETABOLISM' : 'DIPTERA HOUSEFLY: HALTERES GYROSCOPES &amp; LABELLUM'}</text>
        ${titledCard({ x: 74, y: 196, w: 554, h: 112, badge: 'Micro-Biomechanics', title: isMosquito ? 'Six Specialized Piercing–Sucking Stylets' : 'Oscillating Halteres (Biological Gyroscopes)', body: isMosquito ? 'Twin serrated maxillae saw skin painlessly while salivary anticoagulants keep capillary blood flowing.' : 'Club-shaped hindwings beat out of phase at ~200 Hz, sensing Coriolis torque to steer rapid evasive turns.', accent: isMosquito ? PALETTE.rust : PALETTE.cyan })}
        ${titledCard({ x: 74, y: 324, w: 554, h: 112, badge: 'Sensory Integration', title: isMosquito ? 'CO₂ Plume, Octenol &amp; Infrared Host Tracking' : '4,000+ Compound Eye Ommatidia &amp; Sponging Labellum', body: isMosquito ? 'Antennae detect exhaled CO₂ plumes from >30 m before shifting to thermal skin homing.' : 'Fast flicker-fusion rate (~250 Hz) perceives rapid motion; tarsal chemoreceptors taste food on contact.', accent: PALETTE.blue })}
        ${titledCard({ x: 74, y: 452, w: 554, h: 112, badge: 'Developmental Biology', title: isMosquito ? '4-Stage Aquatic Egg → Larva → Pupa → Imago' : 'Nutrient Decomposers &amp; Mechanical Pathogen Vectors', body: isMosquito ? 'Female mosquitoes require blood protein for vitellogenesis; only females bite while males feed on floral nectar.' : 'Regurgitation-assisted sponging feeds microbes alongside decaying organic matter recycling.', accent: PALETTE.emerald })}
        ${buildRightMetaPanel('COMPLEXITY IN MINIATURE DIPTERA', 'Micro-Scale Organ Systems', 'Even sub-centimeter insects possess miniature nervous systems, striated flight muscles, heart aorta, and tracheal oxygen tubes.', isMosquito ? PALETTE.rust : PALETTE.cyan)}
      `;
    }

  // 3. Livestock, Ruminant Digestion, Lactation, Camels & Horses (ANI-027..036)
  } else if (
    kind === 'ruminant-digestive-compartments' ||
    kind === 'mammalian-lactation-synthesis' ||
    kind === 'camel-water-conservation' ||
    kind === 'camel-foot-sand-locomotion' ||
    id === 'ANI-035'
  ) {
    if (id === 'ANI-028' || id === 'ANI-029' || id === 'ANI-030') {
      const isRumenPath = id === 'ANI-030';
      const isMilkChart = id === 'ANI-029';
      bodySvg = `
        ${cardBox({ x: 46, y: 142, w: 620, h: 456, fill: PALETTE.paperCard, stroke: PALETTE.blue, strokeWidth: 1.4, accentTop: PALETTE.blue })}
        <text x="356" y="162" font-family="Noto Sans, sans-serif" font-size="13.5" font-weight="700" fill="#FFFFFF" text-anchor="middle">${isRumenPath ? 'RUMINANT DIGESTION → BLOOD CIRCULATION → MAMMARY SYNTHESIS' : isMilkChart ? 'MAMMALIAN MILK COMPOSITION COMPARISON (% BY MASS)' : 'MAMMARY ALVEOLAR EPITHELIUM: BLOOD-TO-MILK BIOSYNTHESIS'}</text>
        ${
          isMilkChart
            ? `
              ${[
                { sp: 'Cow Milk (~3.7% Fat · 3.4% Protein · 4.8% Lactose)', p: 78, col: PALETTE.blue, y: 210 },
                { sp: 'Goat Milk (~4.1% Fat · 3.6% Protein · 4.4% Lactose)', p: 82, col: PALETTE.emerald, y: 295 },
                { sp: 'Camel Milk (~3.5% Fat · 3.1% Protein · Higher Vit-C)', p: 74, col: PALETTE.ochre, y: 380 },
                { sp: 'Human Milk (~4.0% Fat · 1.1% Protein · 7.0% Lactose)', p: 88, col: PALETTE.plum, y: 465 },
              ]
                .map(
                  (m) => `
                  <text x="78" y="${m.y}" font-family="Noto Sans, sans-serif" font-size="12.5" font-weight="700" fill="${PALETTE.ink}">${m.sp}</text>
                  <rect x="78" y="${m.y + 12}" width="530" height="30" rx="5" fill="#EAE6DA" />
                  <rect x="78" y="${m.y + 12}" width="${(530 * m.p) / 100}" height="30" rx="5" fill="${m.col}" />
                `
                )
                .join('')}
            `
            : isRumenPath
            ? `
              ${titledCard({ x: 76, y: 196, w: 554, h: 108, badge: '1. Four-Chamber Rumen', title: 'Microbial Cellulose Fermentation (Rumen/Reticulum)', body: 'Anaerobic bacteria ferment plant fiber into volatile fatty acids (VFAs) and microbial protein.', accent: PALETTE.olive })}
              ${flowArrow(353, 306, 353, 330, PALETTE.rust, 2.5)}
              ${titledCard({ x: 76, y: 334, w: 554, h: 108, badge: '2. Portal Bloodstream', title: 'Selective Absorption Across Intestinal Villi (Not Direct Gut Mixing)', body: 'Digested amino acids, glucose, acetate, and calcium enter systemic blood plasma while wastes stay isolated.', accent: PALETTE.rust })}
              ${flowArrow(353, 444, 353, 468, PALETTE.blue, 2.5)}
              ${titledCard({ x: 76, y: 472, w: 554, h: 108, badge: '3. Mammary Glands', title: 'Alveolar Lactocytes Synthesize Pure Milk', body: 'Specialized epithelial cells rebuild blood nutrients into sterile emulsion—anatomically separate from chyme/feces.', accent: PALETTE.blue })}
            `
            : `
              <!-- Blood capillary -> Lactocyte -> Alveolus lumen -->
              <rect x="74" y="218" width="145" height="310" rx="8" fill="#F5DCD4" stroke="${PALETTE.rust}" stroke-width="2" />
              <text x="146" y="252" font-family="Noto Sans, sans-serif" font-size="13" font-weight="700" fill="${PALETTE.rust}" text-anchor="middle">Blood Capillary</text>
              <text x="146" y="290" font-family="Noto Sans, sans-serif" font-size="11.5" fill="${PALETTE.ink}" text-anchor="middle">Glucose</text>
              <text x="146" y="325" font-family="Noto Sans, sans-serif" font-size="11.5" fill="${PALETTE.ink}" text-anchor="middle">Amino Acids</text>
              <text x="146" y="360" font-family="Noto Sans, sans-serif" font-size="11.5" fill="${PALETTE.ink}" text-anchor="middle">Acetate / Lipids</text>
              <text x="146" y="395" font-family="Noto Sans, sans-serif" font-size="11.5" fill="${PALETTE.ink}" text-anchor="middle">Ca²⁺ &amp; PO₄³⁻</text>
              ${flowArrow(224, 365, 266, 365, PALETTE.rust, 3)}
              <rect x="270" y="218" width="180" height="310" rx="8" fill="#E6F2EE" stroke="${PALETTE.emerald}" stroke-width="2" />
              <text x="360" y="252" font-family="Noto Sans, sans-serif" font-size="13" font-weight="700" fill="${PALETTE.emerald}" text-anchor="middle">Lactocyte Cell</text>
              <text x="360" y="310" font-family="Noto Sans, sans-serif" font-size="11.5" fill="${PALETTE.ink}" text-anchor="middle">RER: Casein Protein</text>
              <text x="360" y="355" font-family="Noto Sans, sans-serif" font-size="11.5" fill="${PALETTE.ink}" text-anchor="middle">Golgi: Lactose Synthase</text>
              <text x="360" y="400" font-family="Noto Sans, sans-serif" font-size="11.5" fill="${PALETTE.ink}" text-anchor="middle">Triglyceride Droplets</text>
              ${flowArrow(456, 365, 496, 365, PALETTE.blue, 3)}
              <rect x="500" y="218" width="142" height="310" rx="8" fill="#FAF6EC" stroke="${PALETTE.gold}" stroke-width="2" />
              <text x="571" y="252" font-family="Noto Sans, sans-serif" font-size="13" font-weight="700" fill="${PALETTE.gold}" text-anchor="middle">Milk Lumen</text>
              <text x="571" y="350" font-family="Noto Sans, sans-serif" font-size="12" font-weight="700" fill="${PALETTE.ink}" text-anchor="middle">Complete Bioactive</text>
              <text x="571" y="370" font-family="Noto Sans, sans-serif" font-size="12" font-weight="700" fill="${PALETTE.ink}" text-anchor="middle">Nutrition</text>
            `
        }
        ${buildRightMetaPanel('ENDOCRINE &amp; ANATOMICAL LACTATION', 'Prolactin &amp; Oxytocin Control', 'Hormonal pathways match milk yield to newborn nursing demand, proving physiological precision rather than random mixing.', PALETTE.blue)}
      `;
    } else if (kind === 'camel-water-conservation' || kind === 'camel-foot-sand-locomotion') {
      const isFoot = kind === 'camel-foot-sand-locomotion';
      const isTransport = id === 'ANI-034';
      const isWater = id === 'ANI-033';
      bodySvg = `
        ${cardBox({ x: 46, y: 142, w: 620, h: 456, fill: '#FBF5E6', stroke: PALETTE.ochre, strokeWidth: 1.4, accentTop: PALETTE.ochre })}
        <text x="356" y="162" font-family="Noto Sans, sans-serif" font-size="13.5" font-weight="700" fill="#FFFFFF" text-anchor="middle">${isTransport ? 'ARID CARAVAN BIOMECHANICS &amp; PACING GAIT STABILITY' : isFoot ? 'CAMEL BROAD ELASTIC FOOT PAD VS. NARROW HOOF PRESSURE' : isWater ? 'CAMEL RENAL CONCENTRATION &amp; OVAL ERYTHROCYTES' : 'CAMEL HETEROTHERMY: SPARING SWEAT ACROSS DESERT DAYS'}</text>
        ${
          isTransport
            ? `
              <text x="82" y="210" font-family="Noto Sans, sans-serif" font-size="12.5" font-weight="700" fill="${PALETTE.ink}">Comparative Ground Contact Pressure Under Caravan Load (kPa):</text>
              ${[
                { lbl: 'Camel Elastic Foot Pad (~38 kPa · Floats on Loose Dunes)', w: 20, col: PALETTE.emerald, y: 242 },
                { lbl: 'Pack Mule / Horse Hoof (~165 kPa · Sinks in Deep Sand)', w: 64, col: PALETTE.ochre, y: 316 },
                { lbl: 'Loaded Iron/Wood Wheel (~320+ kPa · Locks in Erg Sand)', w: 94, col: PALETTE.rust, y: 390 },
              ]
                .map(
                  (b) => `
                  <text x="82" y="${b.y}" font-family="Noto Sans, sans-serif" font-size="12" font-weight="700" fill="${PALETTE.ink}">${b.lbl}</text>
                  <rect x="82" y="${b.y + 10}" width="530" height="24" rx="4" fill="#EAE2CF" />
                  <rect x="82" y="${b.y + 10}" width="${(530 * b.w) / 100}" height="24" rx="4" fill="${b.col}" />
                `
                )
                .join('')}
              ${titledCard({ x: 74, y: 458, w: 562, h: 112, badge: 'Ipsilateral Pacing Gait', title: 'Caravan Endurance &amp; Low Cost of Transport', body: 'Same-side fore/hind leg swing stabilizes tall 150–250 kg loads across undulating dunes with minimal heat waste.', accent: PALETTE.ochre })}
            `
            : isFoot
            ? `
              <!-- Foot pressure comparison -->
              <rect x="74" y="455" width="554" height="108" fill="#D5BC8E" stroke="#8C6D46" />
              <text x="351" y="544" font-family="Noto Sans, sans-serif" font-size="12" font-weight="700" fill="#4A3519" text-anchor="middle">LOOSE GRANULAR DESERT SAND BED</text>
              <!-- Narrow horse hoof sinking -->
              <rect x="155" y="340" width="44" height="145" fill="#5A4632" />
              <text x="177" y="325" font-family="Noto Sans, sans-serif" font-size="12.5" font-weight="700" fill="${PALETTE.rust}" text-anchor="middle">Narrow Hoof Sinks</text>
              <text x="177" y="425" font-family="Noto Sans, sans-serif" font-size="11.5" font-weight="700" fill="#FFFFFF" text-anchor="middle">~180+ kPa</text>
              <!-- Broad Camel pad -->
              <rect x="425" y="315" width="60" height="108" fill="#A68256" />
              <ellipse cx="455" cy="442" rx="95" ry="26" fill="#C49E6C" stroke="#5A4632" stroke-width="2.5" />
              <text x="455" y="295" font-family="Noto Sans, sans-serif" font-size="12.5" font-weight="700" fill="${PALETTE.emerald}" text-anchor="middle">Two-Toed Elastic Fat Cushion</text>
              ${calloutTag(455, 494, 'Spreads Weight (~35–45 kPa · No Sinkage)', PALETTE.emerald, '#FFFFFF', PALETTE.emerald)}
            `
            : isWater
            ? `
              ${titledCard({ x: 74, y: 196, w: 554, h: 112, badge: '1. Hematology', title: 'Oval Nucleated-Shaped Red Blood Cells', body: 'Expand up to ~240% volume without bursting when drinking ~100 L water in 10 minutes.', accent: PALETTE.rust })}
              ${titledCard({ x: 74, y: 324, w: 554, h: 112, badge: '2. Renal &amp; Nasal Recovery', title: 'Long Loop of Henle &amp; Condensing Turbinates', body: 'Excretes highly concentrated urine &amp; desiccates fecal pellets while trapping ~60% exhaled breath moisture.', accent: PALETTE.cyan })}
              ${titledCard({ x: 74, y: 452, w: 554, h: 112, badge: '3. Fat Hump Myth Clarified', title: 'Hump Stores Localized Adipose Tissue (Not Liquid Water)', body: 'Concentrating fat dorsally avoids full-body insulation overheating; metabolic oxidation supplies net energy.', accent: PALETTE.gold })}
            `
            : `
              ${chartAxes({ x: 118, y: 205, w: 500, h: 295, xLabel: 'Diurnal Desert Ambient Heat Cycle', yLabel: 'Core Body Temperature (°C)', xTicks: ['Dawn', 'Noon Heat', 'Afternoon Peak', 'Night Cooling'], yTicks: ['34°C', '36°C', '38°C', '40°C', '42°C'] })}
              <path d="M 122 465 Q 290 420 465 245 L 612 315" fill="none" stroke="${PALETTE.ochre}" stroke-width="3.5" />
              <line x1="122" y1="375" x2="612" y2="375" stroke="${PALETTE.blue}" stroke-width="2.5" stroke-dasharray="6 4" />
              ${calloutTag(440, 224, 'Camel Stores Heat (34°→41°C) · Saves 5L Sweat!', PALETTE.ochre, '#FFFFFF', PALETTE.ochre)}
              ${calloutTag(225, 355, 'Human Fixed (~37°C · Sweats Heavily)', PALETTE.blue, '#FFFFFF', PALETTE.blue)}
            `
        }
        ${buildRightMetaPanel('DESERT CAMELID PHYSIOLOGY', 'Extreme Hydration Resilience', enrichment?.whatItMeans ?? 'Integrated nasal, thermal, hematological, and locomotor specializations support prolonged desert travel.', PALETTE.ochre)}
      `;
    } else {
      // ANI-027, ANI-035, ANI-036
      const isHorse = id === 'ANI-035';
      const isMultiUse = id === 'ANI-036';
      bodySvg = `
        ${cardBox({ x: 46, y: 142, w: 620, h: 456, fill: PALETTE.paperCard, stroke: PALETTE.emerald, strokeWidth: 1.4, accentTop: PALETTE.emerald })}
        <text x="356" y="162" font-family="Noto Sans, sans-serif" font-size="13.5" font-weight="700" fill="#FFFFFF" text-anchor="middle">${isHorse ? 'EQUINE ELASTIC TENDON SPRINGS &amp; GALLOP BIOENERGETICS' : isMultiUse ? 'INTEGRATED PASTORAL LIVESTOCK ECOSYSTEM VALUE' : 'HERBIVOROUS LIVESTOCK &amp; HUMAN FOOD-SYSTEM CONVERSION'}</text>
        ${
          isHorse
            ? `
              ${titledCard({ x: 74, y: 196, w: 554, h: 112, badge: 'Locomotor Lever', title: 'Single-Digit Hoof &amp; Fused Cannon Bone', body: 'Elongated distal limbs reduce rotational inertia while elastic flexor tendons return ~36% stride energy passively.', accent: PALETTE.rust })}
              ${titledCard({ x: 74, y: 324, w: 554, h: 112, badge: 'Cardiorespiratory Coupling', title: '60+ L Cardiac Output &amp; Splenic Red-Cell Reserve', body: 'Striding motion couples viscerally with breathing 1:1 during gallop (~65–70 km/h sprint).', accent: PALETTE.blue })}
              ${titledCard({ x: 74, y: 452, w: 554, h: 112, badge: 'Historical Transport', title: 'Mobility, Herding &amp; Agricultural Traction', body: 'Selectively bred equids transformed human transport and rapid geographic communication.', accent: PALETTE.gold })}
            `
            : isMultiUse
            ? `
              ${cycleNodeRing(356, 370, 142, [
                { label: 'Dairy &amp; Protein', sub: 'Milk, Yogurt, Cheese', color: PALETTE.blue },
                { label: 'Warmth &amp; Fiber', sub: 'Wool, Hair &amp; Leather', color: PALETTE.ochre },
                { label: 'Draught &amp; Travel', sub: 'Plowing &amp; Pack Loads', color: PALETTE.emerald },
                { label: 'Soil Fertility', sub: 'Organic Manure Cycling', color: PALETTE.olive },
              ])}
              <text x="356" y="366" font-family="Liberation Serif, serif" font-size="12" font-weight="700" fill="${PALETTE.emerald}" text-anchor="middle">PASTORAL</text>
              <text x="356" y="382" font-family="Liberation Serif, serif" font-size="12" font-weight="700" fill="${PALETTE.emerald}" text-anchor="middle">SYMBIOSIS</text>
            `
            : `
              ${titledCard({ x: 74, y: 196, w: 554, h: 112, badge: 'Marginal Rangelands', title: 'Converting Inedible Cellulose Into Nutrition', body: 'Semi-arid steppes unfit for wheat or rice sustain cattle, sheep &amp; goats via symbiotic microbes.', accent: PALETTE.olive })}
              ${titledCard({ x: 74, y: 324, w: 554, h: 112, badge: 'Biochemical Profile', title: 'Complete Amino Acids, Iron, Zinc &amp; Vitamin B₁₂', body: 'Animal-source foods complement plant staples cleanly in balanced diets.', accent: PALETTE.emerald })}
              ${titledCard({ x: 74, y: 452, w: 554, h: 112, badge: 'Planetary Stewardship', title: 'Sustainable Herd Density &amp; Welfare', body: 'Modern ecology highlights humane husbandry and methane/grazing footprint balance.', accent: PALETTE.ochre })}
            `
        }
        ${buildRightMetaPanel('AGRICULTURAL ZOOLOGY CONTEXT', 'Human–Domesticate Co-Evolution', enrichment?.whatItMeans ?? 'Domesticated ungulates turn coarse cellulose forage into caloric nutrition, fibers, and agricultural energy.', PALETTE.emerald)}
      `;
    }

  // 4. Biodiversity, Aquatic Biology, Skins/Wool, Reproduction, Companionship & Biosphere Synthesis (Remaining ANI topics)
  } else {
    let leftTitle = 'ZOOLOGICAL BIODIVERSITY &amp; FUNCTIONAL ANATOMY';
    let leftCustom = '';

    if (id === 'ANI-002') {
      leftTitle = 'PROPORTIONAL TAXONOMIC DIVERSITY ACROSS ANIMAL PHYLA';
      leftCustom = `
        ${[
          { name: 'Arthropoda (Insects, Spiders, Crustaceans)', pct: 80, count: '~1,250,000+ sp.', col: PALETTE.ochre, y: 210 },
          { name: 'Mollusca (Snails, Bivalves, Cephalopods)', pct: 18, count: '~85,000 sp.', col: PALETTE.cyan, y: 295 },
          { name: 'Chordata (Fish, Birds, Reptiles, Mammals)', pct: 15, count: '~70,000 sp.', col: PALETTE.emerald, y: 380 },
          { name: 'Annelida, Cnidaria, Nematoda &amp; Marine Phyla', pct: 22, count: '~100,000+ sp.', col: PALETTE.blue, y: 465 },
        ]
          .map(
            (b) => `
            <text x="76" y="${b.y}" font-family="Noto Sans, sans-serif" font-size="13" font-weight="700" fill="${PALETTE.ink}">${b.name}</text>
            <rect x="76" y="${b.y + 10}" width="530" height="30" rx="5" fill="#EAE6DA" />
            <rect x="76" y="${b.y + 10}" width="${(530 * b.pct) / 100}" height="30" rx="5" fill="${b.col}" />
            <text x="${92 + (530 * b.pct) / 100}" y="${b.y + 30}" font-family="Noto Sans, sans-serif" font-size="12" font-weight="700" fill="${b.col}">${b.count}</text>
          `
          )
          .join('')}
      `;
    } else if (id === 'ANI-003') {
      leftTitle = 'CELLULAR WATER FRACTION ACROSS METAZOAN PHYLA';
      leftCustom = `
        ${[
          { name: 'Marine Jellyfish (Cnidaria Mesoglea)', pct: 95, col: PALETTE.cyan, y: 210 },
          { name: 'Freshwater Trout (Muscle + Plasma)', pct: 76, col: PALETTE.blue, y: 295 },
          { name: 'Mammalian Newborn / Adult Tissue', pct: 66, col: PALETTE.emerald, y: 380 },
          { name: 'Hydrated Desert Arthropods &amp; Reptiles', pct: 62, col: PALETTE.ochre, y: 465 },
        ]
          .map(
            (b) => `
            <text x="76" y="${b.y}" font-family="Noto Sans, sans-serif" font-size="13" font-weight="700" fill="${PALETTE.ink}">${b.name} (~${b.pct}% H₂O)</text>
            <rect x="76" y="${b.y + 10}" width="530" height="30" rx="5" fill="#EAE6DA" />
            <rect x="76" y="${b.y + 10}" width="${(530 * b.pct) / 100}" height="30" rx="5" fill="${b.col}" />
          `
          )
          .join('')}
      `;
    } else if (id === 'ANI-004' || id === 'ANI-007') {
      const isLandGait = id === 'ANI-007';
      leftTitle = isLandGait ? 'QUADRUPED &amp; BIPED TERRESTRIAL GAIT MECHANICS' : 'EVOLUTIONARY LOCOMOTION MODES ACROSS ANIMAL TAXA';
      leftCustom = isLandGait
        ? `
          ${titledCard({ x: 74, y: 196, w: 554, h: 112, title: '1. Plantigrade / Digitigrade / Unguligrade Stance', body: 'Bears walk flat-footed; dogs run on toes; horses sprint on single keratinized hoof tips for maximum stride.', accent: PALETTE.ochre })}
          ${titledCard({ x: 74, y: 324, w: 554, h: 112, title: '2. Ground Reaction &amp; Friction Traction', body: 'Claws, pads, and hooves convert muscle torque into horizontal forward propulsion.', accent: PALETTE.emerald })}
          ${titledCard({ x: 74, y: 452, w: 554, h: 112, title: '3. Symmetrical Walk vs. Asymmetric Gallop', body: 'Gait shifts conserve metabolic cost of transport as speed rises.', accent: PALETTE.blue })}
        `
        : `
          ${titledCard({ x: 74, y: 196, w: 266, h: 162, badge: '0 Legs', title: 'Limbless Undulation', body: 'Snakes, eels, and earthworms propel via lateral waves or hydrostatic peristalsis.', accent: PALETTE.olive })}
          ${titledCard({ x: 360, y: 196, w: 266, h: 162, badge: '2 Legs', title: 'Bipedal Balance', body: 'Birds, humans, and hopping kangaroos balance center of mass over two hind limbs.', accent: PALETTE.blue })}
          ${titledCard({ x: 74, y: 376, w: 266, h: 162, badge: '4 Legs', title: 'Quadruped Gait', body: 'Amphibians, reptiles &amp; mammals achieve stable crawling, trotting, and galloping.', accent: PALETTE.emerald })}
          ${titledCard({ x: 360, y: 376, w: 266, h: 162, badge: '6–100+ Legs', title: 'Polyped Exoskeleton', body: 'Insects (6), arachnids (8), &amp; centipedes coordinate alternating tripods.', accent: PALETTE.ochre })}
        `;
    } else if (id === 'ANI-048') {
      leftTitle = 'FISH COUNTERCURRENT GILL GAS EXCHANGE &amp; BUOYANCY';
      leftCustom = `
        <rect x="76" y="205" width="548" height="165" rx="6" fill="#D4EFF2" stroke="${PALETTE.cyan}" stroke-width="1.5" />
        <text x="96" y="232" font-family="Noto Sans, sans-serif" font-size="13" font-weight="700" fill="${PALETTE.cyan}">Water Over Gill Lamellae (100% → 15% O₂)</text>
        ${flowArrow(120, 260, 560, 260, PALETTE.cyan, 4)}
        <text x="96" y="304" font-family="Noto Sans, sans-serif" font-size="13" font-weight="700" fill="${PALETTE.rust}">Opposite Capillary Blood Flow (5% → 85% O₂)</text>
        ${flowArrow(560, 330, 120, 330, PALETTE.rust, 4)}
        ${titledCard({ x: 76, y: 392, w: 548, h: 174, badge: 'Hydrostatic &amp; Lateral Line', title: '80%+ Oxygen Extraction + Swim Bladder Tuning', body: 'Countercurrent diffusion gradient extracts far more O₂ than concurrent flow while swim bladders adjust neutral buoyancy.', accent: PALETTE.blue })}
      `;
    } else if (id === 'ANI-037' || id === 'ANI-038') {
      const isWool = id === 'ANI-038';
      leftTitle = isWool ? 'HELIX KERATIN WOOL FIBERS &amp; AIR-POCKET INSULATION' : 'COMPARATIVE ANIMAL INTEGUMENT &amp; BARRIER PROTECTORS';
      leftCustom = isWool
        ? `
          ${titledCard({ x: 74, y: 196, w: 554, h: 112, badge: '1. Molecular α-Keratin', title: 'Disulfide Cross-Linked Coiled Polypeptides', body: 'Cysteine bridges create high elastic recovery (~30% stretch) without tearing.', accent: PALETTE.gold })}
          ${titledCard({ x: 74, y: 324, w: 554, h: 112, badge: '2. Wavy Crimp Micro-Trap', title: '80% Still Air Volume Between Fibers', body: 'Trapped dead air sharply drops thermal conductivity while wicking moisture vapor away.', accent: PALETTE.cyan })}
          ${titledCard({ x: 74, y: 452, w: 554, h: 112, badge: '3. Sustainable Shearing', title: 'Renewable Annual Fleece Growth Across Herbivores', body: 'Sheep wool, goat mohair/cashmere, and camel hair serve human textiles across cold regions.', accent: PALETTE.emerald })}
        `
        : `
          ${titledCard({ x: 74, y: 196, w: 554, h: 112, title: 'Reptilian Scales &amp; Mammal Dermis', body: 'Keratinized strata curb desiccation, block UV, and absorb mechanical abrasion.', accent: PALETTE.ochre })}
          ${titledCard({ x: 74, y: 324, w: 554, h: 112, title: 'Subcutaneous Adipose + Hair Follicles', body: 'Vascular vasodilation and dense fur coat regulate mammalian endothermy.', accent: PALETTE.rust })}
          ${titledCard({ x: 74, y: 452, w: 554, h: 112, title: 'Human Leather &amp; Tannin Craft', body: 'Collagen fiber networks preserved via tanning endure decades of protective wear.', accent: PALETTE.slate })}
        `;
    } else if (id === 'ANI-042' || id === 'ANI-041') {
      const isPairs = id === 'ANI-041';
      leftTitle = isPairs ? 'SEXUAL REPRODUCTION IN PAIRS &amp; ASEXUAL BOUNDARIES' : 'VERTEBRATE EMBRYONIC CLEAVAGE, GASTRULATION &amp; GESTATION';
      leftCustom = isPairs
        ? `
          ${titledCard({ x: 74, y: 196, w: 554, h: 112, badge: 'Majority Animal Mode', title: 'Diploid Gamete Fusion (Sperm + Ovum)', body: 'Meiotic crossing-over shuffles alleles every generation, equipping populations against evolving parasites.', accent: PALETTE.emerald })}
          ${titledCard({ x: 74, y: 324, w: 554, h: 112, badge: 'Exceptions in Zoology', title: 'Parthenogenesis, Hermaphroditism &amp; Budding', body: 'Aphids, whiptail lizards, earthworms, and sea sponges demonstrate non-binary or clonal modes.', accent: PALETTE.blue })}
          ${titledCard({ x: 74, y: 452, w: 554, h: 112, badge: 'Scholarly Accuracy', title: 'Avoids Binary Overgeneralization', body: 'Acknowledges broad paired sexual reproduction while honoring real invertebrate biological exceptions.', accent: PALETTE.gold })}
        `
        : `
          ${[
            { t: '1. Zygote (1 Cell)', d: 'Fertilized diploid genome sets body axis.', x: 76 },
            { t: '2. Cleavage / Morula', d: 'Rapid mitotic division without total volume rise.', x: 266 },
            { t: '3. Blastocyst Stage', d: 'Three germ layers differentiate organs prior to birth.', x: 456 },
          ]
            .map(
              (s, i) => `
              ${cardBox({ x: s.x, y: 215, w: 172, h: 315, fill: PALETTE.paperCard, stroke: PALETTE.plum, strokeWidth: 1.4, accentTop: PALETTE.plum })}
              <text x="${s.x + 86}" y="235" font-family="Noto Sans, sans-serif" font-size="11.5" font-weight="700" fill="#FFFFFF" text-anchor="middle">${s.t}</text>
              <circle cx="${s.x + 86}" cy="335" r="${30 + i * 10}" fill="#EADFF2" stroke="${PALETTE.plum}" stroke-width="2" />
              ${i === 1 ? `<circle cx="${s.x + 76}" cy="328" r="10" fill="${PALETTE.plum}" opacity="0.35" /><circle cx="${s.x + 96}" cy="342" r="10" fill="${PALETTE.plum}" opacity="0.35" />` : ''}
              ${renderSvgTextLines(wrapLines(s.d, 20, 4), s.x + 86, 425, 17, { fontSize: 12, fill: PALETTE.inkMuted, anchor: 'middle' })}
            `
            )
            .join('')}
        `;
    } else if (id === 'ANI-043' || id === 'ANI-049' || id === 'ANI-050' || id === 'ANI-013') {
      const isSurv = id === 'ANI-043';
      const isSynth = id === 'ANI-050';
      leftTitle = isSurv ? 'TYPE I–III SURVIVORSHIP CURVES &amp; PARENTAL INVESTMENT' : isSynth ? 'SYNTHESIS: INTEGRATED ANIMAL ECOLOGICAL WEB' : 'TROPHIC DEPENDENCE ON PRIMARY PRODUCERS &amp; WATER';
      leftCustom = isSurv
        ? `
          ${chartAxes({ x: 118, y: 205, w: 500, h: 295, xLabel: 'Fraction of Maximum Species Lifespan (%)', yLabel: 'Surviving Cohort (Log Scale)', xTicks: ['0% (Birth)', '25%', '50%', '75%', '100%'], yTicks: ['1%', '10%', '50%', '100%'] })}
          <path d="M 122 212 Q 410 216 585 485" fill="none" stroke="${PALETTE.emerald}" stroke-width="3.2" />
          <line x1="122" y1="212" x2="585" y2="485" stroke="${PALETTE.blue}" stroke-width="2.5" stroke-dasharray="6 4" />
          <path d="M 122 212 Q 160 445 585 485" fill="none" stroke="${PALETTE.rust}" stroke-width="3.2" />
          ${calloutTag(435, 232, 'Type I: High Parental Care (Mammals/Birds)', PALETTE.emerald, '#FFFFFF', PALETTE.emerald)}
          ${calloutTag(275, 452, 'Type III: High Fecundity (Insects/Marine Fish)', PALETTE.rust, '#FFFFFF', PALETTE.rust)}
        `
        : isSynth
        ? `
          ${cycleNodeRing(356, 370, 142, [
            { label: 'Plant Energy Base', sub: 'Herbivory &amp; Pollination', color: PALETTE.olive },
            { label: 'Sensory Movement', sub: 'Wings, Fins, Limbs', color: PALETTE.blue },
            { label: 'Predator–Prey Flux', sub: 'Population Regulation', color: PALETTE.rust },
            { label: 'Nutrient Return', sub: 'Decomposition &amp; Soils', color: PALETTE.emerald },
          ])}
          <text x="356" y="366" font-family="Liberation Serif, serif" font-size="12" font-weight="700" fill="${PALETTE.emerald}" text-anchor="middle">BIOSPHERE</text>
          <text x="356" y="382" font-family="Liberation Serif, serif" font-size="12" font-weight="700" fill="${PALETTE.emerald}" text-anchor="middle">ZOOLOGY</text>
        `
        : `
          ${titledCard({ x: 74, y: 196, w: 554, h: 112, badge: 'Trophic Pyramid', title: '10% Ecological Energy Transfer Across Food Chains', body: 'Every predator, scavenger, and grazer ultimately depends on autotrophic plants or marine phytoplankton.', accent: PALETTE.olive })}
          ${titledCard({ x: 74, y: 324, w: 554, h: 112, badge: 'Metabolic Hydration', title: 'Direct Drinking, Preformed Food Water &amp; Oxidation', body: 'Animals balance osmotic salt gradients continuously against evaporation and kidney excretion.', accent: PALETTE.cyan })}
          ${titledCard({ x: 74, y: 452, w: 554, h: 112, badge: 'Ecosystem Services', title: 'Pollination, Seed Dispersal &amp; Pest Balance', body: 'Birds, insects, and mammals sustain healthy soils, watersheds, and food webs.', accent: PALETTE.emerald })}
        `;
    } else if (id === 'ANI-005') {
      leftTitle = 'BIOME HABITAT ZONATION: MARINE, DESERT, ALPINE &amp; CANOPY';
      leftCustom = `
        ${titledCard({ x: 74, y: 196, w: 268, h: 175, badge: 'Marine Pelagic', title: 'Buoyancy &amp; Pressure Shield', body: 'Hydrodynamic fins, swim bladders &amp; osmoregulation tune life from sunlit reefs to abyssal trenches.', accent: PALETTE.cyan })}
        ${titledCard({ x: 368, y: 196, w: 268, h: 175, badge: 'Arid Desert', title: 'Nocturnal Water Sparing', body: 'Burrowing thermal shelter, concentrated kidneys &amp; pale reflective coats cut evaporative dehydration.', accent: PALETTE.ochre })}
        ${titledCard({ x: 74, y: 386, w: 268, h: 175, badge: 'High Alpine', title: 'Hypoxia Hemoglobin Affinity', body: 'Dense capillary beds, high-affinity O₂ binding &amp; thick insulating undercoats support mountain fauna.', accent: PALETTE.blue })}
        ${titledCard({ x: 368, y: 386, w: 268, h: 175, badge: 'Forest Canopy', title: 'Arboreal Grip &amp; Gliding', body: 'Opposable digits, prehensile tails &amp; wide binocular vision navigate multi-layered woodland.', accent: PALETTE.emerald })}
      `;
    } else if (id === 'ANI-039') {
      leftTitle = 'STRUCTURAL PHOTONICS VS. CHEMICAL PIGMENTS';
      leftCustom = `
        ${titledCard({ x: 74, y: 196, w: 268, h: 215, badge: 'Light Interference', title: 'Nanoscale Photonic Crystals', body: 'Peacock feather barbules &amp; Morpho butterfly scales diffract blue/green wavelengths without blue dye.', accent: PALETTE.cyan })}
        ${titledCard({ x: 368, y: 196, w: 268, h: 215, badge: 'Bio-Pigments', title: 'Melanin &amp; Dietary Carotenoids', body: 'Melanin absorbs UV &amp; hardens feathers; dietary carotenoids color plumage red, orange &amp; yellow.', accent: PALETTE.ochre })}
        <rect x="74" y="428" width="562" height="130" rx="6" fill="#FAF6EC" stroke="${PALETTE.gold}" />
        ${renderSvgTextLines(wrapLines('Ecological Roles: Cryptic camouflage avoids predators, aposematic bright stripes warn against toxins, and courtship plumage signals health.', 68, 4), 94, 464, 19, { fontSize: 12.5, fill: PALETTE.ink })}
      `;
    } else if (id === 'ANI-006') {
      leftTitle = 'SPECTRUM OF SOCIALITY: SOLITARY → PACK → EUSOCIAL';
      leftCustom = `
        ${titledCard({ x: 74, y: 204, w: 168, h: 245, title: '1. Solitary Foragers', body: 'Tigers &amp; leopards defend wide territories to avoid prey competition.', accent: PALETTE.slate })}
        ${flowArrow(246, 325, 274, 325, PALETTE.blue, 2.8)}
        ${titledCard({ x: 278, y: 204, w: 176, h: 245, title: '2. Cooperative Packs', body: 'Wolves, elephants &amp; dolphins share vigilance, hunting &amp; calf care.', accent: PALETTE.blue })}
        ${flowArrow(458, 325, 486, 325, PALETTE.emerald, 2.8)}
        ${titledCard({ x: 490, y: 204, w: 148, h: 245, title: '3. Eusocial Superorganisms', body: 'Honeybees &amp; ants divide sterile worker and queen castes.', accent: PALETTE.emerald })}
        <text x="356" y="516" font-family="Noto Sans, sans-serif" font-size="12" font-weight="600" fill="${PALETTE.inkMuted}" text-anchor="middle">Social structure evolves wherever group defense &amp; foraging outweigh resource sharing costs.</text>
      `;
    } else {
      // Distinct tailored summary layouts for ANI-001, 040, 046, 047
      const map: Record<string, [string, string, string, string]> = {
        'ANI-001': ['ANIMAL COMMUNITIES ("UMAM") &amp; ECOLOGICAL ORGANIZATION', 'Social &amp; Trophic Guilds', 'Wolf packs, fish schools, flocks, and insect colonies share habitat niches and seasonal migrations.', 'Taxonomic &amp; ethological parallels invite care rather than anthropocentric distortion.'],
        'ANI-040': ['MELANISM, COUNTERSHADING &amp; PHENOTYPIC VARIATION', 'Natural Selection on Coat &amp; Plumage', 'Arctic white winter coats and dark cryptic forest plumage track predation pressure dynamically.', 'Visual diversity reflects polygenic regulation interacting with habitat light.'],
        'ANI-046': ['UPUPA EPOPS PROBE-FORAGING ECOLOGY &amp; NARRATIVE CARE', 'Soil-Probing Insectivore Niche', 'Hoopoes locate subterranean beetle grubs via tactile bill probing in short open turf.', 'Keep observed natural behavior distinct from prophetic literary history.'],
        'ANI-047': ['CANID OLFACTION &amp; HUMAN–DOG GUARDING MUTUALISM', 'Sensory &amp; Social Co-Evolution', '~200–300 million olfactory receptors enable keen scent tracking and flock/camp vigilance.', 'Domestication shaped cooperative human–canid bonding across millennia.'],
      };
      const [t, c1t, c1b, c2b] = map[id] ?? [leftTitle, entry.scientific_topic, finding, enrichment?.whatItMeans ?? 'Diverse anatomical adaptations suit animals to planetary niches.'];
      leftTitle = t;
      leftCustom = `
        ${titledCard({ x: 74, y: 196, w: 554, h: 112, badge: 'Zoological Principle', title: c1t, body: c1b, accent: PALETTE.emerald })}
        ${titledCard({ x: 74, y: 324, w: 554, h: 112, badge: 'Empirical Mechanism', title: 'Physiological &amp; Behavioral Adaptation', body: c2b, accent: PALETTE.blue })}
        ${titledCard({ x: 74, y: 452, w: 554, h: 112, badge: 'Verification Scope', title: 'Measured Natural Science Finding', body: finding, accent: PALETTE.ochre })}
      `;
    }

    bodySvg = `
      ${cardBox({ x: 46, y: 142, w: 620, h: 456, fill: PALETTE.paperCard, stroke: PALETTE.emerald, strokeWidth: 1.4, accentTop: PALETTE.emerald })}
      <text x="356" y="162" font-family="Noto Sans, sans-serif" font-size="13.5" font-weight="700" fill="#FFFFFF" text-anchor="middle">${leftTitle}</text>
      ${leftCustom}
      ${buildRightMetaPanel('ZOOLOGICAL EVIDENCE &amp; GUARDRAILS', 'Adaptive Integration', enrichment?.whatItMeans ?? 'Measured biology integrates morphology, behavior, and ecology.', PALETTE.emerald)}
    `;
  }

  bodySvg += keyTakeawayStrip([
    { label: 'Core Zoological Finding', detail: finding, color: PALETTE.emerald },
    { label: 'Reference Standard', detail: `Evidence Grade ${entry.evidence_grade} · ${entry.evidence_sources[0]?.author_or_institution ?? 'Campbell Biology / Peer-Reviewed Zoology'}.`, color: PALETTE.gold },
  ], 622);

  return buildPlateShell({
    title,
    subtitle: wrapLines(subtitle, 108, 1)[0],
    figureCode: id,
    discipline: 'Chapter 06 · Animals & Biological Systems',
    bodySvg,
    footerNote: `Scientific Reference Plate ${id} · Science of Creation Encyclopedia · Zoological Reference Context`,
    accentColor: PALETTE.ochre,
  });
}
