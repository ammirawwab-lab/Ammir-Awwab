import {
  calloutTag,
  cardBox,
  chartAxes,
  curvedArrow,
  cycleNodeRing,
  flowArrow,
  keyTakeawayStrip,
  titledCard,
} from '../lib/diagramPrimitives';
import { buildPlateShell, escXml, PALETTE, renderSvgTextLines, wrapLines } from '../lib/plateRenderer';
import type { RawDatasetEntry, TopicEnrichment } from '../../src/types/encyclopedia';

export function buildHumanBiologyPlateSvg(entry: RawDatasetEntry, enrichment?: TopicEnrichment): string {
  const id = entry.id;
  const title = enrichment?.diagramTitle ?? entry.title;
  const subtitle = enrichment?.diagramCaption ?? entry.scientific_topic;
  const finding = entry.scientific_evidence.finding;
  const kind = (enrichment?.diagramKind ?? 'embryonic-sequential-stages') as string;
  let bodySvg = '';

  const rightCol = (heading: string, midTitle: string, midBody: string, accent = PALETTE.teal) => `
    ${cardBox({ x: 688, y: 142, w: 466, h: 456, fill: PALETTE.paperCard, stroke: PALETTE.gold, strokeWidth: 1.4, accentTop: PALETTE.gold })}
    <text x="921" y="162" font-family="Noto Sans, sans-serif" font-size="13.5" font-weight="700" fill="#FFFFFF" text-anchor="middle">${escXml(heading)}</text>
    ${titledCard({ x: 710, y: 192, w: 422, h: 120, title: entry.scientific_topic, body: finding, accent })}
    ${titledCard({ x: 710, y: 326, w: 422, h: 120, title: midTitle, body: midBody, accent: PALETTE.blue })}
    ${titledCard({ x: 710, y: 460, w: 422, h: 120, title: 'Scientific &amp; Classical Term Caution', body: entry.limitations || 'Classical Arabic terms are broad phenomenological descriptors; avoid forcing exact-day modern staging onto them.', accent: PALETTE.rust })}
  `;

  // 1. Elemental Composition & Early Gametes / Implantation (HUM-001..006)
  if (id === 'HUM-001') {
    bodySvg = `
      ${cardBox({ x: 46, y: 142, w: 620, h: 456, fill: PALETTE.paperCard, stroke: PALETTE.ochre, strokeWidth: 1.4, accentTop: PALETTE.ochre })}
      <text x="356" y="162" font-family="Noto Sans, sans-serif" font-size="13.5" font-weight="700" fill="#FFFFFF" text-anchor="middle">HUMAN BODY ELEMENTAL MASS FRACTION (BY WEIGHT)</text>
      ${[
        { el: 'Oxygen (O · ~65.0%) — Water &amp; Biomolecules', pct: 88, col: PALETTE.cyan, y: 204 },
        { el: 'Carbon (C · ~18.5%) — Protein, Lipid &amp; DNA Backbones', pct: 46, col: PALETTE.slate, y: 274 },
        { el: 'Hydrogen (H · ~9.5%) — H₂O &amp; Organic Acid Bonds', pct: 28, col: PALETTE.blue, y: 344 },
        { el: 'Nitrogen (N · ~3.2%) — Amino Acids &amp; Nucleotides', pct: 16, col: PALETTE.emerald, y: 414 },
        { el: 'Calcium, Phosphorus, K, Fe, Mg &amp; Trace (~3.8%)', pct: 19, col: PALETTE.ochre, y: 484 },
      ]
        .map(
          (b) => `
          <text x="76" y="${b.y}" font-family="Noto Sans, sans-serif" font-size="12.5" font-weight="700" fill="${PALETTE.ink}">${b.el}</text>
          <rect x="76" y="${b.y + 10}" width="530" height="26" rx="5" fill="#EAE6DA" />
          <rect x="76" y="${b.y + 10}" width="${(530 * b.pct) / 100}" height="26" rx="5" fill="${b.col}" />
        `
        )
        .join('')}
      <text x="356" y="574" font-family="Noto Sans, sans-serif" font-size="12" fill="${PALETTE.inkMuted}" text-anchor="middle">All atomic species originate in Earth’s biosphere, soils, and water cycles—no exotic elements.</text>
      ${rightCol('BIOGEOCHEMICAL CONTINUITY', 'Soil Minerals → Plant Crops → Body', 'Calcium, iron, magnesium, and phosphate enter human tissues via agricultural food webs nourished by weathered minerals and water.', PALETTE.ochre)}
    `;
  } else if (kind === 'gametes-fertilization-zygote') {
    const mode = id === 'HUM-002' ? 'fusion' : id === 'HUM-003' ? 'recomb' : 'scale';
    bodySvg = `
      ${cardBox({ x: 46, y: 142, w: 620, h: 456, fill: PALETTE.paperCard, stroke: PALETTE.teal, strokeWidth: 1.4, accentTop: PALETTE.teal })}
      <text x="356" y="162" font-family="Noto Sans, sans-serif" font-size="13.5" font-weight="700" fill="#FFFFFF" text-anchor="middle">${mode === 'fusion' ? 'HAPLOID GAMETES → DIPLOID ZYGOTE (23 + 23 = 46 CHROMOSOMES)' : mode === 'recomb' ? 'GENETIC COMBINATORICS &amp; PARENTAL CONTRIBUTION' : 'MICROSCOPIC ZYGOTE (~120 µm) → ~37 TRILLION ADULT CELLS'}</text>
      ${
        mode === 'fusion'
          ? `
            <circle cx="170" cy="318" r="36" fill="#DCEAF7" stroke="${PALETTE.blue}" stroke-width="2" />
            <path d="M 134 318 Q 100 302 82 325" fill="none" stroke="${PALETTE.blue}" stroke-width="2.5" />
            <text x="170" y="323" font-family="Noto Sans, sans-serif" font-size="13" font-weight="700" fill="${PALETTE.blue}" text-anchor="middle">n = 23</text>
            <text x="170" y="378" font-family="Noto Sans, sans-serif" font-size="12" font-weight="600" fill="${PALETTE.ink}" text-anchor="middle">Sperm (23,X or 23,Y)</text>
            <circle cx="335" cy="318" r="56" fill="#EADFF2" stroke="${PALETTE.plum}" stroke-width="2.2" />
            <text x="335" y="323" font-family="Noto Sans, sans-serif" font-size="13.5" font-weight="700" fill="${PALETTE.plum}" text-anchor="middle">n = 23</text>
            <text x="335" y="396" font-family="Noto Sans, sans-serif" font-size="12" font-weight="600" fill="${PALETTE.ink}" text-anchor="middle">Secondary Oocyte (23,X)</text>
            ${flowArrow(402, 318, 456, 318, PALETTE.emerald, 3)}
            <circle cx="536" cy="318" r="64" fill="#D7EAE2" stroke="${PALETTE.emerald}" stroke-width="2.5" />
            <text x="536" y="314" font-family="Noto Sans, sans-serif" font-size="14" font-weight="700" fill="${PALETTE.emerald}" text-anchor="middle">2n = 46</text>
            <text x="536" y="335" font-family="Noto Sans, sans-serif" font-size="12" fill="${PALETTE.ink}" text-anchor="middle">Diploid Zygote</text>
            <rect x="78" y="454" width="554" height="114" rx="6" fill="#F4EFE3" stroke="${PALETTE.border}" />
            ${renderSvgTextLines(wrapLines('Fertilization restores full 46-chromosome diploid count inside the fallopian ampulla within ~24 hours of ovulation.', 68, 3), 96, 492, 18, { fontSize: 12.5, fill: PALETTE.ink })}
          `
          : mode === 'recomb'
          ? `
            ${titledCard({ x: 74, y: 196, w: 554, h: 112, badge: '1. Reproductive Fluids', title: 'Seminal &amp; Ovulatory Microenvironment', body: 'Alkaline seminal plasma plus nutrient-rich tubal fluids transport and capacitate viable gametes.', accent: PALETTE.cyan })}
            ${titledCard({ x: 74, y: 324, w: 554, h: 112, badge: '2. Chromosomal Sorting', title: '2²³ × 2²³ (&gt;70 Trillion) Possible Pairings', body: 'Independent assortment and meiotic crossing-over ensure unique hereditary combinations per individual.', accent: PALETTE.plum })}
            ${titledCard({ x: 74, y: 452, w: 554, h: 112, badge: '3. Precision Check', title: 'Clarifying "Mixed Drop" (Nutfah Amshaj)', body: 'Tafsir notes male/female mingling; genetics confirms equal 23+23 chromosomal fusion inside a zygote.', accent: PALETTE.gold })}
          `
          : `
            <circle cx="135" cy="315" r="8" fill="${PALETTE.plum}" stroke="${PALETTE.ink}" />
            <text x="135" y="352" font-family="Noto Sans, sans-serif" font-size="12" font-weight="700" fill="${PALETTE.ink}" text-anchor="middle">Human Ovum</text>
            <text x="135" y="370" font-family="Noto Sans, sans-serif" font-size="11.5" fill="${PALETTE.inkMuted}" text-anchor="middle">~0.12 mm</text>
            ${flowArrow(165, 315, 255, 315, PALETTE.emerald, 2.8)}
            <circle cx="305" cy="315" r="24" fill="#EADFF2" stroke="${PALETTE.plum}" stroke-width="2" />
            <text x="305" y="365" font-family="Noto Sans, sans-serif" font-size="12" font-weight="700" fill="${PALETTE.ink}" text-anchor="middle">Blastocyst (~Day 5)</text>
            <text x="305" y="383" font-family="Noto Sans, sans-serif" font-size="11.5" fill="${PALETTE.inkMuted}" text-anchor="middle">~100–200 Cells</text>
            ${flowArrow(342, 315, 422, 315, PALETTE.emerald, 3)}
            <circle cx="515" cy="315" r="76" fill="#D7EAE2" stroke="${PALETTE.emerald}" stroke-width="2.5" />
            <text x="515" y="310" font-family="Noto Sans, sans-serif" font-size="13.5" font-weight="700" fill="${PALETTE.emerald}" text-anchor="middle">Newborn &amp; Adult</text>
            <text x="515" y="330" font-family="Noto Sans, sans-serif" font-size="12" fill="${PALETTE.ink}" text-anchor="middle">~3.7 × 10¹³ Cells</text>
            <rect x="78" y="454" width="554" height="114" rx="6" fill="#F4EFE3" stroke="${PALETTE.border}" />
            ${renderSvgTextLines(wrapLines('Only 1 ejaculated sperm out of ~10⁸ penetrates the zona pellucida; cortical reaction immediately seals against polyspermy.', 68, 3), 96, 492, 18, { fontSize: 12.5, fill: PALETTE.ink })}
          `
      }
      ${rightCol('FERTILIZATION &amp; EARLY EMBRYOLOGY', 'Zona Pellucida Lock', 'Polyspermy prevention ensures exact diploid chromosomal parity in human conception.', PALETTE.teal)}
    `;
  } else if (kind === 'uterine-implantation-early') {
    const isWall = id === 'HUM-006';
    bodySvg = `
      ${cardBox({ x: 46, y: 142, w: 620, h: 456, fill: '#FAF2F4', stroke: PALETTE.rust, strokeWidth: 1.4, accentTop: PALETTE.rust })}
      <text x="356" y="162" font-family="Noto Sans, sans-serif" font-size="13.5" font-weight="700" fill="#FFFFFF" text-anchor="middle">${isWall ? 'TUBAL TRANSPORT &amp; BLASTOCYST IMPLANTATION (~DAYS 1–12)' : 'ANATOMICAL UTERINE SANCTUARY (MYOMETRIUM &amp; PELVIC CRADLE)'}</text>
      ${
        isWall
          ? `
            ${titledCard({ x: 74, y: 204, w: 168, h: 242, title: '1. Tubal Cleavage (~Days 1–4)', body: 'Zygote divides to morula while cilia sweep it along the oviduct.', accent: PALETTE.cyan })}
            ${flowArrow(246, 325, 276, 325, PALETTE.rust, 2.8)}
            ${titledCard({ x: 280, y: 204, w: 170, h: 242, title: '2. Zona Hatching (~Days 5–6)', body: 'Blastocyst sheds outer shell and orients inner cell mass toward decidua.', accent: PALETTE.gold })}
            ${flowArrow(454, 325, 484, 325, PALETTE.rust, 2.8)}
            ${titledCard({ x: 488, y: 204, w: 148, h: 242, title: '3. Stroma Invasion (~Days 6–12)', body: 'Syncytiotrophoblast anchors gently into secretory endometrium.', accent: PALETTE.rust })}
            <text x="356" y="514" font-family="Noto Sans, sans-serif" font-size="12" font-weight="600" fill="${PALETTE.inkMuted}" text-anchor="middle">Progesterone-primed endometrium prevents excessive invasion via decidual matrix.</text>
          `
          : `
            <!-- Stratified Uterine Layers -->
            <rect x="76" y="205" width="554" height="72" rx="4" fill="#9E422B" fill-opacity="0.22" stroke="${PALETTE.rust}" />
            <text x="96" y="246" font-family="Noto Sans, sans-serif" font-size="13" font-weight="700" fill="${PALETTE.rust}">1. Thick Myometrium Smooth Muscle + Pelvic Bones (Mechanical Shield)</text>
            <rect x="76" y="287" width="554" height="104" rx="4" fill="#E89E9E" fill-opacity="0.35" stroke="${PALETTE.rust}" />
            <text x="96" y="320" font-family="Noto Sans, sans-serif" font-size="13" font-weight="700" fill="${PALETTE.ink}">2. Vascularized Secretory Endometrium (Decidua)</text>
            <text x="96" y="344" font-family="Noto Sans, sans-serif" font-size="11.8" fill="${PALETTE.inkMuted}">Spiral arteries, glycogen glands &amp; immune tolerance</text>
            <text x="96" y="364" font-family="Noto Sans, sans-serif" font-size="11.8" fill="${PALETTE.inkMuted}">cradle the implanting blastocyst (~Days 6–12).</text>
            <circle cx="525" cy="340" r="24" fill="#F3E5C0" stroke="${PALETTE.gold}" stroke-width="2.5" />
            ${calloutTag(515, 412, 'Anchored Blastocyst Nest', PALETTE.gold, '#FFFFFF', PALETTE.gold)}
            ${titledCard({ x: 76, y: 446, w: 554, h: 124, badge: 'Protected Homeostasis', title: 'Thermal, Shock &amp; Immunological Cushion', body: 'Cervical mucus plug, pelvic girdle, myometrial muscle &amp; amniotic fluid keep embryo ~37 °C and mechanically buffered.', accent: PALETTE.emerald })}
          `
      }
      ${rightCol('UTERINE IMPLANTATION BIOLOGY', 'Ectopic Risk Boundary', 'Normal implantation occurs in upper posterior uterine cavity (~Days 6–10); ectopic implantation elsewhere cannot sustain full pregnancy.', PALETTE.rust)}
    `;

  // 2. Stages, Alaqah & Mudghah Cautions, Gastrulation, Musculoskeletal Overlap (HUM-007..017)
  } else if (
    kind === 'embryonic-sequential-stages' ||
    kind === 'alaqah-terminology-caution' ||
    kind === 'mudghah-terminology-caution' ||
    kind === 'gastrulation-germ-layers' ||
    kind === 'musculoskeletal-overlap' ||
    kind === 'organogenesis-body-plan' ||
    kind === 'three-darknesses-membranes'
  ) {
    if (kind === 'alaqah-terminology-caution' || kind === 'mudghah-terminology-caution') {
      const isMud = kind === 'mudghah-terminology-caution';
      bodySvg = `
        ${cardBox({ x: 46, y: 142, w: 620, h: 456, fill: PALETTE.paperCard, stroke: PALETTE.plum, strokeWidth: 1.4, accentTop: PALETTE.plum })}
        <text x="356" y="162" font-family="Noto Sans, sans-serif" font-size="13.5" font-weight="700" fill="#FFFFFF" text-anchor="middle">${isMud ? 'MUDGHAH INTERPRETIVE NUANCE · SOMITE PAIRING (~WEEKS 4–5)' : 'ALAQAH INTERPRETIVE NUANCE · IMPLANTED CHORIONIC ATTACHMENT'}</text>
        ${titledCard({
          x: 74,
          y: 196,
          w: 554,
          h: 112,
          badge: '1. Classical Lexicon',
          title: isMud ? 'Descriptive Visual Analogy (Chewed-Like Morsel)' : 'Broad Arabic Polysemy (Clinging / Suspended / Clot-Like)',
          body: isMud ? 'Classical commentators understood mudghah visually as a tiny flesh-sized portion—not a technical term for somites.' : 'Classical tafsir encompasses suspended attachment and blood-clot-like appearance on macroscopic view.',
          accent: PALETTE.plum,
        })}
        ${titledCard({
          x: 74,
          y: 324,
          w: 554,
          h: 112,
          badge: '2. Carnegie Reference (~Weeks 2–5)',
          title: isMud ? '30–40 Paired Somite Blocks (Carnegie Stages 9–14)' : 'Syncytiotrophoblast Lacunae &amp; Early Curved Embryo (~Weeks 2–4)',
          body: isMud ? 'Mesodermal somites appear in repeating pairs beside the neural tube, building vertebrae, ribs &amp; skeletal muscles.' : 'Chorionic villi anchor firmly into maternal endometrial blood pools to initiate nutrient exchange.',
          accent: PALETTE.blue,
        })}
        ${titledCard({
          x: 74,
          y: 452,
          w: 554,
          h: 112,
          badge: '3. Scientific Range Disclaimer',
          title: 'Continuous Overlapping Growth (No Exact-Day Translation)',
          body: 'Human embryology unfolds smoothly without rigid linguistic switches; never assign exact-hour or single-day equivalents.',
          accent: PALETTE.rust,
        })}
        ${rightCol('HERMENEUTIC &amp; EMBRYOLOGICAL RIGOR', 'Carnegie Staging Standard', isMud ? 'Carnegie Stages 9–14 cover approximate Weeks 3.5–5 based on anatomical hallmarks rather than fixed 40-day clocks.' : 'Early attachment spans ~Days 7–28 continuously; blood circulation begins internally around Day 21.', PALETTE.plum)}
      `;
    } else if (kind === 'musculoskeletal-overlap') {
      const isOverlap = id === 'HUM-012';
      bodySvg = `
        ${cardBox({ x: 46, y: 142, w: 620, h: 456, fill: PALETTE.paperCard, stroke: PALETTE.blue, strokeWidth: 1.4, accentTop: PALETTE.blue })}
        <text x="356" y="162" font-family="Noto Sans, sans-serif" font-size="13.5" font-weight="700" fill="#FFFFFF" text-anchor="middle">${isOverlap ? 'OVERLAPPING CO-DEVELOPMENT: CARTILAGE, BONE &amp; MUSCLE' : 'ENDOCHONDRAL OSSIFICATION: CARTILAGE TEMPLATE TO BONE'}</text>
        ${
          isOverlap
            ? `
              <text x="76" y="215" font-family="Noto Sans, sans-serif" font-size="12.5" font-weight="700" fill="${PALETTE.ink}">Concurrent Weeks 4–12+ Developmental Windows:</text>
              ${[
                { lbl: 'Somite Mesoderm Patterning (Wk 3–5)', x1: 80, w: 185, col: PALETTE.plum, y: 245 },
                { lbl: 'Hyaline Cartilage Skeleton Models (Wk 5–8+)', x1: 145, w: 245, col: PALETTE.cyan, y: 315 },
                { lbl: 'Myoblast Muscle Fiber Differentiation (Wk 5–12+)', x1: 165, w: 325, col: PALETTE.rust, y: 385 },
                { lbl: 'Primary Bone Ossification Centers (Wk 7–Birth)', x1: 245, w: 345, col: PALETTE.emerald, y: 455 },
              ]
                .map(
                  (t) => `
                  <text x="78" y="${t.y}" font-family="Noto Sans, sans-serif" font-size="12" font-weight="700" fill="${t.col}">${t.lbl}</text>
                  <rect x="78" y="${t.y + 8}" width="535" height="22" rx="4" fill="#EAE6DA" />
                  <rect x="${t.x1}" y="${t.y + 8}" width="${t.w}" height="22" rx="4" fill="${t.col}" />
                `
                )
                .join('')}
              <text x="356" y="546" font-family="Noto Sans, sans-serif" font-size="12" font-weight="700" fill="${PALETTE.rust}" text-anchor="middle">Crucial Fact: Muscle &amp; bone precursors overlap simultaneously (~Weeks 5–12)!</text>
            `
            : `
              ${titledCard({ x: 74, y: 196, w: 554, h: 112, badge: 'Phase 1 (~Week 5–6)', title: 'Mesenchymal Condensation &amp; Hyaline Cartilage Model', body: 'Limb-bud cells cluster into flexible chondrocyte scaffolds tracing future femur, ribs &amp; vertebral shapes.', accent: PALETTE.cyan })}
              ${titledCard({ x: 74, y: 324, w: 554, h: 112, badge: 'Phase 2 (~Week 7–8+)', title: 'Vascular Invasion &amp; Primary Ossification Collar', body: 'Osteoblasts deposit calcium hydroxyapatite along midshaft collars while cartilage still lengthens ends.', accent: PALETTE.emerald })}
              ${titledCard({ x: 74, y: 452, w: 554, h: 112, badge: 'Phase 3 (Birth–Age 20)', title: 'Secondary Epiphyseal Growth Plates', body: 'Skeleton continues mineralizing and remodeling postnatally; clavicle &amp; skull form intramembranously.', accent: PALETTE.gold })}
            `
        }
        ${rightCol('MUSCULOSKELETAL INTERDEPENDENCE', 'No Strict Non-Overlapping Sequence', 'Mechanical tugging from embryonic muscle contractions (~Week 8) is actually essential for normal bone shaft joint shaping.', PALETTE.blue)}
      `;
    } else if (kind === 'gastrulation-germ-layers' || kind === 'three-darknesses-membranes') {
      const isMem = kind === 'three-darknesses-membranes';
      bodySvg = `
        ${cardBox({ x: 46, y: 142, w: 620, h: 456, fill: PALETTE.paperCard, stroke: PALETTE.emerald, strokeWidth: 1.4, accentTop: PALETTE.emerald })}
        <text x="356" y="162" font-family="Noto Sans, sans-serif" font-size="13.5" font-weight="700" fill="#FFFFFF" text-anchor="middle">${isMem ? 'MATERNAL–FETAL ENCLOSURES ("THREE DARKNESSES" CONTEXT)' : 'WEEK 3 GASTRULATION: THREE PRIMARY GERM LAYERS'}</text>
        ${titledCard({
          x: 74,
          y: 196,
          w: 554,
          h: 112,
          badge: isMem ? 'Outer Enclosure' : 'Outer Layer (Dorsal)',
          title: isMem ? '1. Maternal Anterior Abdominal Wall' : '1. Ectoderm → Nervous System &amp; Epidermis',
          body: isMem ? 'Skin, fascia &amp; rectus musculature shield abdominal viscera from light and trauma.' : 'Differentiates into brain, spinal cord, cranial nerves, eye lens, ear sensory epithelium &amp; outer skin.',
          accent: PALETTE.blue,
        })}
        ${titledCard({
          x: 74,
          y: 324,
          w: 554,
          h: 112,
          badge: isMem ? 'Middle Enclosure' : 'Middle Layer',
          title: isMem ? '2. Muscular Uterine Wall (Myometrium + Decidua)' : '2. Mesoderm → Heart, Blood, Muscle, Kidneys &amp; Bone',
          body: isMem ? 'Thick smooth muscle shell dynamically expands as pregnancy advances toward term.' : 'Gives rise to cardiovascular system, skeletal/smooth muscles, kidneys, gonads &amp; dermis.',
          accent: PALETTE.rust,
        })}
        ${titledCard({
          x: 74,
          y: 452,
          w: 554,
          h: 112,
          badge: isMem ? 'Inner Enclosure' : 'Inner Layer (Ventral)',
          title: isMem ? '3. Placenta + Chorion &amp; Amniotic Sac' : '3. Endoderm → Gut Tube, Liver, Pancreas &amp; Lungs',
          body: isMem ? 'Fluid-filled amniotic sac plus chorionic membrane surround the fetus directly inside the uterine cavity.' : 'Forms epithelial lining of digestive tract, respiratory alveoli, thyroid &amp; hepatic glands.',
          accent: PALETTE.emerald,
        })}
        ${rightCol(isMem ? 'ANATOMICAL ENCLOSURES &amp; TAFSIR' : 'CELL FATE SPECIFICATION', isMem ? 'Classical Scholarly Scope' : 'Genetic Signaling Gradients', isMem ? 'Early mufassirun identified belly, womb, and fetal membrane; modern anatomy confirms distinct histological boundaries.' : 'BMP, Wnt, FGF, and Nodal morphogens instruct identical early cells to turn on tissue-specific genes.', PALETTE.emerald)}
      `;
    } else if (id === 'HUM-014') {
      // Fetal Crown-Rump Growth Curve across Weeks 4–38
      bodySvg = `
        ${cardBox({ x: 46, y: 142, w: 620, h: 456, fill: PALETTE.paperCard, stroke: PALETTE.teal, strokeWidth: 1.4, accentTop: PALETTE.teal })}
        <text x="356" y="162" font-family="Noto Sans, sans-serif" font-size="13.5" font-weight="700" fill="#FFFFFF" text-anchor="middle">HUMAN GESTATIONAL GROWTH TRAJECTORY (~WEEKS 4–38)</text>
        ${chartAxes({ x: 118, y: 205, w: 500, h: 295, xLabel: 'Gestational Age (Weeks Post-Fertilization)', yLabel: 'Fetal Mass / Linear Length Growth', xTicks: ['Wk 4 (4 mm)', 'Wk 8 (3 cm)', 'Wk 20 (~16 cm)', 'Wk 38 (~50 cm)'], yTicks: ['0 kg', '1 kg', '2 kg', '3.4 kg'] })}
        <path d="M 122 496 Q 290 485 430 375 Q 535 265 612 212" fill="none" stroke="${PALETTE.emerald}" stroke-width="3.5" />
        ${calloutTag(295, 452, 'Organogenesis Finishes (~Wk 8)', PALETTE.blue, '#FFFFFF', PALETTE.blue)}
        ${calloutTag(505, 224, 'Rapid Third-Trimester Mass Gain', PALETTE.emerald, '#FFFFFF', PALETTE.emerald)}
        ${rightCol('CONTINUOUS GESTATIONAL GROWTH', 'Range Framing', 'Individual fetal dimensions vary normally around clinical percentile curves; stages denote broad anatomical phases.', PALETTE.teal)}
      `;
    } else {
      // HUM-007, 013, 015, 016 — genuinely distinct visual structures
      let leftTitle = 'HUMAN PRENATAL DEVELOPMENT: MAJOR PHASES';
      let leftSvg = '';
      if (id === 'HUM-013') {
        leftTitle = 'ORGAN SYSTEM EMERGENCE ACROSS ORGANOGENESIS (~WK 4–8)';
        leftSvg = `
          ${titledCard({ x: 74, y: 196, w: 270, h: 170, badge: 'Weeks 3–4', title: 'Heart &amp; Neural Tube', body: 'Looping cardiac tube beats continuously while dorsal neural folds close.', accent: PALETTE.rust })}
          ${titledCard({ x: 368, y: 196, w: 270, h: 170, badge: 'Weeks 4–6', title: 'Gut, Liver &amp; Pharynx', body: 'Foregut buds pancreas &amp; lungs; branchial arches sculpt face and jaw.', accent: PALETTE.ochre })}
          ${titledCard({ x: 74, y: 386, w: 270, h: 170, badge: 'Weeks 5–7', title: 'Renal &amp; Limb Paddles', body: 'Metanephric kidneys form as paddle-shaped hands divide into digits.', accent: PALETTE.blue })}
          ${titledCard({ x: 368, y: 386, w: 270, h: 170, badge: 'Week 8+', title: 'Fetal Maturation', body: 'Core body-plan architecture is established; rapid tissue scaling begins.', accent: PALETTE.emerald })}
        `;
      } else if (id === 'HUM-015') {
        leftTitle = 'ANTEROPOSTERIOR HOX AXES &amp; MORPHOGEN GRADIENTS';
        leftSvg = `
          ${[
            { axis: 'Cranial / Anterior (Head &amp; Brain Vesicles)', pct: 86, col: PALETTE.plum },
            { axis: 'Thoracic Segment (Heart &amp; Rib Somites)', pct: 68, col: PALETTE.blue },
            { axis: 'Dorsoventral Neural–Somite Polarity (Shh / BMP)', pct: 76, col: PALETTE.teal },
            { axis: 'Caudal / Posterior Hox &amp; Limb Specification', pct: 58, col: PALETTE.emerald },
          ]
            .map((ax, i) => {
              const y = 212 + i * 86;
              return `<text x="82" y="${y}" font-family="Noto Sans, sans-serif" font-size="12.5" font-weight="700" fill="${PALETTE.ink}">${ax.axis}</text>
                <rect x="82" y="${y + 10}" width="536" height="24" rx="4" fill="#EAE6DA" />
                <rect x="82" y="${y + 10}" width="${(536 * ax.pct) / 100}" height="24" rx="4" fill="${ax.col}" />`;
            })
            .join('')}
          <text x="356" y="566" font-family="Noto Sans, sans-serif" font-size="12" font-weight="600" fill="${PALETTE.inkMuted}" text-anchor="middle">Concentrated chemical gradients instruct bilateral symmetry and head-to-tail proportioning.</text>
        `;
      } else if (id === 'HUM-016') {
        leftTitle = 'GENOMIC BLUEPRINT × MATERNAL MICROENVIRONMENT MATRIX';
        leftSvg = `
          ${titledCard({ x: 74, y: 196, w: 270, h: 170, badge: 'Meiotic Inheritance', title: 'Parental Allele Sorting', body: 'Over 70 trillion potential diploid assortments shape distinct traits.', accent: PALETTE.blue })}
          ${titledCard({ x: 368, y: 196, w: 270, h: 170, badge: 'Epigenetic Tuning', title: 'Maternal Nutrition &amp; Folate', body: 'Methylation &amp; neural closure depend tightly on folate and micronutrients.', accent: PALETTE.emerald })}
          ${titledCard({ x: 74, y: 386, w: 564, h: 170, badge: 'Critical Vulnerability Windows', title: 'Weeks 3–8 Organogenesis Teratogen Sensitivity', body: 'Infections, drugs, toxins, or severe hypoxia during peak organ folding alter congenital outcomes regardless of DNA alone.', accent: PALETTE.rust })}
        `;
      } else {
        leftSvg = [
          { step: '1. Cleavage &amp; Blastocyst (Wk 1–2)', detail: 'Mitotic division -> blastocyst hatching -> endometrial implantation.', col: PALETTE.cyan },
          { step: '2. Gastrulation &amp; Neurulation (Wk 3–4)', detail: '3 germ layers, neural tube &amp; primitive looping heart form.', col: PALETTE.blue },
          { step: '3. Organogenesis (Wk 5–8)', detail: 'Limb buds, facial arches, kidneys &amp; major organs establish layout.', col: PALETTE.ochre },
          { step: '4. Fetal Maturation (Wk 9–38)', detail: 'Histological maturation, lung surfactant, &amp; subcutaneous fat growth.', col: PALETTE.emerald },
        ]
          .map((s, i) => titledCard({ x: 74, y: 192 + i * 98, w: 554, h: 88, title: s.step, body: s.detail, accent: s.col }))
          .join('');
      }
      bodySvg = `
        ${cardBox({ x: 46, y: 142, w: 620, h: 456, fill: PALETTE.paperCard, stroke: PALETTE.emerald, strokeWidth: 1.4, accentTop: PALETTE.emerald })}
        <text x="356" y="162" font-family="Noto Sans, sans-serif" font-size="13.5" font-weight="700" fill="#FFFFFF" text-anchor="middle">${leftTitle}</text>
        ${leftSvg}
        ${rightCol('STAGED HUMAN EMBRYOGENESIS', 'Continuous Progression', enrichment?.whatItMeans ?? 'Embryonic transformation flows uninterruptedly from single cell to integrated organ systems.', PALETTE.emerald)}
      `;
    }

  // 3. Placenta, Umbilical Cord, Brain/Heart, Sensory Systems, Skin, Fingerprints (HUM-018..027, 034..036)
  } else if (
    kind === 'placenta-maternal-exchange' ||
    kind === 'umbilical-cord-circulation' ||
    kind === 'neural-tube-neurulation' ||
    kind === 'cardiac-embryology-overview' ||
    kind === 'sensory-systems-development' ||
    kind === 'brain-heart-distinction' ||
    kind === 'skin-sensory-nociception' ||
    kind === 'fingerprint-friction-ridges'
  ) {
    if (kind === 'placenta-maternal-exchange' || kind === 'umbilical-cord-circulation') {
      const isCord = kind === 'umbilical-cord-circulation';
      bodySvg = `
        ${cardBox({ x: 46, y: 142, w: 620, h: 456, fill: PALETTE.paperCard, stroke: PALETTE.rust, strokeWidth: 1.4, accentTop: PALETTE.rust })}
        <text x="356" y="162" font-family="Noto Sans, sans-serif" font-size="13.5" font-weight="700" fill="#FFFFFF" text-anchor="middle">${isCord ? 'UMBILICAL CORD VASCULAR CROSS-SECTION (2 ARTERIES + 1 VEIN)' : 'PLACENTAL VILLOUS EXCHANGE WITHOUT DIRECT BLOOD MIXING'}</text>
        ${
          isCord
            ? `
              <circle cx="222" cy="348" r="114" fill="#F2E4DC" stroke="${PALETTE.rust}" stroke-width="3" />
              <circle cx="222" cy="296" r="35" fill="#D96B6B" stroke="#7A2222" stroke-width="2" />
              <text x="222" y="294" font-family="Noto Sans, sans-serif" font-size="11.5" font-weight="700" fill="#FFFFFF" text-anchor="middle">1 Vein</text>
              <text x="222" y="309" font-family="Noto Sans, sans-serif" font-size="10.5" font-weight="700" fill="#FFFFFF" text-anchor="middle">(O₂+)</text>
              <circle cx="174" cy="386" r="24" fill="#4A77A8" stroke="#1F3D5C" stroke-width="2" />
              <text x="174" y="390" font-family="Noto Sans, sans-serif" font-size="10.5" font-weight="700" fill="#FFFFFF" text-anchor="middle">Artery</text>
              <circle cx="270" cy="386" r="24" fill="#4A77A8" stroke="#1F3D5C" stroke-width="2" />
              <text x="270" y="390" font-family="Noto Sans, sans-serif" font-size="10.5" font-weight="700" fill="#FFFFFF" text-anchor="middle">Artery</text>
              <text x="222" y="492" font-family="Noto Sans, sans-serif" font-size="12.5" font-weight="700" fill="${PALETTE.ink}" text-anchor="middle">Wharton’s Jelly Matrix</text>
              <text x="222" y="510" font-family="Noto Sans, sans-serif" font-size="11.5" font-weight="600" fill="${PALETTE.inkMuted}" text-anchor="middle">Mucoid Cushion Protects Cord Vessels</text>
              ${titledCard({ x: 388, y: 215, w: 254, h: 145, title: 'Umbilical Vein (Toward Fetus)', body: 'Delivers oxygenated, glucose-, amino-acid- &amp; antibody-rich blood from placenta.', accent: PALETTE.rust })}
              ${titledCard({ x: 388, y: 382, w: 254, h: 145, title: 'Paired Arteries (To Placenta)', body: 'Return fetal CO₂, urea &amp; metabolic wastes to chorionic villi for clearance.', accent: PALETTE.blue })}
            `
            : `
              <rect x="74" y="210" width="165" height="270" rx="8" fill="#F5DCD4" stroke="${PALETTE.rust}" stroke-width="2" />
              <text x="156" y="246" font-family="Noto Sans, sans-serif" font-size="13" font-weight="700" fill="${PALETTE.rust}" text-anchor="middle">Maternal Sinus</text>
              <text x="156" y="274" font-family="Noto Sans, sans-serif" font-size="11.5" fill="${PALETTE.ink}" text-anchor="middle">O₂ · Glucose · IgG</text>
              ${flowArrow(244, 290, 295, 290, PALETTE.emerald, 2.8)}
              ${flowArrow(295, 405, 244, 405, PALETTE.blue, 2.8)}
              <rect x="300" y="210" width="112" height="270" rx="8" fill="#FAF6EC" stroke="${PALETTE.gold}" stroke-width="2" />
              <text x="356" y="338" font-family="Noto Sans, sans-serif" font-size="12" font-weight="700" fill="${PALETTE.gold}" text-anchor="middle">Selective</text>
              <text x="356" y="356" font-family="Noto Sans, sans-serif" font-size="12" font-weight="700" fill="${PALETTE.gold}" text-anchor="middle">Villous Barrier</text>
              ${flowArrow(418, 290, 468, 290, PALETTE.emerald, 2.8)}
              ${flowArrow(468, 405, 418, 405, PALETTE.blue, 2.8)}
              <rect x="472" y="210" width="165" height="270" rx="8" fill="#DCEAF7" stroke="${PALETTE.blue}" stroke-width="2" />
              <text x="554" y="246" font-family="Noto Sans, sans-serif" font-size="13" font-weight="700" fill="${PALETTE.blue}" text-anchor="middle">Fetal Capillaries</text>
              <text x="554" y="274" font-family="Noto Sans, sans-serif" font-size="11.5" fill="${PALETTE.ink}" text-anchor="middle">Separate Blood</text>
              <text x="356" y="538" font-family="Noto Sans, sans-serif" font-size="12.5" font-weight="600" fill="${PALETTE.ink}" text-anchor="middle">Maternal and fetal RBCs stay isolated across syncytiotrophoblast membranes.</text>
            `
        }
        ${rightCol('MATERNAL–FETAL PHYSIOLOGY', 'Endocrine &amp; Immune Organ', 'Placenta synthesizes hCG, progesterone &amp; transfers maternal IgG immunity while screening many bacteria.', PALETTE.rust)}
      `;
    } else if (kind === 'neural-tube-neurulation' || kind === 'cardiac-embryology-overview' || kind === 'brain-heart-distinction') {
      const isHeart = kind === 'cardiac-embryology-overview';
      const isDist = kind === 'brain-heart-distinction';
      const isBrainRegional = id === 'HUM-021';
      bodySvg = `
        ${cardBox({ x: 46, y: 142, w: 620, h: 456, fill: PALETTE.paperCard, stroke: PALETTE.blue, strokeWidth: 1.4, accentTop: PALETTE.blue })}
        <text x="356" y="162" font-family="Noto Sans, sans-serif" font-size="13.5" font-weight="700" fill="#FFFFFF" text-anchor="middle">${isDist ? (id === 'HUM-027' ? 'SIDE-BY-SIDE: MYOCARDIAL PUMP VS. CORTICAL NETWORK' : 'PREFRONTAL CORTEX &amp; SYNAPTIC LEARNING NETWORKS') : isHeart ? 'EMBRYONIC HEART TUBE LOOPING → FOUR-CHAMBER PUMP' : isBrainRegional ? 'NEURAL TUBE → PRIMARY &amp; SECONDARY BRAIN VESICLES' : 'DAY 18–28 NEURULATION &amp; CENTRAL NERVOUS SYSTEM'}</text>
        ${
          id === 'HUM-027'
            ? `
              ${titledCard({ x: 74, y: 198, w: 266, h: 225, badge: 'Hemodynamic Organ', title: 'Heart (4-Chamber Pump)', body: 'SA node pacemaker drives ~100,000 beats/day. Cardiac transplants retain recipient cognition &amp; memory.', accent: PALETTE.rust })}
              ${flowArrow(344, 310, 372, 310, PALETTE.gold, 2.8)}
              ${titledCard({ x: 376, y: 198, w: 266, h: 225, badge: 'Cognitive Organ', title: 'Brain (~86B Neurons)', body: 'Prefrontal cortex, hippocampus &amp; limbic hubs generate conscious thought, language &amp; decision-making.', accent: PALETTE.blue })}
              <rect x="74" y="440" width="568" height="130" rx="6" fill="#FAF6EC" stroke="${PALETTE.gold}" />
              ${renderSvgTextLines(wrapLines('Autonomic Bridge: Vagus &amp; sympathetic nerves shift heart rate during emotion; classical Arabic "qalb" denotes inner awareness metaphorically rather than myocardial neurology.', 70, 4), 94, 482, 19, { fontSize: 12.5, fill: PALETTE.ink })}
            `
            : isDist
            ? `
              ${titledCard({ x: 74, y: 196, w: 554, h: 112, badge: '1. Synaptogenesis (~0–3 yr)', title: 'Over 1 Million New Neural Connections / Second', body: 'Early language, motor, and social stimulation wire cortical networks rapidly across infancy.', accent: PALETTE.blue })}
              ${titledCard({ x: 74, y: 324, w: 554, h: 112, badge: '2. Experience-Dependent Pruning', title: 'Use-It-Or-Lose-It Circuit Refinement', body: 'Redundant synapses trim cleanly to accelerate myelinated prefrontal executive conduction.', accent: PALETTE.emerald })}
              ${titledCard({ x: 74, y: 452, w: 554, h: 112, badge: '3. Adult Neuroplasticity', title: 'Prefrontal Maturation Extends to ~Age 25', body: 'Continued study and reflection strengthen cortical white-matter pathways throughout life.', accent: PALETTE.gold })}
            `
            : isHeart
            ? `
              ${titledCard({ x: 74, y: 196, w: 554, h: 112, badge: 'Day 21–24', title: 'Mesodermal Cardiogenic Tubes Fuse &amp; Loop', body: 'Spontaneous myocyte contractions begin pumping primitive plasma long before placenta demand peaks.', accent: PALETTE.rust })}
              ${titledCard({ x: 74, y: 324, w: 554, h: 112, badge: 'Weeks 5–8', title: 'Atrial/Ventricular Septation &amp; Four Valves', body: 'Endocardial cushions partition oxygenated systemic and pulmonary return paths cleanly.', accent: PALETTE.blue })}
              ${titledCard({ x: 74, y: 452, w: 554, h: 112, badge: 'Prenatal Shunts', title: 'Foramen Ovale &amp; Ductus Arteriosus Bypass Uninflated Lungs', body: 'First newborn cry flips pressure gradients, closing shunts smoothly into adult double circulation.', accent: PALETTE.emerald })}
            `
            : isBrainRegional
            ? `
              ${titledCard({ x: 74, y: 204, w: 162, h: 245, title: '1. Closed Neural Tube', body: 'Hollow ectodermal cylinder runs along dorsal embryonic midline.', accent: PALETTE.cyan })}
              ${flowArrow(240, 326, 266, 326, PALETTE.blue, 2.8)}
              ${titledCard({ x: 270, y: 204, w: 164, h: 245, title: '2. Three Vesicles (~Wk 4)', body: 'Forebrain, midbrain &amp; hindbrain pouches expand anteriorly.', accent: PALETTE.plum })}
              ${flowArrow(438, 326, 464, 326, PALETTE.blue, 2.8)}
              ${titledCard({ x: 468, y: 204, w: 170, h: 245, title: '3. Specialized Hubs', body: 'Cerebral cortex, thalamus, brainstem &amp; cerebellum emerge.', accent: PALETTE.emerald })}
              <text x="356" y="516" font-family="Noto Sans, sans-serif" font-size="11.5" font-weight="600" fill="${PALETTE.inkMuted}" text-anchor="middle">Radial glial fibers guide ~86B migrating neurons into six neocortical layers.</text>
            `
            : `
              ${titledCard({ x: 74, y: 196, w: 554, h: 112, badge: 'Day 18–28 (Weeks 3–4)', title: 'Notochord Induces Neural Plate → Closed Neural Tube', body: 'Ectodermal edges fold dorsally and zip shut into future brain and spinal canal (folate-dependent closure).', accent: PALETTE.blue })}
              ${titledCard({ x: 74, y: 324, w: 554, h: 112, badge: 'Weeks 5–12', title: 'Prosencephalon, Mesencephalon &amp; Rhombencephalon Vesicles', body: 'Anterior end balloons into cerebral hemispheres, cerebellum &amp; brainstem; ~250,000 neurons generated per min at peak.', accent: PALETTE.plum })}
              ${titledCard({ x: 74, y: 452, w: 554, h: 112, badge: 'Postnatal Plasticity', title: 'Synaptic Pruning &amp; Myelination Through Young Adulthood', body: 'Experience strengthens active pathways continuously well into the mid-20s.', accent: PALETTE.emerald })}
            `
        }
        ${rightCol('NEURO-CARDIAC DEVELOPMENT', 'Physiological Integration', enrichment?.whatItMeans ?? 'Embryonic organ systems differentiate interactively under genetic and biochemical cues.', PALETTE.blue)}
      `;
    } else if (kind === 'sensory-systems-development') {
      const mode = id === 'HUM-024' ? 'ear' : id === 'HUM-025' ? 'eye' : 'timeline';
      bodySvg = `
        ${cardBox({ x: 46, y: 142, w: 620, h: 456, fill: PALETTE.paperCard, stroke: PALETTE.teal, strokeWidth: 1.4, accentTop: PALETTE.teal })}
        <text x="356" y="162" font-family="Noto Sans, sans-serif" font-size="13.5" font-weight="700" fill="#FFFFFF" text-anchor="middle">${mode === 'ear' ? 'AUDITORY COCHLEA &amp; FETAL ACOUSTIC TRANSDUCTION' : mode === 'eye' ? 'OCULAR OPTICS, RETINAL PHOTORECEPTORS &amp; VISUAL CORTEX' : 'COMPARATIVE FETAL SENSORY MATURATION TIMELINE (WEEKS)'}</text>
        ${
          mode === 'timeline'
            ? `
              ${[
                { sense: 'Somatosensory Touch (Perioral → Full Skin)', w: 185, note: 'Begins ~Wk 8–12', col: PALETTE.ochre, y: 215, inside: false },
                { sense: 'Vestibular Balance &amp; Inner Ear Cochlea', w: 325, note: 'Functional ~Wk 18–24', col: PALETTE.cyan, y: 295, inside: false },
                { sense: 'Olfactory &amp; Gustatory Amniotic Chemoreception', w: 365, note: 'Active ~Wk 20–28', col: PALETTE.emerald, y: 375, inside: false },
                { sense: 'Visual Photoreception &amp; Cortical Sharpness', w: 495, note: 'Blink ~Wk 26 · Crisp Postnatal', col: PALETTE.blue, y: 455, inside: true },
              ]
                .map(
                  (s) => `
                  <text x="76" y="${s.y}" font-family="Noto Sans, sans-serif" font-size="12.5" font-weight="700" fill="${PALETTE.ink}">${s.sense}</text>
                  <rect x="76" y="${s.y + 10}" width="535" height="28" rx="5" fill="#EAE6DA" />
                  <rect x="76" y="${s.y + 10}" width="${s.w}" height="28" rx="5" fill="${s.col}" />
                  <text x="${s.inside ? 76 + s.w - 14 : 598}" y="${s.y + 29}" font-family="Noto Sans, sans-serif" font-size="11.5" font-weight="700" fill="${s.inside ? '#FFFFFF' : PALETTE.ink}" text-anchor="end">${s.note}</text>
                `
                )
                .join('')}
            `
            : mode === 'ear'
            ? `
              ${titledCard({ x: 74, y: 196, w: 554, h: 112, badge: '1. Sound Capture', title: 'Tympanic Membrane &amp; Three Ossicles (Malleus–Incus–Stapes)', body: 'Amplify airborne vibrations ~20× into fluid pressure waves entering the oval window.', accent: PALETTE.cyan })}
              ${titledCard({ x: 74, y: 324, w: 554, h: 112, badge: '2. Mechanotransduction', title: 'Organ of Corti Hair Cells Along Spiral Basilar Membrane', body: 'Tonotopically tuned stereocilia open K⁺ ion channels, encoding pitch (20 Hz–20 kHz) and rhythm.', accent: PALETTE.blue })}
              ${titledCard({ x: 74, y: 452, w: 554, h: 112, badge: '3. Early Uterine Hearing', title: 'Auditory Brainstem Reacts by ~Weeks 22–26', body: 'Fetuses hear low-frequency maternal heartbeat, breathing &amp; muffled speech long before dark-womb birth.', accent: PALETTE.emerald })}
            `
            : `
              ${titledCard({ x: 74, y: 196, w: 268, h: 214, badge: '1. Anterior Optics', title: 'Cornea, Aqueous Lens &amp; Iris', body: 'Refract incoming light (~400–700 nm) onto the posterior fovea and retinal macula.', accent: PALETTE.ochre })}
              ${flowArrow(346, 303, 372, 303, PALETTE.blue, 2.8)}
              ${titledCard({ x: 376, y: 196, w: 268, h: 214, badge: '2. Phototransduction', title: '~120M Rods + ~6M Cones', body: 'Rhodopsin &amp; opsin pigments convert photons to spikes across ~1M optic nerve fibers.', accent: PALETTE.blue })}
              ${titledCard({ x: 74, y: 428, w: 570, h: 142, badge: '3. Postnatal Cortical Calibration', title: 'Optic Chiasm → V1 Visual Cortex Maturation', body: 'Eye anatomy forms in utero, yet binocular acuity, depth &amp; color tracking refine rapidly after birth (~0–6 months).', accent: PALETTE.plum })}
            `
        }
        ${rightCol(
          mode === 'eye' ? 'VISUAL NEUROBIOLOGY' : mode === 'ear' ? 'AUDITORY NEUROBIOLOGY' : 'SENSORY NEUROBIOLOGY',
          mode === 'eye' ? 'Ocular &amp; Cortical Maturation' : mode === 'ear' ? 'Fetal Acoustic Pathways' : 'Functional Milestones',
          mode === 'eye'
            ? 'Photoreceptors form prenatally while sharp binocular acuity and visual cortex tracking refine briskly after birth.'
            : mode === 'ear'
            ? 'Middle-ear ossicles and cochlear hair cells transmit rhythmic sound waves well before birth (~Weeks 22–26).'
            : 'Observing that fetal hearing activates before dark-womb vision aligns naturally without claiming one organ exclusively defines personhood.',
          PALETTE.teal
        )}
      `;
    } else {
      // HUM-034 Skin Layers vs HUM-035 Nociceptor -> Spinal Reflex -> Cortex Neural Arc + HUM-036 Fingerprints
      const isFp = kind === 'fingerprint-friction-ridges';
      const isPainArc = id === 'HUM-035';
      bodySvg = `
        ${cardBox({ x: 46, y: 142, w: 620, h: 456, fill: PALETTE.paperCard, stroke: isFp ? PALETTE.slate : PALETTE.rust, strokeWidth: 1.4, accentTop: isFp ? PALETTE.slate : PALETTE.rust })}
        <text x="356" y="162" font-family="Noto Sans, sans-serif" font-size="13.5" font-weight="700" fill="#FFFFFF" text-anchor="middle">${isFp ? 'VOLAR FRICTION RIDGES &amp; UNIQUE DERMAL PAPILLAE PATTERNS' : isPainArc ? 'NOCICEPTOR → SPINAL DORSAL HORN → CORTICAL PAIN ARC' : 'STRATIFIED HUMAN INTEGUMENT &amp; THERMOREGULATION'}</text>
        ${
          isFp
            ? `
              <!-- Concentric whorl ridges + loop + arch -->
              <rect x="76" y="205" width="240" height="240" rx="8" fill="#FAF6EC" stroke="${PALETTE.slate}" />
              ${[18, 32, 46, 60, 74, 88].map((r) => `<ellipse cx="196" cy="325" rx="${r * 0.78}" ry="${r}" fill="none" stroke="${PALETTE.slate}" stroke-width="2.2" />`).join('')}
              <text x="196" y="472" font-family="Noto Sans, sans-serif" font-size="12.5" font-weight="700" fill="${PALETTE.ink}" text-anchor="middle">Unique Ridge Minutiae (~Weeks 10–17)</text>
              ${titledCard({ x: 336, y: 205, w: 300, h: 145, title: 'Mechanical Grip &amp; Micro-Touch', body: 'Friction ridges amplify vibration sensing across surfaces and prevent wet slip.', accent: PALETTE.teal })}
              ${titledCard({ x: 336, y: 368, w: 300, h: 145, title: 'Even Identical Twins Differ', body: 'Random amniotic fluid pressure &amp; ridge-buckling micro-stresses make every fingertip singular for life.', accent: PALETTE.gold })}
            `
            : isPainArc
            ? `
              ${titledCard({ x: 74, y: 204, w: 168, h: 242, title: '1. Epidermal Nociceptors', body: 'Aδ fast &amp; C slow nerve endings fire when tissue heat/injury strikes dermis.', accent: PALETTE.rust })}
              ${flowArrow(246, 325, 276, 325, PALETTE.rust, 2.8)}
              ${titledCard({ x: 280, y: 204, w: 170, h: 242, title: '2. Dorsal Horn Reflex', body: 'Immediate spinal interneuron triggers limb withdrawal before conscious lag.', accent: PALETTE.ochre })}
              ${flowArrow(454, 325, 484, 325, PALETTE.blue, 2.8)}
              ${titledCard({ x: 488, y: 204, w: 148, h: 242, title: '3. Somatosensory Cortex', body: 'Thalamus relays pain localization &amp; protective learning.', accent: PALETTE.blue })}
              <text x="356" y="514" font-family="Noto Sans, sans-serif" font-size="11.5" font-weight="600" fill="${PALETTE.inkMuted}" text-anchor="middle">3rd-degree burns destroy endings, showing why dermis nerve density drives pain.</text>
            `
            : `
              <rect x="76" y="202" width="548" height="68" fill="#F2D7BF" stroke="#A67A52" />
              <text x="96" y="240" font-family="Noto Sans, sans-serif" font-size="13" font-weight="700" fill="${PALETTE.ink}">1. Epidermis + Stratum Corneum (Keratin Barrier &amp; Melanin)</text>
              <rect x="76" y="270" width="548" height="122" fill="#E8B4A0" stroke="${PALETTE.rust}" />
              <text x="96" y="305" font-family="Noto Sans, sans-serif" font-size="13" font-weight="700" fill="${PALETTE.rust}">2. Vascular Dermis: Eccrine Sweat Glands, Collagen &amp; Capillary Loops</text>
              <text x="96" y="330" font-family="Noto Sans, sans-serif" font-size="12" fill="${PALETTE.ink}">Vasodilation and evaporative sweating prevent hyperthermia across variable climates.</text>
              <rect x="76" y="392" width="548" height="86" fill="#F5E5B8" stroke="${PALETTE.ochre}" />
              <text x="96" y="438" font-family="Noto Sans, sans-serif" font-size="13" font-weight="700" fill="${PALETTE.ochre}">3. Hypodermis Adipose Cushion (Insulation &amp; Energy Reserve)</text>
              <text x="356" y="538" font-family="Noto Sans, sans-serif" font-size="12" font-weight="600" fill="${PALETTE.inkMuted}" text-anchor="middle">Continuously renewing epidermal basal stem cells seal micro-abrasions against infection.</text>
            `
        }
        ${rightCol('CUTANEOUS SOMATOSENSORY SCIENCE', isFp ? 'Forensic Dermatoglyphics' : 'Protective Nociception Caution', isFp ? 'Epidermal stem cells regenerate scarred surface skin along persistent deep dermal template papillae.' : 'Pain experience requires both intact peripheral skin nociceptors and conscious cortical processing.', isFp ? PALETTE.slate : PALETTE.rust)}
      `;
    }

  // 4. Lifespan Curves, Reproduction, Maternal Childbirth, Lactation & Homeostasis (Remaining HUM topics)
  } else {
    let leftTitle = 'HUMAN LIFESPAN &amp; PHYSIOLOGICAL TRAJECTORY';
    let leftCustom = '';

    if (kind === 'lifespan-weakness-strength-decline') {
      if (id === 'HUM-050') {
        leftTitle = 'COMPLETE MULTI-STAGE HUMAN BIOLOGICAL LIFE CYCLE';
        leftCustom = `
          ${cycleNodeRing(356, 370, 142, [
            { label: 'Prenatal Formation', sub: 'Gametes → Organogenesis', color: PALETTE.plum },
            { label: 'Infancy &amp; Youth', sub: 'Rapid Growth &amp; Myelination', color: PALETTE.cyan },
            { label: 'Adult Peak', sub: 'Peak Strength (~25–35y)', color: PALETTE.emerald },
            { label: 'Senescence Decline', sub: 'Sarcopenia &amp; Fragility', color: PALETTE.ochre },
          ])}
          <text x="356" y="366" font-family="Liberation Serif, serif" font-size="12" font-weight="700" fill="${PALETTE.emerald}" text-anchor="middle">HUMAN</text>
          <text x="356" y="382" font-family="Liberation Serif, serif" font-size="12" font-weight="700" fill="${PALETTE.emerald}" text-anchor="middle">LIFESPAN</text>
        `;
      } else if (id === 'HUM-029') {
        leftTitle = 'POSTNATAL LINEAR STATURE &amp; BRAIN VOLUME GROWTH';
        leftCustom = `
          ${chartAxes({ x: 118, y: 205, w: 500, h: 280, xLabel: 'Postnatal Growth Phase', yLabel: 'Stature &amp; Cortical Mass (% Adult)', xTicks: ['Birth', '2y Toddler', '12y Puberty', '20y Adult'], yTicks: ['25%', '50%', '75%', '100%'] })}
          <path d="M 122 440 Q 220 350 385 280 Q 485 228 608 214" fill="none" stroke="${PALETTE.cyan}" stroke-width="3.5" />
          <path d="M 122 390 Q 200 245 360 220 L 608 214" fill="none" stroke="${PALETTE.plum}" stroke-width="3" stroke-dasharray="5 3" />
          ${calloutTag(275, 224, 'Brain Reaches ~85% Volume by Age 3', PALETTE.plum, '#FFFFFF', PALETTE.plum)}
          ${calloutTag(485, 286, 'Pubertal Linear Growth Spurt', PALETTE.cyan, '#FFFFFF', PALETTE.cyan)}
        `;
      } else if (id === 'HUM-030') {
        leftTitle = 'LATE-LIFE ORGAN &amp; MUSCLE RESERVE DECLINE (AGE 30 → 80+)';
        leftCustom = `
          ${[
            { l: 'Skeletal Muscle Mass (Sarcopenia Vulnerability)', p: 58, c: PALETTE.rust },
            { l: 'Trabecular Bone Mineral Density (Osteopenia Risk)', p: 62, c: PALETTE.ochre },
            { l: 'Renal Filtration Reserve (GFR Decline)', p: 55, c: PALETTE.cyan },
            { l: 'Maximal Cardiac &amp; Pulmonary Reserve (VO₂)', p: 50, c: PALETTE.blue },
          ]
            .map((r, i) => {
              const y = 212 + i * 86;
              return `<text x="82" y="${y}" font-family="Noto Sans, sans-serif" font-size="12.5" font-weight="700" fill="${PALETTE.ink}">${r.l}</text>
                <rect x="82" y="${y + 10}" width="530" height="24" rx="4" fill="#EAE6DA" />
                <rect x="82" y="${y + 10}" width="${(530 * r.p) / 100}" height="24" rx="4" fill="${r.c}" />`;
            })
            .join('')}
          <text x="356" y="566" font-family="Noto Sans, sans-serif" font-size="12" font-weight="600" fill="${PALETTE.inkMuted}" text-anchor="middle">Regular resistance exercise, protein intake, and fall prevention slow functional decline substantially.</text>
        `;
      } else if (id === 'HUM-031') {
        leftTitle = 'FOUR INTERACTING DETERMINANTS OF HUMAN LONGEVITY';
        leftCustom = `
          ${titledCard({ x: 74, y: 196, w: 270, h: 170, badge: '~20–30% Share', title: 'Genomic &amp; Repair Variants', body: 'DNA damage response and telomere maintenance vary mildly across families.', accent: PALETTE.plum })}
          ${titledCard({ x: 368, y: 196, w: 270, h: 170, badge: 'Sanitation &amp; Safety', title: 'Clean Water &amp; Vaccines', body: 'Historical global life expectancy doubled mainly by cutting infant infectious deaths.', accent: PALETTE.cyan })}
          ${titledCard({ x: 74, y: 386, w: 270, h: 170, badge: 'Modifiable Habits', title: 'Nutrition, Sleep &amp; Movement', body: 'Balanced diet and non-smoking reduce cardiovascular &amp; metabolic mortality.', accent: PALETTE.emerald })}
          ${titledCard({ x: 368, y: 386, w: 270, h: 170, badge: 'Clinical Access', title: 'Geriatric &amp; Acute Care', body: 'Prompt medical screening preserves mobility and cognitive dignity into old age.', accent: PALETTE.gold })}
        `;
      } else if (id === 'HUM-046') {
        leftTitle = 'DEVELOPMENTAL CONTINUITY &amp; EPIGENETIC PLASTICITY';
        leftCustom = `
          ${titledCard({ x: 74, y: 196, w: 554, h: 112, badge: 'Prenatal Reserve', title: 'Early Nutrition &amp; Placental Health', body: 'Intrauterine environment sets baseline nephron and metabolic capacities.', accent: PALETTE.plum })}
          ${titledCard({ x: 74, y: 324, w: 554, h: 112, badge: 'Adolescent Remodeling', title: 'Endocrine &amp; Bone Peak Accrual', body: '90% of adult peak bone mass accrues before ~Age 20, buffering later aging.', accent: PALETTE.emerald })}
          ${titledCard({ x: 74, y: 452, w: 554, h: 112, badge: 'Adult Stewardship', title: 'Lifestyle Influences Aging Pace (Not Fixed Fate)', body: 'Telomere shortening and cellular senescence respond measurably to physical care.', accent: PALETTE.blue })}
        `;
      } else if (id === 'HUM-047') {
        leftTitle = 'CELLULAR SENESCENCE, SARCOPENIA &amp; CARE BOUNDARIES';
        leftCustom = `
          ${titledCard({ x: 74, y: 204, w: 168, h: 242, title: '1. Senescent Cells', body: 'Mitotic arrest &amp; reduced stem-cell renewal gradually limit repair.', accent: PALETTE.rust })}
          ${flowArrow(246, 325, 276, 325, PALETTE.ochre, 2.8)}
          ${titledCard({ x: 280, y: 204, w: 170, h: 242, title: '2. Frailty &amp; Balance Risk', body: 'Loss of fast-twitch muscle fibers lowers gait stability &amp; recovery.', accent: PALETTE.ochre })}
          ${flowArrow(454, 325, 484, 325, PALETTE.emerald, 2.8)}
          ${titledCard({ x: 488, y: 204, w: 148, h: 242, title: '3. Active Preservation', body: 'Strength training, social ties &amp; assistive care protect dignity.', accent: PALETTE.emerald })}
          <text x="356" y="514" font-family="Noto Sans, sans-serif" font-size="11.5" font-weight="600" fill="${PALETTE.inkMuted}" text-anchor="middle">Late-life frailty highlights mutual social care alongside geriatric medicine.</text>
        `;
      } else {
        // HUM-028
        leftTitle = 'LIFESPAN INVERTED-U TRAJECTORY: WEAKNESS → STRENGTH → WEAKNESS';
        leftCustom = `
          ${chartAxes({
            x: 118,
            y: 205,
            w: 500,
            h: 280,
            xLabel: 'Human Chronological Age (Years)',
            yLabel: 'Muscle Mass, Bone Density &amp; Peak VO₂ (%)',
            xTicks: ['0y (Birth)', '25y (Peak)', '50y', '75y', '90+y'],
            yTicks: ['20%', '40%', '60%', '80%', '100%'],
          })}
          <path d="M 122 465 C 185 335, 225 220, 275 215 C 365 218, 495 315, 610 435" fill="none" stroke="${PALETTE.teal}" stroke-width="3.8" />
          ${calloutTag(275, 200, 'Peak Physical Prime (~20–35 yr)', PALETTE.emerald, '#FFFFFF', PALETTE.emerald)}
          ${calloutTag(515, 398, 'Age-Linked Fragility Return', PALETTE.rust, '#FFFFFF', PALETTE.rust)}
        `;
      }
    } else if (kind === 'human-variation-proportion') {
      if (id === 'HUM-032') {
        leftTitle = 'HUMAN GENOMIC UNITY (99.9%) &amp; PHENOTYPIC VARIATION (~0.1%)';
        leftCustom = `
          ${titledCard({ x: 74, y: 196, w: 554, h: 112, badge: '1. Genomic Shared Core', title: '99.9% Shared DNA Across All Human Populations', body: 'All humans share the identical ~20,000 protein-coding gene toolkit for speech, bipedal posture &amp; cognition.', accent: PALETTE.emerald })}
          ${titledCard({ x: 74, y: 324, w: 554, h: 112, badge: '2. Individual Uniqueness', title: '~4–5 Million Single-Nucleotide Variants Per Person', body: 'Polygenic combinations create distinct facial proportions, iris melanin, vocal timbre &amp; metabolisms.', accent: PALETTE.blue })}
          ${titledCard({ x: 74, y: 452, w: 554, h: 112, badge: '3. Shared Lineage', title: 'Outward Traits Reflect Adaptive Polygenic Diversity', body: 'Melanin, stature, and facial landmarks represent continuous variation within one united species.', accent: PALETTE.gold })}
        `;
      } else {
        leftTitle = 'ALLOMETRIC HEAD-TO-BODY PROPORTION SCALING (FETUS → ADULT)';
        leftCustom = `
          ${[
            { stage: 'Second-Trimester Fetus (~4 mo): Head = ~40% Total Length', w: 40, c: PALETTE.plum },
            { stage: 'Full-Term Newborn: Head = ~25% (1 : 4 Ratio)', w: 25, c: PALETTE.cyan },
            { stage: 'Childhood (~Age 6): Limbs Lengthen (~1 : 6 Ratio)', w: 17, c: PALETTE.emerald },
            { stage: 'Adult Stature: Cranial Vault ~13% (1 : 7.5 Bipedal Ratio)', w: 13, c: PALETTE.gold },
          ]
            .map((p, i) => {
              const y = 212 + i * 86;
              return `<text x="82" y="${y}" font-family="Noto Sans, sans-serif" font-size="12.5" font-weight="700" fill="${PALETTE.ink}">${p.stage}</text>
                <rect x="82" y="${y + 10}" width="530" height="24" rx="4" fill="#EAE6DA" />
                <rect x="82" y="${y + 10}" width="${(530 * p.w) / 100}" height="24" rx="4" fill="${p.c}" />
                <text x="${94 + (530 * p.w) / 100}" y="${y + 27}" font-family="Noto Sans, sans-serif" font-size="11.5" font-weight="700" fill="${PALETTE.inkMuted}">Torso &amp; Lower Limb Share (${100 - p.w}%)</text>`;
            })
            .join('')}
          <text x="356" y="566" font-family="Noto Sans, sans-serif" font-size="12" font-weight="600" fill="${PALETTE.inkMuted}" text-anchor="middle">Bilateral symmetry and regulated growth hormones calibrate center-of-gravity for upright walking.</text>
        `;
      }
    } else if (kind === 'reproductive-anatomy-contribution' || kind === 'pregnancy-childbirth-maternal' || kind === 'lactation-weaning-nutrition') {
      if (kind === 'lactation-weaning-nutrition') {
        if (id === 'HUM-043') {
          leftTitle = 'POSTNATAL GUT MICROBIOME &amp; PASSIVE IgA TIMELINE (0–24 MO)';
          leftCustom = `
            ${chartAxes({ x: 128, y: 205, w: 490, h: 280, xLabel: 'Infant Age (Months Postpartum)', yLabel: 'Immunity &amp; Mucosal Protection', xTicks: ['Birth', '6 mo', '12 mo', '24 mo'], yTicks: ['Low', 'Rising', 'Mature'], yLabelOffset: 62 })}
            <path d="M 132 225 Q 250 255 370 330 Q 495 405 608 450" fill="none" stroke="${PALETTE.gold}" stroke-width="3.5" />
            <path d="M 132 455 Q 290 405 420 315 Q 520 250 608 225" fill="none" stroke="${PALETTE.emerald}" stroke-width="3.5" />
            ${calloutTag(225, 244, 'Maternal Milk IgA Protection', PALETTE.gold, '#FFFFFF', PALETTE.gold)}
            ${calloutTag(498, 224, 'Infant Endogenous IgG', PALETTE.emerald, '#FFFFFF', PALETTE.emerald)}
          `;
        } else if (id === 'HUM-044') {
          leftTitle = 'SIX-MONTH EXCLUSIVE MILK → COMPLEMENTARY SOLID WEANING';
          leftCustom = `
            ${titledCard({ x: 74, y: 204, w: 168, h: 242, title: 'Months 0–6', body: 'Exclusive breastmilk covers fluid, protein, DHA &amp; immunity fully.', accent: PALETTE.emerald })}
            ${flowArrow(246, 325, 276, 325, PALETTE.blue, 2.8)}
            ${titledCard({ x: 280, y: 204, w: 170, h: 242, title: 'Months 6–12', body: 'Introduce iron- &amp; zinc-rich pureed solids as endogenous iron reserves dip.', accent: PALETTE.blue })}
            ${flowArrow(454, 325, 484, 325, PALETTE.gold, 2.8)}
            ${titledCard({ x: 488, y: 204, w: 148, h: 242, title: 'Months 12–24+', body: 'Gradual transition toward balanced family diet while weaning.', accent: PALETTE.gold })}
            <text x="356" y="514" font-family="Noto Sans, sans-serif" font-size="12" font-weight="600" fill="${PALETTE.inkMuted}" text-anchor="middle">WHO/UNICEF framework accommodates clinical, nutritional, and maternal circumstances flexibly.</text>
          `;
        } else {
          // HUM-042
          leftTitle = 'MATERNAL LACTATION COMPOSITION &amp; TWO-YEAR WEANING WINDOW';
          leftCustom = `
            ${titledCard({ x: 74, y: 196, w: 554, h: 112, badge: 'Days 1–5', title: 'Colostrum: Concentrated Secretory IgA &amp; Leukocytes', body: 'Lines newborn gut mucosa against enteric pathogens while seeding Bifidobacteria microbiome.', accent: PALETTE.gold })}
            ${titledCard({ x: 74, y: 324, w: 554, h: 112, badge: 'Months 1–6', title: 'Exclusive Human Milk: Bioactive DHA, Oligosaccharides &amp; Iron', body: 'WHO/AAP observe sharp protection against infant diarrhea, otitis media, and respiratory mortality.', accent: PALETTE.emerald })}
            ${titledCard({ x: 74, y: 452, w: 554, h: 112, badge: 'Months 6–24+', title: 'Complementary Foods + Gradual Microbiome Weaning', body: 'Solid iron-rich foods join breastmilk cleanly while maternal care &amp; family nutrition transition smoothly.', accent: PALETTE.blue })}
          `;
        }
      } else if (kind === 'pregnancy-childbirth-maternal') {
        if (id === 'HUM-041') {
          leftTitle = 'THREE STAGES OF PARTURITION &amp; NEWBORN FIRST-BREATH SWITCH';
          leftCustom = `
            ${titledCard({ x: 74, y: 204, w: 168, h: 242, title: '1. Cervical Effacement', body: 'Pulsatile oxytocin dilates cervix toward full 10 cm opening.', accent: PALETTE.plum })}
            ${flowArrow(246, 325, 276, 325, PALETTE.rust, 2.8)}
            ${titledCard({ x: 280, y: 204, w: 170, h: 242, title: '2. Fetal Expulsion', body: 'Coordinated myometrial &amp; abdominal contractions deliver infant.', accent: PALETTE.rust })}
            ${flowArrow(454, 325, 484, 325, PALETTE.emerald, 2.8)}
            ${titledCard({ x: 488, y: 204, w: 148, h: 242, title: '3. Placenta &amp; First Breath', body: 'Lung inflation drops resistance &amp; closes prenatal shunts.', accent: PALETTE.emerald })}
            <text x="356" y="514" font-family="Noto Sans, sans-serif" font-size="11.5" font-weight="600" fill="${PALETTE.inkMuted}" text-anchor="middle">Skilled obstetric care sharply reduces hemorrhage and neonatal asphyxia risk.</text>
          `;
        } else if (id === 'HUM-045') {
          leftTitle = 'MATERNAL PHYSIOLOGICAL RESERVES ↔ PLACENTAL STRESS';
          leftCustom = `
            ${titledCard({ x: 74, y: 196, w: 270, h: 170, badge: 'Nutrient Demand', title: 'Iron, Folate &amp; Calcium Transfer', body: 'Fetus draws maternal iron &amp; bone minerals actively across placenta.', accent: PALETTE.ochre })}
            ${titledCard({ x: 368, y: 196, w: 270, h: 170, badge: 'Cardiorenal Strain', title: '+45% Plasma &amp; Uterine Load', body: 'Maternal heart, kidneys, and spine bear cumulative mechanical effort.', accent: PALETTE.rust })}
            ${titledCard({ x: 74, y: 386, w: 564, h: 170, badge: 'Ethical &amp; Clinical Imperative', title: 'Prenatal Care, Recovery Time &amp; Intergenerational Support', body: 'Documented physical hardship ("wahnan ‘ala wahnin") grounds lifelong maternal respect and clinical protection.', accent: PALETTE.emerald })}
          `;
        } else {
          // HUM-040
          leftTitle = 'MATERNAL GESTATIONAL ADAPTATION &amp; PARTURITION REFLEX';
          leftCustom = `
            ${titledCard({ x: 74, y: 196, w: 554, h: 112, badge: 'Trimesters 1–3', title: '+45% Maternal Plasma Volume, Cardiac Output &amp; Bone Load', body: 'Maternal heart, kidneys, lungs &amp; calcium reserves stretch remarkably to nourish fetal growth.', accent: PALETTE.rust })}
            ${titledCard({ x: 74, y: 324, w: 554, h: 112, badge: 'Labor Initiation', title: 'Ferguson Positive-Feedback Oxytocin &amp; Prostaglandin Cascade', body: 'Cervical stretch triggers pulsatile pituitary oxytocin driving progressive uterine contractions.', accent: PALETTE.plum })}
            ${titledCard({ x: 74, y: 452, w: 554, h: 112, badge: 'First Minutes Postpartum', title: 'Pulmonary Surfactant Expansion &amp; Cry', body: 'Air inflation drops pulmonary vascular resistance and switches newborn circulation to independent life.', accent: PALETTE.emerald })}
          `;
        }
      } else {
        // HUM-037, 038, 039
        if (id === 'HUM-038') {
          leftTitle = '50% + 50% NUCLEAR DNA &amp; MATERNAL MITOCHONDRIAL HERITAGE';
          leftCustom = `
            ${titledCard({ x: 74, y: 196, w: 270, h: 170, badge: 'Paternal Gamete', title: 'Sperm: 23 Nuclear Chromosomes', body: 'Contributes half of autosomal genes plus either X or Y sex chromosome.', accent: PALETTE.blue })}
            ${titledCard({ x: 368, y: 196, w: 270, h: 170, badge: 'Maternal Gamete', title: 'Ovum: 23 Nuclear + mtDNA &amp; Organelles', body: 'Supplies half of nuclear genome plus cytoplasm &amp; mitochondrial genomes.', accent: PALETTE.plum })}
            ${titledCard({ x: 74, y: 386, w: 564, h: 170, badge: 'Balanced Hereditary Fact', title: 'Equal Diploid Genetic Legacy Across Generations', body: 'Modern genetics confirms neither parent biologically dominates autosomal inheritance; variations emerge cleanly.', accent: PALETTE.emerald })}
          `;
        } else if (id === 'HUM-039') {
          leftTitle = 'CLASSICAL EXEGETICAL READING VS. REPRODUCTIVE ANATOMY';
          leftCustom = `
            ${titledCard({ x: 74, y: 196, w: 554, h: 112, badge: 'Anatomical Fact', title: 'Testes (Scrotum) &amp; Ovaries (Pelvis) Produce Gametes', body: 'Spermatogenesis and oogenesis occur inside gonads; seminal vesicles/prostate add transport fluids.', accent: PALETTE.cyan })}
            ${titledCard({ x: 74, y: 324, w: 554, h: 112, badge: 'Classical Lexicon (86:6–7)', title: 'Sulb &amp; Tara’ib in Historical Tafsir', body: 'Classical scholars discussed broader torso/rib/pelvic idioms or dual parental fluids without modern histology.', accent: PALETTE.gold })}
            ${titledCard({ x: 74, y: 452, w: 554, h: 112, badge: 'Scholarly Guardrail', title: 'Avoid Forcing Modern Embryology Into Idioms', body: 'Present verified reproductive anatomy transparently alongside classic scholarly interpretations.', accent: PALETTE.rust })}
          `;
        } else {
          // HUM-037
          leftTitle = 'CHROMOSOMAL SEX DETERMINATION &amp; HPG ENDOCRINE AXIS';
          leftCustom = `
            ${titledCard({ x: 74, y: 196, w: 554, h: 112, badge: '50% + 50% Heritage', title: 'Equal Paternal (23) + Maternal (23) Nuclear Chromosomes', body: 'Both parents supply equal nuclear DNA; ovum uniquely adds cytoplasm and mitochondrial DNA (mtDNA).', accent: PALETTE.blue })}
            ${titledCard({ x: 74, y: 324, w: 554, h: 112, badge: 'Y-Chromosome Switch', title: 'SRY Gene Triggers Gonadal Differentiation (~Week 7)', body: 'Presence/absence of SRY initiates testicular or ovarian pathways from shared bipotential embryology.', accent: PALETTE.teal })}
            ${titledCard({ x: 74, y: 452, w: 554, h: 112, badge: 'Rare Clinical Caveat', title: 'Chromosomal Variants Exist Beyond Typical XX / XY', body: 'Science recognizes mosaicism and differences of sex development within human developmental biology.', accent: PALETTE.gold })}
          `;
        }
      }
    } else {
      // HUM-048 Homeostatic Dependence vs HUM-049 Survival Threshold Gauges
      if (id === 'HUM-049') {
        leftTitle = 'PHYSIOLOGICAL VULNERABILITY: SURVIVAL TOLERANCE THRESHOLDS';
        leftCustom = `
          ${[
            { l: 'Arterial Oxygen Deprivation (Minutes Scale: ~3–5 min)', pct: 12, col: PALETTE.rust },
            { l: 'Core Thermoregulation Collapse (&gt;41 °C or &lt;32 °C: Hours)', pct: 24, col: PALETTE.ochre },
            { l: 'Freshwater Hydration Deficit (Days Scale: ~3–5 Days)', pct: 46, col: PALETTE.cyan },
            { l: 'Caloric Macronutrient Fast (Weeks Scale: ~3–8 Weeks)', pct: 82, col: PALETTE.emerald },
          ]
            .map((t, i) => {
              const y = 212 + i * 86;
              return `<text x="82" y="${y}" font-family="Noto Sans, sans-serif" font-size="12.5" font-weight="700" fill="${PALETTE.ink}">${t.l}</text>
                <rect x="82" y="${y + 10}" width="530" height="24" rx="4" fill="#EAE6DA" />
                <rect x="82" y="${y + 10}" width="${(530 * t.pct) / 100}" height="24" rx="4" fill="${t.col}" />`;
            })
            .join('')}
          <text x="356" y="566" font-family="Noto Sans, sans-serif" font-size="12" font-weight="600" fill="${PALETTE.inkMuted}" text-anchor="middle">Extreme fragility relative to Earth’s air, water, and thermal windows reinforces humility &amp; care.</text>
        `;
      } else {
        leftTitle = 'HUMAN HOMEOSTATIC DEPENDENCE ON O₂, WATER &amp; NUTRIENTS';
        leftCustom = `
          ${titledCard({ x: 74, y: 196, w: 554, h: 112, badge: 'Minutes Scale', title: 'Continuous Oxygen ATP Oxidation (~250 mL O₂/min)', body: 'Cerebral cortex neurons require uninterrupted arterial O₂ &amp; glucose delivery; ~4 min hypoxia risks injury.', accent: PALETTE.rust })}
          ${titledCard({ x: 74, y: 324, w: 554, h: 112, badge: 'Days Scale', title: 'Hydration &amp; Electrolyte Osmolality (~2–3 L Turnover/Day)', body: 'Sweat, respiration &amp; renal urea clearance demand regular clean freshwater replenishment.', accent: PALETTE.cyan })}
          ${titledCard({ x: 74, y: 452, w: 554, h: 112, badge: 'Narrow Buffer Windows', title: 'Arterial pH 7.35–7.45 &amp; Core 36.5–37.5 °C Balance', body: 'Biological autonomy rests tightly on external planetary water, plant energy &amp; oxygen supply.', accent: PALETTE.emerald })}
        `;
      }
    }

    bodySvg = `
      ${cardBox({ x: 46, y: 142, w: 620, h: 456, fill: PALETTE.paperCard, stroke: PALETTE.teal, strokeWidth: 1.4, accentTop: PALETTE.teal })}
      <text x="356" y="162" font-family="Noto Sans, sans-serif" font-size="13.5" font-weight="700" fill="#FFFFFF" text-anchor="middle">${leftTitle}</text>
      ${leftCustom}
      ${rightCol('HUMAN PHYSIOLOGY &amp; DEVELOPMENT', 'Clinical Evidence Context', enrichment?.whatItMeans ?? 'Human development unfolds across sensitive homeostatic and genetic regulatory windows.', PALETTE.teal)}
    `;
  }

  bodySvg += keyTakeawayStrip([
    { label: 'Human Biology Finding', detail: finding, color: PALETTE.teal },
    { label: 'Reference Consensus', detail: `Evidence Grade ${entry.evidence_grade} · ${entry.evidence_sources[0]?.author_or_institution ?? 'Langman / Sadler Medical Embryology &amp; WHO'}.`, color: PALETTE.gold },
  ], 622);

  return buildPlateShell({
    title,
    subtitle: wrapLines(subtitle, 108, 1)[0],
    figureCode: id,
    discipline: 'Chapter 07 · Human Biology & Embryology',
    bodySvg,
    footerNote: `Scientific Reference Plate ${id} · Science of Creation Encyclopedia · Range-Framed Embryology Context`,
    accentColor: PALETTE.teal,
  });
}
