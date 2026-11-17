import {
  calloutTag,
  cardBox,
  chartAxes,
  cycleNodeRing,
  flowArrow,
  keyTakeawayStrip,
  titledCard,
} from '../lib/diagramPrimitives';
import { buildPlateShell, escXml, PALETTE, renderSvgTextLines, wrapLines } from '../lib/plateRenderer';
import type { RawDatasetEntry, TopicEnrichment } from '../../src/types/encyclopedia';

export function buildPsychologyPlateSvg(entry: RawDatasetEntry, enrichment?: TopicEnrichment): string {
  const id = entry.id;
  const title = enrichment?.diagramTitle ?? entry.title;
  const subtitle = enrichment?.diagramCaption ?? entry.scientific_topic;
  const finding = entry.scientific_evidence.finding;
  const lim = entry.limitations || 'Qualitative conceptual behavioural framework; empirical outcomes vary across individuals and contexts.';
  const kind = (enrichment?.diagramKind ?? 'stress-coping-strategies') as string;
  let bodySvg = '';

  const modelBadge = `
    <rect x="46" y="142" width="320" height="22" rx="4" fill="#183A32" />
    <text x="60" y="157" font-family="Noto Sans, sans-serif" font-size="10.5" font-weight="700" letter-spacing="0.9" fill="#DFC99B">CONCEPTUAL BEHAVIOURAL MODEL</text>
  `;

  // 1. Coping, Wellbeing, Hope, Gratitude & Grief (PSY-001..004, 017..024, 047)
  if (
    kind === 'emotional-wellbeing-meaning' ||
    kind === 'hope-adversity-coping' ||
    kind === 'stress-coping-strategies' ||
    kind === 'gratitude-wellbeing' ||
    kind === 'grief-emotional-responses' ||
    kind === 'fear-uncertainty-coping'
  ) {
    let leftTitle = 'STRESS APPRAISAL, MEANING &amp; ADAPTIVE COPING';
    let leftSvg = '';

    if (kind === 'grief-emotional-responses') {
      const isSuppress = id === 'PSY-021';
      leftTitle = isSuppress ? 'ACKNOWLEDGED SORROW VS. EMOTIONAL SUPPRESSION' : 'DUAL-PROCESS GRIEF OSCILLATION MODEL (STROBE &amp; SCHUT)';
      leftSvg = isSuppress
        ? `
          ${titledCard({ x: 74, y: 204, w: 270, h: 172, badge: 'Maladaptive', title: 'Forced Emotional Suppression', body: 'Inhibiting grief expression can increase physiological strain and isolate sufferers from support.', accent: PALETTE.rust })}
          ${titledCard({ x: 368, y: 204, w: 270, h: 172, badge: 'Healthy Processing', title: 'Honest Acknowledged Sorrow', body: 'Allowing tears, supportive community care, and faithful endurance without self-reproach.', accent: PALETTE.emerald })}
          <rect x="74" y="396" width="564" height="162" rx="6" fill="#F4F2EA" stroke="${PALETTE.gold}" />
          ${renderSvgTextLines(wrapLines('Prophetic sorrow (12:84, Ya‘qub’s grief) models deep human love alongside spiritual endurance rather than rigid stoic denial.', 70, 4), 94, 444, 20, { fontSize: 12.5, fill: PALETTE.ink })}
        `
        : `
          ${cycleNodeRing(356, 366, 138, [
            { label: 'Loss-Oriented Processing', sub: 'Grief Work &amp; Remembrance', color: PALETTE.plum },
            { label: 'Dynamic Oscillation', sub: 'Natural Non-Linear Shifts', color: PALETTE.gold },
            { label: 'Restoration Orientation', sub: 'Daily Routines &amp; Roles', color: PALETTE.emerald },
            { label: 'Social Support Net', sub: 'Care &amp; Professional Help', color: PALETTE.cyan },
          ])}
          <text x="356" y="362" font-family="Liberation Serif, serif" font-size="11.5" font-weight="700" fill="${PALETTE.plum}" text-anchor="middle">NO FIXED</text>
          <text x="356" y="378" font-family="Liberation Serif, serif" font-size="11.5" font-weight="700" fill="${PALETTE.plum}" text-anchor="middle">TIMELINE</text>
        `;
    } else if (kind === 'fear-uncertainty-coping') {
      const isWorry = id === 'PSY-023';
      leftTitle = isWorry ? 'RUMINATION LOOPS VS. STRUCTURED PROBLEM SOLVING' : 'THREAT APPRAISAL, PRACTICAL PRECAUTIONS &amp; TRUST';
      leftSvg = isWorry
        ? `
          ${titledCard({ x: 74, y: 196, w: 270, h: 175, badge: 'Unhelpful Worry Spiral', title: 'Catastrophic "What-If" Brooding', body: 'Repetitive unchecked anxiety amplifies autonomic tension without clarifying real action.', accent: PALETTE.rust })}
          ${titledCard({ x: 368, y: 196, w: 270, h: 175, badge: 'Structured Problem Solving', title: 'Fact Check + Clinical Support', body: 'Breaks acute threats into workable steps and invites CBT/clinical care for persistent anxiety.', accent: PALETTE.emerald })}
          <rect x="74" y="392" width="564" height="162" rx="6" fill="#EDF5F9" stroke="${PALETTE.cyan}" />
          ${renderSvgTextLines(wrapLines('Experiencing chronic anxiety is a common human health challenge rather than a personal failing of faith.', 70, 4), 94, 442, 19, { fontSize: 12.5, fill: PALETTE.ink })}
        `
        : `
          ${titledCard({ x: 74, y: 202, w: 172, h: 240, title: '1. Realistic Threat Check', body: 'Assess actual hazards objectively rather than catastrophic fears.', accent: PALETTE.blue })}
          ${flowArrow(250, 322, 278, 322, PALETTE.emerald, 2.8)}
          ${titledCard({ x: 282, y: 202, w: 172, h: 240, title: '2. Concrete Precautions', body: 'Take practical safety, health, or financial preparation.', accent: PALETTE.emerald })}
          ${flowArrow(458, 322, 486, 322, PALETTE.emerald, 2.8)}
          ${titledCard({ x: 490, y: 202, w: 148, h: 240, title: '3. Grounded Acceptance', body: 'Release uncontrollable future worries calmly.', accent: PALETTE.gold })}
          <text x="356" y="514" font-family="Noto Sans, sans-serif" font-size="12" font-weight="600" fill="${PALETTE.inkMuted}" text-anchor="middle">Trust in divine wisdom coexists with practical preparedness and medical prudence.</text>
        `;
    } else if (kind === 'hope-adversity-coping') {
      const mode = id === 'PSY-002' ? 'pathways' : id === 'PSY-019' ? 'sustained' : 'hopelessness';
      leftTitle = mode === 'hopelessness' ? 'HOPELESSNESS RISK VS. COMPASSIONATE CLINICAL CARE' : mode === 'sustained' ? 'FAITH-ANCHORED HOPE + CLINICAL &amp; COMMUNITY CARE' : 'SNYDER HOPE PATHWAYS &amp; CLINICAL SUPPORT BOUNDARY';
      leftSvg =
        mode === 'hopelessness'
          ? `
            ${titledCard({ x: 74, y: 196, w: 564, h: 112, badge: 'Early Warning Signals', title: 'Persistent Despair, Withdrawal or Anhedonia', body: 'Sustained hopelessness correlates with depressive episodes and requires compassionate outreach.', accent: PALETTE.rust })}
            ${titledCard({ x: 74, y: 322, w: 564, h: 112, badge: 'Faith &amp; Community Buffer', title: 'Mercy Messaging Without Shame', body: 'Verses 12:87 &amp; 39:53 counter despair gently without blaming sufferers for clinical depression.', accent: PALETTE.gold })}
            ${titledCard({ x: 74, y: 448, w: 564, h: 112, badge: 'Evidence-Based Care', title: 'NIMH Clinical Evaluation &amp; Support', body: 'Psychotherapy, medical care, and crisis support remain essential alongside spiritual comfort.', accent: PALETTE.cyan })}
          `
          : mode === 'sustained'
          ? `
            ${titledCard({ x: 74, y: 204, w: 168, h: 242, title: '1. Existential Anchor', body: 'Spiritual meaning sustains morale during protracted hardship.', accent: PALETTE.gold })}
            ${flowArrow(246, 325, 276, 325, PALETTE.emerald, 2.8)}
            ${titledCard({ x: 280, y: 204, w: 170, h: 242, title: '2. Community &amp; Social Aid', body: 'Trusted peers reduce isolation &amp; share material burdens.', accent: PALETTE.emerald })}
            ${flowArrow(454, 325, 484, 325, PALETTE.cyan, 2.8)}
            ${titledCard({ x: 488, y: 204, w: 148, h: 242, title: '3. Licensed Mental Care', body: 'Therapy &amp; medicine treat persistent mood disorders directly.', accent: PALETTE.cyan })}
            <text x="356" y="514" font-family="Noto Sans, sans-serif" font-size="12" font-weight="600" fill="${PALETTE.inkMuted}" text-anchor="middle">Sustained hope complements—never replaces—professional clinical evaluation.</text>
          `
          : `
            ${titledCard({ x: 74, y: 200, w: 270, h: 170, badge: 'Agency Component', title: 'Motivation &amp; Purpose', body: 'Sustained willpower when facing setbacks or uncertainty.', accent: PALETTE.gold })}
            ${titledCard({ x: 368, y: 200, w: 270, h: 170, badge: 'Pathways Component', title: 'Flexible Problem Routes', body: 'Generating alternative practical steps when initial plans stall.', accent: PALETTE.emerald })}
            <rect x="74" y="392" width="564" height="165" rx="6" fill="#F2F7F4" stroke="${PALETTE.emerald}" />
            ${renderSvgTextLines(wrapLines('Surah al-Sharh (94:5–6) pairs endurance with realistic hope, not guaranteeing immediate external relief.', 70, 4), 94, 444, 20, { fontSize: 12.5, fill: PALETTE.ink })}
          `;
    } else if (kind === 'gratitude-wellbeing') {
      if (id === 'PSY-018') {
        leftTitle = 'BASIC FINANCIAL SECURITY VS. COMPULSIVE ACCUMULATION';
        leftSvg = `
          ${titledCard({ x: 74, y: 202, w: 270, h: 175, badge: 'Foundational Stability', title: 'Sufficient Income, Shelter &amp; Care', body: 'Meeting family needs reliably relieves chronic survival stress and strengthens wellbeing.', accent: PALETTE.emerald })}
          ${titledCard({ x: 368, y: 202, w: 270, h: 175, badge: 'Obsessive Hoarding Risk', title: 'Compulsive Status Accumulation', body: 'Treating endless wealth as an identity shield fuels debt, anxiety &amp; fractured bonds.', accent: PALETTE.rust })}
          <rect x="74" y="398" width="564" height="155" rx="6" fill="#FAF6EC" stroke="${PALETTE.gold}" />
          ${renderSvgTextLines(wrapLines('Moral cautions against hoarding critique obsession over people—never condemning lawful work, savings, or fair provision.', 70, 4), 94, 444, 19, { fontSize: 12.5, fill: PALETTE.ink })}
        `;
      } else {
        const isAttn = id === 'PSY-004';
        leftTitle = isAttn ? 'GRATITUDE ATTENTIONAL SHIFT &amp; CONTEXT LIMITS' : 'MATERIAL RIVALRY VS. BALANCED SUFFICIENCY';
        leftSvg = `
          ${chartAxes({ x: 136, y: 205, w: 478, h: 290, xLabel: isAttn ? 'Notice &amp; Appraise Positive Support' : 'Material Acquisition Beyond Basic Needs', yLabel: 'Subjective Wellbeing (Conceptual)', xTicks: ['Baseline', 'Modest Practice / Security', 'Excess'], yTicks: ['Lower', 'Balanced', 'Diminishing'], yLabelOffset: 72 })}
          <path d="${isAttn ? 'M 146 420 Q 345 285 604 265' : 'M 142 460 Q 290 235 422 235 Q 520 250 606 340'}" fill="none" stroke="${PALETTE.emerald}" stroke-width="3.5" />
          ${calloutTag(385, 224, isAttn ? 'Modest Positive Shift (Culture-Dependent)' : 'Diminishing Returns Above Security Threshold', PALETTE.emerald, '#FFFFFF', PALETTE.emerald)}
          ${calloutTag(485, 420, isAttn ? 'Must Not Dismiss Real Trauma' : 'Comparison Anxiety Erodes Contentment', PALETTE.rust, '#FFFFFF', PALETTE.rust)}
        `;
      }
    } else {
      const isCycle = id === 'PSY-001';
      const isAppraisal = id === 'PSY-003';
      leftTitle = isCycle ? 'MEANING, CONTEMPLATION &amp; CLINICAL BOUNDARIES' : isAppraisal ? 'STRESS APPRAISAL, RESOURCE MAPPING &amp; SAFETY' : 'CONTROLLABLE EFFORT VS. UNCONTROLLABLE OUTCOMES';
      leftSvg = isCycle
        ? `
          ${cycleNodeRing(356, 366, 138, [
            { label: 'Contemplative Meaning', sub: 'Dhikr &amp; Existential Grounding', color: PALETTE.gold },
            { label: 'Affective Steadiness', sub: 'Calmer Attention Regulation', color: PALETTE.emerald },
            { label: 'Community Belonging', sub: 'Shared Prosocial Support', color: PALETTE.cyan },
            { label: 'Clinical Care Scope', sub: 'NIMH Therapy When Needed', color: PALETTE.rust },
          ])}
          <text x="356" y="362" font-family="Liberation Serif, serif" font-size="11.5" font-weight="700" fill="${PALETTE.emerald}" text-anchor="middle">SPIRITUAL</text>
          <text x="356" y="378" font-family="Liberation Serif, serif" font-size="11.5" font-weight="700" fill="${PALETTE.emerald}" text-anchor="middle">COPING</text>
        `
        : isAppraisal
        ? `
          ${titledCard({ x: 74, y: 204, w: 168, h: 242, title: '1. Safety Appraisal', body: 'Distinguish solvable stressors from unsafe abuse or injury.', accent: PALETTE.rust })}
          ${flowArrow(246, 325, 276, 325, PALETTE.blue, 2.8)}
          ${titledCard({ x: 280, y: 204, w: 170, h: 242, title: '2. Lawful Remedies', body: 'Seek counsel, protection, social support &amp; practical action.', accent: PALETTE.blue })}
          ${flowArrow(454, 325, 484, 325, PALETTE.emerald, 2.8)}
          ${titledCard({ x: 488, y: 204, w: 148, h: 242, title: '3. Resilient Persistence', body: 'Sustain composure &amp; adaptive coping without self-blame.', accent: PALETTE.emerald })}
          <text x="356" y="516" font-family="Noto Sans, sans-serif" font-size="12" font-weight="600" fill="${PALETTE.rust}" text-anchor="middle">Patience (sabr) NEVER requires enduring ongoing abuse or preventable danger.</text>
        `
        : `
          ${titledCard({ x: 74, y: 196, w: 270, h: 175, badge: 'Controllable Domain', title: 'Ethical Effort &amp; Preparation', body: 'Direct energy toward speech, safety steps, lawful work, and problem-solving.', accent: PALETTE.emerald })}
          ${titledCard({ x: 368, y: 196, w: 270, h: 175, badge: 'Uncontrollable Domain', title: 'Uncertainty &amp; External Outcomes', body: 'Practice composure and trust rather than exhausting anxious micromanagement.', accent: PALETTE.blue })}
          <rect x="74" y="392" width="564" height="165" rx="6" fill="#FAF0EC" stroke="${PALETTE.rust}" />
          ${renderSvgTextLines(wrapLines('CRITICAL SAFEGUARD: Responsible action paired with letting go of what cannot be forced supports calm resilience.', 70, 4), 94, 444, 20, { fontSize: 12.5, fill: PALETTE.rust })}
        `;
    }

    bodySvg = `
      ${cardBox({ x: 46, y: 168, w: 620, h: 430, fill: PALETTE.paperCard, stroke: PALETTE.emerald, strokeWidth: 1.4, accentTop: PALETTE.emerald })}
      <text x="356" y="188" font-family="Noto Sans, sans-serif" font-size="13.5" font-weight="700" fill="#FFFFFF" text-anchor="middle">${leftTitle}</text>
      ${leftSvg}
      ${modelBadge}
    `;

  // 2. Self-Regulation, Anger, Envy, Deliberation, Habits & Delayed Gratification (PSY-005, 006, 010..016, 025..030, 038, 042, 043)
  } else if (
    kind === 'emotion-regulation-anger' ||
    kind === 'moral-self-discipline' ||
    kind === 'self-awareness-reflection' ||
    kind === 'impulse-control-self-regulation' ||
    kind === 'humility-social-interaction' ||
    kind === 'decision-making-consultation' ||
    kind === 'habit-formation-reinforcement' ||
    kind === 'delayed-gratification'
  ) {
    let leftTitle = 'COGNITIVE SELF-REGULATION &amp; BEHAVIOURAL PATHWAYS';
    let leftSvg = '';

    if (kind === 'habit-formation-reinforcement') {
      const isSteady = id === 'PSY-030';
      leftTitle = isSteady ? 'CONSISTENT INCREMENTAL PRACTICE VS. SPORADIC BURSTS' : 'CUE → ROUTINE → REINFORCEMENT HABIT LOOP';
      leftSvg = isSteady
        ? `
          ${chartAxes({ x: 134, y: 205, w: 486, h: 290, xLabel: 'Time (Weeks of Practice)', yLabel: 'Behavioural Automaticity', xTicks: ['Week 1', 'Week 4', 'Week 8', 'Week 12'], yTicks: ['Effortful', 'Building', 'Habitual'], yLabelOffset: 68 })}
          <path d="M 138 465 Q 300 350 612 240" fill="none" stroke="${PALETTE.emerald}" stroke-width="3.5" />
          <path d="M 138 465 L 230 265 L 275 440 L 385 290 L 445 445 L 550 315 L 612 430" fill="none" stroke="${PALETTE.rust}" stroke-width="2.5" stroke-dasharray="5 3" />
          ${calloutTag(480, 238, 'Small Daily Habits Compound Steadily', PALETTE.emerald, '#FFFFFF', PALETTE.emerald)}
          ${calloutTag(445, 445, 'Unsustainable Spikes Burn Out', PALETTE.rust, '#FFFFFF', PALETTE.rust)}
        `
        : `
          ${cycleNodeRing(356, 366, 138, [
            { label: '1. Environmental Cue', sub: 'Time, Place or Prompt', color: PALETTE.blue },
            { label: '2. Repeated Routine', sub: 'Intentional Action Pattern', color: PALETTE.emerald },
            { label: '3. Meaningful Reward', sub: 'Intrinsic Value Alignment', color: PALETTE.gold },
            { label: '4. Context Design', sub: 'Friction Against Bad Habits', color: PALETTE.ochre },
          ])}
          <text x="356" y="364" font-family="Liberation Serif, serif" font-size="11.5" font-weight="700" fill="${PALETTE.emerald}" text-anchor="middle">HABIT</text>
          <text x="356" y="380" font-family="Liberation Serif, serif" font-size="11.5" font-weight="700" fill="${PALETTE.emerald}" text-anchor="middle">LOOP</text>
        `;
    } else if (kind === 'delayed-gratification' || kind === 'impulse-control-self-regulation') {
      const isHaste = id === 'PSY-026';
      const isSteward = id === 'PSY-043';
      const isContext = id === 'PSY-042';
      leftTitle = isHaste
        ? 'AUTONOMIC AROUSAL COOLING ACROSS A DELIBERATIVE PAUSE'
        : isSteward
        ? 'RESOURCE STEWARDSHIP SPECTRUM: BALANCED VS. EXTREME'
        : isContext
        ? 'LONG-TERM PLANNING DEPENDS ON STABILITY &amp; FAIR TRUST'
        : 'TEMPORAL DISCOUNTING: IMPULSE VS. LONG-TERM VALUE';
      leftSvg = isSteward
        ? `
          <rect x="74" y="206" width="564" height="196" rx="6" fill="#FAF8F3" stroke="${PALETTE.border}" />
          <text x="94" y="232" font-family="Noto Sans, sans-serif" font-size="12" font-weight="700" fill="${PALETTE.ink}">Financial &amp; Resource Allocation Patterns</text>
          <text x="94" y="268" font-family="Noto Sans, sans-serif" font-size="12" font-weight="600" fill="${PALETTE.rust}">Miserliness / Hoarding</text>
          <rect x="275" y="253" width="145" height="22" rx="4" fill="${PALETTE.rust}" fill-opacity="0.82" />
          <text x="430" y="268" font-family="Noto Sans, sans-serif" font-size="11.5" fill="${PALETTE.inkMuted}">Withholds aid &amp; basic care</text>
          <text x="94" y="316" font-family="Noto Sans, sans-serif" font-size="12" font-weight="700" fill="${PALETTE.emerald}">Balanced Stewardship (25:67)</text>
          <rect x="275" y="301" width="320" height="22" rx="4" fill="${PALETTE.emerald}" />
          <text x="285" y="316" font-family="Noto Sans, sans-serif" font-size="11" font-weight="700" fill="#FFFFFF">Needs + Prudent Reserve + Generosity</text>
          <text x="94" y="364" font-family="Noto Sans, sans-serif" font-size="12" font-weight="600" fill="${PALETTE.ochre}">Impulsive Excess (Israf)</text>
          <rect x="275" y="349" width="190" height="22" rx="4" fill="${PALETTE.ochre}" fill-opacity="0.85" />
          <text x="475" y="364" font-family="Noto Sans, sans-serif" font-size="11.5" fill="${PALETTE.inkMuted}">Debt &amp; status strain</text>
          <rect x="74" y="420" width="564" height="132" rx="6" fill="#FAF6EC" stroke="${PALETTE.gold}" />
          ${renderSvgTextLines(wrapLines(lim, 70, 4), 94, 464, 19, { fontSize: 12.5, fill: PALETTE.ink })}
        `
        : isHaste
        ? `
          <rect x="74" y="206" width="564" height="205" rx="6" fill="#FAF8F3" stroke="${PALETTE.border}" />
          <text x="94" y="232" font-family="Noto Sans, sans-serif" font-size="12" font-weight="700" fill="${PALETTE.ink}">Reactivity Decay Across Deliberate Delay Windows</text>
          <text x="94" y="268" font-family="Noto Sans, sans-serif" font-size="12" font-weight="700" fill="${PALETTE.rust}">0 s (Trigger)</text>
          <rect x="215" y="253" width="350" height="20" rx="4" fill="${PALETTE.rust}" />
          <text x="574" y="268" font-family="Noto Sans, sans-serif" font-size="11.5" fill="${PALETTE.rust}">Peak Haste</text>
          <text x="94" y="308" font-family="Noto Sans, sans-serif" font-size="12" font-weight="600" fill="${PALETTE.ochre}">10 s Breath</text>
          <rect x="215" y="293" width="245" height="20" rx="4" fill="${PALETTE.ochre}" />
          <text x="470" y="308" font-family="Noto Sans, sans-serif" font-size="11.5" fill="${PALETTE.inkMuted}">Interrupts snap reply</text>
          <text x="94" y="348" font-family="Noto Sans, sans-serif" font-size="12" font-weight="600" fill="${PALETTE.blue}">5 min Pause</text>
          <rect x="215" y="333" width="150" height="20" rx="4" fill="${PALETTE.blue}" />
          <text x="375" y="348" font-family="Noto Sans, sans-serif" font-size="11.5" fill="${PALETTE.inkMuted}">Facts &amp; context checked</text>
          <text x="94" y="388" font-family="Noto Sans, sans-serif" font-size="12" font-weight="700" fill="${PALETTE.emerald}">30 min Calm</text>
          <rect x="215" y="373" width="84" height="20" rx="4" fill="${PALETTE.emerald}" />
          <text x="310" y="388" font-family="Noto Sans, sans-serif" font-size="11.5" fill="${PALETTE.emerald}">Deliberative choice</text>
          <rect x="74" y="426" width="564" height="126" rx="6" fill="#EDF5F9" stroke="${PALETTE.blue}" />
          ${renderSvgTextLines(wrapLines('Slowing high-arousal decisions lowers avoidable regret, while acute emergencies still require rapid protective action.', 70, 4), 94, 470, 19, { fontSize: 12.5, fill: PALETTE.ink })}
        `
        : isContext
        ? `
          ${titledCard({ x: 74, y: 202, w: 270, h: 185, badge: 'Unreliable Environment', title: 'Scarcity &amp; Broken Promises', body: 'When survival is precarious or promises fail, immediate focus is often an adaptive response—not weak character.', accent: PALETTE.rust })}
          ${titledCard({ x: 368, y: 202, w: 270, h: 185, badge: 'Supportive Context', title: 'Basic Needs + Fair Trust', body: 'Predictable support &amp; credible commitments make long-horizon planning viable.', accent: PALETTE.emerald })}
          <rect x="74" y="408" width="564" height="144" rx="6" fill="#FAF6EC" stroke="${PALETTE.gold}" />
          ${renderSvgTextLines(wrapLines(lim, 70, 4), 94, 452, 19, { fontSize: 12.5, fill: PALETTE.ink })}
        `
        : `
          ${chartAxes({ x: 134, y: 205, w: 482, h: 290, xLabel: 'Delay Horizon Before Outcome', yLabel: 'Perceived Subjective Value', xTicks: ['Immediate', 'Short Delay', 'Long Horizon'], yTicks: ['Low', 'Moderate', 'High'], yLabelOffset: 68 })}
          <path d="M 142 230 Q 258 285 388 395 Q 500 445 608 460" fill="none" stroke="${PALETTE.rust}" stroke-width="3.5" />
          <path d="M 142 445 Q 325 345 608 250" fill="none" stroke="${PALETTE.emerald}" stroke-width="3.5" />
          ${calloutTag(236, 232, 'Immediate Temptation Pull', PALETTE.rust, '#FFFFFF', PALETTE.rust)}
          ${calloutTag(498, 238, 'Long-Term Goal Stability', PALETTE.emerald, '#FFFFFF', PALETTE.emerald)}
        `;
    } else if (kind === 'emotion-regulation-anger') {
      const mode = id === 'PSY-005' ? 'anger' : id === 'PSY-016' ? 'comparison' : 'envy_jealousy';
      leftTitle = mode === 'anger' ? 'ANGER REGULATION: REAPPRAISAL VS. ESCALATION' : mode === 'comparison' ? 'UPWARD SOCIAL COMPARISON &amp; ENVY TRIGGERS' : 'APA DISTINCTION: ENVY VS. RELATIONSHIP JEALOUSY';
      leftSvg =
        mode === 'anger'
          ? `
            ${titledCard({ x: 74, y: 204, w: 170, h: 245, title: '1. Anger Trigger', body: 'Perceived insult or threat sparks acute arousal.', accent: PALETTE.rust })}
            ${flowArrow(248, 325, 276, 325, PALETTE.emerald, 2.8)}
            ${titledCard({ x: 280, y: 204, w: 170, h: 245, title: '2. Pause &amp; Reappraise', body: 'Slow breathing &amp; perspective-taking interrupt impulsive retaliation.', accent: PALETTE.cyan })}
            ${flowArrow(454, 325, 482, 325, PALETTE.emerald, 2.8)}
            ${titledCard({ x: 486, y: 204, w: 150, h: 245, title: '3. Measured Response', body: 'Forgiveness or firm calm boundary (3:134).', accent: PALETTE.emerald })}
            <text x="356" y="514" font-family="Noto Sans, sans-serif" font-size="12" font-weight="600" fill="${PALETTE.inkMuted}" text-anchor="middle">Healthy regulation sets boundaries against injustice without retaliatory cruelty.</text>
          `
          : mode === 'envy_jealousy'
          ? `
            ${titledCard({ x: 74, y: 204, w: 170, h: 245, badge: 'Two-Party', title: 'Envy (Hasad)', body: 'Coveting what another has or wishing their blessing vanish.', accent: PALETTE.rust })}
            ${flowArrow(248, 325, 276, 325, PALETTE.blue, 2.6)}
            ${titledCard({ x: 280, y: 204, w: 170, h: 245, badge: 'Three-Party', title: 'Jealousy (Bond Fear)', body: 'Fear of losing an existing valued attachment to a third party.', accent: PALETTE.ochre })}
            ${flowArrow(454, 325, 482, 325, PALETTE.emerald, 2.6)}
            ${titledCard({ x: 486, y: 204, w: 150, h: 245, badge: 'Healthy Step', title: 'Direct Trust Dialogue', body: 'Name needs honestly without hostility or spying.', accent: PALETTE.emerald })}
            <rect x="74" y="468" width="564" height="84" rx="6" fill="#FAF6EC" stroke="${PALETTE.gold}" />
            ${renderSvgTextLines(wrapLines(lim, 70, 3), 94, 498, 18, { fontSize: 12, fill: PALETTE.ink })}
          `
          : `
            ${titledCard({ x: 74, y: 202, w: 270, h: 175, badge: 'Resentful Drift', title: 'Destructive Resentment', body: 'Compulsive upward comparison turns peers into rivals and erodes inner peace.', accent: PALETTE.rust })}
            ${titledCard({ x: 368, y: 202, w: 270, h: 175, badge: 'Constructive Focus', title: 'Admiration &amp; Aspiration (Ghibtah)', body: 'Appreciating another’s excellence while striving constructively oneself.', accent: PALETTE.emerald })}
            <rect x="74" y="398" width="564" height="155" rx="6" fill="#FAF6EC" stroke="${PALETTE.gold}" />
            ${renderSvgTextLines(wrapLines(lim, 70, 4), 94, 444, 19, { fontSize: 12.5, fill: PALETTE.ink })}
          `;
    } else if (kind === 'decision-making-consultation') {
      leftTitle = 'INDIVIDUAL BIAS CHECKS VIA CONSULTATIVE DELIBERATION (SHURA)';
      leftSvg = `
        ${titledCard({ x: 74, y: 202, w: 266, h: 165, badge: 'Solo Blind Spots', title: 'Confirmation &amp; Overconfidence', body: 'Unchecked individual choice filters out disconfirming evidence and risks.', accent: PALETTE.rust })}
        ${flowArrow(344, 285, 372, 285, PALETTE.emerald, 3)}
        ${titledCard({ x: 376, y: 202, w: 266, h: 165, badge: 'Group Consultation', title: 'Diverse Perspectives &amp; Dissent', body: 'Structured shura tests assumptions—provided groupthink pressure is resisted.', accent: PALETTE.emerald })}
        <rect x="74" y="388" width="568" height="165" rx="6" fill="#EDF5F9" stroke="${PALETTE.blue}" />
        ${renderSvgTextLines(wrapLines('Group deliberation works best when speakers can voice honest critiques safely rather than merely echoing high-status opinions.', 70, 4), 94, 438, 19, { fontSize: 12.5, fill: PALETTE.ink })}
      `;
    } else if (kind === 'humility-social-interaction') {
      const isFeedback = id === 'PSY-015';
      leftTitle = isFeedback ? 'SELF-RESPECT SPECTRUM: GROUNDED HUMILITY (25:63)' : 'ARROGANCE FRICTION VS. HUMILITY &amp; OPENNESS';
      leftSvg = isFeedback
        ? `
          ${titledCard({ x: 74, y: 204, w: 170, h: 245, badge: 'Too Low', title: 'Self-Abasement', body: 'Erases own voice or tolerates abuse as false modesty.', accent: PALETTE.ochre })}
          ${titledCard({ x: 274, y: 204, w: 176, h: 245, badge: 'Balanced Centre', title: 'Grounded Humility', body: 'Steady dignity + gentle speech + openness to valid critique.', accent: PALETTE.emerald })}
          ${titledCard({ x: 478, y: 204, w: 160, h: 245, badge: 'Too High', title: 'Ego Defensiveness', body: 'Rejects feedback to shield inflated status.', accent: PALETTE.rust })}
          <rect x="74" y="468" width="564" height="84" rx="6" fill="#FAF6EC" stroke="${PALETTE.gold}" />
          ${renderSvgTextLines(wrapLines('True humility honours mutual human dignity and never requires accepting mistreatment.', 70, 3), 94, 498, 18, { fontSize: 12, fill: PALETTE.ink })}
        `
        : `
          ${titledCard({ x: 74, y: 202, w: 270, h: 185, badge: 'Ego Defensiveness', title: 'Pride &amp; Status Dismissal', body: 'Dismisses valid evidence and belittles others to protect fragile superiority.', accent: PALETTE.rust })}
          ${titledCard({ x: 368, y: 202, w: 270, h: 185, badge: 'Intellectual Humility', title: 'Openness Without Self-Abasement', body: 'Recognizes human limits while preserving dignity, truth-seeking &amp; mutual respect.', accent: PALETTE.emerald })}
          <rect x="74" y="408" width="564" height="145" rx="6" fill="#F4F2EA" stroke="${PALETTE.gold}" />
          ${renderSvgTextLines(wrapLines(lim, 70, 4), 94, 452, 19, { fontSize: 12.5, fill: PALETTE.ink })}
        `;
    } else if (id === 'PSY-010') {
      leftTitle = 'ACTION CONSEQUENCE RIPPLE &amp; EVERYDAY ACCOUNTABILITY';
      leftSvg = `
        ${titledCard({ x: 74, y: 204, w: 168, h: 245, title: '1. Small Daily Act', body: 'Speech, fairness, or neglect repeated in ordinary moments.', accent: PALETTE.blue })}
        ${flowArrow(246, 325, 274, 325, PALETTE.emerald, 2.8)}
        ${titledCard({ x: 278, y: 204, w: 176, h: 245, title: '2. Compounding Ripple', body: 'Shapes personal habits and relational trust outward.', accent: PALETTE.emerald })}
        ${flowArrow(458, 325, 486, 325, PALETTE.gold, 2.8)}
        ${titledCard({ x: 490, y: 204, w: 148, h: 245, title: '3. Distinct Scope', body: 'Social effects are empirical; eschatology (99:7–8) is theological.', accent: PALETTE.gold })}
        <text x="356" y="516" font-family="Noto Sans, sans-serif" font-size="12" font-weight="600" fill="${PALETTE.inkMuted}" text-anchor="middle">Everyday responsibility tracks observable consequences without collapsing theology into psychology.</text>
      `;
    } else if (id === 'PSY-011') {
      leftTitle = 'CONSTRUCTIVE SELF-REFLECTION VS. DEPRESSIVE BROODING';
      leftSvg = `
        ${titledCard({ x: 74, y: 202, w: 270, h: 185, badge: 'Adaptive Inquiry', title: 'Actionable Reflection', body: 'Asks calmly "What can I adjust next time?" with proportion and repair.', accent: PALETTE.emerald })}
        ${titledCard({ x: 368, y: 202, w: 270, h: 185, badge: 'Clinical Risk', title: 'Depressive Rumination Loop', body: 'Repetitive hopeless self-attack amplifies anxiety &amp; low mood.', accent: PALETTE.rust })}
        <rect x="74" y="408" width="564" height="145" rx="6" fill="#FAF0EC" stroke="${PALETTE.rust}" />
        ${renderSvgTextLines(wrapLines('CRITICAL BOUNDARY: Qur’anic nafs is a layered spiritual concept; harsh scrupulosity should seek compassionate clinical care.', 70, 4), 94, 452, 19, { fontSize: 12.5, fill: PALETTE.rust })}
      `;
    } else if (id === 'PSY-013') {
      leftTitle = 'ETHICAL SELF-AUDIT LOOP &amp; TAZKIYAH SCOPE BOUNDARY';
      leftSvg = `
        ${cycleNodeRing(356, 366, 138, [
          { label: '1. Explicit Values', sub: 'Honesty &amp; Fairness', color: PALETTE.blue },
          { label: '2. Observe Conduct', sub: 'Spot Rationalizations', color: PALETTE.ochre },
          { label: '3. Repair &amp; Adjust', sub: 'Practical Restitution', color: PALETTE.emerald },
          { label: '4. Spiritual Distinctness', sub: 'Tazkiyah ≠ Lab Metric', color: PALETTE.gold },
        ])}
        <text x="356" y="362" font-family="Liberation Serif, serif" font-size="11.5" font-weight="700" fill="${PALETTE.emerald}" text-anchor="middle">SELF</text>
        <text x="356" y="378" font-family="Liberation Serif, serif" font-size="11.5" font-weight="700" fill="${PALETTE.emerald}" text-anchor="middle">AUDIT</text>
      `;
    } else if (id === 'PSY-028') {
      leftTitle = 'ADAPTIVE EXPERIENCE REVIEW VS. DENIAL OR SELF-ATTACK';
      leftSvg = `
        <rect x="74" y="206" width="564" height="196" rx="6" fill="#FAF8F3" stroke="${PALETTE.border}" />
        <text x="94" y="232" font-family="Noto Sans, sans-serif" font-size="12" font-weight="700" fill="${PALETTE.ink}">Post-Setback Reflection Modes</text>
        <text x="94" y="268" font-family="Noto Sans, sans-serif" font-size="12" font-weight="600" fill="${PALETTE.ochre}">Avoidant Denial</text>
        <rect x="255" y="253" width="120" height="22" rx="4" fill="${PALETTE.ochre}" fill-opacity="0.82" />
        <text x="385" y="268" font-family="Noto Sans, sans-serif" font-size="11.5" fill="${PALETTE.inkMuted}">Skips learning; repeats errors</text>
        <text x="94" y="316" font-family="Noto Sans, sans-serif" font-size="12" font-weight="600" fill="${PALETTE.rust}">Harsh Brooding</text>
        <rect x="255" y="301" width="140" height="22" rx="4" fill="${PALETTE.rust}" fill-opacity="0.82" />
        <text x="405" y="316" font-family="Noto Sans, sans-serif" font-size="11.5" fill="${PALETTE.inkMuted}">Spikes distress &amp; hopelessness</text>
        <text x="94" y="364" font-family="Noto Sans, sans-serif" font-size="12" font-weight="700" fill="${PALETTE.emerald}">Adaptive Review</text>
        <rect x="255" y="349" width="340" height="22" rx="4" fill="${PALETTE.emerald}" />
        <text x="265" y="364" font-family="Noto Sans, sans-serif" font-size="11" font-weight="700" fill="#FFFFFF">Concrete Lesson + Self-Compassion</text>
        <rect x="74" y="420" width="564" height="132" rx="6" fill="#EDF5F9" stroke="${PALETTE.blue}" />
        ${renderSvgTextLines(wrapLines(lim, 70, 4), 94, 464, 19, { fontSize: 12.5, fill: PALETTE.ink })}
      `;
    } else {
      // PSY-027: Metacognitive monitoring
      leftTitle = 'METACOGNITIVE MONITORING &amp; ASSUMPTION TESTING';
      leftSvg = `
        ${titledCard({ x: 74, y: 196, w: 564, h: 110, badge: 'Assumption Audit', title: 'Pause to Examine Underlying Premises', body: 'Tests initial intuitions before committing to sweeping conclusions (3:190–191).', accent: PALETTE.emerald })}
        ${titledCard({ x: 74, y: 320, w: 564, h: 110, badge: 'Bias Check', title: 'Seek Disconfirming Evidence &amp; Limits', body: 'Counters overconfidence by weighing alternatives and uncertainty.', accent: PALETTE.blue })}
        ${titledCard({ x: 74, y: 444, w: 564, h: 110, badge: 'Scholarly Scope', title: 'Devotional Reflection vs. Cognitive Theory', body: lim, accent: PALETTE.gold })}
      `;
    }

    bodySvg = `
      ${cardBox({ x: 46, y: 168, w: 620, h: 430, fill: PALETTE.paperCard, stroke: PALETTE.blue, strokeWidth: 1.4, accentTop: PALETTE.blue })}
      <text x="356" y="188" font-family="Noto Sans, sans-serif" font-size="13.5" font-weight="700" fill="#FFFFFF" text-anchor="middle">${leftTitle}</text>
      ${leftSvg}
      ${modelBadge}
    `;

  // 3. Social Cognition, Trust, Misinformation, Compassion, Intergroup Bias & Reconciliation (PSY-006..009, 031..041, 044..050)
  } else {
    let leftTitle = 'SOCIAL COGNITION, COMMUNICATION &amp; PROSOCIAL TRUST';
    let leftSvg = '';

    if (kind === 'information-verification-credibility') {
      leftTitle = 'TABAYYUN VERIFICATION FILTER BEFORE SHARING CLAIMS';
      leftSvg = `
        ${titledCard({ x: 74, y: 204, w: 168, h: 245, title: '1. Unvetted Claim Arrives', body: 'High emotion or social urgency invites premature sharing.', accent: PALETTE.ochre })}
        ${flowArrow(246, 325, 274, 325, PALETTE.emerald, 2.8)}
        ${titledCard({ x: 278, y: 204, w: 176, h: 245, title: '2. Source &amp; Evidence Gate', body: 'Check primary witnesses, bias, and corroboration (49:6).', accent: PALETTE.blue })}
        ${flowArrow(458, 325, 486, 325, PALETTE.emerald, 2.8)}
        ${titledCard({ x: 490, y: 204, w: 148, h: 245, title: '3. Accurate Relay or Halt', body: 'Prevent false harm and reputational injury.', accent: PALETTE.emerald })}
        <text x="356" y="516" font-family="Noto Sans, sans-serif" font-size="12" font-weight="600" fill="${PALETTE.inkMuted}" text-anchor="middle">Combines Qur’anic verification ethics (49:6) with media-literacy source checking.</text>
      `;
    } else if (kind === 'gossip-trust-reputation' || kind === 'social-cognition-suspicion' || kind === 'deception-and-trust') {
      if (id === 'PSY-008') {
        leftTitle = 'MALICIOUS GOSSIP VS. LEGITIMATE PROTECTIVE REPORTING';
        leftSvg = `
          ${titledCard({ x: 74, y: 202, w: 270, h: 185, badge: 'Harmful Backbiting', title: 'Malicious Gossip &amp; Ridicule', body: 'Speaks behind backs to demean dignity, spread stigma &amp; fracture community safety.', accent: PALETTE.rust })}
          ${titledCard({ x: 368, y: 202, w: 270, h: 185, badge: 'Mandatory Exception', title: 'Safeguarding &amp; Abuse Reporting', body: 'Reporting fraud, bullying, or child/domestic danger to authorities protects victims.', accent: PALETTE.emerald })}
          <rect x="74" y="408" width="564" height="145" rx="6" fill="#FAF0EC" stroke="${PALETTE.rust}" />
          ${renderSvgTextLines(wrapLines('CRITICAL BOUNDARY: Prohibitions on backbiting (49:12) NEVER silence victims seeking protection, clinical help, or legal justice.', 70, 4), 94, 454, 19, { fontSize: 12.5, fill: PALETTE.rust })}
        `;
      } else if (id === 'PSY-036') {
        leftTitle = 'RIDICULE &amp; STIGMA HARM VS. PSYCHOLOGICAL SAFETY (49:11)';
        leftSvg = `
          ${titledCard({ x: 74, y: 202, w: 270, h: 185, badge: 'Stigma Harm', title: 'Mockery &amp; Derogatory Labels', body: 'Humiliates peers, drives social withdrawal, and silences help-seeking.', accent: PALETTE.rust })}
          ${titledCard({ x: 368, y: 202, w: 270, h: 185, badge: 'Inclusive Safety', title: 'Dignified Critique &amp; Respect', body: 'Evaluates ideas without demeaning persons or inventing demeaning nicknames.', accent: PALETTE.emerald })}
          <rect x="74" y="408" width="564" height="145" rx="6" fill="#EDF5F9" stroke="${PALETTE.blue}" />
          ${renderSvgTextLines(wrapLines(lim, 70, 4), 94, 452, 19, { fontSize: 12.5, fill: PALETTE.ink })}
        `;
      } else if (id === 'PSY-037') {
        leftTitle = 'REPUTATION PROTECTION VS. CONFIDENTIAL SAFEGUARDING';
        leftSvg = `
          ${titledCard({ x: 74, y: 204, w: 168, h: 245, title: '1. Concern Arises', body: 'Unchecked rumour spreads shame; real harm needs action.', accent: PALETTE.ochre })}
          ${flowArrow(246, 325, 274, 325, PALETTE.blue, 2.8)}
          ${titledCard({ x: 278, y: 204, w: 176, h: 245, title: '2. Duty-of-Care Check', body: 'Is there safety risk, fraud, or ongoing exploitation?', accent: PALETTE.blue })}
          ${flowArrow(458, 325, 486, 325, PALETTE.emerald, 2.8)}
          ${titledCard({ x: 490, y: 204, w: 148, h: 245, title: '3. Report or Shield', body: 'Escalate harm to authorities; halt idle gossip.', accent: PALETTE.emerald })}
          <text x="356" y="516" font-family="Noto Sans, sans-serif" font-size="12" font-weight="600" fill="${PALETTE.rust}" text-anchor="middle">Discretion protects private faults—never ongoing abuse or public danger.</text>
        `;
      } else if (id === 'PSY-039') {
        leftTitle = 'CALIBRATED TRUST BETWEEN CYNICISM &amp; GULLIBILITY';
        leftSvg = `
          ${chartAxes({ x: 136, y: 205, w: 478, h: 290, xLabel: 'Vigilance &amp; Trust Calibration', yLabel: 'Relational &amp; Safety Resilience', xTicks: ['Blind Gullibility', 'Evidence-Based Trust', 'Paranoia'], yTicks: ['Vulnerable', 'Balanced', 'Isolated'], yLabelOffset: 72 })}
          <path d="M 148 445 Q 368 215 595 445" fill="none" stroke="${PALETTE.emerald}" stroke-width="3.5" />
          ${calloutTag(368, 240, 'Prudent Evidence + Good-Faith Presumption', PALETTE.emerald, '#FFFFFF', PALETTE.emerald)}
        `;
      } else if (id === 'PSY-046') {
        leftTitle = 'PROMISE FULFILMENT &amp; LOW-FRICTION COORDINATION';
        leftSvg = `
          ${titledCard({ x: 74, y: 204, w: 168, h: 245, title: '1. Clear Promise', body: 'Mutual terms stated openly without hidden loopholes.', accent: PALETTE.blue })}
          ${flowArrow(246, 325, 274, 325, PALETTE.emerald, 2.8)}
          ${titledCard({ x: 278, y: 204, w: 176, h: 245, title: '2. Timely Follow-Through', body: 'Consistent delivery confirms reliability across repeated exchanges.', accent: PALETTE.emerald })}
          ${flowArrow(458, 325, 486, 325, PALETTE.gold, 2.8)}
          ${titledCard({ x: 490, y: 204, w: 148, h: 245, title: '3. Durable Trust', body: 'Reduces monitoring overhead &amp; social friction.', accent: PALETTE.gold })}
          <text x="356" y="516" font-family="Noto Sans, sans-serif" font-size="12" font-weight="600" fill="${PALETTE.inkMuted}" text-anchor="middle">Reliable commitments work best alongside fair terms and accessible remedies.</text>
        `;
      } else if (id === 'PSY-045') {
        leftTitle = 'HONEST EXCHANGE VS. INSTITUTIONAL TRUST EROSION';
        leftSvg = `
          ${titledCard({ x: 74, y: 202, w: 270, h: 185, badge: 'High-Trust Exchange', title: 'Transparent Terms &amp; Fulfilment', body: 'Predictable honesty lowers transaction costs and enables multi-party cooperation.', accent: PALETTE.emerald })}
          ${titledCard({ x: 368, y: 202, w: 270, h: 185, badge: 'Trust Erosion', title: 'Deception &amp; Broken Pledges', body: 'Fraud forces defensive suspicion, costly audits, and civic disengagement.', accent: PALETTE.rust })}
          <rect x="74" y="408" width="564" height="145" rx="6" fill="#FAF6EC" stroke="${PALETTE.gold}" />
          ${renderSvgTextLines(wrapLines(lim, 70, 4), 94, 452, 19, { fontSize: 12.5, fill: PALETTE.ink })}
        `;
      } else {
        leftTitle = 'SUSPICION BIAS &amp; SOCIAL TRUST EROSION';
        leftSvg = `
          ${cycleNodeRing(356, 366, 138, [
            { label: 'Hostile Attribution Bias', sub: 'Assumes Worst Motive', color: PALETTE.rust },
            { label: 'Defensive Withdrawal', sub: 'Broken Dialogue', color: PALETTE.blue },
            { label: 'Mutual Alienation', sub: 'Trust Collapse', color: PALETTE.ochre },
            { label: 'Verification Pause', sub: 'Evidence Over Guesswork', color: PALETTE.gold },
          ])}
          <text x="356" y="364" font-family="Liberation Serif, serif" font-size="11.5" font-weight="700" fill="${PALETTE.ink}" text-anchor="middle">BIAS</text>
          <text x="356" y="380" font-family="Liberation Serif, serif" font-size="11.5" font-weight="700" fill="${PALETTE.ink}" text-anchor="middle">CHECK</text>
        `;
      }
    } else if (kind === 'human-differences-perception') {
      const isStereotype = id === 'PSY-049';
      leftTitle = isStereotype ? 'STEREOTYPE SHORTCUTS VS. INDIVIDUATED CHARACTER CHECK' : 'HUMAN DIVERSITY, MUTUAL RECOGNITION &amp; DIGNITY';
      leftSvg = isStereotype
        ? `
          ${titledCard({ x: 74, y: 196, w: 564, h: 110, badge: 'Cognitive Shortcut', title: 'Outgroup Stereotype Compression', body: 'Reduces individuals to rigid group labels and distorts fair evaluation.', accent: PALETTE.ochre })}
          ${titledCard({ x: 74, y: 320, w: 564, h: 110, badge: 'Reflective Correction', title: 'Individuated Character Assessment', body: 'Evaluates persons by actual conduct and accountability rather than assumption.', accent: PALETTE.emerald })}
          ${titledCard({ x: 74, y: 444, w: 564, h: 110, badge: 'Empirical Caution', title: 'Prejudice Research Scope', body: lim, accent: PALETTE.blue })}
        `
        : `
          ${titledCard({ x: 74, y: 202, w: 270, h: 185, badge: 'Plural Heritage (49:13)', title: 'Cultural &amp; Linguistic Diversity', body: 'Human communities naturally vary in language, heritage, and social customs.', accent: PALETTE.blue })}
          ${titledCard({ x: 368, y: 202, w: 270, h: 185, badge: 'Mutual Recognition', title: 'Ta‘aruf: Equitable Acquaintance', body: 'Curiosity and shared dignity counteract outgroup fear without erasing identity.', accent: PALETTE.emerald })}
          <rect x="74" y="408" width="564" height="145" rx="6" fill="#FAF6EC" stroke="${PALETTE.gold}" />
          ${renderSvgTextLines(wrapLines('SCOPE BOUNDARY: Cross-cultural psychology measures bias empirically; spiritual taqwa lies outside empirical measurement.', 70, 4), 94, 452, 19, { fontSize: 12.5, fill: PALETTE.ink })}
        `;
    } else if (id === 'PSY-006' || kind === 'forgiveness-boundaries') {
      leftTitle = 'VOLUNTARY FORGIVENESS VS. PROTECTIVE BOUNDARIES';
      leftSvg = `
        ${titledCard({ x: 74, y: 196, w: 270, h: 175, badge: 'Internal Relief', title: 'Voluntary Forgiveness', body: 'Releasing spite can ease rumination when genuine safety and accountability exist.', accent: PALETTE.emerald })}
        ${titledCard({ x: 368, y: 196, w: 270, h: 175, badge: 'Non-Negotiable Rule', title: 'Zero Forced Reconciliation', body: 'Forgiveness never requires forgetting harm or staying in ongoing abuse.', accent: PALETTE.rust })}
        <rect x="74" y="392" width="564" height="165" rx="6" fill="#FAF6EC" stroke="${PALETTE.gold}" />
        ${renderSvgTextLines(wrapLines(lim, 70, 4), 94, 442, 19, { fontSize: 12.5, fill: PALETTE.ink })}
      `;
    } else if (id === 'PSY-034') {
      leftTitle = 'SAFE MEDIATION GATE &amp; POWER-IMBALANCE CHECK';
      leftSvg = `
        ${titledCard({ x: 74, y: 204, w: 168, h: 245, title: '1. Safety Screening', body: 'Halt mediation immediately if violence, coercion, or fear exists.', accent: PALETTE.rust })}
        ${flowArrow(246, 325, 274, 325, PALETTE.emerald, 2.8)}
        ${titledCard({ x: 278, y: 204, w: 176, h: 245, title: '2. Voluntary Voice', body: 'Both parties speak freely with neutral support.', accent: PALETTE.blue })}
        ${flowArrow(458, 325, 486, 325, PALETTE.emerald, 2.8)}
        ${titledCard({ x: 490, y: 204, w: 148, h: 245, title: '3. Fair Resolution', body: 'Accountable repair restores practical peace.', accent: PALETTE.emerald })}
        <text x="356" y="516" font-family="Noto Sans, sans-serif" font-size="12" font-weight="600" fill="${PALETTE.rust}" text-anchor="middle">Legal protection—never forced mediation—applies whenever intimidation or abuse occurs.</text>
      `;
    } else if (id === 'PSY-050') {
      leftTitle = 'COLLECTIVE HABITS, INSTITUTIONAL FAIRNESS &amp; STEWARDSHIP';
      leftSvg = `
        ${titledCard({ x: 74, y: 204, w: 168, h: 245, title: '1. Everyday Habits', body: 'Honesty, moderation &amp; restraint practiced daily.', accent: PALETTE.blue })}
        ${flowArrow(246, 325, 274, 325, PALETTE.emerald, 2.8)}
        ${titledCard({ x: 278, y: 204, w: 176, h: 245, title: '2. Mutual Accountability', body: 'Fair norms, verification &amp; safe correction.', accent: PALETTE.emerald })}
        ${flowArrow(458, 325, 486, 325, PALETTE.gold, 2.8)}
        ${titledCard({ x: 490, y: 204, w: 148, h: 245, title: '3. Social Resilience', body: 'Protects shared welfare across generations.', accent: PALETTE.gold })}
        <text x="356" y="516" font-family="Noto Sans, sans-serif" font-size="11.5" font-weight="600" fill="${PALETTE.inkMuted}" text-anchor="middle">Chapter 09 synthesis: personal habits interact with law, clinical care &amp; civic life.</text>
      `;
    } else if (id === 'PSY-031') {
      leftTitle = 'PEER NORM TRANSMISSION &amp; SOCIAL ENVIRONMENT';
      leftSvg = `
        ${titledCard({ x: 74, y: 202, w: 270, h: 185, badge: 'Constructive Norms', title: 'Supportive Companionship', body: 'Prosocial peers reinforce integrity, patience &amp; healthy daily routines.', accent: PALETTE.emerald })}
        ${titledCard({ x: 368, y: 202, w: 270, h: 185, badge: 'Conformity Risk', title: 'Harmful Peer Pressure', body: 'Unchecked group approval normalizes recklessness, gossip &amp; denial.', accent: PALETTE.rust })}
        <rect x="74" y="408" width="564" height="145" rx="6" fill="#EDF5F9" stroke="${PALETTE.blue}" />
        ${renderSvgTextLines(wrapLines(lim, 70, 4), 94, 452, 19, { fontSize: 12.5, fill: PALETTE.ink })}
      `;
    } else if (id === 'PSY-033') {
      leftTitle = 'BENEFICIAL SOLIDARITY VS. HARMFUL COLLUSION (5:2)';
      leftSvg = `
        ${titledCard({ x: 74, y: 202, w: 270, h: 185, badge: 'Ethical Cooperation', title: 'Justice, Relief &amp; Common Good', body: 'Cooperating around fairness, protection of the vulnerable &amp; verified truth.', accent: PALETTE.emerald })}
        ${titledCard({ x: 368, y: 202, w: 270, h: 185, badge: 'Factional Harm', title: 'Blind Loyalty &amp; Collusion', body: 'Shielding wrongdoing or harming outsiders under group solidarity.', accent: PALETTE.rust })}
        <rect x="74" y="408" width="564" height="145" rx="6" fill="#FAF6EC" stroke="${PALETTE.gold}" />
        ${renderSvgTextLines(wrapLines(lim, 70, 4), 94, 452, 19, { fontSize: 12.5, fill: PALETTE.ink })}
      `;
    } else if (id === 'PSY-035') {
      leftTitle = 'COMMUNICATION ESCALATION VS. MEASURED SPEECH';
      leftSvg = `
        <rect x="74" y="206" width="564" height="196" rx="6" fill="#FAF8F3" stroke="${PALETTE.border}" />
        <text x="94" y="232" font-family="Noto Sans, sans-serif" font-size="12" font-weight="700" fill="${PALETTE.ink}">Interpersonal Conflict Communication Modes</text>
        <text x="94" y="268" font-family="Noto Sans, sans-serif" font-size="12" font-weight="600" fill="${PALETTE.rust}">Hostile Escalation</text>
        <rect x="255" y="253" width="110" height="22" rx="4" fill="${PALETTE.rust}" fill-opacity="0.85" />
        <text x="375" y="268" font-family="Noto Sans, sans-serif" font-size="11.5" fill="${PALETTE.inkMuted}">Contempt &amp; defensive spirals</text>
        <text x="94" y="316" font-family="Noto Sans, sans-serif" font-size="12" font-weight="600" fill="${PALETTE.ochre}">Silent Suppression</text>
        <rect x="255" y="301" width="165" height="22" rx="4" fill="${PALETTE.ochre}" fill-opacity="0.85" />
        <text x="430" y="316" font-family="Noto Sans, sans-serif" font-size="11.5" fill="${PALETTE.inkMuted}">Unresolved strain &amp; distance</text>
        <text x="94" y="364" font-family="Noto Sans, sans-serif" font-size="12" font-weight="700" fill="${PALETTE.emerald}">Respectful Clarity</text>
        <rect x="255" y="349" width="340" height="22" rx="4" fill="${PALETTE.emerald}" />
        <text x="265" y="364" font-family="Noto Sans, sans-serif" font-size="11" font-weight="700" fill="#FFFFFF">Gentle Tone + Clear Truthful Boundaries</text>
        <rect x="74" y="420" width="564" height="132" rx="6" fill="#FAF6EC" stroke="${PALETTE.gold}" />
        ${renderSvgTextLines(wrapLines(lim, 70, 4), 94, 464, 19, { fontSize: 12.5, fill: PALETTE.ink })}
      `;
    } else if (id === 'PSY-040') {
      leftTitle = 'EMPATHY TO SUSTAINABLE AID &amp; BURNOUT GUARDRAIL';
      leftSvg = `
        ${titledCard({ x: 74, y: 204, w: 168, h: 245, title: '1. Perspective-Taking', body: 'Understands another’s distress without condescension.', accent: PALETTE.blue })}
        ${flowArrow(246, 325, 274, 325, PALETTE.emerald, 2.8)}
        ${titledCard({ x: 278, y: 204, w: 176, h: 245, title: '2. Dignified Help', body: 'Offers practical support respecting recipient agency.', accent: PALETTE.emerald })}
        ${flowArrow(458, 325, 486, 325, PALETTE.ochre, 2.8)}
        ${titledCard({ x: 490, y: 204, w: 148, h: 245, title: '3. Capacity Care', body: 'Prevents burnout &amp; compassion fatigue.', accent: PALETTE.ochre })}
        <text x="356" y="516" font-family="Noto Sans, sans-serif" font-size="12" font-weight="600" fill="${PALETTE.inkMuted}" text-anchor="middle">Sustainable care combines genuine compassion with realistic personal and team boundaries.</text>
      `;
    } else if (id === 'PSY-041') {
      leftTitle = 'OBSERVABLE PROSOCIAL GIVING VS. UNMEASURABLE SINCERITY';
      leftSvg = `
        ${titledCard({ x: 74, y: 202, w: 270, h: 185, badge: 'Empirical Domain', title: 'Measurable Prosocial Acts', body: 'Psychology observes giving frequency, reciprocity &amp; modest wellbeing shifts.', accent: PALETTE.blue })}
        ${titledCard({ x: 368, y: 202, w: 270, h: 185, badge: 'Spiritual Domain', title: 'Inner Sincerity (Ikhlas)', body: 'Pure devotion and spiritual intention belong to conscience &amp; theology—not lab scales.', accent: PALETTE.gold })}
        <rect x="74" y="408" width="564" height="145" rx="6" fill="#FAF6EC" stroke="${PALETTE.gold}" />
        ${renderSvgTextLines(wrapLines(lim, 70, 4), 94, 452, 19, { fontSize: 12.5, fill: PALETTE.ink })}
      `;
    } else if (id === 'PSY-044') {
      leftTitle = 'PRUDENT SAVING VS. HOARDING &amp; CIVIC RECIPROCITY';
      leftSvg = `
        ${titledCard({ x: 74, y: 196, w: 564, h: 110, badge: 'Necessary Reserve', title: 'Responsible Saving Protects Household Stability', body: 'Prudent emergency reserves reduce acute financial anxiety and support dependents.', accent: PALETTE.blue })}
        ${titledCard({ x: 74, y: 320, w: 564, h: 110, badge: 'Ethical Contrast', title: 'Rigid Hoarding Erodes Community Solidarity', body: 'Withholding aid when able weakens mutual trust and shared safety nets (9:34, 107:7).', accent: PALETTE.rust })}
        ${titledCard({ x: 74, y: 444, w: 564, h: 110, badge: 'Economic Context', title: 'Structural Poverty vs. Personal Habits', body: lim, accent: PALETTE.gold })}
      `;
    } else {
      // PSY-032: Social support buffering stress
      leftTitle = 'SOCIAL SUPPORT BUFFERS &amp; STRESS RESILIENCE';
      leftSvg = `
        ${titledCard({ x: 74, y: 196, w: 564, h: 110, badge: 'Stress Buffer', title: 'Healthy Companionship &amp; Emotional Support', body: 'Supportive relationships lower isolation stress and encourage steadiness during strain.', accent: PALETTE.emerald })}
        ${titledCard({ x: 74, y: 320, w: 564, h: 110, badge: 'Relational Quality', title: 'Safe, Non-Coercive Ties Matter Most', body: 'Positive outcomes depend on genuine warmth and safety rather than mere social contact.', accent: PALETTE.blue })}
        ${titledCard({ x: 74, y: 444, w: 564, h: 110, badge: 'Methodological Limit', title: 'Observational Diversity Across Studies', body: lim, accent: PALETTE.gold })}
      `;
    }

    bodySvg = `
      ${cardBox({ x: 46, y: 168, w: 620, h: 430, fill: PALETTE.paperCard, stroke: PALETTE.gold, strokeWidth: 1.4, accentTop: PALETTE.gold })}
      <text x="356" y="188" font-family="Noto Sans, sans-serif" font-size="13.5" font-weight="700" fill="#FFFFFF" text-anchor="middle">${leftTitle}</text>
      ${leftSvg}
      ${modelBadge}
    `;
  }

  // Right-hand structured explanatory column common to all 50 Ch 09 plates
  bodySvg += `
    ${cardBox({ x: 688, y: 142, w: 466, h: 456, fill: PALETTE.paperCard, stroke: PALETTE.gold, strokeWidth: 1.4, accentTop: PALETTE.gold })}
    <text x="921" y="162" font-family="Noto Sans, sans-serif" font-size="13.5" font-weight="700" fill="#FFFFFF" text-anchor="middle">RESEARCH CONTEXT &amp; INTERPRETIVE LIMITS</text>
    ${titledCard({ x: 710, y: 192, w: 422, h: 120, title: entry.scientific_topic, body: finding, accent: PALETTE.emerald })}
    ${titledCard({ x: 710, y: 326, w: 422, h: 120, title: 'Behavioural Interpretation', body: enrichment?.whatItMeans ?? 'Qualitative behavioural principles emphasize context, safety, and human variability.', accent: PALETTE.blue })}
    ${titledCard({ x: 710, y: 460, w: 422, h: 120, title: 'Scholarly &amp; Clinical Boundary', body: lim, accent: PALETTE.rust })}
    ${keyTakeawayStrip([
      { label: 'Behavioural Principle', detail: enrichment?.takeaway ?? finding, color: PALETTE.emerald },
      { label: 'Model &amp; Care Notice', detail: `Evidence Grade ${entry.evidence_grade} · Conceptual behavioural diagram; consult licensed care for distress.`, color: PALETTE.gold },
    ], 624)}
  `;

  return buildPlateShell({
    title,
    subtitle: wrapLines(subtitle, 108, 1)[0],
    figureCode: id,
    discipline: 'Chapter 09 · Human Psychology &amp; Behaviour',
    bodySvg,
    footerNote: `Conceptual Behavioural Model ${id} · Science of Creation Encyclopedia · APA / NIMH Reference Context`,
    accentColor: PALETTE.plum,
  });
}
