import fs from 'node:fs';
import path from 'node:path';
import { Resvg } from '@resvg/resvg-js';
import sharp from 'sharp';

export const PLATE_WIDTH = 1200;
export const PLATE_HEIGHT = 896;

export const PALETTE = {
  paper: '#F4EFE3',
  paperWarm: '#EDE5D3',
  paperCard: '#FAF6EC',
  ink: '#1E2421',
  inkMuted: '#4A544F',
  emerald: '#0D3B2E',
  emeraldMid: '#1D634F',
  emeraldLight: '#D7EAE2',
  gold: '#9E7828',
  goldLight: '#F3E5C0',
  slate: '#2F4858',
  blue: '#2B6CB0',
  blueLight: '#DCEAF7',
  cyan: '#1B7F8E',
  cyanLight: '#D4EFF2',
  teal: '#1F6F66',
  ochre: '#B87A28',
  ochreLight: '#F7E7CA',
  rust: '#9E422B',
  rustLight: '#F5DCD4',
  plum: '#613F75',
  plumLight: '#EADFF2',
  olive: '#4B6B38',
  oliveLight: '#DFEAD5',
  border: '#B8AD96',
};

export function escXml(text: string): string {
  return text
    .replace(/&amp;/gi, '&')
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/&quot;/gi, '"')
    .replace(/&apos;/gi, "'")
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export function wrapLines(text: string, maxChars: number, maxLines = 4): string[] {
  const words = text.replace(/\s+/g, ' ').trim().split(' ').filter(Boolean);
  const lines: string[] = [];
  let current = '';
  let truncated = false;

  for (let i = 0; i < words.length; i++) {
    const w = words[i];
    if (!current) {
      current = w;
    } else if ((current + ' ' + w).length <= maxChars) {
      current += ' ' + w;
    } else {
      lines.push(current);
      if (lines.length >= maxLines) {
        current = '';
        truncated = true;
        break;
      }
      current = w;
    }
  }
  if (current && lines.length < maxLines) {
    lines.push(current);
  } else if (current) {
    truncated = true;
  }

  if (truncated && lines.length > 0) {
    const lastIdx = lines.length - 1;
    let last = lines[lastIdx];
    while (last.length > maxChars - 1 && last.includes(' ')) {
      last = last.slice(0, last.lastIndexOf(' '));
    }
    lines[lastIdx] = last.replace(/[.,;:\-—]+$/, '') + '…';
  }
  return lines;
}

export function renderSvgTextLines(
  lines: string[],
  x: number,
  y: number,
  lineHeight: number,
  attrs: {
    fontSize?: number;
    fontWeight?: string | number;
    fill?: string;
    anchor?: 'start' | 'middle' | 'end';
    fontFamily?: string;
    letterSpacing?: string;
    fontStyle?: 'normal' | 'italic';
  } = {}
): string {
  const {
    fontSize = 15,
    fontWeight = 500,
    fill = PALETTE.ink,
    anchor = 'start',
    fontFamily = 'Noto Sans, DejaVu Sans, sans-serif',
    letterSpacing,
    fontStyle = 'normal',
  } = attrs;

  return lines
    .map((line, i) => {
      const ls = letterSpacing ? ` letter-spacing="${letterSpacing}"` : '';
      return `<text x="${x}" y="${y + i * lineHeight}" font-family="${fontFamily}" font-size="${fontSize}" font-weight="${fontWeight}" font-style="${fontStyle}" fill="${fill}" text-anchor="${anchor}"${ls}>${escXml(line)}</text>`;
    })
    .join('\n');
}

