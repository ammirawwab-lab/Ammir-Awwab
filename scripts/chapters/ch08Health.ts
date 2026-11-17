import {
  calloutTag,
  cardBox,
  chartAxes,
  cycleNodeRing,
  flowArrow,
  hexagonCell,
  keyTakeawayStrip,
  titledCard,
} from '../lib/diagramPrimitives';
import { buildPlateShell, escXml, PALETTE, renderSvgTextLines, wrapLines } from '../lib/plateRenderer';
import type { RawDatasetEntry, TopicEnrichment } from '../../src/types/encyclopedia';

export function buildHealthPlateSvg(entry: RawDatasetEntry, enrichment?: TopicEnrichment): string {
  const id = entry.id;
  const title = enrichment?.diagramTitle ?? entry.title;
  const subtitle = enrichment?.diagramCaption ?? entry.scientific_topic;
  const finding = entry.scientific_evidence.finding;
  const lim = entry.limitations || 'Distinguish public-health guidance and clinical care from devotional practices.';
  const kind = (enrichment?.diagramKind ?? 'dietary-diversity-moderation') as string;
  let bodySvg = '';

  // 1. Hygiene, Ablution Boundaries & Clean Water Sanitation (HLT-001..008)
  if (
    kind === 'wudu-purification-areas' ||
    kind === 'skin-barrier-hygiene' ||
    kind === 'water-purification-contamination'
  ) {
    if (id === 'HLT-001' || id === 'HLT-002' || id === 'HLT-006') {
      const mode = id === 'HLT-001' ? 'wudu' : id === 'HLT-002' ? 'ghusl' : 'tayammum';
      bodySvg = `
        ${cardBox({ x: 46, y: 142, w: 620, h: 456, fill: '#EEF6F8', stroke: PALETTE.cyan, strokeWidth: 1.4, accentTop: PALETTE.cyan })}
        <text x="356" y="162" font-family="Noto Sans, sans-serif" font-size="13.5" font-weight="700" fill="#FFFFFF" text-anchor="middle">${
          mode === 'wudu'
            ? 'EXPOSED SKIN ZONES VS. CLINICAL HAND HYGIENE'
            : mode === 'ghusl'
            ? 'FULL-BODY WASHING VS. RITUAL PURIFICATION'
            : 'DRY ABLUTION (TAYAMMUM) ACCOMMODATION BOUNDARY'
        }</text>
        ${
          mode === 'tayammum'
            ? `
              ${titledCard({ x: 74, y: 196, w: 564, h: 112, badge: 'Devotional Rule (4:43, 5:6)', title: 'Dry Clean Earth When Water Is Unavailable or Harmful', body: 'Permits worship during water scarcity, travel, or skin/wound contraindications without water.', accent: PALETTE.ochre })}
              ${titledCard({ x: 74, y: 322, w: 564, h: 112, badge: 'Public Health Boundary', title: 'Does NOT Remove Grease, Viruses, or Spores', body: 'Soil contact is non-antiseptic; pathogen removal requires soap + water or ≥60% alcohol rub.', accent: PALETTE.rust })}
              ${titledCard({ x: 74, y: 448, w: 564, h: 112, badge: 'Infection Control', title: 'Never Equate Accommodation With Sanitization', body: 'Clinical hand hygiene remains mandatory around food prep, wounds, and contagious illness.', accent: PALETTE.cyan })}
            `
            : mode === 'wudu'
            ? `
              ${['Hands &amp; Wrists (High-Contact Flora)', 'Face, Mouth &amp; Nasal Mucosa', 'Forearms &amp; Elbows', 'Ankles &amp; Exposed Feet']
                .map((zone, idx) => {
                  const y = 204 + idx * 92;
                  const pct = [92, 74, 56, 68][idx];
                  return `
                    <text x="82" y="${y}" font-family="Noto Sans, sans-serif" font-size="13" font-weight="700" fill="${PALETTE.ink}">${zone}</text>
                    <rect x="82" y="${y + 10}" width="536" height="28" rx="4" fill="#DCE8EE" />
                    <rect x="82" y="${y + 10}" width="${(536 * pct) / 100}" height="28" rx="4" fill="${idx === 0 ? PALETTE.cyan : PALETTE.emerald}" />
                    <text x="${98 + (536 * pct) / 100}" y="${y + 29}" font-family="Noto Sans, sans-serif" font-size="11.5" font-weight="700" fill="${PALETTE.ink}">${idx === 0 ? 'Primary Vector' : 'Rinsed Surface'}</text>
                  `;
                })
                .join('')}
              <text x="356" y="576" font-family="Noto Sans, sans-serif" font-size="12" font-weight="600" fill="${PALETTE.rust}" text-anchor="middle">Plain water removes loose grit only; soap surfactants are required to disrupt lipid microbes.</text>
            `
            : `
              ${titledCard({ x: 74, y: 196, w: 270, h: 175, badge: 'Sweat &amp; Sebum', title: 'Skin Flora Turnover', body: 'Whole-body washing clears eccrine salts, skin squames, and odor-forming bacteria.', accent: PALETTE.cyan })}
              ${titledCard({ x: 368, y: 196, w: 270, h: 175, badge: 'Barrier Health', title: 'Moisture &amp; pH Care', body: 'Mild lukewarm rinsing preserves stratum corneum lipids without stripping skin.', accent: PALETTE.emerald })}
              <rect x="74" y="392" width="564" height="175" rx="6" fill="#FAF6EC" stroke="${PALETTE.gold}" stroke-width="1.4" />
              <text x="94" y="422" font-family="Noto Sans, sans-serif" font-size="13" font-weight="700" fill="${PALETTE.gold}">SCOPE BOUNDARY: RITUAL PURITY ≠ CLINICAL STERILITY</text>
              ${renderSvgTextLines(wrapLines('Qur’an 5:6 and 4:43 prescribe ghusl as devotional ritual purification. Routine bathing supports comfort and general hygiene, not dermatological treatment or clinical antisepsis.', 72, 4), 94, 452, 20, { fontSize: 12.5, fill: PALETTE.ink })}
            `
        }
        ${cardBox({ x: 688, y: 142, w: 466, h: 456, fill: PALETTE.paperCard, stroke: PALETTE.gold, strokeWidth: 1.4, accentTop: PALETTE.gold })}
        <text x="921" y="162" font-family="Noto Sans, sans-serif" font-size="13.5" font-weight="700" fill="#FFFFFF" text-anchor="middle">CDC HYGIENE &amp; HERMENEUTIC BOUNDARY</text>
        ${titledCard({ x: 710, y: 192, w: 422, h: 120, title: entry.scientific_topic, body: finding, accent: PALETTE.cyan })}
        ${titledCard({ x: 710, y: 326, w: 422, h: 120, title: 'When Soap &amp; Disinfection Are Needed', body: 'CDC guidance mandates soap lathering (20 s) after toileting, before eating, and around clinical care.', accent: PALETTE.emerald })}
        ${titledCard({ x: 710, y: 460, w: 422, h: 120, title: 'Scholarly Caution', body: lim, accent: PALETTE.rust })}
      `;
    } else if (kind === 'skin-barrier-hygiene') {
      const mode = id === 'HLT-003' ? 'textile' : id === 'HLT-004' ? 'shared' : 'menstrual';
      bodySvg = `
        ${cardBox({ x: 46, y: 142, w: 620, h: 456, fill: PALETTE.paperCard, stroke: PALETTE.emerald, strokeWidth: 1.4, accentTop: PALETTE.emerald })}
        <text x="356" y="162" font-family="Noto Sans, sans-serif" font-size="13.5" font-weight="700" fill="#FFFFFF" text-anchor="middle">${
          mode === 'textile'
            ? 'TEXTILE MICROENVIRONMENT &amp; LAUNDRY INTERVENTION'
            : mode === 'shared'
            ? 'SHARED SPACES: DROPLETS, FOMITES &amp; VENTILATION'
            : 'MENSTRUAL PHYSIOLOGY &amp; HYGIENIC ACCESS'
        }</text>
        ${
          mode === 'textile'
            ? `
              <rect x="78" y="210" width="556" height="90" rx="6" fill="#FAF0E4" stroke="${PALETTE.ochre}" />
              <text x="98" y="238" font-family="Noto Sans, sans-serif" font-size="13" font-weight="700" fill="${PALETTE.ochre}">Outer Textile Layer</text>
              <text x="98" y="264" font-family="Noto Sans, sans-serif" font-size="12" fill="${PALETTE.ink}">Collects ambient dust, pollen, and environmental soil particles.</text>
              <rect x="78" y="318" width="556" height="90" rx="6" fill="#EBF5F0" stroke="${PALETTE.emerald}" />
              <text x="98" y="346" font-family="Noto Sans, sans-serif" font-size="13" font-weight="700" fill="${PALETTE.emerald}">Inner Skin-Contact Weave</text>
              <text x="98" y="372" font-family="Noto Sans, sans-serif" font-size="12" fill="${PALETTE.ink}">Absorbs sweat, sebum lipids &amp; skin microbes → Detergent laundering resets hygiene.</text>
              <rect x="78" y="426" width="556" height="125" rx="6" fill="#F4F2EA" stroke="${PALETTE.gold}" />
              ${renderSvgTextLines(wrapLines('Exegetical Care (74:4): Classical tafsir interprets "purify your garments" across outer cleanliness, spiritual uprightness, and ethical conduct—not clinical sterilization rules.', 68, 4), 98, 456, 19, { fontSize: 12.5, fill: PALETTE.ink })}
            `
            : mode === 'shared'
            ? `
              ${cycleNodeRing(356, 366, 138, [
                { label: 'Fresh Ventilation', sub: 'Dilutes Respiratory Aerosols', color: PALETTE.cyan },
                { label: 'Surface Cleaning', sub: 'Reduces Fomite Transfer', color: PALETTE.emerald },
                { label: 'Handwashing Access', sub: 'Safe Water &amp; Soap Stations', color: PALETTE.blue },
                { label: 'Waste Containment', sub: 'Sanitary Municipal Disposal', color: PALETTE.ochre },
              ])}
              <text x="356" y="364" font-family="Liberation Serif, serif" font-size="11.5" font-weight="700" fill="${PALETTE.emerald}" text-anchor="middle">PUBLIC</text>
              <text x="356" y="380" font-family="Liberation Serif, serif" font-size="11.5" font-weight="700" fill="${PALETTE.emerald}" text-anchor="middle">HYGIENE</text>
            `
            : `
              ${chartAxes({ x: 130, y: 205, w: 492, h: 290, xLabel: '28-Day Menstrual Cycle (Typical Range 21–35 d)', yLabel: 'Endometrial Thickness', xTicks: ['Days 1–5 (Menses)', 'Day 14 (Ovulation)', 'Day 21', 'Day 28'], yTicks: ['Basal', 'Prolif.', 'Secretory'], yLabelOffset: 68 })}
              <path d="M 134 300 Q 165 460 202 450 Q 325 420 405 280 Q 518 245 616 255" fill="none" stroke="${PALETTE.plum}" stroke-width="3.5" />
              ${calloutTag(310, 444, 'Normal Endometrial Shedding', PALETTE.plum, '#FFFFFF', PALETTE.plum)}
              ${calloutTag(485, 228, 'Clean Products + Safe Water Prevent Irritation', PALETTE.emerald, '#FFFFFF', PALETTE.emerald)}
            `
        }
        ${cardBox({ x: 688, y: 142, w: 466, h: 456, fill: PALETTE.paperCard, stroke: PALETTE.gold, strokeWidth: 1.4, accentTop: PALETTE.gold })}
        <text x="921" y="162" font-family="Noto Sans, sans-serif" font-size="13.5" font-weight="700" fill="#FFFFFF" text-anchor="middle">PHYSIOLOGY &amp; TEXTUAL CLARITY</text>
        ${titledCard({ x: 710, y: 192, w: 422, h: 120, title: entry.scientific_topic, body: finding, accent: PALETTE.emerald })}
        ${titledCard({ x: 710, y: 326, w: 422, h: 120, title: 'Evidence Scope', body: enrichment?.whatItMeans ?? 'Public-health hygiene focuses on sanitary infrastructure and biological safety.', accent: PALETTE.cyan })}
        ${titledCard({ x: 710, y: 460, w: 422, h: 120, title: 'Scope Caution', body: lim, accent: PALETTE.rust })}
      `;
    } else {
      // HLT-005 vs HLT-008 Water treatment vs Preventive hazard barrier
      const isPrevent = id === 'HLT-008';
      bodySvg = `
        ${cardBox({ x: 46, y: 142, w: 620, h: 456, fill: '#EDF5F9', stroke: PALETTE.blue, strokeWidth: 1.4, accentTop: PALETTE.blue })}
        <text x="356" y="162" font-family="Noto Sans, sans-serif" font-size="13.5" font-weight="700" fill="#FFFFFF" text-anchor="middle">${isPrevent ? 'PREVENTIVE PUBLIC-HEALTH HAZARD BARRIERS' : 'WHO SAFE WATER TREATMENT &amp; QUALITY TESTING'}</text>
        ${
          isPrevent
            ? `
              ${titledCard({ x: 74, y: 204, w: 564, h: 105, badge: 'Primary Prevention', title: 'Sanitation, Safe Water &amp; Hand Hygiene', body: 'Interrupts diarrheal, respiratory, and vector transmission before acute illness occurs.', accent: PALETTE.emerald })}
              ${titledCard({ x: 74, y: 324, w: 564, h: 105, badge: 'Safety Behaviour', title: 'Food Safety &amp; Injury Risk Reduction', body: 'Temperature control, hazard avoidance, and evidence-based preventive screening.', accent: PALETTE.blue })}
              ${titledCard({ x: 74, y: 444, w: 564, h: 105, badge: '2:195 Context', title: 'Ethical Principle vs. Clinical Protocol', body: 'Qur’an 2:195 counsels against self-destruction in broad ethical/charitable spending context.', accent: PALETTE.ochre })}
            `
            : `
              ${[
                { t: '1. Source Protection', d: 'Shield wells &amp; springs from fecal runoff.', c: PALETTE.emerald },
                { t: '2. Filtration &amp; Settling', d: 'Removes suspended silt, cysts &amp; turbidity.', c: PALETTE.cyan },
                { t: '3. Disinfection / Boiling', d: 'Inactivates bacteria, viruses &amp; protozoa.', c: PALETTE.blue },
                { t: '4. Covered Safe Storage', d: 'Prevents household re-contamination.', c: PALETTE.gold },
              ]
                .map((st, idx) => titledCard({ x: 74 + (idx % 2) * 288, y: 202 + Math.floor(idx / 2) * 185, w: 274, h: 165, title: st.t, body: st.d, accent: st.c }))
                .join('')}
            `
        }
        ${cardBox({ x: 688, y: 142, w: 466, h: 456, fill: PALETTE.paperCard, stroke: PALETTE.gold, strokeWidth: 1.4, accentTop: PALETTE.gold })}
        <text x="921" y="162" font-family="Noto Sans, sans-serif" font-size="13.5" font-weight="700" fill="#FFFFFF" text-anchor="middle">WATER QUALITY &amp; PREVENTIVE MEDICINE</text>
        ${titledCard({ x: 710, y: 192, w: 422, h: 120, title: entry.scientific_topic, body: finding, accent: PALETTE.blue })}
        ${titledCard({ x: 710, y: 326, w: 422, h: 120, title: 'Why Testing Matters', body: 'Clear appearance never guarantees microbiological safety; natural waters require testing or treatment.', accent: PALETTE.cyan })}
        ${titledCard({ x: 710, y: 460, w: 422, h: 120, title: 'Editorial Boundary', body: lim, accent: PALETTE.gold })}
      `;
    }
    bodySvg += keyTakeawayStrip([
      { label: 'Hygiene &amp; Sanitation Principle', detail: finding, color: PALETTE.cyan },
      { label: 'Public Health Authority', detail: `Evidence Grade ${entry.evidence_grade} · CDC &amp; WHO Hygiene Standards.`, color: PALETTE.gold },
    ], 624);

  // 2. Nutrition, Diet, Grains, Fruit, Water, Milk & Honey (HLT-009..024, 049, 050)
  } else if (
    kind === 'dietary-diversity-moderation' ||
    kind === 'fruits-vegetables-nutrients' ||
    kind === 'cereal-grain-structure' ||
    kind === 'clean-vs-contaminated-water' ||
    kind === 'mammalian-lactation-overview' ||
    kind === 'honey-composition-floral' ||
    kind === 'honey-lab-vs-clinical' ||
    kind === 'honey-medical-vs-kitchen' ||
    kind === 'dates-nutritional-components'
  ) {
    let leftTitle = 'NUTRITIONAL PHYSIOLOGY &amp; EVIDENCE SCOPE';
    let leftSvg = '';

    if (kind === 'dietary-diversity-moderation') {
      if (id === 'HLT-009') {
        leftTitle = 'ENERGY INTAKE VS. METABOLIC HEALTH U-CURVE';
        leftSvg = `
          ${chartAxes({ x: 136, y: 205, w: 465, h: 295, xLabel: 'Chronic Energy Intake Relative to Needs', yLabel: 'Health &amp; Disease Risk', xTicks: ['Underweight', 'Balanced Intake', 'Mod. Surplus', 'Excess / Obese'], yTicks: ['Low Risk', 'Moderate', 'High Risk'], yLabelOffset: 72 })}
          <path d="M 140 250 Q 260 465 365 465 Q 475 460 598 225" fill="none" stroke="${PALETTE.emerald}" stroke-width="3.5" />
          ${calloutTag(365, 435, 'Balanced Energy Zone', PALETTE.emerald, '#FFFFFF', PALETTE.emerald)}
          ${calloutTag(535, 250, 'Metabolic / CVD Risk Rises', PALETTE.rust, '#FFFFFF', PALETTE.rust)}
        `;
      } else if (id === 'HLT-010') {
        leftTitle = 'HALAL PERMISSIBILITY VS. NUTRITIONAL QUALITY MATRIX';
        leftSvg = `
          ${titledCard({ x: 74, y: 196, w: 270, h: 175, badge: 'Halal + Nutrient-Dense', title: 'Whole Grains, Legumes &amp; Veg', body: 'Minimally processed foods rich in fiber, potassium, and unsaturated lipids.', accent: PALETTE.emerald })}
          ${titledCard({ x: 368, y: 196, w: 270, h: 175, badge: 'Halal + Excess Risk', title: 'Refined Sugar &amp; Deep-Fried', body: 'Legally halal items can still drive obesity and cardiometabolic risk if overconsumed.', accent: PALETTE.rust })}
          <rect x="74" y="392" width="564" height="175" rx="6" fill="#FAF6EC" stroke="${PALETTE.gold}" />
          ${renderSvgTextLines(wrapLines('Halal/tayyib in jurisprudence and WHO diet quality operate in distinct domains: lawful status does not automatically equal nutritional balance.', 72, 4), 94, 442, 20, { fontSize: 12.5, fill: PALETTE.ink })}
        `;
      } else if (id === 'HLT-011' || id === 'HLT-012') {
        leftTitle = id === 'HLT-011' ? 'BALANCED PLATE PORTIONS (WHO HEALTHY DIET)' : 'COMPLEMENTARY MICRONUTRIENT COVERAGE ACROSS FOOD GROUPS';
        leftSvg =
          id === 'HLT-011'
            ? `
              <circle cx="255" cy="370" r="138" fill="#EEF6EE" stroke="${PALETTE.emerald}" stroke-width="3" />
              <path d="M 255 370 L 255 232 A 138 138 0 0 0 255 508 Z" fill="#5A9647" fill-opacity="0.82" />
              <path d="M 255 370 L 255 232 A 138 138 0 0 1 393 370 Z" fill="#C8A253" fill-opacity="0.82" />
              <path d="M 255 370 L 393 370 A 138 138 0 0 1 255 508 Z" fill="#3B7AA6" fill-opacity="0.78" />
              <text x="180" y="374" font-family="Noto Sans, sans-serif" font-size="13" font-weight="700" fill="#FFFFFF" text-anchor="middle">50% Veg &amp; Fruit</text>
              <text x="325" y="325" font-family="Noto Sans, sans-serif" font-size="12" font-weight="700" fill="#FFFFFF" text-anchor="middle">25% Whole</text>
              <text x="325" y="342" font-family="Noto Sans, sans-serif" font-size="12" font-weight="700" fill="#FFFFFF" text-anchor="middle">Grains</text>
              <text x="325" y="425" font-family="Noto Sans, sans-serif" font-size="12" font-weight="700" fill="#FFFFFF" text-anchor="middle">25% Protein</text>
              ${calloutTag(515, 290, 'Free Sugars &lt;10% Energy', PALETTE.rust, '#FFFFFF', PALETTE.rust)}
              ${calloutTag(515, 370, 'Sodium &lt;2 g / Day (~5 g Salt)', PALETTE.blue, '#FFFFFF', PALETTE.blue)}
              ${calloutTag(515, 450, 'Limit Saturated &amp; Trans Fats', PALETTE.ochre, '#FFFFFF', PALETTE.ochre)}
            `
            : `
              ${[
                { g: 'Fruits &amp; Vegetables', v: 'Vitamin C, Folate, K⁺, Fiber', w: 92, c: PALETTE.emerald },
                { g: 'Whole Grains &amp; Seeds', v: 'B-Vitamins, Mg, Complex Starch', w: 86, c: PALETTE.ochre },
                { g: 'Legumes, Fish &amp; Dairy', v: 'Essential Amino Acids, Ca, B12, Fe', w: 88, c: PALETTE.blue },
                { g: 'Nuts &amp; Plant Oils', v: 'Unsaturated Fatty Acids &amp; Vit E', w: 78, c: PALETTE.olive },
              ]
                .map((row, i) => {
                  const y = 212 + i * 92;
                  return `
                    <text x="82" y="${y}" font-family="Noto Sans, sans-serif" font-size="13" font-weight="700" fill="${PALETTE.ink}">${row.g}</text>
                    <rect x="82" y="${y + 10}" width="536" height="28" rx="4" fill="#EAE6DA" />
                    <rect x="82" y="${y + 10}" width="${(536 * row.w) / 100}" height="28" rx="4" fill="${row.c}" />
                    <text x="96" y="${y + 29}" font-family="Noto Sans, sans-serif" font-size="11.5" font-weight="700" fill="#FFFFFF">${row.v}</text>
                  `;
                })
                .join('')}
            `;
      } else {
        // HLT-050 Integrated Foundations of Daily Health
        leftTitle = 'INTEGRATED FOUNDATIONS OF DAILY HUMAN HEALTH';
        leftSvg = `
          ${cycleNodeRing(356, 366, 142, [
            { label: 'Safe Water &amp; Hygiene', sub: 'WHO Sanitation &amp; Handwashing', color: PALETTE.cyan },
            { label: 'Diverse Diet', sub: 'Fruits, Grains &amp; Moderation', color: PALETTE.emerald },
            { label: 'Sleep &amp; Activity', sub: 'Circadian Rest &amp; Movement', color: PALETTE.blue },
            { label: 'Medical Care', sub: 'Preventive &amp; Clinical Access', color: PALETTE.gold },
          ])}
          <text x="356" y="362" font-family="Liberation Serif, serif" font-size="11.5" font-weight="700" fill="${PALETTE.emerald}" text-anchor="middle">PUBLIC</text>
          <text x="356" y="378" font-family="Liberation Serif, serif" font-size="11.5" font-weight="700" fill="${PALETTE.emerald}" text-anchor="middle">HEALTH</text>
        `;
      }
    } else if (kind === 'fruits-vegetables-nutrients' || kind === 'cereal-grain-structure' || kind === 'dates-nutritional-components') {
      const mode = kind === 'cereal-grain-structure' ? 'grain' : kind === 'dates-nutritional-components' ? 'dates' : id === 'HLT-013' ? 'fruit' : 'veg';
      leftTitle = mode === 'grain' ? 'WHOLE GRAIN ANATOMY: BRAN, ENDOSPERM &amp; GERM' : mode === 'dates' ? 'DATE FRUIT COMPOSITION (~100 g) &amp; CLAIM BOUNDARY' : mode === 'fruit' ? 'MICRONUTRIENT MATRIX OF EDIBLE FRUITS' : 'FIBER, POTASSIUM &amp; PHYTONUTRIENTS IN VEGETABLES';
      leftSvg =
        mode === 'grain'
          ? `
            <ellipse cx="265" cy="365" rx="115" ry="155" fill="#DFBA73" stroke="#7A5622" stroke-width="3" />
            <ellipse cx="265" cy="340" rx="94" ry="118" fill="#FFF8E2" stroke="#B89446" stroke-width="1.5" />
            <ellipse cx="242" cy="462" rx="44" ry="34" fill="#D2E8DC" stroke="${PALETTE.emerald}" stroke-width="2" />
            ${calloutTag(485, 255, 'Bran (~14%): Fiber &amp; B Vitamins', PALETTE.ochre, '#FFFFFF', PALETTE.ochre)}
            ${calloutTag(485, 355, 'Endosperm (~83%): Starch &amp; Protein', PALETTE.gold, '#FFFFFF', PALETTE.gold)}
            ${calloutTag(485, 455, 'Germ (~3%): Vitamin E &amp; Folate', PALETTE.emerald, '#FFFFFF', PALETTE.emerald)}
          `
          : mode === 'dates'
          ? `
            ${[
              { n: 'Natural Sugars (~63–66 g · Glucose + Fructose)', w: 72, c: PALETTE.ochre },
              { n: 'Water (~20–21 g · Moisture Matrix)', w: 28, c: PALETTE.cyan },
              { n: 'Dietary Fiber (~7–8 g · Gut Transit)', w: 18, c: PALETTE.olive },
              { n: 'Potassium (~650–700 mg) &amp; Magnesium (~43–54 mg)', w: 58, c: PALETTE.emerald },
            ]
              .map((b, i) => {
                const y = 208 + i * 86;
                return `<text x="82" y="${y}" font-family="Noto Sans, sans-serif" font-size="12.5" font-weight="700" fill="${PALETTE.ink}">${b.n}</text>
                  <rect x="82" y="${y + 10}" width="536" height="24" rx="4" fill="#EAE6DA" />
                  <rect x="82" y="${y + 10}" width="${(536 * b.w) / 100}" height="24" rx="4" fill="${b.c}" />`;
              })
              .join('')}
            <text x="356" y="572" font-family="Noto Sans, sans-serif" font-size="12" font-weight="600" fill="${PALETTE.rust}" text-anchor="middle">19:25–26 narrates Maryam’s specific nourishment; dates are NOT an obstetric labor drug.</text>
          `
          : mode === 'fruit'
          ? `
            ${[
              { grp: 'Berries &amp; Citrus (Anthocyanins, Vit C)', pct: 86, c: PALETTE.rust },
              { grp: 'Pome &amp; Stone Fruits (Pectin Fiber, K⁺)', pct: 74, c: PALETTE.ochre },
              { grp: 'Melons &amp; Hydrating Flesh (~88–92% H₂O)', pct: 90, c: PALETTE.cyan },
              { grp: 'WHO Target: Whole Fruit Over Juices', pct: 68, c: PALETTE.emerald },
            ]
              .map((f, i) => {
                const y = 212 + i * 86;
                return `<text x="82" y="${y}" font-family="Noto Sans, sans-serif" font-size="12.5" font-weight="700" fill="${PALETTE.ink}">${f.grp}</text>
                  <rect x="82" y="${y + 10}" width="536" height="24" rx="4" fill="#EAE6DA" />
                  <rect x="82" y="${y + 10}" width="${(536 * f.pct) / 100}" height="24" rx="4" fill="${f.c}" />`;
              })
              .join('')}
            <text x="356" y="566" font-family="Noto Sans, sans-serif" font-size="12" font-weight="600" fill="${PALETTE.inkMuted}" text-anchor="middle">Intact cell matrices moderate sugar absorption vs. strained fruit juices.</text>
          `
          : `
            ${titledCard({ x: 74, y: 196, w: 270, h: 170, badge: 'Chlorophyll &amp; Folate', title: 'Dark Leafy Greens', body: 'Dense in vitamin K, folate, iron cofactors &amp; magnesium per calorie (~20 kcal/100 g).', accent: PALETTE.emerald })}
            ${titledCard({ x: 368, y: 196, w: 270, h: 170, badge: 'Sulfur &amp; Carotenoids', title: 'Crucifers &amp; Roots', body: 'Broccoli, carrots &amp; squash supply provitamin A &amp; vascular glucosinolates.', accent: PALETTE.ochre })}
            ${titledCard({ x: 74, y: 386, w: 564, h: 170, badge: 'Microbiome &amp; Botanical Safety', title: 'High Insoluble Fiber + Edible Species Caution', body: 'Plant fibers nourish commensal gut bacteria, yet non-edible wild flora can carry toxins—verses celebrate edible produce generally.', accent: PALETTE.blue })}
          `;
    } else if (kind === 'clean-vs-contaminated-water') {
      const mode = id === 'HLT-016' ? 'homeostasis' : id === 'HLT-017' ? 'safe' : 'saline';
      leftTitle = mode === 'homeostasis' ? 'WATER PHYSIOLOGY IN THE HUMAN BODY (~55–65%)' : mode === 'safe' ? 'SAFE POTABLE WATER VS. PATHOGEN CONTAMINATION' : 'FRESHWATER (~0.5‰) VS. SEAWATER (~35‰ SALT) OSMOSIS';
      leftSvg =
        mode === 'homeostasis'
          ? `
            ${titledCard({ x: 74, y: 196, w: 270, h: 170, title: 'Thermoregulation', body: 'Sweat evaporation &amp; blood flow dissipate excess metabolic heat.', accent: PALETTE.cyan })}
            ${titledCard({ x: 368, y: 196, w: 270, h: 170, title: 'Blood Volume &amp; Transport', body: 'Plasma carries glucose, electrolytes, O₂ &amp; nutrients to organs.', accent: PALETTE.blue })}
            ${titledCard({ x: 74, y: 386, w: 270, h: 170, title: 'Renal Waste Filtration', body: 'Kidneys require hydration to excrete urea &amp; balance electrolytes.', accent: PALETTE.emerald })}
            ${titledCard({ x: 368, y: 386, w: 270, h: 170, title: 'Cellular Turgor &amp; Reactions', body: 'Hydrolysis &amp; enzymatic reactions occur exclusively in aqueous media.', accent: PALETTE.gold })}
          `
          : mode === 'safe'
          ? `
            ${titledCard({ x: 74, y: 204, w: 564, h: 162, badge: 'Potable Standard', title: 'Protected, Filtered &amp; Disinfected Water', body: 'Free from fecal coliforms, Vibrio, Cryptosporidium, heavy metals, and toxic nitrate levels.', accent: PALETTE.emerald })}
            ${titledCard({ x: 74, y: 388, w: 564, h: 162, badge: 'Untreated Hazard', title: 'Microbial &amp; Chemical Contamination Risk', body: 'Raw streams or stagnant water can transmit cholera, typhoid, rotavirus &amp; arsenic toxicity.', accent: PALETTE.rust })}
          `
          : `
            ${chartAxes({ x: 134, y: 205, w: 480, h: 290, xLabel: 'Ingested Water Salinity (‰ NaCl)', yLabel: 'Cellular Hydration Balance', xTicks: ['Freshwater (<0.5‰)', 'Isotonic (~9‰)', 'Brackish (18‰)', 'Seawater (35‰)'], yTicks: ['Dehydrates', 'Neutral', 'Hydrates'], yLabelOffset: 68 })}
            <line x1="138" y1="235" x2="608" y2="470" stroke="${PALETTE.rust}" stroke-width="3.5" />
            ${calloutTag(240, 250, 'Hydrates Cells Safely', PALETTE.cyan, '#FFFFFF', PALETTE.cyan)}
            ${calloutTag(482, 430, 'Kidneys Lose Net Water Excreting Salt', PALETTE.rust, '#FFFFFF', PALETTE.rust)}
          `;
    } else if (kind === 'mammalian-lactation-overview') {
      const isSynthesis = id === 'HLT-020';
      leftTitle = isSynthesis ? 'MAMMALIAN LACTATION: BLOOD NUTRIENT TRANSFER' : 'MILK NUTRIENT PROFILE &amp; TOLERANCE BOUNDARIES';
      leftSvg = isSynthesis
        ? `
          ${titledCard({ x: 82, y: 218, w: 158, h: 230, title: '1. GI Tract Digestion', body: 'Forage amino acids, glucose &amp; volatile fatty acids enter blood.', accent: PALETTE.olive })}
          ${flowArrow(244, 332, 276, 332, PALETTE.emerald, 3)}
          ${titledCard({ x: 280, y: 218, w: 158, h: 230, title: '2. Alveolar Gland', body: 'Capillaries supply precursors; lactocytes synthesize casein &amp; lactose.', accent: PALETTE.blue })}
          ${flowArrow(442, 332, 474, 332, PALETTE.emerald, 3)}
          ${titledCard({ x: 478, y: 218, w: 158, h: 230, title: '3. Secreted Milk', body: 'Water, fats, protein, Ca²⁺ &amp; immunoglobulins.', accent: PALETTE.gold })}
          ${renderSvgTextLines(wrapLines('16:66 reads "from between digesta and blood" — milk precursors enter via blood, not stomach chyme.', 68, 2), 84, 502, 19, { fontSize: 12, fontWeight: '600', fill: PALETTE.rust })}
        `
        : `
          ${[
            { l: 'Water (~87%): Hydration Matrix', w: 87, c: PALETTE.cyan },
            { l: 'Lactose Carbohydrate (~4.8%)', w: 48, c: PALETTE.ochre },
            { l: 'Casein &amp; Whey Protein (~3.3%)', w: 34, c: PALETTE.emerald },
            { l: 'Lipids, Calcium &amp; Vit B12 (~3.5%)', w: 36, c: PALETTE.gold },
          ]
            .map((b, i) => {
              const y = 212 + i * 86;
              return `<text x="82" y="${y}" font-family="Noto Sans, sans-serif" font-size="13" font-weight="700" fill="${PALETTE.ink}">${b.l}</text>
                <rect x="82" y="${y + 10}" width="536" height="24" rx="4" fill="#EAE6DA" />
                <rect x="82" y="${y + 10}" width="${(536 * b.w) / 100}" height="24" rx="4" fill="${b.c}" />`;
            })
            .join('')}
          <text x="356" y="566" font-family="Noto Sans, sans-serif" font-size="12" font-weight="600" fill="${PALETTE.rust}" text-anchor="middle">WHO: Human breastmilk is optimal for infants &lt;6 mo; lactose intolerance &amp; milk allergies vary globally.</text>
        `;
    } else {
      // HLT-021..024 Honey (floral, lab vs clinical, wound dressings, digestive/botulism)
      const mode = id === 'HLT-021' ? 'floral' : id === 'HLT-022' ? 'lab' : id === 'HLT-023' ? 'wound' : 'infant';
      leftTitle =
        mode === 'floral'
          ? 'FLORAL HONEY COMPOSITION &amp; COLOR SPECTRUM'
          : mode === 'lab'
          ? 'IN VITRO PETRI ZONE ≠ SYSTEMIC CLINICAL CURE'
          : mode === 'wound'
          ? 'GAMMA-IRRADIATED CLINICAL HONEY VS. RAW KITCHEN HONEY'
          : 'DIGESTIVE EVIDENCE &amp; INFANT BOTULISM HAZARD (&lt;12 MONTHS)';
      leftSvg =
        mode === 'floral'
          ? `
            ${[0, 1, 2].map((r) => [0, 1, 2, 3].map((c) => hexagonCell(155 + c * 52 + (r % 2) * 26, 250 + r * 44, 27, (r + c) % 2 === 0 ? '#E6B645' : '#A96B28', '#784A18')).join('')).join('')}
            ${titledCard({ x: 390, y: 204, w: 245, h: 170, title: '~80% Sugars + ~18% Water', body: 'Fructose &amp; glucose concentration + acidic pH (~3.9) reflect floral nectar source.', accent: PALETTE.gold })}
            ${titledCard({ x: 74, y: 400, w: 562, h: 165, badge: 'Mandatory Safety Rule', title: 'Never Feed Honey to Infants Under 1 Year Old', body: 'Clostridium botulinum spores can colonize immature infant guts, causing life-threatening botulism.', accent: PALETTE.rust })}
          `
          : mode === 'lab'
          ? `
            <circle cx="220" cy="355" r="105" fill="#F2F0E6" stroke="${PALETTE.slate}" stroke-width="2" />
            <circle cx="220" cy="355" r="38" fill="#E6B645" fill-opacity="0.65" stroke="${PALETTE.gold}" />
            <text x="220" y="360" font-family="Noto Sans, sans-serif" font-size="11.5" font-weight="700" fill="${PALETTE.ink}" text-anchor="middle">Agar Zone</text>
            ${flowArrow(340, 355, 410, 355, PALETTE.rust, 3)}
            ${titledCard({ x: 420, y: 215, w: 218, h: 280, badge: 'Evidence Boundary', title: 'High Sugar ≠ Drug Efficacy', body: 'Concentrated sugars kill bacteria locally in petri dishes via osmosis, which does NOT work after swallowing or digestion inside blood.', accent: PALETTE.rust })}
            <text x="356" y="556" font-family="Noto Sans, sans-serif" font-size="12" font-weight="600" fill="${PALETTE.inkMuted}" text-anchor="middle">16:69 states healing property in context without making honey a panacea replacing clinical medicine.</text>
          `
          : `
            ${titledCard({ x: 74, y: 202, w: 270, h: 200, badge: mode === 'wound' ? 'Hospital Sterile' : 'WHO / CDC Guideline', title: mode === 'wound' ? 'Gamma-Irradiated Medical Dressings' : 'Infant Under 12 Months: STRICTLY AVOID', body: mode === 'wound' ? 'Standardized, spore-free honey dressings used selectively for specific supervised wounds.' : 'Immature gut flora cannot block C. botulinum spore germination — never place honey on pacifiers.', accent: mode === 'wound' ? PALETTE.emerald : PALETTE.rust })}
            ${titledCard({ x: 368, y: 202, w: 270, h: 200, badge: mode === 'wound' ? 'Domestic Kitchen' : 'Adult Diet', title: mode === 'wound' ? 'Ordinary Jar Honey (Non-Sterile)' : 'Culinary Sweetener &amp; Cough Soothing', body: mode === 'wound' ? 'May contain wild spores &amp; pollen; unsuitable for open burns or deep surgical ulcers.' : 'High glycemic sugar content requires caution in diabetes; does not cure systemic GI ulcers.', accent: mode === 'wound' ? PALETTE.rust : PALETTE.gold })}
            <rect x="74" y="424" width="564" height="125" rx="6" fill="#FAF6EC" stroke="${PALETTE.gold}" />
            ${renderSvgTextLines(wrapLines(lim, 70, 4), 92, 456, 19, { fontSize: 12.5, fill: PALETTE.ink })}
          `;
    }

    bodySvg = `
      ${cardBox({ x: 46, y: 142, w: 620, h: 456, fill: PALETTE.paperCard, stroke: PALETTE.emerald, strokeWidth: 1.4, accentTop: PALETTE.emerald })}
      <text x="356" y="162" font-family="Noto Sans, sans-serif" font-size="13.5" font-weight="700" fill="#FFFFFF" text-anchor="middle">${leftTitle}</text>
      ${leftSvg}
      ${cardBox({ x: 688, y: 142, w: 466, h: 456, fill: PALETTE.paperCard, stroke: PALETTE.gold, strokeWidth: 1.4, accentTop: PALETTE.gold })}
      <text x="921" y="162" font-family="Noto Sans, sans-serif" font-size="13.5" font-weight="700" fill="#FFFFFF" text-anchor="middle">EVIDENCE SCOPE &amp; CLINICAL GUARDRAILS</text>
      ${titledCard({ x: 710, y: 192, w: 422, h: 120, title: entry.scientific_topic, body: finding, accent: PALETTE.emerald })}
      ${titledCard({ x: 710, y: 326, w: 422, h: 120, title: 'Balanced Health Context', body: enrichment?.whatItMeans ?? 'Nutrition operates through overall dietary patterns and physiological homeostasis.', accent: PALETTE.blue })}
      ${titledCard({ x: 710, y: 460, w: 422, h: 120, title: 'Limitation / Safety Note', body: lim, accent: PALETTE.rust })}
      ${keyTakeawayStrip([
        { label: 'Nutritional Science', detail: finding, color: PALETTE.emerald },
        { label: 'Reference Standard', detail: `Evidence Grade ${entry.evidence_grade} · WHO / CDC Public-Health Context.`, color: PALETTE.gold },
      ], 624)}
    `;

  // 3. Spiritual vs Medical Care, Ramadan Fasting Physiology, Diabetes, Pregnancy, Sleep & Food Safety (HLT-025..048)
  } else {
    let leftTitle = 'CLINICAL MEDICINE, FASTING PHYSIOLOGY &amp; FOOD SAFETY';
    let leftSvg = '';

    if (kind === 'spiritual-vs-medical-healing') {
      const isTheologyMeans = id === 'HLT-026';
      leftTitle = isTheologyMeans ? 'THEOLOGICAL RELIANCE + EVIDENCE-BASED CARE' : 'SPIRITUAL COMFORT VS. EMPIRICAL CLINICAL MEDICINE';
      leftSvg = isTheologyMeans
        ? `
          ${titledCard({ x: 74, y: 204, w: 168, h: 242, title: '1. Inner Trust (Tawakkul)', body: 'Prayer &amp; spiritual hope anchor morale during diagnosis.', accent: PALETTE.gold })}
          ${flowArrow(246, 325, 276, 325, PALETTE.emerald, 2.8)}
          ${titledCard({ x: 280, y: 204, w: 170, h: 242, title: '2. Prompt Clinical Care', body: 'Seeking physicians, lab testing &amp; safe medicines (26:80).', accent: PALETTE.cyan })}
          ${flowArrow(454, 325, 484, 325, PALETTE.emerald, 2.8)}
          ${titledCard({ x: 488, y: 204, w: 148, h: 242, title: '3. Evidence Adherence', body: 'Completing antibiotics, insulin &amp; surgical follow-up.', accent: PALETTE.emerald })}
          <text x="356" y="516" font-family="Noto Sans, sans-serif" font-size="12" font-weight="600" fill="${PALETTE.rust}" text-anchor="middle">Taking lawful medical means honours faith rather than replacing clinical treatment.</text>
        `
        : `
          ${titledCard({ x: 74, y: 204, w: 266, h: 215, badge: 'Spiritual Domain', title: 'Prayer, Meaning &amp; Hope', body: 'Supports existential comfort, emotional resilience, and social belonging during illness.', accent: PALETTE.gold })}
          ${flowArrow(344, 312, 372, 312, PALETTE.emerald, 3)}
          ${titledCard({ x: 376, y: 204, w: 266, h: 215, badge: 'Medical Domain', title: 'Diagnosis &amp; Treatment', body: 'Antibiotics, insulin, surgery, vaccines, and triage directly treat physiological pathology.', accent: PALETTE.cyan })}
          <rect x="74" y="440" width="568" height="132" rx="6" fill="#FAF0EC" stroke="${PALETTE.rust}" stroke-width="1.4" />
          <text x="94" y="468" font-family="Noto Sans, sans-serif" font-size="13" font-weight="700" fill="${PALETTE.rust}">CRITICAL CLINICAL BOUNDARY (17:82, 26:80)</text>
          ${renderSvgTextLines(wrapLines('Qur’anic references to spiritual guidance and healing never claim scripture replaces medical diagnosis, prescriptions, or emergency care.', 70, 4), 94, 496, 19, { fontSize: 12.5, fill: PALETTE.ink })}
        `;
    } else if (kind === 'ramadan-daily-fasting-timeline' || kind === 'suhoor-iftar-meal-timing' || kind === 'hydration-fluid-balance') {
      const mode = id === 'HLT-028' ? 'latitudes' : id === 'HLT-033' ? 'hydration' : id === 'HLT-034' ? 'circadian' : id === 'HLT-035' ? 'iftar_split' : 'timeline';
      leftTitle =
        mode === 'latitudes'
          ? 'SEASONAL &amp; LATITUDINAL FASTING DURATION VARIATION'
          : mode === 'hydration'
          ? 'DRY DAYLIGHT LOSSES VS. NOCTURNAL REHYDRATION'
          : mode === 'circadian'
          ? '24-HOUR NOCTURNAL MEAL-TIMING &amp; CIRCADIAN CLOCK'
          : mode === 'iftar_split'
          ? 'IFTAR-TO-SUHOOR NUTRITIONAL DISTRIBUTION SPLIT'
          : 'DAWN-TO-SUNSET DRY FASTING CYCLE (SUHOOR → IFTAR)';
      leftSvg =
        mode === 'latitudes'
          ? `
            ${chartAxes({ x: 118, y: 205, w: 505, h: 290, xLabel: 'Solar Season / Latitude Shift', yLabel: 'Daylight Fasting Hours', xTicks: ['Equatorial (~12h)', 'Mid-Lat Winter (~10h)', 'Mid-Lat Summer (~16h)', 'Sub-Arctic (~20h+)'], yTicks: ['8 h', '12 h', '16 h', '20 h'] })}
            <path d="M 135 370 Q 290 420 420 295 Q 530 235 605 220" fill="none" stroke="${PALETTE.blue}" stroke-width="3.5" />
            ${calloutTag(295, 420, 'Lunar Hijri Year Rotates Through Seasons', PALETTE.ochre, '#FFFFFF', PALETTE.ochre)}
            ${calloutTag(505, 218, 'Extreme Latitudes Vary Sharply', PALETTE.rust, '#FFFFFF', PALETTE.rust)}
          `
          : mode === 'hydration'
          ? `
            ${chartAxes({ x: 134, y: 205, w: 462, h: 290, xLabel: '24-Hour Cycle (Fajr Dawn → Maghrib Sunset → Night)', yLabel: 'Total Body Hydration Status', xTicks: ['Suhoor (+H₂O)', 'Midday Dry', 'Pre-Iftar Low', 'Night Recovery'], yTicks: ['Deficit', 'Baseline', 'Repleted'], yLabelOffset: 68 })}
            <path d="M 138 260 L 408 445 L 456 285 L 592 245" fill="none" stroke="${PALETTE.cyan}" stroke-width="3.5" />
            ${calloutTag(290, 405, 'Sweat + Respiratory Vapor Loss', PALETTE.ochre, '#FFFFFF', PALETTE.ochre)}
            ${calloutTag(525, 224, 'Paced Water Intake Overnight', PALETTE.cyan, '#FFFFFF', PALETTE.cyan)}
          `
          : mode === 'circadian'
          ? `
            ${cycleNodeRing(356, 366, 138, [
              { label: 'Pre-Dawn Suhoor', sub: 'Dawn Cutoff (2:187)', color: PALETTE.blue },
              { label: 'Daylight Abstinence', sub: 'Cortisol Peak &amp; Activity', color: PALETTE.ochre },
              { label: 'Sunset Iftar Window', sub: 'Melatonin Phase Interaction', color: PALETTE.emerald },
              { label: 'Consolidated Sleep', sub: 'Avoid Late Heavy Feasts', color: PALETTE.plum },
            ])}
            <text x="356" y="362" font-family="Liberation Serif, serif" font-size="11.5" font-weight="700" fill="${PALETTE.blue}" text-anchor="middle">CIRCADIAN</text>
            <text x="356" y="378" font-family="Liberation Serif, serif" font-size="11.5" font-weight="700" fill="${PALETTE.blue}" text-anchor="middle">CLOCK</text>
          `
          : mode === 'iftar_split'
          ? `
            ${titledCard({ x: 74, y: 196, w: 270, h: 170, badge: '1. At Sunset (Iftar)', title: 'Water + Moderate Dates/Soup', body: 'Gentle hydration &amp; modest carbohydrates avoid abrupt postprandial glucose spikes.', accent: PALETTE.cyan })}
            ${titledCard({ x: 368, y: 196, w: 270, h: 170, badge: '2. Evening Meal', title: 'Balanced Protein, Veg &amp; Grains', body: 'Whole foods supply iron, potassium &amp; fiber while limiting fried saturated fats.', accent: PALETTE.emerald })}
            ${titledCard({ x: 74, y: 386, w: 564, h: 170, badge: '3. Pre-Dawn Suhoor &amp; Scope Guardrail', title: 'Slow-Release Complex Carbs + Fluids (Not a Clinical Diet Plan)', body: '2:187 defines temporal fasting boundaries religiously rather than prescribing a universal nutrition menu.', accent: PALETTE.gold })}
          `
          : `
            <rect x="74" y="218" width="215" height="130" rx="8" fill="#E8F1F8" stroke="${PALETTE.blue}" />
            <text x="181" y="254" font-family="Noto Sans, sans-serif" font-size="13.5" font-weight="700" fill="${PALETTE.blue}" text-anchor="middle">Suhoor (Pre-Dawn)</text>
            <text x="181" y="280" font-family="Noto Sans, sans-serif" font-size="11.5" fill="${PALETTE.ink}" text-anchor="middle">Slow complex carbs +</text>
            <text x="181" y="300" font-family="Noto Sans, sans-serif" font-size="11.5" fill="${PALETTE.ink}" text-anchor="middle">protein + fluids</text>
            ${flowArrow(295, 282, 345, 282, PALETTE.ochre, 3)}
            <rect x="350" y="218" width="286" height="130" rx="8" fill="#FAF0E4" stroke="${PALETTE.ochre}" />
            <text x="493" y="254" font-family="Noto Sans, sans-serif" font-size="13.5" font-weight="700" fill="${PALETTE.ochre}" text-anchor="middle">Daylight Fast (No Food or Drink)</text>
            <text x="493" y="282" font-family="Noto Sans, sans-serif" font-size="11.5" fill="${PALETTE.ink}" text-anchor="middle">Note: Dry fasting differs from clinical IF</text>
            <text x="493" y="302" font-family="Noto Sans, sans-serif" font-size="11.5" fill="${PALETTE.ink}" text-anchor="middle">(which permits ad-libitum water intake)</text>
            ${titledCard({ x: 74, y: 374, w: 562, h: 175, badge: 'Iftar → Night Window', title: 'Avoid Overeating &amp; Sugary Excess at Sunset', body: 'Heavy late-night meals and sleep fragmentation can raise postprandial glucose if nutrition is poorly balanced.', accent: PALETTE.emerald })}
          `;
    } else if (kind === 'ramadan-vs-intermittent-fasting' || kind === 'fasting-metabolic-adaptation' || kind === 'blood-glucose-regulation-overview') {
      const isGlucose = kind === 'blood-glucose-regulation-overview';
      const isExercise = id === 'HLT-041';
      const isWeight = id === 'HLT-030';
      const isSelfReg = id === 'HLT-029';
      leftTitle = isGlucose
        ? 'INSULIN–GLUCAGON GLUCOSE HOMEOSTASIS LOOP'
        : isExercise
        ? 'PHYSICAL EXERTION, SWEAT LOSS &amp; TIMING WHILE FASTING'
        : isWeight
        ? 'VARIABLES GOVERNING BODY WEIGHT IN RAMADAN'
        : isSelfReg
        ? 'BEHAVIOURAL SELF-REGULATION ≠ CLINICAL BIOMARKER TRIAL'
        : 'POST-ABSORPTIVE METABOLIC SUBSTRATE SHIFT';
      leftSvg = isGlucose
        ? `
          ${titledCard({ x: 74, y: 200, w: 270, h: 175, badge: 'Fed State (Post-Iftar)', title: 'Beta Cells → Insulin', body: 'Promotes cellular glucose uptake &amp; liver glycogen storage.', accent: PALETTE.emerald })}
          ${titledCard({ x: 368, y: 200, w: 270, h: 175, badge: 'Fasted State (Daytime)', title: 'Alpha Cells → Glucagon', body: 'Mobilizes liver glycogenolysis &amp; adipose fatty acids.', accent: PALETTE.ochre })}
          <rect x="74" y="395" width="564" height="165" rx="6" fill="#FAF0EC" stroke="${PALETTE.rust}" />
          ${renderSvgTextLines(wrapLines('CLINICAL CAUTION: In diabetes or on insulin/sulfonylureas, counter-regulation is impaired, creating hypoglycemia or ketoacidosis danger (NCBI NBK581875).', 70, 4), 94, 444, 20, { fontSize: 12.5, fill: PALETTE.rust })}
        `
        : isSelfReg
        ? `
          ${titledCard({ x: 74, y: 198, w: 270, h: 185, badge: 'Behavioural Domain', title: 'Conscious Impulse Restraint', body: 'Voluntary pauses around food &amp; drink build habits of self-monitoring and mindful delay.', accent: PALETTE.gold })}
          ${titledCard({ x: 368, y: 198, w: 270, h: 185, badge: 'Physiological Domain', title: 'Variable Metabolic Outcomes', body: 'Sleep, stress, nocturnal diet, and genetics determine actual lipid or glucose shifts.', accent: PALETTE.blue })}
          <rect x="74" y="402" width="564" height="152" rx="6" fill="#F4F2EA" stroke="${PALETTE.gold}" />
          ${renderSvgTextLines(wrapLines('Taqwa in 2:183 refers to moral consciousness and devotion—keep spiritual growth distinct from standardized metabolic trial claims.', 70, 4), 94, 448, 19, { fontSize: 12.5, fill: PALETTE.ink })}
        `
        : isWeight
        ? `
          ${titledCard({ x: 74, y: 196, w: 564, h: 108, title: 'Total Nocturnal Caloric Intake vs. Expenditure', body: 'Weight change depends on energy balance, NOT fasting alone; festive high-sugar iftars often cause weight gain.', accent: PALETTE.ochre })}
          ${titledCard({ x: 74, y: 318, w: 564, h: 108, title: 'Daytime Water Shifts vs. True Adipose Loss', body: 'Early weight drops frequently reflect glycogen &amp; hydration shifts that rebound overnight.', accent: PALETTE.cyan })}
          ${titledCard({ x: 74, y: 440, w: 564, h: 108, title: 'Review Scope (PubMed 33575269)', body: 'Outcomes vary substantially across cohorts, ages, and study methodology.', accent: PALETTE.blue })}
        `
        : isExercise
        ? `
          ${titledCard({ x: 74, y: 196, w: 270, h: 175, badge: 'Midday Heat Risk', title: 'Fluid &amp; Electrolyte Loss', body: 'High-intensity daytime exertion increases dehydration &amp; heat-strain risk before sunset.', accent: PALETTE.rust })}
          ${titledCard({ x: 368, y: 196, w: 270, h: 175, badge: 'Safe Adaptation', title: 'Light Pre-Iftar / Evening', body: 'Shifting resistance or moderate aerobic exercise near/after iftar allows prompt hydration.', accent: PALETTE.emerald })}
          <rect x="74" y="395" width="564" height="165" rx="6" fill="#EDF5F9" stroke="${PALETTE.cyan}" />
          ${renderSvgTextLines(wrapLines('WHO physical-activity guidelines address general health rather than fasting physiology; tailor intensity to heat, age, and medical status.', 70, 4), 94, 445, 20, { fontSize: 12.5, fill: PALETTE.ink })}
        `
        : `
          ${chartAxes({ x: 134, y: 205, w: 482, h: 290, xLabel: 'Hours Since Last Meal (Suhoor)', yLabel: 'Energy Substrate Share', xTicks: ['0–4 h (Fed)', '6–10 h', '12–16 h (Late)'], yTicks: ['Low', 'Moderate', 'Dominant'], yLabelOffset: 68 })}
          <path d="M 138 230 Q 290 280 610 470" fill="none" stroke="${PALETTE.emerald}" stroke-width="3.5" />
          <path d="M 138 465 Q 325 420 610 265" fill="none" stroke="${PALETTE.ochre}" stroke-width="3.5" />
          ${calloutTag(225, 246, 'Exogenous Meal Glucose', PALETTE.emerald, '#FFFFFF', PALETTE.emerald)}
          ${calloutTag(498, 250, 'Lipolysis / Fatty Acid Use', PALETTE.ochre, '#FFFFFF', PALETTE.ochre)}
        `;
    } else if (kind === 'diabetes-fasting-considerations' || kind === 'pregnancy-fasting-uncertainty' || kind === 'fasting-sleep-routine-travel') {
      const mode =
        kind === 'pregnancy-fasting-uncertainty'
          ? 'pregnancy'
          : id === 'HLT-037'
          ? 'travel'
          : id === 'HLT-042'
          ? 'sleep_arch'
          : id === 'HLT-036'
          ? 'exemptions'
          : id === 'HLT-038'
          ? 'assessment'
          : 'diabetes';
      leftTitle =
        mode === 'pregnancy'
          ? 'PREGNANCY &amp; FASTING: MIXED EVIDENCE &amp; MEDICAL CARE'
          : mode === 'travel'
          ? 'TRAVEL CONCESSIONS (2:184–185) &amp; TRANSIT STRAIN'
          : mode === 'sleep_arch'
          ? 'SLEEP ARCHITECTURE &amp; NOCTURNAL FRAGMENTATION'
          : mode === 'exemptions'
          ? 'RELIGIOUS ILLNESS EXEMPTIONS &amp; SAFETY CATEGORIES'
          : mode === 'assessment'
          ? 'INDIVIDUALIZED CLINICAL ASSESSMENT VARIABLES'
          : 'DIABETES CLINICAL RISKS &amp; RISK STRATIFICATION';
      leftSvg =
        mode === 'pregnancy'
          ? `
            ${titledCard({ x: 74, y: 196, w: 564, h: 110, badge: 'Research Record (PubMed 36940770)', title: 'Mixed Observational Findings Across Cohorts', body: 'Literature shows inconsistent results across trimesters, nutrition, and heat exposure.', accent: PALETTE.ochre })}
            ${titledCard({ x: 74, y: 320, w: 564, h: 110, badge: 'No Universal Blanket Rule', title: 'Neither Universal Safety Nor Uniform Harm Proven', body: 'Gestational diabetes, hyperemesis, fetal growth, and dehydration risk differ per mother.', accent: PALETTE.rust })}
            ${titledCard({ x: 74, y: 444, w: 564, h: 110, badge: 'Religious Concession + Obstetrician', title: 'Exemptions Exist Where Harm Is Feared', body: 'Consult obstetric care individually before attempting prolonged daytime fasting.', accent: PALETTE.emerald })}
          `
          : mode === 'travel'
          ? `
            ${titledCard({ x: 74, y: 196, w: 564, h: 110, title: 'Suhoor + Late Transit Shifts Hydration &amp; Meals', body: 'Long journeys alter hydration access, thermal stress, and regular medication timing.', accent: PALETTE.blue })}
            ${titledCard({ x: 74, y: 320, w: 564, h: 110, title: 'Travel Exemptions (Qur’an 2:184–185)', body: 'Concession accommodates journey strain without asserting modern jet-lag physiology inside scripture.', accent: PALETTE.gold })}
            ${titledCard({ x: 74, y: 444, w: 564, h: 110, title: 'Safe Deferral &amp; Recovery', body: 'Postponing fasts during strenuous travel preserves cardiovascular and cognitive alertness.', accent: PALETTE.emerald })}
          `
          : mode === 'sleep_arch'
          ? `
            ${[
              { phase: 'Pre-Dawn Suhoor Interruption (Mid-Sleep Wake)', pct: 48, col: PALETTE.ochre },
              { phase: 'Slow-Wave Deep Sleep (N3 Restoration)', pct: 68, col: PALETTE.blue },
              { phase: 'REM Dreaming &amp; Memory Consolidation', pct: 62, col: PALETTE.plum },
              { phase: 'Daytime Power Nap + Consistent Dark Schedule', pct: 84, col: PALETTE.emerald },
            ]
              .map((s, i) => {
                const y = 212 + i * 86;
                return `<text x="82" y="${y}" font-family="Noto Sans, sans-serif" font-size="12.5" font-weight="700" fill="${PALETTE.ink}">${s.phase}</text>
                  <rect x="82" y="${y + 10}" width="536" height="24" rx="4" fill="#EAE6DA" />
                  <rect x="82" y="${y + 10}" width="${(536 * s.pct) / 100}" height="24" rx="4" fill="${s.col}" />`;
              })
              .join('')}
            <text x="356" y="566" font-family="Noto Sans, sans-serif" font-size="12" font-weight="600" fill="${PALETTE.inkMuted}" text-anchor="middle">Total sleep duration varies strongly across work schedules and evening cultural routines.</text>
          `
          : mode === 'exemptions'
          ? `
            ${titledCard({ x: 74, y: 196, w: 270, h: 200, badge: 'Clinical Risk Tiers', title: 'Acute Illness, Chronic Organ Failure &amp; Frailty', body: 'Renal impairment, unstable angina, active infection, or insulin-treated diabetes carry serious fasting hazards.', accent: PALETTE.rust })}
            ${titledCard({ x: 368, y: 196, w: 270, h: 200, badge: 'Qur’an 2:184–185', title: 'Explicit Hardship &amp; Illness Concessions', body: 'Scripture allows deferring fasts for recovery or substituting charity in chronic inability.', accent: PALETTE.gold })}
            ${titledCard({ x: 74, y: 412, w: 564, h: 142, badge: 'Zero Self-Diagnosing Calculator', title: 'Individualized Clinician Medical Safety Advice Required', body: 'Religious flexibility harmonizes with personalized physician assessment—never treat spiritual devotion as overriding clinical safety.', accent: PALETTE.emerald })}
          `
          : mode === 'assessment'
          ? `
            ${titledCard({ x: 74, y: 196, w: 270, h: 168, badge: 'Baseline Health', title: 'Age, Fragility &amp; Pregnancy', body: 'Physiological reserve differs sharply across life stages.', accent: PALETTE.blue })}
            ${titledCard({ x: 368, y: 196, w: 270, h: 168, badge: 'Pharmacotherapy', title: 'Dose Timing &amp; Hydration Needs', body: 'Antidiabetics, diuretics &amp; anticoagulants alter fasting risk.', accent: PALETTE.rust })}
            ${titledCard({ x: 74, y: 384, w: 564, h: 168, badge: 'Work &amp; Environment + Medical Review', title: 'Ambient Heat, Physical Labour &amp; Physician Planning', body: 'No blanket rule fits every chronic condition safely; pre-fasting review evaluates individual variables.', accent: PALETTE.emerald })}
          `
          : `
            ${titledCard({ x: 74, y: 196, w: 270, h: 168, title: 'Hypoglycemia Risk', body: 'Low blood sugar drop from insulin, sulfonylureas, or long fasts.', accent: PALETTE.rust })}
            ${titledCard({ x: 368, y: 196, w: 270, h: 168, title: 'Hyperglycemia / DKA', body: 'Post-iftar glucose spikes or insulin deficiency triggering ketoacidosis.', accent: PALETTE.ochre })}
            ${titledCard({ x: 74, y: 384, w: 270, h: 168, title: 'Dehydration &amp; Thrombosis', body: 'Fluid depletion raises renal strain and hyperosmolar risk.', accent: PALETTE.cyan })}
            ${titledCard({ x: 368, y: 384, w: 270, h: 168, title: 'ADA 2026 &amp; Clinical Care', body: 'Pre-Ramadan clinician assessment, glucose monitoring &amp; prompt fast-breaking rules.', accent: PALETTE.emerald })}
          `;
    } else if (kind === 'alcohol-general-health-effects') {
      leftTitle = 'WHO DOCUMENTED HEALTH HARMS OF ETHANOL EXPOSURE';
      leftSvg = `
        ${[
          { h: 'Liver Disease (Steatosis → Cirrhosis)', w: 88, c: PALETTE.rust },
          { h: 'Neurotoxicity, Dependence &amp; Injury Risk', w: 82, c: PALETTE.ochre },
          { h: 'Carcinogenic Sites (Esophageal, Liver, Breast)', w: 74, c: PALETTE.plum },
          { h: 'Cardiomyopathy &amp; Hypertension Burden', w: 68, c: PALETTE.blue },
        ]
          .map((row, i) => {
            const y = 212 + i * 88;
            return `<text x="82" y="${y}" font-family="Noto Sans, sans-serif" font-size="13" font-weight="700" fill="${PALETTE.ink}">${row.h}</text>
              <rect x="82" y="${y + 10}" width="536" height="26" rx="4" fill="#EAE6DA" />
              <rect x="82" y="${y + 10}" width="${(536 * row.w) / 100}" height="26" rx="4" fill="${row.c}" />`;
          })
          .join('')}
        <text x="356" y="566" font-family="Noto Sans, sans-serif" font-size="11.5" font-weight="600" fill="${PALETTE.inkMuted}" text-anchor="middle">WHO epidemiology &amp; religious prohibition bases (2:219, 5:90) remain complementary yet distinct.</text>
      `;
    } else {
      // HLT-044..048 Food safety & Farm-to-table
      const mode = id === 'HLT-046' ? 'pillars' : id === 'HLT-047' ? 'waste' : id === 'HLT-048' ? 'chain' : id === 'HLT-044' ? 'toxins' : 'pathogens';
      leftTitle =
        mode === 'pillars'
          ? 'CDC FOUR PILLARS OF SAFE FOOD HANDLING'
          : mode === 'waste'
          ? 'FOOD SYSTEM RESOURCE STEWARDSHIP &amp; WASTE REDUCTION'
          : mode === 'chain'
          ? 'AGRO-ECOLOGICAL CHAIN: SOIL TO SAFE NOURISHMENT'
          : mode === 'toxins'
          ? 'FOUR BIOLOGICAL &amp; CHEMICAL CONTAMINATION PATHWAYS'
          : 'FOODBORNE PATHOGENS VS. SACRED DIETARY BOUNDARIES';
      leftSvg =
        mode === 'pillars'
          ? `
            ${titledCard({ x: 74, y: 196, w: 270, h: 170, badge: 'Pillar 01', title: 'CLEAN', body: 'Wash hands, knives, cutting boards, and produce with clean water.', accent: PALETTE.cyan })}
            ${titledCard({ x: 368, y: 196, w: 270, h: 170, badge: 'Pillar 02', title: 'SEPARATE', body: 'Keep raw meats away from ready-to-eat foods to stop cross-contamination.', accent: PALETTE.ochre })}
            ${titledCard({ x: 74, y: 386, w: 270, h: 170, badge: 'Pillar 03', title: 'COOK', body: 'Reach safe internal thermal kill temperatures for poultry, meat &amp; eggs.', accent: PALETTE.rust })}
            ${titledCard({ x: 368, y: 386, w: 270, h: 170, badge: 'Pillar 04', title: 'CHILL', body: 'Refrigerate perishables below 4 °C within 2 hours to arrest bacterial doubling.', accent: PALETTE.blue })}
          `
          : mode === 'chain'
          ? `
            ${titledCard({ x: 74, y: 204, w: 170, h: 250, title: '1. Soil, Rain &amp; Crop Harvest', body: 'Clean irrigation &amp; mineral soil support healthy yields.', accent: PALETTE.olive })}
            ${flowArrow(248, 328, 276, 328, PALETTE.emerald, 3)}
            ${titledCard({ x: 280, y: 204, w: 170, h: 250, title: '2. Cold-Chain &amp; Storage', body: 'Prevents mold mycotoxins &amp; spoilage.', accent: PALETTE.cyan })}
            ${flowArrow(454, 328, 482, 328, PALETTE.emerald, 3)}
            ${titledCard({ x: 486, y: 204, w: 152, h: 250, title: '3. Safe Table Diet', body: 'Balanced variety nourishes human cells.', accent: PALETTE.gold })}
          `
          : mode === 'toxins'
          ? `
            ${titledCard({ x: 74, y: 196, w: 270, h: 170, badge: 'Microbial', title: 'Enteric Bacteria &amp; Parasites', body: 'Contaminated surfaces or untreated water introduce acute pathogens.', accent: PALETTE.rust })}
            ${titledCard({ x: 368, y: 196, w: 270, h: 170, badge: 'Chemical &amp; Heavy Metals', title: 'Pesticides, Lead &amp; Arsenic', body: 'Industrial runoff &amp; unsafe storage leach cumulative systemic toxins.', accent: PALETTE.ochre })}
            ${titledCard({ x: 74, y: 386, w: 270, h: 170, badge: 'Fungal Spoilage', title: 'Aflatoxin &amp; Grain Molds', body: 'Damp warm storage fosters hepatotoxic mycotoxins.', accent: PALETTE.plum })}
            ${titledCard({ x: 368, y: 386, w: 270, h: 170, badge: 'Preventive Testing', title: 'WHO Toxicology &amp; Lab Checks', body: 'Toxicology screening identifies invisible hazards beyond broad moral counsel.', accent: PALETTE.cyan })}
          `
          : `
            ${titledCard({ x: 74, y: 196, w: 564, h: 110, badge: mode === 'waste' ? 'Production Losses' : 'Pathogens &amp; Spoilage', title: mode === 'waste' ? 'Field, Storage &amp; Household Food Loss' : 'Salmonella, E. coli, Listeria &amp; Prions', body: mode === 'waste' ? 'Curbing spoilage preserves freshwater, soil nutrients, and affordable community supply.' : 'Undercooked carrion/spoiled meat &amp; unsafe blood carry acute microbial or toxin hazards.', accent: PALETTE.rust })}
            ${titledCard({ x: 74, y: 320, w: 564, h: 110, badge: mode === 'waste' ? 'Moderation Ethics' : 'Inspection &amp; Cold Chain', title: mode === 'waste' ? 'Preventing Extravagance (Israf)' : 'Veterinary Screening &amp; Thermal Hygiene', body: mode === 'waste' ? 'Ethical restraint in portions aligns nutrition balance with stewardship.' : 'Safe slaughter, prompt chilling, and hygienic cooking lower foodborne outbreaks.', accent: PALETTE.emerald })}
            ${titledCard({ x: 74, y: 444, w: 564, h: 110, badge: 'Hermeneutic Boundary', title: 'Public Health &amp; Sacred Law Remain Distinct', body: lim, accent: PALETTE.gold })}
          `;
    }

    bodySvg = `
      ${cardBox({ x: 46, y: 142, w: 620, h: 456, fill: PALETTE.paperCard, stroke: PALETTE.blue, strokeWidth: 1.4, accentTop: PALETTE.blue })}
      <text x="356" y="162" font-family="Noto Sans, sans-serif" font-size="13.5" font-weight="700" fill="#FFFFFF" text-anchor="middle">${leftTitle}</text>
      ${leftSvg}
      ${cardBox({ x: 688, y: 142, w: 466, h: 456, fill: PALETTE.paperCard, stroke: PALETTE.gold, strokeWidth: 1.4, accentTop: PALETTE.gold })}
      <text x="921" y="162" font-family="Noto Sans, sans-serif" font-size="13.5" font-weight="700" fill="#FFFFFF" text-anchor="middle">CLINICAL CONTEXT &amp; RESEARCH GUARDRAILS</text>
      ${titledCard({ x: 710, y: 192, w: 422, h: 120, title: entry.scientific_topic, body: finding, accent: PALETTE.blue })}
      ${titledCard({ x: 710, y: 326, w: 422, h: 120, title: 'Practical Interpretation', body: enrichment?.whatItMeans ?? 'Consult licensed clinicians before applying fasting or nutrition routines to medical conditions.', accent: PALETTE.emerald })}
      ${titledCard({ x: 710, y: 460, w: 422, h: 120, title: 'Safety &amp; Evidence Boundaries', body: lim, accent: PALETTE.rust })}
      ${keyTakeawayStrip([
        { label: 'Public-Health Integration', detail: finding, color: PALETTE.blue },
        { label: 'Medical Disclaimer', detail: `Evidence Grade ${entry.evidence_grade} · Educational context only — not personal medical advice.`, color: PALETTE.rust },
      ], 624)}
    `;
  }

  return buildPlateShell({
    title,
    subtitle: wrapLines(subtitle, 108, 1)[0],
    figureCode: id,
    discipline: 'Chapter 08 · Health, Hygiene &amp; Nutrition',
    bodySvg,
    footerNote: `Scientific Reference Plate ${id} · Science of Creation Encyclopedia · Public-Health Reference Context`,
    accentColor: PALETTE.cyan,
  });
}
