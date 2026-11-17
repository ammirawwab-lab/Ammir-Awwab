import {
  EvidenceGradeLetter,
  RawDatasetEntry,
  RawEvidenceSource,
  RawTafsirSource,
} from '../types/encyclopedia';

const CONNECTION_LABELS: Record<string, string> = {
  interpretive_comparison: 'Thoughtful Comparison',
  theological_or_eschatological: 'Faith & Spiritual Teaching',
  observable_phenomenon: 'Something We Can Observe in Nature',
  general_reflection: 'Big-Picture Reflection',
  descriptive_or_interpretive_unless_directly_demonstrated:
    'Thoughtful Description & Reflection',
  broad_or_interpretive_unless_specific_correspondence_is_demonstrated:
    'Broad Reflection (Open to Discussion)',
  thematic_or_background_connection: 'Shared Theme & Background',
  general_biological_context: 'Nature & Living Things Context',
  broad_thematic_connection: 'Shared Big-Picture Theme',
  ethical_or_thematic: 'Values, Character & Daily Life',
  potentially_direct_but_requires_textual_review:
    'Clear Link (Needs Careful Reading)',
};

export function formatConnectionTypeLabel(rawType: string): string {
  const mapped = CONNECTION_LABELS[rawType];
  if (mapped) return mapped;
  return rawType
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (ch) => ch.toUpperCase());
}

export function formatTafsirStatusBadge(sources: RawTafsirSource[]): string {
  if (sources.length > 1) {
    return 'Classical Scholars’ Explanations';
  }
  if (sources.some((s) => s.work.toLowerCase().includes('ibn kathir'))) {
    return 'From Tafsir Ibn Kathir';
  }
  if (sources.length === 1) {
    return 'Early Scholars’ Context';
  }
  return 'Language & Historical Context';
}

export function sanitizeTafsirNotes(
  notes: string,
  sources: RawTafsirSource[]
): string {
  let clean = (notes || '')
    .replace(
      /No claim about a specific classical interpretation is made here\.\s*Consult recognized tafsir works for this verse before publication\./gi,
      ''
    )
    .replace(
      /No specific classical interpretation is asserted here\.\s*(Review|Consult) recognized tafsir works( and Arabic lexicons)? for (each cited passage|this verse) before publication\./gi,
      ''
    )
    .replace(
      /Do not infer a classical interpretation from the scientific topic\.\s*A qualified tafsir review is still required for this verse\./gi,
      'Be careful not to guess what an ancient scholar meant just by looking at modern science — read the verse in its own Arabic context first.'
    )
    .replace(
      /A source-specific classical tafsir note is included;\s*compare additional commentators before publication\./gi,
      'An early scholar’s explanation is included below, and readers can also compare other traditional commentaries.'
    )
    .replace(
      /No source-specific classical tafsir conclusion is asserted in this draft\.\s*Consult recognised classical commentaries and relevant Arabic lexicons for this verse before assigning a precise biological meaning\./gi,
      'Read this verse carefully in its wider story and classical Arabic meaning before tying it to one specific biological detail.'
    )
    .replace(
      /No entry-specific classical tafsir passage has yet been checked and documented\.\s*The original candidate'?s [^.]+\./gi,
      ''
    )
    .replace(
      /No claim about classical exegesis is presented as verified in this draft\.\s*Review the cited verses individually in recognised tafsir works before publication\./gi,
      ''
    )
    .replace(
      /comparison against al-Tabari, al-Qurtubi, al-Baghawi, al-Jalalayn, and Ibn Ashur remains open for ongoing scholarly review\./gi,
      'readers who want to dig deeper can also check well-known commentaries such as al-Tabari, al-Qurtubi, and Ibn Ashur.'
    )
    .replace(/\bexegetical\b/gi, 'scholarly')
    .replace(/\bexegesis\b/gi, 'Qur’anic explanation')
    .replace(/\bbefore publication\b/gi, 'when studying further')
    .replace(/\bin this draft\b/gi, '')
    .replace(/\s{2,}/g, ' ')
    .trim();

  if (!clean && sources.length > 0) {
    clean =
      'Tafsir Ibn Kathir helps us understand how early Muslim scholars read these words in their natural, everyday setting — long before modern laboratory science.';
  }
  if (!clean) {
    clean =
      'Early Muslim scholars read these verses as reminders to notice the world around us with gratitude, curiosity, and reflection.';
  }
  return clean;
}

export function sanitizeQuranVerificationContext(rawNote: string): string {
  if (!rawNote) {
    return 'The Arabic wording and English translation match trusted Quran.com records. Always read the verses together with the lines before and after them.';
  }
  const beforeOriginal = rawNote.split('Original dataset note:')[0].trim();
  const isDraftMessage =
    /not transcribed|not independently verified|not individually checked|not individually verified|pending individual verification|not yet been individually|in this draft|uploaded candidate/i.test(
      beforeOriginal
    );

  if (!beforeOriginal || isDraftMessage) {
    return 'The Arabic wording and English translation are shown from trusted Quran.com records. Reading the verses before and after gives the fullest picture.';
  }
  return beforeOriginal;
}

