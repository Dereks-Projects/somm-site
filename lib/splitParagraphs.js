// lib/splitParagraphs.js
//
// Splits a long block of lesson text into shorter paragraphs so lessons read
// less like a wall of text. The words never change: each piece is an exact,
// in-order run of the original sentences, so the full lesson text is still
// server-rendered for search engines.
//
// How the text is split:
// 1. If the text contains a blank line, the author chose the breaks in the
//    JSON, and those breaks are used exactly as written.
// 2. Otherwise the text is cut at sentence boundaries into the fewest pieces
//    that keep each piece at or under `maxWords` (as far as sentence lengths
//    allow), with the pieces as even in length as possible.
//
// Sentence boundaries come from Intl.Segmenter (the sentence rules built into
// Node.js), which keeps abbreviations such as "U.S. states" together. If it is
// ever unavailable, the text is returned whole rather than split on a guess.

/** Default upper limit, in words, for one paragraph of lesson body text. */
export const DEFAULT_MAX_WORDS = 110;

/** Upper limit, in words, for the large opening paragraph of a lesson. */
export const DEFAULT_LEAD_MAX_WORDS = 60;

// In these lessons a short sentence in the middle of a paragraph almost always
// introduces what follows ("The winemaker's choices further transform the
// wine."), so a paragraph should not end on one. A break after a sentence this
// short counts as this many words further from its ideal position.
const LEAD_IN_MAX_WORDS = 8;
const LEAD_IN_PENALTY_WORDS = 15;

const BLANK_LINE = /\r?\n[ \t]*\r?\n/;

const sentenceSegmenter =
  typeof Intl !== 'undefined' && typeof Intl.Segmenter === 'function'
    ? new Intl.Segmenter('en', { granularity: 'sentence' })
    : null;

function countWords(text) {
  const trimmed = text.trim();
  return trimmed === '' ? 0 : trimmed.split(/\s+/).length;
}

/**
 * Splits lesson text into readable paragraphs without changing any words.
 *
 * @param {string} text - One paragraph of lesson text from the lesson JSON.
 * @param {{ maxWords?: number }} [options]
 * @returns {string[]} The paragraphs, in order. Empty when there is no text.
 */
export function splitParagraphs(text, { maxWords = DEFAULT_MAX_WORDS } = {}) {
  if (typeof text !== 'string') return [];

  const trimmed = text.trim();
  if (trimmed === '') return [];

  // Author-chosen breaks win over automatic splitting.
  if (BLANK_LINE.test(trimmed)) {
    return trimmed
      .split(BLANK_LINE)
      .map((piece) => piece.trim())
      .filter((piece) => piece !== '');
  }

  if (!sentenceSegmenter || !Number.isFinite(maxWords) || maxWords <= 0) {
    return [trimmed];
  }

  const sentences = Array.from(sentenceSegmenter.segment(trimmed), (part) => part.segment);
  const wordCounts = sentences.map(countWords);
  const totalWords = wordCounts.reduce((sum, count) => sum + count, 0);
  const pieceCount = Math.min(sentences.length, Math.ceil(totalWords / maxWords));

  if (pieceCount <= 1) return [trimmed];

  // Running word total at the end of each sentence.
  const wordsThrough = [];
  let runningTotal = 0;
  for (const count of wordCounts) {
    runningTotal += count;
    wordsThrough.push(runningTotal);
  }

  // Each break goes at the sentence end closest to its even share of the words
  // (avoiding a short lead-in sentence as the last line), while leaving at
  // least one sentence for every piece still to come.
  const breakCost = (end, idealWords) =>
    Math.abs(wordsThrough[end] - idealWords) +
    (wordCounts[end] <= LEAD_IN_MAX_WORDS ? LEAD_IN_PENALTY_WORDS : 0);

  const lastSentenceOfPiece = [];
  let previousEnd = -1;
  for (let piece = 1; piece < pieceCount; piece += 1) {
    const idealWords = (piece * totalWords) / pieceCount;
    const earliestEnd = previousEnd + 1;
    const latestEnd = sentences.length - 1 - (pieceCount - piece);

    let bestEnd = earliestEnd;
    for (let end = earliestEnd + 1; end <= latestEnd; end += 1) {
      if (breakCost(end, idealWords) < breakCost(bestEnd, idealWords)) {
        bestEnd = end;
      }
    }

    lastSentenceOfPiece.push(bestEnd);
    previousEnd = bestEnd;
  }
  lastSentenceOfPiece.push(sentences.length - 1);

  const paragraphs = [];
  let start = 0;
  for (const end of lastSentenceOfPiece) {
    paragraphs.push(sentences.slice(start, end + 1).join('').trim());
    start = end + 1;
  }

  return paragraphs;
}

/**
 * Splits a lesson introduction into a short opening "lead" paragraph (shown in
 * large type) and the rest (split like body text). The lead takes as many
 * opening sentences as fit within `leadMaxWords`, and always at least one.
 * A blank line in the JSON sets the lead by hand: the first block is the lead.
 *
 * @param {string} text - The lesson's introduction paragraph.
 * @param {{ leadMaxWords?: number, maxWords?: number }} [options]
 * @returns {{ lead: string, rest: string[] }} An empty lead when there is no text.
 */
export function splitLead(
  text,
  { leadMaxWords = DEFAULT_LEAD_MAX_WORDS, maxWords = DEFAULT_MAX_WORDS } = {}
) {
  if (typeof text !== 'string' || text.trim() === '') return { lead: '', rest: [] };

  const trimmed = text.trim();

  if (BLANK_LINE.test(trimmed) || !sentenceSegmenter) {
    const [lead, ...rest] = splitParagraphs(trimmed, { maxWords });
    return { lead, rest };
  }

  const sentences = Array.from(sentenceSegmenter.segment(trimmed), (part) => part.segment);
  let leadEnd = 0;
  let leadWords = countWords(sentences[0]);
  while (
    leadEnd + 1 < sentences.length &&
    leadWords + countWords(sentences[leadEnd + 1]) <= leadMaxWords
  ) {
    leadEnd += 1;
    leadWords += countWords(sentences[leadEnd]);
  }

  return {
    lead: sentences.slice(0, leadEnd + 1).join('').trim(),
    rest: splitParagraphs(sentences.slice(leadEnd + 1).join(''), { maxWords }),
  };
}