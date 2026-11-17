import React from 'react';
import { HumanBiologyDiagramKind } from '../../types/encyclopedia';

interface HumanBiologyDiagramProps {
  kind: HumanBiologyDiagramKind;
  title: string;
  caption: string;
}

export const HumanBiologyDiagram: React.FC<HumanBiologyDiagramProps> = ({
  kind,
  title,
  caption,
}) => {
  const renderSvg = () => {
    switch (kind) {
      case 'human-elemental-composition':
        return (
          <svg viewBox="0 0 460 175" className="w-full h-auto" role="img" aria-label={title}>
            <rect x="16" y="18" width="210" height="138" rx="3" fill="var(--page-bg-secondary)" stroke="var(--hairline)" />
            <text x="121" y="36" textAnchor="middle" fill="#D9A773" fontSize="9" fontWeight="700">
              Major Elements in Human Tissues
            </text>
            {[
              { sym: 'O · C · H · N', desc: 'Organic macromolecules & water', y: 54 },
              { sym: 'Ca · P', desc: 'Bone mineral & cellular energy', y: 84 },
              { sym: 'K · Na · Fe · Trace', desc: 'Electrolytes & oxygen transport', y: 114 },
            ].map((row) => (
              <g key={row.sym}>
                <rect x="28" y={row.y} width="186" height="24" rx="2" fill="var(--page-bg)" stroke="var(--hairline)" />
                <text x="36" y={row.y + 11} fill="var(--page-ink)" fontSize="7.5" fontWeight="600">
                  {row.sym}
                </text>
                <text x="36" y={row.y + 20} fill="var(--page-muted)" fontSize="6.5">
                  {row.desc}
                </text>
              </g>
            ))}

            <rect x="242" y="18" width="202" height="138" rx="3" fill="var(--page-bg-secondary)" stroke="var(--accent-gold)" strokeDasharray="3 2" />
            <text x="343" y="36" textAnchor="middle" fill="var(--accent-gold)" fontSize="9" fontWeight="700">
              Methodological Scope Caution
            </text>
            <text x="343" y="58" textAnchor="middle" fill="var(--page-ink)" fontSize="7.5" fontWeight="600">
              Terrestrial Minerals &amp; Living Tissues
            </text>
            <text x="343" y="72" textAnchor="middle" fill="var(--page-muted)" fontSize="6.8">
              Elements also occur in Earth’s crust &amp; soils.
            </text>
            <line x1="258" y1="86" x2="428" y2="86" stroke="var(--hairline)" />
            <text x="343" y="103" textAnchor="middle" fill="#D9A773" fontSize="7.5" fontWeight="600">
              Adam vs. Biological Descendants
            </text>
            <text x="343" y="117" textAnchor="middle" fill="var(--page-muted)" fontSize="6.6">
              Clay verses (23:12, 32:7) require classical
            </text>
            <text x="343" y="129" textAnchor="middle" fill="var(--page-muted)" fontSize="6.6">
              tafsīr—not an elemental chemistry assay.
            </text>
          </svg>
        );

      case 'gametes-fertilization-zygote':
        return (
          <svg viewBox="0 0 460 175" className="w-full h-auto" role="img" aria-label={title}>
            <rect x="16" y="20" width="128" height="134" rx="3" fill="var(--page-bg-secondary)" stroke="var(--hairline)" />
            <text x="80" y="38" textAnchor="middle" fill="#D9A773" fontSize="8.5" fontWeight="700">
              Haploid Gametes (n)
            </text>
            <circle cx="62" cy="72" r="14" fill="#D9A773" fillOpacity="0.18" stroke="#D9A773" />
            <circle cx="62" cy="72" r="4" fill="#D9A773" />
            <text x="98" y="75" fill="var(--page-ink)" fontSize="7.5">
              Ovum (n)
            </text>
            <ellipse cx="52" cy="112" rx="7" ry="4.5" fill="#7EB8AE" fillOpacity="0.25" stroke="#7EB8AE" />
            <path d="M59,112 Q70,107 78,113 T92,112" fill="none" stroke="#7EB8AE" strokeWidth="1.4" />
            <text x="100" y="115" fill="var(--page-ink)" fontSize="7.5">
              Sperm (n)
            </text>
            <text x="80" y="140" textAnchor="middle" fill="var(--page-muted)" fontSize="6.5">
              Maternal + Paternal DNA
            </text>

            <path d="M148,88 L174,88" stroke="var(--accent-gold)" strokeWidth="1.6" />
            <polygon points="172,84 180,88 172,92" fill="var(--accent-gold)" />

            <rect x="184" y="20" width="120" height="134" rx="3" fill="var(--page-bg-secondary)" stroke="var(--accent-gold)" />
            <text x="244" y="38" textAnchor="middle" fill="var(--accent-gold)" fontSize="8.5" fontWeight="700">
              Fertilization → Zygote
            </text>
            <circle cx="244" cy="84" r="24" fill="var(--accent-gold)" fillOpacity="0.15" stroke="var(--accent-gold)" strokeWidth="1.5" />
            <circle cx="238" cy="84" r="7" fill="#D9A773" fillOpacity="0.4" stroke="#D9A773" />
            <circle cx="250" cy="84" r="7" fill="#7EB8AE" fillOpacity="0.4" stroke="#7EB8AE" />
            <text x="244" y="124" textAnchor="middle" fill="var(--page-ink)" fontSize="7.5" fontWeight="600">
              Diploid Cell (2n)
            </text>
            <text x="244" y="138" textAnchor="middle" fill="var(--page-muted)" fontSize="6.5">
              Single fertilized cell
            </text>

            <path d="M308,88 L334,88" stroke="var(--accent-gold)" strokeWidth="1.6" />
            <polygon points="332,84 340,88 332,92" fill="var(--accent-gold)" />

            <rect x="344" y="20" width="100" height="134" rx="3" fill="var(--page-bg-secondary)" stroke="var(--hairline)" />
            <text x="394" y="38" textAnchor="middle" fill="#7EB8AE" fontSize="8.5" fontWeight="700">
              Early Cleavage
            </text>
            <circle cx="384" cy="74" r="10" fill="#7EB8AE" fillOpacity="0.2" stroke="#7EB8AE" />
            <circle cx="404" cy="74" r="10" fill="#7EB8AE" fillOpacity="0.2" stroke="#7EB8AE" />
            <circle cx="384" cy="96" r="10" fill="#7EB8AE" fillOpacity="0.2" stroke="#7EB8AE" />
            <circle cx="404" cy="96" r="10" fill="#7EB8AE" fillOpacity="0.2" stroke="#7EB8AE" />
            <text x="394" y="124" textAnchor="middle" fill="var(--page-ink)" fontSize="7.2">
              Mitotic Division
            </text>
            <text x="394" y="138" textAnchor="middle" fill="var(--page-muted)" fontSize="6.5">
              2 → 4 → 8 → Morula
            </text>
          </svg>
        );

      case 'uterine-implantation-early':
        return (
          <svg viewBox="0 0 460 175" className="w-full h-auto" role="img" aria-label={title}>
            <rect x="16" y="18" width="235" height="138" rx="3" fill="var(--page-bg-secondary)" stroke="var(--hairline)" />
            <text x="133" y="36" textAnchor="middle" fill="#D9A773" fontSize="8.8" fontWeight="700">
              Week 1 Transport to Uterine Implantation
            </text>
            <path d="M40,62 Q82,48 122,64 Q158,76 178,108" fill="none" stroke="var(--accent-gold)" strokeWidth="1.5" strokeDasharray="3 2" />
            <circle cx="46" cy="60" r="6" fill="#7EB8AE" fillOpacity="0.35" stroke="#7EB8AE" />
            <text x="48" y="80" textAnchor="middle" fill="var(--page-muted)" fontSize="6.5">
              Zygote
            </text>
            <circle cx="110" cy="60" r="8" fill="#D9A773" fillOpacity="0.35" stroke="#D9A773" />
            <text x="110" y="80" textAnchor="middle" fill="var(--page-muted)" fontSize="6.5">
              Morula
            </text>
            <circle cx="176" cy="108" r="12" fill="var(--accent-gold)" fillOpacity="0.25" stroke="var(--accent-gold)" />
            <circle cx="174" cy="104" r="5" fill="#D9A773" fillOpacity="0.6" />
            <text x="176" y="132" textAnchor="middle" fill="var(--page-ink)" fontSize="7" fontWeight="600">
              Blastocyst Implants
            </text>

            <rect x="266" y="18" width="178" height="138" rx="3" fill="var(--page-bg-secondary)" stroke="var(--hairline)" />
            <text x="355" y="36" textAnchor="middle" fill="var(--accent-gold)" fontSize="8.8" fontWeight="700">
              Uterine Environment
            </text>
            <rect x="282" y="50" width="146" height="24" rx="2" fill="var(--page-bg)" stroke="#D9A773" />
            <text x="355" y="65" textAnchor="middle" fill="var(--page-ink)" fontSize="7.2">
              Endometrium (Vascular Attachment)
            </text>
            <rect x="282" y="82" width="146" height="24" rx="2" fill="var(--page-bg)" stroke="var(--hairline)" />
            <text x="355" y="97" textAnchor="middle" fill="var(--page-ink)" fontSize="7.2">
              Myometrium (Muscular Protection)
            </text>
            <rect x="282" y="114" width="146" height="26" rx="2" fill="var(--page-bg)" stroke="var(--hairline)" />
            <text x="355" y="130" textAnchor="middle" fill="var(--page-muted)" fontSize="6.7">
              Pelvic protection &amp; early support
            </text>
          </svg>
        );

      case 'embryonic-sequential-stages':
        return (
          <svg viewBox="0 0 460 175" className="w-full h-auto" role="img" aria-label={title}>
            <rect x="14" y="18" width="432" height="138" rx="3" fill="var(--page-bg-secondary)" stroke="var(--hairline)" />
            <text x="230" y="37" textAnchor="middle" fill="var(--accent-gold)" fontSize="9.2" fontWeight="700">
              Continuous Prenatal Developmental Trajectory (Embryology Overview)
            </text>
            {[
              { x: 26, title: '1. Fertilization', sub: 'Zygote & cleavage', col: '#D9A773' },
              { x: 132, title: '2. Implantation', sub: 'Blastocyst & disc', col: '#7EB8AE' },
              { x: 238, title: '3. Organogenesis', sub: 'Germ layers & organs', col: 'var(--accent-gold)' },
              { x: 344, title: '4. Fetal Period', sub: 'Growth & maturation', col: '#8FB4D4' },
            ].map((st, idx) => (
              <g key={st.title}>
                <rect x={st.x} y="54" width="90" height="64" rx="2" fill="var(--page-bg)" stroke={st.col} />
                <text x={st.x + 45} y="76" textAnchor="middle" fill={st.col} fontSize="7.8" fontWeight="700">
                  {st.title}
                </text>
                <text x={st.x + 45} y="92" textAnchor="middle" fill="var(--page-muted)" fontSize="6.8">
                  {st.sub}
                </text>
                {idx < 3 && (
                  <path d={`M${st.x + 92},86 L${st.x + 104},86`} stroke="var(--accent-gold)" strokeWidth="1.4" />
                )}
              </g>
            ))}
            <text x="230" y="140" textAnchor="middle" fill="var(--page-muted)" fontSize="7">
              Processes overlap continuously in medical embryology rather than switching abruptly.
            </text>
          </svg>
        );

      case 'alaqah-terminology-caution':
        return (
          <svg viewBox="0 0 460 175" className="w-full h-auto" role="img" aria-label={title}>
            <rect x="16" y="18" width="204" height="138" rx="3" fill="var(--page-bg-secondary)" stroke="var(--hairline)" />
            <text x="118" y="36" textAnchor="middle" fill="#D9A773" fontSize="8.8" fontWeight="700">
              Classical Arabic Senses (Tafsīr Needed)
            </text>
            <rect x="28" y="48" width="180" height="24" rx="2" fill="var(--page-bg)" stroke="var(--hairline)" />
            <text x="118" y="63" textAnchor="middle" fill="var(--page-ink)" fontSize="7.3">
              Clinging / Suspended Structure
            </text>
            <rect x="28" y="78" width="180" height="24" rx="2" fill="var(--page-bg)" stroke="var(--hairline)" />
            <text x="118" y="93" textAnchor="middle" fill="var(--page-ink)" fontSize="7.3">
              Congealed / Clotted Blood (Classical Sense)
            </text>
            <rect x="28" y="108" width="180" height="36" rx="2" fill="var(--page-bg)" stroke="var(--accent-gold)" strokeDasharray="3 2" />
            <text x="118" y="123" textAnchor="middle" fill="var(--accent-gold)" fontSize="7" fontWeight="600">
              Urgent Lexical &amp; Tafsīr Review Required
            </text>
            <text x="118" y="135" textAnchor="middle" fill="var(--page-muted)" fontSize="6.4">
              Do not reduce to a single modern sense
            </text>

            <rect x="236" y="18" width="208" height="138" rx="3" fill="var(--page-bg-secondary)" stroke="var(--hairline)" />
            <text x="340" y="36" textAnchor="middle" fill="#7EB8AE" fontSize="8.8" fontWeight="700">
              Weeks 1–3 Embryological Background
            </text>
            <path d="M278,76 Q310,54 344,74 T404,88" fill="none" stroke="#7EB8AE" strokeWidth="2.5" />
            <circle cx="338" cy="74" r="14" fill="#7EB8AE" fillOpacity="0.16" stroke="#7EB8AE" />
            <text x="340" y="110" textAnchor="middle" fill="var(--page-ink)" fontSize="7.2">
              Uterine Attachment &amp; Early Disc Folding
            </text>
            <text x="340" y="125" textAnchor="middle" fill="var(--page-muted)" fontSize="6.5">
              NCBI Week 1 &amp; Week 2–3 provide biology only;
            </text>
            <text x="340" y="137" textAnchor="middle" fill="var(--page-muted)" fontSize="6.5">
              they do not decide Arabic word meanings.
            </text>
          </svg>
        );

      case 'mudghah-terminology-caution':
        return (
          <svg viewBox="0 0 460 175" className="w-full h-auto" role="img" aria-label={title}>
            <rect x="16" y="18" width="212" height="138" rx="3" fill="var(--page-bg-secondary)" stroke="var(--hairline)" />
            <text x="122" y="36" textAnchor="middle" fill="#D9A773" fontSize="8.6" fontWeight="700">
              Embryonic Somites &amp; Folding (Weeks 3–4)
            </text>
            <path d="M62,102 C60,72 95,54 134,62 C164,68 176,92 166,112 C154,126 128,120 118,108" fill="#D9A773" fillOpacity="0.18" stroke="#D9A773" strokeWidth="1.6" />
            {[82, 96, 110, 124, 138].map((sx, idx) => (
              <rect key={idx} x={sx} y={64 + idx * 1.5} width="8" height="10" rx="2" fill="var(--accent-gold)" fillOpacity="0.5" stroke="var(--accent-gold)" />
            ))}
            <text x="122" y="142" textAnchor="middle" fill="var(--page-muted)" fontSize="6.7">
              Paired dorsal somites precede vertebrae &amp; muscle
            </text>

            <rect x="242" y="18" width="202" height="138" rx="3" fill="var(--page-bg-secondary)" stroke="var(--accent-gold)" strokeDasharray="3 2" />
            <text x="343" y="38" textAnchor="middle" fill="var(--accent-gold)" fontSize="8.8" fontWeight="700">
              Epistemological Boundary (Mudghah)
            </text>
            <text x="343" y="64" textAnchor="middle" fill="var(--page-ink)" fontSize="7.4" fontWeight="600">
              Visual Resemblance Is Not Proof
            </text>
            <text x="343" y="82" textAnchor="middle" fill="var(--page-muted)" fontSize="6.7">
              Superficial analogy between segmented somites
            </text>
            <text x="343" y="94" textAnchor="middle" fill="var(--page-muted)" fontSize="6.7">
              and &ldquo;chewed lump&rdquo; remains interpretive.
            </text>
            <line x1="260" y1="108" x2="426" y2="108" stroke="var(--hairline)" />
            <text x="343" y="126" textAnchor="middle" fill="var(--page-muted)" fontSize="6.7">
              Classical tafsīr &amp; lexical review required.
            </text>
          </svg>
        );

      case 'gastrulation-germ-layers':
        return (
          <svg viewBox="0 0 460 175" className="w-full h-auto" role="img" aria-label={title}>
            <rect x="16" y="18" width="428" height="138" rx="3" fill="var(--page-bg-secondary)" stroke="var(--hairline)" />
            <text x="230" y="36" textAnchor="middle" fill="var(--accent-gold)" fontSize="9" fontWeight="700">
              Gastrulation: Formation &amp; Fates of the Three Primary Germ Layers
            </text>
            <rect x="30" y="50" width="400" height="28" rx="2" fill="#8FB4D4" fillOpacity="0.16" stroke="#8FB4D4" />
            <text x="44" y="68" fill="#8FB4D4" fontSize="8" fontWeight="700">
              Ectoderm
            </text>
            <text x="140" y="68" fill="var(--page-ink)" fontSize="7.4">
              Brain, spinal cord, sensory organs &amp; epidermis
            </text>

            <rect x="30" y="84" width="400" height="28" rx="2" fill="#D9A773" fillOpacity="0.16" stroke="#D9A773" />
            <text x="44" y="102" fill="#D9A773" fontSize="8" fontWeight="700">
              Mesoderm
            </text>
            <text x="140" y="102" fill="var(--page-ink)" fontSize="7.4">
              Skeleton, cartilage, muscles, heart &amp; blood vessels
            </text>

            <rect x="30" y="118" width="400" height="28" rx="2" fill="#7EB8AE" fillOpacity="0.16" stroke="#7EB8AE" />
            <text x="44" y="136" fill="#7EB8AE" fontSize="8" fontWeight="700">
              Endoderm
            </text>
            <text x="140" y="136" fill="var(--page-ink)" fontSize="7.4">
              Gastrointestinal lining, lungs &amp; metabolic organs
            </text>
          </svg>
        );

      case 'musculoskeletal-overlap':
        return (
          <svg viewBox="0 0 460 175" className="w-full h-auto" role="img" aria-label={title}>
            <rect x="16" y="18" width="428" height="138" rx="3" fill="var(--page-bg-secondary)" stroke="var(--hairline)" />
            <text x="230" y="36" textAnchor="middle" fill="#D9A773" fontSize="9" fontWeight="700">
              Coordinated &amp; Overlapping Musculoskeletal Development
            </text>
            <text x="30" y="58" fill="var(--page-muted)" fontSize="7">
              Embryonic Period →
            </text>
            <text x="240" y="58" fill="var(--page-muted)" fontSize="7">
              Fetal Growth →
            </text>
            <text x="385" y="58" fill="var(--page-muted)" fontSize="7">
              Postnatal
            </text>

            <rect x="30" y="66" width="220" height="16" rx="2" fill="#7EB8AE" fillOpacity="0.25" stroke="#7EB8AE" />
            <text x="140" y="77" textAnchor="middle" fill="var(--page-ink)" fontSize="7">
              Cartilage Templates (Chondrification)
            </text>

            <rect x="90" y="88" width="336" height="16" rx="2" fill="var(--accent-gold)" fillOpacity="0.25" stroke="var(--accent-gold)" />
            <text x="258" y="99" textAnchor="middle" fill="var(--page-ink)" fontSize="7">
              Bone Mineralization &amp; Remodeling (Ossification)
            </text>

            <rect x="65" y="110" width="361" height="16" rx="2" fill="#D9A773" fillOpacity="0.25" stroke="#D9A773" />
            <text x="245" y="121" textAnchor="middle" fill="var(--page-ink)" fontSize="7">
              Skeletal Muscle Formation &amp; Attachment (Myogenesis)
            </text>

            <text x="230" y="144" textAnchor="middle" fill="var(--accent-gold)" fontSize="7" fontWeight="600">
              Caution: Bone formation does NOT finish before muscle development begins.
            </text>
          </svg>
        );

      case 'organogenesis-body-plan':
        return (
          <svg viewBox="0 0 460 175" className="w-full h-auto" role="img" aria-label={title}>
            <rect x="16" y="18" width="160" height="138" rx="3" fill="var(--page-bg-secondary)" stroke="var(--hairline)" />
            <text x="96" y="36" textAnchor="middle" fill="#D9A773" fontSize="8.8" fontWeight="700">
              Developmental Axes
            </text>
            <line x1="96" y1="50" x2="96" y2="132" stroke="var(--accent-gold)" strokeWidth="1.5" />
            <line x1="48" y1="91" x2="144" y2="91" stroke="#7EB8AE" strokeWidth="1.5" />
            <circle cx="96" cy="91" r="24" fill="var(--accent-gold)" fillOpacity="0.12" stroke="var(--accent-gold)" strokeDasharray="3 2" />
            <text x="96" y="46" textAnchor="middle" fill="var(--page-ink)" fontSize="6.8">
              Cranial
            </text>
            <text x="96" y="144" textAnchor="middle" fill="var(--page-ink)" fontSize="6.8">
              Caudal
            </text>
            <text x="36" y="93" textAnchor="middle" fill="var(--page-muted)" fontSize="6.5">
              L
            </text>
            <text x="156" y="93" textAnchor="middle" fill="var(--page-muted)" fontSize="6.5">
              R
            </text>

            <rect x="192" y="18" width="252" height="138" rx="3" fill="var(--page-bg-secondary)" stroke="var(--hairline)" />
            <text x="318" y="36" textAnchor="middle" fill="var(--accent-gold)" fontSize="8.8" fontWeight="700">
              Coordinated Organogenesis &amp; Morphogenesis
            </text>
            {[
              { x: 204, y: 50, t: 'Neural & Sensory Primordia' },
              { x: 328, y: 50, t: 'Cardiac & Vascular Loop' },
              { x: 204, y: 84, t: 'Limb Buds & Body Plan' },
              { x: 328, y: 84, t: 'Visceral Organ Folding' },
            ].map((b) => (
              <g key={b.t}>
                <rect x={b.x} y={b.y} width="112" height="26" rx="2" fill="var(--page-bg)" stroke="var(--hairline)" />
                <text x={b.x + 56} y={b.y + 16} textAnchor="middle" fill="var(--page-ink)" fontSize="6.9">
                  {b.t}
                </text>
              </g>
            ))}
            <text x="318" y="136" textAnchor="middle" fill="var(--page-muted)" fontSize="6.8">
              Genetic regulation + cellular signalling shape individual human form.
            </text>
          </svg>
        );

      case 'three-darknesses-membranes':
        return (
          <svg viewBox="0 0 460 175" className="w-full h-auto" role="img" aria-label={title}>
            <rect x="16" y="18" width="222" height="138" rx="3" fill="var(--page-bg-secondary)" stroke="var(--hairline)" />
            <text x="127" y="34" textAnchor="middle" fill="#D9A773" fontSize="8.5" fontWeight="700">
              Nested Anatomical Layers in Pregnancy
            </text>
            <ellipse cx="127" cy="96" rx="88" ry="48" fill="none" stroke="var(--page-muted)" strokeDasharray="3 2" />
            <ellipse cx="127" cy="96" rx="68" ry="37" fill="none" stroke="#D9A773" strokeWidth="1.4" />
            <ellipse cx="127" cy="96" rx="48" ry="26" fill="#7EB8AE" fillOpacity="0.14" stroke="#7EB8AE" />
            <text x="127" y="94" textAnchor="middle" fill="var(--page-ink)" fontSize="7.3" fontWeight="600">
              Amnion &amp; Fluid
            </text>
            <text x="127" y="106" textAnchor="middle" fill="var(--page-muted)" fontSize="6.4">
              Inside Chorion, Uterus &amp; Abdomen
            </text>

            <rect x="252" y="18" width="192" height="138" rx="3" fill="var(--page-bg-secondary)" stroke="var(--accent-gold)" strokeDasharray="3 2" />
            <text x="348" y="38" textAnchor="middle" fill="var(--accent-gold)" fontSize="8.5" fontWeight="700">
              39:6 Interpretive Caution
            </text>
            <text x="348" y="64" textAnchor="middle" fill="var(--page-ink)" fontSize="7.2" fontWeight="600">
              Multiple Classical Referents
            </text>
            <text x="348" y="82" textAnchor="middle" fill="var(--page-muted)" fontSize="6.7">
              Anatomy identifies uterus, chorion,
            </text>
            <text x="348" y="94" textAnchor="middle" fill="var(--page-muted)" fontSize="6.7">
              amnion, placenta &amp; abdominal wall—more
            </text>
            <text x="348" y="106" textAnchor="middle" fill="var(--page-muted)" fontSize="6.7">
              than one anatomical grouping exists.
            </text>
            <text x="348" y="128" textAnchor="middle" fill="#D9A773" fontSize="6.7">
              Do not assert one fixed modern count.
            </text>
          </svg>
        );

      case 'placenta-maternal-exchange':
        return (
          <svg viewBox="0 0 460 175" className="w-full h-auto" role="img" aria-label={title}>
            <rect x="16" y="20" width="132" height="134" rx="3" fill="var(--page-bg-secondary)" stroke="#D9A773" />
            <text x="82" y="40" textAnchor="middle" fill="#D9A773" fontSize="8.5" fontWeight="700">
              Maternal Circulation
            </text>
            <text x="82" y="72" textAnchor="middle" fill="var(--page-ink)" fontSize="7.3">
              O₂ · Glucose · Amino Acids
            </text>
            <text x="82" y="90" textAnchor="middle" fill="var(--page-ink)" fontSize="7.3">
              Water · Vitamins · IgG
            </text>
            <text x="82" y="126" textAnchor="middle" fill="var(--page-muted)" fontSize="6.6">
              Endometrial spiral supply
            </text>

            <rect x="166" y="20" width="128" height="134" rx="3" fill="var(--page-bg)" stroke="var(--accent-gold)" strokeWidth="1.4" />
            <text x="230" y="40" textAnchor="middle" fill="var(--accent-gold)" fontSize="8.5" fontWeight="700">
              Placental Barrier
            </text>
            <path d="M180,68 L280,68" stroke="#7EB8AE" strokeWidth="1.6" />
            <polygon points="274,64 282,68 274,72" fill="#7EB8AE" />
            <text x="230" y="62" textAnchor="middle" fill="#7EB8AE" fontSize="6.7">
              Nutrients &amp; Oxygen →
            </text>
            <path d="M280,104 L180,104" stroke="#D9A773" strokeWidth="1.6" />
            <polygon points="186,100 178,104 186,108" fill="#D9A773" />
            <text x="230" y="98" textAnchor="middle" fill="#D9A773" fontSize="6.7">
              ← CO₂ &amp; Metabolic Waste
            </text>
            <text x="230" y="132" textAnchor="middle" fill="var(--page-muted)" fontSize="6.5">
              Separate maternal/fetal blood
            </text>

            <rect x="312" y="20" width="132" height="134" rx="3" fill="var(--page-bg-secondary)" stroke="#7EB8AE" />
            <text x="378" y="40" textAnchor="middle" fill="#7EB8AE" fontSize="8.5" fontWeight="700">
              Fetal Circulation
            </text>
            <text x="378" y="76" textAnchor="middle" fill="var(--page-ink)" fontSize="7.3">
              Growth &amp; Organ Maturation
            </text>
            <text x="378" y="114" textAnchor="middle" fill="var(--page-muted)" fontSize="6.4">
              Note: Cited verses do not
            </text>
            <text x="378" y="126" textAnchor="middle" fill="var(--page-muted)" fontSize="6.4">
              explicitly name the placenta.
            </text>
          </svg>
        );

      case 'umbilical-cord-circulation':
        return (
          <svg viewBox="0 0 460 175" className="w-full h-auto" role="img" aria-label={title}>
            <rect x="16" y="18" width="428" height="138" rx="3" fill="var(--page-bg-secondary)" stroke="var(--hairline)" />
            <text x="230" y="36" textAnchor="middle" fill="var(--accent-gold)" fontSize="9" fontWeight="700">
              Umbilical Vascular Conduit Between Placenta &amp; Fetus
            </text>
            <rect x="30" y="54" width="106" height="66" rx="3" fill="var(--page-bg)" stroke="#D9A773" />
            <text x="83" y="84" textAnchor="middle" fill="#D9A773" fontSize="8.2" fontWeight="700">
              Placenta
            </text>
            <text x="83" y="98" textAnchor="middle" fill="var(--page-muted)" fontSize="6.6">
              Gas &amp; nutrient interface
            </text>

            <path d="M136,74 C195,58 265,92 324,74" fill="none" stroke="#7EB8AE" strokeWidth="2.5" />
            <path d="M136,100 C195,84 265,118 324,100" fill="none" stroke="#D9A773" strokeWidth="1.8" strokeDasharray="4 2" />
            <text x="230" y="64" textAnchor="middle" fill="#7EB8AE" fontSize="7">
              Umbilical Vein (O₂ + Nutrients →)
            </text>
            <text x="230" y="118" textAnchor="middle" fill="#D9A773" fontSize="7">
              Umbilical Arteries (← CO₂ + Waste)
            </text>

            <rect x="324" y="54" width="106" height="66" rx="3" fill="var(--page-bg)" stroke="#7EB8AE" />
            <text x="377" y="84" textAnchor="middle" fill="#7EB8AE" fontSize="8.2" fontWeight="700">
              Fetus
            </text>
            <text x="377" y="98" textAnchor="middle" fill="var(--page-muted)" fontSize="6.6">
              Wharton’s jelly shields cord
            </text>
            <text x="230" y="142" textAnchor="middle" fill="var(--page-muted)" fontSize="6.7">
              General obstetric background; verses 23:13 and 22:5 do not explicitly name umbilical vessels.
            </text>
          </svg>
        );

      case 'neural-tube-neurulation':
        return (
          <svg viewBox="0 0 460 175" className="w-full h-auto" role="img" aria-label={title}>
            <rect x="16" y="18" width="428" height="138" rx="3" fill="var(--page-bg-secondary)" stroke="var(--hairline)" />
            <text x="230" y="36" textAnchor="middle" fill="var(--accent-gold)" fontSize="9" fontWeight="700">
              Primary Neurulation: Neural Plate to Central Nervous System
            </text>

            <rect x="28" y="50" width="92" height="72" rx="2" fill="var(--page-bg)" stroke="var(--hairline)" />
            <path d="M40,86 Q74,80 108,86" fill="none" stroke="#8FB4D4" strokeWidth="3" />
            <text x="74" y="108" textAnchor="middle" fill="var(--page-ink)" fontSize="7.2" fontWeight="600">
              1. Neural Plate
            </text>

            <rect x="130" y="50" width="92" height="72" rx="2" fill="var(--page-bg)" stroke="var(--hairline)" />
            <path d="M142,80 Q162,76 176,94 Q190,76 210,80" fill="none" stroke="#8FB4D4" strokeWidth="3" />
            <text x="176" y="108" textAnchor="middle" fill="var(--page-ink)" fontSize="7.2" fontWeight="600">
              2. Neural Groove
            </text>

            <rect x="232" y="50" width="92" height="72" rx="2" fill="var(--page-bg)" stroke="#8FB4D4" />
            <circle cx="278" cy="84" r="12" fill="#8FB4D4" fillOpacity="0.2" stroke="#8FB4D4" strokeWidth="2.5" />
            <text x="278" y="108" textAnchor="middle" fill="#8FB4D4" fontSize="7.2" fontWeight="700">
              3. Neural Tube
            </text>

            <rect x="334" y="50" width="98" height="72" rx="2" fill="var(--page-bg)" stroke="#D9A773" />
            <text x="383" y="74" textAnchor="middle" fill="#D9A773" fontSize="7.4" fontWeight="700">
              CNS Derivatives
            </text>
            <text x="383" y="90" textAnchor="middle" fill="var(--page-ink)" fontSize="6.8">
              Anterior → Brain
            </text>
            <text x="383" y="103" textAnchor="middle" fill="var(--page-ink)" fontSize="6.8">
              Posterior → Spinal Cord
            </text>

            <text x="230" y="142" textAnchor="middle" fill="var(--page-muted)" fontSize="6.7">
              NCBI StatPearls background on ectodermal folding prior to central nervous system maturation.
            </text>
          </svg>
        );

      case 'cardiac-embryology-overview':
        return (
          <svg viewBox="0 0 460 175" className="w-full h-auto" role="img" aria-label={title}>
            <rect x="16" y="18" width="428" height="138" rx="3" fill="var(--page-bg-secondary)" stroke="var(--hairline)" />
            <text x="230" y="36" textAnchor="middle" fill="#D9A773" fontSize="9" fontWeight="700">
              Overview of Embryonic Heart Folding &amp; Chamber Formation
            </text>
            {[
              { x: 30, t: 'Cardiac Mesoderm', s: 'Paired cardiogenic cords', c: '#D9A773' },
              { x: 132, t: 'Primitive Heart Tube', s: 'Early rhythmic contraction', c: '#7EB8AE' },
              { x: 234, t: 'Cardiac Looping', s: 'Spatial chamber alignment', c: 'var(--accent-gold)' },
              { x: 336, t: 'Four Chambers', s: 'Septation & valve formation', c: '#8FB4D4' },
            ].map((b) => (
              <g key={b.t}>
                <rect x={b.x} y="54" width="94" height="62" rx="2" fill="var(--page-bg)" stroke={b.c} />
                <text x={b.x + 47} y="78" textAnchor="middle" fill={b.c} fontSize="7.2" fontWeight="700">
                  {b.t}
                </text>
                <text x={b.x + 47} y="95" textAnchor="middle" fill="var(--page-muted)" fontSize="6.5">
                  {b.s}
                </text>
              </g>
            ))}
            <text x="230" y="140" textAnchor="middle" fill="var(--page-muted)" fontSize="6.7">
              General fetal/anatomy context; cited verses (23:14, 32:9) do not explicitly name the heart.
            </text>
          </svg>
        );

      case 'sensory-systems-development':
        return (
          <svg viewBox="0 0 460 175" className="w-full h-auto" role="img" aria-label={title}>
            <rect x="16" y="18" width="136" height="138" rx="3" fill="var(--page-bg-secondary)" stroke="var(--hairline)" />
            <text x="84" y="36" textAnchor="middle" fill="#7EB8AE" fontSize="8.5" fontWeight="700">
              Auditory Pathway
            </text>
            <text x="84" y="64" textAnchor="middle" fill="var(--page-ink)" fontSize="7.3">
              Outer &amp; Middle Ear
            </text>
            <text x="84" y="82" textAnchor="middle" fill="var(--accent-gold)" fontSize="7.3">
              ↓ Cochlea Hair Cells
            </text>
            <text x="84" y="100" textAnchor="middle" fill="var(--page-ink)" fontSize="7.3">
              Auditory Nerve (CN VIII)
            </text>
            <text x="84" y="124" textAnchor="middle" fill="var(--page-muted)" fontSize="6.4">
              Sound waves → impulses
            </text>

            <rect x="162" y="18" width="136" height="138" rx="3" fill="var(--page-bg-secondary)" stroke="var(--hairline)" />
            <text x="230" y="36" textAnchor="middle" fill="#8FB4D4" fontSize="8.5" fontWeight="700">
              Visual Pathway
            </text>
            <text x="230" y="64" textAnchor="middle" fill="var(--page-ink)" fontSize="7.3">
              Cornea &amp; Lens Focus
            </text>
            <text x="230" y="82" textAnchor="middle" fill="var(--accent-gold)" fontSize="7.3">
              ↓ Retinal Photoreceptors
            </text>
            <text x="230" y="100" textAnchor="middle" fill="var(--page-ink)" fontSize="7.3">
              Optic Nerve (CN II)
            </text>
            <text x="230" y="124" textAnchor="middle" fill="var(--page-muted)" fontSize="6.4">
              Sharp focus matures postnatally
            </text>

            <rect x="308" y="18" width="136" height="138" rx="3" fill="var(--page-bg-secondary)" stroke="var(--hairline)" />
            <text x="376" y="36" textAnchor="middle" fill="#D9A773" fontSize="8.5" fontWeight="700">
              Cortical Integration
            </text>
            <text x="376" y="68" textAnchor="middle" fill="var(--page-ink)" fontSize="7.2">
              Thalamic Relay &amp;
            </text>
            <text x="376" y="82" textAnchor="middle" fill="var(--page-ink)" fontSize="7.2">
              Sensory Cortices
            </text>
            <text x="376" y="114" textAnchor="middle" fill="var(--page-muted)" fontSize="6.4">
              Verse word order alone
            </text>
            <text x="376" y="126" textAnchor="middle" fill="var(--page-muted)" fontSize="6.4">
              needs tafsīr review.
            </text>
          </svg>
        );

      case 'brain-heart-distinction':
        return (
          <svg viewBox="0 0 460 175" className="w-full h-auto" role="img" aria-label={title}>
            <rect x="16" y="18" width="206" height="138" rx="3" fill="var(--page-bg-secondary)" stroke="#8FB4D4" />
            <text x="119" y="36" textAnchor="middle" fill="#8FB4D4" fontSize="8.6" fontWeight="700">
              Physiology: Brain vs. Cardiac Pump
            </text>
            <rect x="28" y="48" width="182" height="44" rx="2" fill="var(--page-bg)" stroke="var(--hairline)" />
            <text x="119" y="66" textAnchor="middle" fill="var(--page-ink)" fontSize="7.5" fontWeight="600">
              Cerebral Cortex &amp; Neural Networks
            </text>
            <text x="119" y="80" textAnchor="middle" fill="var(--page-muted)" fontSize="6.5">
              Cognition, reasoning, memory &amp; sensory processing
            </text>
            <rect x="28" y="100" width="182" height="44" rx="2" fill="var(--page-bg)" stroke="var(--hairline)" />
            <text x="119" y="118" textAnchor="middle" fill="var(--page-ink)" fontSize="7.5" fontWeight="600">
              Muscular Four-Chambered Heart
            </text>
            <text x="119" y="132" textAnchor="middle" fill="var(--page-muted)" fontSize="6.5">
              Pumps blood through pulmonary &amp; systemic circuits
            </text>

            <rect x="236" y="18" width="208" height="138" rx="3" fill="var(--page-bg-secondary)" stroke="var(--accent-gold)" strokeDasharray="3 2" />
            <text x="340" y="36" textAnchor="middle" fill="var(--accent-gold)" fontSize="8.6" fontWeight="700">
              Scriptural &amp; Linguistic Scope
            </text>
            <text x="340" y="64" textAnchor="middle" fill="#D9A773" fontSize="7.5" fontWeight="600">
              Arabic Qalb / Af’idah
            </text>
            <text x="340" y="82" textAnchor="middle" fill="var(--page-muted)" fontSize="6.7">
              Denotes inner conscience, reflection, and
            </text>
            <text x="340" y="94" textAnchor="middle" fill="var(--page-muted)" fontSize="6.7">
              moral discernment in classical usage.
            </text>
            <line x1="252" y1="110" x2="428" y2="110" stroke="var(--hairline)" />
            <text x="340" y="128" textAnchor="middle" fill="var(--page-ink)" fontSize="6.7">
              Do not equate spiritual qalb with cardiac
            </text>
            <text x="340" y="140" textAnchor="middle" fill="var(--page-ink)" fontSize="6.7">
              tissue or modern cortical neuroscience.
            </text>
          </svg>
        );

      case 'lifespan-weakness-strength-decline':
        return (
          <svg viewBox="0 0 460 175" className="w-full h-auto" role="img" aria-label={title}>
            <rect x="16" y="18" width="428" height="138" rx="3" fill="var(--page-bg-secondary)" stroke="var(--hairline)" />
            <text x="230" y="36" textAnchor="middle" fill="var(--accent-gold)" fontSize="9" fontWeight="700">
              Human Life-Course Physiological Capacity Arc (Conceptual Overview)
            </text>
            <path d="M46,118 Q135,112 224,56 Q315,62 414,116" fill="none" stroke="#D9A773" strokeWidth="2.2" />
            <circle cx="56" cy="116" r="4" fill="#7EB8AE" />
            <circle cx="224" cy="56" r="4.5" fill="var(--accent-gold)" />
            <circle cx="404" cy="114" r="4" fill="#8FB4D4" />

            <text x="68" y="134" textAnchor="middle" fill="var(--page-ink)" fontSize="7.2" fontWeight="600">
              Infancy &amp; Dependence
            </text>
            <text x="224" y="80" textAnchor="middle" fill="var(--accent-gold)" fontSize="7.4" fontWeight="700">
              Adult Peak Function
            </text>
            <text x="224" y="92" textAnchor="middle" fill="var(--page-muted)" fontSize="6.5">
              Musculoskeletal &amp; reproductive maturity
            </text>
            <text x="382" y="134" textAnchor="middle" fill="var(--page-ink)" fontSize="7.2" fontWeight="600">
              Senescence &amp; Frailty
            </text>
            <text x="230" y="149" textAnchor="middle" fill="var(--page-muted)" fontSize="6.5">
              Lifespan variation reflects genetics, nutrition, environment &amp; healthcare—not a rigid clinical timetable.
            </text>
          </svg>
        );

      case 'human-variation-proportion':
        return (
          <svg viewBox="0 0 460 175" className="w-full h-auto" role="img" aria-label={title}>
            <rect x="16" y="18" width="206" height="138" rx="3" fill="var(--page-bg-secondary)" stroke="var(--hairline)" />
            <text x="119" y="36" textAnchor="middle" fill="#D9A773" fontSize="8.6" fontWeight="700">
              Shared Structural Body Plan
            </text>
            <line x1="119" y1="48" x2="119" y2="128" stroke="var(--accent-gold)" strokeDasharray="3 2" />
            <circle cx="119" cy="60" r="10" fill="none" stroke="var(--page-ink)" strokeWidth="1.4" />
            <rect x="103" y="72" width="32" height="34" rx="2" fill="none" stroke="var(--page-ink)" strokeWidth="1.4" />
            <line x1="103" y1="78" x2="86" y2="98" stroke="var(--page-ink)" strokeWidth="1.4" />
            <line x1="135" y1="78" x2="152" y2="98" stroke="var(--page-ink)" strokeWidth="1.4" />
            <line x1="111" y1="106" x2="108" y2="128" stroke="var(--page-ink)" strokeWidth="1.4" />
            <line x1="127" y1="106" x2="130" y2="128" stroke="var(--page-ink)" strokeWidth="1.4" />
            <text x="119" y="144" textAnchor="middle" fill="var(--page-muted)" fontSize="6.5">
              Bilateral symmetry &amp; upright proportions
            </text>

            <rect x="238" y="18" width="206" height="138" rx="3" fill="var(--page-bg-secondary)" stroke="var(--hairline)" />
            <text x="341" y="36" textAnchor="middle" fill="#7EB8AE" fontSize="8.6" fontWeight="700">
              Individual Phenotypic Diversity
            </text>
            {[
              { y: 52, t: 'Polygenic Inheritance (Allele Combinations)' },
              { y: 80, t: 'Melanin & Complexion Variation' },
              { y: 108, t: 'Developmental & Environmental Modulation' },
            ].map((item) => (
              <g key={item.t}>
                <rect x="250" y={item.y} width="182" height="22" rx="2" fill="var(--page-bg)" stroke="var(--hairline)" />
                <text x="341" y={item.y + 14} textAnchor="middle" fill="var(--page-ink)" fontSize="6.9">
                  {item.t}
                </text>
              </g>
            ))}
            <text x="341" y="144" textAnchor="middle" fill="var(--page-muted)" fontSize="6.4">
              Verses reflect diversity without teaching genetics.
            </text>
          </svg>
        );

      case 'skin-sensory-nociception':
        return (
          <svg viewBox="0 0 460 175" className="w-full h-auto" role="img" aria-label={title}>
            <rect x="16" y="18" width="248" height="138" rx="3" fill="var(--page-bg-secondary)" stroke="var(--hairline)" />
            <text x="140" y="34" textAnchor="middle" fill="#D9A773" fontSize="8.5" fontWeight="700">
              Cutaneous Layers &amp; Sensory Receptors
            </text>
            <rect x="28" y="44" width="224" height="26" fill="#D9A773" fillOpacity="0.22" stroke="#D9A773" />
            <text x="40" y="61" fill="var(--page-ink)" fontSize="7.3" fontWeight="600">
              Epidermis (Barrier + Free Nerve Endings)
            </text>
            <rect x="28" y="70" width="224" height="42" fill="#7EB8AE" fillOpacity="0.14" stroke="#7EB8AE" />
            <text x="40" y="88" fill="var(--page-ink)" fontSize="7.3" fontWeight="600">
              Dermis (Nociceptors · Mechanoreceptors · Thermoreceptors)
            </text>
            <path d="M196,60 L196,118 L244,132" fill="none" stroke="var(--accent-gold)" strokeWidth="1.5" />
            <rect x="28" y="112" width="224" height="30" fill="var(--page-bg)" stroke="var(--hairline)" />
            <text x="40" y="130" fill="var(--page-muted)" fontSize="7">
              Subcutaneous Layer → Afferent Spinal Nerves
            </text>

            <rect x="278" y="18" width="166" height="138" rx="3" fill="var(--page-bg-secondary)" stroke="var(--accent-gold)" strokeDasharray="3 2" />
            <text x="361" y="38" textAnchor="middle" fill="var(--accent-gold)" fontSize="8.5" fontWeight="700">
              Scope Caution (4:56)
            </text>
            <text x="361" y="66" textAnchor="middle" fill="var(--page-ink)" fontSize="7.1" fontWeight="600">
              Eschatological Context
            </text>
            <text x="361" y="84" textAnchor="middle" fill="var(--page-muted)" fontSize="6.6">
              Internal tissues also sense pain.
            </text>
            <text x="361" y="98" textAnchor="middle" fill="var(--page-muted)" fontSize="6.6">
              Verse 4:56 is not a treatise
            </text>
            <text x="361" y="110" textAnchor="middle" fill="var(--page-muted)" fontSize="6.6">
              on nociceptor neuroscience.
            </text>
          </svg>
        );

      case 'fingerprint-friction-ridges':
        return (
          <svg viewBox="0 0 460 175" className="w-full h-auto" role="img" aria-label={title}>
            <rect x="16" y="18" width="180" height="138" rx="3" fill="var(--page-bg-secondary)" stroke="var(--hairline)" />
            <text x="106" y="36" textAnchor="middle" fill="#D9A773" fontSize="8.5" fontWeight="700">
              Epidermal Friction Ridges
            </text>
            {[10, 17, 24, 31, 38].map((r) => (
              <ellipse key={r} cx="106" cy="88" rx={r * 0.72} ry={r} fill="none" stroke="var(--accent-gold)" strokeWidth="1.2" opacity="0.85" />
            ))}
            <text x="106" y="142" textAnchor="middle" fill="var(--page-muted)" fontSize="6.5">
              Dermal papillae patterns form prenatally
            </text>

            <rect x="210" y="18" width="234" height="138" rx="3" fill="var(--page-bg-secondary)" stroke="var(--accent-gold)" strokeDasharray="3 2" />
            <text x="327" y="38" textAnchor="middle" fill="var(--accent-gold)" fontSize="8.6" fontWeight="700">
              Passage &amp; Source Audit Caution (75:3–4)
            </text>
            <text x="327" y="64" textAnchor="middle" fill="var(--page-ink)" fontSize="7.3" fontWeight="600">
              1. Source-Scope Mismatch
            </text>
            <text x="327" y="78" textAnchor="middle" fill="var(--page-muted)" fontSize="6.6">
              OpenStax A&amp;P / Biology 2e are general textbooks,
            </text>
            <text x="327" y="90" textAnchor="middle" fill="var(--page-muted)" fontSize="6.6">
              NOT primary forensic fingerprint studies.
            </text>
            <text x="327" y="112" textAnchor="middle" fill="var(--page-ink)" fontSize="7.3" fontWeight="600">
              2. Textual Context: Bodily Resurrection
            </text>
            <text x="327" y="126" textAnchor="middle" fill="var(--page-muted)" fontSize="6.6">
              &ldquo;Bananahu&rdquo; (fingertips) underscores power to restore
            </text>
            <text x="327" y="138" textAnchor="middle" fill="var(--page-muted)" fontSize="6.6">
              even fine extremities—not forensic uniqueness.
            </text>
          </svg>
        );

      case 'reproductive-anatomy-contribution':
        return (
          <svg viewBox="0 0 460 175" className="w-full h-auto" role="img" aria-label={title}>
            <rect x="16" y="18" width="236" height="138" rx="3" fill="var(--page-bg-secondary)" stroke="var(--hairline)" />
            <text x="134" y="36" textAnchor="middle" fill="#7EB8AE" fontSize="8.6" fontWeight="700">
              Human Reproductive Biology (Background)
            </text>
            <rect x="28" y="48" width="98" height="44" rx="2" fill="var(--page-bg)" stroke="#7EB8AE" />
            <text x="77" y="67" textAnchor="middle" fill="var(--page-ink)" fontSize="7.2" fontWeight="600">
              Gonadal Gametes
            </text>
            <text x="77" y="81" textAnchor="middle" fill="var(--page-muted)" fontSize="6.4">
              Testes (X/Y) &amp; Ovaries (X)
            </text>
            <rect x="142" y="48" width="98" height="44" rx="2" fill="var(--page-bg)" stroke="#D9A773" />
            <text x="191" y="67" textAnchor="middle" fill="var(--page-ink)" fontSize="7.2" fontWeight="600">
              Sex Differentiation
            </text>
            <text x="191" y="81" textAnchor="middle" fill="var(--page-muted)" fontSize="6.4">
              XX / XY + Endocrine Path
            </text>
            <rect x="28" y="102" width="212" height="40" rx="2" fill="var(--page-bg)" stroke="var(--hairline)" />
            <text x="134" y="119" textAnchor="middle" fill="var(--page-ink)" fontSize="7">
              Joint parental gamete contribution initiates gestation
            </text>
            <text x="134" y="132" textAnchor="middle" fill="var(--page-muted)" fontSize="6.4">
              NCBI Reproductive &amp; Fertilization background
            </text>

            <rect x="266" y="18" width="178" height="138" rx="3" fill="var(--page-bg-secondary)" stroke="var(--accent-gold)" strokeDasharray="3 2" />
            <text x="355" y="38" textAnchor="middle" fill="var(--accent-gold)" fontSize="8.5" fontWeight="700">
              Exegetical Restraint
            </text>
            <text x="355" y="66" textAnchor="middle" fill="var(--page-ink)" fontSize="7.1" fontWeight="600">
              No DNA Retrofitting
            </text>
            <text x="355" y="82" textAnchor="middle" fill="var(--page-muted)" fontSize="6.5">
              Do not project chromosomes into
            </text>
            <text x="355" y="94" textAnchor="middle" fill="var(--page-muted)" fontSize="6.5">
              verses lacking textual grounds.
            </text>
            <text x="355" y="118" textAnchor="middle" fill="#D9A773" fontSize="7" fontWeight="600">
              86:6–7 Remains Debated
            </text>
            <text x="355" y="132" textAnchor="middle" fill="var(--page-muted)" fontSize="6.4">
              Consult classical tafsīr carefully.
            </text>
          </svg>
        );

      case 'pregnancy-childbirth-maternal':
        return (
          <svg viewBox="0 0 460 175" className="w-full h-auto" role="img" aria-label={title}>
            <rect x="16" y="18" width="428" height="138" rx="3" fill="var(--page-bg-secondary)" stroke="var(--hairline)" />
            <text x="230" y="36" textAnchor="middle" fill="#D9A773" fontSize="9" fontWeight="700">
              Maternal Physiological Adaptations Across Pregnancy &amp; Parturition
            </text>
            {[
              { x: 28, t: 'Cardiovascular & Blood', s: 'Expanded plasma & cardiac output', c: '#D9A773' },
              { x: 168, t: 'Metabolic & Endocrine', s: 'Fetal glucose/lipid transfer & hormones', c: '#7EB8AE' },
              { x: 308, t: 'Labor & Parturition', s: 'Uterine contractions & birth recovery', c: 'var(--accent-gold)' },
            ].map((b) => (
              <g key={b.t}>
                <rect x={b.x} y="52" width="124" height="66" rx="2" fill="var(--page-bg)" stroke={b.c} />
                <text x={b.x + 62} y="76" textAnchor="middle" fill={b.c} fontSize="7.4" fontWeight="700">
                  {b.t}
                </text>
                <text x={b.x + 62} y="94" textAnchor="middle" fill="var(--page-muted)" fontSize="6.5">
                  {b.s}
                </text>
              </g>
            ))}
            <text x="230" y="140" textAnchor="middle" fill="var(--page-muted)" fontSize="6.7">
              NCBI Pregnancy &amp; ACOG overview; verses 31:14 &amp; 46:15 ground moral gratitude rather than obstetric protocols.
            </text>
          </svg>
        );

      case 'lactation-weaning-nutrition':
        return (
          <svg viewBox="0 0 460 175" className="w-full h-auto" role="img" aria-label={title}>
            <rect x="16" y="18" width="268" height="138" rx="3" fill="var(--page-bg-secondary)" stroke="var(--hairline)" />
            <text x="150" y="36" textAnchor="middle" fill="#7EB8AE" fontSize="8.8" fontWeight="700">
              WHO Infant &amp; Young Child Feeding Context
            </text>
            <rect x="28" y="50" width="244" height="28" rx="2" fill="var(--page-bg)" stroke="#7EB8AE" />
            <text x="150" y="67" textAnchor="middle" fill="var(--page-ink)" fontSize="7.2">
              Early Infancy: Human Milk Nutrition &amp; Antibodies
            </text>
            <rect x="28" y="84" width="244" height="28" rx="2" fill="var(--page-bg)" stroke="#D9A773" />
            <text x="150" y="101" textAnchor="middle" fill="var(--page-ink)" fontSize="7.2">
              Complementary Feeding + Continued Nursing
            </text>
            <rect x="28" y="118" width="244" height="26" rx="2" fill="var(--page-bg)" stroke="var(--hairline)" />
            <text x="150" y="134" textAnchor="middle" fill="var(--page-muted)" fontSize="6.7">
              Gradual physiological weaning as GI system matures
            </text>

            <rect x="298" y="18" width="146" height="138" rx="3" fill="var(--page-bg-secondary)" stroke="var(--accent-gold)" strokeDasharray="3 2" />
            <text x="371" y="38" textAnchor="middle" fill="var(--accent-gold)" fontSize="8.4" fontWeight="700">
              Source &amp; Clinical Note
            </text>
            <text x="371" y="66" textAnchor="middle" fill="var(--page-ink)" fontSize="7" fontWeight="600">
              Not Medical Advice
            </text>
            <text x="371" y="82" textAnchor="middle" fill="var(--page-muted)" fontSize="6.4">
              Distinguish 2:233 / 31:14 family
            </text>
            <text x="371" y="94" textAnchor="middle" fill="var(--page-muted)" fontSize="6.4">
              guidance from pediatric care.
            </text>
            <text x="371" y="118" textAnchor="middle" fill="#D9A773" fontSize="6.4">
              MedlinePlus Fetal Health link
            </text>
            <text x="371" y="130" textAnchor="middle" fill="var(--page-muted)" fontSize="6.4">
              is prenatal, not postnatal.
            </text>
          </svg>
        );

      case 'nourishment-vulnerability-dependence':
        return (
          <svg viewBox="0 0 460 175" className="w-full h-auto" role="img" aria-label={title}>
            <rect x="16" y="18" width="428" height="138" rx="3" fill="var(--page-bg-secondary)" stroke="var(--hairline)" />
            <text x="230" y="36" textAnchor="middle" fill="var(--accent-gold)" fontSize="9" fontWeight="700">
              Continuous Metabolic Inputs &amp; Homeostatic Limits
            </text>
            {[
              { x: 28, t: 'Hydration & Electrolytes', s: 'Cellular solvent & blood volume', c: '#8FB4D4' },
              { x: 132, t: 'O₂ & Respiration', s: 'Continuous aerobic ATP supply', c: '#7EB8AE' },
              { x: 236, t: 'Macronutrients', s: 'Carbs, lipids, protein synthesis', c: '#D9A773' },
              { x: 340, t: 'Tight Homeostasis', s: 'Narrow temp, pH & glucose bands', c: 'var(--accent-gold)' },
            ].map((b) => (
              <g key={b.t}>
                <rect x={b.x} y="52" width="92" height="66" rx="2" fill="var(--page-bg)" stroke={b.c} />
                <text x={b.x + 46} y="75" textAnchor="middle" fill={b.c} fontSize="7.1" fontWeight="700">
                  {b.t}
                </text>
                <text x={b.x + 46} y="95" textAnchor="middle" fill="var(--page-muted)" fontSize="6.3">
                  {b.s}
                </text>
              </g>
            ))}
            <text x="230" y="140" textAnchor="middle" fill="var(--page-muted)" fontSize="6.7">
              Physiology highlights dependence on continuous external inputs; verses carry theological &amp; existential depth.
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
