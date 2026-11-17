import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';
import {
  escXml,
  PALETTE,
  PLATE_HEIGHT,
  PLATE_WIDTH,
  renderSvgToWebp,
  svgSnippetToPng,
} from './lib/plateRenderer';

function buildCos013Svg(): string {
  const cx = 600;
  const cy = 415;
  const outerR = 305; // corresponds to Dec = -30° (polar distance 120° from NCP)
  // Linear polar equidistant projection: r(dec) = (90 - dec) / 120 * outerR
  const decToR = (dec: number) => ((90 - dec) / 120) * outerR;
  // Angle helper: 0h at right (0 rad), going counter-clockwise as viewed facing north sky (or clockwise — let's use standard right-hand sky map: 0h at top/right, strictly ordered 0h,1h,...,23h)
  // Putting 0h at 3 o'clock (0 deg) and incrementing counter-clockwise matches mathematical RA right-handedness (0h -> 6h top -> 12h left -> 18h bottom)
  const raDegToPoint = (raHours: number, dec: number) => {
    const r = decToR(dec);
    const theta = (-raHours * 15 * Math.PI) / 180;
    return {
      x: cx + r * Math.cos(theta),
      y: cy + r * Math.sin(theta),
    };
  };

  // Declination circles (+60, +30, 0 Celestial Equator, -30 rim)
  const decRings = [60, 30, 0, -30];
  const ringsSvg = decRings
    .map((dec) => {
      const r = decToR(dec);
      const isEq = dec === 0;
      const stroke = isEq ? '#D4B46A' : '#4C6482';
      const sw = isEq ? 1.8 : 0.9;
      const dash = dec === 60 || dec === 30 ? ' stroke-dasharray="4 4"' : '';
      return `<circle cx="${cx}" cy="${cy}" r="${r.toFixed(1)}" fill="none" stroke="${stroke}" stroke-width="${sw}" stroke-opacity="${isEq ? 0.9 : 0.55}"${dash} />`;
    })
    .join('\n');

  // RA hour radial spokes & 15-minute minor rim ticks
  let spokesSvg = '';
  for (let h = 0; h < 24; h++) {
    const theta = (-h * 15 * Math.PI) / 180;
    const x1 = cx + decToR(75) * Math.cos(theta);
    const y1 = cy + decToR(75) * Math.sin(theta);
    const x2 = cx + outerR * Math.cos(theta);
    const y2 = cy + outerR * Math.sin(theta);
    const isMajor = h % 6 === 0;
    spokesSvg += `<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" stroke="${isMajor ? '#D4B46A' : '#3C536E'}" stroke-width="${isMajor ? 1.4 : 0.8}" stroke-opacity="${isMajor ? 0.8 : 0.45}" />\n`;

    // RA hour label around outside of dial (every hour 0h..23h clearly ordered!)
    const lx = cx + (outerR + 22) * Math.cos(theta);
    const ly = cy + (outerR + 22) * Math.sin(theta) + 4.5;
    spokesSvg += `<text x="${lx.toFixed(1)}" y="${ly.toFixed(1)}" font-family="Noto Sans, DejaVu Sans, sans-serif" font-size="${h % 2 === 0 ? 12.5 : 10.5}" font-weight="${h % 6 === 0 ? 700 : 500}" fill="${h % 6 === 0 ? '#F2DFA8' : '#A9BDD4'}" text-anchor="middle">${h}h</text>\n`;

    // 4 sub-ticks per hour around outer rim
    for (let s = 1; s <= 3; s++) {
      const subTheta = (-(h + s * 0.25) * 15 * Math.PI) / 180;
      const tx1 = cx + (outerR - 4) * Math.cos(subTheta);
      const ty1 = cy + (outerR - 4) * Math.sin(subTheta);
      const tx2 = cx + outerR * Math.cos(subTheta);
      const ty2 = cy + outerR * Math.sin(subTheta);
      spokesSvg += `<line x1="${tx1.toFixed(1)}" y1="${ty1.toFixed(1)}" x2="${tx2.toFixed(1)}" y2="${ty2.toFixed(1)}" stroke="#D4B46A" stroke-width="0.9" stroke-opacity="0.6" />`;
    }
  }

  // Ecliptic curve: tan(dec) = tan(23.44°) * sin(RA * 15°)
  const epsRad = (23.44 * Math.PI) / 180;
  const eclipticPts: string[] = [];
  for (let deg = 0; deg <= 360; deg += 4) {
    const raRad = (deg * Math.PI) / 180;
    const decDeg = (Math.atan(Math.tan(epsRad) * Math.sin(raRad)) * 180) / Math.PI;
    const pt = raDegToPoint(deg / 15, decDeg);
    eclipticPts.push(`${pt.x.toFixed(1)},${pt.y.toFixed(1)}`);
  }

  // Declination scale labels along clean 3h spoke (upper right, away from constellations)
  const decLabels = [
    { dec: 60, text: '+60°' },
    { dec: 30, text: '+30°' },
    { dec: 0, text: '0° Equator' },
    { dec: -24, text: '−30° Rim' },
  ]
    .map((item) => {
      const pt = raDegToPoint(3, item.dec);
      return `<text x="${(pt.x + 8).toFixed(1)}" y="${(pt.y - 4).toFixed(1)}" font-family="Noto Sans, sans-serif" font-size="11" font-weight="600" fill="${item.dec === 0 ? '#F2DFA8' : '#8BA6C4'}" text-anchor="start">${item.text}</text>`;
    })
    .join('\n');

  // Authentic constellation coordinates (RA hours, Dec deg)
  const constellations: {
    name: string;
    labelAt: [number, number];
    stars: [number, number, number][]; // raH, decDeg, magRadius
    links: [number, number][];
  }[] = [
    {
      name: 'Ursa Minor',
      labelAt: [17.2, 66],
      stars: [
        [2.53, 89.26, 4.4], // Polaris
        [17.54, 86.58, 2.2],
        [16.76, 82.03, 2.3],
        [15.73, 77.79, 2.5],
        [14.85, 74.16, 3.6], // Kochab
        [15.34, 71.83, 3.2], // Pherkad
        [16.29, 75.75, 2.4],
      ],
      links: [
        [0, 1],
        [1, 2],
        [2, 3],
        [3, 4],
        [4, 5],
        [5, 6],
        [6, 3],
      ],
    },
    {
      name: 'Ursa Major',
      labelAt: [12.9, 46],
      stars: [
        [11.06, 61.75, 3.5], // Dubhe
        [11.03, 56.38, 3.1], // Merak
        [11.9, 53.69, 3.0], // Phecda
        [12.26, 57.03, 2.7], // Megrez
        [12.9, 55.96, 3.6], // Alioth
        [13.4, 54.93, 3.2], // Mizar
        [13.79, 49.31, 3.5], // Alkaid
      ],
      links: [
        [0, 1],
        [1, 2],
        [2, 3],
        [3, 0],
        [3, 4],
        [4, 5],
        [5, 6],
      ],
    },
    {
      name: 'Cassiopeia',
      labelAt: [1.1, 66],
      stars: [
        [0.15, 59.15, 3.2],
        [0.67, 56.54, 3.4],
        [0.95, 60.72, 3.3],
        [1.43, 60.24, 3.1],
        [1.91, 63.67, 2.9],
      ],
      links: [
        [0, 1],
        [1, 2],
        [2, 3],
        [3, 4],
      ],
    },
    {
      name: 'Cygnus',
      labelAt: [20.5, 49],
      stars: [
        [20.69, 45.28, 3.9], // Deneb
        [20.37, 40.26, 3.2], // Sadr
        [19.51, 27.96, 3.0], // Albireo
        [19.75, 45.13, 2.9],
        [20.77, 33.97, 3.1],
      ],
      links: [
        [0, 1],
        [1, 2],
        [3, 1],
        [1, 4],
      ],
    },
    {
      name: 'Orion',
      labelAt: [5.5, -14],
      stars: [
        [5.92, 7.41, 4.0], // Betelgeuse
        [5.42, 6.35, 3.4], // Bellatrix
        [5.53, -0.3, 3.1],
        [5.6, -1.2, 3.1],
        [5.68, -1.94, 3.1],
        [5.79, -9.67, 3.3], // Saiph
        [5.24, -8.2, 4.1], // Rigel
      ],
      links: [
        [0, 1],
        [0, 4],
        [1, 2],
        [2, 3],
        [3, 4],
        [2, 6],
        [4, 5],
        [5, 6],
      ],
    },
    {
      name: 'Leo',
      labelAt: [10.4, 28],
      stars: [
        [10.14, 11.97, 3.8], // Regulus
        [10.12, 16.76, 2.7],
        [10.33, 19.84, 3.1], // Algieba
        [10.28, 23.42, 2.6],
        [9.76, 23.77, 2.5],
        [11.24, 20.52, 2.9],
        [11.82, 14.57, 3.3], // Denebola
      ],
      links: [
        [0, 1],
        [1, 2],
        [2, 3],
        [3, 4],
        [2, 5],
        [5, 6],
        [6, 0],
      ],
    },
  ];

  let constSvg = '';
  for (const c of constellations) {
    const pts = c.stars.map(([ra, dec, r]) => ({ ...raDegToPoint(ra, dec), r }));
    for (const [a, b] of c.links) {
      constSvg += `<line x1="${pts[a].x.toFixed(1)}" y1="${pts[a].y.toFixed(1)}" x2="${pts[b].x.toFixed(1)}" y2="${pts[b].y.toFixed(1)}" stroke="#C8A253" stroke-width="1.05" stroke-opacity="0.72" />\n`;
    }
    for (const p of pts) {
      constSvg += `<circle cx="${p.x.toFixed(1)}" cy="${p.y.toFixed(1)}" r="${(p.r + 1.4).toFixed(1)}" fill="#F6E6B4" fill-opacity="0.22" />`;
      constSvg += `<circle cx="${p.x.toFixed(1)}" cy="${p.y.toFixed(1)}" r="${p.r.toFixed(1)}" fill="#FFF9E6" />`;
    }
    const lpt = raDegToPoint(c.labelAt[0], c.labelAt[1]);
    constSvg += `<text x="${lpt.x.toFixed(1)}" y="${(lpt.y - 10).toFixed(1)}" font-family="Noto Sans, sans-serif" font-size="10.5" font-weight="600" fill="#BBD0E8" text-anchor="middle" letter-spacing="0.7">${c.name.toUpperCase()}</text>\n`;
  }

  // Deterministic background starfield inside outerR
  let bgStars = '';
  for (let i = 0; i < 160; i++) {
    const angle = ((i * 137.508) % 360) * (Math.PI / 180);
    const rad = Math.sqrt((i + 0.5) / 160) * (outerR - 8);
    const sx = cx + rad * Math.cos(angle);
    const sy = cy + rad * Math.sin(angle);
    const sr = i % 7 === 0 ? 1.8 : i % 3 === 0 ? 1.3 : 0.9;
    bgStars += `<circle cx="${sx.toFixed(1)}" cy="${sy.toFixed(1)}" r="${sr}" fill="#DCE8F5" fill-opacity="${i % 5 === 0 ? 0.78 : 0.42}" />`;
  }

  const vernal = raDegToPoint(0, 0);
  const autumnal = raDegToPoint(12, 0);
  const solN = raDegToPoint(6, 23.44);

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${PLATE_WIDTH}" height="${PLATE_HEIGHT}" viewBox="0 0 ${PLATE_WIDTH} ${PLATE_HEIGHT}">
  <rect x="0" y="0" width="${PLATE_WIDTH}" height="${PLATE_HEIGHT}" fill="${PALETTE.paper}" />
  <rect x="20" y="20" width="${PLATE_WIDTH - 40}" height="${PLATE_HEIGHT - 40}" fill="${PALETTE.paper}" stroke="${PALETTE.gold}" stroke-width="1.5" />
  <text x="${PLATE_WIDTH / 2}" y="58" font-family="Liberation Serif, DejaVu Serif, serif" font-size="23" font-weight="700" fill="${PALETTE.ink}" text-anchor="middle" letter-spacing="1.2">HEMISPHERIC STAR MAP: RIGHT ASCENSION &amp; DECLINATION COORDINATES</text>

  <!-- Night Sky Celestial Field -->
  <rect x="42" y="76" width="${PLATE_WIDTH - 84}" height="702" fill="#0B192C" stroke="${PALETTE.gold}" stroke-width="1.2" />
  <circle cx="${cx}" cy="${cy}" r="${outerR}" fill="#081322" stroke="#D4B46A" stroke-width="2" />

  ${bgStars}
  ${ringsSvg}
  ${spokesSvg}

  <!-- Ecliptic Apparent Annual Solar Path -->
  <polyline points="${eclipticPts.join(' ')}" fill="none" stroke="#E5C068" stroke-width="1.7" stroke-dasharray="7 5" stroke-opacity="0.92" />
  <text x="${(solN.x + 12).toFixed(1)}" y="${(solN.y - 8).toFixed(1)}" font-family="Noto Sans, sans-serif" font-size="11" font-weight="700" fill="#F2DFA8" letter-spacing="0.8">ECLIPTIC (+23.4° OBLIQUITY)</text>

  ${constSvg}
  ${decLabels}

  <!-- Cardinal Equinox Nodes & NCP -->
  <circle cx="${cx}" cy="${cy}" r="5.5" fill="#FFF7D6" stroke="#D4B46A" stroke-width="1.5" />
  <text x="${cx + 12}" y="${cy - 8}" font-family="Noto Sans, sans-serif" font-size="12" font-weight="700" fill="#FFF7D6">NCP (+90°)</text>

  <circle cx="${vernal.x.toFixed(1)}" cy="${vernal.y.toFixed(1)}" r="4.5" fill="#F2C96B" />
  <text x="${(vernal.x - 10).toFixed(1)}" y="${(vernal.y - 10).toFixed(1)}" font-family="Noto Sans, sans-serif" font-size="10.5" font-weight="700" fill="#F2DFA8" text-anchor="end">VERNAL EQUINOX (0h)</text>

  <circle cx="${autumnal.x.toFixed(1)}" cy="${autumnal.y.toFixed(1)}" r="4.5" fill="#F2C96B" />
  <text x="${(autumnal.x + 10).toFixed(1)}" y="${(autumnal.y - 10).toFixed(1)}" font-family="Noto Sans, sans-serif" font-size="10.5" font-weight="700" fill="#F2DFA8" text-anchor="start">AUTUMNAL EQUINOX (12h)</text>

  <!-- Clean Verified Bottom Legend -->
  <rect x="42" y="790" width="${PLATE_WIDTH - 84}" height="74" fill="${PALETTE.paperCard}" stroke="${PALETTE.border}" stroke-width="1" />
  <g font-family="Noto Sans, sans-serif" fill="${PALETTE.ink}">
    <circle cx="72" cy="816" r="5" fill="#0B192C" stroke="#D4B46A" stroke-width="1.5" />
    <text x="86" y="820" font-size="11.5" font-weight="700">NORTH CELESTIAL POLE (NCP)</text>
    <text x="86" y="838" font-size="10.5" fill="${PALETTE.inkMuted}">Earth's rotational axis (+90° Dec)</text>

    <line x1="305" y1="816" x2="335" y2="816" stroke="#3C536E" stroke-width="2" />
    <text x="344" y="820" font-size="11.5" font-weight="700">RIGHT ASCENSION (0h–23h)</text>
    <text x="344" y="838" font-size="10.5" fill="${PALETTE.inkMuted}">15° sky meridian per hour circle</text>

    <line x1="565" y1="816" x2="595" y2="816" stroke="#D4B46A" stroke-width="2" />
    <text x="604" y="820" font-size="11.5" font-weight="700">CELESTIAL EQUATOR (0° DEC)</text>
    <text x="604" y="838" font-size="10.5" fill="${PALETTE.inkMuted}">Concentric rings from +90° to −30°</text>

    <line x1="848" y1="816" x2="880" y2="816" stroke="#B87A28" stroke-width="2" stroke-dasharray="6 4" />
    <text x="888" y="820" font-size="11.5" font-weight="700">ECLIPTIC &amp; CONSTELLATIONS</text>
    <text x="888" y="838" font-size="10.5" fill="${PALETTE.inkMuted}">Apparent solar path (23.4° tilt)</text>
  </g>
</svg>`;
}

function buildCos049Svg(): string {
  // True uniform linear logarithmic x-axis: log10(years) from -43 to +115
  const xMin = 96;
  const xMax = 1126;
  const expMin = -43;
  const expMax = 115;
  const mapX = (exp: number) => xMin + ((exp - expMin) / (expMax - expMin)) * (xMax - xMin);

  const eras = [
    {
      name: 'PRIMORDIAL ERA',
      sub: 'Big Bang, Nucleosynthesis, CMB & Dark Ages (<10⁵ yr)',
      start: -43,
      end: 5.5,
      y: 165,
      h: 92,
      head: '#1E5288',
      fill: '#C4D4E4',
      labelAtRight: true,
    },
    {
      name: 'STELLIFEROUS ERA',
      sub: 'Active Star Formation & Galaxies (10⁶ – 10¹⁴ yr)',
      start: 6,
      end: 14,
      y: 280,
      h: 92,
      head: '#2D8A3E',
      fill: '#C2E0C4',
      labelAtRight: true,
    },
    {
      name: 'DEGENERATE ERA',
      sub: 'White Dwarfs, Neutron Stars & Brown Dwarfs (10¹⁵ – 10³⁷ yr)',
      start: 15,
      end: 37,
      y: 395,
      h: 92,
      head: '#C98316',
      fill: '#F1DAB2',
      labelAtRight: true,
    },
    {
      name: 'BLACK HOLE ERA',
      sub: 'Hawking Radiation & Black Hole Evaporation (10³⁸ – 10¹⁰⁰ yr)',
      start: 38,
      end: 100,
      y: 510,
      h: 92,
      head: '#6B216E',
      fill: '#D7BDD9',
      labelAtRight: false,
    },
    {
      name: 'DARK ERA',
      sub: 'Diffuse Photons, Electrons & Maximum Entropy (>10¹⁰⁰ yr)',
      start: 100,
      end: 114,
      y: 625,
      h: 92,
      head: '#3E4347',
      fill: '#C8CCCC',
      labelAtRight: false,
      openRight: true,
    },
  ];

  // Uniform integer grid ticks every 10 powers of ten + boundary -43, 0, 5, 14, 37, 100
  const majorTicks = [-43, -30, -20, -10, 0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110];
  let gridSvg = '';
  for (const exp of majorTicks) {
    const x = mapX(exp);
    gridSvg += `<line x1="${x.toFixed(1)}" y1="148" x2="${x.toFixed(1)}" y2="758" stroke="#D5CCB8" stroke-width="${exp === 0 ? 1.5 : 0.9}" stroke-dasharray="${exp === 0 ? '4 3' : '2 4'}" />\n`;
    gridSvg += `<line x1="${x.toFixed(1)}" y1="758" x2="${x.toFixed(1)}" y2="767" stroke="${PALETTE.ink}" stroke-width="1.5" />\n`;
    gridSvg += `<text x="${x.toFixed(1)}" y="786" font-family="Noto Sans, sans-serif" font-size="12.5" font-weight="${exp === 0 || exp === 100 ? 700 : 500}" fill="${PALETTE.ink}" text-anchor="middle">${exp}</text>\n`;
  }

  // Exact boundary drop markers
  const boundaries = [
    { exp: 6, label: '10⁶' },
    { exp: 14, label: '10¹⁴' },
    { exp: 38, label: '10³⁸' },
    { exp: 100, label: '10¹⁰⁰' },
  ];
  for (const b of boundaries) {
    const bx = mapX(b.exp);
    gridSvg += `<line x1="${bx.toFixed(1)}" y1="150" x2="${bx.toFixed(1)}" y2="758" stroke="${PALETTE.gold}" stroke-width="1.1" stroke-opacity="0.65" />`;
  }

  let barsSvg = '';
  for (const era of eras) {
    const x1 = mapX(era.start);
    const x2 = mapX(era.end);
    const bw = Math.max(12, x2 - x1);
    const bodyH = era.h;

    barsSvg += `<rect x="${x1.toFixed(1)}" y="${era.y}" width="${bw.toFixed(1)}" height="38" fill="${era.head}" stroke="${PALETTE.ink}" stroke-opacity="0.25" stroke-width="1" />`;
    barsSvg += `<rect x="${x1.toFixed(1)}" y="${era.y + 38}" width="${bw.toFixed(1)}" height="${bodyH - 38}" fill="${era.fill}" stroke="${PALETTE.ink}" stroke-opacity="0.22" stroke-width="1" />`;

    if (era.openRight) {
      barsSvg += `<line x1="${(x2 + 6).toFixed(1)}" y1="${era.y + 45}" x2="${(x2 + 32).toFixed(1)}" y2="${era.y + 45}" stroke="#3E4347" stroke-width="2" stroke-dasharray="4 3" marker-end="url(#arrow-ink)" />`;
    }

    if (bw >= 380) {
      // Wide enough to place crisp centered text inside the bar
      barsSvg += `<text x="${(x1 + bw / 2).toFixed(1)}" y="${era.y + 25}" font-family="Noto Sans, sans-serif" font-size="16" font-weight="700" fill="#FFFFFF" text-anchor="middle" letter-spacing="0.8">${escXml(era.name)}</text>`;
      barsSvg += `<text x="${(x1 + bw / 2).toFixed(1)}" y="${era.y + 68}" font-family="Noto Sans, sans-serif" font-size="13.5" font-weight="600" fill="${PALETTE.ink}" text-anchor="middle">${escXml(era.sub)}</text>`;
    } else if (era.labelAtRight) {
      // Place clean leader line and right-aligned annotation callout for narrow early-cosmos bars so exact mathematical width is preserved!
      const callX = Math.max(x2 + 24, 520);
      barsSvg += `<line x1="${x2.toFixed(1)}" y1="${era.y + 46}" x2="${callX - 10}" y2="${era.y + 46}" stroke="${era.head}" stroke-width="2" />`;
      barsSvg += `<circle cx="${x2.toFixed(1)}" cy="${era.y + 46}" r="3.5" fill="${era.head}" />`;
      barsSvg += `<rect x="${callX}" y="${era.y + 10}" width="510" height="72" rx="4" fill="${PALETTE.paperCard}" stroke="${era.head}" stroke-width="1.4" />`;
      barsSvg += `<rect x="${callX}" y="${era.y + 10}" width="8" height="72" fill="${era.head}" />`;
      barsSvg += `<text x="${callX + 20}" y="${era.y + 38}" font-family="Noto Sans, sans-serif" font-size="15.5" font-weight="700" fill="${era.head}" letter-spacing="0.6">${escXml(era.name)}</text>`;
      barsSvg += `<text x="${callX + 20}" y="${era.y + 62}" font-family="Noto Sans, sans-serif" font-size="13.5" font-weight="500" fill="${PALETTE.ink}">${escXml(era.sub)}</text>`;
    } else {
      // Dark Era bar: place left callout pointing into 10^100+ bar
      const callW = 470;
      const callX = x1 - callW - 24;
      barsSvg += `<line x1="${callX + callW}" y1="${era.y + 46}" x2="${(x1 - 4).toFixed(1)}" y2="${era.y + 46}" stroke="${era.head}" stroke-width="2" />`;
      barsSvg += `<circle cx="${x1.toFixed(1)}" cy="${era.y + 46}" r="3.5" fill="${era.head}" />`;
      barsSvg += `<rect x="${callX}" y="${era.y + 10}" width="${callW}" height="72" rx="4" fill="${PALETTE.paperCard}" stroke="${era.head}" stroke-width="1.4" />`;
      barsSvg += `<text x="${callX + callW - 18}" y="${era.y + 38}" font-family="Noto Sans, sans-serif" font-size="15.5" font-weight="700" fill="${era.head}" text-anchor="end" letter-spacing="0.6">${escXml(era.name)}</text>`;
      barsSvg += `<text x="${callX + callW - 18}" y="${era.y + 62}" font-family="Noto Sans, sans-serif" font-size="13.5" font-weight="500" fill="${PALETTE.ink}" text-anchor="end">${escXml(era.sub)}</text>`;
    }
  }

  // Reference marker for Present Cosmic Epoch (~13.8 Gyr => log10 = 10.14)
  const presentX = mapX(10.14);

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${PLATE_WIDTH}" height="${PLATE_HEIGHT}" viewBox="0 0 ${PLATE_WIDTH} ${PLATE_HEIGHT}">
  <defs>
    <marker id="arrow-ink" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
      <path d="M 0 1.5 L 9 5 L 0 8.5 z" fill="${PALETTE.ink}" />
    </marker>
  </defs>
  <rect x="0" y="0" width="${PLATE_WIDTH}" height="${PLATE_HEIGHT}" fill="${PALETTE.paper}" />
  <rect x="20" y="20" width="${PLATE_WIDTH - 40}" height="${PLATE_HEIGHT - 40}" fill="${PALETTE.paper}" stroke="${PALETTE.gold}" stroke-width="1.5" stroke-opacity="0.7" />
  <text x="${PLATE_WIDTH / 2}" y="68" font-family="Liberation Serif, DejaVu Serif, serif" font-size="27" font-weight="700" fill="${PALETTE.ink}" text-anchor="middle" letter-spacing="0.8">FIVE COSMOLOGICAL ERAS ON A LINEAR LOG₁₀(YEARS) TIMELINE</text>
  <text x="${PLATE_WIDTH / 2}" y="96" font-family="Noto Sans, sans-serif" font-size="14" font-weight="500" fill="${PALETTE.inkMuted}" text-anchor="middle">Each interval of 10 units spans an equal horizontal distance (10¹⁰× factor per grid step)</text>
  <line x1="60" y1="114" x2="${PLATE_WIDTH - 60}" y2="114" stroke="${PALETTE.gold}" stroke-width="1" stroke-opacity="0.55" />

  ${gridSvg}
  ${barsSvg}

  <!-- Present Epoch Pin -->
  <line x1="${presentX.toFixed(1)}" y1="146" x2="${presentX.toFixed(1)}" y2="758" stroke="#9E422B" stroke-width="1.6" stroke-dasharray="5 3" />
  <rect x="${(presentX - 68).toFixed(1)}" y="124" width="136" height="22" rx="3" fill="#9E422B" />
  <text x="${presentX.toFixed(1)}" y="139" font-family="Noto Sans, sans-serif" font-size="11" font-weight="700" fill="#FFFFFF" text-anchor="middle">TODAY (~1.38×10¹⁰ yr)</text>

  <!-- Main Log10 Horizontal Axis -->
  <line x1="${xMin - 24}" y1="758" x2="${xMax + 24}" y2="758" stroke="${PALETTE.ink}" stroke-width="2" />
  <text x="${mapX(0).toFixed(1)}" y="806" font-family="Noto Sans, sans-serif" font-size="12" font-weight="600" fill="${PALETTE.inkMuted}" text-anchor="middle">(1 yr)</text>
  <text x="${mapX(-43).toFixed(1)}" y="806" font-family="Noto Sans, sans-serif" font-size="11" font-weight="600" fill="${PALETTE.inkMuted}" text-anchor="middle">(Planck time)</text>
  <text x="${PLATE_WIDTH / 2}" y="842" font-family="Noto Sans, sans-serif" font-size="17" font-weight="700" fill="${PALETTE.ink}" text-anchor="middle" letter-spacing="1.2">LOG₁₀(COSMIC TIME IN YEARS)</text>
</svg>`;
}

