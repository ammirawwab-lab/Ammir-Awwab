import verifiedDataRaw from './verifiedQuranData.json';
import {
  RawDatasetEntry,
  RawTafsirSource,
  VerifiedVersePassage,
} from '../types/encyclopedia';

interface VerifiedChapterMeta {
  id: number;
  nameSimple: string;
  nameArabic: string;
  translatedName: string;
  revelationPlace: string;
  versesCount: number;
}

interface VerifiedVerseRecord {
  key: string;
  surah: number;
  ayah: number;
  arabic: string;
  translation: string;
  translator: string;
}

interface VerifiedTafsirRecord {
  scholar: string;
  work: string;
  heading: string | null;
  summary: string;
  coveredKeys: string[];
  sourceUrl: string;
}

interface VerifiedQuranDataStore {
  verifiedAt: string;
  sourceApi: string;
  translationResource: { id: number; name: string };
  tafsirResource: { id: number; slug: string; name: string };
  chapters: Record<string, VerifiedChapterMeta>;
  verses: Record<string, VerifiedVerseRecord>;
  tafsirs: Record<string, VerifiedTafsirRecord>;
}

const store = verifiedDataRaw as unknown as VerifiedQuranDataStore;

const ARABIC_DIGITS = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];

function toArabicIndicDigits(num: number): string {
  return String(num)
    .split('')
    .map((d) => ARABIC_DIGITS[Number(d)] ?? d)
    .join('');
}

export function expandVerseReference(ref: string): string[] {
  const match = String(ref).trim().match(/^(\d+):(\d+)(?:-(\d+))?$/);
  if (!match) return [];
  const surah = Number(match[1]);
  const start = Number(match[2]);
  const end = match[3] ? Number(match[3]) : start;
  const keys: string[] = [];
  for (let v = start; v <= end; v++) {
    keys.push(`${surah}:${v}`);
  }
  return keys;
}

export function getVerifiedPassagesForRefs(
  refs: string[]
): VerifiedVersePassage[] {
  const passages: VerifiedVersePassage[] = [];

  for (const rawRef of refs) {
    const keys = expandVerseReference(rawRef);
    if (keys.length === 0) continue;

    const verseRecords = keys
      .map((k) => store.verses[k])
      .filter((v): v is VerifiedVerseRecord => Boolean(v));
    if (verseRecords.length === 0) continue;

    const surahNum = verseRecords[0].surah;
    const chapterMeta = store.chapters[String(surahNum)];
    if (!chapterMeta) continue;

    const arabicText =
      verseRecords.length === 1
        ? `${verseRecords[0].arabic} ﴿${toArabicIndicDigits(verseRecords[0].ayah)}﴾`
        : verseRecords
            .map(
              (v) => `${v.arabic} ﴿${toArabicIndicDigits(v.ayah)}﴾`
            )
            .join(' ');

    const translationText =
      verseRecords.length === 1
        ? verseRecords[0].translation
        : verseRecords
            .map((v) => `[${v.ayah}] ${v.translation}`)
            .join(' ');

    const firstAyah = verseRecords[0].ayah;
    const lastAyah = verseRecords[verseRecords.length - 1].ayah;
    const verseNumbers =
      firstAyah === lastAyah ? String(firstAyah) : `${firstAyah}–${lastAyah}`;

    const quranComSlug =
      firstAyah === lastAyah
        ? `${surahNum}/${firstAyah}`
        : `${surahNum}/${firstAyah}-${lastAyah}`;

    passages.push({
      reference: rawRef,
      surahNumber: surahNum,
      surahNameSimple: chapterMeta.nameSimple,
      surahNameArabic: chapterMeta.nameArabic,
      surahTranslatedName: chapterMeta.translatedName,
      revelationPlace:
        chapterMeta.revelationPlace === 'makkah' ? 'Makkan' : 'Madinan',
      verseNumbers,
      arabicText,
      translationText,
      translator: store.translationResource.name,
      translationSource: `Quran.com API v4 (${store.translationResource.name}, Resource ID ${store.translationResource.id})`,
      sourceUrl: `https://quran.com/${quranComSlug}`,
    });
  }

  return passages;
}

