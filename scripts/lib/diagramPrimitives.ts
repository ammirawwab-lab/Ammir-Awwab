import { escXml, PALETTE, renderSvgTextLines, wrapLines } from './plateRenderer';

export function cardBox(opts: {
  x: number;
  y: number;
  w: number;
  h: number;
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
  rx?: number;
  accentTop?: string;
  accentLeft?: string;
}): string {
  const {
    x,
    y,
    w,
    h,
    fill = PALETTE.paperCard,
    stroke = PALETTE.border,
    strokeWidth = 1.2,
    rx = 6,
    accentTop,
    accentLeft,
  } = opts;
  let out = `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" fill="${fill}" stroke="${stroke}" stroke-width="${strokeWidth}" />`;
  if (accentTop) {
    out += `<path d="M ${x + rx} ${y} L ${x + w - rx} ${y} Q ${x + w} ${y} ${x + w} ${y + rx} L ${x + w} ${y + 30} L ${x} ${y + 30} L ${x} ${y + rx} Q ${x} ${y} ${x + rx} ${y} Z" fill="${accentTop}" />`;
  }
  if (accentLeft) {
    out += `<rect x="${x}" y="${y}" width="7" height="${h}" rx="2" fill="${accentLeft}" />`;
  }
  return out;
}

export function titledCard(opts: {
  x: number;
  y: number;
  w: number;
  h: number;
  title: string;
  body: string;
  badge?: string;
  accent?: string;
  fill?: string;
}): string {
  const {
    x,
    y,
    w,
    h,
    title,
    body,
    badge,
    accent = PALETTE.emerald,
    fill = PALETTE.paperCard,
  } = opts;
  const maxCharsTitle = Math.max(16, Math.floor((w - 34) / 8.0));
  const maxCharsBody = Math.max(20, Math.floor((w - 34) / 6.7));
  const titleLines = wrapLines(title, maxCharsTitle, 2);
  const titleY = badge ? y + 46 : y + 26;
  const bodyY = titleY + titleLines.length * 18 + 6;
  const availBodyH = Math.max(32, y + h - bodyY - 8);
  const maxBodyLines = Math.max(2, Math.floor(availBodyH / 16.5));
  const bodyLines = wrapLines(body, maxCharsBody, maxBodyLines);

  return `
  ${cardBox({ x, y, w, h, fill, stroke: accent, strokeWidth: 1.2, accentLeft: accent })}
  ${badge ? `<rect x="${x + 18}" y="${y + 11}" width="${Math.min(w - 36, badge.length * 7.8 + 18)}" height="20" rx="3" fill="${accent}" fill-opacity="0.14" /><text x="${x + 26}" y="${y + 25}" font-family="Noto Sans, sans-serif" font-size="10.5" font-weight="700" fill="${accent}" letter-spacing="0.9">${escXml(badge.toUpperCase())}</text>` : ''}
  ${renderSvgTextLines(titleLines, x + 18, titleY, 18, { fontSize: 14.5, fontWeight: 700, fill: PALETTE.ink })}
  ${renderSvgTextLines(bodyLines, x + 18, bodyY, 16.5, { fontSize: 12.8, fontWeight: 400, fill: PALETTE.inkMuted })}
  `;
}

export function cloudShape(
  cx: number,
  cy: number,
  scale = 1,
  fill = '#F8FAFC',
  stroke = '#6B7C8C',
  darkBottom = false
): string {
  const s = scale;
  const d = `M ${cx - 72 * s} ${cy + 20 * s}
    C ${cx - 95 * s} ${cy + 20 * s}, ${cx - 102 * s} ${cy - 8 * s}, ${cx - 75 * s} ${cy - 18 * s}
    C ${cx - 78 * s} ${cy - 52 * s}, ${cx - 32 * s} ${cy - 68 * s}, ${cx - 6 * s} ${cy - 44 * s}
    C ${cx + 10 * s} ${cy - 74 * s}, ${cx + 66 * s} ${cy - 64 * s}, ${cx + 68 * s} ${cy - 26 * s}
    C ${cx + 98 * s} ${cy - 22 * s}, ${cx + 104 * s} ${cy + 20 * s}, ${cx + 70 * s} ${cy + 20 * s} Z`;
  return darkBottom
    ? `<path d="${d}" fill="${fill}" stroke="${stroke}" stroke-width="1.8" />
       <path d="M ${cx - 72 * s} ${cy + 10 * s} Q ${cx} ${cy + 14 * s} ${cx + 70 * s} ${cy + 10 * s} L ${cx + 70 * s} ${cy + 20 * s} L ${cx - 72 * s} ${cy + 20 * s} Z" fill="#8B9AAD" fill-opacity="0.45" />`
    : `<path d="${d}" fill="${fill}" stroke="${stroke}" stroke-width="1.8" />`;
}

