import React from 'react';
import { PlantsDiagramKind } from '../../types/encyclopedia';

interface PlantsDiagramProps {
  kind: PlantsDiagramKind;
  title: string;
  caption: string;
}

export const PlantsDiagram: React.FC<PlantsDiagramProps> = ({
  kind,
  title,
  caption,
}) => {
  const renderSvg = () => {
    switch (kind) {
      case 'plant-structure-organs':
        return (
          <svg viewBox="0 0 460 175" className="w-full h-auto" role="img" aria-label={title}>
            {/* Soil horizon */}
            <rect x="20" y="106" width="210" height="44" fill="var(--page-bg-secondary)" stroke="var(--hairline)" />
            {/* Roots */}
            <path d="M124,106 L124,142 M124,116 L96,136 M124,122 L152,140 M108,128 L88,142" fill="none" stroke="var(--accent-gold)" strokeWidth="1.4" />
            {/* Stem */}
            <line x1="124" y1="106" x2="124" y2="34" stroke="#9BC18D" strokeWidth="2.6" />
            {/* Leaves */}
            <ellipse cx="96" cy="76" rx="22" ry="9" transform="rotate(-18 96 76)" fill="#9BC18D" fillOpacity="0.32" stroke="#9BC18D" />
            <ellipse cx="152" cy="64" rx="22" ry="9" transform="rotate(18 152 64)" fill="#9BC18D" fillOpacity="0.32" stroke="#9BC18D" />
            {/* Flower / fruit bud */}
            <circle cx="124" cy="28" r="7" fill="var(--accent-gold)" fillOpacity="0.45" stroke="var(--accent-gold)" strokeWidth="1.2" />

            {/* Labels */}
            <text x="150" y="30" fill="var(--accent-gold)" fontSize="8" fontWeight="600">
              Flower / Fruit Organ
            </text>
            <text x="180" y="64" fill="#9BC18D" fontSize="8" fontWeight="600">
              Photosynthetic Leaf
            </text>
            <text x="34" y="88" fill="var(--page-ink)" fontSize="8">
              Vascular Stem
            </text>
            <text x="124" y="148" textAnchor="middle" fill="var(--page-muted)" fontSize="7.5">
              Root System (Water &amp; Minerals)
            </text>

            {/* Right summary panel */}
            <rect x="246" y="22" width="194" height="126" rx="4" fill="var(--page-bg-secondary)" stroke="var(--hairline)" />
            <text x="343" y="40" textAnchor="middle" fill="var(--accent-gold)" fontSize="8.5" fontWeight="600">
              Vascular Plant Body Plan
            </text>
            <text x="260" y="60" fill="var(--page-ink)" fontSize="7.5" fontWeight="600">
              • Shoot System:
            </text>
            <text x="268" y="72" fill="var(--page-muted)" fontSize="7.2">
              Stems support leaves &amp; flowers
            </text>
            <text x="260" y="90" fill="var(--page-ink)" fontSize="7.5" fontWeight="600">
              • Root System:
            </text>
            <text x="268" y="102" fill="var(--page-muted)" fontSize="7.2">
              Anchorage, water &amp; ion uptake
            </text>
            <text x="260" y="120" fill="var(--page-ink)" fontSize="7.5" fontWeight="600">
              • Morphological Diversity:
            </text>
            <text x="268" y="132" fill="var(--page-muted)" fontSize="7.2">
              Varies across herbs, vines &amp; trees
            </text>

            <text x="230" y="166" textAnchor="middle" fill="var(--page-muted)" fontSize="8">
              Simplified vascular plant diagram; non-vascular mosses and algae lack true roots, stems, and leaves (RHS)
            </text>
          </svg>
        );

      case 'xylem-phloem-water-transport':
        return (
          <svg viewBox="0 0 460 175" className="w-full h-auto" role="img" aria-label={title}>
            {/* Two columns: Xylem & Phloem */}
            <rect x="24" y="22" width="196" height="124" rx="4" fill="var(--page-bg-secondary)" stroke="#9BC18D" />
            <text x="122" y="40" textAnchor="middle" fill="#9BC18D" fontSize="8.5" fontWeight="600">
              Xylem (One-Way Upward Flow)
            </text>
            <rect x="106" y="52" width="32" height="68" fill="#9BC18D" fillOpacity="0.18" stroke="#9BC18D" />
            <line x1="122" y1="114" x2="122" y2="58" stroke="#9BC18D" strokeWidth="1.8" />
            <polygon points="122,52 117,60 127,60" fill="#9BC18D" />
            <text x="64" y="84" textAnchor="middle" fill="var(--page-ink)" fontSize="7.5">
              Water &amp;
            </text>
            <text x="64" y="95" textAnchor="middle" fill="var(--page-ink)" fontSize="7.5">
              Minerals
            </text>
            <text x="176" y="78" textAnchor="middle" fill="var(--page-muted)" fontSize="7.2">
              Pulled by leaf
            </text>
            <text x="176" y="89" textAnchor="middle" fill="var(--page-muted)" fontSize="7.2">
              transpiration
            </text>
            <text x="122" y="136" textAnchor="middle" fill="var(--page-muted)" fontSize="7.2">
              Roots → Stem → Leaf Stomata
            </text>

            <rect x="240" y="22" width="196" height="124" rx="4" fill="var(--page-bg-secondary)" stroke="var(--accent-gold)" />
            <text x="338" y="40" textAnchor="middle" fill="var(--accent-gold)" fontSize="8.5" fontWeight="600">
              Phloem (Two-Way Sugar Flow)
            </text>
            <rect x="322" y="52" width="32" height="68" fill="var(--accent-gold)" fillOpacity="0.16" stroke="var(--accent-gold)" />
            <line x1="332" y1="58" x2="332" y2="112" stroke="var(--accent-gold)" strokeWidth="1.5" />
            <polygon points="332,116 328,109 336,109" fill="var(--accent-gold)" />
            <line x1="344" y1="112" x2="344" y2="58" stroke="var(--accent-gold)" strokeWidth="1.5" />
            <polygon points="344,54 340,61 348,61" fill="var(--accent-gold)" />
            <text x="280" y="84" textAnchor="middle" fill="var(--page-ink)" fontSize="7.5">
              Sugars
            </text>
            <text x="280" y="95" textAnchor="middle" fill="var(--page-ink)" fontSize="7.5">
              (Sap)
            </text>
            <text x="394" y="84" textAnchor="middle" fill="var(--page-muted)" fontSize="7.2">
              Leaves to roots,
            </text>
            <text x="394" y="95" textAnchor="middle" fill="var(--page-muted)" fontSize="7.2">
              buds &amp; fruits
            </text>
            <text x="338" y="136" textAnchor="middle" fill="var(--page-muted)" fontSize="7.2">
              Maintains cellular turgor &amp; growth
            </text>

            <text x="230" y="166" textAnchor="middle" fill="var(--page-muted)" fontSize="8">
              Vascular tissues coordinate water ascent and carbohydrate delivery (USDA FS / OpenStax)
            </text>
          </svg>
        );

      case 'photosynthesis-light-co2':
        return (
          <svg viewBox="0 0 460 175" className="w-full h-auto" role="img" aria-label={title}>
            {/* Sun rays */}
            <circle cx="64" cy="40" r="14" fill="var(--accent-gold)" fillOpacity="0.3" stroke="var(--accent-gold)" strokeWidth="1.4" />
            <line x1="78" y1="48" x2="145" y2="74" stroke="var(--accent-gold)" strokeWidth="1.5" />
            <polygon points="150,76 141,77 144,70" fill="var(--accent-gold)" />
            <text x="64" y="68" textAnchor="middle" fill="var(--accent-gold)" fontSize="8" fontWeight="600">
              Light Energy
            </text>

            {/* Leaf Chloroplast Box */}
            <ellipse cx="232" cy="86" rx="94" ry="44" fill="#9BC18D" fillOpacity="0.22" stroke="#9BC18D" strokeWidth="1.4" />
            <text x="232" y="72" textAnchor="middle" fill="var(--page-ink)" fontSize="9" fontWeight="700">
              Leaf Chloroplasts
            </text>
            <text x="232" y="87" textAnchor="middle" fill="var(--accent-gold)" fontSize="8" fontWeight="600">
              6CO₂ + 6H₂O + light
            </text>
            <text x="232" y="100" textAnchor="middle" fill="var(--page-ink)" fontSize="8" fontWeight="600">
              &rarr; C₆H₁₂O₆ + 6O₂
            </text>

            {/* CO2 & Water inputs */}
            <line x1="48" y1="106" x2="134" y2="96" stroke="#9BC18D" strokeWidth="1.4" />
            <polygon points="140,95 131,92 132,100" fill="#9BC18D" />
            <text x="72" y="120" textAnchor="middle" fill="var(--page-ink)" fontSize="7.5">
              CO₂ (Stomata) + H₂O (Roots)
            </text>

            {/* Outputs */}
            <line x1="328" y1="74" x2="392" y2="54" stroke="#9BC18D" strokeWidth="1.5" />
            <polygon points="398,52 388,51 391,58" fill="#9BC18D" />
            <text x="404" y="45" textAnchor="middle" fill="#9BC18D" fontSize="8.5" fontWeight="600">
              O₂ Released
            </text>

            <line x1="328" y1="98" x2="392" y2="114" stroke="var(--accent-gold)" strokeWidth="1.5" />
            <polygon points="398,116 391,109 388,117" fill="var(--accent-gold)" />
            <text x="394" y="130" textAnchor="middle" fill="var(--accent-gold)" fontSize="8" fontWeight="600">
              Sugars (Phloem)
            </text>

            <text x="230" y="164" textAnchor="middle" fill="var(--page-muted)" fontSize="8">
              Simplified overview of oxygenic photosynthesis; modern biochemistry is not explicitly described in Qur’an 6:99 or 10:5
            </text>
          </svg>
        );

      case 'seed-anatomy-embryo':
        return (
          <svg viewBox="0 0 460 175" className="w-full h-auto" role="img" aria-label={title}>
            {/* Left: Dicot / Date seed */}
            <rect x="18" y="20" width="204" height="126" rx="4" fill="var(--page-bg-secondary)" stroke="var(--hairline)" />
            <text x="120" y="38" textAnchor="middle" fill="var(--accent-gold)" fontSize="8.5" fontWeight="600">
              Seed / Kernel Cross-Section
            </text>
            <ellipse cx="102" cy="86" rx="54" ry="30" fill="#9BC18D" fillOpacity="0.16" stroke="var(--accent-gold)" strokeWidth="1.4" />
            <ellipse cx="106" cy="86" rx="34" ry="18" fill="var(--page-bg)" stroke="#9BC18D" />
            <path d="M78,86 Q90,78 96,94" fill="none" stroke="var(--accent-gold)" strokeWidth="2" />
            <text x="174" y="64" fill="var(--page-ink)" fontSize="7.5">
              Seed Coat
            </text>
            <text x="174" y="86" fill="#9BC18D" fontSize="7.5">
              Stored Food
            </text>
            <text x="174" y="108" fill="var(--accent-gold)" fontSize="7.5" fontWeight="600">
              Embryo Axis
            </text>
            <text x="120" y="134" textAnchor="middle" fill="var(--page-muted)" fontSize="7.2">
              Embryonic shoot &amp; root + reserves
            </text>

            {/* Right: Monocot cereal caryopsis */}
            <rect x="238" y="20" width="204" height="126" rx="4" fill="var(--page-bg-secondary)" stroke="#9BC18D" />
            <text x="340" y="38" textAnchor="middle" fill="#9BC18D" fontSize="8.5" fontWeight="600">
              Cereal Grain (Caryopsis)
            </text>
            <path d="M276,56 C318,48 342,66 334,114 C312,126 276,120 266,94 C260,72 266,60 276,56 Z" fill="var(--page-bg)" stroke="#9BC18D" strokeWidth="1.4" />
            <path d="M274,98 C288,88 302,94 298,116 C284,118 274,112 274,98 Z" fill="var(--accent-gold)" fillOpacity="0.32" stroke="var(--accent-gold)" />
            <text x="386" y="68" textAnchor="middle" fill="var(--page-ink)" fontSize="7.5">
              Bran (Pericarp)
            </text>
            <text x="386" y="88" textAnchor="middle" fill="#9BC18D" fontSize="7.5" fontWeight="600">
              Starchy Endosperm
            </text>
            <text x="386" y="108" textAnchor="middle" fill="var(--accent-gold)" fontSize="7.5">
              Embryo (Germ)
            </text>
            <text x="340" y="134" textAnchor="middle" fill="var(--page-muted)" fontSize="7.2">
              Fuels early growth until true leaves open
            </text>

            <text x="230" y="166" textAnchor="middle" fill="var(--page-muted)" fontSize="8">
              Seeds package an embryo and nutrient store; anatomy varies between monocot grains, dicots, palms, and conifers
            </text>
          </svg>
        );

      case 'seed-germination-stages':
        return (
          <svg viewBox="0 0 460 175" className="w-full h-auto" role="img" aria-label={title}>
            {/* Soil horizon */}
            <line x1="20" y1="88" x2="440" y2="88" stroke="var(--hairline)" strokeWidth="1.2" />

            {/* Stage 1 */}
            <rect x="20" y="22" width="126" height="122" rx="4" fill="var(--page-bg-secondary)" fillOpacity="0.45" stroke="var(--hairline)" />
            <text x="83" y="38" textAnchor="middle" fill="var(--accent-gold)" fontSize="8" fontWeight="600">
              1. Imbibition
            </text>
            <ellipse cx="83" cy="108" rx="14" ry="9" fill="var(--accent-gold)" fillOpacity="0.3" stroke="var(--accent-gold)" />
            <text x="83" y="134" textAnchor="middle" fill="var(--page-muted)" fontSize="7">
              Water + O₂ + warmth
            </text>

            {/* Stage 2 */}
            <rect x="167" y="22" width="126" height="122" rx="4" fill="var(--page-bg-secondary)" fillOpacity="0.45" stroke="var(--hairline)" />
            <text x="230" y="38" textAnchor="middle" fill="#9BC18D" fontSize="8" fontWeight="600">
              2. Coat Splits &amp; Root
            </text>
            <ellipse cx="230" cy="106" rx="14" ry="9" fill="var(--accent-gold)" fillOpacity="0.3" stroke="var(--accent-gold)" />
            <path d="M230,115 Q226,128 232,138" fill="none" stroke="#9BC18D" strokeWidth="1.8" />
            <text x="230" y="72" textAnchor="middle" fill="var(--page-muted)" fontSize="7">
              Radicle emerges first
            </text>

            {/* Stage 3 */}
            <rect x="314" y="22" width="126" height="122" rx="4" fill="var(--page-bg-secondary)" fillOpacity="0.45" stroke="#9BC18D" />
            <text x="377" y="38" textAnchor="middle" fill="#9BC18D" fontSize="8" fontWeight="600">
              3. Shoot &amp; Leaves
            </text>
            <line x1="377" y1="104" x2="377" y2="56" stroke="#9BC18D" strokeWidth="1.8" />
            <ellipse cx="364" cy="64" rx="11" ry="4.5" fill="#9BC18D" fillOpacity="0.4" stroke="#9BC18D" />
            <ellipse cx="390" cy="64" rx="11" ry="4.5" fill="#9BC18D" fillOpacity="0.4" stroke="#9BC18D" />
            <path d="M377,104 L365,132 M377,104 L377,138 M377,104 L390,132" stroke="var(--accent-gold)" strokeWidth="1.2" />
            <text x="377" y="140" textAnchor="middle" fill="var(--page-muted)" fontSize="6.8">
              Photosynthesis begins
            </text>

            <text x="230" y="164" textAnchor="middle" fill="var(--page-muted)" fontSize="8">
              Viable seeds germinate given water, oxygen, and suitable temperature; ferns and mosses propagate via spores (RHS)
            </text>
          </svg>
        );

      case 'plant-growth-requirements':
        return (
          <svg viewBox="0 0 460 175" className="w-full h-auto" role="img" aria-label={title}>
            {/* Central plant */}
            <rect x="175" y="42" width="110" height="84" rx="4" fill="#9BC18D" fillOpacity="0.18" stroke="#9BC18D" strokeWidth="1.3" />
            <text x="230" y="76" textAnchor="middle" fill="var(--page-ink)" fontSize="9" fontWeight="700">
              Plant Growth
            </text>
            <text x="230" y="90" textAnchor="middle" fill="var(--accent-gold)" fontSize="8" fontWeight="600">
              &amp; Crop Yield
            </text>
            <text x="230" y="106" textAnchor="middle" fill="var(--page-muted)" fontSize="7.2">
              Species-specific biology
            </text>

            {/* Surrounding 4 boxes */}
            <rect x="20" y="24" width="128" height="44" rx="4" fill="var(--page-bg-secondary)" stroke="var(--accent-gold)" />
            <text x="84" y="42" textAnchor="middle" fill="var(--accent-gold)" fontSize="8" fontWeight="600">
              1. Water Supply
            </text>
            <text x="84" y="56" textAnchor="middle" fill="var(--page-muted)" fontSize="7.2">
              Rain, soil moisture, turgor
            </text>

            <rect x="20" y="100" width="128" height="44" rx="4" fill="var(--page-bg-secondary)" stroke="var(--hairline)" />
            <text x="84" y="118" textAnchor="middle" fill="#9BC18D" fontSize="8" fontWeight="600">
              2. Soil &amp; Minerals
            </text>
            <text x="84" y="132" textAnchor="middle" fill="var(--page-muted)" fontSize="7.2">
              N, P, K, O₂ &amp; soil pH
            </text>

            <rect x="312" y="24" width="128" height="44" rx="4" fill="var(--page-bg-secondary)" stroke="var(--hairline)" />
            <text x="376" y="42" textAnchor="middle" fill="var(--accent-gold)" fontSize="8" fontWeight="600">
              3. Light &amp; CO₂
            </text>
            <text x="376" y="56" textAnchor="middle" fill="var(--page-muted)" fontSize="7.2">
              Energy for carbohydrates
            </text>

            <rect x="312" y="100" width="128" height="44" rx="4" fill="var(--page-bg-secondary)" stroke="var(--hairline)" />
            <text x="376" y="118" textAnchor="middle" fill="#9BC18D" fontSize="8" fontWeight="600">
              4. Temperature
            </text>
            <text x="376" y="132" textAnchor="middle" fill="var(--page-muted)" fontSize="7.2">
              Climate &amp; enzyme limits
            </text>

            <line x1="148" y1="48" x2="175" y2="68" stroke="var(--accent-gold)" strokeWidth="1.2" />
            <line x1="148" y1="120" x2="175" y2="100" stroke="#9BC18D" strokeWidth="1.2" />
            <line x1="312" y1="48" x2="285" y2="68" stroke="var(--accent-gold)" strokeWidth="1.2" />
            <line x1="312" y1="120" x2="285" y2="100" stroke="#9BC18D" strokeWidth="1.2" />

            <text x="230" y="165" textAnchor="middle" fill="var(--page-muted)" fontSize="8">
              Water is essential, yet plant development always depends on interacting light, soil, thermal, and genetic factors (FAO / RHS)
            </text>
          </svg>
        );

      case 'plant-reproductive-diversity':
        return (
          <svg viewBox="0 0 460 175" className="w-full h-auto" role="img" aria-label={title}>
            {/* Column 1: Bisexual / Hermaphroditic flower */}
            <rect x="18" y="20" width="134" height="124" rx="4" fill="var(--page-bg-secondary)" stroke="#9BC18D" />
            <text x="85" y="38" textAnchor="middle" fill="#9BC18D" fontSize="8" fontWeight="600">
              1. Perfect Flower
            </text>
            <circle cx="85" cy="70" r="16" fill="#9BC18D" fillOpacity="0.2" stroke="#9BC18D" />
            <circle cx="85" cy="70" r="5" fill="var(--accent-gold)" />
            <text x="85" y="102" textAnchor="middle" fill="var(--page-ink)" fontSize="7.5">
              Stamen + Carpel
            </text>
            <text x="85" y="114" textAnchor="middle" fill="var(--page-muted)" fontSize="7">
              in one flower
            </text>
            <text x="85" y="128" textAnchor="middle" fill="var(--page-muted)" fontSize="7">
              (e.g., apples, tomatoes)
            </text>

            {/* Column 2: Dioecious */}
            <rect x="163" y="20" width="134" height="124" rx="4" fill="var(--page-bg-secondary)" stroke="var(--accent-gold)" />
            <text x="230" y="38" textAnchor="middle" fill="var(--accent-gold)" fontSize="8" fontWeight="600">
              2. Dioecious (Separate)
            </text>
            <text x="200" y="74" textAnchor="middle" fill="var(--page-ink)" fontSize="11" fontWeight="700">
              ♂ Tree
            </text>
            <text x="260" y="74" textAnchor="middle" fill="#9BC18D" fontSize="11" fontWeight="700">
              ♀ Tree
            </text>
            <text x="230" y="102" textAnchor="middle" fill="var(--page-ink)" fontSize="7.5">
              Male &amp; female plants
            </text>
            <text x="230" y="114" textAnchor="middle" fill="var(--page-muted)" fontSize="7">
              on separate individuals
            </text>
            <text x="230" y="128" textAnchor="middle" fill="var(--page-muted)" fontSize="7">
              (e.g., date palm, kiwi)
            </text>

            {/* Column 3: Monoecious / Asexual */}
            <rect x="308" y="20" width="134" height="124" rx="4" fill="var(--page-bg-secondary)" stroke="var(--hairline)" />
            <text x="375" y="38" textAnchor="middle" fill="var(--page-ink)" fontSize="8" fontWeight="600">
              3. Monoecious / Clonal
            </text>
            <path d="M335,76 Q375,64 415,76" fill="none" stroke="#9BC18D" strokeWidth="1.6" />
            <circle cx="348" cy="72" r="4" fill="var(--accent-gold)" />
            <circle cx="402" cy="72" r="4" fill="#9BC18D" />
            <text x="375" y="102" textAnchor="middle" fill="var(--page-ink)" fontSize="7.5">
              Separate flowers on 1 plant,
            </text>
            <text x="375" y="114" textAnchor="middle" fill="var(--page-muted)" fontSize="7">
              or runners, bulbs &amp; spores
            </text>
            <text x="375" y="128" textAnchor="middle" fill="var(--page-muted)" fontSize="7">
              (e.g., maize, strawberries)
            </text>

            <text x="230" y="164" textAnchor="middle" fill="var(--page-muted)" fontSize="8">
              Not all plants have separate male/female individuals; Arabic "azwāj" (13:3, 20:53, 36:36) requires tafsir care (OpenStax)
            </text>
          </svg>
        );

      case 'fertilisation-seed-development':
        return (
          <svg viewBox="0 0 460 175" className="w-full h-auto" role="img" aria-label={title}>
            {/* Carpel / Pistil outline */}
            <path d="M128,44 L172,44 L162,62 L162,92 C188,104 188,136 150,140 C112,136 112,104 138,92 L138,62 Z" fill="#9BC18D" fillOpacity="0.18" stroke="#9BC18D" strokeWidth="1.4" />
            {/* Pollen grain & tube */}
            <circle cx="150" cy="40" r="5" fill="var(--accent-gold)" />
            <path d="M150,45 L150,114 Q150,122 146,122" fill="none" stroke="var(--accent-gold)" strokeWidth="1.5" strokeDasharray="3 2" />
            <ellipse cx="150" cy="118" rx="14" ry="10" fill="var(--page-bg)" stroke="var(--accent-gold)" />

            <text x="64" y="42" textAnchor="middle" fill="var(--accent-gold)" fontSize="8" fontWeight="600">
              Stigma + Pollen
            </text>
            <text x="64" y="78" textAnchor="middle" fill="var(--page-ink)" fontSize="7.5">
              Pollen Tube
            </text>
            <text x="64" y="120" textAnchor="middle" fill="#9BC18D" fontSize="8" fontWeight="600">
              Ovary &amp; Ovule
            </text>

            {/* Steps box */}
            <rect x="220" y="24" width="220" height="118" rx="4" fill="var(--page-bg-secondary)" stroke="var(--hairline)" />
            <text x="330" y="42" textAnchor="middle" fill="var(--accent-gold)" fontSize="8.5" fontWeight="600">
              Flowering-Plant Fertilisation
            </text>
            <text x="234" y="62" fill="var(--page-ink)" fontSize="7.5">
              1. Compatible pollen lands on stigma
            </text>
            <text x="234" y="78" fill="var(--page-ink)" fontSize="7.5">
              2. Pollen tube grows down style to ovule
            </text>
            <text x="234" y="94" fill="var(--page-ink)" fontSize="7.5">
              3. Ovule develops into seed; ovary into fruit
            </text>
            <text x="234" y="114" fill="var(--page-muted)" fontSize="7.2">
              Note: 15:22 (lawāqiḥ) is also linked in
            </text>
            <text x="234" y="125" fill="var(--page-muted)" fontSize="7.2">
              tafsir to rain-bearing clouds
            </text>

            <text x="230" y="164" textAnchor="middle" fill="var(--page-muted)" fontSize="8">
              Angiosperm fertilisation overview (OpenStax); not all plants reproduce via flowers or seeds
            </text>
          </svg>
        );

      case 'wind-pollination-anemophily':
        return (
          <svg viewBox="0 0 460 175" className="w-full h-auto" role="img" aria-label={title}>
            {/* Left: Wind pollination mechanism */}
            <rect x="18" y="22" width="246" height="122" rx="4" fill="var(--page-bg-secondary)" stroke="#9BC18D" />
            <text x="141" y="40" textAnchor="middle" fill="#9BC18D" fontSize="8.5" fontWeight="600">
              Anemophily (Wind-Pollinated Plants)
            </text>
            {/* Donor grass/anther */}
            <line x1="60" y1="128" x2="60" y2="70" stroke="#9BC18D" strokeWidth="1.8" />
            <circle cx="60" cy="64" r="6" fill="var(--accent-gold)" />
            {/* Wind drift */}
            <path d="M72,66 Q140,52 212,68" fill="none" stroke="var(--accent-gold)" strokeWidth="1.4" strokeDasharray="3 3" />
            <polygon points="218,70 209,64 210,72" fill="var(--accent-gold)" />
            <circle cx="116" cy="58" r="2.2" fill="var(--accent-gold)" />
            <circle cx="148" cy="60" r="2.2" fill="var(--accent-gold)" />
            <circle cx="180" cy="63" r="2.2" fill="var(--accent-gold)" />
            {/* Recipient feathery stigma */}
            <line x1="224" y1="128" x2="224" y2="74" stroke="#9BC18D" strokeWidth="1.8" />
            <path d="M224,74 L214,62 M224,74 L234,62" stroke="#9BC18D" strokeWidth="1.4" />
            <text x="141" y="100" textAnchor="middle" fill="var(--page-ink)" fontSize="7.5">
              Light dry pollen + exposed feathery stigmas
            </text>
            <text x="141" y="114" textAnchor="middle" fill="var(--page-muted)" fontSize="7.2">
              Common in wheat, rice, barley, maize &amp; pines
            </text>

            {/* Right: 15:22 Safeguard */}
            <rect x="278" y="22" width="164" height="122" rx="4" fill="var(--page-bg-secondary)" stroke="var(--accent-gold)" />
            <text x="360" y="40" textAnchor="middle" fill="var(--accent-gold)" fontSize="8" fontWeight="600">
              15:22 Interpretive Range
            </text>
            <text x="360" y="64" textAnchor="middle" fill="var(--page-ink)" fontSize="7.4">
              "Lawāqiḥ" discussed in
            </text>
            <text x="360" y="76" textAnchor="middle" fill="var(--page-ink)" fontSize="7.4">
              tafsir for BOTH:
            </text>
            <text x="360" y="96" textAnchor="middle" fill="#9BC18D" fontSize="7.3">
              • Rain/cloud winds
            </text>
            <text x="360" y="110" textAnchor="middle" fill="#9BC18D" fontSize="7.3">
              • Plant pollen dispersal
            </text>
            <text x="360" y="130" textAnchor="middle" fill="var(--page-muted)" fontSize="6.8">
              Do not restrict to anemophily
            </text>

            <text x="230" y="164" textAnchor="middle" fill="var(--page-muted)" fontSize="8">
              Many grasses use wind pollination, while many other crops rely on insects or self-pollination (FAO)
            </text>
          </svg>
        );

      case 'animal-assisted-pollination':
        return (
          <svg viewBox="0 0 460 175" className="w-full h-auto" role="img" aria-label={title}>
            {/* Left Flower */}
            <circle cx="88" cy="84" r="24" fill="#9BC18D" fillOpacity="0.22" stroke="#9BC18D" strokeWidth="1.3" />
            <circle cx="88" cy="84" r="7" fill="var(--accent-gold)" />
            <text x="88" y="124" textAnchor="middle" fill="var(--page-ink)" fontSize="8" fontWeight="600">
              Flower A (Anther Pollen)
            </text>

            {/* Pollinator flight arc */}
            <path d="M116,66 Q200,26 284,66" fill="none" stroke="var(--accent-gold)" strokeWidth="1.5" strokeDasharray="4 3" />
            <polygon points="290,69 281,69 285,61" fill="var(--accent-gold)" />
            <ellipse cx="200" cy="44" rx="12" ry="7" fill="var(--accent-gold)" fillOpacity="0.35" stroke="var(--accent-gold)" />
            <text x="200" y="28" textAnchor="middle" fill="var(--accent-gold)" fontSize="8.5" fontWeight="600">
              Bee / Pollinator Seeking Nectar
            </text>

            {/* Right Flower */}
            <circle cx="312" cy="84" r="24" fill="#9BC18D" fillOpacity="0.22" stroke="#9BC18D" strokeWidth="1.3" />
            <circle cx="312" cy="84" r="7" fill="#9BC18D" />
            <text x="312" y="124" textAnchor="middle" fill="var(--page-ink)" fontSize="8" fontWeight="600">
              Flower B (Stigma Receives)
            </text>

            {/* Scope note box */}
            <rect x="352" y="42" width="90" height="72" rx="4" fill="var(--page-bg-secondary)" stroke="var(--hairline)" />
            <text x="397" y="60" textAnchor="middle" fill="var(--page-ink)" fontSize="7.4" fontWeight="600">
              Scope Note
            </text>
            <text x="397" y="76" textAnchor="middle" fill="var(--page-muted)" fontSize="7">
              16:68–69 notes bees
            </text>
            <text x="397" y="88" textAnchor="middle" fill="var(--page-muted)" fontSize="7">
              &amp; honey; not explicit
            </text>
            <text x="397" y="100" textAnchor="middle" fill="var(--page-muted)" fontSize="7">
              pollen mechanics
            </text>

            <text x="230" y="164" textAnchor="middle" fill="var(--page-muted)" fontSize="8">
              Insects, birds, and bats pollinate many crops and wildflowers; cereals mostly rely on wind or selfing (FAO / USDA)
            </text>
          </svg>
        );

      case 'honeybee-biology-nesting':
        return (
          <svg viewBox="0 0 460 175" className="w-full h-auto" role="img" aria-label={title}>
            {/* Left: Honey processing */}
            <rect x="18" y="22" width="204" height="122" rx="4" fill="var(--page-bg-secondary)" stroke="var(--accent-gold)" />
            <text x="120" y="40" textAnchor="middle" fill="var(--accent-gold)" fontSize="8.5" fontWeight="600">
              Honeybee Nectar → Honey
            </text>
            <text x="120" y="64" textAnchor="middle" fill="var(--page-ink)" fontSize="7.5" fontWeight="600">
              1. Floral nectar collected in crop
            </text>
            <text x="120" y="84" textAnchor="middle" fill="var(--page-ink)" fontSize="7.5">
              2. Enzymes invert sucrose sugars
            </text>
            <text x="120" y="104" textAnchor="middle" fill="var(--page-ink)" fontSize="7.5">
              3. Wing fanning evaporates water
            </text>
            <text x="120" y="124" textAnchor="middle" fill="var(--page-muted)" fontSize="7">
              Stored in hexagonal beeswax cells
            </text>

            {/* Right: Nesting diversity */}
            <rect x="238" y="22" width="204" height="122" rx="4" fill="var(--page-bg-secondary)" stroke="#9BC18D" />
            <text x="340" y="40" textAnchor="middle" fill="#9BC18D" fontSize="8.5" fontWeight="600">
              Bee Nesting Diversity
            </text>
            <text x="254" y="62" fill="var(--page-ink)" fontSize="7.5" fontWeight="600">
              • Social Honeybees (Apis):
            </text>
            <text x="264" y="74" fill="var(--page-muted)" fontSize="7.2">
              Cliffs, hollow trees &amp; managed hives
            </text>
            <text x="254" y="96" fill="var(--page-ink)" fontSize="7.5" fontWeight="600">
              • Most Wild Bee Species:
            </text>
            <text x="264" y="108" fill="var(--page-muted)" fontSize="7.2">
              Solitary ground burrows or plant stems
            </text>
            <text x="264" y="126" fill="var(--accent-gold)" fontSize="7">
              (16:68–69 is not a full hive manual)
            </text>

            <text x="230" y="164" textAnchor="middle" fill="var(--page-muted)" fontSize="8">
              Honeybee biology differs from solitary wild bees; 16:68–69 does not detail all navigation or honey chemistry (USDA / FAO)
            </text>
          </svg>
        );

      case 'fruit-formation-ripening':
        return (
          <svg viewBox="0 0 460 175" className="w-full h-auto" role="img" aria-label={title}>
            {/* 3 steps */}
            <rect x="20" y="24" width="124" height="118" rx="4" fill="var(--page-bg-secondary)" stroke="var(--hairline)" />
            <text x="82" y="42" textAnchor="middle" fill="var(--page-ink)" fontSize="8.5" fontWeight="600">
              1. Flower &amp; Fruit Set
            </text>
            <circle cx="82" cy="78" r="14" fill="#9BC18D" fillOpacity="0.25" stroke="#9BC18D" />
            <circle cx="82" cy="78" r="4" fill="var(--accent-gold)" />
            <text x="82" y="112" textAnchor="middle" fill="var(--page-muted)" fontSize="7.2">
              Pollination &amp; fertilisation
            </text>
            <text x="82" y="124" textAnchor="middle" fill="var(--page-muted)" fontSize="7.2">
              initiate ovary growth
            </text>

            <text x="155" y="84" textAnchor="middle" fill="var(--accent-gold)" fontSize="13">
              &rarr;
            </text>

            <rect x="167" y="24" width="126" height="118" rx="4" fill="var(--page-bg-secondary)" stroke="#9BC18D" />
            <text x="230" y="42" textAnchor="middle" fill="#9BC18D" fontSize="8.5" fontWeight="600">
              2. Green Expansion
            </text>
            <circle cx="230" cy="78" r="18" fill="#9BC18D" fillOpacity="0.35" stroke="#9BC18D" />
            <text x="230" y="112" textAnchor="middle" fill="var(--page-muted)" fontSize="7.2">
              Cell division &amp; starch/acid
            </text>
            <text x="230" y="124" textAnchor="middle" fill="var(--page-muted)" fontSize="7.2">
              accumulation (unripe)
            </text>

            <text x="304" y="84" textAnchor="middle" fill="var(--accent-gold)" fontSize="13">
              &rarr;
            </text>

            <rect x="316" y="24" width="124" height="118" rx="4" fill="var(--page-bg-secondary)" stroke="var(--accent-gold)" />
            <text x="378" y="42" textAnchor="middle" fill="var(--accent-gold)" fontSize="8.5" fontWeight="600">
              3. Ripe Fruit
            </text>
            <circle cx="378" cy="78" r="20" fill="var(--accent-gold)" fillOpacity="0.35" stroke="var(--accent-gold)" />
            <text x="378" y="112" textAnchor="middle" fill="var(--page-ink)" fontSize="7.2">
              Sugars rise, tissues soften,
            </text>
            <text x="378" y="124" textAnchor="middle" fill="var(--page-ink)" fontSize="7.2">
              pigments &amp; aroma develop
            </text>

            <text x="230" y="164" textAnchor="middle" fill="var(--page-muted)" fontSize="8">
              Representative flowering-plant fruit cycle; aggregate, multiple, and seedless fruits follow varied developmental paths
            </text>
          </svg>
        );

      case 'fruit-diversity-traits':
        return (
          <svg viewBox="0 0 460 175" className="w-full h-auto" role="img" aria-label={title}>
            {/* Three botanical fruit types */}
            <rect x="18" y="22" width="134" height="122" rx="4" fill="var(--page-bg-secondary)" stroke="#9BC18D" />
            <text x="85" y="40" textAnchor="middle" fill="#9BC18D" fontSize="8.5" fontWeight="600">
              Olive (Oil Drupe)
            </text>
            <ellipse cx="85" cy="74" rx="14" ry="18" fill="#9BC18D" fillOpacity="0.32" stroke="#9BC18D" />
            <ellipse cx="85" cy="74" rx="5" ry="9" fill="var(--accent-gold)" fillOpacity="0.5" />
            <text x="85" y="108" textAnchor="middle" fill="var(--page-ink)" fontSize="7.2">
              Fleshy lipid mesocarp
            </text>
            <text x="85" y="120" textAnchor="middle" fill="var(--page-muted)" fontSize="7">
              surrounding hard pit
            </text>

            <rect x="163" y="22" width="134" height="122" rx="4" fill="var(--page-bg-secondary)" stroke="var(--accent-gold)" />
            <text x="230" y="40" textAnchor="middle" fill="var(--accent-gold)" fontSize="8.5" fontWeight="600">
              Grape (Cluster Berry)
            </text>
            <circle cx="222" cy="68" r="7" fill="var(--accent-gold)" fillOpacity="0.35" stroke="var(--accent-gold)" />
            <circle cx="238" cy="68" r="7" fill="var(--accent-gold)" fillOpacity="0.35" stroke="var(--accent-gold)" />
            <circle cx="230" cy="82" r="7" fill="var(--accent-gold)" fillOpacity="0.35" stroke="var(--accent-gold)" />
            <text x="230" y="108" textAnchor="middle" fill="var(--page-ink)" fontSize="7.2">
              Juicy pulp &amp; sugars
            </text>
            <text x="230" y="120" textAnchor="middle" fill="var(--page-muted)" fontSize="7">
              vary sharply across cultivars
            </text>

            <rect x="308" y="22" width="134" height="122" rx="4" fill="var(--page-bg-secondary)" stroke="var(--hairline)" />
            <text x="375" y="40" textAnchor="middle" fill="var(--page-ink)" fontSize="8.5" fontWeight="600">
              Pomegranate (Balausta)
            </text>
            <circle cx="375" cy="74" r="18" fill="var(--accent-gold)" fillOpacity="0.2" stroke="var(--accent-gold)" />
            <circle cx="369" cy="70" r="3" fill="var(--accent-gold)" />
            <circle cx="381" cy="72" r="3" fill="var(--accent-gold)" />
            <circle cx="374" cy="82" r="3" fill="var(--accent-gold)" />
            <text x="375" y="108" textAnchor="middle" fill="var(--page-ink)" fontSize="7.2">
              Leathery rind enclosing
            </text>
            <text x="375" y="120" textAnchor="middle" fill="var(--page-muted)" fontSize="7">
              fleshy outer seed coats
            </text>

            <text x="230" y="164" textAnchor="middle" fill="var(--page-muted)" fontSize="8">
              Genetic traits and ripening chemistry diversify fruit taste, texture, color, and oil/sugar content (RHS / Kew)
            </text>
          </svg>
        );

      case 'date-palm-inflorescence':
        return (
          <svg viewBox="0 0 460 175" className="w-full h-auto" role="img" aria-label={title}>
            {/* Left: Spathe & floral strands */}
            <rect x="20" y="22" width="196" height="122" rx="4" fill="var(--page-bg-secondary)" stroke="#9BC18D" />
            <text x="118" y="40" textAnchor="middle" fill="#9BC18D" fontSize="8.5" fontWeight="600">
              Emerging Spathe (Inflorescence)
            </text>
            <path d="M72,118 C66,86 84,56 116,52 C106,82 100,104 72,118 Z" fill="var(--page-bg)" stroke="var(--accent-gold)" strokeWidth="1.3" />
            <path d="M106,74 Q142,60 176,72 M102,86 Q146,80 182,92 M96,98 Q140,98 174,112" fill="none" stroke="#9BC18D" strokeWidth="1.4" />
            <text x="132" y="132" textAnchor="middle" fill="var(--page-muted)" fontSize="7.2">
              Protective spathe splits at flowering
            </text>

            {/* Right: Hanging Date Cluster */}
            <rect x="238" y="22" width="202" height="122" rx="4" fill="var(--page-bg-secondary)" stroke="var(--accent-gold)" />
            <text x="339" y="40" textAnchor="middle" fill="var(--accent-gold)" fontSize="8.5" fontWeight="600">
              Branching Date Fruit Cluster
            </text>
            <path d="M339,50 L339,66 M339,66 L310,116 M339,66 L339,120 M339,66 L368,116" stroke="#9BC18D" strokeWidth="1.3" />
            {[
              [316, 86],
              [312, 102],
              [339, 86],
              [339, 104],
              [362, 86],
              [366, 102],
            ].map(([cx, cy], idx) => (
              <ellipse key={idx} cx={cx} cy={cy} rx="5" ry="7" fill="var(--accent-gold)" fillOpacity="0.55" stroke="var(--accent-gold)" />
            ))}
            <text x="339" y="134" textAnchor="middle" fill="var(--page-muted)" fontSize="7.2">
              Maturing clusters on female palm
            </text>

            <text x="230" y="164" textAnchor="middle" fill="var(--page-muted)" fontSize="8">
              Phoenix dactylifera bears enclosed spathes and hanging clusters; Arabic "ṭalʿ" (6:99) requires lexical/tafsir verification
            </text>
          </svg>
        );

      case 'cereal-grain-structures':
        return (
          <svg viewBox="0 0 460 175" className="w-full h-auto" role="img" aria-label={title}>
            {/* Left: Wheat Spike */}
            <rect x="20" y="22" width="194" height="122" rx="4" fill="var(--page-bg-secondary)" stroke="var(--accent-gold)" />
            <text x="117" y="40" textAnchor="middle" fill="var(--accent-gold)" fontSize="8.5" fontWeight="600">
              Cereal Spike (Ear)
            </text>
            <line x1="117" y1="130" x2="117" y2="52" stroke="#9BC18D" strokeWidth="2" />
            {[62, 76, 90, 104].map((y) => (
              <g key={y}>
                <ellipse cx="105" cy={y} rx="8" ry="4.5" transform={`rotate(-25 105 ${y})`} fill="var(--accent-gold)" fillOpacity="0.45" stroke="var(--accent-gold)" />
                <ellipse cx="129" cy={y - 4} rx="8" ry="4.5" transform={`rotate(25 129 ${y - 4})`} fill="var(--accent-gold)" fillOpacity="0.45" stroke="var(--accent-gold)" />
              </g>
            ))}
            <text x="117" y="138" textAnchor="middle" fill="var(--page-muted)" fontSize="7.2">
              Compact spikelets along central rachis
            </text>

            {/* Right: Panicle & Nutrition */}
            <rect x="234" y="22" width="206" height="122" rx="4" fill="var(--page-bg-secondary)" stroke="#9BC18D" />
            <text x="337" y="40" textAnchor="middle" fill="#9BC18D" fontSize="8.5" fontWeight="600">
              Panicle &amp; Cereal Nutrition
            </text>
            <path d="M300,118 L300,66 M300,88 L280,68 M300,82 L322,64 M300,98 L322,86" fill="none" stroke="#9BC18D" strokeWidth="1.3" />
            <circle cx="280" cy="66" r="3" fill="var(--accent-gold)" />
            <circle cx="322" cy="62" r="3" fill="var(--accent-gold)" />
            <circle cx="322" cy="86" r="3" fill="var(--accent-gold)" />
            <text x="378" y="66" textAnchor="middle" fill="var(--page-ink)" fontSize="7.4" fontWeight="600">
              Wheat, Rice, Barley
            </text>
            <text x="378" y="82" textAnchor="middle" fill="var(--page-muted)" fontSize="7">
              • Endosperm starch
            </text>
            <text x="378" y="95" textAnchor="middle" fill="var(--page-muted)" fontSize="7">
              • Plant protein &amp; fiber
            </text>
            <text x="378" y="108" textAnchor="middle" fill="var(--page-muted)" fontSize="7">
              • Micronutrients
            </text>

            <text x="230" y="164" textAnchor="middle" fill="var(--page-muted)" fontSize="8">
              Cereal grasses cluster grain in spikes or panicles; exact link to 6:99 wording requires lexical and tafsir analysis (FAO)
            </text>
          </svg>
        );

      case 'soil-layers-root-interaction':
        return (
          <svg viewBox="0 0 460 175" className="w-full h-auto" role="img" aria-label={title}>
            {/* Soil horizons */}
            <rect x="24" y="54" width="412" height="28" fill="#9BC18D" fillOpacity="0.22" stroke="var(--hairline)" />
            <rect x="24" y="82" width="412" height="34" fill="var(--page-bg-secondary)" stroke="var(--hairline)" />
            <rect x="24" y="116" width="412" height="30" fill="var(--page-bg)" stroke="var(--hairline)" />

            {/* Plants */}
            <line x1="120" y1="54" x2="120" y2="24" stroke="#9BC18D" strokeWidth="2.2" />
            <ellipse cx="108" cy="34" rx="11" ry="4.5" fill="#9BC18D" fillOpacity="0.45" stroke="#9BC18D" />
            <ellipse cx="132" cy="30" rx="11" ry="4.5" fill="#9BC18D" fillOpacity="0.45" stroke="#9BC18D" />
            <path d="M120,54 L106,96 M120,54 L120,108 M120,54 L136,94" stroke="var(--accent-gold)" strokeWidth="1.3" />

            <text x="284" y="72" textAnchor="middle" fill="var(--page-ink)" fontSize="8" fontWeight="600">
              Topsoil (O/A): Organic Humus, Microbes &amp; Root Zone
            </text>
            <text x="284" y="102" textAnchor="middle" fill="var(--page-muted)" fontSize="8">
              Subsoil (B): Mineral Clay, Moisture Retention &amp; pH Buffer
            </text>
            <text x="284" y="135" textAnchor="middle" fill="var(--page-muted)" fontSize="8">
              Weathered Parent Rock (C): Drainage &amp; Mineral Supply
            </text>

            <text x="230" y="164" textAnchor="middle" fill="var(--page-muted)" fontSize="8">
              Soil texture, pH, air pores, nutrients, and moisture shape vegetation; some epiphytes/aquatics grow without soil (FAO)
            </text>
          </svg>
        );

      case 'plant-water-drought-stress':
        return (
          <svg viewBox="0 0 460 175" className="w-full h-auto" role="img" aria-label={title}>
            {/* Left: Drought stress */}
            <rect x="20" y="24" width="198" height="118" rx="4" fill="var(--page-bg-secondary)" stroke="var(--hairline)" />
            <text x="119" y="42" textAnchor="middle" fill="var(--page-muted)" fontSize="8.5" fontWeight="600">
              Drought / Low Turgor
            </text>
            <path d="M100,102 Q104,70 124,78" fill="none" stroke="var(--page-muted)" strokeWidth="2" />
            <ellipse cx="130" cy="84" rx="10" ry="4" transform="rotate(35 130 84)" fill="var(--page-muted)" fillOpacity="0.35" />
            <text x="119" y="116" textAnchor="middle" fill="var(--page-ink)" fontSize="7.4">
              Stomata close; wilting &amp;
            </text>
            <text x="119" y="128" textAnchor="middle" fill="var(--page-muted)" fontSize="7.2">
              reduced photosynthesis
            </text>

            <text x="230" y="84" textAnchor="middle" fill="var(--accent-gold)" fontSize="13">
              &rarr;
            </text>

            {/* Right: Rainfall recovery */}
            <rect x="242" y="24" width="198" height="118" rx="4" fill="var(--page-bg-secondary)" stroke="#9BC18D" />
            <text x="341" y="42" textAnchor="middle" fill="#9BC18D" fontSize="8.5" fontWeight="600">
              Rain + Root Hydration
            </text>
            <line x1="341" y1="104" x2="341" y2="62" stroke="#9BC18D" strokeWidth="2.2" />
            <ellipse cx="326" cy="70" rx="12" ry="5" fill="#9BC18D" fillOpacity="0.45" stroke="#9BC18D" />
            <ellipse cx="356" cy="66" rx="12" ry="5" fill="#9BC18D" fillOpacity="0.45" stroke="#9BC18D" />
            <text x="341" y="116" textAnchor="middle" fill="var(--page-ink)" fontSize="7.4">
              Turgor restored; yield still
            </text>
            <text x="341" y="128" textAnchor="middle" fill="var(--page-muted)" fontSize="7.2">
              depends on timing &amp; irrigation
            </text>

            <text x="230" y="164" textAnchor="middle" fill="var(--page-muted)" fontSize="8">
              Rain-fed crop productivity depends on moisture timing, storage capacity, soil fertility, and drought severity (FAO)
            </text>
          </svg>
        );

      case 'crop-growth-stages':
        return (
          <svg viewBox="0 0 460 175" className="w-full h-auto" role="img" aria-label={title}>
            <rect x="20" y="26" width="96" height="114" rx="4" fill="var(--page-bg-secondary)" stroke="var(--hairline)" />
            <text x="68" y="46" textAnchor="middle" fill="var(--accent-gold)" fontSize="8" fontWeight="600">
              1. Germination
            </text>
            <text x="68" y="76" textAnchor="middle" fill="var(--page-ink)" fontSize="7.2">
              Radicle &amp; first
            </text>
            <text x="68" y="88" textAnchor="middle" fill="var(--page-ink)" fontSize="7.2">
              shoot emerge
            </text>

            <text x="126" y="84" textAnchor="middle" fill="var(--accent-gold)" fontSize="11">
              &rarr;
            </text>

            <rect x="136" y="26" width="96" height="114" rx="4" fill="var(--page-bg-secondary)" stroke="#9BC18D" />
            <text x="184" y="46" textAnchor="middle" fill="#9BC18D" fontSize="8" fontWeight="600">
              2. Vegetative
            </text>
            <text x="184" y="76" textAnchor="middle" fill="var(--page-ink)" fontSize="7.2">
              Leaf canopy &amp;
            </text>
            <text x="184" y="88" textAnchor="middle" fill="var(--page-ink)" fontSize="7.2">
              stem growth
            </text>

            <text x="242" y="84" textAnchor="middle" fill="var(--accent-gold)" fontSize="11">
              &rarr;
            </text>

            <rect x="252" y="26" width="96" height="114" rx="4" fill="var(--page-bg-secondary)" stroke="var(--hairline)" />
            <text x="300" y="46" textAnchor="middle" fill="var(--page-ink)" fontSize="8" fontWeight="600">
              3. Flowering
            </text>
            <text x="300" y="76" textAnchor="middle" fill="var(--page-ink)" fontSize="7.2">
              Pollination &amp;
            </text>
            <text x="300" y="88" textAnchor="middle" fill="var(--page-ink)" fontSize="7.2">
              grain/fruit set
            </text>

            <text x="358" y="84" textAnchor="middle" fill="var(--accent-gold)" fontSize="11">
              &rarr;
            </text>

            <rect x="368" y="26" width="74" height="114" rx="4" fill="var(--page-bg-secondary)" stroke="var(--accent-gold)" />
            <text x="405" y="46" textAnchor="middle" fill="var(--accent-gold)" fontSize="8" fontWeight="600">
              4. Harvest
            </text>
            <text x="405" y="76" textAnchor="middle" fill="var(--page-ink)" fontSize="7.2">
              Grain fill &amp;
            </text>
            <text x="405" y="88" textAnchor="middle" fill="var(--page-ink)" fontSize="7.2">
              maturation
            </text>

            <text x="230" y="162" textAnchor="middle" fill="var(--page-muted)" fontSize="8">
              Seasonal temperature, daylight, water, and nutrients regulate crop progression across growth stages (FAO)
            </text>
          </svg>
        );

      case 'plant-diversity-forms':
        return (
          <svg viewBox="0 0 460 175" className="w-full h-auto" role="img" aria-label={title}>
            {[
              { title: 'Herbs & Grasses', sub: 'Annual grains & forage', x: 20, stroke: '#9BC18D' },
              { title: 'Vines & Shrubs', sub: 'Grapes & pomegranates', x: 128, stroke: 'var(--accent-gold)' },
              { title: 'Palms (Monocot)', sub: 'Unbranched fibrous trunk', x: 236, stroke: '#9BC18D' },
              { title: 'Woody Trees', sub: 'Olives & forest canopies', x: 344, stroke: 'var(--accent-gold)' },
            ].map((item) => (
              <g key={item.title}>
                <rect x={item.x} y="24" width="96" height="118" rx="4" fill="var(--page-bg-secondary)" stroke={item.stroke} />
                <text x={item.x + 48} y="46" textAnchor="middle" fill={item.stroke} fontSize="8" fontWeight="600">
                  {item.title}
                </text>
                <text x={item.x + 48} y="84" textAnchor="middle" fill="var(--page-ink)" fontSize="7.2">
                  {item.sub}
                </text>
                <text x={item.x + 48} y="106" textAnchor="middle" fill="var(--page-muted)" fontSize="6.8">
                  Distinct climate &amp;
                </text>
                <text x={item.x + 48} y="117" textAnchor="middle" fill="var(--page-muted)" fontSize="6.8">
                  soil adaptations
                </text>
              </g>
            ))}

            <text x="230" y="164" textAnchor="middle" fill="var(--page-muted)" fontSize="8">
              Plants adapt to arid, temperate, wetland, and orchard niches; descriptions in scripture are non-taxonomic (Kew / FAO)
            </text>
          </svg>
        );

      case 'garden-orchard-ecosystem':
        return (
          <svg viewBox="0 0 460 175" className="w-full h-auto" role="img" aria-label={title}>
            <rect x="20" y="22" width="420" height="122" rx="4" fill="var(--page-bg-secondary)" stroke="var(--hairline)" />
            {/* Orchard canopy tiers */}
            <line x1="86" y1="126" x2="86" y2="54" stroke="var(--accent-gold)" strokeWidth="2.4" />
            <path d="M58,56 Q86,36 114,56 M64,66 Q86,52 108,66" fill="none" stroke="#9BC18D" strokeWidth="1.6" />
            <text x="86" y="138" textAnchor="middle" fill="var(--page-ink)" fontSize="7.5">
              Date Palm Canopy
            </text>

            <line x1="210" y1="126" x2="210" y2="74" stroke="var(--accent-gold)" strokeWidth="2.4" />
            <circle cx="210" cy="64" r="24" fill="#9BC18D" fillOpacity="0.26" stroke="#9BC18D" />
            <text x="210" y="138" textAnchor="middle" fill="var(--page-ink)" fontSize="7.5">
              Olive &amp; Fruit Trees
            </text>

            <path d="M295,126 Q310,92 336,88 Q360,92 375,126" fill="none" stroke="var(--accent-gold)" strokeWidth="1.8" />
            <text x="335" y="138" textAnchor="middle" fill="var(--page-ink)" fontSize="7.5">
              Vines &amp; Crops
            </text>

            <text x="342" y="48" textAnchor="middle" fill="var(--accent-gold)" fontSize="8" fontWeight="600">
              Managed Agroecosystem
            </text>
            <text x="342" y="64" textAnchor="middle" fill="var(--page-muted)" fontSize="7.2">
              Water routing + pollinators
            </text>
            <text x="342" y="76" textAnchor="middle" fill="var(--page-muted)" fontSize="7.2">
              + soil humus + seasonal harvests
            </text>

            <text x="230" y="164" textAnchor="middle" fill="var(--page-muted)" fontSize="8">
              Gardens and orchards integrate perennial trees, vines, soil stewardship, and water management (FAO / RHS)
            </text>
          </svg>
        );

      case 'tree-canopy-ecosystem':
        return (
          <svg viewBox="0 0 460 175" className="w-full h-auto" role="img" aria-label={title}>
            {/* Tree */}
            <rect x="114" y="88" width="16" height="44" fill="var(--accent-gold)" fillOpacity="0.35" stroke="var(--accent-gold)" />
            <ellipse cx="122" cy="64" rx="58" ry="30" fill="#9BC18D" fillOpacity="0.28" stroke="#9BC18D" strokeWidth="1.4" />
            <path d="M122,132 L92,148 M122,132 L122,150 M122,132 L152,148" stroke="var(--accent-gold)" strokeWidth="1.3" />

            {/* Solar reflection / shade */}
            <line x1="60" y1="16" x2="88" y2="42" stroke="var(--accent-gold)" strokeWidth="1.5" />
            <text x="48" y="34" fill="var(--accent-gold)" fontSize="7.5" fontWeight="600">
              Shade
            </text>
            <text x="122" y="68" textAnchor="middle" fill="var(--page-ink)" fontSize="8" fontWeight="600">
              CO₂ Uptake &amp; O₂
            </text>

            {/* Ecosystem Services Panel */}
            <rect x="210" y="24" width="230" height="118" rx="4" fill="var(--page-bg-secondary)" stroke="var(--hairline)" />
            <text x="325" y="42" textAnchor="middle" fill="#9BC18D" fontSize="8.5" fontWeight="600">
              Ecosystem Roles of Plants &amp; Trees
            </text>
            <text x="224" y="62" fill="var(--page-ink)" fontSize="7.5">
              • Primary Producers: Fix carbon via sunlight
            </text>
            <text x="224" y="79" fill="var(--page-ink)" fontSize="7.5">
              • Canopy Shade: Moderates ground heat
            </text>
            <text x="224" y="96" fill="var(--page-ink)" fontSize="7.5">
              • Root Mats: Stabilize soil &amp; slow runoff
            </text>
            <text x="224" y="113" fill="var(--page-ink)" fontSize="7.5">
              • Habitats: Sustain food webs &amp; pollinators
            </text>

            <text x="230" y="164" textAnchor="middle" fill="var(--page-muted)" fontSize="8">
              Modern "ecosystem services" framework provides scientific context rather than a literal scriptural term (Kew / FAO)
            </text>
          </svg>
        );

      case 'grassland-forage-senescence':
        return (
          <svg viewBox="0 0 460 175" className="w-full h-auto" role="img" aria-label={title}>
            {/* Left: Lush green pasture */}
            <rect x="20" y="24" width="198" height="118" rx="4" fill="var(--page-bg-secondary)" stroke="#9BC18D" />
            <text x="119" y="42" textAnchor="middle" fill="#9BC18D" fontSize="8.5" fontWeight="600">
              1. Active Forage Growth
            </text>
            {[74, 92, 110, 128, 146, 164].map((x) => (
              <path key={x} d={`M${x},106 Q${x - 4},78 ${x + 4},62`} fill="none" stroke="#9BC18D" strokeWidth="1.8" />
            ))}
            <text x="119" y="124" textAnchor="middle" fill="var(--page-ink)" fontSize="7.5">
              Cellulose-rich grass &amp; leaves
            </text>

            <text x="230" y="84" textAnchor="middle" fill="var(--accent-gold)" fontSize="13">
              &rarr;
            </text>

            {/* Right: Drying & senescence */}
            <rect x="242" y="24" width="198" height="118" rx="4" fill="var(--page-bg-secondary)" stroke="var(--accent-gold)" />
            <text x="341" y="42" textAnchor="middle" fill="var(--accent-gold)" fontSize="8.5" fontWeight="600">
              2. Senescence &amp; Decomposition
            </text>
            {[296, 316, 336, 356, 376].map((x) => (
              <path key={x} d={`M${x},106 Q${x + 8},88 ${x + 14},94`} fill="none" stroke="var(--accent-gold)" strokeWidth="1.6" />
            ))}
            <text x="341" y="122" textAnchor="middle" fill="var(--page-muted)" fontSize="7.4">
              Chlorophyll breaks down; microbes
            </text>
            <text x="341" y="133" textAnchor="middle" fill="var(--page-muted)" fontSize="7.4">
              recycle dry litter into humus
            </text>

            <text x="230" y="164" textAnchor="middle" fill="var(--page-muted)" fontSize="8">
              Pasture supports livestock forage and undergoes seasonal senescence or drought drying (87:4–5; FAO / Kew)
            </text>
          </svg>
        );

      case 'plant-pigments-light':
        return (
          <svg viewBox="0 0 460 175" className="w-full h-auto" role="img" aria-label={title}>
            <rect x="18" y="22" width="134" height="122" rx="4" fill="var(--page-bg-secondary)" stroke="#9BC18D" />
            <text x="85" y="40" textAnchor="middle" fill="#9BC18D" fontSize="8.5" fontWeight="600">
              Chlorophylls
            </text>
            <circle cx="85" cy="74" r="18" fill="#9BC18D" fillOpacity="0.35" stroke="#9BC18D" />
            <text x="85" y="108" textAnchor="middle" fill="var(--page-ink)" fontSize="7.5">
              Green leaves
            </text>
            <text x="85" y="122" textAnchor="middle" fill="var(--page-muted)" fontSize="7">
              Primary photosynthetic
            </text>
            <text x="85" y="132" textAnchor="middle" fill="var(--page-muted)" fontSize="7">
              light capture
            </text>

            <rect x="163" y="22" width="134" height="122" rx="4" fill="var(--page-bg-secondary)" stroke="var(--accent-gold)" />
            <text x="230" y="40" textAnchor="middle" fill="var(--accent-gold)" fontSize="8.5" fontWeight="600">
              Carotenoids
            </text>
            <circle cx="230" cy="74" r="18" fill="var(--accent-gold)" fillOpacity="0.35" stroke="var(--accent-gold)" />
            <text x="230" y="108" textAnchor="middle" fill="var(--page-ink)" fontSize="7.5">
              Yellow &amp; orange
            </text>
            <text x="230" y="122" textAnchor="middle" fill="var(--page-muted)" fontSize="7">
              Fruits, blossoms &amp;
            </text>
            <text x="230" y="132" textAnchor="middle" fill="var(--page-muted)" fontSize="7">
              photoprotection
            </text>

            <rect x="308" y="22" width="134" height="122" rx="4" fill="var(--page-bg-secondary)" stroke="var(--hairline)" />
            <text x="375" y="40" textAnchor="middle" fill="var(--page-ink)" fontSize="8.5" fontWeight="600">
              Anthocyanins
            </text>
            <circle cx="375" cy="74" r="18" fill="#9E2A2B" fillOpacity="0.35" stroke="#C87A7A" />
            <text x="375" y="108" textAnchor="middle" fill="var(--page-ink)" fontSize="7.5">
              Red, purple &amp; blue
            </text>
            <text x="375" y="122" textAnchor="middle" fill="var(--page-muted)" fontSize="7">
              Attracts pollinators &amp;
            </text>
            <text x="375" y="132" textAnchor="middle" fill="var(--page-muted)" fontSize="7">
              seed dispersers
            </text>

            <text x="230" y="164" textAnchor="middle" fill="var(--page-muted)" fontSize="8">
              Plant colors reflect pigments, cellular structure, pH, and ripening stage; pigments are not named in 35:27 or 39:21 (RHS)
            </text>
          </svg>
        );
    }
  };

  return (
    <figure className="my-2.5 p-3 border border-[var(--gold-hairline)] bg-[var(--page-bg-secondary)]/55 rounded-sm">
      <div className="flex items-center justify-between gap-2 pb-1.5 mb-2 border-b border-[var(--hairline)]">
        <span className="text-[11px] uppercase tracking-[0.16em] text-[var(--accent-gold)] font-semibold">
          Botanical Diagram · {title}
        </span>
        <span className="text-[10px] uppercase tracking-[0.14em] text-[#9BC18D]">
          Plant Science Reference
        </span>
      </div>

      <div className="w-full overflow-hidden">{renderSvg()}</div>

      <figcaption className="mt-2 pt-1.5 border-t border-[var(--hairline)] font-editorial italic text-xs text-[var(--page-muted)] leading-snug">
        {caption}
      </figcaption>
    </figure>
  );
};
