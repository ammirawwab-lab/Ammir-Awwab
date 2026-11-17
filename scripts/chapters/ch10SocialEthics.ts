import {
  balanceScaleSvg,
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

export function buildSocialEthicsPlateSvg(entry: RawDatasetEntry, enrichment?: TopicEnrichment): string {
  const id = entry.id;
  const title = enrichment?.diagramTitle ?? entry.title;
  const subtitle = enrichment?.diagramCaption ?? entry.scientific_topic;
  const finding = entry.scientific_evidence.finding;
  const lim = entry.limitations || 'Conceptual social &amp; ethical framework; institutional effectiveness depends on law, accountability, and context.';
  const kind = (enrichment?.diagramKind ?? 'justice-fairness-framework') as string;
  let bodySvg = '';

  const modelBadge = `
    <rect x="46" y="142" width="340" height="22" rx="4" fill="#183A32" />
    <text x="60" y="157" font-family="Noto Sans, sans-serif" font-size="10.5" font-weight="700" letter-spacing="0.9" fill="#DFC99B">CONCEPTUAL SOCIAL &amp; ETHICAL MODEL</text>
  `;

  let leftTitle = 'SOCIAL GOVERNANCE, ETHICS &amp; INSTITUTIONAL TRUST';
  let leftSvg = '';

  // 1. Justice, Accountability, Bribery & Leadership (SOC-001..005, 038, 039, 043..045, 048)
  if (
    kind === 'justice-fairness-framework' ||
    kind === 'impartial-judgment-bias' ||
    kind === 'institutional-trust-accountability' ||
    kind === 'agreements-responsibility-cycle' ||
    kind === 'consultation-responsible-leadership'
  ) {
    if (kind === 'justice-fairness-framework') {
      const isProtect = id === 'SOC-038';
      leftTitle = isProtect ? 'SANCTITY OF HUMAN LIFE &amp; PUBLIC SAFETY SYSTEMS' : 'PROCEDURAL JUSTICE, FAIRNESS &amp; CIVIC COOPERATION';
      leftSvg = isProtect
        ? `
          ${titledCard({ x: 74, y: 196, w: 564, h: 110, badge: 'Moral Reverence (5:32)', title: 'Sanctity of Innocent Human Life', body: 'Frames unlawful killing as profound harm to humanity and saving life as vital moral stewardship.', accent: PALETTE.gold })}
          ${titledCard({ x: 74, y: 320, w: 564, h: 110, badge: 'Institutional Safety', title: 'Rule of Law, Emergency Care &amp; Prevention', body: 'Public safety requires medical emergency response, due process, and violence-prevention systems.', accent: PALETTE.emerald })}
          ${titledCard({ x: 74, y: 444, w: 564, h: 110, badge: 'Contextual Caution', title: 'Ethical Mandate vs. Criminal Policy', body: lim, accent: PALETTE.blue })}
        `
        : `
          ${cycleNodeRing(356, 366, 138, [
            { label: 'Impartial Rules', sub: 'Equal Application (4:135)', color: PALETTE.gold },
            { label: 'Transparent Process', sub: 'Fair Hearing &amp; Evidence', color: PALETTE.blue },
            { label: 'Institutional Trust', sub: 'OECD Legitimacy Link', color: PALETTE.emerald },
            { label: 'Civic Cooperation', sub: 'Voluntary Compliance', color: PALETTE.cyan },
          ])}
          <text x="356" y="362" font-family="Liberation Serif, serif" font-size="11.5" font-weight="700" fill="${PALETTE.gold}" text-anchor="middle">PROCEDURAL</text>
          <text x="356" y="378" font-family="Liberation Serif, serif" font-size="11.5" font-weight="700" fill="${PALETTE.gold}" text-anchor="middle">JUSTICE</text>
        `;
    } else if (kind === 'impartial-judgment-bias') {
      if (id === 'SOC-002') {
        leftTitle = 'KINSHIP LOYALTY BIAS VS. INDEPENDENT OVERSIGHT';
        leftSvg = `
          ${balanceScaleSvg(356, 222, 0, 'Self / Kin Bias', 'Recusal + Evidence', 'Impartial Witness Standard (4:135)', PALETTE.emerald)}
          <rect x="74" y="388" width="564" height="160" rx="6" fill="#FAF6EC" stroke="${PALETTE.gold}" />
          ${renderSvgTextLines(wrapLines(lim, 70, 5), 94, 424, 19, { fontSize: 12.5, fill: PALETTE.ink })}
        `;
      } else if (id === 'SOC-003') {
        leftTitle = 'RESISTING ENMITY &amp; OUTGROUP BIAS (5:8)';
        leftSvg = `
          ${titledCard({ x: 74, y: 202, w: 270, h: 185, badge: 'Hostility Distortion', title: 'Retaliatory Double Standards', body: 'Exaggerates rival faults while excusing allies under shared group identity.', accent: PALETTE.rust })}
          ${titledCard({ x: 368, y: 202, w: 270, h: 185, badge: 'Uniform Criterion', title: 'Equal Justice Across Boundaries', body: 'Applies consistent evidentiary and human-rights standards to critics and allies alike.', accent: PALETTE.emerald })}
          <rect x="74" y="408" width="564" height="145" rx="6" fill="#EDF5F9" stroke="${PALETTE.blue}" />
          ${renderSvgTextLines(wrapLines(lim, 70, 4), 94, 452, 19, { fontSize: 12.5, fill: PALETTE.ink })}
        `;
      } else {
        // SOC-039: Proportional restraint & limits on aggression
        leftTitle = 'PROPORTIONAL RESTRAINT &amp; LIMITS ON AGGRESSION';
        leftSvg = `
          ${titledCard({ x: 74, y: 204, w: 168, h: 245, title: '1. Grievance or Harm', body: 'Acute injury tempts boundless retaliation or collective blame.', accent: PALETTE.rust })}
          ${flowArrow(246, 325, 274, 325, PALETTE.blue, 2.8)}
          ${titledCard({ x: 278, y: 204, w: 176, h: 245, title: '2. Proportional Limit', body: 'Rejects transgression beyond lawful bounds (2:190, 5:8).', accent: PALETTE.blue })}
          ${flowArrow(458, 325, 486, 325, PALETTE.emerald, 2.8)}
          ${titledCard({ x: 490, y: 204, w: 148, h: 245, title: '3. Civilian &amp; Civic Peace', body: 'Formal courts &amp; restraint halt cycles of feud.', accent: PALETTE.emerald })}
          <text x="356" y="516" font-family="Noto Sans, sans-serif" font-size="12" font-weight="600" fill="${PALETTE.inkMuted}" text-anchor="middle">Rule-of-law institutions channel grievances away from private vengeance.</text>
        `;
      }
    } else if (kind === 'institutional-trust-accountability') {
      if (id === 'SOC-048') {
        leftTitle = 'BRIBERY CAPTURE VS. TRANSPARENT PUBLIC INTEGRITY';
        leftSvg = `
          <rect x="74" y="206" width="564" height="196" rx="6" fill="#FAF8F3" stroke="${PALETTE.border}" />
          <text x="94" y="232" font-family="Noto Sans, sans-serif" font-size="12" font-weight="700" fill="${PALETTE.ink}">Institutional Integrity Under Governance Safeguards</text>
          <text x="94" y="268" font-family="Noto Sans, sans-serif" font-size="12" font-weight="600" fill="${PALETTE.rust}">Bribes &amp; Kickbacks</text>
          <rect x="255" y="253" width="115" height="22" rx="4" fill="${PALETTE.rust}" fill-opacity="0.85" />
          <text x="380" y="268" font-family="Noto Sans, sans-serif" font-size="11.5" fill="${PALETTE.inkMuted}">Distorts justice &amp; public contracts</text>
          <text x="94" y="316" font-family="Noto Sans, sans-serif" font-size="12" font-weight="600" fill="${PALETTE.ochre}">Opaque Discretion</text>
          <rect x="255" y="301" width="185" height="22" rx="4" fill="${PALETTE.ochre}" fill-opacity="0.85" />
          <text x="450" y="316" font-family="Noto Sans, sans-serif" font-size="11.5" fill="${PALETTE.inkMuted}">High conflict-of-interest vulnerability</text>
          <text x="94" y="364" font-family="Noto Sans, sans-serif" font-size="12" font-weight="700" fill="${PALETTE.emerald}">Audits + Protection</text>
          <rect x="255" y="349" width="340" height="22" rx="4" fill="${PALETTE.emerald}" />
          <text x="265" y="364" font-family="Noto Sans, sans-serif" font-size="11" font-weight="700" fill="#FFFFFF">Open Bidding + Asset Disclosure + Safe Reporting</text>
          <rect x="74" y="420" width="564" height="132" rx="6" fill="#FAF6EC" stroke="${PALETTE.gold}" />
          ${renderSvgTextLines(wrapLines(finding, 70, 4), 94, 464, 19, { fontSize: 12.5, fill: PALETTE.ink })}
        `;
      } else {
        leftTitle = 'ENTRUSTED DUTIES (AMANAH) &amp; INSTITUTIONAL CHECKS';
        leftSvg = `
          ${titledCard({ x: 74, y: 202, w: 270, h: 175, badge: 'Weak Oversight', title: 'Opaque Discretion', body: 'Unchecked authority breeds favouritism and erodes civic confidence.', accent: PALETTE.rust })}
          ${titledCard({ x: 368, y: 202, w: 270, h: 175, badge: 'Integrity Safeguard', title: 'Merit, Audits &amp; Accountability', body: 'Clear fiduciary duties align public office with public benefit (4:58).', accent: PALETTE.emerald })}
          <rect x="74" y="398" width="564" height="152" rx="6" fill="#EDF5F9" stroke="${PALETTE.blue}" />
          ${renderSvgTextLines(wrapLines(finding, 70, 4), 94, 444, 19, { fontSize: 12.5, fill: PALETTE.ink })}
        `;
      }
    } else if (kind === 'consultation-responsible-leadership') {
      if (id === 'SOC-045') {
        leftTitle = 'PARTICIPATORY CONSULTATION (SHURA) &amp; BLIND-SPOT CHECKS';
        leftSvg = `
          ${titledCard({ x: 74, y: 204, w: 170, h: 245, title: '1. Public Input', body: 'Invite diverse voices before major decisions.', accent: PALETTE.blue })}
          ${flowArrow(248, 325, 276, 325, PALETTE.emerald, 2.8)}
          ${titledCard({ x: 280, y: 204, w: 170, h: 245, title: '2. Open Critique', body: 'Test assumptions safely without fear of reprisal.', accent: PALETTE.emerald })}
          ${flowArrow(454, 325, 482, 325, PALETTE.emerald, 2.8)}
          ${titledCard({ x: 486, y: 204, w: 150, h: 245, title: '3. Shared Ownership', body: 'Transparent reasons bolster civic legitimacy.', accent: PALETTE.gold })}
          <text x="356" y="516" font-family="Noto Sans, sans-serif" font-size="12" font-weight="600" fill="${PALETTE.inkMuted}" text-anchor="middle">Institutional checks &amp; balances are essential alongside moral exhortation.</text>
        `;
      } else {
        // SOC-044: Fiduciary leadership vs self-serving authority
        leftTitle = 'FIDUCIARY PUBLIC TRUST VS. SELF-SERVING DISCRETION';
        leftSvg = `
          ${titledCard({ x: 74, y: 202, w: 270, h: 185, badge: 'Fiduciary Mandate', title: 'Amanah &amp; Public Accountability', body: 'Treats public office as a temporary trust bound by evidence, audits &amp; citizens’ rights.', accent: PALETTE.emerald })}
          ${titledCard({ x: 368, y: 202, w: 270, h: 185, badge: 'Governance Risk', title: 'Caprice &amp; Ego-Driven Rule', body: 'Decisions guided by favouritism or unchecked ambition erode public safety.', accent: PALETTE.rust })}
          <rect x="74" y="408" width="564" height="145" rx="6" fill="#FAF6EC" stroke="${PALETTE.gold}" />
          ${renderSvgTextLines(wrapLines(lim, 70, 4), 94, 452, 19, { fontSize: 12.5, fill: PALETTE.ink })}
        `;
      }
    } else if (id === 'SOC-043') {
      leftTitle = 'DEPENDABLE COMMITMENTS &amp; SUSTAINED COORDINATION';
      leftSvg = `
        ${titledCard({ x: 74, y: 204, w: 168, h: 245, title: '1. Clear Terms', body: 'Mutual duties &amp; limits agreed voluntarily.', accent: PALETTE.blue })}
        ${flowArrow(246, 325, 274, 325, PALETTE.emerald, 2.8)}
        ${titledCard({ x: 278, y: 204, w: 176, h: 245, title: '2. Predictable Delivery', body: 'Consistent follow-through builds counterpart confidence.', accent: PALETTE.emerald })}
        ${flowArrow(458, 325, 486, 325, PALETTE.gold, 2.8)}
        ${titledCard({ x: 490, y: 204, w: 148, h: 245, title: '3. Civic Scale', body: 'Lowers transaction friction across institutions.', accent: PALETTE.gold })}
        <text x="356" y="516" font-family="Noto Sans, sans-serif" font-size="12" font-weight="600" fill="${PALETTE.inkMuted}" text-anchor="middle">Dependable agreements support cooperation only when contracts remain fair and uncoerced.</text>
      `;
    } else {
      // SOC-005: Covenant trust ring
      leftTitle = 'CLEAR COMMITMENTS, FULFILMENT &amp; COOPERATIVE TRUST';
      leftSvg = `
        ${cycleNodeRing(356, 366, 138, [
          { label: 'Explicit Terms', sub: 'Clear Expectations (5:1)', color: PALETTE.blue },
          { label: 'Honest Execution', sub: 'Reliable Delivery', color: PALETTE.emerald },
          { label: 'Mutual Confidence', sub: 'Lower Transaction Risk', color: PALETTE.gold },
          { label: 'Long-Term Partnership', sub: 'Sustained Coordination', color: PALETTE.cyan },
        ])}
        <text x="356" y="362" font-family="Liberation Serif, serif" font-size="11.5" font-weight="700" fill="${PALETTE.emerald}" text-anchor="middle">COVENANT</text>
        <text x="356" y="378" font-family="Liberation Serif, serif" font-size="11.5" font-weight="700" fill="${PALETTE.emerald}" text-anchor="middle">TRUST</text>
      `;
    }

  // 2. Trade, Measurement, Debt Records, Wealth Stewardship & Commons (SOC-006..015, 040..042, 050)
  } else if (
    kind === 'honest-measurement-exchange' ||
    kind === 'fraud-consumer-protection' ||
    kind === 'mutual-consent-transactions' ||
    kind === 'written-debt-record' ||
    kind === 'documentation-witness-framework' ||
    kind === 'charity-social-support' ||
    kind === 'responsible-resource-use' ||
    kind === 'shared-resource-stewardship'
  ) {
    if (kind === 'written-debt-record') {
      leftTitle = 'WRITTEN DEBT LEDGER &amp; AMBIGUITY REDUCTION (2:282)';
      leftSvg = `
        ${titledCard({ x: 74, y: 204, w: 170, h: 245, title: '1. Written Contract', body: 'Principal sum, repayment date &amp; terms recorded clearly.', accent: PALETTE.blue })}
        ${flowArrow(248, 325, 276, 325, PALETTE.emerald, 2.8)}
        ${titledCard({ x: 280, y: 204, w: 170, h: 245, title: '2. Memory Protection', body: 'Protects borrower &amp; lender from faded memory.', accent: PALETTE.gold })}
        ${flowArrow(454, 325, 482, 325, PALETTE.emerald, 2.8)}
        ${titledCard({ x: 486, y: 204, w: 150, h: 245, title: '3. Dispute Prevention', body: 'Lowers litigation &amp; preserves trust.', accent: PALETTE.emerald })}
        <text x="356" y="516" font-family="Noto Sans, sans-serif" font-size="12" font-weight="600" fill="${PALETTE.inkMuted}" text-anchor="middle">Modern contract law expands registration &amp; digital recordkeeping across jurisdictions.</text>
      `;
    } else if (kind === 'documentation-witness-framework') {
      leftTitle = 'NEUTRAL WITNESSES &amp; DOCUMENT CORROBORATION';
      leftSvg = `
        ${titledCard({ x: 74, y: 202, w: 270, h: 185, badge: 'Independent Attestation', title: 'Neutral Upright Witnesses', body: 'Corroborates credit and family transitions (2:282, 65:2) to deter denial or distortion.', accent: PALETTE.gold })}
        ${titledCard({ x: 368, y: 202, w: 270, h: 185, badge: 'Procedural Security', title: 'Verifiable Record Trail', body: 'Protects weaker parties when memories fade or disputes reach civil courts.', accent: PALETTE.emerald })}
        <rect x="74" y="408" width="564" height="145" rx="6" fill="#EDF5F9" stroke="${PALETTE.blue}" />
        ${renderSvgTextLines(wrapLines(lim, 70, 4), 94, 452, 19, { fontSize: 12.5, fill: PALETTE.ink })}
      `;
    } else if (kind === 'honest-measurement-exchange') {
      leftTitle = 'CALIBRATED WEIGHTS, METROLOGY &amp; MARKET CONFIDENCE (83:1–3)';
      leftSvg = `
        <rect x="74" y="206" width="564" height="196" rx="6" fill="#FAF8F3" stroke="${PALETTE.border}" />
        <text x="94" y="232" font-family="Noto Sans, sans-serif" font-size="12" font-weight="700" fill="${PALETTE.ink}">Standardized Metrology &amp; Market Trust</text>
        <text x="94" y="268" font-family="Noto Sans, sans-serif" font-size="12" font-weight="600" fill="${PALETTE.rust}">Shortchanged Scale</text>
        <rect x="255" y="253" width="120" height="22" rx="4" fill="${PALETTE.rust}" fill-opacity="0.85" />
        <text x="385" y="268" font-family="Noto Sans, sans-serif" font-size="11.5" fill="${PALETTE.inkMuted}">Hidden loss destroys buyer confidence</text>
        <text x="94" y="316" font-family="Noto Sans, sans-serif" font-size="12" font-weight="600" fill="${PALETTE.ochre}">Unverified Pricing</text>
        <rect x="255" y="301" width="195" height="22" rx="4" fill="${PALETTE.ochre}" fill-opacity="0.85" />
        <text x="460" y="316" font-family="Noto Sans, sans-serif" font-size="11.5" fill="${PALETTE.inkMuted}">Information asymmetry friction</text>
        <text x="94" y="364" font-family="Noto Sans, sans-serif" font-size="12" font-weight="700" fill="${PALETTE.emerald}">Calibrated Standard</text>
        <rect x="255" y="349" width="340" height="22" rx="4" fill="${PALETTE.emerald}" />
        <text x="265" y="364" font-family="Noto Sans, sans-serif" font-size="11" font-weight="700" fill="#FFFFFF">Full Measure + Inspection + Consumer Law</text>
        <rect x="74" y="420" width="564" height="132" rx="6" fill="#FAF6EC" stroke="${PALETTE.gold}" />
        ${renderSvgTextLines(wrapLines(finding, 70, 4), 94, 464, 19, { fontSize: 12.5, fill: PALETTE.ink })}
      `;
    } else if (kind === 'fraud-consumer-protection') {
      if (id === 'SOC-040') {
        leftTitle = 'POWER ASYMMETRY &amp; ILO ANTI-EXPLOITATION FLOOR';
        leftSvg = `
          <rect x="74" y="206" width="564" height="196" rx="6" fill="#FAF8F3" stroke="${PALETTE.border}" />
          <text x="94" y="232" font-family="Noto Sans, sans-serif" font-size="12" font-weight="700" fill="${PALETTE.ink}">Bargaining Balance &amp; Worker/Buyer Protection</text>
          <text x="94" y="268" font-family="Noto Sans, sans-serif" font-size="12" font-weight="600" fill="${PALETTE.rust}">Unchecked Monopoly</text>
          <rect x="255" y="253" width="115" height="22" rx="4" fill="${PALETTE.rust}" fill-opacity="0.85" />
          <text x="380" y="268" font-family="Noto Sans, sans-serif" font-size="11.5" fill="${PALETTE.inkMuted}">Wage suppression &amp; coercion</text>
          <text x="94" y="316" font-family="Noto Sans, sans-serif" font-size="12" font-weight="600" fill="${PALETTE.ochre}">Nominal Choice</text>
          <rect x="255" y="301" width="185" height="22" rx="4" fill="${PALETTE.ochre}" fill-opacity="0.85" />
          <text x="450" y="316" font-family="Noto Sans, sans-serif" font-size="11.5" fill="${PALETTE.inkMuted}">Formal contract masking hardship</text>
          <text x="94" y="364" font-family="Noto Sans, sans-serif" font-size="12" font-weight="700" fill="${PALETTE.emerald}">Labour &amp; Law Floor</text>
          <rect x="255" y="349" width="340" height="22" rx="4" fill="${PALETTE.emerald}" />
          <text x="265" y="364" font-family="Noto Sans, sans-serif" font-size="11" font-weight="700" fill="#FFFFFF">ILO Standards + Fair Pay + Enforceable Rights</text>
          <rect x="74" y="420" width="564" height="132" rx="6" fill="#EDF5F9" stroke="${PALETTE.blue}" />
          ${renderSvgTextLines(wrapLines(lim, 70, 4), 94, 464, 19, { fontSize: 12.5, fill: PALETTE.ink })}
        `;
      } else {
        // SOC-007: Fraud & deceptive practice harm
        leftTitle = 'DECEPTIVE PRACTICE BARRIERS &amp; CONSUMER PROTECTION';
        leftSvg = `
          ${titledCard({ x: 74, y: 204, w: 168, h: 245, title: '1. Deceptive Practice', body: 'Hidden defects, false claims &amp; predatory billing harm households.', accent: PALETTE.rust })}
          ${flowArrow(246, 325, 274, 325, PALETTE.blue, 2.8)}
          ${titledCard({ x: 278, y: 204, w: 176, h: 245, title: '2. Disclosure &amp; Audit', body: 'Transparent inspection &amp; UNODC anti-fraud oversight block harm.', accent: PALETTE.blue })}
          ${flowArrow(458, 325, 486, 325, PALETTE.emerald, 2.8)}
          ${titledCard({ x: 490, y: 204, w: 148, h: 245, title: '3. Market Integrity', body: 'Protects honest merchants &amp; vulnerable buyers.', accent: PALETTE.emerald })}
          <text x="356" y="516" font-family="Noto Sans, sans-serif" font-size="12" font-weight="600" fill="${PALETTE.inkMuted}" text-anchor="middle">Ethical commerce prohibits deceit while modern law enforces digital &amp; financial remedies.</text>
        `;
      }
    } else if (kind === 'mutual-consent-transactions') {
      leftTitle = 'INFORMED VOLUNTARY CONSENT (4:29) VS. COERCED EXCHANGE';
      leftSvg = `
        ${titledCard({ x: 74, y: 202, w: 270, h: 178, badge: 'Invalid Consent', title: 'Coercion, Pressure &amp; Hidden Fees', body: 'Agreement extracted under distress, misrepresentation, or asymmetric traps violates mutual fairness.', accent: PALETTE.rust })}
        ${titledCard({ x: 368, y: 202, w: 270, h: 178, badge: 'Lawful Exchange (4:29)', title: 'Informed Taradin (Consent)', body: 'Clear pricing, full defect disclosure &amp; genuine exit rights uphold voluntary trade.', accent: PALETTE.emerald })}
        <rect x="74" y="402" width="564" height="148" rx="6" fill="#FAF6EC" stroke="${PALETTE.gold}" />
        ${renderSvgTextLines(wrapLines(lim, 70, 4), 94, 444, 19, { fontSize: 12.5, fill: PALETTE.ink })}
      `;
    } else if (kind === 'charity-social-support') {
      if (id === 'SOC-050') {
        leftTitle = 'CHAPTER 10 SYNTHESIS: ‘ADL, IHSAN &amp; CIVIC TRUST';
        leftSvg = `
          ${cycleNodeRing(356, 366, 140, [
            { label: 'Justice (‘Adl)', sub: 'Impartial Law &amp; Rights', color: PALETTE.gold },
            { label: 'Benevolence (Ihsan)', sub: 'Dignified Care &amp; Support', color: PALETTE.emerald },
            { label: 'Trust (Amanah)', sub: 'Honest Trade &amp; Governance', color: PALETTE.blue },
            { label: 'Civic Peace (Salam)', sub: 'Verification &amp; Reconciliation', color: PALETTE.cyan },
          ])}
          <text x="356" y="362" font-family="Liberation Serif, serif" font-size="11.5" font-weight="700" fill="${PALETTE.emerald}" text-anchor="middle">SOCIAL</text>
          <text x="356" y="378" font-family="Liberation Serif, serif" font-size="11.5" font-weight="700" fill="${PALETTE.emerald}" text-anchor="middle">ETHICS</text>
        `;
      } else if (id === 'SOC-013') {
        leftTitle = 'DIGNIFIED FOOD RELIEF &amp; STRUCTURAL FOOD SECURITY';
        leftSvg = `
          ${titledCard({ x: 74, y: 202, w: 270, h: 185, badge: 'Immediate Mercy (76:8–9)', title: 'Feeding Without Humiliation', body: 'Honours dignity (2:264) while relieving acute hunger for poor, orphan &amp; captive.', accent: PALETTE.emerald })}
          ${titledCard({ x: 368, y: 202, w: 270, h: 185, badge: 'Systemic Foundation', title: 'Agriculture, Wages &amp; Supply', body: 'Lasting nutrition depends on livelihood stability, resilient harvests &amp; public policy.', accent: PALETTE.blue })}
          <rect x="74" y="408" width="564" height="145" rx="6" fill="#FAF6EC" stroke="${PALETTE.gold}" />
          ${renderSvgTextLines(wrapLines(lim, 70, 4), 94, 452, 19, { fontSize: 12.5, fill: PALETTE.ink })}
        `;
      } else {
        // SOC-011: Charity & Zakat safety nets
        leftTitle = 'CHARITABLE GIVING, PUBLIC SAFETY NETS &amp; DIGNITY';
        leftSvg = `
          ${titledCard({ x: 74, y: 196, w: 564, h: 110, badge: 'Voluntary &amp; Obligatory Giving', title: 'Circulating Resources Toward Vulnerable Households', body: 'Zakat categories (9:60) and charity strengthen mutual solidarity and ease acute distress.', accent: PALETTE.emerald })}
          ${titledCard({ x: 74, y: 320, w: 564, h: 110, badge: 'Structural Complement', title: 'Charity Does NOT Replace Public Infrastructure', body: 'Education, healthcare, fair wages, and social protection remain vital systemic foundations.', accent: PALETTE.blue })}
          ${titledCard({ x: 74, y: 444, w: 564, h: 110, badge: 'Scope Note', title: 'Context-Dependent Socioeconomic Effects', body: lim, accent: PALETTE.gold })}
        `;
      }
    } else if (id === 'SOC-014') {
      leftTitle = 'BALANCED CONSUMPTION VS. EXTRAVAGANT WASTE';
      leftSvg = `
        ${chartAxes({ x: 136, y: 205, w: 478, h: 290, xLabel: 'Resource &amp; Consumption Spectrum', yLabel: 'Household &amp; Ecological Resilience', xTicks: ['Scarcity', 'Sufficiency (7:31)', 'Extravagance'], yTicks: ['Fragile', 'Moderate', 'Sustainable'], yLabelOffset: 72 })}
        <path d="M 148 445 Q 368 215 595 445" fill="none" stroke="${PALETTE.emerald}" stroke-width="3.5" />
        ${calloutTag(368, 240, 'Moderation Preserves Provision &amp; Shared Goods', PALETTE.emerald, '#FFFFFF', PALETTE.emerald)}
      `;
    } else if (id === 'SOC-015') {
      leftTitle = 'HOUSEHOLD BUDGET STEWARDSHIP SPECTRUM (25:67)';
      leftSvg = `
        <rect x="74" y="206" width="564" height="196" rx="6" fill="#FAF8F3" stroke="${PALETTE.border}" />
        <text x="94" y="232" font-family="Noto Sans, sans-serif" font-size="12" font-weight="700" fill="${PALETTE.ink}">Household Financial Allocation (Accounting for Income Constraints)</text>
        <text x="94" y="268" font-family="Noto Sans, sans-serif" font-size="12" font-weight="600" fill="${PALETTE.rust}">Miserly Withholding</text>
        <rect x="255" y="253" width="130" height="22" rx="4" fill="${PALETTE.rust}" fill-opacity="0.85" />
        <text x="395" y="268" font-family="Noto Sans, sans-serif" font-size="11.5" fill="${PALETTE.inkMuted}">Neglects family &amp; civic duties</text>
        <text x="94" y="316" font-family="Noto Sans, sans-serif" font-size="12" font-weight="700" fill="${PALETTE.emerald}">Measured Middle (25:67)</text>
        <rect x="255" y="301" width="340" height="22" rx="4" fill="${PALETTE.emerald}" />
        <text x="265" y="316" font-family="Noto Sans, sans-serif" font-size="11" font-weight="700" fill="#FFFFFF">Dependents + Emergency Reserve + Generosity</text>
        <text x="94" y="364" font-family="Noto Sans, sans-serif" font-size="12" font-weight="600" fill="${PALETTE.ochre}">Squandering (Tabdhir)</text>
        <rect x="255" y="349" width="175" height="22" rx="4" fill="${PALETTE.ochre}" fill-opacity="0.85" />
        <text x="440" y="364" font-family="Noto Sans, sans-serif" font-size="11.5" fill="${PALETTE.inkMuted}">Debt vulnerability &amp; waste</text>
        <rect x="74" y="420" width="564" height="132" rx="6" fill="#EDF5F9" stroke="${PALETTE.blue}" />
        ${renderSvgTextLines(wrapLines(lim, 70, 4), 94, 464, 19, { fontSize: 12.5, fill: PALETTE.ink })}
      `;
    } else if (id === 'SOC-042') {
      leftTitle = 'HUMAN CONDUCT, SHARED RIPPLE &amp; ECOLOGICAL ACCOUNTABILITY';
      leftSvg = `
        ${titledCard({ x: 74, y: 204, w: 168, h: 245, title: '1. Civic &amp; Land Conduct', body: 'Waste, pollution &amp; exploitation accumulate across communities.', accent: PALETTE.rust })}
        ${flowArrow(246, 325, 274, 325, PALETTE.blue, 2.8)}
        ${titledCard({ x: 278, y: 204, w: 176, h: 245, title: '2. Shared Impact (30:41)', body: 'Harm rebounds on water, soil, public health &amp; social cohesion.', accent: PALETTE.ochre })}
        ${flowArrow(458, 325, 486, 325, PALETTE.emerald, 2.8)}
        ${titledCard({ x: 490, y: 204, w: 148, h: 245, title: '3. Repair &amp; Regulation', body: 'Policy, conservation &amp; ethical restraint restore balance.', accent: PALETTE.emerald })}
        <text x="356" y="516" font-family="Noto Sans, sans-serif" font-size="12" font-weight="600" fill="${PALETTE.inkMuted}" text-anchor="middle">Ecological stewardship relies on enforceable environmental standards alongside moral care.</text>
      `;
    } else {
      // SOC-041: Shared commons stewardship
      leftTitle = 'SHARED COMMONS STEWARDSHIP &amp; ENVIRONMENTAL GOVERNANCE';
      leftSvg = `
        ${titledCard({ x: 74, y: 202, w: 270, h: 175, badge: 'Collective Risk', title: 'Over-Extraction &amp; Pollution', body: 'Short-term misuse degrades shared water, soil &amp; ecological stability (30:41, UNEP).', accent: PALETTE.rust })}
        ${titledCard({ x: 368, y: 202, w: 270, h: 175, badge: 'Shared Governance', title: 'Stewardship &amp; Fair Rules', body: 'Institutional quotas, conservation ethics &amp; circular reuse protect future generations.', accent: PALETTE.emerald })}
        <rect x="74" y="398" width="564" height="152" rx="6" fill="#EDF5F9" stroke="${PALETTE.cyan}" />
        ${renderSvgTextLines(wrapLines(lim, 70, 4), 94, 444, 19, { fontSize: 12.5, fill: PALETTE.ink })}
      `;
    }

  // 3. Family, Safeguarding, Neighbours, Privacy, Rumour, Mediation & Diversity (SOC-012, 016..037, 046, 047, 049)
  } else {
    if (kind === 'orphan-property-protection') {
      leftTitle = 'FIDUCIARY SEPARATION: ORPHAN ASSETS RING-FENCED (4:2, 4:10)';
      leftSvg = `
        ${cardBox({ x: 74, y: 202, w: 255, h: 255, fill: '#EBF5F0', stroke: PALETTE.emerald, strokeWidth: 2 })}
        <text x="201" y="236" font-family="Noto Sans, sans-serif" font-size="13.5" font-weight="700" fill="${PALETTE.emerald}" text-anchor="middle">Orphan’s Protected Estate</text>
        ${renderSvgTextLines(wrapLines('Held strictly in trust; audited separately; handed over upon verified maturity.', 28, 4), 94, 280, 20, { fontSize: 12.5, fill: PALETTE.ink })}
        <line x1="356" y1="202" x2="356" y2="457" stroke="${PALETTE.rust}" stroke-width="3" stroke-dasharray="6 4" />
        ${cardBox({ x: 382, y: 202, w: 255, h: 255, fill: '#FAF4EC', stroke: PALETTE.ochre, strokeWidth: 2 })}
        <text x="509" y="236" font-family="Noto Sans, sans-serif" font-size="13.5" font-weight="700" fill="${PALETTE.ochre}" text-anchor="middle">Guardian’s Own Account</text>
        ${renderSvgTextLines(wrapLines('Zero commingling or exploitation; statutory fiduciary oversight (UNICEF/Law).', 28, 4), 402, 280, 20, { fontSize: 12.5, fill: PALETTE.ink })}
        <text x="356" y="514" font-family="Noto Sans, sans-serif" font-size="12" font-weight="600" fill="${PALETTE.rust}" text-anchor="middle">Financial integrity safeguards vulnerable minors until independent adulthood.</text>
      `;
    } else if (kind === 'family-consultation-process') {
      if (id === 'SOC-016') {
        leftTitle = 'MUTUAL SPOUSAL RIGHTS (MA‘RUF) &amp; NON-COERCION FLOOR';
        leftSvg = `
          ${titledCard({ x: 74, y: 202, w: 270, h: 185, badge: 'Reciprocal Standard (2:228)', title: 'Kindness, Dignity &amp; Clear Duties', body: 'Fairness, emotional care &amp; honourable conduct sustain resilient partnerships.', accent: PALETTE.emerald })}
          ${titledCard({ x: 368, y: 202, w: 270, h: 185, badge: 'Non-Negotiable Safeguard', title: 'Zero Tolerance for Coercion', body: 'Marital ethics never shields domestic violence, intimidation, or denial of legal aid.', accent: PALETTE.rust })}
          <rect x="74" y="408" width="564" height="145" rx="6" fill="#FAF6EC" stroke="${PALETTE.gold}" />
          ${renderSvgTextLines(wrapLines(lim, 70, 4), 94, 452, 19, { fontSize: 12.5, fill: PALETTE.ink })}
        `;
      } else if (id === 'SOC-017') {
        leftTitle = 'HOUSEHOLD COMMUNICATION CLIMATE &amp; SAFETY BOUNDARIES';
        leftSvg = `
          <rect x="74" y="206" width="564" height="196" rx="6" fill="#FAF8F3" stroke="${PALETTE.border}" />
          <text x="94" y="232" font-family="Noto Sans, sans-serif" font-size="12" font-weight="700" fill="${PALETTE.ink}">Household Interaction Climates &amp; Emotional Security</text>
          <text x="94" y="268" font-family="Noto Sans, sans-serif" font-size="12" font-weight="600" fill="${PALETTE.rust}">Hostile Contempt</text>
          <rect x="255" y="253" width="115" height="22" rx="4" fill="${PALETTE.rust}" fill-opacity="0.85" />
          <text x="380" y="268" font-family="Noto Sans, sans-serif" font-size="11.5" fill="${PALETTE.inkMuted}">Harms partners &amp; child wellbeing</text>
          <text x="94" y="316" font-family="Noto Sans, sans-serif" font-size="12" font-weight="600" fill="${PALETTE.ochre}">Cold Withdrawal</text>
          <rect x="255" y="301" width="180" height="22" rx="4" fill="${PALETTE.ochre}" fill-opacity="0.85" />
          <text x="445" y="316" font-family="Noto Sans, sans-serif" font-size="11.5" fill="${PALETTE.inkMuted}">Leaves conflicts &amp; needs unresolved</text>
          <text x="94" y="364" font-family="Noto Sans, sans-serif" font-size="12" font-weight="700" fill="${PALETTE.emerald}">Respectful Dialogue</text>
          <rect x="255" y="349" width="340" height="22" rx="4" fill="${PALETTE.emerald}" />
          <text x="265" y="364" font-family="Noto Sans, sans-serif" font-size="11" font-weight="700" fill="#FFFFFF">Kindness (4:19) + Counselling &amp; Safety When Needed</text>
          <rect x="74" y="420" width="564" height="132" rx="6" fill="#FAF0EC" stroke="${PALETTE.rust}" />
          ${renderSvgTextLines(wrapLines(lim, 70, 4), 94, 464, 19, { fontSize: 12.5, fill: PALETTE.ink })}
        `;
      } else if (id === 'SOC-018') {
        leftTitle = 'PARENTAL CONSULTATION (TASHAWUR) &amp; MUTUAL CONSENT (2:233)';
        leftSvg = `
          ${titledCard({ x: 74, y: 204, w: 168, h: 245, title: '1. Both Parents Listen', body: 'Openly weigh maternal health, schedules &amp; household strain.', accent: PALETTE.blue })}
          ${flowArrow(246, 325, 274, 325, PALETTE.emerald, 2.8)}
          ${titledCard({ x: 278, y: 204, w: 176, h: 245, title: '2. Child Welfare First', body: 'Infant nutrition, comfort &amp; developmental needs guide choice.', accent: PALETTE.emerald })}
          ${flowArrow(458, 325, 486, 325, PALETTE.gold, 2.8)}
          ${titledCard({ x: 490, y: 204, w: 148, h: 245, title: '3. Mutual Consent', body: 'Shared agreement without unilateral pressure.', accent: PALETTE.gold })}
          <text x="356" y="516" font-family="Noto Sans, sans-serif" font-size="12" font-weight="600" fill="${PALETTE.inkMuted}" text-anchor="middle">Targeted guidance on infant care rather than an exhaustive model of all household rules.</text>
        `;
      } else {
        // SOC-019: Intergenerational filial care with ethical boundaries
        leftTitle = 'INTERGENERATIONAL FILIAL CARE &amp; ETHICAL INTEGRITY';
        leftSvg = `
          ${titledCard({ x: 74, y: 196, w: 564, h: 110, badge: 'Gratitude &amp; Gentleness (17:23–24)', title: 'Dignified Support for Ageing Parents', body: 'Cultivates humility, warm speech, practical caregiving &amp; emotional belonging.', accent: PALETTE.emerald })}
          ${titledCard({ x: 74, y: 320, w: 564, h: 110, badge: 'Conscience &amp; Safety Limit (31:15)', title: 'Kindness Never Mandates Wrongdoing or Abuse', body: 'Filial respect coexists with moral integrity, personal safety &amp; healthy boundaries.', accent: PALETTE.rust })}
          ${titledCard({ x: 74, y: 444, w: 564, h: 110, badge: 'Caregiver Context', title: 'Community &amp; Public Respite Services', body: lim, accent: PALETTE.blue })}
        `;
      }
    } else if (kind === 'child-welfare-protection') {
      if (id === 'SOC-020') {
        leftTitle = 'CHILD-SAFEGUARDING, HEALTH &amp; EDUCATION ECOSYSTEM';
        leftSvg = `
          ${titledCard({ x: 74, y: 196, w: 270, h: 175, badge: 'Home Attachment', title: 'Warm Family Care', body: 'Emotional security, calm guidance &amp; nurturing nutrition protect early development.', accent: PALETTE.emerald })}
          ${titledCard({ x: 368, y: 196, w: 270, h: 175, badge: 'Paediatric Care', title: 'Health &amp; Vaccination', body: 'Clean water, primary clinics &amp; early screening sustain physical wellbeing.', accent: PALETTE.cyan })}
          ${titledCard({ x: 74, y: 386, w: 270, h: 175, badge: 'Development (66:6)', title: 'Schooling &amp; Safe Play', body: 'Accessible literacy, creative play &amp; peer belonging build resilient youth.', accent: PALETTE.blue })}
          ${titledCard({ x: 368, y: 386, w: 270, h: 175, badge: 'UNICEF Safeguard', title: 'Mandatory Abuse Prevention', body: 'Legal child-protection laws override parental secrecy whenever harm occurs.', accent: PALETTE.rust })}
        `;
      } else if (id === 'SOC-021') {
        leftTitle = 'ADULT MODELLING, DIALOGUE &amp; MORAL LEARNING (31:13–19)';
        leftSvg = `
          ${titledCard({ x: 74, y: 204, w: 168, h: 245, title: '1. Consistent Example', body: 'Adults practice honesty, patience &amp; gentle tone daily.', accent: PALETTE.blue })}
          ${flowArrow(246, 325, 274, 325, PALETTE.emerald, 2.8)}
          ${titledCard({ x: 278, y: 204, w: 176, h: 245, title: '2. Gentle Dialogue', body: 'Luqman’s counsel explains reasons warmly without cruelty.', accent: PALETTE.emerald })}
          ${flowArrow(458, 325, 486, 325, PALETTE.gold, 2.8)}
          ${titledCard({ x: 490, y: 204, w: 148, h: 245, title: '3. Internalised Habits', body: 'Children adopt empathy, conscience &amp; self-restraint.', accent: PALETTE.gold })}
          <text x="356" y="516" font-family="Noto Sans, sans-serif" font-size="12" font-weight="600" fill="${PALETTE.inkMuted}" text-anchor="middle">Ethical counsel complements developmental psychology without acting as a stage-theory test.</text>
        `;
      } else {
        // SOC-022: Protecting children without parental care
        leftTitle = 'PROTECTING ORPHANED &amp; VULNERABLE CHILDREN (UNICEF)';
        leftSvg = `
          ${titledCard({ x: 74, y: 202, w: 270, h: 185, badge: 'Moral Mandate (93:9, 107:2)', title: 'Dignified Kinship &amp; Community Care', body: 'Forbids harshness or neglect; ensures emotional warmth, nutrition &amp; schooling.', accent: PALETTE.emerald })}
          ${titledCard({ x: 368, y: 202, w: 270, h: 185, badge: 'Institutional Oversight', title: 'Formal Foster &amp; Guardianship Law', body: 'Enforceable vetting, social-work visits &amp; abuse reporting protect minors.', accent: PALETTE.rust })}
          <rect x="74" y="408" width="564" height="145" rx="6" fill="#EDF5F9" stroke="${PALETTE.blue}" />
          ${renderSvgTextLines(wrapLines(lim, 70, 4), 94, 452, 19, { fontSize: 12.5, fill: PALETTE.ink })}
        `;
      }
    } else if (kind === 'privacy-personal-boundaries') {
      if (id === 'SOC-049') {
        leftTitle = 'SHARED PUBLIC-SPACE COMPOSURE &amp; MUTUAL RESPECT (31:19)';
        leftSvg = `
          ${titledCard({ x: 74, y: 202, w: 270, h: 185, badge: 'Prosocial Composure', title: 'Measured Pace &amp; Gentle Voice', body: 'Lowered disruption &amp; humble bearing make shared spaces calmer and safer.', accent: PALETTE.emerald })}
          ${titledCard({ x: 368, y: 202, w: 270, h: 185, badge: 'Civic Guardrail', title: 'Accessibility &amp; Neurodiversity', body: 'Etiquette norms never penalize mobility aids, disability, or loud distress in emergencies.', accent: PALETTE.blue })}
          <rect x="74" y="408" width="564" height="145" rx="6" fill="#FAF6EC" stroke="${PALETTE.gold}" />
          ${renderSvgTextLines(wrapLines(lim, 70, 4), 94, 452, 19, { fontSize: 12.5, fill: PALETTE.ink })}
        `;
      } else {
        // SOC-026: Concentric Privacy Spheres with clean non-overlapping text spacing
        leftTitle = 'CONCENTRIC PRIVACY SPHERES &amp; DOMESTIC BOUNDARIES';
        leftSvg = `
          <circle cx="245" cy="370" r="138" fill="#EEF5F9" stroke="${PALETTE.blue}" stroke-width="2" />
          <circle cx="245" cy="370" r="94" fill="#F6EFE0" stroke="${PALETTE.gold}" stroke-width="2" />
          <circle cx="245" cy="370" r="48" fill="#EBF5F0" stroke="${PALETTE.emerald}" stroke-width="2" />
          <text x="245" y="374" font-family="Noto Sans, sans-serif" font-size="11.5" font-weight="700" fill="${PALETTE.emerald}" text-anchor="middle">Private Core</text>
          <text x="245" y="304" font-family="Noto Sans, sans-serif" font-size="11" font-weight="700" fill="${PALETTE.ochre}" text-anchor="middle">Home Threshold</text>
          <text x="245" y="258" font-family="Noto Sans, sans-serif" font-size="11" font-weight="700" fill="${PALETTE.blue}" text-anchor="middle">Public Space</text>
          ${titledCard({ x: 405, y: 215, w: 235, h: 135, title: 'No Spying (49:12)', body: 'Respect personal, domestic &amp; correspondence boundaries.', accent: PALETTE.emerald })}
          ${titledCard({ x: 405, y: 368, w: 235, h: 135, title: 'Privacy ≠ Secrecy for Harm', body: 'Privacy never shields violence or abuse from lawful intervention.', accent: PALETTE.rust })}
        `;
      }
    } else if (kind === 'permission-respectful-access') {
      leftTitle = 'PERMISSION-BASED ACCESS &amp; GRACIOUS ACCEPTANCE (24:27–28)';
      leftSvg = `
        ${titledCard({ x: 74, y: 204, w: 168, h: 245, title: '1. Seek Permission', body: 'Announce arrival warmly before crossing any private threshold.', accent: PALETTE.blue })}
        ${flowArrow(246, 325, 274, 325, PALETTE.emerald, 2.8)}
        ${titledCard({ x: 278, y: 204, w: 176, h: 245, title: '2. Explicit Consent', body: 'Wait for clear invitation; respect household timing.', accent: PALETTE.emerald })}
        ${flowArrow(458, 325, 486, 325, PALETTE.gold, 2.8)}
        ${titledCard({ x: 490, y: 204, w: 148, h: 245, title: '3. Gracious Exit', body: 'If asked to turn back, leave calmly without resentment.', accent: PALETTE.gold })}
        <text x="356" y="516" font-family="Noto Sans, sans-serif" font-size="12" font-weight="600" fill="${PALETTE.rust}" text-anchor="middle">Consent boundaries do not block lawful emergency rescue, welfare checks, or court warrants.</text>
      `;
    } else if (kind === 'rumour-vs-verified-reporting') {
      if (id === 'SOC-030') {
        leftTitle = 'MALICIOUS BACKBITING BLOCK VS. PROTECTED REPORTING';
        leftSvg = `
          ${titledCard({ x: 74, y: 204, w: 168, h: 245, title: '1. Harm or Claim', body: 'Distinguish idle personal gossip from genuine misconduct.', accent: PALETTE.ochre })}
          ${flowArrow(246, 325, 274, 325, PALETTE.blue, 2.8)}
          ${titledCard({ x: 278, y: 204, w: 176, h: 245, title: '2. Safeguarding Gate', body: 'Does silence endanger victims, fraud targets, or minors?', accent: PALETTE.blue })}
          ${flowArrow(458, 325, 486, 325, PALETTE.emerald, 2.8)}
          ${titledCard({ x: 490, y: 204, w: 148, h: 245, title: '3. Act Responsibly', body: 'Escalate danger to proper channels; refuse humiliation.', accent: PALETTE.emerald })}
          <text x="356" y="516" font-family="Noto Sans, sans-serif" font-size="12" font-weight="600" fill="${PALETTE.rust}" text-anchor="middle">Ghibah prohibitions NEVER gag abuse survivors, whistleblowers, or safeguarding reports.</text>
        `;
      } else {
        // SOC-029: Mockery, ridicule & anti-bullying dignity
        leftTitle = 'HUMILIATION HARM VS. ANTI-BULLYING RESPECT (49:11)';
        leftSvg = `
          ${titledCard({ x: 74, y: 202, w: 270, h: 185, badge: 'Social Harm', title: 'Mockery &amp; Derogatory Labels', body: 'Public ridicule damages mental health, alienates peers &amp; normalizes bullying.', accent: PALETTE.rust })}
          ${titledCard({ x: 368, y: 202, w: 270, h: 185, badge: 'Protective Norm', title: 'Respectful Speech &amp; Belonging', body: 'Disagree cleanly with arguments while defending every person’s dignity.', accent: PALETTE.emerald })}
          <rect x="74" y="408" width="564" height="145" rx="6" fill="#FAF0EC" stroke="${PALETTE.rust}" />
          ${renderSvgTextLines(wrapLines(lim, 70, 4), 94, 452, 19, { fontSize: 12.5, fill: PALETTE.ink })}
        `;
      }
    } else if (kind === 'verification-before-sharing') {
      leftTitle = 'VERIFY BEFORE SHARING: HALTING MISINFORMATION CASCADE (49:6)';
      leftSvg = `
        ${titledCard({ x: 74, y: 204, w: 168, h: 245, title: '1. Unchecked Claim', body: 'Sensational or angry reports trigger rapid forwarding.', accent: PALETTE.rust })}
        ${flowArrow(246, 325, 274, 325, PALETTE.blue, 2.8)}
        ${titledCard({ x: 278, y: 204, w: 176, h: 245, title: '2. Primary Verification', body: 'Check eyewitnesses, evidence &amp; source reliability.', accent: PALETTE.blue })}
        ${flowArrow(458, 325, 486, 325, PALETTE.emerald, 2.8)}
        ${titledCard({ x: 490, y: 204, w: 148, h: 245, title: '3. Share Truth or Stop', body: 'Prevents defamation &amp; communal panic.', accent: PALETTE.emerald })}
        <text x="356" y="516" font-family="Noto Sans, sans-serif" font-size="12" font-weight="600" fill="${PALETTE.inkMuted}" text-anchor="middle">Civic media literacy extends tabayyun ethics against digital amplification loops.</text>
      `;
    } else if (kind === 'neighbourhood-support-network') {
      if (id === 'SOC-024') {
        leftTitle = 'NEIGHBOURLY MUTUAL-AID &amp; LOCAL COHESION RING (4:36)';
        leftSvg = `
          ${cycleNodeRing(356, 366, 138, [
            { label: 'Everyday Courtesy', sub: 'Close &amp; Distant Neighbours', color: PALETTE.emerald },
            { label: 'Practical Aid', sub: 'Crisis &amp; Illness Support', color: PALETTE.blue },
            { label: 'Respect Boundaries', sub: 'Privacy &amp; Safety First', color: PALETTE.gold },
            { label: 'Civic Infrastructure', sub: 'Housing &amp; Public Services', color: PALETTE.cyan },
          ])}
          <text x="356" y="362" font-family="Liberation Serif, serif" font-size="11.5" font-weight="700" fill="${PALETTE.emerald}" text-anchor="middle">LOCAL</text>
          <text x="356" y="378" font-family="Liberation Serif, serif" font-size="11.5" font-weight="700" fill="${PALETTE.emerald}" text-anchor="middle">COHESION</text>
        `;
      } else if (id === 'SOC-025') {
        leftTitle = 'WAYFARER HOSPITALITY &amp; FORMAL CIVIC SHELTER (9:60)';
        leftSvg = `
          ${titledCard({ x: 74, y: 202, w: 270, h: 185, badge: 'Informal Solidarity', title: 'Safe Welcome &amp; Immediate Aid', body: 'Food, shelter &amp; directions ease urgent vulnerability for stranded travellers.', accent: PALETTE.emerald })}
          ${titledCard({ x: 368, y: 202, w: 270, h: 185, badge: 'Institutional Complement', title: 'Municipal Transit &amp; Legal Care', body: 'Safe travel systems require transit infrastructure, consular aid &amp; public shelter.', accent: PALETTE.blue })}
          <rect x="74" y="408" width="564" height="145" rx="6" fill="#FAF6EC" stroke="${PALETTE.gold}" />
          ${renderSvgTextLines(wrapLines(lim, 70, 4), 94, 452, 19, { fontSize: 12.5, fill: PALETTE.ink })}
        `;
      } else if (id === 'SOC-028') {
        leftTitle = 'COURTEOUS GREETINGS &amp; EVERYDAY SOCIAL TRUST';
        leftSvg = `
          ${titledCard({ x: 74, y: 204, w: 168, h: 245, title: '1. Warm Salam Greeting', body: 'Signals peaceful intent across daily encounters (24:61, 4:86).', accent: PALETTE.blue })}
          ${flowArrow(246, 325, 274, 325, PALETTE.emerald, 2.8)}
          ${titledCard({ x: 278, y: 204, w: 176, h: 245, title: '2. Lowered Friction', body: 'Reduces alienation and softens tense social spaces.', accent: PALETTE.emerald })}
          ${flowArrow(458, 325, 486, 325, PALETTE.gold, 2.8)}
          ${titledCard({ x: 490, y: 204, w: 148, h: 245, title: '3. Everyday Trust', body: 'Builds baseline familiarity before crises arise.', accent: PALETTE.gold })}
          <text x="356" y="516" font-family="Noto Sans, sans-serif" font-size="12" font-weight="600" fill="${PALETTE.inkMuted}" text-anchor="middle">Everyday civility complements—rather than replaces—fair institutions and safety.</text>
        `;
      } else {
        // SOC-012: Kinship care + public services
        leftTitle = 'KINSHIP CARE, PUBLIC SERVICES &amp; SAFETY BOUNDARIES';
        leftSvg = `
          ${titledCard({ x: 74, y: 196, w: 564, h: 110, badge: 'Extended Family Ties (16:90)', title: 'Immediate Kinship Care During Hardship', body: 'Family networks often deliver rapid practical, caregiving &amp; emotional assistance.', accent: PALETTE.emerald })}
          ${titledCard({ x: 74, y: 320, w: 564, h: 110, badge: 'Public Safety Net Rule', title: 'Public Institutions Remain Indispensable', body: 'Kinship aid varies in capacity and safety; accessible public services protect all citizens.', accent: PALETTE.rust })}
          ${titledCard({ x: 74, y: 444, w: 564, h: 110, badge: 'Socioeconomic Scope', title: 'Uneven Resource Capacity Across Households', body: lim, accent: PALETTE.blue })}
        `;
      }
    } else if (kind === 'beneficial-vs-harmful-cooperation') {
      if (id === 'SOC-033') {
        leftTitle = 'BENEFICIAL COOPERATION VS. HARMFUL COLLUSION (5:2)';
        leftSvg = `
          ${titledCard({ x: 74, y: 202, w: 270, h: 185, badge: 'Ethical Solidarity', title: 'Righteousness &amp; Common Good', body: 'Unites people around poverty relief, truth, environmental care &amp; public justice.', accent: PALETTE.emerald })}
          ${titledCard({ x: 368, y: 202, w: 270, h: 185, badge: 'Prohibited Collusion', title: 'Aggression &amp; Mutual Cover-Up', body: 'Group teamwork used to intimidate minorities, rig bids, or silence victims.', accent: PALETTE.rust })}
          <rect x="74" y="408" width="564" height="145" rx="6" fill="#FAF6EC" stroke="${PALETTE.gold}" />
          ${renderSvgTextLines(wrapLines(lim, 70, 4), 94, 452, 19, { fontSize: 12.5, fill: PALETTE.ink })}
        `;
      } else {
        // SOC-032: Constructive cohesion vs factionalism
        leftTitle = 'CONSTRUCTIVE UNITY VS. FACTIONALISM &amp; SUPPRESSION';
        leftSvg = `
          ${titledCard({ x: 74, y: 196, w: 564, h: 110, badge: 'Ethical Cohesion (3:103)', title: 'Unity Rooted in Shared Moral Principle', body: 'Healthy solidarity balances shared purpose with respectful dissent and due process.', accent: PALETTE.emerald })}
          ${titledCard({ x: 74, y: 320, w: 564, h: 110, badge: 'Safeguard Against Suppression', title: 'Unity NEVER Justifies Silencing Victims or Critique', body: 'False harmony that crushes accountability breeds factionalism and institutional decay.', accent: PALETTE.rust })}
          ${titledCard({ x: 74, y: 444, w: 564, h: 110, badge: 'Social Science Scope', title: 'Pluralistic Cohesion Context', body: lim, accent: PALETTE.blue })}
        `;
      }
    } else if (kind === 'conflict-resolution-reconciliation') {
      if (id === 'SOC-034') {
        leftTitle = 'SAFE MEDIATION GATE &amp; NON-COERCIVE PEACEMAKING';
        leftSvg = `
          ${titledCard({ x: 74, y: 204, w: 168, h: 245, title: '1. Safety Screening', body: 'Bar mediation under active violence, threats, or severe imbalance.', accent: PALETTE.rust })}
          ${flowArrow(246, 325, 274, 325, PALETTE.blue, 2.8)}
          ${titledCard({ x: 278, y: 204, w: 176, h: 245, title: '2. Free Mutual Voice', body: 'Impartial mediators hear both sides equitably (49:9).', accent: PALETTE.blue })}
          ${flowArrow(458, 325, 486, 325, PALETTE.emerald, 2.8)}
          ${titledCard({ x: 490, y: 204, w: 148, h: 245, title: '3. Just Settlement', body: 'Restitution &amp; clear terms rebuild durable peace.', accent: PALETTE.emerald })}
          <text x="356" y="516" font-family="Noto Sans, sans-serif" font-size="12" font-weight="600" fill="${PALETTE.rust}" text-anchor="middle">Protective courts &amp; shelter—not forced reconciliation—protect abuse survivors.</text>
        `;
      } else if (id === 'SOC-035') {
        leftTitle = 'PROCEDURAL FAIRNESS &amp; DISPUTE APPEAL LEGITIMACY';
        leftSvg = `
          <rect x="74" y="206" width="564" height="196" rx="6" fill="#FAF8F3" stroke="${PALETTE.border}" />
          <text x="94" y="232" font-family="Noto Sans, sans-serif" font-size="12" font-weight="700" fill="${PALETTE.ink}">Perceived Legitimacy Across Dispute Resolution Designs</text>
          <text x="94" y="268" font-family="Noto Sans, sans-serif" font-size="12" font-weight="600" fill="${PALETTE.rust}">Arbitrary Decree</text>
          <rect x="255" y="253" width="115" height="22" rx="4" fill="${PALETTE.rust}" fill-opacity="0.85" />
          <text x="380" y="268" font-family="Noto Sans, sans-serif" font-size="11.5" fill="${PALETTE.inkMuted}">Sparks resentment &amp; renewed feud</text>
          <text x="94" y="316" font-family="Noto Sans, sans-serif" font-size="12" font-weight="600" fill="${PALETTE.ochre}">Partial Hearing</text>
          <rect x="255" y="301" width="190" height="22" rx="4" fill="${PALETTE.ochre}" fill-opacity="0.85" />
          <text x="455" y="316" font-family="Noto Sans, sans-serif" font-size="11.5" fill="${PALETTE.inkMuted}">Weakens trust without appeal</text>
          <text x="94" y="364" font-family="Noto Sans, sans-serif" font-size="12" font-weight="700" fill="${PALETTE.emerald}">Procedural Justice</text>
          <rect x="255" y="349" width="340" height="22" rx="4" fill="${PALETTE.emerald}" />
          <text x="265" y="364" font-family="Noto Sans, sans-serif" font-size="11" font-weight="700" fill="#FFFFFF">Neutral Hearing + Evidence + Right of Appeal</text>
          <rect x="74" y="420" width="564" height="132" rx="6" fill="#EDF5F9" stroke="${PALETTE.blue}" />
          ${renderSvgTextLines(wrapLines(lim, 70, 4), 94, 464, 19, { fontSize: 12.5, fill: PALETTE.ink })}
        `;
      } else {
        // SOC-046: Peaceful coexistence, equity & social development
        leftTitle = 'PEACEFUL COEXISTENCE, EQUITY &amp; CIVIC PROSPERITY';
        leftSvg = `
          ${titledCard({ x: 74, y: 202, w: 270, h: 185, badge: 'Civic Security (2:126)', title: 'Non-Aggression &amp; Rule of Law', body: 'Predictable peace enables schools, trade, medical care &amp; household stability.', accent: PALETTE.emerald })}
          ${titledCard({ x: 368, y: 202, w: 270, h: 185, badge: 'Equitable Foundation', title: 'Justice Sustains Shared Development', body: 'Peace endures where rights, livelihoods &amp; accountable governance protect all.', accent: PALETTE.blue })}
          <rect x="74" y="408" width="564" height="145" rx="6" fill="#FAF6EC" stroke="${PALETTE.gold}" />
          ${renderSvgTextLines(wrapLines(lim, 70, 4), 94, 452, 19, { fontSize: 12.5, fill: PALETTE.ink })}
        `;
      }
    } else if (kind === 'human-dignity-diversity') {
      if (id === 'SOC-036') {
        leftTitle = 'PLURAL HUMAN DIVERSITY &amp; MUTUAL RECOGNITION (TA‘ARUF 49:13)';
        leftSvg = `
          ${cycleNodeRing(356, 366, 138, [
            { label: 'Varied Heritages', sub: 'Nations, Tongues &amp; Cultures', color: PALETTE.blue },
            { label: 'Mutual Recognition', sub: 'Ta‘aruf Beyond Stereotypes', color: PALETTE.emerald },
            { label: 'Shared Human Rights', sub: 'Equal Civic Standing', color: PALETTE.gold },
            { label: 'Moral Conduct Check', sub: 'Character Over Prejudice', color: PALETTE.cyan },
          ])}
          <text x="356" y="362" font-family="Liberation Serif, serif" font-size="11.5" font-weight="700" fill="${PALETTE.emerald}" text-anchor="middle">PLURAL</text>
          <text x="356" y="378" font-family="Liberation Serif, serif" font-size="11.5" font-weight="700" fill="${PALETTE.emerald}" text-anchor="middle">DIGNITY</text>
        `;
      } else if (id === 'SOC-037') {
        leftTitle = 'EQUAL HUMAN DIGNITY ACROSS LINEAGE &amp; STATUS (17:70)';
        leftSvg = `
          <rect x="74" y="206" width="564" height="196" rx="6" fill="#FAF8F3" stroke="${PALETTE.border}" />
          <text x="94" y="232" font-family="Noto Sans, sans-serif" font-size="12" font-weight="700" fill="${PALETTE.ink}">Universal Intrinsic Dignity (Equal Baseline Regardless of Status)</text>
          <text x="94" y="268" font-family="Noto Sans, sans-serif" font-size="12" font-weight="600" fill="${PALETTE.ink}">Lineage / Ethnicity</text>
          <rect x="255" y="253" width="335" height="22" rx="4" fill="${PALETTE.emerald}" />
          <text x="265" y="268" font-family="Noto Sans, sans-serif" font-size="11" font-weight="700" fill="#FFFFFF">100% Equal Intrinsic Dignity (Karama 17:70)</text>
          <text x="94" y="316" font-family="Noto Sans, sans-serif" font-size="12" font-weight="600" fill="${PALETTE.ink}">Income / Class</text>
          <rect x="255" y="301" width="335" height="22" rx="4" fill="${PALETTE.blue}" />
          <text x="265" y="316" font-family="Noto Sans, sans-serif" font-size="11" font-weight="700" fill="#FFFFFF">100% Equal Legal Protection &amp; Respect</text>
          <text x="94" y="364" font-family="Noto Sans, sans-serif" font-size="12" font-weight="600" fill="${PALETTE.ink}">Language / Region</text>
          <rect x="255" y="349" width="335" height="22" rx="4" fill="${PALETTE.gold}" />
          <text x="265" y="364" font-family="Noto Sans, sans-serif" font-size="11" font-weight="700" fill="#FFFFFF">100% Equal Moral Standing &amp; Belonging</text>
          <rect x="74" y="420" width="564" height="132" rx="6" fill="#FAF6EC" stroke="${PALETTE.gold}" />
          ${renderSvgTextLines(wrapLines(lim, 70, 4), 94, 464, 19, { fontSize: 12.5, fill: PALETTE.ink })}
        `;
      } else {
        // SOC-047: Conscience, non-coercion & plural civic peace
        leftTitle = 'FREEDOM OF CONSCIENCE (2:256) &amp; PLURAL CIVIC PEACE';
        leftSvg = `
          ${titledCard({ x: 74, y: 202, w: 270, h: 185, badge: 'Non-Coercion Principle', title: 'No Compulsion in Belief (2:256)', body: 'Sincere faith and conscience cannot be forced by intimidation or state penalty.', accent: PALETTE.emerald })}
          ${titledCard({ x: 368, y: 202, w: 270, h: 185, badge: 'Institutional Safeguard', title: 'Equal Rights Under Plural Law', body: 'Constitutional protections guarantee equal citizenship &amp; religious freedom for all.', accent: PALETTE.blue })}
          <rect x="74" y="408" width="564" height="145" rx="6" fill="#FAF6EC" stroke="${PALETTE.gold}" />
          ${renderSvgTextLines(wrapLines(lim, 70, 4), 94, 452, 19, { fontSize: 12.5, fill: PALETTE.ink })}
        `;
      }
    } else {
      leftTitle = 'CONCEPTUAL SOCIAL &amp; ETHICAL ANALYSIS';
      leftSvg = `
        ${titledCard({ x: 74, y: 204, w: 564, h: 162, title: entry.scientific_topic, body: finding, accent: PALETTE.emerald })}
        ${titledCard({ x: 74, y: 386, w: 564, h: 162, title: 'Institutional Context', body: lim, accent: PALETTE.gold })}
      `;
    }
  }

  bodySvg = `
    ${cardBox({ x: 46, y: 168, w: 620, h: 430, fill: PALETTE.paperCard, stroke: PALETTE.emerald, strokeWidth: 1.4, accentTop: PALETTE.emerald })}
    <text x="356" y="188" font-family="Noto Sans, sans-serif" font-size="13.5" font-weight="700" fill="#FFFFFF" text-anchor="middle">${leftTitle}</text>
    ${leftSvg}
    ${modelBadge}

    ${cardBox({ x: 688, y: 142, w: 466, h: 456, fill: PALETTE.paperCard, stroke: PALETTE.gold, strokeWidth: 1.4, accentTop: PALETTE.gold })}
    <text x="921" y="162" font-family="Noto Sans, sans-serif" font-size="13.5" font-weight="700" fill="#FFFFFF" text-anchor="middle">CIVIC ETHICS &amp; GOVERNANCE BOUNDARIES</text>
    ${titledCard({ x: 710, y: 192, w: 422, h: 120, title: entry.scientific_topic, body: finding, accent: PALETTE.emerald })}
    ${titledCard({ x: 710, y: 326, w: 422, h: 120, title: 'Sociological Interpretation', body: enrichment?.whatItMeans ?? 'Institutional accountability, safety, and procedural fairness complement ethical norms.', accent: PALETTE.blue })}
    ${titledCard({ x: 710, y: 460, w: 422, h: 120, title: 'Limitations &amp; Safeguarding', body: lim, accent: PALETTE.rust })}
    ${keyTakeawayStrip([
      { label: 'Social Ethics Takeaway', detail: enrichment?.takeaway ?? finding, color: PALETTE.emerald },
      { label: 'Framework Scope', detail: `Evidence Grade ${entry.evidence_grade} · Conceptual social &amp; ethical model (OECD / UN / WHO context).`, color: PALETTE.gold },
    ], 624)}
  `;

  return buildPlateShell({
    title,
    subtitle: wrapLines(subtitle, 108, 1)[0],
    figureCode: id,
    discipline: 'Chapter 10 · Social Life, Ethics &amp; Society',
    bodySvg,
    footerNote: `Conceptual Social & Ethical Model ${id} · Science of Creation Encyclopedia · Institutional Reference Context`,
    accentColor: PALETTE.emerald,
  });
}