export function getVerifiedTafsirForRefs(refs: string[]): RawTafsirSource[] {
  const results: RawTafsirSource[] = [];
  const seenSummaries = new Set<string>();

  for (const rawRef of refs) {
    const keys = expandVerseReference(rawRef);
    for (const key of keys) {
      const t = store.tafsirs[key];
      if (!t || !t.summary) continue;

      const dedupeKey = `${t.sourceUrl}::${t.summary.slice(0, 80)}`;
      if (seenSummaries.has(dedupeKey)) continue;
      seenSummaries.add(dedupeKey);

      const coveredSpan =
        t.coveredKeys.length > 1
          ? `${t.coveredKeys[0]}–${t.coveredKeys[t.coveredKeys.length - 1]}`
          : key;

      results.push({
        scholar: t.scholar,
        work: t.heading ? `${t.work} — "${t.heading}"` : t.work,
        summary: t.summary,
        source_url: t.sourceUrl,
        covered_verses: coveredSpan,
        verification_note: `Verified via Quran.com API v4 (Resource ID ${store.tafsirResource.id}, ${t.coveredKeys.join(', ')}). Additional classical works (al-Tabari, al-Qurtubi, al-Baghawi, al-Jalalayn, Ibn Ashur) remain queued for full Arabic-edition cross-verification.`,
      });
    }
  }

  return results;
}

export function getVerifiedQuranCorpusStats() {
  return {
    verifiedAt: store.verifiedAt,
    uniqueAyahsVerified: Object.keys(store.verses).length,
    uniqueTafsirsVerified: Object.keys(store.tafsirs).length,
    translator: store.translationResource.name,
    tafsirSource: store.tafsirResource.name,
  };
}

/**
 * Enriches a normalized dataset entry with verified Uthmani Arabic text,
 * Saheeh International translation, Surah metadata, and verified Ibn Kathir
 * classical tafsir while preserving every original grade, source, caution,
 * and limitation verbatim.
 */
export function enrichEntryWithVerifiedQuranAndTafsir(
  entry: RawDatasetEntry
): RawDatasetEntry {
  const refs =
    entry.quranic_evidence.references?.length > 0
      ? entry.quranic_evidence.references
      : entry.quran_reference
          .split(',')
          .map((s) => s.trim())
          .filter(Boolean);

  const verifiedPassages = getVerifiedPassagesForRefs(refs);
  const verifiedTafsir = getVerifiedTafsirForRefs(refs);

  const mergedArabic =
    entry.quranic_evidence.verse_text_arabic ??
    (verifiedPassages.length > 0
      ? verifiedPassages
          .map((p) =>
            verifiedPassages.length > 1
              ? `﴿ ${p.surahNameSimple} ${p.reference} ﴾ ${p.arabicText}`
              : p.arabicText
          )
          .join('   ')
      : null);

  const mergedTranslation =
    entry.quranic_evidence.translation ??
    (verifiedPassages.length > 0
      ? verifiedPassages
          .map((p) =>
            verifiedPassages.length > 1
              ? `(${p.surahNameSimple} ${p.reference}) "${p.translationText}"`
              : `"${p.translationText}"`
          )
          .join(' ')
      : null);

  const mergedTranslator =
    entry.quranic_evidence.translator ??
    (verifiedPassages.length > 0 ? store.translationResource.name : null);

  const existingSources = entry.classical_tafsir_review.sources ?? [];
  const existingUrls = new Set(existingSources.map((s) => s.source_url));
  const combinedTafsirSources = [
    ...existingSources,
    ...verifiedTafsir.filter((vt) => !existingUrls.has(vt.source_url)),
  ];

  const hasVerifiedTafsir = combinedTafsirSources.length > 0;
  const originalTafsirStatus = entry.classical_tafsir_review.status;
  const updatedTafsirStatus = hasVerifiedTafsir
    ? originalTafsirStatus.includes('tabari') || existingSources.length > 0
      ? 'Multi-Source Classical Commentary'
      : 'Verified Classical Commentary (Tafsir Ibn Kathir)'
    : originalTafsirStatus;

  const updatedTafsirNotes = hasVerifiedTafsir
    ? `${entry.classical_tafsir_review.notes} Verified commentary from Tafsir Ibn Kathir (Abridged, Quran.com) is attached below to establish classical exegetical context independently of modern scientific frameworks.`
    : entry.classical_tafsir_review.notes;

  const updatedTextVerification =
    verifiedPassages.length > 0
      ? `Uthmani Arabic script and Saheeh International English translation retrieved and verified against Quran.com (${store.verifiedAt}) for ${refs.join(', ')}. Read each verse within its complete surah and classical commentary context.`
      : entry.quranic_evidence.text_verification;

  return {
    ...entry,
    quranic_evidence: {
      ...entry.quranic_evidence,
      verse_text_arabic: mergedArabic,
      translation: mergedTranslation,
      translator: mergedTranslator,
      translation_source:
        verifiedPassages.length > 0
          ? `Quran.com · ${store.translationResource.name}`
          : undefined,
      text_verification: updatedTextVerification,
      verified_passages: verifiedPassages,
    },
    classical_tafsir_review: {
      ...entry.classical_tafsir_review,
      status: updatedTafsirStatus,
      notes: updatedTafsirNotes,
      sources: combinedTafsirSources,
    },
  };
}
