import { createHash } from 'node:crypto';
import fs from 'node:fs';
import { registerHooks } from 'node:module';
import path from 'node:path';
import sharp from 'sharp';
import { Resvg } from '@resvg/resvg-js';
import { buildWeatherPlateSvg } from './chapters/ch04Weather';
import { buildPlantsPlateSvg } from './chapters/ch05Plants';
import { buildAnimalsPlateSvg } from './chapters/ch06Animals';
import { buildHumanBiologyPlateSvg } from './chapters/ch07HumanBiology';
import { buildHealthPlateSvg } from './chapters/ch08Health';
import { buildPsychologyPlateSvg } from './chapters/ch09Psychology';
import { buildSocialEthicsPlateSvg } from './chapters/ch10SocialEthics';
import { PLATE_HEIGHT, PLATE_WIDTH, renderSvgToWebp } from './lib/plateRenderer';
import type { RawChapterDataset, TopicEnrichment } from '../src/types/encyclopedia';

// Allow Node/tsx to import frontend modules referencing image assets cleanly
registerHooks({
  load(url, context, nextLoad) {
    if (/\.(jpg|jpeg|png|webp|svg)(\?.*)?$/i.test(url)) {
      return {
        format: 'module',
        shortCircuit: true,
        source: `export default ${JSON.stringify(url)};`,
      };
    }
    return nextLoad(url, context);
  },
});

const PUBLIC_DIR = path.resolve(process.cwd(), 'public');

