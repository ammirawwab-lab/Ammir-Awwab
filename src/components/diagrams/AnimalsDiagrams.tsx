import React from 'react';
import { AnimalsDiagramKind } from '../../types/encyclopedia';

interface AnimalsDiagramProps {
  kind: AnimalsDiagramKind;
  title: string;
  caption: string;
}

export const AnimalsDiagram: React.FC<AnimalsDiagramProps> = ({
  kind,
  title,
  caption,
}) => {
  const renderSvg = () => {
    switch (kind) {
      case 'animal-biodiversity-classification':
        return (
          <svg viewBox="0 0 460 175" className="w-full h-auto" role="img" aria-label={title}>
            <rect x="16" y="18" width="132" height="132" rx="3" fill="var(--page-bg-secondary)" stroke="var(--hairline)" />
            <text x="82" y="36" textAnchor="middle" fill="var(--accent-gold)" fontSize="9" fontWeight="700">
              Ecological Scales
            </text>
            <circle cx="82" cy="92" r="46" fill="none" stroke="var(--accent-gold)" strokeDasharray="3 2" />
            <circle cx="82" cy="92" r="32" fill="none" stroke="#A4B882" />
            <circle cx="82" cy="92" r="16" fill="#A4B882" fillOpacity="0.22" stroke="#A4B882" />
            <text x="82" y="95" textAnchor="middle" fill="var(--page-ink)" fontSize="7">
              Population
            </text>
            <text x="82" y="70" textAnchor="middle" fill="#A4B882" fontSize="7">
              Community
            </text>
            <text x="82" y="54" textAnchor="middle" fill="var(--page-muted)" fontSize="6.5">
              Ecosystem
            </text>

            <rect x="164" y="18" width="280" height="132" rx="3" fill="var(--page-bg-secondary)" stroke="var(--hairline)" />
            <text x="304" y="36" textAnchor="middle" fill="var(--accent-gold)" fontSize="9" fontWeight="700">
              Animal Body Plan &amp; Ecological Diversity (Background)
            </text>
            <rect x="178" y="48" width="120" height="40" rx="2" fill="var(--page-bg)" stroke="var(--hairline)" />
            <text x="238" y="64" textAnchor="middle" fill="#A4B882" fontSize="8" fontWeight="600">
              Invertebrates
            </text>
            <text x="238" y="77" textAnchor="middle" fill="var(--page-muted)" fontSize="7">
              Arthropods · Molluscs · Annelids
            </text>

            <rect x="310" y="48" width="120" height="40" rx="2" fill="var(--page-bg)" stroke="var(--hairline)" />
            <text x="370" y="64" textAnchor="middle" fill="var(--accent-gold)" fontSize="8" fontWeight="600">
              Vertebrates
            </text>
            <text x="370" y="77" textAnchor="middle" fill="var(--page-muted)" fontSize="7">
              Fishes · Amphibians · Reptiles · Birds · Mammals
            </text>

            <rect x="178" y="98" width="252" height="42" rx="2" fill="var(--page-bg)" stroke="var(--hairline)" />
            <text x="304" y="115" textAnchor="middle" fill="var(--page-ink)" fontSize="8" fontWeight="600">
              Phenotypic, Genetic &amp; Behavioural Variation
            </text>
            <text x="304" y="129" textAnchor="middle" fill="var(--page-muted)" fontSize="7">
              Pigments &amp; structural colours · Solitary vs. social species
            </text>
          </svg>
        );

      case 'animal-habitat-diversity':
        return (
          <svg viewBox="0 0 460 175" className="w-full h-auto" role="img" aria-label={title}>
            <rect x="16" y="18" width="102" height="134" rx="3" fill="var(--page-bg-secondary)" stroke="var(--hairline)" />
            <text x="67" y="36" textAnchor="middle" fill="#A4B882" fontSize="8.5" fontWeight="700">
              Forests &amp; Grasslands
            </text>
            <path d="M40,118 L54,78 L68,118 M68,118 L82,84 L96,118" fill="none" stroke="#A4B882" strokeWidth="1.6" />
            <text x="67" y="136" textAnchor="middle" fill="var(--page-muted)" fontSize="7">
              Canopy · Grazing niches
            </text>

            <rect x="124" y="18" width="102" height="134" rx="3" fill="var(--page-bg-secondary)" stroke="var(--hairline)" />
            <text x="175" y="36" textAnchor="middle" fill="var(--accent-gold)" fontSize="8.5" fontWeight="700">
              Arid Deserts
            </text>
            <path d="M134,116 Q160,94 184,110 T216,106" fill="none" stroke="var(--accent-gold)" strokeWidth="1.6" />
            <text x="175" y="136" textAnchor="middle" fill="var(--page-muted)" fontSize="7">
              Thermal &amp; water stress
            </text>

            <rect x="232" y="18" width="102" height="134" rx="3" fill="var(--page-bg-secondary)" stroke="var(--hairline)" />
            <text x="283" y="36" textAnchor="middle" fill="#8FB4D4" fontSize="8.5" fontWeight="700">
              Freshwater
            </text>
            <path d="M244,98 Q264,88 284,98 T322,98" fill="none" stroke="#8FB4D4" strokeWidth="1.6" />
            <path d="M244,112 Q264,102 284,112 T322,112" fill="none" stroke="#8FB4D4" strokeWidth="1.2" />
            <text x="283" y="136" textAnchor="middle" fill="var(--page-muted)" fontSize="7">
              Osmotic &amp; flow balance
            </text>

            <rect x="340" y="18" width="104" height="134" rx="3" fill="var(--page-bg-secondary)" stroke="var(--hairline)" />
            <text x="392" y="36" textAnchor="middle" fill="#7EB8AE" fontSize="8.5" fontWeight="700">
              Marine Zones
            </text>
            <line x1="352" y1="68" x2="432" y2="68" stroke="#7EB8AE" strokeWidth="1.5" />
            <line x1="352" y1="100" x2="432" y2="100" stroke="#7EB8AE" strokeDasharray="3 2" />
            <text x="392" y="86" textAnchor="middle" fill="var(--page-ink)" fontSize="7">
              Pelagic &amp; Reefs
            </text>
            <text x="392" y="136" textAnchor="middle" fill="var(--page-muted)" fontSize="7">
              Gills · Buoyancy · Pressure
            </text>
          </svg>
        );

      case 'animal-body-water-biology':
        return (
          <svg viewBox="0 0 460 175" className="w-full h-auto" role="img" aria-label={title}>
            <circle cx="118" cy="88" r="56" fill="var(--page-bg-secondary)" stroke="var(--accent-gold)" strokeWidth="1.4" />
            <circle cx="118" cy="88" r="30" fill="#7EB8AE" fillOpacity="0.18" stroke="#7EB8AE" />
            <text x="118" y="85" textAnchor="middle" fill="var(--page-ink)" fontSize="9" fontWeight="700">
              H₂O Solvent
            </text>
            <text x="118" y="99" textAnchor="middle" fill="var(--page-muted)" fontSize="7">
              Intra &amp; Extracellular
            </text>

            <rect x="200" y="20" width="242" height="30" rx="2" fill="var(--page-bg-secondary)" stroke="var(--hairline)" />
            <text x="212" y="39" fill="var(--accent-gold)" fontSize="8.5" fontWeight="600">
              1. Metabolism &amp; Enzymatic Reactions
            </text>
            <rect x="200" y="56" width="242" height="30" rx="2" fill="var(--page-bg-secondary)" stroke="var(--hairline)" />
            <text x="212" y="75" fill="#A4B882" fontSize="8.5" fontWeight="600">
              2. Circulation, Nutrient Transport &amp; Excretion
            </text>
            <rect x="200" y="92" width="242" height="30" rx="2" fill="var(--page-bg-secondary)" stroke="var(--hairline)" />
            <text x="212" y="111" fill="var(--page-ink)" fontSize="8.5" fontWeight="600">
              3. Thermal Buffering &amp; Osmotic Balance
            </text>
            <rect x="200" y="128" width="242" height="30" rx="2" fill="var(--page-bg-secondary)" stroke="var(--hairline)" />
            <text x="212" y="147" fill="var(--page-muted)" fontSize="8">
              Integumentary collagen &amp; keratin barriers limit water loss
            </text>
          </svg>
        );

      case 'terrestrial-locomotion-forms':
        return (
          <svg viewBox="0 0 460 175" className="w-full h-auto" role="img" aria-label={title}>
            <rect x="16" y="18" width="138" height="134" rx="3" fill="var(--page-bg-secondary)" stroke="var(--hairline)" />
            <text x="85" y="36" textAnchor="middle" fill="#A4B882" fontSize="8.5" fontWeight="700">
              Limbless Undulation
            </text>
            <path d="M36,92 Q56,66 76,92 T116,92 T138,84" fill="none" stroke="#A4B882" strokeWidth="3" strokeLinecap="round" />
            <text x="85" y="130" textAnchor="middle" fill="var(--page-muted)" fontSize="7">
              Lateral push vs. substrate
            </text>

            <rect x="162" y="18" width="138" height="134" rx="3" fill="var(--page-bg-secondary)" stroke="var(--hairline)" />
            <text x="231" y="36" textAnchor="middle" fill="var(--accent-gold)" fontSize="8.5" fontWeight="700">
              Bipedal &amp; Quadrupedal
            </text>
            <line x1="196" y1="74" x2="266" y2="74" stroke="var(--accent-gold)" strokeWidth="2.4" />
            <line x1="204" y1="74" x2="196" y2="112" stroke="var(--accent-gold)" strokeWidth="2" />
            <line x1="258" y1="74" x2="266" y2="112" stroke="var(--accent-gold)" strokeWidth="2" />
            <line x1="180" y1="114" x2="284" y2="114" stroke="var(--hairline)" />
            <text x="231" y="130" textAnchor="middle" fill="var(--page-muted)" fontSize="7">
              Jointed skeletal levers
            </text>

            <rect x="308" y="18" width="136" height="134" rx="3" fill="var(--page-bg-secondary)" stroke="var(--hairline)" />
            <text x="376" y="36" textAnchor="middle" fill="var(--page-ink)" fontSize="8.5" fontWeight="700">
              Other Modalities
            </text>
            <text x="376" y="68" textAnchor="middle" fill="var(--page-muted)" fontSize="7.5">
              6-legged hexapod gaits
            </text>
            <text x="376" y="88" textAnchor="middle" fill="var(--page-muted)" fontSize="7.5">
              8-legged arachnid stepping
            </text>
            <text x="376" y="108" textAnchor="middle" fill="var(--page-muted)" fontSize="7.5">
              Fins, jet propulsion, wings
            </text>
            <text x="376" y="130" textAnchor="middle" fill="var(--accent-gold)" fontSize="7">
              Exceeds 3-group summary
            </text>
          </svg>
        );

      case 'bird-wing-anatomy':
        return (
          <svg viewBox="0 0 460 175" className="w-full h-auto" role="img" aria-label={title}>
            <rect x="18" y="18" width="246" height="134" rx="3" fill="var(--page-bg-secondary)" stroke="var(--hairline)" />
            <text x="141" y="36" textAnchor="middle" fill="var(--accent-gold)" fontSize="9" fontWeight="700">
              Avian Wing &amp; Feather Zones
            </text>
            <path d="M36,96 Q106,54 242,74 Q198,114 118,118 Q68,120 36,96 Z" fill="#A4B882" fillOpacity="0.2" stroke="#A4B882" strokeWidth="1.5" />
            <line x1="42" y1="92" x2="176" y2="74" stroke="var(--accent-gold)" strokeWidth="2.4" />
            <text x="192" y="96" fill="var(--page-ink)" fontSize="7.5">
              Primaries (Thrust)
            </text>
            <text x="72" y="106" fill="var(--page-muted)" fontSize="7.5">
              Secondaries (Lift)
            </text>
            <text x="110" y="64" fill="var(--accent-gold)" fontSize="7">
              Hollow Pneumatic Bone
            </text>

            <rect x="276" y="18" width="166" height="134" rx="3" fill="var(--page-bg-secondary)" stroke="var(--hairline)" />
            <text x="359" y="36" textAnchor="middle" fill="var(--accent-gold)" fontSize="9" fontWeight="700">
              Cambered Airfoil Profile
            </text>
            <path d="M294,88 Q340,60 420,90 Q350,94 294,88 Z" fill="var(--accent-gold)" fillOpacity="0.28" stroke="var(--accent-gold)" strokeWidth="1.4" />
            <path d="M286,70 L422,70" fill="none" stroke="#8FB4D4" strokeWidth="1.2" strokeDasharray="3 2" />
            <text x="359" y="64" textAnchor="middle" fill="#8FB4D4" fontSize="7">
              Lower pressure above cambered wing
            </text>
            <text x="359" y="114" textAnchor="middle" fill="var(--page-muted)" fontSize="7">
              Keeled sternum anchors pectoral muscles
            </text>
          </svg>
        );

      case 'bird-flight-aerodynamics':
        return (
          <svg viewBox="0 0 460 175" className="w-full h-auto" role="img" aria-label={title}>
            <rect x="20" y="18" width="420" height="134" rx="3" fill="var(--page-bg-secondary)" stroke="var(--hairline)" />
            <path d="M168,88 Q228,66 294,86 Q230,98 168,88 Z" fill="var(--accent-gold)" fillOpacity="0.25" stroke="var(--accent-gold)" strokeWidth="1.5" />
            {/* Lift Up */}
            <line x1="230" y1="78" x2="230" y2="34" stroke="#A4B882" strokeWidth="2.2" />
            <polygon points="230,28 225,38 235,38" fill="#A4B882" />
            <text x="242" y="42" fill="#A4B882" fontSize="8.5" fontWeight="700">
              LIFT (Wing Airfoil &amp; Angle)
            </text>

            {/* Weight Down */}
            <line x1="230" y1="96" x2="230" y2="136" stroke="#C8826B" strokeWidth="2.2" />
            <polygon points="230,142 225,132 235,132" fill="#C8826B" />
            <text x="242" y="136" fill="#C8826B" fontSize="8.5" fontWeight="700">
              WEIGHT (Gravity)
            </text>

            {/* Thrust Left */}
            <line x1="168" y1="88" x2="108" y2="88" stroke="var(--accent-gold)" strokeWidth="2.2" />
            <polygon points="100,88 110,83 110,93" fill="var(--accent-gold)" />
            <text x="34" y="84" fill="var(--accent-gold)" fontSize="8.5" fontWeight="700">
              THRUST
            </text>
            <text x="34" y="96" fill="var(--page-muted)" fontSize="7">
              Flapping stroke
            </text>

            {/* Drag Right */}
            <line x1="296" y1="88" x2="356" y2="88" stroke="var(--page-muted)" strokeWidth="2.2" />
            <polygon points="364,88 354,83 354,93" fill="var(--page-muted)" />
            <text x="370" y="84" fill="var(--page-ink)" fontSize="8.5" fontWeight="700">
              DRAG
            </text>
            <text x="370" y="96" fill="var(--page-muted)" fontSize="7">
              Air resistance
            </text>
          </svg>
        );

      case 'bird-flocking-formations':
        return (
          <svg viewBox="0 0 460 175" className="w-full h-auto" role="img" aria-label={title}>
            <rect x="18" y="18" width="210" height="134" rx="3" fill="var(--page-bg-secondary)" stroke="var(--hairline)" />
            <text x="123" y="36" textAnchor="middle" fill="var(--accent-gold)" fontSize="8.5" fontWeight="700">
              V-Formation Wingtip Upwash
            </text>
            <path d="M123,54 L117,60 M123,54 L129,60" stroke="var(--accent-gold)" strokeWidth="2" />
            <path d="M98,74 L92,80 M98,74 L104,80 M148,74 L142,80 M148,74 L154,80" stroke="#A4B882" strokeWidth="1.8" />
            <path d="M73,94 L67,100 M73,94 L79,100 M173,94 L167,100 M173,94 L179,100" stroke="#A4B882" strokeWidth="1.8" />
            <path d="M48,114 L42,120 M48,114 L54,120 M198,114 L192,120 M198,114 L204,120" stroke="#A4B882" strokeWidth="1.8" />
            <text x="123" y="138" textAnchor="middle" fill="var(--page-muted)" fontSize="7">
              Trailing birds catch upward air vortex
            </text>

            <rect x="238" y="18" width="204" height="134" rx="3" fill="var(--page-bg-secondary)" stroke="var(--hairline)" />
            <text x="340" y="36" textAnchor="middle" fill="var(--accent-gold)" fontSize="8.5" fontWeight="700">
              Local Spacing &amp; Orientation Rules
            </text>
            <text x="254" y="64" fill="var(--page-ink)" fontSize="8" fontWeight="600">
              • Visual neighbour alignment
            </text>
            <text x="254" y="84" fill="var(--page-ink)" fontSize="8" fontWeight="600">
              • Collision avoidance spacing
            </text>
            <text x="254" y="106" fill="var(--page-muted)" fontSize="7.5">
              Migration cues (species-dependent):
            </text>
            <text x="254" y="122" fill="#A4B882" fontSize="7.5">
              Photoperiod · Sun/stars · Geomagnetic cues
            </text>
          </svg>
        );

      case 'bird-vocal-communication':
        return (
          <svg viewBox="0 0 460 175" className="w-full h-auto" role="img" aria-label={title}>
            <rect x="18" y="18" width="200" height="134" rx="3" fill="var(--page-bg-secondary)" stroke="var(--hairline)" />
            <text x="118" y="36" textAnchor="middle" fill="var(--accent-gold)" fontSize="8.5" fontWeight="700">
              Avian Syrinx &amp; Acoustic Waves
            </text>
            <line x1="64" y1="62" x2="64" y2="96" stroke="var(--page-ink)" strokeWidth="2.5" />
            <line x1="64" y1="96" x2="46" y2="120" stroke="#A4B882" strokeWidth="2" />
            <line x1="64" y1="96" x2="82" y2="120" stroke="#A4B882" strokeWidth="2" />
            <circle cx="64" cy="96" r="8" fill="var(--accent-gold)" fillOpacity="0.4" stroke="var(--accent-gold)" />
            <text x="92" y="99" fill="var(--accent-gold)" fontSize="7.5" fontWeight="600">
              Syrinx (tracheal fork)
            </text>
            <path d="M126,64 Q142,56 142,72 Q142,88 126,80" fill="none" stroke="#8FB4D4" strokeWidth="1.4" />
            <path d="M152,58 Q174,48 174,72 Q174,96 152,86" fill="none" stroke="#8FB4D4" strokeWidth="1.4" />

            <rect x="228" y="18" width="214" height="134" rx="3" fill="var(--page-bg-secondary)" stroke="var(--hairline)" />
            <text x="335" y="36" textAnchor="middle" fill="var(--accent-gold)" fontSize="8.5" fontWeight="700">
              Empirical Signal Functions
            </text>
            <text x="244" y="64" fill="var(--page-ink)" fontSize="8">
              1. Predator alarm &amp; mobbing calls
            </text>
            <text x="244" y="86" fill="var(--page-ink)" fontSize="8">
              2. Territorial song &amp; mate attraction
            </text>
            <text x="244" y="108" fill="var(--page-ink)" fontSize="8">
              3. Parent–chick contact &amp; flock cohesion
            </text>
            <text x="244" y="132" fill="var(--page-muted)" fontSize="7">
              Distinct from theological/prophetic narrative framing
            </text>
          </svg>
        );

      case 'ant-colony-organisation':
        return (
          <svg viewBox="0 0 460 175" className="w-full h-auto" role="img" aria-label={title}>
            <rect x="18" y="18" width="424" height="134" rx="3" fill="var(--page-bg-secondary)" stroke="var(--hairline)" />
            <line x1="24" y1="54" x2="436" y2="54" stroke="var(--accent-gold)" strokeWidth="1.5" />
            <text x="120" y="42" fill="#A4B882" fontSize="8" fontWeight="600">
              Foraging Trails Above Ground
            </text>
            <path d="M140,54 L140,86 L92,102 M140,86 L186,112 L252,112" fill="none" stroke="var(--accent-gold)" strokeWidth="2.2" />
            <ellipse cx="90" cy="108" rx="28" ry="14" fill="var(--page-bg)" stroke="var(--hairline)" />
            <text x="90" y="111" textAnchor="middle" fill="var(--page-ink)" fontSize="7.5">
              Brood Gallery
            </text>
            <ellipse cx="256" cy="112" rx="34" ry="15" fill="var(--page-bg)" stroke="var(--accent-gold)" />
            <text x="256" y="115" textAnchor="middle" fill="var(--accent-gold)" fontSize="7.5" fontWeight="600">
              Queen Chamber
            </text>

            <text x="316" y="76" fill="var(--page-ink)" fontSize="8" fontWeight="600">
              Eusocial Colony Roles:
            </text>
            <text x="316" y="94" fill="var(--page-muted)" fontSize="7.5">
              • Queen: egg laying
            </text>
            <text x="316" y="110" fill="var(--page-muted)" fontSize="7.5">
              • Workers: foraging, brood, nest
            </text>
            <text x="316" y="126" fill="var(--page-muted)" fontSize="7.5">
              • Decentralised coordination
            </text>
          </svg>
        );

      case 'ant-chemical-signalling':
        return (
          <svg viewBox="0 0 460 175" className="w-full h-auto" role="img" aria-label={title}>
            <rect x="18" y="18" width="424" height="134" rx="3" fill="var(--page-bg-secondary)" stroke="var(--hairline)" />
            <text x="230" y="38" textAnchor="middle" fill="var(--accent-gold)" fontSize="9" fontWeight="700">
              Ant Pheromone Trail &amp; Antennal Reception (Entomology Background)
            </text>
            <path d="M54,108 Q150,74 246,108 T404,96" fill="none" stroke="#A4B882" strokeWidth="2" strokeDasharray="5 3" />
            <circle cx="82" cy="96" r="7" fill="var(--accent-gold)" fillOpacity="0.4" stroke="var(--accent-gold)" />
            <text x="82" y="76" textAnchor="middle" fill="var(--page-ink)" fontSize="7.5">
              Scout Deposits
            </text>
            <text x="82" y="86" textAnchor="middle" fill="var(--page-muted)" fontSize="7">
              Exocrine Trail
            </text>

            <circle cx="246" cy="108" r="7" fill="#A4B882" fillOpacity="0.4" stroke="#A4B882" />
            <text x="246" y="88" textAnchor="middle" fill="var(--page-ink)" fontSize="7.5">
              Antennal Chemoreceptors
            </text>

            <circle cx="388" cy="98" r="10" fill="var(--accent-gold)" fillOpacity="0.25" stroke="var(--accent-gold)" />
            <text x="388" y="124" textAnchor="middle" fill="var(--accent-gold)" fontSize="7.5" fontWeight="600">
              Food / Resource
            </text>
            <text x="230" y="140" textAnchor="middle" fill="var(--page-muted)" fontSize="7">
              Note: Qur’an 27:18 does not explicitly name pheromones or neural pathways
            </text>
          </svg>
        );

      case 'social-insect-collective-defence':
        return (
          <svg viewBox="0 0 460 175" className="w-full h-auto" role="img" aria-label={title}>
            <rect x="18" y="18" width="424" height="134" rx="3" fill="var(--page-bg-secondary)" stroke="var(--hairline)" />
            <circle cx="110" cy="86" r="16" fill="#C8826B" fillOpacity="0.25" stroke="#C8826B" />
            <circle cx="110" cy="86" r="32" fill="none" stroke="#C8826B" strokeDasharray="3 2" />
            <circle cx="110" cy="86" r="46" fill="none" stroke="#C8826B" strokeOpacity="0.5" strokeDasharray="2 3" />
            <text x="110" y="89" textAnchor="middle" fill="#C8826B" fontSize="8" fontWeight="700">
              Alarm Cue
            </text>

            <line x1="164" y1="72" x2="246" y2="56" stroke="var(--accent-gold)" strokeWidth="1.6" />
            <line x1="164" y1="100" x2="246" y2="116" stroke="#A4B882" strokeWidth="1.6" />

            <rect x="252" y="36" width="174" height="44" rx="2" fill="var(--page-bg)" stroke="var(--hairline)" />
            <text x="339" y="54" textAnchor="middle" fill="var(--accent-gold)" fontSize="8" fontWeight="600">
              Path A: Nest Entry / Retreat
            </text>
            <text x="339" y="68" textAnchor="middle" fill="var(--page-muted)" fontSize="7">
              Brood &amp; workers shelter inside
            </text>

            <rect x="252" y="92" width="174" height="44" rx="2" fill="var(--page-bg)" stroke="var(--hairline)" />
            <text x="339" y="110" textAnchor="middle" fill="#A4B882" fontSize="8" fontWeight="600">
              Path B: Collective Defence
            </text>
            <text x="339" y="124" textAnchor="middle" fill="var(--page-muted)" fontSize="7">
              Soldiers guard entrance perimeter
            </text>
          </svg>
        );

      case 'honeybee-colony-castes':
        return (
          <svg viewBox="0 0 460 175" className="w-full h-auto" role="img" aria-label={title}>
            <rect x="18" y="18" width="170" height="134" rx="3" fill="var(--page-bg-secondary)" stroke="var(--hairline)" />
            <text x="103" y="36" textAnchor="middle" fill="var(--accent-gold)" fontSize="8.5" fontWeight="700">
              Hexagonal Wax Comb
            </text>
            <polygon points="74,62 90,53 106,62 106,80 90,89 74,80" fill="var(--accent-gold)" fillOpacity="0.24" stroke="var(--accent-gold)" />
            <polygon points="106,62 122,53 138,62 138,80 122,89 106,80" fill="#A4B882" fillOpacity="0.2" stroke="var(--accent-gold)" />
            <polygon points="90,89 106,80 122,89 122,107 106,116 90,107" fill="var(--accent-gold)" fillOpacity="0.35" stroke="var(--accent-gold)" />
            <text x="103" y="136" textAnchor="middle" fill="var(--page-muted)" fontSize="7">
              Cavities · Trees · Managed Hives
            </text>

            <rect x="198" y="18" width="244" height="134" rx="3" fill="var(--page-bg-secondary)" stroke="var(--hairline)" />
            <text x="320" y="36" textAnchor="middle" fill="var(--accent-gold)" fontSize="8.5" fontWeight="700">
              Eusocial Honeybee Castes (Apis)
            </text>
            <rect x="212" y="48" width="216" height="26" rx="2" fill="var(--page-bg)" stroke="var(--hairline)" />
            <text x="222" y="65" fill="var(--accent-gold)" fontSize="8" fontWeight="600">
              Queen: Reproductive female (lays eggs)
            </text>
            <rect x="212" y="80" width="216" height="26" rx="2" fill="var(--page-bg)" stroke="var(--hairline)" />
            <text x="222" y="97" fill="#A4B882" fontSize="8" fontWeight="600">
              Workers: Nurse, build comb, guard &amp; forage
            </text>
            <rect x="212" y="112" width="216" height="26" rx="2" fill="var(--page-bg)" stroke="var(--hairline)" />
            <text x="222" y="129" fill="var(--page-muted)" fontSize="7.5">
              Drones: Haploid males (note: many wild bees are solitary)
            </text>
          </svg>
        );

      case 'honeybee-foraging-navigation':
        return (
          <svg viewBox="0 0 460 175" className="w-full h-auto" role="img" aria-label={title}>
            <rect x="18" y="18" width="424" height="134" rx="3" fill="var(--page-bg-secondary)" stroke="var(--hairline)" />
            <circle cx="80" cy="48" r="14" fill="var(--accent-gold)" fillOpacity="0.35" stroke="var(--accent-gold)" />
            <text x="80" y="51" textAnchor="middle" fill="var(--page-ink)" fontSize="7.5" fontWeight="700">
              Sun
            </text>
            <rect x="44" y="100" width="54" height="36" rx="2" fill="var(--page-bg)" stroke="var(--accent-gold)" />
            <text x="71" y="121" textAnchor="middle" fill="var(--accent-gold)" fontSize="8" fontWeight="600">
              Hive
            </text>

            <path d="M98,118 Q220,70 356,112" fill="none" stroke="#A4B882" strokeWidth="1.8" strokeDasharray="4 3" />
            <circle cx="378" cy="112" r="18" fill="#A4B882" fillOpacity="0.25" stroke="#A4B882" />
            <text x="378" y="115" textAnchor="middle" fill="var(--page-ink)" fontSize="7.5" fontWeight="600">
              Flowers
            </text>
            <line x1="92" y1="58" x2="210" y2="88" stroke="var(--accent-gold)" strokeDasharray="2 2" />
            <text x="228" y="56" fill="var(--page-ink)" fontSize="8" fontWeight="600">
              Time-Compensated Sun Compass + Skylight Polarisation
            </text>
            <text x="228" y="72" fill="var(--page-muted)" fontSize="7.5">
              Visual landmarks + Waggle dance vector sharing
            </text>
            <text x="228" y="140" textAnchor="middle" fill="var(--page-muted)" fontSize="7">
              Scientific navigation context (not explicitly detailed in Qur’an 16:69)
            </text>
          </svg>
        );

      case 'bee-flower-pollination':
        return (
          <svg viewBox="0 0 460 175" className="w-full h-auto" role="img" aria-label={title}>
            <rect x="18" y="18" width="204" height="134" rx="3" fill="var(--page-bg-secondary)" stroke="var(--hairline)" />
            <text x="120" y="36" textAnchor="middle" fill="var(--accent-gold)" fontSize="8.5" fontWeight="700">
              Flower A (Pollen Uptake)
            </text>
            <circle cx="120" cy="86" r="24" fill="#A4B882" fillOpacity="0.2" stroke="#A4B882" />
            <circle cx="120" cy="86" r="9" fill="var(--accent-gold)" fillOpacity="0.5" stroke="var(--accent-gold)" />
            <text x="120" y="128" textAnchor="middle" fill="var(--page-muted)" fontSize="7.5">
              Nectary + Pollen on Anthers
            </text>

            <rect x="238" y="18" width="204" height="134" rx="3" fill="var(--page-bg-secondary)" stroke="var(--hairline)" />
            <text x="340" y="36" textAnchor="middle" fill="var(--accent-gold)" fontSize="8.5" fontWeight="700">
              Flower B (Pollen Transfer)
            </text>
            <circle cx="340" cy="86" r="24" fill="#A4B882" fillOpacity="0.2" stroke="#A4B882" />
            <circle cx="340" cy="86" r="9" fill="var(--accent-gold)" fillOpacity="0.5" stroke="var(--accent-gold)" />
            <text x="340" y="128" textAnchor="middle" fill="var(--page-muted)" fontSize="7.5">
              Stigma Receives Pollen Grains
            </text>

            <path d="M148,72 Q230,38 312,72" fill="none" stroke="var(--accent-gold)" strokeWidth="1.8" strokeDasharray="4 2" />
            <text x="230" y="48" textAnchor="middle" fill="var(--accent-gold)" fontSize="7.5" fontWeight="600">
              Bee Foraging Flight
            </text>
          </svg>
        );

      case 'honey-enzymatic-formation':
        return (
          <svg viewBox="0 0 460 175" className="w-full h-auto" role="img" aria-label={title}>
            <rect x="18" y="24" width="128" height="106" rx="3" fill="var(--page-bg-secondary)" stroke="var(--hairline)" />
            <text x="82" y="44" textAnchor="middle" fill="#A4B882" fontSize="8.5" fontWeight="700">
              1. Nectar Uptake
            </text>
            <text x="82" y="72" textAnchor="middle" fill="var(--page-ink)" fontSize="7.5">
              Sucrose-rich floral
            </text>
            <text x="82" y="86" textAnchor="middle" fill="var(--page-ink)" fontSize="7.5">
              nectar held in bee crop
            </text>
            <text x="82" y="110" textAnchor="middle" fill="var(--page-muted)" fontSize="7">
              Botanical origin varies
            </text>

            <line x1="150" y1="76" x2="164" y2="76" stroke="var(--accent-gold)" strokeWidth="2" />

            <rect x="166" y="24" width="128" height="106" rx="3" fill="var(--page-bg-secondary)" stroke="var(--hairline)" />
            <text x="230" y="44" textAnchor="middle" fill="var(--accent-gold)" fontSize="8.5" fontWeight="700">
              2. Enzymatic Inversion
            </text>
            <text x="230" y="72" textAnchor="middle" fill="var(--page-ink)" fontSize="7.5">
              Invertase splits sucrose
            </text>
            <text x="230" y="86" textAnchor="middle" fill="var(--page-ink)" fontSize="7.5">
              → Glucose + Fructose
            </text>
            <text x="230" y="110" textAnchor="middle" fill="var(--page-muted)" fontSize="7">
              Plus minor acids/enzymes
            </text>

            <line x1="298" y1="76" x2="312" y2="76" stroke="var(--accent-gold)" strokeWidth="2" />

            <rect x="314" y="24" width="128" height="106" rx="3" fill="var(--page-bg-secondary)" stroke="var(--hairline)" />
            <text x="378" y="44" textAnchor="middle" fill="var(--accent-gold)" fontSize="8.5" fontWeight="700">
              3. Evaporation &amp; Hue
            </text>
            <text x="378" y="72" textAnchor="middle" fill="var(--page-ink)" fontSize="7.5">
              Wing fanning concentrates
            </text>
            <text x="378" y="86" textAnchor="middle" fill="var(--page-ink)" fontSize="7.5">
              sugars in wax cells
            </text>
            <text x="378" y="110" textAnchor="middle" fill="var(--page-muted)" fontSize="7">
              Colour: pale to dark amber
            </text>

            <text x="230" y="152" textAnchor="middle" fill="var(--page-muted)" fontSize="7">
              Biochemical sequence added as scientific background beyond verse wording
            </text>
          </svg>
        );

      case 'spider-silk-web-architecture':
        return (
          <svg viewBox="0 0 460 175" className="w-full h-auto" role="img" aria-label={title}>
            <rect x="18" y="18" width="196" height="134" rx="3" fill="var(--page-bg-secondary)" stroke="var(--hairline)" />
            <g stroke="var(--accent-gold)" strokeOpacity="0.6" fill="none">
              <line x1="116" y1="28" x2="116" y2="142" />
              <line x1="58" y1="85" x2="174" y2="85" />
              <line x1="74" y1="44" x2="158" y2="126" />
              <line x1="158" y1="44" x2="74" y2="126" />
              <circle cx="116" cy="85" r="16" strokeDasharray="2 2" />
              <circle cx="116" cy="85" r="32" strokeDasharray="2 2" />
              <circle cx="116" cy="85" r="48" strokeDasharray="2 2" />
            </g>
            <text x="116" y="148" textAnchor="middle" fill="var(--page-muted)" fontSize="7">
              Dry structural radii + sticky spiral
            </text>

            <rect x="226" y="18" width="216" height="134" rx="3" fill="var(--page-bg-secondary)" stroke="var(--hairline)" />
            <text x="334" y="38" textAnchor="middle" fill="var(--accent-gold)" fontSize="8.5" fontWeight="700">
              Spinnerets &amp; Non-Stick Tarsal Tips
            </text>
            <text x="240" y="64" fill="var(--page-ink)" fontSize="7.5">
              • Abdominal silk glands spin protein fibres
            </text>
            <text x="240" y="84" fill="var(--page-ink)" fontSize="7.5">
              • Bristled tarsal hairs &amp; surface coatings
            </text>
            <text x="240" y="100" fill="var(--page-muted)" fontSize="7.5">
              reduce adhesion to own sticky threads
            </text>
            <text x="240" y="126" fill="var(--accent-gold)" fontSize="7">
              Note: Qur’an 29:41 is a moral parable, not materials data
            </text>
          </svg>
        );

      case 'fly-vs-mosquito-biology':
        return (
          <svg viewBox="0 0 460 175" className="w-full h-auto" role="img" aria-label={title}>
            <rect x="18" y="18" width="204" height="134" rx="3" fill="var(--page-bg-secondary)" stroke="var(--hairline)" />
            <text x="120" y="36" textAnchor="middle" fill="#A4B882" fontSize="8.5" fontWeight="700">
              Mosquito (Culicidae — CDC Lead)
            </text>
            <text x="30" y="58" fill="var(--page-ink)" fontSize="7.5">
              • Aquatic larva &amp; pupa stages
            </text>
            <text x="30" y="76" fill="var(--page-ink)" fontSize="7.5">
              • Slender piercing-sucking proboscis
            </text>
            <text x="30" y="94" fill="var(--page-ink)" fontSize="7.5">
              • Females take blood for eggs
            </text>
            <text x="30" y="118" fill="var(--accent-gold)" fontSize="7">
              Supported by CDC ANI-S08 &amp; ANI-S09 (ANI-026)
            </text>

            <rect x="238" y="18" width="204" height="134" rx="3" fill="var(--page-bg-secondary)" stroke="var(--accent-gold)" strokeOpacity="0.6" />
            <text x="340" y="36" textAnchor="middle" fill="var(--accent-gold)" fontSize="8.5" fontWeight="700">
              True Housefly (Muscidae — Distinct)
            </text>
            <text x="250" y="58" fill="var(--page-ink)" fontSize="7.5">
              • Terrestrial maggot larva &amp; puparium
            </text>
            <text x="250" y="76" fill="var(--page-ink)" fontSize="7.5">
              • Sponging labellum mouthparts
            </text>
            <text x="250" y="94" fill="var(--page-ink)" fontSize="7.5">
              • 1 wing pair + balancing halteres
            </text>
            <text x="250" y="118" fill="#C8826B" fontSize="7" fontWeight="600">
              Source audit (ANI-025): fly-specific ref required
            </text>
          </svg>
        );

      case 'ruminant-digestive-compartments':
        return (
          <svg viewBox="0 0 460 175" className="w-full h-auto" role="img" aria-label={title}>
            <rect x="18" y="18" width="424" height="134" rx="3" fill="var(--page-bg-secondary)" stroke="var(--hairline)" />
            <text x="230" y="36" textAnchor="middle" fill="var(--accent-gold)" fontSize="9" fontWeight="700">
              Four-Chamber Ruminant Digestive Tract (ANI-S10 Background)
            </text>
            <rect x="30" y="54" width="90" height="52" rx="3" fill="var(--page-bg)" stroke="#A4B882" />
            <text x="75" y="74" textAnchor="middle" fill="#A4B882" fontSize="8" fontWeight="700">
              1. Rumen
            </text>
            <text x="75" y="88" textAnchor="middle" fill="var(--page-muted)" fontSize="6.8">
              Microbial cellulose
            </text>
            <text x="75" y="98" textAnchor="middle" fill="var(--page-muted)" fontSize="6.8">
              fermentation
            </text>

            <rect x="134" y="54" width="84" height="52" rx="3" fill="var(--page-bg)" stroke="var(--accent-gold)" />
            <text x="176" y="74" textAnchor="middle" fill="var(--accent-gold)" fontSize="8" fontWeight="700">
              2. Reticulum
            </text>
            <text x="176" y="88" textAnchor="middle" fill="var(--page-muted)" fontSize="6.8">
              Particle sorting
            </text>
            <text x="176" y="98" textAnchor="middle" fill="var(--page-muted)" fontSize="6.8">
              &amp; cud return
            </text>

            <rect x="232" y="54" width="84" height="52" rx="3" fill="var(--page-bg)" stroke="var(--hairline)" />
            <text x="274" y="74" textAnchor="middle" fill="var(--page-ink)" fontSize="8" fontWeight="700">
              3. Omasum
            </text>
            <text x="274" y="88" textAnchor="middle" fill="var(--page-muted)" fontSize="6.8">
              Water &amp; mineral
            </text>
            <text x="274" y="98" textAnchor="middle" fill="var(--page-muted)" fontSize="6.8">
              absorption
            </text>

            <rect x="330" y="54" width="98" height="52" rx="3" fill="var(--page-bg)" stroke="var(--hairline)" />
            <text x="379" y="74" textAnchor="middle" fill="var(--page-ink)" fontSize="8" fontWeight="700">
              4. Abomasum
            </text>
            <text x="379" y="88" textAnchor="middle" fill="var(--page-muted)" fontSize="6.8">
              Acid &amp; enzymatic
            </text>
            <text x="379" y="98" textAnchor="middle" fill="var(--page-muted)" fontSize="6.8">
              true stomach
            </text>

            <text x="230" y="132" textAnchor="middle" fill="var(--page-muted)" fontSize="7.2">
              Intestinal nutrients enter bloodstream → mammary glands synthesise milk separately from digesta
            </text>
          </svg>
        );

      case 'mammalian-lactation-synthesis':
        return (
          <svg viewBox="0 0 460 175" className="w-full h-auto" role="img" aria-label={title}>
            <rect x="18" y="18" width="132" height="134" rx="3" fill="var(--page-bg-secondary)" stroke="var(--hairline)" />
            <text x="84" y="42" textAnchor="middle" fill="#C8826B" fontSize="8.5" fontWeight="700">
              Bloodstream Delivery
            </text>
            <text x="84" y="68" textAnchor="middle" fill="var(--page-ink)" fontSize="7.5">
              Glucose, amino acids,
            </text>
            <text x="84" y="82" textAnchor="middle" fill="var(--page-ink)" fontSize="7.5">
              fatty acids &amp; minerals
            </text>
            <text x="84" y="114" textAnchor="middle" fill="var(--page-muted)" fontSize="7">
              Absorbed from GI tract
            </text>

            <line x1="154" y1="84" x2="174" y2="84" stroke="var(--accent-gold)" strokeWidth="2" />

            <rect x="178" y="18" width="144" height="134" rx="3" fill="var(--page-bg-secondary)" stroke="var(--accent-gold)" />
            <text x="250" y="42" textAnchor="middle" fill="var(--accent-gold)" fontSize="8.5" fontWeight="700">
              Mammary Alveolar Cells
            </text>
            <text x="250" y="68" textAnchor="middle" fill="var(--page-ink)" fontSize="7.5">
              De novo synthesis of
            </text>
            <text x="250" y="82" textAnchor="middle" fill="var(--page-ink)" fontSize="7.5">
              casein, lactose &amp; lipids
            </text>
            <text x="250" y="114" textAnchor="middle" fill="var(--page-muted)" fontSize="7">
              Endocrine control: Prolactin
            </text>

            <line x1="326" y1="84" x2="346" y2="84" stroke="var(--accent-gold)" strokeWidth="2" />

            <rect x="350" y="18" width="92" height="134" rx="3" fill="var(--page-bg-secondary)" stroke="var(--hairline)" />
            <text x="396" y="42" textAnchor="middle" fill="#A4B882" fontSize="8.5" fontWeight="700">
              Milk Secretion
            </text>
            <text x="396" y="72" textAnchor="middle" fill="var(--page-ink)" fontSize="7.5">
              Alveolar lumen
            </text>
            <text x="396" y="86" textAnchor="middle" fill="var(--page-ink)" fontSize="7.5">
              → Milk ducts
            </text>
            <text x="396" y="114" textAnchor="middle" fill="var(--page-muted)" fontSize="7">
              Oxytocin let-down
            </text>
          </svg>
        );

      case 'camel-foot-sand-locomotion':
        return (
          <svg viewBox="0 0 460 175" className="w-full h-auto" role="img" aria-label={title}>
            <rect x="18" y="18" width="210" height="134" rx="3" fill="var(--page-bg-secondary)" stroke="var(--hairline)" />
            <text x="123" y="36" textAnchor="middle" fill="var(--accent-gold)" fontSize="8.5" fontWeight="700">
              Broad Plantar Cushion on Soft Sand
            </text>
            <line x1="96" y1="48" x2="108" y2="92" stroke="var(--page-ink)" strokeWidth="4" />
            <ellipse cx="122" cy="102" rx="46" ry="12" fill="var(--accent-gold)" fillOpacity="0.3" stroke="var(--accent-gold)" />
            <line x1="42" y1="116" x2="204" y2="116" stroke="var(--accent-gold)" strokeDasharray="3 2" />
            <text x="123" y="136" textAnchor="middle" fill="var(--page-muted)" fontSize="7">
              Spreads load across two toes → reduces sinking
            </text>

            <rect x="238" y="18" width="204" height="134" rx="3" fill="var(--page-bg-secondary)" stroke="var(--hairline)" />
            <text x="340" y="36" textAnchor="middle" fill="var(--accent-gold)" fontSize="8.5" fontWeight="700">
              Ipsilateral Pacing Gait (ANI-S12)
            </text>
            <text x="252" y="66" fill="#A4B882" fontSize="8" fontWeight="600">
              • Left forelimb + left hindlimb swing together
            </text>
            <text x="252" y="86" fill="var(--page-ink)" fontSize="8">
              • Right pair supports body weight smoothly
            </text>
            <text x="252" y="114" fill="var(--page-muted)" fontSize="7">
              Restricted to Camelus dromedarius (not equines)
            </text>
          </svg>
        );

      case 'camel-water-conservation':
        return (
          <svg viewBox="0 0 460 175" className="w-full h-auto" role="img" aria-label={title}>
            <rect x="18" y="18" width="424" height="134" rx="3" fill="var(--page-bg-secondary)" stroke="var(--hairline)" />
            <text x="230" y="36" textAnchor="middle" fill="var(--accent-gold)" fontSize="9" fontWeight="700">
              Camelid Arid Survival Physiology (ANI-S11 Background)
            </text>
            <rect x="30" y="48" width="128" height="44" rx="2" fill="var(--page-bg)" stroke="var(--hairline)" />
            <text x="94" y="66" textAnchor="middle" fill="#A4B882" fontSize="7.8" fontWeight="600">
              Nasal Moisture Recovery
            </text>
            <text x="94" y="80" textAnchor="middle" fill="var(--page-muted)" fontSize="6.8">
              Cool turbinates trap breath vapour
            </text>

            <rect x="166" y="48" width="128" height="44" rx="2" fill="var(--page-bg)" stroke="var(--hairline)" />
            <text x="230" y="66" textAnchor="middle" fill="var(--accent-gold)" fontSize="7.8" fontWeight="600">
              Adaptive Heterothermy
            </text>
            <text x="230" y="80" textAnchor="middle" fill="var(--page-muted)" fontSize="6.8">
              Body temp shifts limit sweating
            </text>

            <rect x="302" y="48" width="128" height="44" rx="2" fill="var(--page-bg)" stroke="var(--hairline)" />
            <text x="366" y="66" textAnchor="middle" fill="#8FB4D4" fontSize="7.8" fontWeight="600">
              Concentrated Renal Output
            </text>
            <text x="366" y="80" textAnchor="middle" fill="var(--page-muted)" fontSize="6.8">
              Resilient oval red blood cells
            </text>

            <rect x="30" y="102" width="400" height="36" rx="2" fill="var(--page-bg)" stroke="var(--accent-gold)" strokeOpacity="0.5" />
            <text x="230" y="124" textAnchor="middle" fill="var(--page-ink)" fontSize="7.5">
              Hump stores adipose fat (energy reserve + coat insulation), NOT liquid water; camels still require water
            </text>
          </svg>
        );

      case 'animal-reproductive-diversity':
        return (
          <svg viewBox="0 0 460 175" className="w-full h-auto" role="img" aria-label={title}>
            <rect x="18" y="18" width="204" height="134" rx="3" fill="var(--page-bg-secondary)" stroke="var(--hairline)" />
            <text x="120" y="38" textAnchor="middle" fill="var(--accent-gold)" fontSize="8.5" fontWeight="700">
              Sexual Reproduction (Gamete Fusion)
            </text>
            <circle cx="72" cy="78" r="14" fill="#8FB4D4" fillOpacity="0.25" stroke="#8FB4D4" />
            <text x="72" y="81" textAnchor="middle" fill="var(--page-ink)" fontSize="7.5">
              Ovum (n)
            </text>
            <text x="108" y="81" textAnchor="middle" fill="var(--accent-gold)" fontSize="10">
              +
            </text>
            <circle cx="136" cy="78" r="7" fill="#A4B882" fillOpacity="0.4" stroke="#A4B882" />
            <text x="166" y="81" fill="var(--page-ink)" fontSize="7.5">
              Sperm (n)
            </text>
            <text x="120" y="114" textAnchor="middle" fill="var(--page-ink)" fontSize="8" fontWeight="600">
              → Diploid Zygote (2n)
            </text>
            <text x="120" y="132" textAnchor="middle" fill="var(--page-muted)" fontSize="7">
              Internal or external fertilisation
            </text>

            <rect x="238" y="18" width="204" height="134" rx="3" fill="var(--page-bg-secondary)" stroke="var(--hairline)" />
            <text x="340" y="38" textAnchor="middle" fill="#A4B882" fontSize="8.5" fontWeight="700">
              Additional Animal Strategies
            </text>
            <text x="252" y="66" fill="var(--page-ink)" fontSize="7.5">
              • Hermaphroditism (simultaneous/sequential)
            </text>
            <text x="252" y="86" fill="var(--page-ink)" fontSize="7.5">
              • Parthenogenesis (unfertilised egg develops)
            </text>
            <text x="252" y="106" fill="var(--page-ink)" fontSize="7.5">
              • Budding &amp; fragmentation (cnidarians, sponges)
            </text>
            <text x="252" y="132" fill="var(--page-muted)" fontSize="7">
              Not all species reproduce strictly as male–female pairs
            </text>
          </svg>
        );

      case 'fertilisation-early-embryogenesis':
        return (
          <svg viewBox="0 0 460 175" className="w-full h-auto" role="img" aria-label={title}>
            <rect x="18" y="20" width="96" height="96" rx="3" fill="var(--page-bg-secondary)" stroke="var(--hairline)" />
            <circle cx="66" cy="64" r="20" fill="var(--accent-gold)" fillOpacity="0.25" stroke="var(--accent-gold)" />
            <text x="66" y="102" textAnchor="middle" fill="var(--page-ink)" fontSize="7.5" fontWeight="600">
              1. Zygote
            </text>

            <rect x="126" y="20" width="96" height="96" rx="3" fill="var(--page-bg-secondary)" stroke="var(--hairline)" />
            <circle cx="164" cy="56" r="10" fill="#A4B882" fillOpacity="0.25" stroke="#A4B882" />
            <circle cx="184" cy="56" r="10" fill="#A4B882" fillOpacity="0.25" stroke="#A4B882" />
            <circle cx="164" cy="76" r="10" fill="#A4B882" fillOpacity="0.25" stroke="#A4B882" />
            <circle cx="184" cy="76" r="10" fill="#A4B882" fillOpacity="0.25" stroke="#A4B882" />
            <text x="174" y="102" textAnchor="middle" fill="var(--page-ink)" fontSize="7.5" fontWeight="600">
              2. Cleavage
            </text>

            <rect x="234" y="20" width="96" height="96" rx="3" fill="var(--page-bg-secondary)" stroke="var(--hairline)" />
            <circle cx="282" cy="64" r="22" fill="none" stroke="var(--accent-gold)" strokeWidth="2.4" />
            <circle cx="282" cy="64" r="13" fill="var(--page-bg)" stroke="var(--hairline)" strokeDasharray="2 2" />
            <text x="282" y="102" textAnchor="middle" fill="var(--page-ink)" fontSize="7.5" fontWeight="600">
              3. Blastula
            </text>

            <rect x="342" y="20" width="100" height="96" rx="3" fill="var(--page-bg-secondary)" stroke="var(--hairline)" />
            <path d="M370,64 A22,22 0 1,1 414,64 Q404,76 392,58 Q380,76 370,64 Z" fill="#A4B882" fillOpacity="0.25" stroke="#A4B882" strokeWidth="1.6" />
            <text x="392" y="102" textAnchor="middle" fill="var(--page-ink)" fontSize="7.5" fontWeight="600">
              4. Gastrulation
            </text>

            <text x="230" y="142" textAnchor="middle" fill="#C8826B" fontSize="7.2" fontWeight="600">
              Cross-category safeguard (ANI-042): Qur’an 23:12–14 concerns human development specifically
            </text>
          </svg>
        );

      case 'parental-care-food-webs':
        return (
          <svg viewBox="0 0 460 175" className="w-full h-auto" role="img" aria-label={title}>
            <rect x="18" y="18" width="206" height="134" rx="3" fill="var(--page-bg-secondary)" stroke="var(--hairline)" />
            <text x="121" y="36" textAnchor="middle" fill="var(--accent-gold)" fontSize="8.5" fontWeight="700">
              Vertebrate Parental Care Gradient
            </text>
            <text x="30" y="60" fill="var(--page-muted)" fontSize="7.5">
              Low care: Many pelagic fishes &amp; amphibians
            </text>
            <text x="30" y="82" fill="#A4B882" fontSize="7.5">
              Nest/egg guarding: Several fishes &amp; reptiles
            </text>
            <text x="30" y="104" fill="var(--page-ink)" fontSize="7.5">
              Biparental provisioning: Most birds
            </text>
            <text x="30" y="126" fill="var(--accent-gold)" fontSize="7.5" fontWeight="600">
              Gestation &amp; lactation: Mammals
            </text>

            <rect x="236" y="18" width="206" height="134" rx="3" fill="var(--page-bg-secondary)" stroke="var(--hairline)" />
            <text x="339" y="36" textAnchor="middle" fill="#A4B882" fontSize="8.5" fontWeight="700">
              Trophic Food-Web Cycling
            </text>
            <text x="339" y="60" textAnchor="middle" fill="var(--page-ink)" fontSize="7.5">
              Primary Producers (Plants, Algae)
            </text>
            <text x="339" y="74" textAnchor="middle" fill="var(--accent-gold)" fontSize="8">
              ↓
            </text>
            <text x="339" y="88" textAnchor="middle" fill="var(--page-ink)" fontSize="7.5">
              Herbivores &amp; Pollination Mutualists
            </text>
            <text x="339" y="102" textAnchor="middle" fill="var(--accent-gold)" fontSize="8">
              ↓
            </text>
            <text x="339" y="116" textAnchor="middle" fill="var(--page-ink)" fontSize="7.5">
              Predators, Scavengers &amp; Decomposers
            </text>
            <text x="339" y="138" textAnchor="middle" fill="var(--page-muted)" fontSize="6.8">
              Matter recycles via soil, water &amp; microorganisms
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