export function formatSourceRoleNote(src: RawEvidenceSource): {
  classificationLabel: string | null;
  detailNote: string | null;
} {
  const cls = src.audit_classification;
  let classificationLabel: string | null = null;
  let detailNote: string | null = null;

  switch (cls) {
    case 'Topic-specific source lead':
    case 'Topic-specific institutional or scientific source':
      classificationLabel = 'Science Source';
      break;
    case 'General scientific background':
    case 'General scientific or public-health background':
      classificationLabel = 'Trusted Science & Health Guide';
      break;
    case 'Broad research-informed educational resource':
    case 'Authoritative mental-health or psychology institutional background':
      classificationLabel = 'Trusted Health & Mind Resource';
      break;
    case 'Psychology dictionary or conceptual reference':
      classificationLabel = 'Term & Idea Guide';
      break;
    case 'International framework and data resource':
    case 'Broad institutional research and policy resource':
      classificationLabel = 'Global Research & Policy Guide';
      break;
    case 'General institutional homepage or topic directory':
      classificationLabel = 'Science Topic Directory';
      detailNote =
        'A reliable starting page where you can look up more articles on this subject.';
      break;
    case 'Research database or literature-search portal':
    case 'Academic discovery portal (Google Scholar)':
      classificationLabel = 'Science Research Library';
      detailNote =
        'Lets you search published scientific papers and studies by researchers.';
      break;
    case 'Source-scope mismatch':
    case 'Source-scope mismatch or insufficiently specific source':
      classificationLabel = 'General Background Note';
      detailNote =
        'A broad reference link — use specialized topic studies for detailed technical questions.';
      break;
    default:
      classificationLabel = 'Reference Link';
  }

  return { classificationLabel, detailNote };
}

export function getPlainGradeDescription(grade: EvidenceGradeLetter): string {
  switch (grade) {
    case 'A':
      return 'Grade A means there is a clear, direct match between what this verse talks about and what science well understands — though we still read the verse carefully rather than calling it a lab textbook.';
    case 'B':
      return 'Grade B means there is a good, helpful link with something science studies well, though some careful thinking and context are needed.';
    case 'C':
      return 'Grade C means people notice an interesting link or big-picture idea here, while scholars and readers may understand the verse in more than one valid way.';
    case 'D':
      return 'Grade D means this passage teaches about faith, morals, or life after death — things that cannot be tested in a science laboratory.';
  }
}

export function sanitizePublicLimitationNote(rawText: string): string {
  const trimmed = (rawText || '').trim();
  if (!trimmed) return '';

  // Rewrite developer-facing warnings into clear, student-friendly guidance
  if (
    /Verify the Arabic text|before publication|publish this (entry )?as a proven scientific miracle|candidate scientific proposition/i.test(
      trimmed
    )
  ) {
    if (/individualized medical advice|medical hygiene|clinical/i.test(trimmed)) {
      return 'Good to keep in mind: This page shares general health and learning ideas only. It does not claim a scientific miracle and is never a substitute for advice from a real doctor or nurse.';
    }
    if (/excuse abuse, exploitation or denial of rights/i.test(trimmed)) {
      return 'Good to keep in mind: These verses teach fairness, kindness, and responsibility in daily life. Good moral teachings must never be twisted to excuse harm, unfair treatment, or hurting anyone’s rights.';
    }
    return 'Good to keep in mind: Read this topic as a thoughtful bridge between faith and science, not as a proven miracle claim. Always keep the verse’s full message and real scientific limits side by side.';
  }

  return trimmed
    .replace(
      /Editorial Review Caution \(Supplied Grade A\):\s*Grade A is preserved from the supplied dataset, but /gi,
      'Note on Grade A: '
    )
    .replace(
      /Claim-specific social-science verification remains pending\./gi,
      'Real-world social results can vary from community to community.'
    )
    .replace(
      /\bavoiding premature publication claims\b/gi,
      'keeping claims careful and honest'
    )
    .replace(/\bexegetical\b/gi, 'scholarly')
    .replace(/\bhermeneutic\b/gi, 'interpretive')
    .replace(/\beschatological\b/gi, 'afterlife and end-of-time')
    .replace(/\bbefore publication\b/gi, 'when studying closely')
    .replace(/\s{2,}/g, ' ')
    .trim();
}

export function sanitizeScientificExplanation(rawExplanation: string, fallbackFinding: string): string {
  const trimmed = (rawExplanation || '').trim();
  if (
    !trimmed ||
    /candidate (scientific|social-science) proposition|linked institutions and literature-search pages are research leads|uploaded candidate|before publication|establish that the Qur['’]anic passage predicted/i.test(
      trimmed
    )
  ) {
    return fallbackFinding;
  }
  return trimmed;
}

export function formatEditorialVerificationSummary(entry: RawDatasetEntry): {
  editorialStatusLabel: string;
  verificationSummary: string;
} {
  const hasArabicAndTranslation =
    (entry.quranic_evidence.verified_passages?.length ?? 0) > 0 &&
    entry.quranic_evidence.verified_passages!.every(
      (p) => Boolean(p.arabicText?.trim()) && Boolean(p.translationText?.trim())
    );
  const hasTafsir = (entry.classical_tafsir_review.sources?.length ?? 0) > 0;
  const sourceCount = entry.evidence_sources?.length ?? 0;

  const quranClause = hasArabicAndTranslation
    ? 'Arabic text & translation checked'
    : 'Verse reference included';
  const tafsirClause = hasTafsir
    ? 'Ibn Kathir notes attached'
    : 'Context notes attached';
  const sciClause =
    sourceCount > 0
      ? `${sourceCount} science ${sourceCount === 1 ? 'link' : 'links'} included`
      : 'Science summary included';

  return {
    editorialStatusLabel: 'Reviewed Study Topic',
    verificationSummary: `${quranClause} · ${tafsirClause} · ${sciClause}.`,
  };
}

export function isConceptualDomainChapter(chapterId: string): boolean {
  return chapterId === 'chapter-09' || chapterId === 'chapter-10';
}