export function buildPlateShell(params: {
  title: string;
  subtitle?: string;
  figureCode: string;
  discipline: string;
  bodySvg: string;
  footerNote?: string;
  accentColor?: string;
  darkCanvas?: boolean;
}): string {
  const {
    title,
    subtitle,
    figureCode,
    discipline,
    bodySvg,
    footerNote,
    accentColor = PALETTE.emerald,
    darkCanvas = false,
  } = params;

  const titleLines = wrapLines(title.toUpperCase(), 54, 2);
  const titleFontSize = titleLines.length > 1 ? 22 : 26;
  const hasTwoTitles = titleLines.length > 1;
  const headerBottom = subtitle
    ? hasTwoTitles
      ? 128
      : 112
    : hasTwoTitles
    ? 108
    : 92;
  const bgFill = darkCanvas ? '#0D1726' : PALETTE.paper;

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${PLATE_WIDTH}" height="${PLATE_HEIGHT}" viewBox="0 0 ${PLATE_WIDTH} ${PLATE_HEIGHT}">
  <defs>
    <marker id="arrow-ink" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
      <path d="M 0 1.5 L 9 5 L 0 8.5 z" fill="${PALETTE.ink}" />
    </marker>
    <marker id="arrow-emerald" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
      <path d="M 0 1.5 L 9 5 L 0 8.5 z" fill="${PALETTE.emerald}" />
    </marker>
    <marker id="arrow-gold" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
      <path d="M 0 1.5 L 9 5 L 0 8.5 z" fill="${PALETTE.gold}" />
    </marker>
    <marker id="arrow-blue" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
      <path d="M 0 1.5 L 9 5 L 0 8.5 z" fill="${PALETTE.blue}" />
    </marker>
    <marker id="arrow-rust" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
      <path d="M 0 1.5 L 9 5 L 0 8.5 z" fill="${PALETTE.rust}" />
    </marker>
  </defs>

  <!-- Parchment Plate Surface -->
  <rect x="0" y="0" width="${PLATE_WIDTH}" height="${PLATE_HEIGHT}" fill="${PALETTE.paper}" />
  <rect x="20" y="20" width="${PLATE_WIDTH - 40}" height="${PLATE_HEIGHT - 40}" fill="${bgFill}" stroke="${PALETTE.gold}" stroke-width="1.5" stroke-opacity="0.72" />
  <rect x="26" y="26" width="${PLATE_WIDTH - 52}" height="${PLATE_HEIGHT - 52}" fill="none" stroke="${PALETTE.border}" stroke-width="0.8" />

  <!-- Top Header Band -->
  ${darkCanvas ? `<rect x="20" y="20" width="${PLATE_WIDTH - 40}" height="${headerBottom - 20}" fill="${PALETTE.paper}" />` : ''}
  <rect x="40" y="38" width="110" height="22" rx="3" fill="${accentColor}" />
  <text x="95" y="53" font-family="Noto Sans, DejaVu Sans, sans-serif" font-size="11.5" font-weight="700" fill="#F5E9C8" text-anchor="middle" letter-spacing="1.4">${escXml(figureCode)}</text>
  <text x="162" y="53" font-family="Noto Sans, DejaVu Sans, sans-serif" font-size="11.5" font-weight="600" fill="${PALETTE.gold}" letter-spacing="1.6">${escXml(discipline.toUpperCase())}</text>

  ${renderSvgTextLines(titleLines, PLATE_WIDTH / 2, hasTwoTitles ? 76 : 82, 26, {
    fontFamily: 'Liberation Serif, DejaVu Serif, serif',
    fontSize: titleFontSize,
    fontWeight: 700,
    fill: PALETTE.ink,
    anchor: 'middle',
    letterSpacing: '0.5',
  })}
  ${
    subtitle
      ? `<text x="${PLATE_WIDTH / 2}" y="${hasTwoTitles ? 120 : 106}" font-family="Noto Sans, DejaVu Sans, sans-serif" font-size="13" font-weight="500" fill="${PALETTE.inkMuted}" text-anchor="middle">${escXml(subtitle)}</text>`
      : ''
  }
  <line x1="44" y1="${headerBottom + 6}" x2="${PLATE_WIDTH - 44}" y2="${headerBottom + 6}" stroke="${PALETTE.gold}" stroke-width="1" stroke-opacity="0.55" />

  <!-- Diagram Workspace -->
  <g id="plate-body">
    ${bodySvg}
  </g>

  ${
    footerNote
      ? `<line x1="44" y1="${PLATE_HEIGHT - 58}" x2="${PLATE_WIDTH - 44}" y2="${PLATE_HEIGHT - 58}" stroke="${PALETTE.border}" stroke-width="0.9" />
         <text x="${PLATE_WIDTH / 2}" y="${PLATE_HEIGHT - 36}" font-family="Noto Sans, DejaVu Sans, sans-serif" font-size="12.5" font-weight="500" fill="${darkCanvas ? '#D7E0EB' : PALETTE.inkMuted}" text-anchor="middle">${escXml(footerNote)}</text>`
      : ''
  }
</svg>`;
}

export async function renderSvgToWebp(svgString: string, outPath: string): Promise<void> {
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  const resvg = new Resvg(svgString, {
    fitTo: { mode: 'width', value: PLATE_WIDTH },
    font: {
      loadSystemFonts: true,
      defaultFontFamily: 'Noto Sans',
      sansSerifFamily: 'Noto Sans',
      serifFamily: 'Liberation Serif',
      monospaceFamily: 'DejaVu Sans Mono',
    },
  });
  const pngBuffer = resvg.render().asPng();
  await sharp(pngBuffer)
    .resize(PLATE_WIDTH, PLATE_HEIGHT, { fit: 'fill' })
    .webp({ quality: 90, effort: 5 })
    .toFile(outPath);
}

export async function svgSnippetToPng(svgSnippet: string, width: number): Promise<Buffer> {
  const resvg = new Resvg(svgSnippet, {
    fitTo: { mode: 'width', value: width },
    font: {
      loadSystemFonts: true,
      defaultFontFamily: 'Noto Sans',
      sansSerifFamily: 'Noto Sans',
      serifFamily: 'Liberation Serif',
    },
  });
  return Buffer.from(resvg.render().asPng());
}