interface PatchBox {
  x: number;
  y: number;
  w: number;
  h: number;
  bg?: string;
  sampleBgAt?: [number, number];
  lines: string[];
  fontSize?: number;
  fontWeight?: number | string;
  color?: string;
  align?: 'left' | 'center' | 'right';
  lineHeight?: number;
  fontFamily?: string;
  rx?: number;
  border?: string;
  rotateDeg?: number;
}

async function sampleRgbHex(srcBuf: Buffer, px: number, py: number): Promise<string> {
  const { data } = await sharp(srcBuf)
    .extract({ left: px, top: py, width: 1, height: 1 })
    .raw()
    .toBuffer({ resolveWithObject: true });
  const r = data[0].toString(16).padStart(2, '0');
  const g = data[1].toString(16).padStart(2, '0');
  const b = data[2].toString(16).padStart(2, '0');
  return `#${r}${g}${b}`;
}

async function applyPatches(relPath: string, boxes: PatchBox[]): Promise<void> {
  const absPath = path.resolve('public/assets/illustrations', relPath);
  const srcBuf = fs.readFileSync(absPath);
  const composites: { input: Buffer; left: number; top: number }[] = [];

  for (const box of boxes) {
    let fill = box.bg;
    if (!fill) {
      const [sx, sy] = box.sampleBgAt ?? [Math.max(0, box.x - 4), Math.max(0, box.y + 4)];
      fill = await sampleRgbHex(srcBuf, sx, sy);
    }
    const fontSize = box.fontSize ?? 16;
    const lineHeight = box.lineHeight ?? Math.round(fontSize * 1.24);
    const fontWeight = box.fontWeight ?? 600;
    const color = box.color ?? '#1E2421';
    const align = box.align ?? 'center';
    const fontFamily = box.fontFamily ?? 'Noto Sans, DejaVu Sans, sans-serif';
    const anchor = align === 'left' ? 'start' : align === 'right' ? 'end' : 'middle';
    const tx = align === 'left' ? 4 : align === 'right' ? box.w - 4 : box.w / 2;
    const totalTextH = (box.lines.length - 1) * lineHeight + fontSize;
    const startY = Math.round((box.h - totalTextH) / 2 + fontSize * 0.82);

    const textElems = box.rotateDeg
      ? `<g transform="rotate(${box.rotateDeg} ${box.w / 2} ${box.h / 2})">${box.lines
          .map((line, idx) => {
            const dy = (idx - (box.lines.length - 1) / 2) * lineHeight;
            return `<text x="${box.w / 2}" y="${box.h / 2 + dy}" font-family="${fontFamily}" font-size="${fontSize}" font-weight="${fontWeight}" fill="${color}" text-anchor="middle" dominant-baseline="central">${escXml(line)}</text>`;
          })
          .join('')}</g>`
      : box.lines
          .map(
            (line, idx) =>
              `<text x="${tx}" y="${startY + idx * lineHeight}" font-family="${fontFamily}" font-size="${fontSize}" font-weight="${fontWeight}" fill="${color}" text-anchor="${anchor}">${escXml(line)}</text>`
          )
          .join('');

    const borderAttr = box.border ? ` stroke="${box.border}" stroke-width="1"` : '';
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${box.w}" height="${box.h}"><rect x="0" y="0" width="${box.w}" height="${box.h}" rx="${box.rx ?? 2}" fill="${fill}"${borderAttr}/>${textElems}</svg>`;
    const png = await svgSnippetToPng(svg, box.w);
    composites.push({ input: png, left: box.x, top: box.y });
  }

  const outBuf = await sharp(srcBuf)
    .composite(composites)
    .webp({ quality: 90, effort: 5 })
    .toBuffer();
  fs.writeFileSync(absPath, outBuf);
}

