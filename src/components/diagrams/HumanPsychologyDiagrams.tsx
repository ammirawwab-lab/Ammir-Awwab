import React from 'react';
import { HumanPsychologyDiagramKind } from '../../types/encyclopedia';

interface HumanPsychologyDiagramProps {
  kind: HumanPsychologyDiagramKind;
  title: string;
  caption: string;
}

/**
 * Curated Chapter 09 Palette:
 * - Deep muted violet: #8A79AD
 * - Dusty indigo:      #7986B5
 * - Warm antique gold: #C9A962
 * - Muted sage accent: #7CA58E
 * Strictly educational schematics — never diagnostic instruments, clinical
 * assessments, personality tests, or psychological risk calculators.
 */
export const HumanPsychologyDiagram: React.FC<HumanPsychologyDiagramProps> = ({
  kind,
  title,
  caption,
}) => {
  const renderSvg = () => {
    switch (kind) {
      case 'emotional-wellbeing-meaning':
        return (
          <svg viewBox="0 0 460 175" className="w-full h-auto" role="img" aria-label={title}>
            <rect x="16" y="18" width="204" height="138" rx="3" fill="var(--page-bg-secondary)" stroke="var(--hairline)" />
            <text x="118" y="36" textAnchor="middle" fill="#8A79AD" fontSize="8.8" fontWeight="700">
              Devotional Meaning &amp; Coping Context
            </text>
            {[
              { y: 48, t: 'Contemplation & Remembrance', s: 'Provides rhythm & meaning for some' },
              { y: 78, t: 'Individual Variation', s: 'Outcomes vary across people & cultures' },
              { y: 108, t: 'Qalb ≠ Single Affect Variable', s: 'Requires linguistic & tafsir grounding' },
            ].map((row) => (
              <g key={row.t}>
                <rect x="28" y={row.y} width="180" height="24" rx="2" fill="var(--page-bg)" stroke="#8A79AD" strokeOpacity="0.65" />
                <text x="36" y={row.y + 11} fill="var(--page-ink)" fontSize="7.1" fontWeight="600">
                  {row.t}
                </text>
                <text x="36" y={row.y + 20} fill="var(--page-muted)" fontSize="6.2">
                  {row.s}
                </text>
              </g>
            ))}

            <rect x="234" y="18" width="210" height="138" rx="3" fill="var(--page-bg-secondary)" stroke="#C9A962" strokeDasharray="3 2" />
            <text x="339" y="36" textAnchor="middle" fill="#C9A962" fontSize="8.8" fontWeight="700">
              Clinical Care Safeguard
            </text>
            <text x="339" y="60" textAnchor="middle" fill="var(--page-ink)" fontSize="7.4" fontWeight="600">
              Not a Clinical Treatment
            </text>
            <text x="339" y="76" textAnchor="middle" fill="var(--page-muted)" fontSize="6.5">
              • Believers can experience depression or anxiety.
            </text>
            <text x="339" y="90" textAnchor="middle" fill="var(--page-muted)" fontSize="6.5">
              • Remembrance is NOT a cure-all or substitute
            </text>
            <text x="339" y="102" textAnchor="middle" fill="var(--page-muted)" fontSize="6.5">
              for qualified medical or therapy care.
            </text>
            <line x1="250" y1="115" x2="428" y2="115" stroke="var(--hairline)" />
            <text x="339" y="131" textAnchor="middle" fill="#7CA58E" fontSize="6.8" fontWeight="600">
              Professional care &amp; faith support can coexist
            </text>
            <text x="339" y="143" textAnchor="middle" fill="var(--page-muted)" fontSize="6.2">
              Simplified schematic; not a complete theory
            </text>
          </svg>
        );

      case 'hope-adversity-coping':
        return (
          <svg viewBox="0 0 460 175" className="w-full h-auto" role="img" aria-label={title}>
            <rect x="16" y="18" width="428" height="138" rx="3" fill="var(--page-bg-secondary)" stroke="var(--hairline)" />
            <text x="230" y="36" textAnchor="middle" fill="#7986B5" fontSize="8.8" fontWeight="700">
              Hope, Motivational Coping &amp; Clinical Boundaries Under Hardship
            </text>
            {[
              { x: 28, t: 'Realistic Appraisal', d: 'Acknowledge hardship', d2: 'without denial or blame', c: '#7986B5' },
              { x: 164, t: 'Hopeful Pathways', d: 'Sustains motivation &', d2: 'incremental steps', c: '#8A79AD' },
              { x: 300, t: 'Support & Care', d: 'Community aid + clinical', d2: 'help when distress deepens', c: '#7CA58E' },
            ].map((b) => (
              <g key={b.t}>
                <rect x={b.x} y="48" width="132" height="58" rx="3" fill="var(--page-bg)" stroke={b.c} strokeWidth="1.2" />
                <text x={b.x + 66} y="65" textAnchor="middle" fill={b.c} fontSize="7.4" fontWeight="700">
                  {b.t}
                </text>
                <text x={b.x + 66} y="80" textAnchor="middle" fill="var(--page-ink)" fontSize="6.5">
                  {b.d}
                </text>
                <text x={b.x + 66} y="92" textAnchor="middle" fill="var(--page-muted)" fontSize="6.3">
                  {b.d2}
                </text>
              </g>
            ))}
            <line x1="160" y1="77" x2="164" y2="77" stroke="#C9A962" strokeWidth="1.4" />
            <line x1="296" y1="77" x2="300" y2="77" stroke="#C9A962" strokeWidth="1.4" />
            <rect x="28" y="116" width="404" height="30" rx="2" fill="var(--page-bg)" stroke="#C9A962" strokeDasharray="3 2" />
            <text x="230" y="129" textAnchor="middle" fill="#C9A962" fontSize="7" fontWeight="700">
              Safeguard: Hope Does Not Guarantee Immediate Relief or Replace Clinical Depression Care
            </text>
            <text x="230" y="140" textAnchor="middle" fill="var(--page-muted)" fontSize="6.2">
              Never use religious encouragement to blame individuals facing depression or suicidal thoughts.
            </text>
          </svg>
        );

      case 'stress-coping-strategies':
        return (
          <svg viewBox="0 0 460 175" className="w-full h-auto" role="img" aria-label={title}>
            <rect x="16" y="18" width="212" height="138" rx="3" fill="var(--page-bg-secondary)" stroke="var(--hairline)" />
            <text x="122" y="36" textAnchor="middle" fill="#7986B5" fontSize="8.6" fontWeight="700">
              Context-Sensitive Coping Pathways
            </text>
            <rect x="28" y="48" width="188" height="28" rx="2" fill="var(--page-bg)" stroke="#7CA58E" />
            <text x="122" y="60" textAnchor="middle" fill="var(--page-ink)" fontSize="7.1" fontWeight="600">
              Controllable Factors → Practical Action
            </text>
            <text x="122" y="70" textAnchor="middle" fill="var(--page-muted)" fontSize="6.2">
              Problem-solving, planning, counsel &amp; safety steps
            </text>
            <rect x="28" y="84" width="188" height="28" rx="2" fill="var(--page-bg)" stroke="#8A79AD" />
            <text x="122" y="96" textAnchor="middle" fill="var(--page-ink)" fontSize="7.1" fontWeight="600">
              Uncontrollable Strain → Composure &amp; Trust
            </text>
            <text x="122" y="106" textAnchor="middle" fill="var(--page-muted)" fontSize="6.2">
              Emotional regulation &amp; religious endurance (sabr)
            </text>
            <text x="122" y="134" textAnchor="middle" fill="var(--page-muted)" fontSize="6.3">
              Effectiveness varies with resources &amp; safety.
            </text>

            <rect x="240" y="18" width="204" height="138" rx="3" fill="var(--page-bg-secondary)" stroke="#C9A962" strokeDasharray="3 2" />
            <text x="342" y="36" textAnchor="middle" fill="#C9A962" fontSize="8.6" fontWeight="700">
              Patience &amp; Safety Boundary
            </text>
            <text x="342" y="60" textAnchor="middle" fill="var(--page-ink)" fontSize="7.2" fontWeight="600">
              Sabr ≠ Passive Endurance of Harm
            </text>
            <text x="342" y="77" textAnchor="middle" fill="var(--page-muted)" fontSize="6.4">
              • Patience must NEVER be framed as a reason
            </text>
            <text x="342" y="89" textAnchor="middle" fill="var(--page-muted)" fontSize="6.4">
              to remain in abusive or dangerous settings.
            </text>
            <text x="342" y="105" textAnchor="middle" fill="var(--page-muted)" fontSize="6.4">
              • Tawakkul follows prudent action, never
            </text>
            <text x="342" y="117" textAnchor="middle" fill="var(--page-muted)" fontSize="6.4">
              neglecting protection or help-seeking.
            </text>
            <text x="342" y="140" textAnchor="middle" fill="#7CA58E" fontSize="6.4" fontWeight="600">
              Seeking safety &amp; care is responsible action
            </text>
          </svg>
        );

      case 'gratitude-wellbeing':
        return (
          <svg viewBox="0 0 460 175" className="w-full h-auto" role="img" aria-label={title}>
            <rect x="16" y="18" width="428" height="138" rx="3" fill="var(--page-bg-secondary)" stroke="var(--hairline)" />
            <text x="230" y="36" textAnchor="middle" fill="#7CA58E" fontSize="8.8" fontWeight="700">
              Gratitude, Value Priorities &amp; Methodological Limits
            </text>
            <rect x="28" y="48" width="192" height="58" rx="2" fill="var(--page-bg)" stroke="#7CA58E" />
            <text x="124" y="64" textAnchor="middle" fill="#7CA58E" fontSize="7.5" fontWeight="700">
              Gratitude &amp; Moderation
            </text>
            <text x="124" y="78" textAnchor="middle" fill="var(--page-ink)" fontSize="6.5">
              • Modest, variable wellbeing associations
            </text>
            <text x="124" y="90" textAnchor="middle" fill="var(--page-muted)" fontSize="6.3">
              • Counters compulsive material rivalry
            </text>
            <text x="124" y="100" textAnchor="middle" fill="var(--page-muted)" fontSize="6.3">
              without condemning honest livelihood
            </text>

            <rect x="236" y="48" width="196" height="58" rx="2" fill="var(--page-bg)" stroke="#C9A962" strokeDasharray="3 2" />
            <text x="334" y="64" textAnchor="middle" fill="#C9A962" fontSize="7.5" fontWeight="700">
              Cautions &amp; Cultural Variation
            </text>
            <text x="334" y="78" textAnchor="middle" fill="var(--page-ink)" fontSize="6.5">
              • Does not erase grief or hardship
            </text>
            <text x="334" y="90" textAnchor="middle" fill="var(--page-muted)" fontSize="6.3">
              • Never dismiss suffering as "ungrateful"
            </text>
            <text x="334" y="100" textAnchor="middle" fill="var(--page-muted)" fontSize="6.3">
              • Shukr has distinct theological scope
            </text>

            <rect x="28" y="116" width="404" height="28" rx="2" fill="var(--page-bg)" stroke="var(--hairline)" />
            <text x="230" y="133" textAnchor="middle" fill="var(--page-muted)" fontSize="6.6">
              Literature leads show context-dependent effects across populations; not a guarantee of happiness.
            </text>
          </svg>
        );

      case 'emotion-regulation-anger':
        return (
          <svg viewBox="0 0 460 175" className="w-full h-auto" role="img" aria-label={title}>
            <rect x="16" y="18" width="428" height="138" rx="3" fill="var(--page-bg-secondary)" stroke="var(--hairline)" />
            <text x="230" y="36" textAnchor="middle" fill="#8A79AD" fontSize="8.8" fontWeight="700">
              Emotion Regulation, Anger Restraint &amp; Comparison Triggers
            </text>
            {[
              { x: 28, t: '1. Trigger', s: 'Provocation or', s2: 'social comparison', c: '#7986B5' },
              { x: 132, t: '2. Pause', s: 'Interrupt immediate', s2: 'impulsive escalation', c: '#C9A962' },
              { x: 236, t: '3. Reappraise', s: 'Envy ≠ jealousy;', s2: 'check assumptions', c: '#8A79AD' },
              { x: 340, t: '4. Respond', s: 'Constructive speech', s2: 'or firm boundary', c: '#7CA58E' },
            ].map((step) => (
              <g key={step.t}>
                <rect x={step.x} y="50" width="92" height="58" rx="2" fill="var(--page-bg)" stroke={step.c} />
                <text x={step.x + 46} y="66" textAnchor="middle" fill={step.c} fontSize="7.4" fontWeight="700">
                  {step.t}
                </text>
                <text x={step.x + 46} y="82" textAnchor="middle" fill="var(--page-ink)" fontSize="6.3">
                  {step.s}
                </text>
                <text x={step.x + 46} y="94" textAnchor="middle" fill="var(--page-muted)" fontSize="6.2">
                  {step.s2}
                </text>
              </g>
            ))}
            <text x="230" y="130" textAnchor="middle" fill="var(--page-ink)" fontSize="6.7" fontWeight="600">
              Moral restraint (3:134) is not a clinical anger-management protocol; envy &amp; jealousy remain distinct constructs.
            </text>
            <text x="230" y="143" textAnchor="middle" fill="var(--page-muted)" fontSize="6.2">
              Educational schematic only; not a diagnostic or clinical assessment.
            </text>
          </svg>
        );

      case 'forgiveness-boundaries':
        return (
          <svg viewBox="0 0 460 175" className="w-full h-auto" role="img" aria-label={title}>
            <rect x="16" y="18" width="206" height="138" rx="3" fill="var(--page-bg-secondary)" stroke="var(--hairline)" />
            <text x="119" y="36" textAnchor="middle" fill="#8A79AD" fontSize="8.6" fontWeight="700">
              Internal Forgiveness Process
            </text>
            <rect x="28" y="48" width="182" height="32" rx="2" fill="var(--page-bg)" stroke="#8A79AD" />
            <text x="119" y="61" textAnchor="middle" fill="var(--page-ink)" fontSize="7.1" fontWeight="600">
              Releasing Chronic Bitterness
            </text>
            <text x="119" y="72" textAnchor="middle" fill="var(--page-muted)" fontSize="6.2">
              May reduce emotional distress over time
            </text>
            <rect x="28" y="88" width="182" height="32" rx="2" fill="var(--page-bg)" stroke="#7986B5" />
            <text x="119" y="101" textAnchor="middle" fill="var(--page-ink)" fontSize="7.1" fontWeight="600">
              Voluntary Moral Choice
            </text>
            <text x="119" y="112" textAnchor="middle" fill="var(--page-muted)" fontSize="6.2">
              Pardon (3:134, 42:40) varies by context
            </text>
            <text x="119" y="140" textAnchor="middle" fill="var(--page-muted)" fontSize="6.2">
              Not a forced timeline or obligation
            </text>

            <rect x="236" y="18" width="208" height="138" rx="3" fill="var(--page-bg-secondary)" stroke="#C9A962" strokeDasharray="3 2" />
            <text x="340" y="36" textAnchor="middle" fill="#C9A962" fontSize="8.6" fontWeight="700">
              Non-Negotiable Boundaries
            </text>
            <text x="340" y="60" textAnchor="middle" fill="var(--page-ink)" fontSize="7.1" fontWeight="600">
              Forgiveness ≠ Reconciliation
            </text>
            <text x="340" y="77" textAnchor="middle" fill="var(--page-muted)" fontSize="6.4">
              • Does NOT require forgetting harm.
            </text>
            <text x="340" y="91" textAnchor="middle" fill="var(--page-muted)" fontSize="6.4">
              • Does NOT remove accountability or safety.
            </text>
            <text x="340" y="105" textAnchor="middle" fill="var(--page-muted)" fontSize="6.4">
              • Never force reconciliation where abuse
            </text>
            <text x="340" y="117" textAnchor="middle" fill="var(--page-muted)" fontSize="6.4">
              or ongoing danger remains present.
            </text>
            <text x="340" y="140" textAnchor="middle" fill="#7CA58E" fontSize="6.4" fontWeight="600">
              Dignity &amp; protective limits stay intact
            </text>
          </svg>
        );

      case 'social-cognition-suspicion':
        return (
          <svg viewBox="0 0 460 175" className="w-full h-auto" role="img" aria-label={title}>
            <rect x="16" y="18" width="428" height="138" rx="3" fill="var(--page-bg-secondary)" stroke="var(--hairline)" />
            <text x="230" y="36" textAnchor="middle" fill="#7986B5" fontSize="8.8" fontWeight="700">
              Social Attribution Spectrum: Unfounded Suspicion vs Evidence-Based Prudence
            </text>
            <line x1="48" y1="74" x2="412" y2="74" stroke="var(--hairline)" strokeWidth="2" />
            {[
              { x: 96, t: 'Naive Neglect', s: 'Ignoring genuine', s2: 'warning signs', c: '#C9A962' },
              { x: 230, t: 'Calibrated Trust', s: 'Evaluates evidence &', s2: 'fair context (49:12)', c: '#7CA58E' },
              { x: 364, t: 'Excessive Suspicion', s: 'Hostile intent inferred', s2: 'without grounds', c: '#8A79AD' },
            ].map((node) => (
              <g key={node.t}>
                <circle cx={node.x} cy="74" r="6" fill={node.c} />
                <rect x={node.x - 58} y="88" width="116" height="44" rx="2" fill="var(--page-bg)" stroke={node.c} />
                <text x={node.x} y="103" textAnchor="middle" fill={node.c} fontSize="7.2" fontWeight="700">
                  {node.t}
                </text>
                <text x={node.x} y="116" textAnchor="middle" fill="var(--page-ink)" fontSize="6.2">
                  {node.s}
                </text>
                <text x={node.x} y="126" textAnchor="middle" fill="var(--page-muted)" fontSize="6.1">
                  {node.s2}
                </text>
              </g>
            ))}
            <text x="230" y="147" textAnchor="middle" fill="var(--page-muted)" fontSize="6.4">
              Safeguard: Avoiding irrational suspicion never means dismissing credible danger or misconduct.
            </text>
          </svg>
        );

      case 'gossip-trust-reputation':
        return (
          <svg viewBox="0 0 460 175" className="w-full h-auto" role="img" aria-label={title}>
            <rect x="16" y="18" width="206" height="138" rx="3" fill="var(--page-bg-secondary)" stroke="var(--hairline)" />
            <text x="119" y="36" textAnchor="middle" fill="#8A79AD" fontSize="8.6" fontWeight="700">
              Harmful Gossip &amp; Humiliation
            </text>
            <rect x="28" y="48" width="182" height="30" rx="2" fill="var(--page-bg)" stroke="#8A79AD" />
            <text x="119" y="61" textAnchor="middle" fill="var(--page-ink)" fontSize="7" fontWeight="600">
              Backbiting, Mockery &amp; Labels
            </text>
            <text x="119" y="72" textAnchor="middle" fill="var(--page-muted)" fontSize="6.2">
              Erodes trust, reputation &amp; inclusion (49:11–12)
            </text>
            <rect x="28" y="86" width="182" height="30" rx="2" fill="var(--page-bg)" stroke="#7986B5" />
            <text x="119" y="99" textAnchor="middle" fill="var(--page-ink)" fontSize="7" fontWeight="600">
              Stigma &amp; Social Exclusion
            </text>
            <text x="119" y="110" textAnchor="middle" fill="var(--page-muted)" fontSize="6.2">
              Damages belonging &amp; group cohesion
            </text>
            <text x="119" y="138" textAnchor="middle" fill="var(--page-muted)" fontSize="6.1">
              Not a clinical bullying model
            </text>

            <rect x="236" y="18" width="208" height="138" rx="3" fill="var(--page-bg-secondary)" stroke="#7CA58E" strokeDasharray="3 2" />
            <text x="340" y="36" textAnchor="middle" fill="#7CA58E" fontSize="8.6" fontWeight="700">
              Protective Speech Boundary
            </text>
            <text x="340" y="60" textAnchor="middle" fill="var(--page-ink)" fontSize="7.1" fontWeight="600">
              Not All Disclosure Is Gossip
            </text>
            <text x="340" y="78" textAnchor="middle" fill="var(--page-muted)" fontSize="6.4">
              • Distinguish malicious rumour from:
            </text>
            <text x="340" y="92" textAnchor="middle" fill="var(--page-muted)" fontSize="6.4">
              1. Legitimate reporting of harm or abuse
            </text>
            <text x="340" y="106" textAnchor="middle" fill="var(--page-muted)" fontSize="6.4">
              2. Seeking qualified advice or protection
            </text>
            <text x="340" y="120" textAnchor="middle" fill="var(--page-muted)" fontSize="6.4">
              3. Verified public-safety warnings
            </text>
            <text x="340" y="140" textAnchor="middle" fill="#C9A962" fontSize="6.3" fontWeight="600">
              Ethics protect victims, never conceal abuse
            </text>
          </svg>
        );

      case 'information-verification-credibility':
        return (
          <svg viewBox="0 0 460 175" className="w-full h-auto" role="img" aria-label={title}>
            <rect x="16" y="18" width="428" height="138" rx="3" fill="var(--page-bg-secondary)" stroke="var(--hairline)" />
            <text x="230" y="36" textAnchor="middle" fill="#7CA58E" fontSize="8.8" fontWeight="700">
              Claim Verification &amp; Source Credibility (49:6 · 17:36 · Grade A Lead)
            </text>
            {[
              { x: 28, t: 'Incoming Claim', s: 'Pause before sharing', s2: 'or judging people', c: '#7986B5' },
              { x: 164, t: 'Source Evaluation', s: 'Check primary origin,', s2: 'bias & corroboration', c: '#C9A962' },
              { x: 300, t: 'Calibrated Action', s: 'Accept/act only on', s2: 'verified knowledge', c: '#7CA58E' },
            ].map((b) => (
              <g key={b.t}>
                <rect x={b.x} y="50" width="132" height="54" rx="2" fill="var(--page-bg)" stroke={b.c} strokeWidth="1.2" />
                <text x={b.x + 66} y="66" textAnchor="middle" fill={b.c} fontSize="7.4" fontWeight="700">
                  {b.t}
                </text>
                <text x={b.x + 66} y="80" textAnchor="middle" fill="var(--page-ink)" fontSize="6.4">
                  {b.s}
                </text>
                <text x={b.x + 66} y="92" textAnchor="middle" fill="var(--page-muted)" fontSize="6.3">
                  {b.s2}
                </text>
              </g>
            ))}
            <line x1="160" y1="77" x2="164" y2="77" stroke="#C9A962" strokeWidth="1.4" />
            <line x1="296" y1="77" x2="300" y2="77" stroke="#C9A962" strokeWidth="1.4" />
            <rect x="28" y="114" width="404" height="30" rx="2" fill="var(--page-bg)" stroke="var(--hairline)" />
            <text x="230" y="127" textAnchor="middle" fill="var(--page-ink)" fontSize="6.7" fontWeight="600">
              Note: Ethical verification aligns closely with misinformation research, yet is not a full media-literacy system.
            </text>
            <text x="230" y="139" textAnchor="middle" fill="var(--page-muted)" fontSize="6.2">
              Search portal links require checking individual peer-reviewed reviews directly.
            </text>
          </svg>
        );

      case 'self-awareness-reflection':
        return (
          <svg viewBox="0 0 460 175" className="w-full h-auto" role="img" aria-label={title}>
            <rect x="16" y="18" width="206" height="138" rx="3" fill="var(--page-bg-secondary)" stroke="#7CA58E" />
            <text x="119" y="36" textAnchor="middle" fill="#7CA58E" fontSize="8.6" fontWeight="700">
              Constructive Self-Reflection
            </text>
            <text x="119" y="56" textAnchor="middle" fill="var(--page-ink)" fontSize="7" fontWeight="600">
              Examines assumptions &amp; outcomes
            </text>
            <rect x="30" y="68" width="178" height="24" rx="2" fill="var(--page-bg)" stroke="#7CA58E" strokeOpacity="0.6" />
            <text x="119" y="83" textAnchor="middle" fill="var(--page-muted)" fontSize="6.4">
              Clarifies goals, values &amp; corrections
            </text>
            <rect x="30" y="98" width="178" height="24" rx="2" fill="var(--page-bg)" stroke="#7CA58E" strokeOpacity="0.6" />
            <text x="119" y="113" textAnchor="middle" fill="var(--page-muted)" fontSize="6.4">
              Supports adaptive learning (59:18 · 3:191)
            </text>
            <text x="119" y="140" textAnchor="middle" fill="var(--page-muted)" fontSize="6.1">
              Nafs ≠ single psychological construct
            </text>

            <rect x="236" y="18" width="208" height="138" rx="3" fill="var(--page-bg-secondary)" stroke="#C9A962" strokeDasharray="3 2" />
            <text x="340" y="36" textAnchor="middle" fill="#C9A962" fontSize="8.6" fontWeight="700">
              Unproductive Rumination Risk
            </text>
            <text x="340" y="56" textAnchor="middle" fill="var(--page-ink)" fontSize="7" fontWeight="600">
              Repetitive Self-Punishing Loops
            </text>
            <rect x="250" y="68" width="180" height="24" rx="2" fill="var(--page-bg)" stroke="#8A79AD" strokeOpacity="0.6" />
            <text x="340" y="83" textAnchor="middle" fill="var(--page-muted)" fontSize="6.4">
              Replays errors without forward steps
            </text>
            <rect x="250" y="98" width="180" height="24" rx="2" fill="var(--page-bg)" stroke="#8A79AD" strokeOpacity="0.6" />
            <text x="340" y="113" textAnchor="middle" fill="var(--page-muted)" fontSize="6.4">
              May amplify anxiety or depressed mood
            </text>
            <text x="340" y="140" textAnchor="middle" fill="#C9A962" fontSize="6.2" fontWeight="600">
              Balance accountability with self-compassion
            </text>
          </svg>
        );

      case 'impulse-control-self-regulation':
        return (
          <svg viewBox="0 0 460 175" className="w-full h-auto" role="img" aria-label={title}>
            <rect x="16" y="18" width="428" height="138" rx="3" fill="var(--page-bg-secondary)" stroke="var(--hairline)" />
            <text x="230" y="36" textAnchor="middle" fill="#8A79AD" fontSize="8.8" fontWeight="700">
              Immediate Urges vs Deliberative Regulation (Context &amp; Limits)
            </text>
            <rect x="28" y="48" width="186" height="56" rx="2" fill="var(--page-bg)" stroke="#7986B5" />
            <text x="121" y="64" textAnchor="middle" fill="#7986B5" fontSize="7.4" fontWeight="700">
              Fast Arousal / Short-Term Urge
            </text>
            <text x="121" y="79" textAnchor="middle" fill="var(--page-ink)" fontSize="6.4">
              Haste, emotional arousal, spending urges,
            </text>
            <text x="121" y="91" textAnchor="middle" fill="var(--page-muted)" fontSize="6.2">
              or incomplete facts (17:11 · 12:53)
            </text>

            <rect x="246" y="48" width="186" height="56" rx="2" fill="var(--page-bg)" stroke="#7CA58E" />
            <text x="339" y="64" textAnchor="middle" fill="#7CA58E" fontSize="7.4" fontWeight="700">
              Deliberative Check &amp; Moderation
            </text>
            <text x="339" y="79" textAnchor="middle" fill="var(--page-ink)" fontSize="6.4">
              Gather context, pause, balance needs
            </text>
            <text x="339" y="91" textAnchor="middle" fill="var(--page-muted)" fontSize="6.2">
              without equating nafs to one theory
            </text>

            <line x1="214" y1="76" x2="246" y2="76" stroke="#C9A962" strokeWidth="1.5" />
            <rect x="28" y="114" width="404" height="30" rx="2" fill="var(--page-bg)" stroke="#C9A962" strokeDasharray="3 2" />
            <text x="230" y="128" textAnchor="middle" fill="var(--page-ink)" fontSize="6.6">
              Caveat: Rapid decisions can still be necessary in real emergencies; moderation is not a fixed budget formula.
            </text>
            <text x="230" y="139" textAnchor="middle" fill="var(--page-muted)" fontSize="6.1">
              Educational schematic; not an impulsivity screener or clinical measure.
            </text>
          </svg>
        );

      case 'moral-self-discipline':
        return (
          <svg viewBox="0 0 460 175" className="w-full h-auto" role="img" aria-label={title}>
            <rect x="16" y="18" width="212" height="138" rx="3" fill="var(--page-bg-secondary)" stroke="var(--hairline)" />
            <text x="122" y="36" textAnchor="middle" fill="#7986B5" fontSize="8.6" fontWeight="700">
              Psychological Self-Regulation
            </text>
            <text x="122" y="58" textAnchor="middle" fill="var(--page-ink)" fontSize="7" fontWeight="600">
              Goal Standards &amp; Behavioural Feedback
            </text>
            <text x="122" y="76" textAnchor="middle" fill="var(--page-muted)" fontSize="6.4">
              • Monitors actions against personal norms
            </text>
            <text x="122" y="90" textAnchor="middle" fill="var(--page-muted)" fontSize="6.4">
              • Tracks observable social consequences
            </text>
            <text x="122" y="104" textAnchor="middle" fill="var(--page-muted)" fontSize="6.4">
              • Even small habits shape trust over time
            </text>
            <text x="122" y="136" textAnchor="middle" fill="#7CA58E" fontSize="6.3" fontWeight="600">
              Observable behaviour &amp; consequences
            </text>

            <rect x="240" y="18" width="204" height="138" rx="3" fill="var(--page-bg-secondary)" stroke="#C9A962" strokeDasharray="3 2" />
            <text x="342" y="36" textAnchor="middle" fill="#C9A962" fontSize="8.6" fontWeight="700">
              Theological Distinction
            </text>
            <text x="342" y="58" textAnchor="middle" fill="var(--page-ink)" fontSize="7" fontWeight="600">
              Tazkiyah &amp; Moral Accountability
            </text>
            <text x="342" y="76" textAnchor="middle" fill="var(--page-muted)" fontSize="6.4">
              • Spiritual purification (91:7–10) is NOT a
            </text>
            <text x="342" y="88" textAnchor="middle" fill="var(--page-muted)" fontSize="6.4">
              directly measurable laboratory variable.
            </text>
            <text x="342" y="106" textAnchor="middle" fill="var(--page-muted)" fontSize="6.4">
              • Religious accountability (99:7–8) is distinct
            </text>
            <text x="342" y="118" textAnchor="middle" fill="var(--page-muted)" fontSize="6.4">
              from psychological or legal frameworks.
            </text>
            <text x="342" y="138" textAnchor="middle" fill="#8A79AD" fontSize="6.2" fontWeight="600">
              Keep domains methodologically separate
            </text>
          </svg>
        );

      case 'humility-social-interaction':
        return (
          <svg viewBox="0 0 460 175" className="w-full h-auto" role="img" aria-label={title}>
            <rect x="16" y="18" width="428" height="138" rx="3" fill="var(--page-bg-secondary)" stroke="var(--hairline)" />
            <text x="230" y="36" textAnchor="middle" fill="#8A79AD" fontSize="8.8" fontWeight="700">
              Grounded Humility vs Arrogant Contempt &amp; Self-Erasure
            </text>
            {[
              { x: 28, t: 'Arrogance / Contempt', s: 'Entitlement & dismissing', s2: 'others strains trust', c: '#8A79AD' },
              { x: 164, t: 'Grounded Humility', s: 'Accurate self-view +', s2: 'openness to feedback', c: '#7CA58E' },
              { x: 300, t: 'Safety Safeguard', s: 'Humility NEVER means', s2: 'accepting mistreatment', c: '#C9A962' },
            ].map((card) => (
              <g key={card.t}>
                <rect x={card.x} y="48" width="132" height="60" rx="2" fill="var(--page-bg)" stroke={card.c} strokeWidth="1.2" />
                <text x={card.x + 66} y="65" textAnchor="middle" fill={card.c} fontSize="7.3" fontWeight="700">
                  {card.t}
                </text>
                <text x={card.x + 66} y="81" textAnchor="middle" fill="var(--page-ink)" fontSize="6.4">
                  {card.s}
                </text>
                <text x={card.x + 66} y="93" textAnchor="middle" fill="var(--page-muted)" fontSize="6.3">
                  {card.s2}
                </text>
              </g>
            ))}
            <rect x="28" y="116" width="404" height="28" rx="2" fill="var(--page-bg)" stroke="var(--hairline)" />
            <text x="230" y="133" textAnchor="middle" fill="var(--page-muted)" fontSize="6.5">
              Important: Never diagnose personality disorders (e.g., narcissism) from religious passages about pride.
            </text>
          </svg>
        );

      case 'grief-emotional-responses':
        return (
          <svg viewBox="0 0 460 175" className="w-full h-auto" role="img" aria-label={title}>
            <rect x="16" y="18" width="428" height="138" rx="3" fill="var(--page-bg-secondary)" stroke="var(--hairline)" />
            <text x="230" y="36" textAnchor="middle" fill="#7986B5" fontSize="8.8" fontWeight="700">
              Multidimensional Grief &amp; Supportive Care (No Universal Timeline)
            </text>
            {[
              { x: 28, t: 'Emotional', s: 'Sorrow, yearning,', s2: 'layered loss (12:84)' },
              { x: 134, t: 'Physical / Sleep', s: 'Fatigue, appetite', s2: '& sleep shifts' },
              { x: 240, t: 'Expression', s: 'Safe voicing helps', s2: 'many—not rigid rule' },
              { x: 346, t: 'Support', s: 'Community care +', s2: 'clinical grief support' },
            ].map((col) => (
              <g key={col.t}>
                <rect x={col.x} y="48" width="96" height="58" rx="2" fill="var(--page-bg)" stroke="#7986B5" strokeOpacity="0.7" />
                <text x={col.x + 48} y="64" textAnchor="middle" fill="#7986B5" fontSize="7.3" fontWeight="700">
                  {col.t}
                </text>
                <text x={col.x + 48} y="80" textAnchor="middle" fill="var(--page-ink)" fontSize="6.3">
                  {col.s}
                </text>
                <text x={col.x + 48} y="92" textAnchor="middle" fill="var(--page-muted)" fontSize="6.2">
                  {col.s2}
                </text>
              </g>
            ))}
            <rect x="28" y="114" width="404" height="30" rx="2" fill="var(--page-bg)" stroke="#C9A962" strokeDasharray="3 2" />
            <text x="230" y="128" textAnchor="middle" fill="#C9A962" fontSize="6.8" fontWeight="700">
              Safeguard: Sadness &amp; Grief Are NOT Signs of Weak Faith (12:84–86)
            </text>
            <text x="230" y="139" textAnchor="middle" fill="var(--page-muted)" fontSize="6.1">
              Verses are not clinical therapy protocols; professional bereavement care may be needed.
            </text>
          </svg>
        );

      case 'fear-uncertainty-coping':
        return (
          <svg viewBox="0 0 460 175" className="w-full h-auto" role="img" aria-label={title}>
            <rect x="16" y="18" width="208" height="138" rx="3" fill="var(--page-bg-secondary)" stroke="var(--hairline)" />
            <text x="120" y="36" textAnchor="middle" fill="#7986B5" fontSize="8.6" fontWeight="700">
              Uncertainty, Fear &amp; Worry
            </text>
            <rect x="28" y="48" width="184" height="32" rx="2" fill="var(--page-bg)" stroke="#7986B5" />
            <text x="120" y="61" textAnchor="middle" fill="var(--page-ink)" fontSize="7" fontWeight="600">
              Future Uncertainty Triggers Worry
            </text>
            <text x="120" y="72" textAnchor="middle" fill="var(--page-muted)" fontSize="6.2">
              Cognitive, emotional &amp; safety strategies
            </text>
            <rect x="28" y="88" width="184" height="32" rx="2" fill="var(--page-bg)" stroke="#8A79AD" />
            <text x="120" y="101" textAnchor="middle" fill="var(--page-ink)" fontSize="7" fontWeight="600">
              Trust (3:173) + Practical Safety
            </text>
            <text x="120" y="112" textAnchor="middle" fill="var(--page-muted)" fontSize="6.2">
              Never ignore real threats or safety steps
            </text>
            <text x="120" y="140" textAnchor="middle" fill="var(--page-muted)" fontSize="6.1">
              Eschatological verses ≠ clinical anxiety claim
            </text>

            <rect x="236" y="18" width="208" height="138" rx="3" fill="var(--page-bg-secondary)" stroke="#C9A962" strokeDasharray="3 2" />
            <text x="340" y="36" textAnchor="middle" fill="#C9A962" fontSize="8.6" fontWeight="700">
              Mental-Health Reality
            </text>
            <text x="340" y="60" textAnchor="middle" fill="var(--page-ink)" fontSize="7.1" fontWeight="600">
              Faith &amp; Anxiety Can Coexist
            </text>
            <text x="340" y="78" textAnchor="middle" fill="var(--page-muted)" fontSize="6.4">
              • Reassurance texts (2:38, 41:30) do not mean
            </text>
            <text x="340" y="90" textAnchor="middle" fill="var(--page-muted)" fontSize="6.4">
              believers never feel distress or worry.
            </text>
            <text x="340" y="106" textAnchor="middle" fill="var(--page-muted)" fontSize="6.4">
              • Persistent anxiety disorders benefit from
            </text>
            <text x="340" y="118" textAnchor="middle" fill="var(--page-muted)" fontSize="6.4">
              evidence-based clinical assessment &amp; care.
            </text>
            <text x="340" y="140" textAnchor="middle" fill="#7CA58E" fontSize="6.3" fontWeight="600">
              Seek professional support when overwhelmed
            </text>
          </svg>
        );

      case 'decision-making-consultation':
        return (
          <svg viewBox="0 0 460 175" className="w-full h-auto" role="img" aria-label={title}>
            <rect x="16" y="18" width="428" height="138" rx="3" fill="var(--page-bg-secondary)" stroke="var(--hairline)" />
            <text x="230" y="36" textAnchor="middle" fill="#7CA58E" fontSize="8.8" fontWeight="700">
              Consultative Decision-Making (Shura) &amp; Group-Bias Checks
            </text>
            <circle cx="106" cy="76" r="24" fill="var(--page-bg)" stroke="#7986B5" strokeWidth="1.2" />
            <text x="106" y="73" textAnchor="middle" fill="#7986B5" fontSize="6.8" fontWeight="700">
              Diverse
            </text>
            <text x="106" y="84" textAnchor="middle" fill="var(--page-ink)" fontSize="6.5">
              Counsel
            </text>

            <line x1="130" y1="76" x2="174" y2="76" stroke="#C9A962" strokeWidth="1.4" />
            <rect x="174" y="50" width="114" height="52" rx="2" fill="var(--page-bg)" stroke="#C9A962" />
            <text x="231" y="67" textAnchor="middle" fill="#C9A962" fontSize="7.3" fontWeight="700">
              Evidence &amp; Bias Check
            </text>
            <text x="231" y="81" textAnchor="middle" fill="var(--page-ink)" fontSize="6.3">
              Test groupthink, verify facts
            </text>
            <text x="231" y="93" textAnchor="middle" fill="var(--page-muted)" fontSize="6.1">
              &amp; weigh ethical accountability
            </text>

            <line x1="288" y1="76" x2="330" y2="76" stroke="#7CA58E" strokeWidth="1.4" />
            <circle cx="354" cy="76" r="24" fill="var(--page-bg)" stroke="#7CA58E" strokeWidth="1.2" />
            <text x="354" y="73" textAnchor="middle" fill="#7CA58E" fontSize="6.8" fontWeight="700">
              Informed
            </text>
            <text x="354" y="84" textAnchor="middle" fill="var(--page-ink)" fontSize="6.5">
              Decision
            </text>

            <text x="230" y="128" textAnchor="middle" fill="var(--page-ink)" fontSize="6.6" fontWeight="600">
              Consultation (3:159 · 42:38) widens perspectives, yet groups are not automatically error-free.
            </text>
            <text x="230" y="141" textAnchor="middle" fill="var(--page-muted)" fontSize="6.1">
              Requires factual judgement and individual responsibility after deliberation.
            </text>
          </svg>
        );

      case 'habit-formation-reinforcement':
        return (
          <svg viewBox="0 0 460 175" className="w-full h-auto" role="img" aria-label={title}>
            <rect x="16" y="18" width="428" height="138" rx="3" fill="var(--page-bg-secondary)" stroke="var(--hairline)" />
            <text x="230" y="36" textAnchor="middle" fill="#8A79AD" fontSize="8.8" fontWeight="700">
              Habit Learning Loop &amp; Theological Boundaries (91:9–10 · 41:30)
            </text>
            {[
              { x: 28, t: 'Environmental Cue', s: 'Context or routine trigger', c: '#7986B5' },
              { x: 164, t: 'Repeated Action', s: 'Consistent small steps', c: '#8A79AD' },
              { x: 300, t: 'Reinforcement', s: 'Gradual automaticity', c: '#7CA58E' },
            ].map((b) => (
              <g key={b.t}>
                <rect x={b.x} y="48" width="132" height="44" rx="2" fill="var(--page-bg)" stroke={b.c} />
                <text x={b.x + 66} y="65" textAnchor="middle" fill={b.c} fontSize="7.3" fontWeight="700">
                  {b.t}
                </text>
                <text x={b.x + 66} y="80" textAnchor="middle" fill="var(--page-muted)" fontSize="6.3">
                  {b.s}
                </text>
              </g>
            ))}
            <line x1="160" y1="70" x2="164" y2="70" stroke="#C9A962" strokeWidth="1.4" />
            <line x1="296" y1="70" x2="300" y2="70" stroke="#C9A962" strokeWidth="1.4" />
            <rect x="28" y="104" width="404" height="40" rx="2" fill="var(--page-bg)" stroke="#C9A962" strokeDasharray="3 2" />
            <text x="230" y="119" textAnchor="middle" fill="#C9A962" fontSize="6.9" fontWeight="700">
              Methodological Caution (Grade C)
            </text>
            <text x="230" y="131" textAnchor="middle" fill="var(--page-muted)" fontSize="6.3">
              Verses do not describe neural habit-loop timelines; behavioural consistency ≠ full religious istiqamah/tazkiyah.
            </text>
          </svg>
        );

      case 'social-companionship-influence':
        return (
          <svg viewBox="0 0 460 175" className="w-full h-auto" role="img" aria-label={title}>
            <rect x="16" y="18" width="428" height="138" rx="3" fill="var(--page-bg-secondary)" stroke="var(--hairline)" />
            <text x="230" y="36" textAnchor="middle" fill="#7986B5" fontSize="8.8" fontWeight="700">
              Social Networks, Peer Norms &amp; Communication Climate
            </text>
            <rect x="28" y="48" width="192" height="60" rx="2" fill="var(--page-bg)" stroke="#7CA58E" />
            <text x="124" y="64" textAnchor="middle" fill="#7CA58E" fontSize="7.4" fontWeight="700">
              Supportive Companionship &amp; Speech
            </text>
            <text x="124" y="79" textAnchor="middle" fill="var(--page-ink)" fontSize="6.4">
              Reinforces constructive habits &amp; honesty
            </text>
            <text x="124" y="92" textAnchor="middle" fill="var(--page-muted)" fontSize="6.2">
              Kind expression lowers defensiveness (17:53)
            </text>

            <rect x="240" y="48" width="192" height="60" rx="2" fill="var(--page-bg)" stroke="#8A79AD" />
            <text x="336" y="64" textAnchor="middle" fill="#8A79AD" fontSize="7.4" fontWeight="700">
              Variable &amp; Negative Influence
            </text>
            <text x="336" y="79" textAnchor="middle" fill="var(--page-ink)" fontSize="6.4">
              Peer norms &amp; hostile speech can also
            </text>
            <text x="336" y="92" textAnchor="middle" fill="var(--page-muted)" fontSize="6.2">
              amplify distress or unhelpful behaviour
            </text>

            <text x="230" y="128" textAnchor="middle" fill="var(--page-ink)" fontSize="6.6" fontWeight="600">
              Social influence varies across individuals and contexts; verses provide moral guidance, not deterministic rules.
            </text>
            <text x="230" y="141" textAnchor="middle" fill="var(--page-muted)" fontSize="6.1">
              Educational schematic only; not a complete communication or social-network theory.
            </text>
          </svg>
        );

      case 'social-support-cooperation':
        return (
          <svg viewBox="0 0 460 175" className="w-full h-auto" role="img" aria-label={title}>
            <rect x="16" y="18" width="206" height="138" rx="3" fill="var(--page-bg-secondary)" stroke="var(--hairline)" />
            <text x="119" y="36" textAnchor="middle" fill="#7CA58E" fontSize="8.6" fontWeight="700">
              Perceived Support &amp; Resilience
            </text>
            <rect x="28" y="48" width="182" height="28" rx="2" fill="var(--page-bg)" stroke="#7CA58E" />
            <text x="119" y="65" textAnchor="middle" fill="var(--page-ink)" fontSize="6.9" fontWeight="600">
              Emotional + Practical Aid (9:71 · 5:2)
            </text>
            <rect x="28" y="84" width="182" height="32" rx="2" fill="var(--page-bg)" stroke="#7986B5" />
            <text x="119" y="97" textAnchor="middle" fill="var(--page-ink)" fontSize="6.8">
              Buffers stress across many groups
            </text>
            <text x="119" y="109" textAnchor="middle" fill="var(--page-muted)" fontSize="6.1">
              Yet community ≠ clinical treatment
            </text>
            <text x="119" y="140" textAnchor="middle" fill="var(--page-muted)" fontSize="6.1">
              Refer severe distress to professionals
            </text>

            <rect x="236" y="18" width="208" height="138" rx="3" fill="var(--page-bg-secondary)" stroke="#C9A962" strokeDasharray="3 2" />
            <text x="340" y="36" textAnchor="middle" fill="#C9A962" fontSize="8.6" fontWeight="700">
              Cooperation Qualification (5:2)
            </text>
            <text x="340" y="60" textAnchor="middle" fill="var(--page-ink)" fontSize="7" fontWeight="600">
              Not Every Cooperation Is Beneficial
            </text>
            <text x="340" y="78" textAnchor="middle" fill="var(--page-muted)" fontSize="6.4">
              • Groups can coordinate for shared care
            </text>
            <text x="340" y="92" textAnchor="middle" fill="var(--page-muted)" fontSize="6.4">
              OR collude in exclusion, harm, or bias.
            </text>
            <text x="340" y="110" textAnchor="middle" fill="var(--page-ink)" fontSize="6.4" fontWeight="600">
              5:2 limits cooperation to righteousness
            </text>
            <text x="340" y="123" textAnchor="middle" fill="var(--page-muted)" fontSize="6.2">
              and explicitly rejects cooperation in harm.
            </text>
            <text x="340" y="140" textAnchor="middle" fill="#8A79AD" fontSize="6.2" fontWeight="600">
              Ethical goal determines social value
            </text>
          </svg>
        );

      case 'reconciliation-conflict-resolution':
        return (
          <svg viewBox="0 0 460 175" className="w-full h-auto" role="img" aria-label={title}>
            <rect x="16" y="18" width="428" height="138" rx="3" fill="var(--page-bg-secondary)" stroke="var(--hairline)" />
            <text x="230" y="36" textAnchor="middle" fill="#7CA58E" fontSize="8.8" fontWeight="700">
              Conflict Resolution, Mediation &amp; Non-Coercive Safety Rule
            </text>
            <rect x="28" y="48" width="194" height="58" rx="2" fill="var(--page-bg)" stroke="#7CA58E" />
            <text x="125" y="64" textAnchor="middle" fill="#7CA58E" fontSize="7.4" fontWeight="700">
              Constructive Mediation (49:10 · 4:114)
            </text>
            <text x="125" y="79" textAnchor="middle" fill="var(--page-ink)" fontSize="6.4">
              Fair listening, dialogue &amp; accountability
            </text>
            <text x="125" y="92" textAnchor="middle" fill="var(--page-muted)" fontSize="6.2">
              Reduces escalation &amp; ecological/social harm
            </text>

            <rect x="238" y="48" width="194" height="58" rx="2" fill="var(--page-bg)" stroke="#C9A962" strokeDasharray="3 2" />
            <text x="335" y="64" textAnchor="middle" fill="#C9A962" fontSize="7.4" fontWeight="700">
              Mandatory Safety Boundary
            </text>
            <text x="335" y="79" textAnchor="middle" fill="var(--page-ink)" fontSize="6.4">
              NEVER force reconciliation where
            </text>
            <text x="335" y="92" textAnchor="middle" fill="var(--page-muted)" fontSize="6.2">
              abuse, danger, or injustice continues
            </text>

            <rect x="28" y="116" width="404" height="28" rx="2" fill="var(--page-bg)" stroke="var(--hairline)" />
            <text x="230" y="133" textAnchor="middle" fill="var(--page-muted)" fontSize="6.4">
              Theological reflections on conflict (2:30, 30:41) are not a complete behavioural-science conflict theory.
            </text>
          </svg>
        );

      case 'compassion-helping-behaviour':
        return (
          <svg viewBox="0 0 460 175" className="w-full h-auto" role="img" aria-label={title}>
            <rect x="16" y="18" width="428" height="138" rx="3" fill="var(--page-bg-secondary)" stroke="var(--hairline)" />
            <text x="230" y="36" textAnchor="middle" fill="#8A79AD" fontSize="8.8" fontWeight="700">
              Empathy, Prosocial Sharing &amp; Conceptual Distinctions
            </text>
            {[
              { x: 28, t: 'Empathy & Care', s: 'Perspective-taking →', s2: 'support vulnerable (93:9)', c: '#8A79AD' },
              { x: 164, t: 'Resource Sharing', s: 'Generosity builds ties;', s2: 'saving ≠ miserliness', c: '#7CA58E' },
              { x: 300, t: 'Domain Limits', s: 'Empathy ≠ rahmah;', s2: 'reward is non-empirical', c: '#C9A962' },
            ].map((b) => (
              <g key={b.t}>
                <rect x={b.x} y="48" width="132" height="58" rx="2" fill="var(--page-bg)" stroke={b.c} />
                <text x={b.x + 66} y="65" textAnchor="middle" fill={b.c} fontSize="7.3" fontWeight="700">
                  {b.t}
                </text>
                <text x={b.x + 66} y="80" textAnchor="middle" fill="var(--page-ink)" fontSize="6.4">
                  {b.s}
                </text>
                <text x={b.x + 66} y="92" textAnchor="middle" fill="var(--page-muted)" fontSize="6.2">
                  {b.s2}
                </text>
              </g>
            ))}
            <rect x="28" y="116" width="404" height="28" rx="2" fill="var(--page-bg)" stroke="var(--hairline)" />
            <text x="230" y="133" textAnchor="middle" fill="var(--page-muted)" fontSize="6.4">
              Prosocial behaviour has varied motives and outcomes; prudent household planning remains distinct from hoarding.
            </text>
          </svg>
        );

      case 'delayed-gratification':
        return (
          <svg viewBox="0 0 460 175" className="w-full h-auto" role="img" aria-label={title}>
            <rect x="16" y="18" width="428" height="138" rx="3" fill="var(--page-bg-secondary)" stroke="var(--hairline)" />
            <text x="230" y="36" textAnchor="middle" fill="#7986B5" fontSize="8.8" fontWeight="700">
              Delayed Gratification vs Sabr: Context &amp; Resource Moderators (Grade C)
            </text>
            <rect x="28" y="50" width="186" height="54" rx="2" fill="var(--page-bg)" stroke="#7986B5" />
            <text x="121" y="66" textAnchor="middle" fill="#7986B5" fontSize="7.3" fontWeight="700">
              Immediate vs Deferred Reward
            </text>
            <text x="121" y="80" textAnchor="middle" fill="var(--page-ink)" fontSize="6.4">
              Waiting depends heavily on reliability,
            </text>
            <text x="121" y="92" textAnchor="middle" fill="var(--page-muted)" fontSize="6.2">
              trust &amp; socioeconomic security
            </text>

            <rect x="246" y="50" width="186" height="54" rx="2" fill="var(--page-bg)" stroke="#C9A962" strokeDasharray="3 2" />
            <text x="339" y="66" textAnchor="middle" fill="#C9A962" fontSize="7.3" fontWeight="700">
              Exegetical Boundary
            </text>
            <text x="339" y="80" textAnchor="middle" fill="var(--page-ink)" fontSize="6.4">
              Qur’anic patience (sabr) is far broader
            </text>
            <text x="339" y="92" textAnchor="middle" fill="var(--page-muted)" fontSize="6.2">
              than lab reward-delay experiments
            </text>

            <text x="230" y="128" textAnchor="middle" fill="var(--page-ink)" fontSize="6.6" fontWeight="600">
              Psychological studies do not show that every delay is beneficial across all situations.
            </text>
            <text x="230" y="141" textAnchor="middle" fill="var(--page-muted)" fontSize="6.1">
              Educational schematic; not a diagnostic self-control metric.
            </text>
          </svg>
        );

      case 'deception-and-trust':
        return (
          <svg viewBox="0 0 460 175" className="w-full h-auto" role="img" aria-label={title}>
            <rect x="16" y="18" width="428" height="138" rx="3" fill="var(--page-bg-secondary)" stroke="var(--hairline)" />
            <text x="230" y="36" textAnchor="middle" fill="#7CA58E" fontSize="8.8" fontWeight="700">
              Honesty, Kept Commitments &amp; Relational / Institutional Trust
            </text>
            <rect x="28" y="48" width="192" height="58" rx="2" fill="var(--page-bg)" stroke="#7CA58E" />
            <text x="124" y="64" textAnchor="middle" fill="#7CA58E" fontSize="7.4" fontWeight="700">
              Reliability &amp; Covenants (17:34)
            </text>
            <text x="124" y="79" textAnchor="middle" fill="var(--page-ink)" fontSize="6.4">
              Predictable honesty lowers transaction
            </text>
            <text x="124" y="92" textAnchor="middle" fill="var(--page-muted)" fontSize="6.2">
              costs &amp; supports stable cooperation
            </text>

            <rect x="240" y="48" width="192" height="58" rx="2" fill="var(--page-bg)" stroke="#8A79AD" />
            <text x="336" y="64" textAnchor="middle" fill="#8A79AD" fontSize="7.4" fontWeight="700">
              Fraud &amp; Betrayal (83:1–3 · 8:27)
            </text>
            <text x="336" y="79" textAnchor="middle" fill="var(--page-ink)" fontSize="6.4">
              Deception destabilises shared systems
            </text>
            <text x="336" y="92" textAnchor="middle" fill="var(--page-muted)" fontSize="6.2">
              &amp; deepens defensive distrust
            </text>

            <rect x="28" y="116" width="404" height="28" rx="2" fill="var(--page-bg)" stroke="var(--hairline)" />
            <text x="230" y="133" textAnchor="middle" fill="var(--page-muted)" fontSize="6.4">
              Ethical mandates (83:1–3, 17:34) do not constitute a psychological theory of deception or quantitative law.
            </text>
          </svg>
        );

      case 'human-differences-perception':
        return (
          <svg viewBox="0 0 460 175" className="w-full h-auto" role="img" aria-label={title}>
            <rect x="16" y="18" width="428" height="138" rx="3" fill="var(--page-bg-secondary)" stroke="var(--hairline)" />
            <text x="230" y="36" textAnchor="middle" fill="#8A79AD" fontSize="8.8" fontWeight="700">
              Human Diversity, Social Bias &amp; Cross-Cultural Caveats (49:13 · 30:22)
            </text>
            <rect x="28" y="48" width="192" height="58" rx="2" fill="var(--page-bg)" stroke="#7CA58E" />
            <text x="124" y="64" textAnchor="middle" fill="#7CA58E" fontSize="7.3" fontWeight="700">
              Mutual Recognition (Ta‘aruf)
            </text>
            <text x="124" y="79" textAnchor="middle" fill="var(--page-ink)" fontSize="6.4">
              Peoples, languages &amp; experiences vary;
            </text>
            <text x="124" y="92" textAnchor="middle" fill="var(--page-muted)" fontSize="6.2">
              no single study fits all populations
            </text>

            <rect x="240" y="48" width="192" height="58" rx="2" fill="var(--page-bg)" stroke="#C9A962" strokeDasharray="3 2" />
            <text x="336" y="64" textAnchor="middle" fill="#C9A962" fontSize="7.3" fontWeight="700">
              Prejudice &amp; Domain Limits
            </text>
            <text x="336" y="79" textAnchor="middle" fill="var(--page-ink)" fontSize="6.4">
              Stereotypes distort judgement, yet taqwa
            </text>
            <text x="336" y="92" textAnchor="middle" fill="var(--page-muted)" fontSize="6.2">
              must not be reduced to a bias test score
            </text>

            <rect x="28" y="116" width="404" height="28" rx="2" fill="var(--page-bg)" stroke="var(--hairline)" />
            <text x="230" y="133" textAnchor="middle" fill="var(--page-muted)" fontSize="6.4">
              Safeguard: Do not overgeneralise psychological findings across diverse cultures or equate verses with personality taxonomies.
            </text>
          </svg>
        );
    }
  };

  return (
    <figure className="my-1 border border-[var(--gold-hairline)] bg-[var(--page-bg-secondary)]/55 rounded-sm p-2.5">
      <figcaption className="flex flex-wrap items-center justify-between gap-2 text-[11px] mb-1.5">
        <span className="font-semibold uppercase tracking-[0.14em] text-[var(--accent-gold)]">
          {title}
        </span>
        <span className="text-[10px] text-[var(--page-muted)]">
          Educational Schematic · Not Diagnostic
        </span>
      </figcaption>
      <div className="w-full overflow-hidden rounded-[2px] border border-[var(--hairline)] bg-[var(--page-bg)]/85 p-1">
        {renderSvg()}
      </div>
      <p className="mt-1.5 text-[11px] leading-snug text-[var(--page-muted)]">
        {caption}
      </p>
    </figure>
  );
};
