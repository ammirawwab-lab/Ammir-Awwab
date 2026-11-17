import React from 'react';
import { HealthHygieneDiagramKind } from '../../types/encyclopedia';

interface HealthHygieneDiagramProps {
  kind: HealthHygieneDiagramKind;
  title: string;
  caption: string;
}

export const HealthHygieneDiagram: React.FC<HealthHygieneDiagramProps> = ({
  kind,
  title,
  caption,
}) => {
  const renderSvg = () => {
    switch (kind) {
      case 'wudu-purification-areas':
        return (
          <svg viewBox="0 0 460 175" className="w-full h-auto" role="img" aria-label={title}>
            <rect x="16" y="18" width="210" height="138" rx="3" fill="var(--page-bg-secondary)" stroke="var(--hairline)" />
            <text x="121" y="36" textAnchor="middle" fill="#5EA89C" fontSize="8.8" fontWeight="700">
              Ritual Ablution Regions (5:6 Context)
            </text>
            {[
              { y: 48, t: 'Face & Forearms to Elbows', s: 'Exposed skin surfaces' },
              { y: 78, t: 'Head (Wiping) & Feet to Ankles', s: 'Prescribed ritual sequence' },
              { y: 108, t: 'Tayammum (4:43, 5:6)', s: 'Devotional concession without water' },
            ].map((row) => (
              <g key={row.t}>
                <rect x="28" y={row.y} width="186" height="24" rx="2" fill="var(--page-bg)" stroke="#5EA89C" strokeOpacity="0.6" />
                <text x="36" y={row.y + 11} fill="var(--page-ink)" fontSize="7.2" fontWeight="600">
                  {row.t}
                </text>
                <text x="36" y={row.y + 20} fill="var(--page-muted)" fontSize="6.3">
                  {row.s}
                </text>
              </g>
            ))}

            <rect x="240" y="18" width="204" height="138" rx="3" fill="var(--page-bg-secondary)" stroke="#C8B06B" strokeDasharray="3 2" />
            <text x="342" y="36" textAnchor="middle" fill="#C8B06B" fontSize="8.8" fontWeight="700">
              Mandatory Clinical Hygiene Boundary
            </text>
            <text x="342" y="60" textAnchor="middle" fill="var(--page-ink)" fontSize="7.4" fontWeight="600">
              Distinct Purposes &amp; Procedures
            </text>
            <text x="342" y="76" textAnchor="middle" fill="var(--page-muted)" fontSize="6.6">
              • Wudu alone does NOT prevent all infections.
            </text>
            <text x="342" y="90" textAnchor="middle" fill="var(--page-muted)" fontSize="6.6">
              • Tayammum is NOT equivalent to soap-and-water
            </text>
            <text x="342" y="102" textAnchor="middle" fill="var(--page-muted)" fontSize="6.6">
              handwashing or clinical disinfection.
            </text>
            <line x1="256" y1="114" x2="428" y2="114" stroke="var(--hairline)" />
            <text x="342" y="130" textAnchor="middle" fill="#8DB596" fontSize="6.8" fontWeight="600">
              Soap + clean running water remain essential
            </text>
            <text x="342" y="142" textAnchor="middle" fill="var(--page-muted)" fontSize="6.4">
              for clinical pathogen reduction (CDC).
            </text>
          </svg>
        );

      case 'skin-barrier-hygiene':
        return (
          <svg viewBox="0 0 460 175" className="w-full h-auto" role="img" aria-label={title}>
            <rect x="16" y="18" width="222" height="138" rx="3" fill="var(--page-bg-secondary)" stroke="var(--hairline)" />
            <text x="127" y="36" textAnchor="middle" fill="#8DB596" fontSize="8.8" fontWeight="700">
              Skin Surface &amp; Everyday Hygiene Factors
            </text>
            <rect x="28" y="48" width="198" height="26" rx="2" fill="#5EA89C" fillOpacity="0.16" stroke="#5EA89C" />
            <text x="127" y="64" textAnchor="middle" fill="var(--page-ink)" fontSize="7.2" fontWeight="600">
              Epidermal Barrier · Sweat · Sebum · Resident Flora
            </text>
            <rect x="28" y="82" width="198" height="26" rx="2" fill="var(--page-bg)" stroke="#8DB596" />
            <text x="127" y="98" textAnchor="middle" fill="var(--page-ink)" fontSize="7.1">
              Clean Garments &amp; Shared Spaces Reduce Contaminants
            </text>
            <rect x="28" y="116" width="198" height="26" rx="2" fill="var(--page-bg)" stroke="var(--hairline)" />
            <text x="127" y="132" textAnchor="middle" fill="var(--page-muted)" fontSize="6.7">
              Menstruation: normal physiological cycle; hygiene aids comfort
            </text>

            <rect x="252" y="18" width="192" height="138" rx="3" fill="var(--page-bg-secondary)" stroke="#C8B06B" strokeDasharray="3 2" />
            <text x="348" y="38" textAnchor="middle" fill="#C8B06B" fontSize="8.6" fontWeight="700">
              Scriptural Context Note
            </text>
            <text x="348" y="66" textAnchor="middle" fill="var(--page-ink)" fontSize="7.2" fontWeight="600">
              Not Technical Disinfection Codes
            </text>
            <text x="348" y="84" textAnchor="middle" fill="var(--page-muted)" fontSize="6.6">
              Verses (74:4, 9:108, 2:222) carry spiritual,
            </text>
            <text x="348" y="96" textAnchor="middle" fill="var(--page-muted)" fontSize="6.6">
              ethical, and ritual meanings alongside
            </text>
            <text x="348" y="108" textAnchor="middle" fill="var(--page-muted)" fontSize="6.6">
              everyday personal cleanliness.
            </text>
            <text x="348" y="132" textAnchor="middle" fill="#5EA89C" fontSize="6.6">
              Menstruation is NOT treated as an illness.
            </text>
          </svg>
        );

      case 'water-purification-contamination':
        return (
          <svg viewBox="0 0 460 175" className="w-full h-auto" role="img" aria-label={title}>
            <rect x="16" y="18" width="428" height="138" rx="3" fill="var(--page-bg-secondary)" stroke="var(--hairline)" />
            <text x="230" y="36" textAnchor="middle" fill="#5EA89C" fontSize="9" fontWeight="700">
              Water Quality Assessment &amp; Hazard Prevention Concepts (WHO)
            </text>
            {[
              { x: 28, t: 'Source Contamination', s: 'Microbes, runoff & chemical risks', c: '#C8B06B' },
              { x: 170, t: 'Treatment & Testing', s: 'Filtration, disinfection & storage', c: '#5EA89C' },
              { x: 312, t: 'Safe Hygiene Use', s: 'Rinsing, cooking & hydration', c: '#8DB596' },
            ].map((b, idx) => (
              <g key={b.t}>
                <rect x={b.x} y="52" width="120" height="62" rx="2" fill="var(--page-bg)" stroke={b.c} />
                <text x={b.x + 60} y="75" textAnchor="middle" fill={b.c} fontSize="7.4" fontWeight="700">
                  {b.t}
                </text>
                <text x={b.x + 60} y="93" textAnchor="middle" fill="var(--page-muted)" fontSize="6.6">
                  {b.s}
                </text>
                {idx < 2 && (
                  <path d={`M${b.x + 122},83 L${b.x + 140},83`} stroke="#C8B06B" strokeWidth="1.5" />
                )}
              </g>
            ))}
            <text x="230" y="138" textAnchor="middle" fill="var(--page-muted)" fontSize="6.8">
              Water safety must be evaluated scientifically; CDC handwashing &amp; WHO sources do not establish every ritual rule.
            </text>
          </svg>
        );

      case 'clean-vs-contaminated-water':
        return (
          <svg viewBox="0 0 460 175" className="w-full h-auto" role="img" aria-label={title}>
            <rect x="16" y="18" width="206" height="138" rx="3" fill="var(--page-bg-secondary)" stroke="#5EA89C" />
            <text x="119" y="36" textAnchor="middle" fill="#5EA89C" fontSize="8.8" fontWeight="700">
              Safe Potable Freshwater
            </text>
            <path d="M36,74 Q76,62 119,74 T202,74" fill="none" stroke="#5EA89C" strokeWidth="1.8" />
            <text x="119" y="96" textAnchor="middle" fill="var(--page-ink)" fontSize="7.2" fontWeight="600">
              Low Dissolved Salts &amp; Pathogen Control
            </text>
            <text x="119" y="112" textAnchor="middle" fill="var(--page-muted)" fontSize="6.6">
              Supports circulation, thermoregulation,
            </text>
            <text x="119" y="124" textAnchor="middle" fill="var(--page-muted)" fontSize="6.6">
              digestion, renal clearance &amp; safe washing.
            </text>

            <rect x="238" y="18" width="206" height="138" rx="3" fill="var(--page-bg-secondary)" stroke="#C8B06B" />
            <text x="341" y="36" textAnchor="middle" fill="#C8B06B" fontSize="8.8" fontWeight="700">
              Contaminated or Saline Water
            </text>
            <path d="M258,74 Q298,62 341,74 T424,74" fill="none" stroke="#C8B06B" strokeWidth="1.8" strokeDasharray="3 2" />
            <text x="341" y="96" textAnchor="middle" fill="var(--page-ink)" fontSize="7.2" fontWeight="600">
              Microbial Risk or High Salinity
            </text>
            <text x="341" y="112" textAnchor="middle" fill="var(--page-muted)" fontSize="6.6">
              Untreated water can transmit disease;
            </text>
            <text x="341" y="124" textAnchor="middle" fill="var(--page-muted)" fontSize="6.6">
              seawater requires desalination to drink.
            </text>
          </svg>
        );

      case 'food-safety-contamination':
        return (
          <svg viewBox="0 0 460 175" className="w-full h-auto" role="img" aria-label={title}>
            <rect x="16" y="18" width="234" height="138" rx="3" fill="var(--page-bg-secondary)" stroke="var(--hairline)" />
            <text x="133" y="36" textAnchor="middle" fill="#5EA89C" fontSize="8.8" fontWeight="700">
              Biological &amp; Chemical Contamination Risks
            </text>
            {[
              { y: 48, t: 'Spoilage & Pathogens', s: 'Bacteria, parasites & microbial toxins' },
              { y: 78, t: 'Untreated Animal Blood / Carrion', s: 'Bloodborne & decomposition hazards' },
              { y: 108, t: 'Toxic Exposures', s: 'Chemical contaminants harm organs' },
            ].map((r) => (
              <g key={r.t}>
                <rect x="28" y={r.y} width="210" height="24" rx="2" fill="var(--page-bg)" stroke="var(--hairline)" />
                <text x="36" y={r.y + 11} fill="var(--page-ink)" fontSize="7.1" fontWeight="600">
                  {r.t}
                </text>
                <text x="36" y={r.y + 20} fill="var(--page-muted)" fontSize="6.3">
                  {r.s}
                </text>
              </g>
            ))}

            <rect x="264" y="18" width="180" height="138" rx="3" fill="var(--page-bg-secondary)" stroke="#C8B06B" strokeDasharray="3 2" />
            <text x="354" y="38" textAnchor="middle" fill="#C8B06B" fontSize="8.5" fontWeight="700">
              Legal vs. Scientific Distinction
            </text>
            <text x="354" y="68" textAnchor="middle" fill="var(--page-ink)" fontSize="7.1" fontWeight="600">
              Do Not Over-Reduce Prohibitions
            </text>
            <text x="354" y="86" textAnchor="middle" fill="var(--page-muted)" fontSize="6.5">
              Religious dietary law (2:173, 5:3, 6:145)
            </text>
            <text x="354" y="98" textAnchor="middle" fill="var(--page-muted)" fontSize="6.5">
              has legal and theological grounds beyond
            </text>
            <text x="354" y="110" textAnchor="middle" fill="var(--page-muted)" fontSize="6.5">
              any single hygiene explanation.
            </text>
          </svg>
        );

      case 'food-production-to-consumption':
        return (
          <svg viewBox="0 0 460 175" className="w-full h-auto" role="img" aria-label={title}>
            <rect x="16" y="18" width="428" height="138" rx="3" fill="var(--page-bg-secondary)" stroke="var(--hairline)" />
            <text x="230" y="36" textAnchor="middle" fill="#5EA89C" fontSize="9" fontWeight="700">
              Food System Chain: Production to Safe Consumption (WHO / CDC)
            </text>
            {[
              { x: 26, t: '1. Agriculture', s: 'Soil, rain & crops', c: '#8DB596' },
              { x: 132, t: '2. Clean & Separate', s: 'Prevent cross-transfer', c: '#5EA89C' },
              { x: 238, t: '3. Cook & Chill', s: 'Safe temperature control', c: '#C8B06B' },
              { x: 344, t: '4. Avoid Waste', s: 'Preserve nutrients & water', c: '#8DB596' },
            ].map((b, idx) => (
              <g key={b.t}>
                <rect x={b.x} y="54" width="90" height="62" rx="2" fill="var(--page-bg)" stroke={b.c} />
                <text x={b.x + 45} y="76" textAnchor="middle" fill={b.c} fontSize="7.4" fontWeight="700">
                  {b.t}
                </text>
                <text x={b.x + 45} y="94" textAnchor="middle" fill="var(--page-muted)" fontSize="6.5">
                  {b.s}
                </text>
                {idx < 3 && (
                  <path d={`M${b.x + 92},85 L${b.x + 104},85`} stroke="#C8B06B" strokeWidth="1.4" />
                )}
              </g>
            ))}
            <text x="230" y="138" textAnchor="middle" fill="var(--page-muted)" fontSize="6.7">
              Moral stewardship (6:141, 7:31) and tayyib language differ from quantitative food-storage codes.
            </text>
          </svg>
        );

      case 'dietary-diversity-moderation':
        return (
          <svg viewBox="0 0 460 175" className="w-full h-auto" role="img" aria-label={title}>
            <rect x="16" y="18" width="234" height="138" rx="3" fill="var(--page-bg-secondary)" stroke="var(--hairline)" />
            <text x="133" y="36" textAnchor="middle" fill="#8DB596" fontSize="8.8" fontWeight="700">
              WHO Healthy Diet &amp; Energy Balance
            </text>
            <rect x="28" y="48" width="100" height="44" rx="2" fill="var(--page-bg)" stroke="#5EA89C" />
            <text x="78" y="67" textAnchor="middle" fill="var(--page-ink)" fontSize="7.1" fontWeight="600">
              Dietary Variety
            </text>
            <text x="78" y="81" textAnchor="middle" fill="var(--page-muted)" fontSize="6.3">
              Fruits, veg, grains, legumes
            </text>
            <rect x="138" y="48" width="100" height="44" rx="2" fill="var(--page-bg)" stroke="#8DB596" />
            <text x="188" y="67" textAnchor="middle" fill="var(--page-ink)" fontSize="7.1" fontWeight="600">
              Moderation
            </text>
            <text x="188" y="81" textAnchor="middle" fill="var(--page-muted)" fontSize="6.3">
              Limit excess energy/sugars
            </text>
            <rect x="28" y="102" width="210" height="40" rx="2" fill="var(--page-bg)" stroke="var(--hairline)" />
            <text x="133" y="119" textAnchor="middle" fill="var(--page-ink)" fontSize="7">
              Intake balanced against energy expenditure
            </text>
            <text x="133" y="132" textAnchor="middle" fill="var(--page-muted)" fontSize="6.3">
              Sustained chronic excess elevates metabolic disease risk
            </text>

            <rect x="264" y="18" width="180" height="138" rx="3" fill="var(--page-bg-secondary)" stroke="#C8B06B" strokeDasharray="3 2" />
            <text x="354" y="38" textAnchor="middle" fill="#C8B06B" fontSize="8.5" fontWeight="700">
              Halal vs. Nutrition Caution
            </text>
            <text x="354" y="68" textAnchor="middle" fill="var(--page-ink)" fontSize="7.1" fontWeight="600">
              Lawful != Nutritionally Balanced
            </text>
            <text x="354" y="86" textAnchor="middle" fill="var(--page-muted)" fontSize="6.5">
              Halal legal status does not guarantee
            </text>
            <text x="354" y="98" textAnchor="middle" fill="var(--page-muted)" fontSize="6.5">
              a food or meal meets nutritional needs.
            </text>
            <text x="354" y="122" textAnchor="middle" fill="#5EA89C" fontSize="6.5">
              Verses express themes, not calorie counts.
            </text>
          </svg>
        );

      case 'fruits-vegetables-nutrients':
        return (
          <svg viewBox="0 0 460 175" className="w-full h-auto" role="img" aria-label={title}>
            <rect x="16" y="18" width="428" height="138" rx="3" fill="var(--page-bg-secondary)" stroke="var(--hairline)" />
            <text x="230" y="36" textAnchor="middle" fill="#8DB596" fontSize="9" fontWeight="700">
              Nutritional Constituents of Fruits &amp; Edible Vegetables
            </text>
            {[
              { x: 28, t: 'Dietary Fiber', s: 'Supports gut transit & satiety', c: '#8DB596' },
              { x: 132, t: 'Vitamins & Minerals', s: 'Potassium, folate, vitamins A/C/K', c: '#5EA89C' },
              { x: 236, t: 'Water & Carbs', s: 'Hydration + variable natural sugars', c: '#C8B06B' },
              { x: 340, t: 'Phytochemicals', s: 'Plant pigments & polyphenols', c: '#8DB596' },
            ].map((b) => (
              <g key={b.t}>
                <rect x={b.x} y="52" width="92" height="64" rx="2" fill="var(--page-bg)" stroke={b.c} />
                <text x={b.x + 46} y="75" textAnchor="middle" fill={b.c} fontSize="7.3" fontWeight="700">
                  {b.t}
                </text>
                <text x={b.x + 46} y="94" textAnchor="middle" fill="var(--page-muted)" fontSize="6.3">
                  {b.s}
                </text>
              </g>
            ))}
            <text x="230" y="140" textAnchor="middle" fill="var(--page-muted)" fontSize="6.7">
              Nutrient density and safety vary sharply by species; cited verses reflect on provision rather than ranking crops.
            </text>
          </svg>
        );

      case 'cereal-grain-structure':
        return (
          <svg viewBox="0 0 460 175" className="w-full h-auto" role="img" aria-label={title}>
            <rect x="16" y="18" width="186" height="138" rx="3" fill="var(--page-bg-secondary)" stroke="var(--hairline)" />
            <text x="109" y="36" textAnchor="middle" fill="#C8B06B" fontSize="8.8" fontWeight="700">
              Cereal Grain Anatomy
            </text>
            <ellipse cx="109" cy="88" rx="46" ry="38" fill="#C8B06B" fillOpacity="0.16" stroke="#C8B06B" strokeWidth="1.6" />
            <ellipse cx="109" cy="85" rx="33" ry="27" fill="var(--page-bg)" stroke="#8DB596" />
            <circle cx="109" cy="102" r="10" fill="#5EA89C" fillOpacity="0.3" stroke="#5EA89C" />
            <text x="109" y="76" textAnchor="middle" fill="var(--page-ink)" fontSize="7" fontWeight="600">
              Endosperm
            </text>
            <text x="109" y="105" textAnchor="middle" fill="#5EA89C" fontSize="6.5" fontWeight="700">
              Germ
            </text>
            <text x="109" y="140" textAnchor="middle" fill="var(--page-muted)" fontSize="6.5">
              Outer Bran · Inner Endosperm · Germ
            </text>

            <rect x="218" y="18" width="226" height="138" rx="3" fill="var(--page-bg-secondary)" stroke="var(--hairline)" />
            <text x="331" y="36" textAnchor="middle" fill="#5EA89C" fontSize="8.8" fontWeight="700">
              Nutrient Fractions &amp; Processing Note
            </text>
            <text x="232" y="60" fill="#C8B06B" fontSize="7.4" fontWeight="700">
              Bran:
            </text>
            <text x="272" y="60" fill="var(--page-ink)" fontSize="7.1">
              Insoluble fiber, B-vitamins &amp; minerals
            </text>
            <text x="232" y="84" fill="#8DB596" fontSize="7.4" fontWeight="700">
              Endosperm:
            </text>
            <text x="292" y="84" fill="var(--page-ink)" fontSize="7.1">
              Starch carbohydrates &amp; storage proteins
            </text>
            <text x="232" y="108" fill="#5EA89C" fontSize="7.4" fontWeight="700">
              Germ:
            </text>
            <text x="272" y="108" fill="var(--page-ink)" fontSize="7.1">
              Unsaturated lipids, vitamin E &amp; micronutrients
            </text>
            <text x="331" y="136" textAnchor="middle" fill="var(--page-muted)" fontSize="6.4">
              Verses 36:33 &amp; 80:27 do not distinguish whole vs. refined milling.
            </text>
          </svg>
        );

      case 'mammalian-lactation-overview':
        return (
          <svg viewBox="0 0 460 175" className="w-full h-auto" role="img" aria-label={title}>
            <rect x="16" y="18" width="244" height="138" rx="3" fill="var(--page-bg-secondary)" stroke="var(--hairline)" />
            <text x="138" y="36" textAnchor="middle" fill="#5EA89C" fontSize="8.8" fontWeight="700">
              Simplified Mammalian Milk Synthesis &amp; Profile
            </text>
            <rect x="28" y="50" width="98" height="44" rx="2" fill="var(--page-bg)" stroke="#8DB596" />
            <text x="77" y="68" textAnchor="middle" fill="var(--page-ink)" fontSize="7.1" fontWeight="600">
              Circulating Precursors
            </text>
            <text x="77" y="82" textAnchor="middle" fill="var(--page-muted)" fontSize="6.3">
              Glucose, amino acids, lipids
            </text>
            <path d="M128,72 L148,72" stroke="#C8B06B" strokeWidth="1.5" />
            <rect x="150" y="50" width="98" height="44" rx="2" fill="var(--page-bg)" stroke="#5EA89C" />
            <text x="199" y="68" textAnchor="middle" fill="var(--page-ink)" fontSize="7.1" fontWeight="600">
              Mammary Alveoli
            </text>
            <text x="199" y="82" textAnchor="middle" fill="var(--page-muted)" fontSize="6.3">
              Lactose, casein, Ca²⁺, water
            </text>
            <text x="138" y="118" textAnchor="middle" fill="var(--page-muted)" fontSize="6.6">
              Lactose intolerance &amp; milk allergies vary across individuals.
            </text>

            <rect x="274" y="18" width="170" height="138" rx="3" fill="var(--page-bg-secondary)" stroke="#C8B06B" strokeDasharray="3 2" />
            <text x="359" y="38" textAnchor="middle" fill="#C8B06B" fontSize="8.4" fontWeight="700">
              Source &amp; Text Caution (16:66)
            </text>
            <text x="359" y="66" textAnchor="middle" fill="var(--page-ink)" fontSize="7" fontWeight="600">
              Not Mammary Histology
            </text>
            <text x="359" y="84" textAnchor="middle" fill="var(--page-muted)" fontSize="6.4">
              WHO infant guidance &amp; PubMed
            </text>
            <text x="359" y="96" textAnchor="middle" fill="var(--page-muted)" fontSize="6.4">
              portal are NOT specialist bovine
            </text>
            <text x="359" y="108" textAnchor="middle" fill="var(--page-muted)" fontSize="6.4">
              lactation physiology studies.
            </text>
          </svg>
        );

      case 'honey-composition-floral':
        return (
          <svg viewBox="0 0 460 175" className="w-full h-auto" role="img" aria-label={title}>
            <rect x="16" y="18" width="234" height="138" rx="3" fill="var(--page-bg-secondary)" stroke="var(--hairline)" />
            <text x="133" y="36" textAnchor="middle" fill="#C8B06B" fontSize="8.8" fontWeight="700">
              Honey Composition (Varies by Floral Source)
            </text>
            <rect x="28" y="50" width="210" height="24" rx="2" fill="#C8B06B" fillOpacity="0.22" stroke="#C8B06B" />
            <text x="133" y="66" textAnchor="middle" fill="var(--page-ink)" fontSize="7.2" fontWeight="600">
              Primary Fraction: Concentrated Sugars (Fructose + Glucose)
            </text>
            <rect x="28" y="80" width="210" height="24" rx="2" fill="#5EA89C" fillOpacity="0.16" stroke="#5EA89C" />
            <text x="133" y="96" textAnchor="middle" fill="var(--page-ink)" fontSize="7.1">
              Water (~Low Water Activity) + Organic Acids
            </text>
            <rect x="28" y="110" width="210" height="26" rx="2" fill="var(--page-bg)" stroke="var(--hairline)" />
            <text x="133" y="126" textAnchor="middle" fill="var(--page-muted)" fontSize="6.6">
              Trace enzymes, minerals &amp; floral pigments (varied colours)
            </text>

            <rect x="264" y="18" width="180" height="138" rx="3" fill="var(--page-bg-secondary)" stroke="#C8B06B" strokeDasharray="3 2" />
            <text x="354" y="38" textAnchor="middle" fill="#C8B06B" fontSize="8.5" fontWeight="700">
              Mandatory Safety Caution
            </text>
            <text x="354" y="66" textAnchor="middle" fill="var(--page-ink)" fontSize="7.2" fontWeight="700">
              No Honey Under 12 Months
            </text>
            <text x="354" y="82" textAnchor="middle" fill="var(--page-muted)" fontSize="6.5">
              Risk of infant botulism from
            </text>
            <text x="354" y="94" textAnchor="middle" fill="var(--page-muted)" fontSize="6.5">
              Clostridium botulinum spores.
            </text>
            <text x="354" y="118" textAnchor="middle" fill="#5EA89C" fontSize="6.5">
              Free-sugar intake still requires moderation.
            </text>
          </svg>
        );

      case 'honey-lab-vs-clinical':
        return (
          <svg viewBox="0 0 460 175" className="w-full h-auto" role="img" aria-label={title}>
            <rect x="16" y="18" width="206" height="138" rx="3" fill="var(--page-bg-secondary)" stroke="#5EA89C" />
            <text x="119" y="36" textAnchor="middle" fill="#5EA89C" fontSize="8.6" fontWeight="700">
              In-Vitro Laboratory Conditions
            </text>
            <circle cx="119" cy="76" r="24" fill="#5EA89C" fillOpacity="0.16" stroke="#5EA89C" />
            <text x="119" y="75" textAnchor="middle" fill="var(--page-ink)" fontSize="7" fontWeight="600">
              Petri Dish
            </text>
            <text x="119" y="86" textAnchor="middle" fill="var(--page-muted)" fontSize="6.2">
              High osmolarity + pH
            </text>
            <text x="119" y="118" textAnchor="middle" fill="var(--page-muted)" fontSize="6.5">
              Direct surface contact inhibits
            </text>
            <text x="119" y="130" textAnchor="middle" fill="var(--page-muted)" fontSize="6.5">
              some microbes in vitro.
            </text>

            <rect x="238" y="18" width="206" height="138" rx="3" fill="var(--page-bg-secondary)" stroke="#C8B06B" strokeDasharray="3 2" />
            <text x="341" y="36" textAnchor="middle" fill="#C8B06B" fontSize="8.6" fontWeight="700">
              Systemic Clinical Reality
            </text>
            <text x="341" y="68" textAnchor="middle" fill="var(--page-ink)" fontSize="7.2" fontWeight="700">
              Lab Effect != Internal Cure
            </text>
            <text x="341" y="86" textAnchor="middle" fill="var(--page-muted)" fontSize="6.6">
              Ingested honey is digested and diluted;
            </text>
            <text x="341" y="98" textAnchor="middle" fill="var(--page-muted)" fontSize="6.6">
              it does NOT replace antibiotics or
            </text>
            <text x="341" y="110" textAnchor="middle" fill="var(--page-muted)" fontSize="6.6">
              treat systemic human infections.
            </text>
            <text x="341" y="132" textAnchor="middle" fill="#C8B06B" fontSize="6.3">
              Note: PubMed/Cochrane portals are not trials.
            </text>
          </svg>
        );

      case 'honey-medical-vs-kitchen':
        return (
          <svg viewBox="0 0 460 175" className="w-full h-auto" role="img" aria-label={title}>
            <rect x="16" y="18" width="206" height="138" rx="3" fill="var(--page-bg-secondary)" stroke="#5EA89C" />
            <text x="119" y="36" textAnchor="middle" fill="#5EA89C" fontSize="8.5" fontWeight="700">
              Standardized Medical-Grade Honey
            </text>
            <text x="119" y="66" textAnchor="middle" fill="var(--page-ink)" fontSize="7.1" fontWeight="600">
              Gamma-Irradiated &amp; Clinically Tested
            </text>
            <text x="119" y="84" textAnchor="middle" fill="var(--page-muted)" fontSize="6.5">
              Eliminates bacterial spores; formulated
            </text>
            <text x="119" y="96" textAnchor="middle" fill="var(--page-muted)" fontSize="6.5">
              for supervised wound dressings in
            </text>
            <text x="119" y="108" textAnchor="middle" fill="var(--page-muted)" fontSize="6.5">
              selected clinical wound types.
            </text>

            <rect x="238" y="18" width="206" height="138" rx="3" fill="var(--page-bg-secondary)" stroke="#C8B06B" strokeDasharray="3 2" />
            <text x="341" y="36" textAnchor="middle" fill="#C8B06B" fontSize="8.5" fontWeight="700">
              Ordinary Dietary Kitchen Honey
            </text>
            <text x="341" y="64" textAnchor="middle" fill="var(--page-ink)" fontSize="7.1" fontWeight="700">
              Mandatory Clinical Warnings
            </text>
            <text x="341" y="82" textAnchor="middle" fill="var(--page-muted)" fontSize="6.5">
              • Do NOT apply to wounds as clinical substitute.
            </text>
            <text x="341" y="96" textAnchor="middle" fill="var(--page-muted)" fontSize="6.5">
              • Does NOT cure all digestive illnesses.
            </text>
            <text x="341" y="110" textAnchor="middle" fill="#C8B06B" fontSize="6.5" fontWeight="600">
              • NEVER give to infants under 1 year (botulism).
            </text>
          </svg>
        );

      case 'spiritual-vs-medical-healing':
        return (
          <svg viewBox="0 0 460 175" className="w-full h-auto" role="img" aria-label={title}>
            <rect x="16" y="18" width="200" height="138" rx="3" fill="var(--page-bg-secondary)" stroke="#C8B06B" />
            <text x="116" y="38" textAnchor="middle" fill="#C8B06B" fontSize="8.6" fontWeight="700">
              Spiritual &amp; Moral Domain (10:57, 17:82, 26:80)
            </text>
            <text x="116" y="70" textAnchor="middle" fill="var(--page-ink)" fontSize="7.3" fontWeight="600">
              Faith · Guidance · Spiritual Comfort
            </text>
            <text x="116" y="90" textAnchor="middle" fill="var(--page-muted)" fontSize="6.6">
              Addresses meaning, patience, and trust
            </text>
            <text x="116" y="102" textAnchor="middle" fill="var(--page-muted)" fontSize="6.6">
              in God without describing pathology.
            </text>

            <rect x="244" y="18" width="200" height="138" rx="3" fill="var(--page-bg-secondary)" stroke="#5EA89C" />
            <text x="344" y="38" textAnchor="middle" fill="#5EA89C" fontSize="8.6" fontWeight="700">
              Evidence-Based Medical Care
            </text>
            <text x="344" y="70" textAnchor="middle" fill="var(--page-ink)" fontSize="7.3" fontWeight="600">
              Diagnosis · Pharmacology · Therapy
            </text>
            <text x="344" y="90" textAnchor="middle" fill="var(--page-muted)" fontSize="6.6">
              Immune recovery, medication, surgery &amp;
            </text>
            <text x="344" y="102" textAnchor="middle" fill="var(--page-muted)" fontSize="6.6">
              supportive clinical management.
            </text>
            <text x="230" y="144" textAnchor="middle" fill="var(--page-ink)" fontSize="6.8" fontWeight="600">
              Recitation and prayer must NEVER replace medical diagnosis or clinical treatment.
            </text>
          </svg>
        );

      case 'ramadan-daily-fasting-timeline':
        return (
          <svg viewBox="0 0 460 175" className="w-full h-auto" role="img" aria-label={title}>
            <rect x="16" y="18" width="428" height="138" rx="3" fill="var(--page-bg-secondary)" stroke="var(--hairline)" />
            <text x="230" y="36" textAnchor="middle" fill="#5EA89C" fontSize="9" fontWeight="700">
              Daily Ramadan Cycle: Dawn-to-Sunset Dry Fast &amp; Nocturnal Window
            </text>
            <rect x="30" y="54" width="90" height="46" rx="2" fill="#8DB596" fillOpacity="0.16" stroke="#8DB596" />
            <text x="75" y="74" textAnchor="middle" fill="#8DB596" fontSize="7.4" fontWeight="700">
              Pre-Dawn (Suhoor)
            </text>
            <text x="75" y="88" textAnchor="middle" fill="var(--page-muted)" fontSize="6.4">
              Food &amp; hydration allowed
            </text>

            <rect x="128" y="54" width="204" height="46" rx="2" fill="#C8B06B" fillOpacity="0.16" stroke="#C8B06B" />
            <text x="230" y="74" textAnchor="middle" fill="#C8B06B" fontSize="7.8" fontWeight="700">
              Dawn (Fajr) → Sunset (Maghrib)
            </text>
            <text x="230" y="88" textAnchor="middle" fill="var(--page-ink)" fontSize="6.6">
              Abstinence from food &amp; drink · Duration varies by latitude/season
            </text>

            <rect x="340" y="54" width="90" height="46" rx="2" fill="#5EA89C" fillOpacity="0.16" stroke="#5EA89C" />
            <text x="385" y="74" textAnchor="middle" fill="#5EA89C" fontSize="7.4" fontWeight="700">
              Evening (Iftar)
            </text>
            <text x="385" y="88" textAnchor="middle" fill="var(--page-muted)" fontSize="6.4">
              Night eating &amp; fluid window
            </text>

            <text x="230" y="122" textAnchor="middle" fill="var(--page-ink)" fontSize="7.2" fontWeight="600">
              Religious Purpose (2:183): Cultivating Taqwa — NOT a medical weight-loss or detox program.
            </text>
            <text x="230" y="138" textAnchor="middle" fill="var(--page-muted)" fontSize="6.5">
              Dry daylight fasting differs from water-permitted intermittent fasting protocols.
            </text>
          </svg>
        );

      case 'ramadan-vs-intermittent-fasting':
        return (
          <svg viewBox="0 0 460 175" className="w-full h-auto" role="img" aria-label={title}>
            <rect x="16" y="18" width="206" height="138" rx="3" fill="var(--page-bg-secondary)" stroke="#C8B06B" />
            <text x="119" y="36" textAnchor="middle" fill="#C8B06B" fontSize="8.6" fontWeight="700">
              Ramadan Fasting Practice
            </text>
            <text x="119" y="64" textAnchor="middle" fill="var(--page-ink)" fontSize="7.1">
              • No food OR water from dawn to sunset
            </text>
            <text x="119" y="80" textAnchor="middle" fill="var(--page-ink)" fontSize="7.1">
              • Lunar calendar shifts daylight hours
            </text>
            <text x="119" y="96" textAnchor="middle" fill="var(--page-ink)" fontSize="7.1">
              • Altered nocturnal sleep &amp; meal culture
            </text>
            <text x="119" y="124" textAnchor="middle" fill="var(--page-muted)" fontSize="6.4">
              Weight &amp; health outcomes vary widely by intake.
            </text>

            <rect x="238" y="18" width="206" height="138" rx="3" fill="var(--page-bg-secondary)" stroke="#5EA89C" />
            <text x="341" y="36" textAnchor="middle" fill="#5EA89C" fontSize="8.6" fontWeight="700">
              Clinical Intermittent-Fasting Trials
            </text>
            <text x="341" y="64" textAnchor="middle" fill="var(--page-ink)" fontSize="7.1">
              • Water &amp; non-caloric drinks typically allowed
            </text>
            <text x="341" y="80" textAnchor="middle" fill="var(--page-ink)" fontSize="7.1">
              • Fixed clock windows or alternate-day protocols
            </text>
            <text x="341" y="96" textAnchor="middle" fill="var(--page-ink)" fontSize="7.1">
              • Controlled calorie &amp; sleep study designs
            </text>
            <text x="341" y="124" textAnchor="middle" fill="var(--page-muted)" fontSize="6.4">
              Do NOT generalize IF trial claims directly to all fasts.
            </text>
          </svg>
        );

      case 'fasting-metabolic-adaptation':
        return (
          <svg viewBox="0 0 460 175" className="w-full h-auto" role="img" aria-label={title}>
            <rect x="16" y="18" width="428" height="138" rx="3" fill="var(--page-bg-secondary)" stroke="var(--hairline)" />
            <text x="230" y="36" textAnchor="middle" fill="#5EA89C" fontSize="9" fontWeight="700">
              Substrate Utilization Shift Between Meals &amp; Daylight Fasting
            </text>
            <rect x="28" y="52" width="128" height="62" rx="2" fill="var(--page-bg)" stroke="#8DB596" />
            <text x="92" y="72" textAnchor="middle" fill="#8DB596" fontSize="7.5" fontWeight="700">
              Postprandial (Fed)
            </text>
            <text x="92" y="88" textAnchor="middle" fill="var(--page-ink)" fontSize="6.8">
              Dietary glucose &amp; insulin
            </text>
            <text x="92" y="100" textAnchor="middle" fill="var(--page-muted)" fontSize="6.3">
              Glycogen &amp; lipid storage
            </text>

            <path d="M160,83 L178,83" stroke="#C8B06B" strokeWidth="1.5" />

            <rect x="180" y="52" width="128" height="62" rx="2" fill="var(--page-bg)" stroke="#5EA89C" />
            <text x="244" y="72" textAnchor="middle" fill="#5EA89C" fontSize="7.5" fontWeight="700">
              Post-Absorptive State
            </text>
            <text x="244" y="88" textAnchor="middle" fill="var(--page-ink)" fontSize="6.8">
              Hepatic glycogenolysis
            </text>
            <text x="244" y="100" textAnchor="middle" fill="var(--page-muted)" fontSize="6.3">
              Growing fatty-acid mobilization
            </text>

            <rect x="322" y="52" width="110" height="62" rx="2" fill="var(--page-bg)" stroke="#C8B06B" strokeDasharray="3 2" />
            <text x="377" y="72" textAnchor="middle" fill="#C8B06B" fontSize="7.4" fontWeight="700">
              Individual Modifiers
            </text>
            <text x="377" y="88" textAnchor="middle" fill="var(--page-muted)" fontSize="6.3">
              Exertion · Climate · Diet
            </text>
            <text x="377" y="100" textAnchor="middle" fill="var(--page-muted)" fontSize="6.3">
              Hydration · Baseline health
            </text>
            <text x="230" y="138" textAnchor="middle" fill="var(--page-muted)" fontSize="6.6">
              Educational physiology only; verses do not describe metabolic pathways or promise "detoxification".
            </text>
          </svg>
        );

      case 'blood-glucose-regulation-overview':
        return (
          <svg viewBox="0 0 460 175" className="w-full h-auto" role="img" aria-label={title}>
            <rect x="16" y="18" width="234" height="138" rx="3" fill="var(--page-bg-secondary)" stroke="var(--hairline)" />
            <text x="133" y="36" textAnchor="middle" fill="#5EA89C" fontSize="8.8" fontWeight="700">
              Endocrine Blood Glucose Buffering (Normal Physiology)
            </text>
            <rect x="28" y="50" width="210" height="38" rx="2" fill="var(--page-bg)" stroke="#8DB596" />
            <text x="133" y="66" textAnchor="middle" fill="#8DB596" fontSize="7.3" fontWeight="700">
              Rising Glucose → Insulin Secretion
            </text>
            <text x="133" y="80" textAnchor="middle" fill="var(--page-muted)" fontSize="6.5">
              Facilitates muscle/adipose uptake &amp; glycogen synthesis
            </text>
            <rect x="28" y="96" width="210" height="38" rx="2" fill="var(--page-bg)" stroke="#5EA89C" />
            <text x="133" y="112" textAnchor="middle" fill="#5EA89C" fontSize="7.3" fontWeight="700">
              Fasting Decline → Glucagon Release
            </text>
            <text x="133" y="126" textAnchor="middle" fill="var(--page-muted)" fontSize="6.5">
              Stimulates hepatic glycogen breakdown &amp; gluconeogenesis
            </text>

            <rect x="264" y="18" width="180" height="138" rx="3" fill="var(--page-bg-secondary)" stroke="#C8B06B" strokeDasharray="3 2" />
            <text x="354" y="38" textAnchor="middle" fill="#C8B06B" fontSize="8.5" fontWeight="700">
              Diabetes Safety Caution
            </text>
            <text x="354" y="66" textAnchor="middle" fill="var(--page-ink)" fontSize="7.1" fontWeight="600">
              Risk With Glucose Medications
            </text>
            <text x="354" y="84" textAnchor="middle" fill="var(--page-muted)" fontSize="6.5">
              Insulin &amp; certain drugs increase risk of
            </text>
            <text x="354" y="96" textAnchor="middle" fill="var(--page-muted)" fontSize="6.5">
              dangerous hypoglycemia or ketoacidosis.
            </text>
            <text x="354" y="122" textAnchor="middle" fill="#C8B06B" fontSize="6.5">
              Clinician consultation is essential.
            </text>
          </svg>
        );

      case 'hydration-fluid-balance':
        return (
          <svg viewBox="0 0 460 175" className="w-full h-auto" role="img" aria-label={title}>
            <rect x="16" y="18" width="428" height="138" rx="3" fill="var(--page-bg-secondary)" stroke="var(--hairline)" />
            <text x="230" y="36" textAnchor="middle" fill="#5EA89C" fontSize="9" fontWeight="700">
              Fluid Balance Across Non-Fasting &amp; Daylight Hours
            </text>
            <rect x="28" y="52" width="128" height="58" rx="2" fill="var(--page-bg)" stroke="#5EA89C" />
            <text x="92" y="72" textAnchor="middle" fill="#5EA89C" fontSize="7.4" fontWeight="700">
              Nocturnal Fluid Intake
            </text>
            <text x="92" y="88" textAnchor="middle" fill="var(--page-muted)" fontSize="6.5">
              Water &amp; water-rich foods
            </text>
            <text x="92" y="100" textAnchor="middle" fill="var(--page-muted)" fontSize="6.5">
              between sunset &amp; dawn
            </text>

            <rect x="166" y="52" width="128" height="58" rx="2" fill="var(--page-bg)" stroke="#C8B06B" />
            <text x="230" y="72" textAnchor="middle" fill="#C8B06B" fontSize="7.4" fontWeight="700">
              Ongoing Daylight Losses
            </text>
            <text x="230" y="88" textAnchor="middle" fill="var(--page-muted)" fontSize="6.5">
              Sweat, respiration &amp; urine;
            </text>
            <text x="230" y="100" textAnchor="middle" fill="var(--page-muted)" fontSize="6.5">
              amplified by heat &amp; physical work
            </text>

            <rect x="304" y="52" width="128" height="58" rx="2" fill="var(--page-bg)" stroke="#8DB596" strokeDasharray="3 2" />
            <text x="368" y="72" textAnchor="middle" fill="#8DB596" fontSize="7.4" fontWeight="700">
              Safety Clarification
            </text>
            <text x="368" y="88" textAnchor="middle" fill="var(--page-ink)" fontSize="6.5" fontWeight="600">
              Dehydration is NOT beneficial.
            </text>
            <text x="368" y="100" textAnchor="middle" fill="var(--page-muted)" fontSize="6.3">
              Kidney/medical risks require care.
            </text>
            <text x="230" y="138" textAnchor="middle" fill="var(--page-muted)" fontSize="6.6">
              Individual hydration risk depends on ambient heat, fasting duration, occupation, and health status.
            </text>
          </svg>
        );

      case 'suhoor-iftar-meal-timing':
        return (
          <svg viewBox="0 0 460 175" className="w-full h-auto" role="img" aria-label={title}>
            <rect x="16" y="18" width="428" height="138" rx="3" fill="var(--page-bg-secondary)" stroke="var(--hairline)" />
            <text x="230" y="36" textAnchor="middle" fill="#C8B06B" fontSize="9" fontWeight="700">
              Nocturnal Eating Distribution &amp; Circadian Context (2:187)
            </text>
            <rect x="30" y="52" width="188" height="62" rx="2" fill="var(--page-bg)" stroke="#5EA89C" />
            <text x="124" y="72" textAnchor="middle" fill="#5EA89C" fontSize="7.6" fontWeight="700">
              Sunset (Iftar) → Evening
            </text>
            <text x="124" y="88" textAnchor="middle" fill="var(--page-muted)" fontSize="6.6">
              Rehydration, nutrient replenishment &amp; evening meal
            </text>
            <text x="124" y="101" textAnchor="middle" fill="var(--page-muted)" fontSize="6.4">
              Excessive night eating shifts glycemic load
            </text>

            <rect x="242" y="52" width="188" height="62" rx="2" fill="var(--page-bg)" stroke="#8DB596" />
            <text x="336" y="72" textAnchor="middle" fill="#8DB596" fontSize="7.6" fontWeight="700">
              Pre-Dawn (Suhoor) → Fajr
            </text>
            <text x="336" y="88" textAnchor="middle" fill="var(--page-muted)" fontSize="6.6">
              Legal boundary before dawn light (2:187)
            </text>
            <text x="336" y="101" textAnchor="middle" fill="var(--page-muted)" fontSize="6.4">
              No single schedule fits every clinical profile
            </text>

            <text x="230" y="138" textAnchor="middle" fill="var(--page-muted)" fontSize="6.6">
              Verse 2:187 sets a ritual timing boundary rather than prescribing a circadian nutrition program.
            </text>
          </svg>
        );

      case 'fasting-sleep-routine-travel':
        return (
          <svg viewBox="0 0 460 175" className="w-full h-auto" role="img" aria-label={title}>
            <rect x="16" y="18" width="224" height="138" rx="3" fill="var(--page-bg-secondary)" stroke="var(--hairline)" />
            <text x="128" y="36" textAnchor="middle" fill="#5EA89C" fontSize="8.6" fontWeight="700">
              Altered Schedules, Sleep &amp; Travel Factors
            </text>
            {[
              { y: 48, t: 'Nocturnal Waking (Suhoor)', s: 'Can fragment or shift total sleep timing' },
              { y: 78, t: 'Travel Demands (2:184–185)', s: 'Can disrupt meals, hydration & rest' },
              { y: 108, t: 'Cultural & Individual Variation', s: 'Work hours & habits vary widely' },
            ].map((r) => (
              <g key={r.t}>
                <rect x="28" y={r.y} width="200" height="24" rx="2" fill="var(--page-bg)" stroke="var(--hairline)" />
                <text x="36" y={r.y + 11} fill="var(--page-ink)" fontSize="7.1" fontWeight="600">
                  {r.t}
                </text>
                <text x="36" y={r.y + 20} fill="var(--page-muted)" fontSize="6.3">
                  {r.s}
                </text>
              </g>
            ))}

            <rect x="254" y="18" width="190" height="138" rx="3" fill="var(--page-bg-secondary)" stroke="#C8B06B" strokeDasharray="3 2" />
            <text x="349" y="38" textAnchor="middle" fill="#C8B06B" fontSize="8.5" fontWeight="700">
              Evidence &amp; Scope Caution
            </text>
            <text x="349" y="66" textAnchor="middle" fill="var(--page-ink)" fontSize="7.1" fontWeight="600">
              Concession != Medical Harm Claim
            </text>
            <text x="349" y="84" textAnchor="middle" fill="var(--page-muted)" fontSize="6.5">
              Travel concession does not imply all travel
            </text>
            <text x="349" y="96" textAnchor="middle" fill="var(--page-muted)" fontSize="6.5">
              causes physiological injury; PubMed portal
            </text>
            <text x="349" y="108" textAnchor="middle" fill="var(--page-muted)" fontSize="6.5">
              alone does not prove a specific sleep outcome.
            </text>
          </svg>
        );

      case 'diabetes-fasting-considerations':
        return (
          <svg viewBox="0 0 460 175" className="w-full h-auto" role="img" aria-label={title}>
            <rect x="16" y="18" width="246" height="138" rx="3" fill="var(--page-bg-secondary)" stroke="#C8B06B" />
            <text x="139" y="36" textAnchor="middle" fill="#C8B06B" fontSize="8.6" fontWeight="700">
              Documented Diabetes Risks While Fasting (NCBI / ADA)
            </text>
            {[
              { x: 28, y: 48, t: 'Hypoglycemia', s: 'Dangerous low blood sugar' },
              { x: 142, y: 48, t: 'Hyperglycemia & DKA', s: 'Elevated glucose / ketoacidosis' },
              { x: 28, y: 92, t: 'Dehydration', s: 'Fluid & kidney strain' },
              { x: 142, y: 92, t: 'Medication Timing', s: 'Insulin / agent sensitivity' },
            ].map((c) => (
              <g key={c.t}>
                <rect x={c.x} y={c.y} width="108" height="36" rx="2" fill="var(--page-bg)" stroke="var(--hairline)" />
                <text x={c.x + 54} y={c.y + 15} textAnchor="middle" fill="var(--page-ink)" fontSize="7.1" fontWeight="700">
                  {c.t}
                </text>
                <text x={c.x + 54} y={c.y + 27} textAnchor="middle" fill="var(--page-muted)" fontSize="6.2">
                  {c.s}
                </text>
              </g>
            ))}

            <rect x="276" y="18" width="168" height="138" rx="3" fill="var(--page-bg-secondary)" stroke="#5EA89C" strokeDasharray="3 2" />
            <text x="360" y="38" textAnchor="middle" fill="#5EA89C" fontSize="8.5" fontWeight="700">
              Clinical Care Boundary
            </text>
            <text x="360" y="64" textAnchor="middle" fill="var(--page-ink)" fontSize="7" fontWeight="600">
              Not a Risk Calculator
            </text>
            <text x="360" y="82" textAnchor="middle" fill="var(--page-muted)" fontSize="6.4">
              Religious illness exemptions (2:184–185)
            </text>
            <text x="360" y="94" textAnchor="middle" fill="var(--page-muted)" fontSize="6.4">
              and individualized clinical assessment
            </text>
            <text x="360" y="106" textAnchor="middle" fill="var(--page-muted)" fontSize="6.4">
              with a qualified physician are distinct
            </text>
            <text x="360" y="118" textAnchor="middle" fill="var(--page-muted)" fontSize="6.4">
              and both must be respected.
            </text>
          </svg>
        );

      case 'pregnancy-fasting-uncertainty':
        return (
          <svg viewBox="0 0 460 175" className="w-full h-auto" role="img" aria-label={title}>
            <rect x="16" y="18" width="222" height="138" rx="3" fill="var(--page-bg-secondary)" stroke="#5EA89C" />
            <text x="127" y="36" textAnchor="middle" fill="#5EA89C" fontSize="8.6" fontWeight="700">
              Gestational Demands &amp; Evidence Limits
            </text>
            <text x="127" y="64" textAnchor="middle" fill="var(--page-ink)" fontSize="7.2" fontWeight="600">
              Increased Maternal Nutrient &amp; Fluid Needs
            </text>
            <text x="127" y="84" textAnchor="middle" fill="var(--page-muted)" fontSize="6.6">
              Observational studies on Ramadan during
            </text>
            <text x="127" y="96" textAnchor="middle" fill="var(--page-muted)" fontSize="6.6">
              pregnancy show mixed findings, varying by
            </text>
            <text x="127" y="108" textAnchor="middle" fill="var(--page-muted)" fontSize="6.6">
              trimester, diet, climate &amp; study design.
            </text>

            <rect x="252" y="18" width="192" height="138" rx="3" fill="var(--page-bg-secondary)" stroke="#C8B06B" strokeDasharray="3 2" />
            <text x="348" y="38" textAnchor="middle" fill="#C8B06B" fontSize="8.5" fontWeight="700">
              Mandatory Caution (No Blanket Claim)
            </text>
            <text x="348" y="68" textAnchor="middle" fill="var(--page-ink)" fontSize="7" fontWeight="600">
              Neither Universally Safe Nor Harm-Only
            </text>
            <text x="348" y="88" textAnchor="middle" fill="var(--page-muted)" fontSize="6.5">
              Requires individualized obstetric &amp;
            </text>
            <text x="348" y="100" textAnchor="middle" fill="var(--page-muted)" fontSize="6.5">
              religious consultation—not a generalized
            </text>
            <text x="348" y="112" textAnchor="middle" fill="var(--page-muted)" fontSize="6.5">
              pregnancy score or self-directive.
            </text>
          </svg>
        );

      case 'alcohol-general-health-effects':
        return (
          <svg viewBox="0 0 460 175" className="w-full h-auto" role="img" aria-label={title}>
            <rect x="16" y="18" width="252" height="138" rx="3" fill="var(--page-bg-secondary)" stroke="var(--hairline)" />
            <text x="142" y="36" textAnchor="middle" fill="#C8B06B" fontSize="8.6" fontWeight="700">
              WHO Documented Public-Health Effects of Alcohol
            </text>
            {[
              { x: 28, y: 48, t: 'Hepatic Injury', s: 'Steatosis, hepatitis & cirrhosis' },
              { x: 144, y: 48, t: 'Dependence & CNS', s: 'Neurological & behavioral disorder' },
              { x: 28, y: 92, t: 'Oncology Risk', s: 'Elevated risk across several cancers' },
              { x: 144, y: 92, t: 'Acute Injuries', s: 'Traffic, falls & trauma incidence' },
            ].map((b) => (
              <g key={b.t}>
                <rect x={b.x} y={b.y} width="110" height="36" rx="2" fill="var(--page-bg)" stroke="var(--hairline)" />
                <text x={b.x + 55} y={b.y + 15} textAnchor="middle" fill="var(--page-ink)" fontSize="7.1" fontWeight="700">
                  {b.t}
                </text>
                <text x={b.x + 55} y={b.y + 27} textAnchor="middle" fill="var(--page-muted)" fontSize="6.2">
                  {b.s}
                </text>
              </g>
            ))}

            <rect x="282" y="18" width="162" height="138" rx="3" fill="var(--page-bg-secondary)" stroke="#5EA89C" strokeDasharray="3 2" />
            <text x="363" y="38" textAnchor="middle" fill="#5EA89C" fontSize="8.5" fontWeight="700">
              Scope Distinction (5:90–91)
            </text>
            <text x="363" y="68" textAnchor="middle" fill="var(--page-ink)" fontSize="7" fontWeight="600">
              Prohibition != Toxicology Paper
            </text>
            <text x="363" y="88" textAnchor="middle" fill="var(--page-muted)" fontSize="6.4">
              WHO epidemiology stands on clinical
            </text>
            <text x="363" y="100" textAnchor="middle" fill="var(--page-muted)" fontSize="6.4">
              evidence; verses state a religious
            </text>
            <text x="363" y="112" textAnchor="middle" fill="var(--page-muted)" fontSize="6.4">
              prohibition and social-moral harm.
            </text>
          </svg>
        );

      case 'dates-nutritional-components':
        return (
          <svg viewBox="0 0 460 175" className="w-full h-auto" role="img" aria-label={title}>
            <rect x="16" y="18" width="212" height="138" rx="3" fill="var(--page-bg-secondary)" stroke="#8DB596" />
            <text x="122" y="36" textAnchor="middle" fill="#8DB596" fontSize="8.8" fontWeight="700">
              Nutritional Constituents of Dates
            </text>
            {[
              { y: 48, t: 'Carbohydrates & Natural Sugars', s: 'Dense energy (portion size matters for glucose)' },
              { y: 78, t: 'Dietary Fiber', s: 'Supports digestive motility & fullness' },
              { y: 108, t: 'Potassium & Micronutrients', s: 'Trace minerals & phenolic compounds' },
            ].map((r) => (
              <g key={r.t}>
                <rect x="28" y={r.y} width="188" height="24" rx="2" fill="var(--page-bg)" stroke="var(--hairline)" />
                <text x="36" y={r.y + 11} fill="var(--page-ink)" fontSize="7" fontWeight="600">
                  {r.t}
                </text>
                <text x="36" y={r.y + 20} fill="var(--page-muted)" fontSize="6.2">
                  {r.s}
                </text>
              </g>
            ))}

            <rect x="242" y="18" width="202" height="138" rx="3" fill="var(--page-bg-secondary)" stroke="#C8B06B" strokeDasharray="3 2" />
            <text x="343" y="38" textAnchor="middle" fill="#C8B06B" fontSize="8.5" fontWeight="700">
              Mandatory Narrative Caution (19:25–26)
            </text>
            <text x="343" y="66" textAnchor="middle" fill="var(--page-ink)" fontSize="7.1" fontWeight="600">
              Not a Universal Childbirth Guarantee
            </text>
            <text x="343" y="84" textAnchor="middle" fill="var(--page-muted)" fontSize="6.5">
              19:25–26 occurs in Maryam’s narrative; it does
            </text>
            <text x="343" y="96" textAnchor="middle" fill="var(--page-muted)" fontSize="6.5">
              not prove dates guarantee labor outcomes or serve
            </text>
            <text x="343" y="108" textAnchor="middle" fill="var(--page-muted)" fontSize="6.5">
              as universal prenatal advice (especially in GDM).
            </text>
            <text x="343" y="130" textAnchor="middle" fill="#5EA89C" fontSize="6.3">
              WHO diet &amp; PubMed portal do not confirm birth claims.
            </text>
          </svg>
        );
    }
  };

  return (
    <figure className="my-2 p-3 border border-[var(--hairline)] bg-[var(--page-bg-secondary)]/45 rounded-sm space-y-2">
      <div className="flex flex-wrap items-center justify-between gap-2 text-[10px] uppercase tracking-[0.16em] text-[var(--accent-gold)] font-semibold">
        <span>Scientific Background Diagram</span>
        <span className="text-[var(--page-muted)] font-normal">
          Educational Illustration (Not Qur&rsquo;anic Schematic)
        </span>
      </div>
      <div className="text-xs font-medium text-[var(--page-ink)]">{title}</div>
      <div className="w-full overflow-hidden">{renderSvg()}</div>
      <figcaption className="text-[11px] leading-snug text-[var(--page-muted)] italic">
        {caption}
      </figcaption>
    </figure>
  );
};
