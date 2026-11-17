import { createHash } from 'node:crypto';
import fs from 'node:fs';
import { registerHooks } from 'node:module';
import path from 'node:path';
import { execSync } from 'node:child_process';

// Handle non-JS image imports (.jpg, .webp, .png, .svg) cleanly inside Node ESM / tsx
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

import type {
  IllustrationAssetStatus,
  RawAnimalsDataset,
  RawChapterDataset,
  RawGeologyDataset,
  RawHealthHygieneDataset,
  RawHumanBiologyDataset,
  RawHumanPsychologyDataset,
  RawOceansDataset,
  RawPlantsDataset,
  RawSocialLifeEthicsDataset,
  RawWeatherDataset,
} from '../src/types/encyclopedia';

const ROOT_DIR = path.resolve(process.cwd());
const PUBLIC_DIR = path.join(ROOT_DIR, 'public');
const MANIFEST_OUTPUT_PATH = path.join(
  ROOT_DIR,
  'src/data/illustrationAssetManifest.ts'
);
const REPORT_OUTPUT_PATH = '/tmp/illustration-audit-report.json';

function readJsonFromPublicUrl<T>(publicUrl: string): T {
  const rel = publicUrl.replace(/^\//, '');
  const abs = path.join(PUBLIC_DIR, rel);
  return JSON.parse(fs.readFileSync(abs, 'utf8')) as T;
}

function getWebpDimensions(filePath: string): { width: number; height: number } {
  try {
    const out = execSync(`identify -format "%w %h" "${filePath}"`, {
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
    }).trim();
    const [wStr, hStr] = out.split(/\s+/);
    const width = Number.parseInt(wStr ?? '0', 10);
    const height = Number.parseInt(hStr ?? '0', 10);
    if (width > 0 && height > 0) {
      return { width, height };
    }
  } catch {
    // Fall back to lightweight RIFF/WebP header parsing below
  }

  const buf = fs.readFileSync(filePath);
  if (
    buf.length >= 30 &&
    buf.toString('ascii', 0, 4) === 'RIFF' &&
    buf.toString('ascii', 8, 12) === 'WEBP'
  ) {
    const chunk = buf.toString('ascii', 12, 16);
    if (chunk === 'VP8X' && buf.length >= 30) {
      const width = 1 + (buf[24] | (buf[25] << 8) | (buf[26] << 16));
      const height = 1 + (buf[27] | (buf[28] << 8) | (buf[29] << 16));
      return { width, height };
    }
    if (chunk === 'VP8 ' && buf.length >= 30) {
      const width = buf.readUInt16LE(26) & 0x3fff;
      const height = buf.readUInt16LE(28) & 0x3fff;
      return { width, height };
    }
    if (chunk === 'VP8L' && buf.length >= 25) {
      const bits = buf.readUInt32LE(21);
      const width = (bits & 0x3fff) + 1;
      const height = ((bits >> 14) & 0x3fff) + 1;
      return { width, height };
    }
  }
  return { width: 1200, height: 900 };
}

async function main() {
  const { CHAPTERS } = await import('../src/data/chapters');
  const loader = await import('../src/data/encyclopediaLoader');
  const manifestMod = await import('../src/data/illustrationAssetManifest');
  const registryMod = await import('../src/data/illustrationRegistry');

  const {
    ANIMALS_DATASET_URL,
    buildBookSpreads,
    COSMOLOGY_DATASET_URL,
    GEOLOGY_DATASET_URL,
    HEALTH_HYGIENE_DATASET_URL,
    HUMAN_BIOLOGY_DATASET_URL,
    HUMAN_PSYCHOLOGY_DATASET_URL,
    normalizeAnimalsDataset,
    normalizeCosmologyDataset,
    normalizeGeologyDataset,
    normalizeHealthHygieneDataset,
    normalizeHumanBiologyDataset,
    normalizeHumanPsychologyDataset,
    normalizeOceansDataset,
    normalizePlantsDataset,
    normalizeSocialLifeEthicsDataset,
    normalizeWeatherDataset,
    OCEANS_DATASET_URL,
    PLANTS_DATASET_URL,
    SOCIAL_LIFE_ETHICS_DATASET_URL,
    WEATHER_DATASET_URL,
  } = loader;
  const { SCIENTIFICALLY_REVIEWED_TOPICS, VISUALLY_INSPECTED_TOPICS } = manifestMod;
  const {
    buildIllustrationRegistry,
    CHAPTER_ILLUSTRATION_CATEGORY_MAP,
    getIllustrationRegistryStats,
  } = registryMod;

  const datasetsByChapter: Record<string, RawChapterDataset> = {
    'chapter-01': normalizeCosmologyDataset(
      readJsonFromPublicUrl<RawChapterDataset>(COSMOLOGY_DATASET_URL)
    ),
    'chapter-02': normalizeGeologyDataset(
      readJsonFromPublicUrl<RawGeologyDataset>(GEOLOGY_DATASET_URL)
    ),
    'chapter-03': normalizeOceansDataset(
      readJsonFromPublicUrl<RawOceansDataset>(OCEANS_DATASET_URL)
    ),
    'chapter-04': normalizeWeatherDataset(
      readJsonFromPublicUrl<RawWeatherDataset>(WEATHER_DATASET_URL)
    ),
    'chapter-05': normalizePlantsDataset(
      readJsonFromPublicUrl<RawPlantsDataset>(PLANTS_DATASET_URL)
    ),
    'chapter-06': normalizeAnimalsDataset(
      readJsonFromPublicUrl<RawAnimalsDataset>(ANIMALS_DATASET_URL)
    ),
    'chapter-07': normalizeHumanBiologyDataset(
      readJsonFromPublicUrl<RawHumanBiologyDataset>(HUMAN_BIOLOGY_DATASET_URL)
    ),
    'chapter-08': normalizeHealthHygieneDataset(
      readJsonFromPublicUrl<RawHealthHygieneDataset>(HEALTH_HYGIENE_DATASET_URL)
    ),
    'chapter-09': normalizeHumanPsychologyDataset(
      readJsonFromPublicUrl<RawHumanPsychologyDataset>(HUMAN_PSYCHOLOGY_DATASET_URL)
    ),
    'chapter-10': normalizeSocialLifeEthicsDataset(
      readJsonFromPublicUrl<RawSocialLifeEthicsDataset>(SOCIAL_LIFE_ETHICS_DATASET_URL)
    ),
  };

  const baseRecords = buildIllustrationRegistry(datasetsByChapter);

  // 1. Scan real on-disk `.webp` assets in `public/assets/illustrations/`
  const diskManifest: Record<string, IllustrationAssetStatus> = {};
  const inspectedValid = new Set<string>();
  const reviewedValid = new Set<string>();

  for (const rec of baseRecords) {
    const absPath = path.join(PUBLIC_DIR, rec.assetPath.replace(/^\//, ''));
    if (fs.existsSync(absPath)) {
      const bytes = fs.readFileSync(absPath);
      const sha256 = createHash('sha256').update(bytes).digest('hex');
      const dims = getWebpDimensions(absPath);
      diskManifest[rec.topicId] = {
        exists: true,
        fileSizeBytes: bytes.length,
        sha256,
        width: dims.width,
        height: dims.height,
      };
      if (VISUALLY_INSPECTED_TOPICS.has(rec.topicId)) {
        inspectedValid.add(rec.topicId);
      }
      if (SCIENTIFICALLY_REVIEWED_TOPICS.has(rec.topicId)) {
        reviewedValid.add(rec.topicId);
      }
    }
  }

  // 2. Write synchronized `src/data/illustrationAssetManifest.ts`
  const sortedManifestEntries = Object.keys(diskManifest)
    .sort()
    .map((topicId) => [topicId, diskManifest[topicId]] as const);

  const manifestObjectLines = sortedManifestEntries.map(([topicId, status]) => {
    return `  ${JSON.stringify(topicId)}: { exists: true, fileSizeBytes: ${status.fileSizeBytes}, sha256: ${JSON.stringify(status.sha256)}, width: ${status.width}, height: ${status.height} }`;
  });

  const inspectedArray = Array.from(inspectedValid).sort();
  const reviewedArray = Array.from(reviewedValid).sort();

  const manifestSource = `import { IllustrationAssetStatus } from '../types/encyclopedia';

/**
 * Generated & maintained by \`scripts/audit-illustrations.ts\`.
 * Records the actual on-disk verification status, byte size, SHA-256 hash,
 * and pixel dimensions of each topic's \`.webp\` illustration inside
 * \`public/assets/illustrations/<category>/<TOPIC_ID>.webp\`.
 *
 * Only topics whose real \`.webp\` asset exists on disk are marked \`exists: true\`.
 */
export const ILLUSTRATION_ASSET_MANIFEST: Record<
  string,
  IllustrationAssetStatus
> = {
${manifestObjectLines.join(',\n')}
};

/**
 * Topics whose rendered \`.webp\` illustration files have been visually inspected
 * directly for label accuracy, legibility, and non-duplication.
 */
export const VISUALLY_INSPECTED_TOPICS: ReadonlySet<string> = new Set(${JSON.stringify(inspectedArray, null, 2)});

/**
 * Topics whose illustrations have undergone independent domain-expert
 * scientific review (never inferred merely from generation or display).
 */
export const SCIENTIFICALLY_REVIEWED_TOPICS: ReadonlySet<string> = new Set(${JSON.stringify(reviewedArray, null, 2)});
`;

  fs.writeFileSync(MANIFEST_OUTPUT_PATH, manifestSource, 'utf8');

  // 3. Recompute duplicate/validation checks directly against disk results
  const errors: string[] = [];
  const seenIllIds = new Set<string>();
  const seenFigures = new Set<string>();
  const seenTitles = new Set<string>();
  const seenPaths = new Set<string>();
  const seenHashes = new Map<string, string>();
  const duplicatePairs: { topicA: string; topicB: string; reason: string }[] = [];

  if (CHAPTERS.length !== 10) {
    errors.push(`Expected 10 chapters, got ${CHAPTERS.length}`);
  }
  if (baseRecords.length !== 500) {
    errors.push(`Expected 500 topic records, got ${baseRecords.length}`);
  }

  for (let idx = 0; idx < baseRecords.length; idx += 1) {
    const rec = baseRecords[idx];
    const expectedGlobal = idx + 1;
    if (rec.globalTopicNumber !== expectedGlobal) {
      errors.push(
        `Global numbering mismatch on ${rec.topicId}: expected ${expectedGlobal}, got ${rec.globalTopicNumber}`
      );
    }

    const expectedPrefix = `${rec.topicId}-ILLUSTRATION`;
    if (rec.illustrationId !== expectedPrefix) {
      errors.push(
        `Invalid illustrationId for ${rec.topicId}: ${rec.illustrationId}`
      );
    }
    if (seenIllIds.has(rec.illustrationId)) {
      errors.push(`Duplicate illustrationId: ${rec.illustrationId}`);
    }
    seenIllIds.add(rec.illustrationId);

    if (seenFigures.has(rec.figureNumber)) {
      errors.push(`Duplicate figureNumber: ${rec.figureNumber}`);
    }
    seenFigures.add(rec.figureNumber);

    const normTitle = rec.title.trim().toLowerCase();
    if (!normTitle || seenTitles.has(normTitle)) {
      errors.push(`Missing or duplicate title on ${rec.topicId}: ${rec.title}`);
    }
    seenTitles.add(normTitle);

    const expectedCategory = CHAPTER_ILLUSTRATION_CATEGORY_MAP[rec.chapterId];
    const expectedAssetPath = `/assets/illustrations/${expectedCategory}/${rec.topicId}.webp`;
    if (rec.assetPath !== expectedAssetPath) {
      errors.push(
        `Asset path contract violation on ${rec.topicId}: ${rec.assetPath} !== ${expectedAssetPath}`
      );
    }
    if (seenPaths.has(rec.assetPath)) {
      errors.push(`Duplicate assetPath: ${rec.assetPath}`);
    }
    seenPaths.add(rec.assetPath);

    if (!rec.caption.trim() || !rec.altText.trim()) {
      errors.push(`Missing caption or altText on ${rec.topicId}`);
    }

    const disk = diskManifest[rec.topicId];
    if (disk?.exists) {
      if (disk.fileSizeBytes < 2048) {
        errors.push(`Suspiciously small WebP asset (${disk.fileSizeBytes} bytes) for ${rec.topicId}`);
      }
      const prev = seenHashes.get(disk.sha256);
      if (prev) {
        duplicatePairs.push({
          topicA: prev,
          topicB: rec.topicId,
          reason: `Identical SHA-256 hash (${disk.sha256.slice(0, 12)})`,
        });
        errors.push(`Duplicate SHA-256 hash shared between ${prev} and ${rec.topicId}`);
      } else {
        seenHashes.set(disk.sha256, rec.topicId);
      }
    }
  }

  // Validate spread & topic sequence integrity
  const spreads = buildBookSpreads(datasetsByChapter);
  const topicFolios = spreads.flatMap((s) =>
    [s.left, s.right].filter((f) => f.type === 'topic-single' && f.rawEntry)
  );
  if (topicFolios.length !== 500) {
    errors.push(`Expected 500 topic-single folios in spreads, got ${topicFolios.length}`);
  }
  for (let i = 0; i < topicFolios.length; i += 1) {
    const f = topicFolios[i];
    if (f.globalTopicNumber !== i + 1) {
      errors.push(
        `Spread globalTopicNumber out of sequence at index ${i}: got ${f.globalTopicNumber}`
      );
      break;
    }
    const expectedChapterTopicNum = (i % 50) + 1;
    if (f.topicIndexInChapter !== expectedChapterTopicNum) {
      errors.push(
        `Chapter topicIndexInChapter mismatch on ${f.rawEntry?.id}: expected ${expectedChapterTopicNum}, got ${f.topicIndexInChapter}`
      );
    }
    if (expectedChapterTopicNum > 1 && (!f.prevTopicId || !f.prevTopicTitle)) {
      errors.push(`Missing prevTopic link/title on ${f.rawEntry?.id}`);
    }
    if (expectedChapterTopicNum < 50 && (!f.nextTopicId || !f.nextTopicTitle)) {
      errors.push(`Missing nextTopic link/title on ${f.rawEntry?.id}`);
    }
  }

  // Merge fresh disk manifest into stats
  const refreshedRecords = baseRecords.map((r) => {
    const disk = diskManifest[r.topicId];
    const assetExists = Boolean(disk?.exists);
    const verificationState = assetExists
      ? reviewedValid.has(r.topicId)
        ? 'scientifically_reviewed'
        : inspectedValid.has(r.topicId)
        ? 'visually_inspected'
        : 'created'
      : 'missing';
    return {
      ...r,
      assetExists,
      fileSizeBytes: disk?.fileSizeBytes,
      sha256: disk?.sha256,
      dimensions: disk ? { width: disk.width, height: disk.height } : undefined,
      verificationState,
    } as const;
  });

  const stats = getIllustrationRegistryStats([...refreshedRecords]);

  const report = {
    auditedAt: new Date().toISOString(),
    registryStats: {
      ...stats,
      createdCount: Object.keys(diskManifest).length,
      missingCount: 500 - Object.keys(diskManifest).length,
      visuallyInspectedCount: inspectedValid.size,
      scientificallyReviewedCount: reviewedValid.size,
      duplicateFlagCount: duplicatePairs.length,
    },
    duplicatePairs,
    errors,
    spreadTopicFoliosCount: topicFolios.length,
    totalSpreads: spreads.length,
  };

  fs.writeFileSync(REPORT_OUTPUT_PATH, JSON.stringify(report, null, 2), 'utf8');

  console.log('=== Science of Creation Illustration & Registry Audit ===');
  console.log(`Topics Registered:      ${stats.totalTopics} / 500`);
  console.log(`Assets Created (.webp): ${Object.keys(diskManifest).length} / 500`);
  console.log(`Missing / Pending:      ${500 - Object.keys(diskManifest).length}`);
  console.log(`Visually Inspected:     ${inspectedValid.size}`);
  console.log(`Scientifically Reviewed:${reviewedValid.size}`);
  console.log(`Duplicate Hash Flags:   ${duplicatePairs.length}`);
  console.log(`Validation Errors:      ${errors.length}`);
  if (errors.length > 0) {
    for (const err of errors.slice(0, 20)) {
      console.error(`  [ERROR] ${err}`);
    }
    process.exitCode = 1;
  }
}

main();
