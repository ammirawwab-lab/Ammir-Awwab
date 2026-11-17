import React from 'react';
import { SocialLifeEthicsDiagramKind } from '../../types/encyclopedia';

interface SocialLifeEthicsDiagramProps {
  kind: SocialLifeEthicsDiagramKind;
  title: string;
  caption: string;
}

/**
 * Curated Chapter 10 Palette:
 * - Warm antique gold:  #C8A253
 * - Deep bronze ink:    #8C692B
 * - Archival olive sage:#6E856B
 * - Civic slate blue:   #6E7F91
 * Strictly educational conceptual illustrations — zero fabricated statistics,
 * survey metrics, economic percentages, or experimental claims.
 */
export const SocialLifeEthicsDiagram: React.FC<SocialLifeEthicsDiagramProps> = ({
  kind,
  title,
  caption,
}) => {
  const renderSvg = () => {
    switch (kind) {
      case 'justice-fairness-framework':
        return (
          <svg viewBox="0 0 460 175" className="w-full h-auto" role="img" aria-label={title}>
            <rect x="16" y="18" width="136" height="138" rx="3" fill="var(--page-bg-secondary)" stroke="#C8A253" strokeOpacity="0.6" />
            <text x="84" y="38" textAnchor="middle" fill="#C8A253" fontSize="8.5" fontWeight="700">
              Ethical Principle
            </text>
            <text x="84" y="64" textAnchor="middle" fill="var(--page-ink)" fontSize="7.5" fontWeight="600">
              Stand Firm for Justice
            </text>
            <text x="84" y="80" textAnchor="middle" fill="var(--page-muted)" fontSize="6.4">
              4:135 · 5:8 · Life Safeguards
            </text>
            <rect x="28" y="96" width="112" height="44" rx="2" fill="var(--page-bg)" stroke="var(--hairline)" />
            <text x="84" y="114" textAnchor="middle" fill="var(--page-ink)" fontSize="6.7">
              Obligatory regardless of
            </text>
            <text x="84" y="127" textAnchor="middle" fill="var(--page-ink)" fontSize="6.7">
              affection, bias, or status
            </text>

            <path d="M156 88 L178 88" stroke="#C8A253" strokeWidth="1.5" />
            <polygon points="178,84 186,88 178,92" fill="#C8A253" />

            <rect x="188" y="18" width="130" height="138" rx="3" fill="var(--page-bg-secondary)" stroke="#6E7F91" strokeOpacity="0.65" />
            <text x="253" y="38" textAnchor="middle" fill="#6E7F91" fontSize="8.5" fontWeight="700">
              Procedural Fairness
            </text>
            {[
              { y: 50, t: 'Consistent Rules', s: 'Applied evenly across persons' },
              { y: 82, t: 'Fair Hearing', s: 'Evidence reviewed neutrally' },
              { y: 114, t: 'Safety & Accountability', s: 'Limits harm & impunity' },
            ].map((item) => (
              <g key={item.t}>
                <rect x="198" y={item.y} width="110" height="26" rx="2" fill="var(--page-bg)" stroke="#6E7F91" strokeOpacity="0.5" />
                <text x="205" y={item.y + 11} fill="var(--page-ink)" fontSize="6.9" fontWeight="600">{item.t}</text>
                <text x="205" y={item.y + 21} fill="var(--page-muted)" fontSize="6.1">{item.s}</text>
              </g>
            ))}

            <path d="M322 88 L342 88" stroke="#6E856B" strokeWidth="1.5" />
            <polygon points="342,84 350,88 342,92" fill="#6E856B" />

            <rect x="352" y="18" width="92" height="138" rx="3" fill="var(--page-bg-secondary)" stroke="#6E856B" strokeOpacity="0.65" />
            <text x="398" y="38" textAnchor="middle" fill="#6E856B" fontSize="8.2" fontWeight="700">
              Social Trust
            </text>
            <text x="398" y="70" textAnchor="middle" fill="var(--page-ink)" fontSize="6.9" fontWeight="600">
              Legitimacy &amp;
            </text>
            <text x="398" y="82" textAnchor="middle" fill="var(--page-ink)" fontSize="6.9" fontWeight="600">
              Cooperation
            </text>
            <text x="398" y="108" textAnchor="middle" fill="var(--page-muted)" fontSize="6.0">
              Context-dependent;
            </text>
            <text x="398" y="119" textAnchor="middle" fill="var(--page-muted)" fontSize="6.0">
              not a single-cause
            </text>
            <text x="398" y="130" textAnchor="middle" fill="var(--page-muted)" fontSize="6.0">
              miracle claim
            </text>
          </svg>
        );

      case 'impartial-judgment-bias':
        return (
          <svg viewBox="0 0 460 175" className="w-full h-auto" role="img" aria-label={title}>
            <rect x="18" y="18" width="198" height="138" rx="3" fill="var(--page-bg-secondary)" stroke="var(--hairline)" />
            <text x="117" y="37" textAnchor="middle" fill="#8C692B" fontSize="8.6" fontWeight="700">
              Pulls Toward Partiality
            </text>
            {[
              { y: 50, t: 'Self-Interest & Status', s: 'Skewing outcomes toward personal gain' },
              { y: 82, t: 'Kinship or Ingroup Loyalty', s: 'Excusing allies while judging rivals' },
              { y: 114, t: 'Anger & Retaliation', s: 'Letting enmity override fairness (5:8)' },
            ].map((row) => (
              <g key={row.t}>
                <rect x="30" y={row.y} width="174" height="26" rx="2" fill="var(--page-bg)" stroke="#8C692B" strokeOpacity="0.45" />
                <text x="38" y={row.y + 11} fill="var(--page-ink)" fontSize="7.0" fontWeight="600">{row.t}</text>
                <text x="38" y={row.y + 21} fill="var(--page-muted)" fontSize="6.1">{row.s}</text>
              </g>
            ))}

            <line x1="230" y1="22" x2="230" y2="152" stroke="#C8A253" strokeDasharray="3 3" />

            <rect x="244" y="18" width="198" height="138" rx="3" fill="var(--page-bg-secondary)" stroke="#6E856B" strokeOpacity="0.65" />
            <text x="343" y="37" textAnchor="middle" fill="#6E856B" fontSize="8.6" fontWeight="700">
              Safeguards for Impartiality
            </text>
            {[
              { y: 50, t: 'Even-Handed Standard', s: 'Same evidence rule for friend and critic' },
              { y: 82, t: 'Recusal & Independent Review', s: 'Stepping back when stakes conflict' },
              { y: 114, t: 'Restraint Under Tension', s: 'No transgression beyond just bounds' },
            ].map((row) => (
              <g key={row.t}>
                <rect x="256" y={row.y} width="174" height="26" rx="2" fill="var(--page-bg)" stroke="#6E856B" strokeOpacity="0.55" />
                <text x="264" y={row.y + 11} fill="var(--page-ink)" fontSize="7.0" fontWeight="600">{row.t}</text>
                <text x="264" y={row.y + 21} fill="var(--page-muted)" fontSize="6.1">{row.s}</text>
              </g>
            ))}
          </svg>
        );

      case 'institutional-trust-accountability':
        return (
          <svg viewBox="0 0 460 175" className="w-full h-auto" role="img" aria-label={title}>
            <rect x="20" y="20" width="420" height="28" rx="2" fill="var(--page-bg-secondary)" stroke="#C8A253" strokeOpacity="0.6" />
            <text x="230" y="38" textAnchor="middle" fill="#C8A253" fontSize="8.6" fontWeight="700">
              Public Trust Requires Moral Integrity + Institutional Checks
            </text>
            {[
              { x: 20, t: 'Honour Trusts', s1: 'Return amanat fairly', s2: '4:58 · 8:27', c: '#C8A253' },
              { x: 164, t: 'Anti-Bribery Bar', s1: 'No illicit payments or', s2: 'collusive favours (2:188)', c: '#8C692B' },
              { x: 308, t: 'Public Oversight', s1: 'Transparent records,', s2: 'audits & legal redress', c: '#6E7F91' },
            ].map((b) => (
              <g key={b.t}>
                <rect x={b.x} y="60" width="132" height="92" rx="3" fill="var(--page-bg-secondary)" stroke={b.c} strokeOpacity="0.65" />
                <text x={b.x + 66} y="82" textAnchor="middle" fill={b.c} fontSize="8.2" fontWeight="700">{b.t}</text>
                <rect x={b.x + 10} y="94" width="112" height="44" rx="2" fill="var(--page-bg)" stroke="var(--hairline)" />
                <text x={b.x + 66} y="113" textAnchor="middle" fill="var(--page-ink)" fontSize="6.9">{b.s1}</text>
                <text x={b.x + 66} y="126" textAnchor="middle" fill="var(--page-muted)" fontSize="6.4">{b.s2}</text>
              </g>
            ))}
          </svg>
        );

      case 'agreements-responsibility-cycle':
        return (
          <svg viewBox="0 0 460 175" className="w-full h-auto" role="img" aria-label={title}>
            {[
              { x: 24, y: 24, w: 186, h: 54, t: '1. Clear Mutual Terms', s: 'Defined obligations & fair consent (5:1)', c: '#C8A253' },
              { x: 250, y: 24, w: 186, h: 54, t: '2. Dependable Execution', s: 'Honouring timelines & promises (16:91)', c: '#6E856B' },
              { x: 250, y: 98, w: 186, h: 54, t: '3. Reduced Coordination Friction', s: 'Predictability lowers dispute risk', c: '#6E7F91' },
              { x: 24, y: 98, w: 186, h: 54, t: '4. Legal & Fair Remedies', s: 'Accountability when agreements strain', c: '#8C692B' },
            ].map((node) => (
              <g key={node.t}>
                <rect x={node.x} y={node.y} width={node.w} height={node.h} rx="3" fill="var(--page-bg-secondary)" stroke={node.c} strokeOpacity="0.7" />
                <text x={node.x + node.w / 2} y={node.y + 22} textAnchor="middle" fill={node.c} fontSize="8.1" fontWeight="700">{node.t}</text>
                <text x={node.x + node.w / 2} y={node.y + 39} textAnchor="middle" fill="var(--page-muted)" fontSize="6.5">{node.s}</text>
              </g>
            ))}
            <path d="M214 51 L244 51" stroke="#C8A253" strokeWidth="1.5" />
            <polygon points="242,47 249,51 242,55" fill="#C8A253" />
            <path d="M343 80 L343 93" stroke="#6E856B" strokeWidth="1.5" />
            <polygon points="339,91 343,98 347,91" fill="#6E856B" />
            <path d="M246 125 L216 125" stroke="#6E7F91" strokeWidth="1.5" />
            <polygon points="218,121 211,125 218,129" fill="#6E7F91" />
            <path d="M117 95 L117 82" stroke="#8C692B" strokeWidth="1.5" />
            <polygon points="113,84 117,77 121,84" fill="#8C692B" />
          </svg>
        );

      case 'honest-measurement-exchange':
        return (
          <svg viewBox="0 0 460 175" className="w-full h-auto" role="img" aria-label={title}>
            <rect x="20" y="18" width="198" height="138" rx="3" fill="var(--page-bg-secondary)" stroke="#6E856B" strokeOpacity="0.65" />
            <text x="119" y="38" textAnchor="middle" fill="#6E856B" fontSize="8.6" fontWeight="700">
              Full, Just Measure (17:35)
            </text>
            <line x1="72" y1="88" x2="166" y2="88" stroke="#6E856B" strokeWidth="2.2" />
            <line x1="119" y1="54" x2="119" y2="110" stroke="#6E856B" strokeWidth="1.6" />
            <rect x="64" y="72" width="22" height="14" rx="1" fill="var(--page-bg)" stroke="#6E856B" />
            <rect x="152" y="72" width="22" height="14" rx="1" fill="var(--page-bg)" stroke="#6E856B" />
            <text x="119" y="128" textAnchor="middle" fill="var(--page-ink)" fontSize="6.9" fontWeight="600">
              Buyer confidence &amp; fair trade
            </text>
            <text x="119" y="142" textAnchor="middle" fill="var(--page-muted)" fontSize="6.1">
              Supported by verified calibration
            </text>

            <rect x="242" y="18" width="198" height="138" rx="3" fill="var(--page-bg-secondary)" stroke="#8C692B" strokeOpacity="0.65" />
            <text x="341" y="38" textAnchor="middle" fill="#8C692B" fontSize="8.6" fontWeight="700">
              Shortchanging (83:1–3)
            </text>
            <line x1="294" y1="96" x2="388" y2="78" stroke="#8C692B" strokeWidth="2.2" />
            <line x1="341" y1="54" x2="341" y2="110" stroke="#8C692B" strokeWidth="1.6" />
            <rect x="286" y="80" width="22" height="14" rx="1" fill="var(--page-bg)" stroke="#8C692B" />
            <rect x="374" y="64" width="22" height="14" rx="1" fill="var(--page-bg)" stroke="#8C692B" />
            <text x="341" y="128" textAnchor="middle" fill="var(--page-ink)" fontSize="6.9" fontWeight="600">
              Hidden loss &amp; distrust
            </text>
            <text x="341" y="142" textAnchor="middle" fill="var(--page-muted)" fontSize="6.1">
              Ethically aligned ≠ full metrological code
            </text>
          </svg>
        );

      case 'fraud-consumer-protection':
        return (
          <svg viewBox="0 0 460 175" className="w-full h-auto" role="img" aria-label={title}>
            <rect x="18" y="20" width="200" height="134" rx="3" fill="var(--page-bg-secondary)" stroke="#8C692B" strokeOpacity="0.65" />
            <text x="118" y="39" textAnchor="middle" fill="#8C692B" fontSize="8.5" fontWeight="700">
              Economic Exploitation Risks
            </text>
            {[
              { y: 52, t: 'Misleading Terms & Concealment', s: 'Hiding defects or true pricing' },
              { y: 84, t: 'Unequal Bargaining Pressure', s: 'Preying on urgency or need' },
              { y: 116, t: 'Market Confidence Erosion', s: 'Honest sellers & buyers harmed' },
            ].map((row) => (
              <g key={row.t}>
                <rect x="28" y={row.y} width="180" height="25" rx="2" fill="var(--page-bg)" stroke="var(--hairline)" />
                <text x="35" y={row.y + 11} fill="var(--page-ink)" fontSize="6.9" fontWeight="600">{row.t}</text>
                <text x="35" y={row.y + 20} fill="var(--page-muted)" fontSize="6.0">{row.s}</text>
              </g>
            ))}

            <rect x="242" y="20" width="200" height="134" rx="3" fill="var(--page-bg-secondary)" stroke="#6E7F91" strokeOpacity="0.65" />
            <text x="342" y="39" textAnchor="middle" fill="#6E7F91" fontSize="8.5" fontWeight="700">
              Multi-Layer Protection
            </text>
            {[
              { y: 52, t: 'Ethical Restraint (2:188, 4:29)', s: 'Refusing wrongful wealth' },
              { y: 84, t: 'Transparent Disclosures', s: 'Clear weights, price & risks' },
              { y: 116, t: 'Consumer & Regulatory Law', s: 'Inspections, standards & redress' },
            ].map((row) => (
              <g key={row.t}>
                <rect x="252" y={row.y} width="180" height="25" rx="2" fill="var(--page-bg)" stroke="#6E7F91" strokeOpacity="0.5" />
                <text x="259" y={row.y + 11} fill="var(--page-ink)" fontSize="6.9" fontWeight="600">{row.t}</text>
                <text x="259" y={row.y + 20} fill="var(--page-muted)" fontSize="6.0">{row.s}</text>
              </g>
            ))}
          </svg>
        );

      case 'mutual-consent-transactions':
        return (
          <svg viewBox="0 0 460 175" className="w-full h-auto" role="img" aria-label={title}>
            <rect x="20" y="22" width="126" height="130" rx="3" fill="var(--page-bg-secondary)" stroke="#C8A253" strokeOpacity="0.65" />
            <text x="83" y="42" textAnchor="middle" fill="#C8A253" fontSize="8.3" fontWeight="700">Party A</text>
            <text x="83" y="74" textAnchor="middle" fill="var(--page-ink)" fontSize="7.0" fontWeight="600">Honest Disclosure</text>
            <text x="83" y="90" textAnchor="middle" fill="var(--page-muted)" fontSize="6.2">No deception or</text>
            <text x="83" y="102" textAnchor="middle" fill="var(--page-muted)" fontSize="6.2">hidden terms</text>

            <rect x="167" y="42" width="126" height="90" rx="3" fill="var(--page-bg)" stroke="#6E856B" strokeWidth="1.4" />
            <text x="230" y="64" textAnchor="middle" fill="#6E856B" fontSize="8.4" fontWeight="700">Mutual Consent</text>
            <text x="230" y="80" textAnchor="middle" fill="var(--page-ink)" fontSize="6.9">(Taradin · 4:29)</text>
            <text x="230" y="99" textAnchor="middle" fill="var(--page-muted)" fontSize="6.1">Voluntary choice free</text>
            <text x="230" y="111" textAnchor="middle" fill="var(--page-muted)" fontSize="6.1">from coercion</text>

            <rect x="314" y="22" width="126" height="130" rx="3" fill="var(--page-bg-secondary)" stroke="#6E7F91" strokeOpacity="0.65" />
            <text x="377" y="42" textAnchor="middle" fill="#6E7F91" fontSize="8.3" fontWeight="700">Party B</text>
            <text x="377" y="74" textAnchor="middle" fill="var(--page-ink)" fontSize="7.0" fontWeight="600">Informed Choice</text>
            <text x="377" y="90" textAnchor="middle" fill="var(--page-muted)" fontSize="6.2">Right to inspect,</text>
            <text x="377" y="102" textAnchor="middle" fill="var(--page-muted)" fontSize="6.2">compare, or decline</text>

            <path d="M148 86 L165 86" stroke="#C8A253" strokeWidth="1.5" />
            <path d="M295 86 L312 86" stroke="#6E7F91" strokeWidth="1.5" />
          </svg>
        );

      case 'written-debt-record':
        return (
          <svg viewBox="0 0 460 175" className="w-full h-auto" role="img" aria-label={title}>
            {[
              { x: 18, t: '1. Deferred Obligation', b1: 'Loan or credit for a', b2: 'stated term (2:282)', c: '#C8A253' },
              { x: 128, t: '2. Written Record', b1: 'Exact amount, date &', b2: 'terms written fairly', c: '#6E7F91' },
              { x: 238, t: '3. Neutral Verification', b1: 'Confirmed by parties', b2: 'and witnesses', c: '#6E856B' },
              { x: 348, t: '4. Dispute Prevention', b1: 'Protects against', b2: 'memory drift & doubt', c: '#8C692B' },
            ].map((step, i) => (
              <g key={step.t}>
                <rect x={step.x} y="30" width="96" height="114" rx="3" fill="var(--page-bg-secondary)" stroke={step.c} strokeOpacity="0.65" />
                <text x={step.x + 48} y="52" textAnchor="middle" fill={step.c} fontSize="7.6" fontWeight="700">{step.t}</text>
                <rect x={step.x + 8} y="66" width="80" height="58" rx="2" fill="var(--page-bg)" stroke="var(--hairline)" />
                <text x={step.x + 48} y="90" textAnchor="middle" fill="var(--page-ink)" fontSize="6.4">{step.b1}</text>
                <text x={step.x + 48} y="103" textAnchor="middle" fill="var(--page-muted)" fontSize="6.2">{step.b2}</text>
                {i < 3 && (
                  <path d={`M${step.x + 98} 87 L${step.x + 108} 87`} stroke="#C8A253" strokeWidth="1.5" />
                )}
              </g>
            ))}
          </svg>
        );

      case 'documentation-witness-framework':
        return (
          <svg viewBox="0 0 460 175" className="w-full h-auto" role="img" aria-label={title}>
            <rect x="20" y="20" width="272" height="134" rx="3" fill="var(--page-bg-secondary)" stroke="#C8A253" strokeOpacity="0.6" />
            <text x="156" y="40" textAnchor="middle" fill="#C8A253" fontSize="8.5" fontWeight="700">
              Corroborating Agreed Terms (2:282 · 65:2)
            </text>
            {[
              { y: 54, t: 'Contemporaneous Records', s: 'Dates, amounts, and conditions preserved accurately' },
              { y: 86, t: 'Credible Witnesses', s: 'Independent attestation reduces post-hoc denial' },
              { y: 118, t: 'Jurisdictional Nuance', s: 'Statutory rules vary across modern legal systems' },
            ].map((row) => (
              <g key={row.t}>
                <rect x="32" y={row.y} width="248" height="25" rx="2" fill="var(--page-bg)" stroke="var(--hairline)" />
                <text x="40" y={row.y + 11} fill="var(--page-ink)" fontSize="6.9" fontWeight="600">{row.t}</text>
                <text x="40" y={row.y + 20} fill="var(--page-muted)" fontSize="6.0">{row.s}</text>
              </g>
            ))}

            <rect x="308" y="20" width="132" height="134" rx="3" fill="var(--page-bg-secondary)" stroke="#6E7F91" strokeOpacity="0.65" />
            <text x="374" y="42" textAnchor="middle" fill="#6E7F91" fontSize="8.3" fontWeight="700">Boundary</text>
            <text x="374" y="72" textAnchor="middle" fill="var(--page-ink)" fontSize="6.9" fontWeight="600">Ethical Guidance</text>
            <text x="374" y="86" textAnchor="middle" fill="var(--page-muted)" fontSize="6.2">Supports fairness &amp;</text>
            <text x="374" y="98" textAnchor="middle" fill="var(--page-muted)" fontSize="6.2">accountability—not a</text>
            <text x="374" y="110" textAnchor="middle" fill="var(--page-muted)" fontSize="6.2">full modern civil</text>
            <text x="374" y="122" textAnchor="middle" fill="var(--page-muted)" fontSize="6.2">evidence code</text>
          </svg>
        );

      case 'charity-social-support':
        return (
          <svg viewBox="0 0 460 175" className="w-full h-auto" role="img" aria-label={title}>
            <rect x="18" y="18" width="134" height="138" rx="3" fill="var(--page-bg-secondary)" stroke="#C8A253" strokeOpacity="0.65" />
            <text x="85" y="38" textAnchor="middle" fill="#C8A253" fontSize="8.3" fontWeight="700">Moral &amp; Civic Pillars</text>
            <text x="85" y="66" textAnchor="middle" fill="var(--page-ink)" fontSize="7.0" fontWeight="600">Justice (‘Adl)</text>
            <text x="85" y="84" textAnchor="middle" fill="var(--page-ink)" fontSize="7.0" fontWeight="600">Benevolence (Ihsan)</text>
            <text x="85" y="102" textAnchor="middle" fill="var(--page-ink)" fontSize="7.0" fontWeight="600">Dignified Giving</text>
            <text x="85" y="124" textAnchor="middle" fill="var(--page-muted)" fontSize="6.1">2:177 · 9:60 · 16:90</text>

            <path d="M156 88 L176 88" stroke="#C8A253" strokeWidth="1.5" />

            <rect x="178" y="18" width="142" height="138" rx="3" fill="var(--page-bg-secondary)" stroke="#6E856B" strokeOpacity="0.65" />
            <text x="249" y="38" textAnchor="middle" fill="#6E856B" fontSize="8.3" fontWeight="700">Support Channels</text>
            {[
              { y: 50, t: 'Immediate Material Aid', s: 'Food, shelter & emergency relief' },
              { y: 82, t: 'Structured Social Welfare', s: 'Fair targeting & accountability' },
              { y: 114, t: 'Inclusive Civic Dignity', s: 'Aid without humiliation' },
            ].map((row) => (
              <g key={row.t}>
                <rect x="188" y={row.y} width="122" height="25" rx="2" fill="var(--page-bg)" stroke="#6E856B" strokeOpacity="0.45" />
                <text x="195" y={row.y + 11} fill="var(--page-ink)" fontSize="6.7" fontWeight="600">{row.t}</text>
                <text x="195" y={row.y + 20} fill="var(--page-muted)" fontSize="5.9">{row.s}</text>
              </g>
            ))}

            <path d="M324 88 L344 88" stroke="#6E856B" strokeWidth="1.5" />

            <rect x="346" y="18" width="96" height="138" rx="3" fill="var(--page-bg-secondary)" stroke="#6E7F91" strokeOpacity="0.65" />
            <text x="394" y="38" textAnchor="middle" fill="#6E7F91" fontSize="8.1" fontWeight="700">Outcomes</text>
            <text x="394" y="70" textAnchor="middle" fill="var(--page-ink)" fontSize="6.8" fontWeight="600">Reduced Hardship</text>
            <text x="394" y="88" textAnchor="middle" fill="var(--page-ink)" fontSize="6.8" fontWeight="600">&amp; Social Trust</text>
            <text x="394" y="114" textAnchor="middle" fill="var(--page-muted)" fontSize="6.0">Depends on delivery</text>
            <text x="394" y="126" textAnchor="middle" fill="var(--page-muted)" fontSize="6.0">&amp; public policy</text>
          </svg>
        );

      case 'responsible-resource-use':
        return (
          <svg viewBox="0 0 460 175" className="w-full h-auto" role="img" aria-label={title}>
            <rect x="20" y="20" width="420" height="134" rx="3" fill="var(--page-bg-secondary)" stroke="var(--hairline)" />
            <text x="230" y="39" textAnchor="middle" fill="#C8A253" fontSize="8.6" fontWeight="700">
              Moderation Spectrum (7:31 · 17:26–27 · 25:67)
            </text>
            <rect x="36" y="54" width="118" height="82" rx="2" fill="var(--page-bg)" stroke="#6E7F91" strokeOpacity="0.6" />
            <text x="95" y="76" textAnchor="middle" fill="#6E7F91" fontSize="8.0" fontWeight="700">Withholding / Miserly</text>
            <text x="95" y="96" textAnchor="middle" fill="var(--page-muted)" fontSize="6.3">Neglecting dependents</text>
            <text x="95" y="109" textAnchor="middle" fill="var(--page-muted)" fontSize="6.3">or refusing needful aid</text>

            <rect x="170" y="50" width="120" height="90" rx="2" fill="var(--page-bg)" stroke="#6E856B" strokeWidth="1.6" />
            <text x="230" y="73" textAnchor="middle" fill="#6E856B" fontSize="8.3" fontWeight="700">Balanced Stewardship</text>
            <text x="230" y="92" textAnchor="middle" fill="var(--page-ink)" fontSize="6.6" fontWeight="600">Sufficiency, savings,</text>
            <text x="230" y="104" textAnchor="middle" fill="var(--page-ink)" fontSize="6.6" fontWeight="600">&amp; generous sharing</text>
            <text x="230" y="122" textAnchor="middle" fill="var(--page-muted)" fontSize="5.9">No fixed numeric ratio</text>

            <rect x="306" y="54" width="118" height="82" rx="2" fill="var(--page-bg)" stroke="#8C692B" strokeOpacity="0.6" />
            <text x="365" y="76" textAnchor="middle" fill="#8C692B" fontSize="8.0" fontWeight="700">Extravagance / Waste</text>
            <text x="365" y="96" textAnchor="middle" fill="var(--page-muted)" fontSize="6.3">Israf &amp; tabdhir deplete</text>
            <text x="365" y="109" textAnchor="middle" fill="var(--page-muted)" fontSize="6.3">shared household resources</text>
          </svg>
        );

      case 'family-consultation-process':
        return (
          <svg viewBox="0 0 460 175" className="w-full h-auto" role="img" aria-label={title}>
            <rect x="18" y="18" width="276" height="138" rx="3" fill="var(--page-bg-secondary)" stroke="#C8A253" strokeOpacity="0.6" />
            <text x="156" y="37" textAnchor="middle" fill="#C8A253" fontSize="8.5" fontWeight="700">
              Family Dialogue, Respect &amp; Consultation (2:233 · 4:19)
            </text>
            {[
              { y: 49, t: 'Mutual Respect & Listening', s: 'Living honourably without contempt or hostility' },
              { y: 81, t: 'Shared Consultation (Tashawur)', s: 'Coordinating care decisions around child welfare' },
              { y: 113, t: 'Filial Care & Generosity', s: 'Supporting parents with gentleness and dignity' },
            ].map((r) => (
              <g key={r.t}>
                <rect x="30" y={r.y} width="252" height="25" rx="2" fill="var(--page-bg)" stroke="var(--hairline)" />
                <text x="38" y={r.y + 11} fill="var(--page-ink)" fontSize="6.9" fontWeight="600">{r.t}</text>
                <text x="38" y={r.y + 20} fill="var(--page-muted)" fontSize="6.0">{r.s}</text>
              </g>
            ))}

            <rect x="308" y="18" width="134" height="138" rx="3" fill="var(--page-bg-secondary)" stroke="#8C692B" strokeOpacity="0.7" />
            <text x="375" y="37" textAnchor="middle" fill="#8C692B" fontSize="8.3" fontWeight="700">
              Safety Safeguards
            </text>
            <text x="375" y="64" textAnchor="middle" fill="var(--page-ink)" fontSize="6.7" fontWeight="600">
              Never excuses abuse,
            </text>
            <text x="375" y="77" textAnchor="middle" fill="var(--page-ink)" fontSize="6.7" fontWeight="600">
              coercion, or neglect.
            </text>
            <text x="375" y="102" textAnchor="middle" fill="var(--page-muted)" fontSize="6.1">
              Respect never compels
            </text>
            <text x="375" y="114" textAnchor="middle" fill="var(--page-muted)" fontSize="6.1">
              harm or obedience in
            </text>
            <text x="375" y="126" textAnchor="middle" fill="var(--page-muted)" fontSize="6.1">
              wrongdoing.
            </text>
          </svg>
        );

      case 'child-welfare-protection':
        return (
          <svg viewBox="0 0 460 175" className="w-full h-auto" role="img" aria-label={title}>
            <rect x="18" y="18" width="136" height="138" rx="3" fill="var(--page-bg-secondary)" stroke="#C8A253" strokeOpacity="0.65" />
            <text x="86" y="38" textAnchor="middle" fill="#C8A253" fontSize="8.3" fontWeight="700">Caregiving &amp; Values</text>
            <text x="86" y="66" textAnchor="middle" fill="var(--page-ink)" fontSize="6.9" fontWeight="600">Attentive Nurture</text>
            <text x="86" y="84" textAnchor="middle" fill="var(--page-ink)" fontSize="6.9" fontWeight="600">Patient Moral Guidance</text>
            <text x="86" y="102" textAnchor="middle" fill="var(--page-muted)" fontSize="6.1">Adult example &amp;</text>
            <text x="86" y="114" textAnchor="middle" fill="var(--page-muted)" fontSize="6.1">dialogue (31:13–19)</text>

            <rect x="166" y="18" width="136" height="138" rx="3" fill="var(--page-bg-secondary)" stroke="#6E856B" strokeOpacity="0.65" />
            <text x="234" y="38" textAnchor="middle" fill="#6E856B" fontSize="8.3" fontWeight="700">Protective Environment</text>
            <text x="234" y="66" textAnchor="middle" fill="var(--page-ink)" fontSize="6.9" fontWeight="600">Safe Homes &amp; Schools</text>
            <text x="234" y="84" textAnchor="middle" fill="var(--page-ink)" fontSize="6.9" fontWeight="600">Nutrition &amp; Healthcare</text>
            <text x="234" y="102" textAnchor="middle" fill="var(--page-muted)" fontSize="6.1">Support for orphaned</text>
            <text x="234" y="114" textAnchor="middle" fill="var(--page-muted)" fontSize="6.1">&amp; vulnerable children</text>

            <rect x="314" y="18" width="128" height="138" rx="3" fill="var(--page-bg-secondary)" stroke="#6E7F91" strokeOpacity="0.65" />
            <text x="378" y="38" textAnchor="middle" fill="#6E7F91" fontSize="8.3" fontWeight="700">Legal Safeguard</text>
            <text x="378" y="66" textAnchor="middle" fill="var(--page-ink)" fontSize="6.8" fontWeight="600">Child-Protection Law</text>
            <text x="378" y="86" textAnchor="middle" fill="var(--page-muted)" fontSize="6.0">Moral texts are not a</text>
            <text x="378" y="98" textAnchor="middle" fill="var(--page-muted)" fontSize="6.0">complete modern</text>
            <text x="378" y="110" textAnchor="middle" fill="var(--page-muted)" fontSize="6.0">safeguarding or</text>
            <text x="378" y="122" textAnchor="middle" fill="var(--page-muted)" fontSize="6.0">development manual</text>
          </svg>
        );

      case 'orphan-property-protection':
        return (
          <svg viewBox="0 0 460 175" className="w-full h-auto" role="img" aria-label={title}>
            <rect x="20" y="20" width="198" height="134" rx="3" fill="var(--page-bg-secondary)" stroke="#6E856B" strokeOpacity="0.65" />
            <text x="119" y="40" textAnchor="middle" fill="#6E856B" fontSize="8.4" fontWeight="700">
              Fiduciary Protection (4:2 · 4:10)
            </text>
            {[
              { y: 54, t: 'Separate Asset Ledger', s: 'Do not substitute poor for good property' },
              { y: 86, t: 'Documented Custody', s: 'Independent oversight & fair accounting' },
              { y: 118, t: 'Restitution at Maturity', s: 'Full wealth handed over transparently' },
            ].map((r) => (
              <g key={r.t}>
                <rect x="30" y={r.y} width="178" height="25" rx="2" fill="var(--page-bg)" stroke="var(--hairline)" />
                <text x="38" y={r.y + 11} fill="var(--page-ink)" fontSize="6.8" fontWeight="600">{r.t}</text>
                <text x="38" y={r.y + 20} fill="var(--page-muted)" fontSize="5.9">{r.s}</text>
              </g>
            ))}

            <rect x="242" y="20" width="198" height="134" rx="3" fill="var(--page-bg-secondary)" stroke="#8C692B" strokeOpacity="0.65" />
            <text x="341" y="40" textAnchor="middle" fill="#8C692B" fontSize="8.4" fontWeight="700">
              Exploitation Safeguard
            </text>
            <text x="341" y="72" textAnchor="middle" fill="var(--page-ink)" fontSize="7.0" fontWeight="600">
              Zero Unjust Consumption
            </text>
            <text x="341" y="90" textAnchor="middle" fill="var(--page-muted)" fontSize="6.2">
              Dependents face high vulnerability
            </text>
            <text x="341" y="103" textAnchor="middle" fill="var(--page-muted)" fontSize="6.2">
              without enforceable guardianship
            </text>
            <text x="341" y="116" textAnchor="middle" fill="var(--page-muted)" fontSize="6.2">
              rules and external auditing.
            </text>
          </svg>
        );

      case 'neighbourhood-support-network':
        return (
          <svg viewBox="0 0 460 175" className="w-full h-auto" role="img" aria-label={title}>
            <circle cx="230" cy="88" r="30" fill="var(--page-bg-secondary)" stroke="#C8A253" strokeWidth="1.5" />
            <text x="230" y="85" textAnchor="middle" fill="#C8A253" fontSize="7.5" fontWeight="700">Household</text>
            <text x="230" y="96" textAnchor="middle" fill="var(--page-muted)" fontSize="6.0">Safety &amp; Dignity</text>

            {[
              { x: 46, y: 24, t: 'Relatives & Elders', s: 'Mutual care (16:90)', c: '#6E856B' },
              { x: 304, y: 24, t: 'Near & Far Neighbours', s: 'Courtesy & aid (4:36)', c: '#6E7F91' },
              { x: 46, y: 112, t: 'Guests & Travellers', s: 'Temporary support (9:60)', c: '#8C692B' },
              { x: 304, y: 112, t: 'Public Safety Nets', s: 'Health & protection services', c: '#C8A253' },
            ].map((node) => (
              <g key={node.t}>
                <rect x={node.x} y={node.y} width="110" height="40" rx="3" fill="var(--page-bg-secondary)" stroke={node.c} strokeOpacity="0.65" />
                <text x={node.x + 55} y={node.y + 17} textAnchor="middle" fill={node.c} fontSize="7.4" fontWeight="700">{node.t}</text>
                <text x={node.x + 55} y={node.y + 30} textAnchor="middle" fill="var(--page-muted)" fontSize="6.0">{node.s}</text>
              </g>
            ))}
            <line x1="158" y1="54" x2="204" y2="74" stroke="#6E856B" strokeWidth="1.2" />
            <line x1="302" y1="54" x2="256" y2="74" stroke="#6E7F91" strokeWidth="1.2" />
            <line x1="158" y1="126" x2="204" y2="104" stroke="#8C692B" strokeWidth="1.2" />
            <line x1="302" y1="126" x2="256" y2="104" stroke="#C8A253" strokeWidth="1.2" />
          </svg>
        );

      case 'privacy-personal-boundaries':
        return (
          <svg viewBox="0 0 460 175" className="w-full h-auto" role="img" aria-label={title}>
            <rect x="20" y="20" width="204" height="134" rx="3" fill="var(--page-bg-secondary)" stroke="#C8A253" strokeOpacity="0.65" />
            <text x="122" y="40" textAnchor="middle" fill="#C8A253" fontSize="8.4" fontWeight="700">
              Domestic &amp; Interpersonal Privacy
            </text>
            {[
              { y: 54, t: 'Home Inviolability (24:27–28)', s: 'Consent required before entry' },
              { y: 86, t: 'No Spying / Prying (49:12)', s: 'Reject intrusive suspicion & surveillance' },
              { y: 118, t: 'Respect in Shared Spaces', s: 'Humble demeanour & calm voice (31:19)' },
            ].map((r) => (
              <g key={r.t}>
                <rect x="30" y={r.y} width="184" height="25" rx="2" fill="var(--page-bg)" stroke="var(--hairline)" />
                <text x="38" y={r.y + 11} fill="var(--page-ink)" fontSize="6.8" fontWeight="600">{r.t}</text>
                <text x="38" y={r.y + 20} fill="var(--page-muted)" fontSize="5.9">{r.s}</text>
              </g>
            ))}

            <rect x="240" y="20" width="200" height="134" rx="3" fill="var(--page-bg-secondary)" stroke="#6E7F91" strokeOpacity="0.65" />
            <text x="340" y="40" textAnchor="middle" fill="#6E7F91" fontSize="8.4" fontWeight="700">
              Scope Distinction
            </text>
            <text x="340" y="72" textAnchor="middle" fill="var(--page-ink)" fontSize="7.0" fontWeight="600">
              Social Etiquette ≠ Digital Data Law
            </text>
            <text x="340" y="92" textAnchor="middle" fill="var(--page-muted)" fontSize="6.2">
              Modern data protection, institutional
            </text>
            <text x="340" y="105" textAnchor="middle" fill="var(--page-muted)" fontSize="6.2">
              records, and digital consent require
            </text>
            <text x="340" y="118" textAnchor="middle" fill="var(--page-muted)" fontSize="6.2">
              explicit statutory regulation.
            </text>
          </svg>
        );

      case 'permission-respectful-access':
        return (
          <svg viewBox="0 0 460 175" className="w-full h-auto" role="img" aria-label={title}>
            <rect x="20" y="54" width="110" height="66" rx="3" fill="var(--page-bg-secondary)" stroke="#C8A253" strokeOpacity="0.65" />
            <text x="75" y="78" textAnchor="middle" fill="#C8A253" fontSize="8.0" fontWeight="700">1. Request Entry</text>
            <text x="75" y="94" textAnchor="middle" fill="var(--page-muted)" fontSize="6.3">Ask permission &amp;</text>
            <text x="75" y="106" textAnchor="middle" fill="var(--page-muted)" fontSize="6.3">greet warmly (24:27)</text>

            <path d="M132 87 L160 87" stroke="#C8A253" strokeWidth="1.5" />
            <polygon points="158,83 165,87 158,91" fill="#C8A253" />

            <rect x="166" y="54" width="116" height="66" rx="3" fill="var(--page-bg-secondary)" stroke="#6E7F91" strokeOpacity="0.65" />
            <text x="224" y="78" textAnchor="middle" fill="#6E7F91" fontSize="8.0" fontWeight="700">2. Occupant Choice</text>
            <text x="224" y="94" textAnchor="middle" fill="var(--page-muted)" fontSize="6.3">Household autonomy</text>
            <text x="224" y="106" textAnchor="middle" fill="var(--page-muted)" fontSize="6.3">determines access</text>

            <path d="M284 72 L318 50" stroke="#6E856B" strokeWidth="1.4" />
            <path d="M284 102 L318 124" stroke="#8C692B" strokeWidth="1.4" />

            <rect x="320" y="24" width="120" height="54" rx="3" fill="var(--page-bg-secondary)" stroke="#6E856B" strokeOpacity="0.65" />
            <text x="380" y="45" textAnchor="middle" fill="#6E856B" fontSize="7.7" fontWeight="700">Granted: Enter Peacefully</text>
            <text x="380" y="61" textAnchor="middle" fill="var(--page-muted)" fontSize="6.1">Respectful social hospitality</text>

            <rect x="320" y="96" width="120" height="54" rx="3" fill="var(--page-bg-secondary)" stroke="#8C692B" strokeOpacity="0.65" />
            <text x="380" y="117" textAnchor="middle" fill="#8C692B" fontSize="7.7" fontWeight="700">Declined: Turn Back</text>
            <text x="380" y="133" textAnchor="middle" fill="var(--page-muted)" fontSize="6.1">Purer &amp; dignified (24:28)</text>
          </svg>
        );

      case 'verification-before-sharing':
        return (
          <svg viewBox="0 0 460 175" className="w-full h-auto" role="img" aria-label={title}>
            <rect x="18" y="46" width="98" height="82" rx="3" fill="var(--page-bg-secondary)" stroke="#8C692B" strokeOpacity="0.65" />
            <text x="67" y="68" textAnchor="middle" fill="#8C692B" fontSize="7.9" fontWeight="700">Incoming Report</text>
            <text x="67" y="88" textAnchor="middle" fill="var(--page-ink)" fontSize="6.4">Unchecked claim or</text>
            <text x="67" y="100" textAnchor="middle" fill="var(--page-ink)" fontSize="6.4">urgent rumour</text>
            <text x="67" y="116" textAnchor="middle" fill="var(--page-muted)" fontSize="5.9">(49:6 · Fatabayyanu)</text>

            <path d="M118 87 L142 87" stroke="#C8A253" strokeWidth="1.5" />

            <rect x="144" y="28" width="154" height="118" rx="3" fill="var(--page-bg-secondary)" stroke="#C8A253" strokeWidth="1.4" />
            <text x="221" y="48" textAnchor="middle" fill="#C8A253" fontSize="8.3" fontWeight="700">Verification Gate</text>
            {[
              { y: 58, t: '1. Trace Primary Source', s: 'Who originates the claim?' },
              { y: 85, t: '2. Inspect Corroboration', s: 'Is there independent evidence?' },
              { y: 112, t: '3. Weigh Potential Harm', s: 'Could error injure innocent people?' },
            ].map((s) => (
              <g key={s.t}>
                <rect x="154" y={s.y} width="134" height="22" rx="2" fill="var(--page-bg)" stroke="var(--hairline)" />
                <text x="160" y={s.y + 10} fill="var(--page-ink)" fontSize="6.6" fontWeight="600">{s.t}</text>
                <text x="160" y={s.y + 18} fill="var(--page-muted)" fontSize="5.8">{s.s}</text>
              </g>
            ))}

            <path d="M300 87 L324 87" stroke="#6E856B" strokeWidth="1.5" />

            <rect x="326" y="46" width="116" height="82" rx="3" fill="var(--page-bg-secondary)" stroke="#6E856B" strokeOpacity="0.65" />
            <text x="384" y="68" textAnchor="middle" fill="#6E856B" fontSize="7.9" fontWeight="700">Responsible Action</text>
            <text x="384" y="88" textAnchor="middle" fill="var(--page-ink)" fontSize="6.4">Withhold falsehoods;</text>
            <text x="384" y="100" textAnchor="middle" fill="var(--page-ink)" fontSize="6.4">share verified facts</text>
            <text x="384" y="116" textAnchor="middle" fill="var(--page-muted)" fontSize="5.9">Ethical rule ≠ full media policy</text>
          </svg>
        );

      case 'rumour-vs-verified-reporting':
        return (
          <svg viewBox="0 0 460 175" className="w-full h-auto" role="img" aria-label={title}>
            <rect x="18" y="18" width="202" height="138" rx="3" fill="var(--page-bg-secondary)" stroke="#8C692B" strokeOpacity="0.65" />
            <text x="119" y="38" textAnchor="middle" fill="#8C692B" fontSize="8.4" fontWeight="700">
              Harmful Speech (Prohibited)
            </text>
            {[
              { y: 52, t: 'Backbiting (Ghibah · 49:12)', s: 'Disparaging absent persons for malice/gossip' },
              { y: 84, t: 'Mockery & Stigmatizing Labels', s: 'Publicly humiliating others (49:11)' },
              { y: 116, t: 'Trust Erosion & Exclusion', s: 'Damages reputation & community cohesion' },
            ].map((row) => (
              <g key={row.t}>
                <rect x="28" y={row.y} width="182" height="25" rx="2" fill="var(--page-bg)" stroke="var(--hairline)" />
                <text x="35" y={row.y + 11} fill="var(--page-ink)" fontSize="6.7" fontWeight="600">{row.t}</text>
                <text x="35" y={row.y + 20} fill="var(--page-muted)" fontSize="5.9">{row.s}</text>
              </g>
            ))}

            <rect x="240" y="18" width="202" height="138" rx="3" fill="var(--page-bg-secondary)" stroke="#6E856B" strokeOpacity="0.65" />
            <text x="341" y="38" textAnchor="middle" fill="#6E856B" fontSize="8.4" fontWeight="700">
              Safeguarding Exception (Protected)
            </text>
            {[
              { y: 52, t: 'Reporting Abuse or Crime', s: 'Seeking protection & legal accountability' },
              { y: 84, t: 'Truthful Warning & Whistleblowing', s: 'Protecting vulnerable people from fraud/harm' },
              { y: 116, t: 'Confidential Counsel', s: 'Consulting qualified advisors or courts' },
            ].map((row) => (
              <g key={row.t}>
                <rect x="250" y={row.y} width="182" height="25" rx="2" fill="var(--page-bg)" stroke="#6E856B" strokeOpacity="0.45" />
                <text x="257" y={row.y + 11} fill="var(--page-ink)" fontSize="6.7" fontWeight="600">{row.t}</text>
                <text x="257" y={row.y + 20} fill="var(--page-muted)" fontSize="5.9">{row.s}</text>
              </g>
            ))}
          </svg>
        );

      case 'conflict-resolution-reconciliation':
        return (
          <svg viewBox="0 0 460 175" className="w-full h-auto" role="img" aria-label={title}>
            <rect x="18" y="20" width="268" height="134" rx="3" fill="var(--page-bg-secondary)" stroke="#6E856B" strokeOpacity="0.65" />
            <text x="152" y="39" textAnchor="middle" fill="#6E856B" fontSize="8.4" fontWeight="700">
              Constructive Mediation &amp; Peacebuilding (49:9–10 · 8:61)
            </text>
            {[
              { y: 52, t: 'Neutral Hearing & Fairness', s: 'Both sides heard without partisan bias (49:9)' },
              { y: 84, t: 'Repairing Fractured Ties', s: 'Seeking good-faith settlement & mutual safety' },
              { y: 116, t: 'Peaceful Coexistence', s: 'Honouring peace & justice toward non-hostile groups' },
            ].map((row) => (
              <g key={row.t}>
                <rect x="28" y={row.y} width="248" height="25" rx="2" fill="var(--page-bg)" stroke="var(--hairline)" />
                <text x="35" y={row.y + 11} fill="var(--page-ink)" fontSize="6.8" fontWeight="600">{row.t}</text>
                <text x="35" y={row.y + 20} fill="var(--page-muted)" fontSize="5.9">{row.s}</text>
              </g>
            ))}

            <rect x="302" y="20" width="140" height="134" rx="3" fill="var(--page-bg-secondary)" stroke="#8C692B" strokeOpacity="0.7" />
            <text x="372" y="40" textAnchor="middle" fill="#8C692B" fontSize="8.2" fontWeight="700">
              Mandatory Limit
            </text>
            <text x="372" y="70" textAnchor="middle" fill="var(--page-ink)" fontSize="6.9" fontWeight="600">
              Never Force Unsafe
            </text>
            <text x="372" y="83" textAnchor="middle" fill="var(--page-ink)" fontSize="6.9" fontWeight="600">
              Reconciliation
            </text>
            <text x="372" y="106" textAnchor="middle" fill="var(--page-muted)" fontSize="6.0">
              Mediation stops when
            </text>
            <text x="372" y="118" textAnchor="middle" fill="var(--page-muted)" fontSize="6.0">
              coercion, abuse, or
            </text>
            <text x="372" y="130" textAnchor="middle" fill="var(--page-muted)" fontSize="6.0">
              danger persists.
            </text>
          </svg>
        );

      case 'beneficial-vs-harmful-cooperation':
        return (
          <svg viewBox="0 0 460 175" className="w-full h-auto" role="img" aria-label={title}>
            <rect x="18" y="20" width="202" height="134" rx="3" fill="var(--page-bg-secondary)" stroke="#6E856B" strokeOpacity="0.65" />
            <text x="119" y="40" textAnchor="middle" fill="#6E856B" fontSize="8.3" fontWeight="700">
              Cooperate in Good (Birr · 5:2)
            </text>
            {[
              { y: 54, t: 'Shared Civic Projects', s: 'Education, mutual aid & disaster relief' },
              { y: 86, t: 'Accountable Teamwork', s: 'Unity paired with healthy critique' },
              { y: 118, t: 'Broad Public Benefit', s: 'Uplifts vulnerable & community alike' },
            ].map((r) => (
              <g key={r.t}>
                <rect x="28" y={r.y} width="182" height="25" rx="2" fill="var(--page-bg)" stroke="#6E856B" strokeOpacity="0.45" />
                <text x="35" y={r.y + 11} fill="var(--page-ink)" fontSize="6.8" fontWeight="600">{r.t}</text>
                <text x="35" y={r.y + 20} fill="var(--page-muted)" fontSize="5.9">{r.s}</text>
              </g>
            ))}

            <rect x="240" y="20" width="202" height="134" rx="3" fill="var(--page-bg-secondary)" stroke="#8C692B" strokeOpacity="0.65" />
            <text x="341" y="40" textAnchor="middle" fill="#8C692B" fontSize="8.3" fontWeight="700">
              Refuse Harmful Collusion (Ithm)
            </text>
            {[
              { y: 54, t: 'Collusion in Wrongdoing', s: 'Corruption, fraud, or collective aggression' },
              { y: 86, t: 'Factional Loyalty Over Truth', s: 'Silencing legitimate criticism (3:103)' },
              { y: 118, t: 'Coordinated Harm', s: 'Cooperation amplifies injustice when blind' },
            ].map((r) => (
              <g key={r.t}>
                <rect x="250" y={r.y} width="182" height="25" rx="2" fill="var(--page-bg)" stroke="#8C692B" strokeOpacity="0.45" />
                <text x="257" y={r.y + 11} fill="var(--page-ink)" fontSize="6.8" fontWeight="600">{r.t}</text>
                <text x="257" y={r.y + 20} fill="var(--page-muted)" fontSize="5.9">{r.s}</text>
              </g>
            ))}
          </svg>
        );

      case 'human-dignity-diversity':
        return (
          <svg viewBox="0 0 460 175" className="w-full h-auto" role="img" aria-label={title}>
            <rect x="20" y="18" width="420" height="30" rx="2" fill="var(--page-bg-secondary)" stroke="#C8A253" strokeOpacity="0.65" />
            <text x="230" y="37" textAnchor="middle" fill="#C8A253" fontSize="8.5" fontWeight="700">
              Equal Human Dignity (17:70 · 49:13) &amp; Freedom of Conscience (2:256)
            </text>
            {[
              { x: 20, t: 'Diversity of Peoples', s1: 'Languages, cultures &', s2: 'tribes for recognition', c: '#6E856B' },
              { x: 164, t: 'Non-Discrimination', s1: 'No superiority based on', s2: 'lineage, race, or wealth', c: '#C8A253' },
              { x: 308, t: 'Pluralist Care', s1: 'Moral dignity distinct from', s2: 'specific legal constitutions', c: '#6E7F91' },
            ].map((card) => (
              <g key={card.t}>
                <rect x={card.x} y="60" width="132" height="94" rx="3" fill="var(--page-bg-secondary)" stroke={card.c} strokeOpacity="0.65" />
                <text x={card.x + 66} y="82" textAnchor="middle" fill={card.c} fontSize="8.0" fontWeight="700">{card.t}</text>
                <rect x={card.x + 10} y="94" width="112" height="46" rx="2" fill="var(--page-bg)" stroke="var(--hairline)" />
                <text x={card.x + 66} y="114" textAnchor="middle" fill="var(--page-ink)" fontSize="6.6">{card.s1}</text>
                <text x={card.x + 66} y="127" textAnchor="middle" fill="var(--page-muted)" fontSize="6.3">{card.s2}</text>
              </g>
            ))}
          </svg>
        );

      case 'consultation-responsible-leadership':
        return (
          <svg viewBox="0 0 460 175" className="w-full h-auto" role="img" aria-label={title}>
            <rect x="18" y="20" width="134" height="134" rx="3" fill="var(--page-bg-secondary)" stroke="#6E7F91" strokeOpacity="0.65" />
            <text x="85" y="40" textAnchor="middle" fill="#6E7F91" fontSize="8.1" fontWeight="700">Community Voices</text>
            <text x="85" y="70" textAnchor="middle" fill="var(--page-ink)" fontSize="6.8" fontWeight="600">Consultation (Shura)</text>
            <text x="85" y="88" textAnchor="middle" fill="var(--page-muted)" fontSize="6.1">Diverse expertise &amp;</text>
            <text x="85" y="100" textAnchor="middle" fill="var(--page-muted)" fontSize="6.1">lived experience</text>
            <text x="85" y="118" textAnchor="middle" fill="var(--page-muted)" fontSize="5.9">42:38 · 3:159</text>

            <path d="M154 87 L174 87" stroke="#C8A253" strokeWidth="1.5" />

            <rect x="176" y="20" width="136" height="134" rx="3" fill="var(--page-bg-secondary)" stroke="#C8A253" strokeOpacity="0.7" />
            <text x="244" y="40" textAnchor="middle" fill="#C8A253" fontSize="8.1" fontWeight="700">Deliberation Filter</text>
            <text x="244" y="68" textAnchor="middle" fill="var(--page-ink)" fontSize="6.8" fontWeight="600">Resist Personal Desire</text>
            <text x="244" y="85" textAnchor="middle" fill="var(--page-muted)" fontSize="6.1">Guard against groupthink</text>
            <text x="244" y="98" textAnchor="middle" fill="var(--page-muted)" fontSize="6.1">&amp; partisan bias (38:26)</text>
            <text x="244" y="122" textAnchor="middle" fill="var(--page-muted)" fontSize="5.9">Ethical principle ≠ one</text>
            <text x="244" y="133" textAnchor="middle" fill="var(--page-muted)" fontSize="5.9">parliamentary model</text>

            <path d="M314 87 L334 87" stroke="#6E856B" strokeWidth="1.5" />

            <rect x="336" y="20" width="106" height="134" rx="3" fill="var(--page-bg-secondary)" stroke="#6E856B" strokeOpacity="0.65" />
            <text x="389" y="40" textAnchor="middle" fill="#6E856B" fontSize="8.0" fontWeight="700">Accountable</text>
            <text x="389" y="52" textAnchor="middle" fill="#6E856B" fontSize="8.0" fontWeight="700">Decision</text>
            <text x="389" y="82" textAnchor="middle" fill="var(--page-ink)" fontSize="6.8" fontWeight="600">Public Trust</text>
            <text x="389" y="100" textAnchor="middle" fill="var(--page-muted)" fontSize="6.0">Fiduciary duty to</text>
            <text x="389" y="112" textAnchor="middle" fill="var(--page-muted)" fontSize="6.0">serve fairly (4:58)</text>
          </svg>
        );

      case 'shared-resource-stewardship':
        return (
          <svg viewBox="0 0 460 175" className="w-full h-auto" role="img" aria-label={title}>
            <rect x="18" y="20" width="202" height="134" rx="3" fill="var(--page-bg-secondary)" stroke="#6E856B" strokeOpacity="0.65" />
            <text x="119" y="40" textAnchor="middle" fill="#6E856B" fontSize="8.3" fontWeight="700">
              Shared-Resource Stewardship
            </text>
            {[
              { y: 54, t: 'Restraint & Conservation (7:31)', s: 'Curbing unnecessary waste of commons' },
              { y: 86, t: 'Balance & Equity (55:7–9)', s: 'Fair distribution without hoarding' },
              { y: 118, t: 'Livelihood Protection (30:41)', s: 'Limiting corruption that harms ecosystems' },
            ].map((r) => (
              <g key={r.t}>
                <rect x="28" y={r.y} width="182" height="25" rx="2" fill="var(--page-bg)" stroke="var(--hairline)" />
                <text x="35" y={r.y + 11} fill="var(--page-ink)" fontSize="6.7" fontWeight="600">{r.t}</text>
                <text x="35" y={r.y + 20} fill="var(--page-muted)" fontSize="5.9">{r.s}</text>
              </g>
            ))}

            <rect x="240" y="20" width="202" height="134" rx="3" fill="var(--page-bg-secondary)" stroke="#C8A253" strokeOpacity="0.65" />
            <text x="341" y="40" textAnchor="middle" fill="#C8A253" fontSize="8.3" fontWeight="700">
              Interpretive Caution
            </text>
            <text x="341" y="70" textAnchor="middle" fill="var(--page-ink)" fontSize="6.9" fontWeight="600">
              Broad Ethical Instruction ≠
            </text>
            <text x="341" y="83" textAnchor="middle" fill="var(--page-ink)" fontSize="6.9" fontWeight="600">
              Technical Metric or Forecast
            </text>
            <text x="341" y="106" textAnchor="middle" fill="var(--page-muted)" fontSize="6.1">
              Mizan &amp; fasad carry rich moral and
            </text>
            <text x="341" y="118" textAnchor="middle" fill="var(--page-muted)" fontSize="6.1">
              theological scope; empirical ecology
            </text>
            <text x="341" y="130" textAnchor="middle" fill="var(--page-muted)" fontSize="6.1">
              requires direct environmental data.
            </text>
          </svg>
        );
    }
  };

  return (
    <figure className="my-2 p-3 border border-[var(--hairline)] bg-[var(--page-bg-secondary)]/35 rounded-sm">
      <div className="flex items-center justify-between gap-2 mb-2">
        <span className="text-[10.5px] uppercase tracking-[0.16em] text-[var(--accent-gold)] font-semibold">
          {title}
        </span>
        <span className="text-[10px] text-[var(--page-muted)]">
          Conceptual Educational Diagram
        </span>
      </div>
      {renderSvg()}
      <figcaption className="mt-2 text-[11px] leading-snug text-[var(--page-muted)] italic">
        {caption}
      </figcaption>
    </figure>
  );
};