export function anvilCumulonimbus(x: number, y: number, w: number, h: number): string {
  // Iconic anvil storm cloud silhouette inside (x, y, w, h)
  const bx = x + w * 0.25;
  const bw = w * 0.5;
  const midY = y + h * 0.35;
  const topY = y + h * 0.08;
  const baseY = y + h * 0.88;
  return `
    <path d="M ${bx} ${baseY}
      L ${bx + bw * 0.1} ${midY}
      C ${x + w * 0.05} ${y + h * 0.28}, ${x + w * 0.04} ${topY}, ${x + w * 0.32} ${topY}
      L ${x + w * 0.86} ${topY}
      C ${x + w * 0.99} ${topY}, ${x + w * 0.95} ${midY}, ${bx + bw * 0.88} ${midY}
      L ${bx + bw} ${baseY} Z"
      fill="#DCE4EC" stroke="#4F6375" stroke-width="2" />
    <path d="M ${bx + 4} ${baseY - 22} L ${bx + bw - 4} ${baseY - 22} L ${bx + bw} ${baseY} L ${bx} ${baseY} Z" fill="#6F8294" fill-opacity="0.65" />
    <path d="M ${x + w * 0.35} ${topY + 4} L ${x + w * 0.84} ${topY + 4} L ${x + w * 0.78} ${topY + 26} L ${x + w * 0.4} ${topY + 26} Z" fill="#EEF4FA" fill-opacity="0.8" />
  `;
}

export function lightningBolt(x1: number, y1: number, x2: number, y2: number, stroke = '#E3A420', width = 3.5): string {
  const mx1 = x1 + (x2 - x1) * 0.35 - 16;
  const my1 = y1 + (y2 - y1) * 0.32;
  const mx2 = x1 + (x2 - x1) * 0.45 + 14;
  const my2 = y1 + (y2 - y1) * 0.56;
  const mx3 = x1 + (x2 - x1) * 0.72 - 12;
  const my3 = y1 + (y2 - y1) * 0.76;
  return `<polyline points="${x1},${y1} ${mx1},${my1} ${mx2},${my2} ${mx3},${my3} ${x2},${y2}" fill="none" stroke="#FFF6C9" stroke-width="${width + 3}" stroke-linecap="round" stroke-linejoin="round" opacity="0.6" />
  <polyline points="${x1},${y1} ${mx1},${my1} ${mx2},${my2} ${mx3},${my3} ${x2},${y2}" fill="none" stroke="${stroke}" stroke-width="${width}" stroke-linecap="round" stroke-linejoin="round" />`;
}

export function rainDrops(x: number, y: number, w: number, h: number, cols = 6, rows = 3, color = '#2B6CB0'): string {
  let out = '';
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const dx = x + (c + (r % 2) * 0.45) * (w / cols);
      const dy = y + r * (h / rows);
      out += `<line x1="${dx.toFixed(1)}" y1="${dy.toFixed(1)}" x2="${(dx - 5).toFixed(1)}" y2="${(dy + 13).toFixed(1)}" stroke="${color}" stroke-width="1.9" stroke-linecap="round" opacity="0.82" />`;
    }
  }
  return out;
}

export function flowArrow(x1: number, y1: number, x2: number, y2: number, color = PALETTE.emerald, width = 2.4, dashed = false): string {
  const marker =
    color === PALETTE.gold
      ? 'url(#arrow-gold)'
      : color === PALETTE.blue || color === PALETTE.cyan
      ? 'url(#arrow-blue)'
      : color === PALETTE.rust
      ? 'url(#arrow-rust)'
      : color === PALETTE.ink
      ? 'url(#arrow-ink)'
      : 'url(#arrow-emerald)';
  const d = dashed ? ' stroke-dasharray="6 4"' : '';
  return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${color}" stroke-width="${width}"${d} marker-end="${marker}" />`;
}

export function curvedArrow(d: string, color = PALETTE.emerald, width = 2.4, dashed = false): string {
  const marker =
    color === PALETTE.gold
      ? 'url(#arrow-gold)'
      : color === PALETTE.blue || color === PALETTE.cyan
      ? 'url(#arrow-blue)'
      : color === PALETTE.rust
      ? 'url(#arrow-rust)'
      : color === PALETTE.ink
      ? 'url(#arrow-ink)'
      : 'url(#arrow-emerald)';
  const ds = dashed ? ' stroke-dasharray="6 4"' : '';
  return `<path d="${d}" fill="none" stroke="${color}" stroke-width="${width}"${ds} marker-end="${marker}" />`;
}