function readJsonFromUrl<T>(urlPath: string): T {
  const abs = path.join(PUBLIC_DIR, urlPath.replace(/^\//, ''));
  return JSON.parse(fs.readFileSync(abs, 'utf8')) as T;
}

async function computePixelFingerprint(filePath: string): Promise<Uint8Array> {
  const { data } = await sharp(filePath)
    .resize(48, 36, { fit: 'fill' })
    .greyscale()
    .raw()
    .toBuffer({ resolveWithObject: true });
  return data;
}

function meanAbsDiff(a: Uint8Array, b: Uint8Array): number {
  let sum = 0;
  for (let i = 0; i < a.length; i++) {
    sum += Math.abs(a[i] - b[i]);
  }
  return sum / a.length;
}

async function generateContactSheets(chapterKey: string, outFiles: { id: string; filePath: string }[]) {
  fs.mkdirSync('.audit_tmp', { recursive: true });
  const cols = 3;
  const rowsPerSheet = 3;
  const perSheet = cols * rowsPerSheet;
  const tw = 560;
  const th = 418;

  for (let start = 0; start < outFiles.length; start += perSheet) {
    const batch = outFiles.slice(start, start + perSheet);
    const rows = Math.ceil(batch.length / cols);
    const sheetIdx = Math.floor(start / perSheet) + 1;

    const composites = await Promise.all(
      batch.map(async (item, i) => {
        const thumb = await sharp(item.filePath).resize(tw, th).png().toBuffer();
        const badgeSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="140" height="26" viewBox="0 0 140 26"><rect width="140" height="26" fill="#081813" opacity="0.9"/><text x="8" y="18" font-family="sans-serif" font-size="14" font-weight="bold" fill="#DFC99B">${item.id}</text></svg>`;
        const badgePng = Buffer.from(
          new Resvg(badgeSvg, { font: { loadSystemFonts: true } }).render().asPng()
        );
        const left = (i % cols) * tw;
        const top = Math.floor(i / cols) * th;
        return [
          { input: thumb, left, top },
          { input: badgePng, left: left + 6, top: top + 6 },
        ];
      })
    );

    const sheetPath = path.join('.audit_tmp', `${chapterKey}_sheet_${sheetIdx}.png`);
    await sharp({
      create: { width: cols * tw, height: rows * th, channels: 4, background: '#0A1511' },
    })
      .composite(composites.flat())
      .png()
      .toFile(sheetPath);
  }
}

async function runChapter(chapterArg: string) {
  const loader = await import('../src/data/encyclopediaLoader');

  type BuilderFn = (entry: any, enrichment?: TopicEnrichment) => string;
  interface ChapterSpec {
    key: string;
    categoryFolder: string;
    loadDataset: () => RawChapterDataset;
    enrichment: Record<string, TopicEnrichment>;
    builder: BuilderFn;
  }

  const specs: Record<string, ChapterSpec> = {
    '04': {
      key: 'ch04',
      categoryFolder: 'atmosphere',
      loadDataset: () => loader.normalizeWeatherDataset(readJsonFromUrl(loader.WEATHER_DATASET_URL)),
      enrichment: (await import('../src/data/weatherEnrichment')).WEATHER_ENRICHMENT,
      builder: buildWeatherPlateSvg,
    },
    '05': {
      key: 'ch05',
      categoryFolder: 'plants',
      loadDataset: () => loader.normalizePlantsDataset(readJsonFromUrl(loader.PLANTS_DATASET_URL)),
      enrichment: (await import('../src/data/plantsEnrichment')).PLANTS_ENRICHMENT,
      builder: buildPlantsPlateSvg,
    },
    '06': {
      key: 'ch06',
      categoryFolder: 'animals',
      loadDataset: () => loader.normalizeAnimalsDataset(readJsonFromUrl(loader.ANIMALS_DATASET_URL)),
      enrichment: (await import('../src/data/animalsEnrichment')).ANIMALS_ENRICHMENT,
      builder: buildAnimalsPlateSvg,
    },
    '07': {
      key: 'ch07',
      categoryFolder: 'human-biology',
      loadDataset: () => loader.normalizeHumanBiologyDataset(readJsonFromUrl(loader.HUMAN_BIOLOGY_DATASET_URL)),
      enrichment: (await import('../src/data/humanBiologyEnrichment')).HUMAN_BIOLOGY_ENRICHMENT,
      builder: buildHumanBiologyPlateSvg,
    },
    '08': {
      key: 'ch08',
      categoryFolder: 'health',
      loadDataset: () => loader.normalizeHealthHygieneDataset(readJsonFromUrl(loader.HEALTH_HYGIENE_DATASET_URL)),
      enrichment: (await import('../src/data/healthHygieneEnrichment')).HEALTH_HYGIENE_ENRICHMENT,
      builder: buildHealthPlateSvg,
    },
    '09': {
      key: 'ch09',
      categoryFolder: 'psychology',
      loadDataset: () => loader.normalizeHumanPsychologyDataset(readJsonFromUrl(loader.HUMAN_PSYCHOLOGY_DATASET_URL)),
      enrichment: (await import('../src/data/humanPsychologyEnrichment')).HUMAN_PSYCHOLOGY_ENRICHMENT,
      builder: buildPsychologyPlateSvg,
    },
    '10': {
      key: 'ch10',
      categoryFolder: 'social-ethics',
      loadDataset: () => loader.normalizeSocialLifeEthicsDataset(readJsonFromUrl(loader.SOCIAL_LIFE_ETHICS_DATASET_URL)),
      enrichment: (await import('../src/data/socialLifeEthicsEnrichment')).SOCIAL_LIFE_ETHICS_ENRICHMENT,
      builder: buildSocialEthicsPlateSvg,
    },
  };

  const spec = specs[chapterArg];
  if (!spec) {
    throw new Error(`Unsupported or unconfigured chapter argument: ${chapterArg}`);
  }

  const ds = spec.loadDataset();
  const outDir = path.join(PUBLIC_DIR, 'assets/illustrations', spec.categoryFolder);
  fs.mkdirSync(outDir, { recursive: true });

  const results: { id: string; filePath: string; sha256: string; fp: Uint8Array }[] = [];
  for (const entry of ds.entries) {
    const svg = spec.builder(entry, spec.enrichment[entry.id]);
    const outPath = path.join(outDir, `${entry.id}.webp`);
    await renderSvgToWebp(svg, outPath);
    const buf = fs.readFileSync(outPath);
    const meta = await sharp(outPath).metadata();
    if (meta.width !== PLATE_WIDTH || meta.height !== PLATE_HEIGHT) {
      throw new Error(`Dimension mismatch on ${entry.id}: ${meta.width}x${meta.height}`);
    }
    const sha256 = createHash('sha256').update(buf).digest('hex');
    const fp = await computePixelFingerprint(outPath);
    results.push({ id: entry.id, filePath: outPath, sha256, fp });
  }

  // Verify zero identical hashes & measure closest pair perceptual distance
  const seen = new Map<string, string>();
  let minMae = Infinity;
  let closestPair = '';
  for (let i = 0; i < results.length; i++) {
    const r = results[i];
    if (seen.has(r.sha256)) {
      throw new Error(`Duplicate SHA-256 between ${seen.get(r.sha256)} and ${r.id}`);
    }
    seen.set(r.sha256, r.id);
    for (let j = i + 1; j < results.length; j++) {
      const mae = meanAbsDiff(r.fp, results[j].fp);
      if (mae < minMae) {
        minMae = mae;
        closestPair = `${r.id} vs ${results[j].id}`;
      }
    }
  }

  await generateContactSheets(spec.key, results);
  console.log(
    `Generated ${results.length}/50 plates in public/assets/illustrations/${spec.categoryFolder}/ | 0 dup hashes | Min visual MAE: ${minMae.toFixed(2)} (${closestPair})`
  );
}

const arg = process.argv[2] ?? '04';
runChapter(arg);