async function main() {
  const cos013Out = path.resolve(
    'public/assets/illustrations/cosmology/COS-013.webp'
  );
  const cos049Out = path.resolve(
    'public/assets/illustrations/cosmology/COS-049.webp'
  );
  await renderSvgToWebp(buildCos013Svg(), cos013Out);
  await renderSvgToWebp(buildCos049Svg(), cos049Out);
  console.log('Rebuilt COS-013.webp and COS-049.webp');

  await applyPatches('cosmology/COS-001.webp', [
    { x: 632, y: 168, w: 214, h: 36, sampleBgAt: [626, 178], lines: ['in dense gas halos'], fontSize: 16, fontWeight: 500 },
  ]);

  await applyPatches('cosmology/COS-002.webp', [
    { x: 56, y: 266, w: 94, h: 42, sampleBgAt: [52, 270], lines: ['Chaotic', 'Foam'], fontSize: 15, fontWeight: 600, lineHeight: 17 },
    { x: 232, y: 632, w: 72, h: 26, sampleBgAt: [228, 636], lines: ['Gluon'], fontSize: 15, fontWeight: 600 },
  ]);

  await applyPatches('cosmology/COS-010.webp', [
    { x: 92, y: 80, w: 50, h: 720, sampleBgAt: [86, 100], lines: [] },
    { x: 96, y: 84, w: 46, h: 36, sampleBgAt: [86, 100], lines: ['3.0'], fontSize: 22, fontFamily: 'Liberation Serif, serif', align: 'right' },
    { x: 96, y: 192, w: 46, h: 36, sampleBgAt: [86, 100], lines: ['2.5'], fontSize: 22, fontFamily: 'Liberation Serif, serif', align: 'right' },
    { x: 96, y: 306, w: 46, h: 36, sampleBgAt: [86, 100], lines: ['2.0'], fontSize: 22, fontFamily: 'Liberation Serif, serif', align: 'right' },
    { x: 96, y: 420, w: 46, h: 36, sampleBgAt: [86, 100], lines: ['1.5'], fontSize: 22, fontFamily: 'Liberation Serif, serif', align: 'right' },
    { x: 96, y: 534, w: 46, h: 36, sampleBgAt: [86, 100], lines: ['1.0'], fontSize: 22, fontFamily: 'Liberation Serif, serif', align: 'right' },
    { x: 96, y: 650, w: 46, h: 36, sampleBgAt: [86, 100], lines: ['0.5'], fontSize: 22, fontFamily: 'Liberation Serif, serif', align: 'right' },
    { x: 96, y: 760, w: 46, h: 36, sampleBgAt: [86, 100], lines: ['0.0'], fontSize: 22, fontFamily: 'Liberation Serif, serif', align: 'right' },
  ]);

  await applyPatches('cosmology/COS-011.webp', [
    { x: 984, y: 330, w: 172, h: 28, sampleBgAt: [1152, 336], lines: ['Chromosphere'], fontSize: 16, fontWeight: 500, align: 'left' },
    { x: 984, y: 364, w: 178, h: 28, sampleBgAt: [1152, 370], lines: ['Transition Zone'], fontSize: 16, fontWeight: 500, align: 'left' },
    { x: 1018, y: 468, w: 110, h: 58, sampleBgAt: [1142, 480], lines: ['CNO', 'Cycle'], fontSize: 16, fontWeight: 600, align: 'left', lineHeight: 19 },
  ]);

  await applyPatches('cosmology/COS-016.webp', [
    { x: 882, y: 106, w: 72, h: 22, bg: '#1B1C19', lines: ['ORBITS'], fontSize: 14, fontWeight: 600, color: '#EFEAD8' },
  ]);

  await applyPatches('cosmology/COS-018.webp', [
    { x: 560, y: 325, w: 22, h: 102, sampleBgAt: [562, 322], lines: ['Minor Axis (2b)'], fontSize: 15, fontWeight: 600, rotateDeg: -90 },
    { x: 374, y: 280, w: 92, h: 26, sampleBgAt: [370, 284], lines: ['T=87.97d'], fontSize: 15, fontWeight: 600 },
  ]);

  await applyPatches('cosmology/COS-031.webp', [
    { x: 968, y: 438, w: 190, h: 66, sampleBgAt: [1150, 442], lines: ['ABSORPTION OF', 'HARMFUL', 'UV RADIATION'], fontSize: 15, fontWeight: 600, lineHeight: 18 },
    { x: 892, y: 632, w: 166, h: 50, sampleBgAt: [898, 636], lines: ['TRANSMISSION OF', 'VISIBLE LIGHT'], fontSize: 15, fontWeight: 600, lineHeight: 19 },
    { x: 1056, y: 630, w: 34, h: 54, sampleBgAt: [1092, 642], lines: [] },
    { x: 80, y: 696, w: 204, h: 58, sampleBgAt: [72, 700], lines: ['TRANSMISSION OF', 'VISIBLE LIGHT'], fontSize: 15, fontWeight: 600, lineHeight: 19 },
    { x: 694, y: 584, w: 136, h: 74, bg: '#EFE7D4', lines: ['TRANSMITTED', 'INFRARED'], fontSize: 13.5, fontWeight: 600, lineHeight: 17, rotateDeg: 40 },
    { x: 742, y: 656, w: 94, h: 44, bg: '#F7F5EE', lines: [] },
  ]);

  await applyPatches('cosmology/COS-034.webp', [
    { x: 664, y: 756, w: 236, h: 90, sampleBgAt: [658, 765], lines: ['NEUTRON BETA', 'DECAY'], fontSize: 22, fontWeight: 700, lineHeight: 28 },
  ]);

  await applyPatches('cosmology/COS-035.webp', [
    { x: 800, y: 744, w: 340, h: 46, sampleBgAt: [790, 750], lines: ['Too-Cold Zone'], fontSize: 30, fontWeight: 600 },
  ]);

  await applyPatches('cosmology/COS-036.webp', [
    { x: 1012, y: 364, w: 122, h: 28, bg: '#1B212E', lines: ['Space X-Rays'], fontSize: 15, fontWeight: 600, color: '#F2EEE6' },
    { x: 700, y: 660, w: 22, h: 26, sampleBgAt: [704, 648], lines: [] },
    { x: 720, y: 562, w: 138, h: 124, bg: '#E7F1F8', border: '#9AB2C4', rx: 6, lines: ['High-altitude', 'atmospheric', 'observation', 'platforms'], fontSize: 13.5, fontWeight: 500, lineHeight: 19 },
    { x: 868, y: 586, w: 126, h: 108, bg: '#E7F1F8', border: '#9AB2C4', rx: 6, lines: ['High-altitude', 'absorption', 'cutoff layer', 'platforms'], fontSize: 13.5, fontWeight: 500, lineHeight: 19 },
    { x: 1000, y: 562, w: 146, h: 124, bg: '#E7F1F8', border: '#9AB2C4', rx: 6, lines: ['Space X-ray', 'absorption and', 'space-based', 'Gamma Rays'], fontSize: 13.5, fontWeight: 500, lineHeight: 19 },
  ]);

  await applyPatches('cosmology/COS-045.webp', [
    { x: 56, y: 498, w: 78, h: 40, sampleBgAt: [52, 504], lines: ['1.0'], fontSize: 21, fontWeight: 600, align: 'right' },
    { x: 56, y: 676, w: 78, h: 40, sampleBgAt: [52, 682], lines: ['0.1'], fontSize: 21, fontWeight: 600, align: 'right' },
    { x: 142, y: 636, w: 40, h: 38, sampleBgAt: [140, 634], lines: ['0.01'], fontSize: 14, fontWeight: 600, color: '#8A5E34' },
    { x: 992, y: 98, w: 158, h: 40, sampleBgAt: [986, 102], lines: ['(~6000 K)'], fontSize: 21, fontWeight: 500 },
  ]);

  await applyPatches('cosmology/COS-046.webp', [
    { x: 168, y: 598, w: 320, h: 106, sampleBgAt: [164, 602], lines: ['Long-wavelength light is', 'refracted and reddens the', 'full lunar disk during a', 'total lunar eclipse.'], fontSize: 16, fontWeight: 600, lineHeight: 22 },
  ]);

  await applyPatches('cosmology/COS-050.webp', [
    { x: 922, y: 790, w: 224, h: 72, sampleBgAt: [918, 795], lines: ['Evolving toward', 'maximum entropy'], fontSize: 18, fontFamily: 'Liberation Serif, serif', fontWeight: 600, lineHeight: 25 },
  ]);

  await applyPatches('geology/GEO-010.webp', [
    { x: 782, y: 168, w: 356, h: 62, sampleBgAt: [1135, 180], lines: ['Permanent ice fields, glaciers,', 'snow, and exposed crags'], fontSize: 14.5, fontWeight: 500, align: 'left', lineHeight: 19 },
    { x: 822, y: 306, w: 332, h: 62, sampleBgAt: [1152, 316], lines: ['Hardy grasses, sedges,', 'cushion plants, and wildflowers'], fontSize: 14.5, fontWeight: 500, align: 'left', lineHeight: 19 },
    { x: 882, y: 386, w: 196, h: 40, sampleBgAt: [1082, 396], lines: ['Talus slopes'], fontSize: 15, fontWeight: 500, align: 'left' },
    { x: 894, y: 432, w: 252, h: 74, sampleBgAt: [1142, 438], lines: ['Coniferous forest adapted', 'to cold winters (e.g., fir,', 'spruce, and alpine pine)'], fontSize: 14.5, fontWeight: 500, align: 'left', lineHeight: 19 },
    { x: 974, y: 556, w: 204, h: 98, sampleBgAt: [1150, 560], lines: ['Broadleaf deciduous', 'forest with seasonal', 'broadleaf canopy', 'trees'], fontSize: 14.5, fontWeight: 500, align: 'left', lineHeight: 20 },
  ]);

  await applyPatches('geology/GEO-012.webp', [
    { x: 42, y: 274, w: 258, h: 34, sampleBgAt: [38, 280], lines: ['Marble Beds'], fontSize: 21, fontWeight: 700 },
    { x: 436, y: 182, w: 326, h: 32, sampleBgAt: [430, 188], lines: ['Ferruginous'], fontSize: 20, fontWeight: 700 },
  ]);

  await applyPatches('geology/GEO-020.webp', [
    { x: 954, y: 616, w: 204, h: 72, bg: '#B4CAE0', lines: ['Ocean Basin −'], fontSize: 19, fontWeight: 600 },
  ]);

  await applyPatches('geology/GEO-021.webp', [
    { x: 604, y: 394, w: 126, h: 62, sampleBgAt: [734, 410], lines: ['Slip', 'Arrow'], fontSize: 14.5, fontWeight: 600, lineHeight: 18 },
  ]);

  await applyPatches('geology/GEO-024.webp', [
    { x: 468, y: 444, w: 282, h: 96, bg: '#EAD8BC', border: '#8E7351', rx: 4, lines: ['Deposition of', 'Metallic Minerals', '(e.g., gold, copper, zinc)'], fontSize: 16.5, fontWeight: 700, lineHeight: 22 },
  ]);

  await applyPatches('geology/GEO-026.webp', [
    { x: 964, y: 700, w: 210, h: 30, bg: '#FAF8F4', lines: ['Geological Formation'], fontSize: 15.5, fontWeight: 600, align: 'left' },
  ]);

  await applyPatches('geology/GEO-027.webp', [
    { x: 992, y: 278, w: 184, h: 80, sampleBgAt: [1178, 290], lines: ['CRYSTALLINE', 'JOINTS +', 'FRACTURES'], fontSize: 14, fontWeight: 600, lineHeight: 18 },
  ]);

  await applyPatches('geology/GEO-029.webp', [
    { x: 120, y: 786, w: 400, h: 42, bg: '#9F6A52', lines: ['illuvial B-horizon'], fontSize: 25, fontFamily: 'Liberation Serif, serif', fontWeight: 500 },
  ]);

  await applyPatches('geology/GEO-031.webp', [
    { x: 26, y: 196, w: 368, h: 74, sampleBgAt: [22, 200], lines: ['A biological soil crust (BSC) on dry desert', 'soil surfaces comprising dormant lichens,', 'mosses, cyanobacteria, fungi, and dust.'], fontSize: 13, fontWeight: 500, lineHeight: 18 },
    { x: 406, y: 196, w: 376, h: 74, sampleBgAt: [402, 200], lines: ['Immediate response to rainfall rehydrates', 'soil crust surfaces, activating microbial life', 'and restoring photosynthetic activity.'], fontSize: 13, fontWeight: 500, lineHeight: 18 },
    { x: 794, y: 196, w: 374, h: 74, sampleBgAt: [790, 200], lines: ['Following rainfall, a rich variety of desert', 'wildflowers (lupines, daisies, globemallows)', 'germinate rapidly and bloom.'], fontSize: 13, fontWeight: 500, lineHeight: 18 },
    { x: 618, y: 304, w: 156, h: 88, sampleBgAt: [770, 308], lines: ['Microbial', 'soil', 'activity'], fontSize: 13.5, fontWeight: 600, lineHeight: 17 },
  ]);

  await applyPatches('geology/GEO-036.webp', [
    { x: 224, y: 174, w: 188, h: 66, bg: '#F4F1E8', lines: ['PRIMARY', 'FELDSPAR', 'REACTING WITH'], fontSize: 15, fontWeight: 600, lineHeight: 19 },
  ]);

  await applyPatches('geology/GEO-041.webp', [
    { x: 922, y: 190, w: 218, h: 102, bg: '#FAF7EF', lines: ['Carbon atoms occupy', 'interstitial steel lattice', 'sites, raising yield strength', 'and hardness.'], fontSize: 13.5, fontWeight: 500, lineHeight: 18 },
    { x: 185, y: 785, w: 138, h: 64, bg: '#EFE8D8', lines: [] },
    { x: 244, y: 812, w: 164, h: 36, bg: '#EFE8D8', lines: ['Hot Air Blast'], fontSize: 16, fontWeight: 600 },
  ]);

  console.log('Applied all surgical repairs across COS & GEO.');
}

main();