export function calloutTag(x: number, y: number, text: string, color = PALETTE.ink, bg = PALETTE.paperCard, stroke = PALETTE.border, anchor: 'start' | 'middle' | 'end' = 'middle'): string {
  const w = Math.max(76, text.length * 7.6 + 20);
  const rx = anchor === 'start' ? x : anchor === 'end' ? x - w : x - w / 2;
  const tx = rx + w / 2;
  return `<rect x="${rx.toFixed(1)}" y="${y - 18}" width="${w.toFixed(1)}" height="24" rx="4" fill="${bg}" stroke="${stroke}" stroke-width="1" />
  <text x="${tx.toFixed(1)}" y="${y - 2}" font-family="Noto Sans, sans-serif" font-size="12" font-weight="600" fill="${color}" text-anchor="middle">${escXml(text)}</text>`;
}

export function soilCutaway(x: number, y: number, w: number, h: number, wet = true): string {
  const topH = h * 0.26;
  const subH = h * 0.36;
  const bedH = h - topH - subH;
  return `
    <rect x="${x}" y="${y}" width="${w}" height="${topH}" fill="${wet ? '#5C4430' : '#9E825E'}" />
    <rect x="${x}" y="${y + topH}" width="${w}" height="${subH}" fill="${wet ? '#846548' : '#C2A882'}" />
    <rect x="${x}" y="${y + topH + subH}" width="${w}" height="${bedH}" fill="#91948E" />
    <line x1="${x}" y1="${y}" x2="${x + w}" y2="${y}" stroke="${wet ? '#3D6B35' : '#8B7148'}" stroke-width="4" />
    <rect x="${x}" y="${y}" width="${w}" height="${h}" fill="none" stroke="${PALETTE.ink}" stroke-opacity="0.35" stroke-width="1.2" />
  `;
}

export function scaleBar(x: number, y: number, w: number, ticks: string[], title: string, accent = PALETTE.emerald): string {
  const step = w / Math.max(1, ticks.length - 1);
  let out = `<text x="${x}" y="${y - 10}" font-family="Noto Sans, sans-serif" font-size="12.5" font-weight="700" fill="${PALETTE.ink}">${escXml(title)}</text>`;
  out += `<line x1="${x}" y1="${y + 8}" x2="${x + w}" y2="${y + 8}" stroke="${accent}" stroke-width="2.5" />`;
  ticks.forEach((t, i) => {
    const tx = x + i * step;
    out += `<line x1="${tx.toFixed(1)}" y1="${y + 2}" x2="${tx.toFixed(1)}" y2="${y + 14}" stroke="${accent}" stroke-width="2" />`;
    out += `<text x="${tx.toFixed(1)}" y="${y + 30}" font-family="Noto Sans, sans-serif" font-size="11.5" font-weight="600" fill="${PALETTE.inkMuted}" text-anchor="middle">${escXml(t)}</text>`;
  });
  return out;
}

export function balanceScaleSvg(cx: number, cy: number, tiltDeg = 0, leftLabel = '', rightLabel = '', fulcrumLabel = '', color = PALETTE.emerald): string {
  return `
    <g transform="translate(${cx}, ${cy})">
      <polygon points="0,0 -26,76 26,76" fill="${color}" fill-opacity="0.9" stroke="${PALETTE.gold}" stroke-width="1.5" />
      <rect x="-64" y="76" width="128" height="12" rx="3" fill="${PALETTE.slate}" />
      ${fulcrumLabel ? `<text x="0" y="106" font-family="Noto Sans, sans-serif" font-size="12.5" font-weight="700" fill="${PALETTE.ink}" text-anchor="middle">${escXml(fulcrumLabel)}</text>` : ''}
      <g transform="rotate(${tiltDeg})">
        <line x1="-155" y1="0" x2="155" y2="0" stroke="${PALETTE.gold}" stroke-width="5" stroke-linecap="round" />
        <circle cx="0" cy="0" r="8" fill="${PALETTE.gold}" stroke="${PALETTE.ink}" stroke-width="1.5" />
        <!-- Left pan -->
        <line x1="-145" y1="0" x2="-170" y2="54" stroke="${PALETTE.inkMuted}" stroke-width="1.5" />
        <line x1="-145" y1="0" x2="-120" y2="54" stroke="${PALETTE.inkMuted}" stroke-width="1.5" />
        <path d="M -182 54 Q -145 72 -108 54 Z" fill="${PALETTE.goldLight}" stroke="${PALETTE.gold}" stroke-width="1.5" />
        ${leftLabel ? `<text x="-145" y="42" font-family="Noto Sans, sans-serif" font-size="12.5" font-weight="700" fill="${PALETTE.ink}" text-anchor="middle">${escXml(leftLabel)}</text>` : ''}
        <!-- Right pan -->
        <line x1="145" y1="0" x2="120" y2="54" stroke="${PALETTE.inkMuted}" stroke-width="1.5" />
        <line x1="145" y1="0" x2="170" y2="54" stroke="${PALETTE.inkMuted}" stroke-width="1.5" />
        <path d="M 108 54 Q 145 72 182 54 Z" fill="${PALETTE.goldLight}" stroke="${PALETTE.gold}" stroke-width="1.5" />
        ${rightLabel ? `<text x="145" y="42" font-family="Noto Sans, sans-serif" font-size="12.5" font-weight="700" fill="${PALETTE.ink}" text-anchor="middle">${escXml(rightLabel)}</text>` : ''}
      </g>
    </g>
  `;
}

export function cycleNodeRing(
  cx: number,
  cy: number,
  r: number,
  nodes: { label: string; sub?: string; color?: string }[]
): string {
  const n = nodes.length;
  let out = `<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${PALETTE.gold}" stroke-width="2" stroke-dasharray="6 5" stroke-opacity="0.7" />`;
  out += `<circle cx="${cx}" cy="${cy}" r="${Math.max(46, Math.round(r * 0.42))}" fill="${PALETTE.paper}" stroke="${PALETTE.gold}" stroke-opacity="0.45" stroke-width="1.2" />`;
  nodes.forEach((node, i) => {
    const angle = (-Math.PI / 2) + (i * 2 * Math.PI) / n;
    const nextAngle = (-Math.PI / 2) + ((i + 0.5) * 2 * Math.PI) / n;
    const nx = cx + r * Math.cos(angle);
    const ny = cy + r * Math.sin(angle);
    const col = node.color ?? PALETTE.emerald;
    const maxNodeText = Math.max(node.label.length, (node.sub?.length ?? 0) * 0.85);
    const bw = n <= 4 ? (maxNodeText > 19 ? 186 : 156) : 162;
    const bh = node.sub ? 62 : 42;
    out += cardBox({ x: nx - bw / 2, y: ny - bh / 2, w: bw, h: bh, stroke: col, strokeWidth: 1.5, accentLeft: col });
    out += `<text x="${nx + 4}" y="${ny - (node.sub ? 6 : -4)}" font-family="Noto Sans, sans-serif" font-size="12.5" font-weight="700" fill="${PALETTE.ink}" text-anchor="middle">${escXml(node.label)}</text>`;
    if (node.sub) {
      out += `<text x="${nx + 4}" y="${ny + 13}" font-family="Noto Sans, sans-serif" font-size="11" fill="${PALETTE.inkMuted}" text-anchor="middle">${escXml(node.sub)}</text>`;
    }
    const ax = cx + (r + 16) * Math.cos(nextAngle);
    const ay = cy + (r + 16) * Math.sin(nextAngle);
    const deg = (nextAngle * 180) / Math.PI + 90;
    out += `<polygon points="0,-6 6,6 -6,6" fill="${PALETTE.gold}" transform="translate(${ax.toFixed(1)}, ${ay.toFixed(1)}) rotate(${deg.toFixed(1)})" />`;
  });
  return out;
}

export function chartAxes(opts: {
  x: number;
  y: number;
  w: number;
  h: number;
  xLabel: string;
  yLabel: string;
  xTicks: string[];
  yTicks: string[];
  yLabelOffset?: number;
}): string {
  const { x, y, w, h, xLabel, yLabel, xTicks, yTicks, yLabelOffset = 52 } = opts;
  let out = `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${PALETTE.paperCard}" stroke="${PALETTE.border}" stroke-width="1" />`;
  // horizontal gridlines
  yTicks.forEach((lbl, i) => {
    const py = y + h - (i / Math.max(1, yTicks.length - 1)) * h;
    out += `<line x1="${x}" y1="${py.toFixed(1)}" x2="${x + w}" y2="${py.toFixed(1)}" stroke="${PALETTE.border}" stroke-opacity="0.45" stroke-dasharray="3 3" />`;
    out += `<text x="${x - 10}" y="${(py + 4).toFixed(1)}" font-family="Noto Sans, sans-serif" font-size="11.5" font-weight="600" fill="${PALETTE.inkMuted}" text-anchor="end">${escXml(lbl)}</text>`;
  });
  xTicks.forEach((lbl, i) => {
    const px = x + (i / Math.max(1, xTicks.length - 1)) * w;
    out += `<line x1="${px.toFixed(1)}" y1="${y}" x2="${px.toFixed(1)}" y2="${y + h}" stroke="${PALETTE.border}" stroke-opacity="0.35" stroke-dasharray="3 3" />`;
    out += `<text x="${px.toFixed(1)}" y="${y + h + 20}" font-family="Noto Sans, sans-serif" font-size="11.5" font-weight="600" fill="${PALETTE.inkMuted}" text-anchor="middle">${escXml(lbl)}</text>`;
  });
  out += `<line x1="${x}" y1="${y}" x2="${x}" y2="${y + h}" stroke="${PALETTE.ink}" stroke-width="2" />`;
  out += `<line x1="${x}" y1="${y + h}" x2="${x + w}" y2="${y + h}" stroke="${PALETTE.ink}" stroke-width="2" />`;
  out += `<text x="${x + w / 2}" y="${y + h + 44}" font-family="Noto Sans, sans-serif" font-size="13" font-weight="700" fill="${PALETTE.ink}" text-anchor="middle">${escXml(xLabel)}</text>`;
  out += `<text x="${x - yLabelOffset}" y="${y + h / 2}" font-family="Noto Sans, sans-serif" font-size="13" font-weight="700" fill="${PALETTE.ink}" text-anchor="middle" transform="rotate(-90 ${x - yLabelOffset} ${y + h / 2})">${escXml(yLabel)}</text>`;
  return out;
}

export function leafShape(x: number, y: number, w: number, h: number, fill = '#4F8A45', stroke = '#2D5927'): string {
  return `
    <path d="M ${x} ${y + h / 2} Q ${x + w * 0.45} ${y - h * 0.35} ${x + w} ${y + h / 2} Q ${x + w * 0.45} ${y + h * 1.35} ${x} ${y + h / 2} Z" fill="${fill}" stroke="${stroke}" stroke-width="1.8" />
    <line x1="${x + 4}" y1="${y + h / 2}" x2="${x + w - 8}" y2="${y + h / 2}" stroke="${stroke}" stroke-width="1.5" />
    <line x1="${x + w * 0.32}" y1="${y + h / 2}" x2="${x + w * 0.48}" y2="${y + h * 0.25}" stroke="${stroke}" stroke-width="1.1" />
    <line x1="${x + w * 0.56}" y1="${y + h / 2}" x2="${x + w * 0.72}" y2="${y + h * 0.28}" stroke="${stroke}" stroke-width="1.1" />
    <line x1="${x + w * 0.34}" y1="${y + h / 2}" x2="${x + w * 0.5}" y2="${y + h * 0.75}" stroke="${stroke}" stroke-width="1.1" />
    <line x1="${x + w * 0.58}" y1="${y + h / 2}" x2="${x + w * 0.74}" y2="${y + h * 0.72}" stroke="${stroke}" stroke-width="1.1" />
  `;
}

export function hexagonCell(cx: number, cy: number, r: number, fill = '#F7E19C', stroke = '#A67C23'): string {
  const pts: string[] = [];
  for (let i = 0; i < 6; i++) {
    const a = (Math.PI / 3) * i + Math.PI / 6;
    pts.push(`${(cx + r * Math.cos(a)).toFixed(1)},${(cy + r * Math.sin(a)).toFixed(1)}`);
  }
  return `<polygon points="${pts.join(' ')}" fill="${fill}" stroke="${stroke}" stroke-width="1.6" />`;
}

export function keyTakeawayStrip(items: { label: string; detail: string; color?: string }[], y = 622): string {
  const n = items.length;
  const totalW = 1096;
  const gap = 16;
  const w = (totalW - gap * (n - 1)) / n;
  const cardH = Math.min(188, Math.max(118, 822 - y));
  return items
    .map((item, i) => {
      const x = 52 + i * (w + gap);
      return titledCard({
        x,
        y,
        w,
        h: cardH,
        title: item.label,
        body: item.detail,
        accent: item.color ?? PALETTE.emerald,
      });
    })
    .join('\n');
}
