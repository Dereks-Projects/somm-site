// lib/lessonBlocks.js
//
// Reads a lesson's optional hero summary and interactive blocks from its file
// in data/lesson-blocks/ and returns them in a clean, predictable shape for
// the lesson page. Incomplete or malformed entries are dropped, so a typo in
// the JSON hides that one entry (or the whole block) instead of breaking the
// page: no data, no block.
//
// It also holds the small pure functions the interactive components use, so
// their behavior can be tested without a browser.

/** Glass colors a toggle builder may use; each has a swatch in ToggleBuilder.module.css. */
export const GLASS_COLORS = [
  'paleLemon',
  'lemon',
  'paleGold',
  'gold',
  'deepGold',
  'amber',
  'pink',
  'salmon',
  'purple',
  'ruby',
  'garnet',
  'tawny',
];

const SECTION_NUMBERS = [1, 2, 3];

const isObject = (value) => value !== null && typeof value === 'object' && !Array.isArray(value);
const asArray = (value) => (Array.isArray(value) ? value : []);
const cleanText = (value) => (typeof value === 'string' ? value.trim() : '');
const cleanTextList = (value) => asArray(value).map(cleanText).filter(Boolean);

function reportProblem(lessonSlug, message) {
  if (process.env.NODE_ENV !== 'production') {
    console.warn(`[lesson blocks] ${lessonSlug || 'unknown lesson'}: ${message}`);
  }
}

function readHeading(raw, defaultEyebrow) {
  return {
    eyebrow: cleanText(raw.eyebrow) || defaultEyebrow,
    title: cleanText(raw.title),
    intro: cleanText(raw.intro),
  };
}

function readPlacement(raw, fallback) {
  return SECTION_NUMBERS.includes(raw.afterSection) ? raw.afterSection : fallback;
}

// Keeps the first option with each id, so radio values never collide.
function uniqueById(items) {
  const seen = new Set();
  return items.filter((item) => {
    if (seen.has(item.id)) return false;
    seen.add(item.id);
    return true;
  });
}

// A rule applies when every control it names is set to the option it names.
// A rule with an empty "when" applies to everything, so it works as a default.
function readRules(rawRules, controls, readValue) {
  const optionsByControl = new Map(
    controls.map((control) => [control.id, new Set(control.options.map((option) => option.id))])
  );

  return asArray(rawRules)
    .filter(isObject)
    .map((rule) => {
      const when = isObject(rule.when) ? rule.when : {};
      const isValid = Object.entries(when).every(
        ([controlId, optionId]) =>
          typeof optionId === 'string' && Boolean(optionsByControl.get(controlId)?.has(optionId))
      );
      const value = readValue(rule);
      return isValid && value ? { when: { ...when }, ...value } : null;
    })
    .filter(Boolean);
}

function readToggleBuilder(raw) {
  if (!isObject(raw)) return null;

  const controls = uniqueById(
    asArray(raw.controls)
      .filter(isObject)
      .map((control) => ({
        id: cleanText(control.id),
        label: cleanText(control.label),
        options: uniqueById(
          asArray(control.options)
            .filter(isObject)
            .map((option) => ({
              id: cleanText(option.id),
              label: cleanText(option.label),
              notes: cleanTextList(option.notes),
              line: cleanText(option.line),
            }))
            .filter((option) => option.id && option.label)
        ),
      }))
      .filter((control) => control.id && control.label && control.options.length >= 2)
  );

  const heading = readHeading(raw, 'Try it');
  if (!heading.title || controls.length === 0) return null;

  return {
    ...heading,
    afterSection: readPlacement(raw, 1),
    controls,
    footnote: cleanText(raw.footnote),
    styles: readRules(raw.styles, controls, (rule) => {
      const name = cleanText(rule.name);
      return name ? { name } : null;
    }),
    glass: readRules(raw.glass, controls, (rule) => {
      const label = cleanText(rule.label);
      return GLASS_COLORS.includes(rule.color) && label ? { color: rule.color, label } : null;
    }),
  };
}

function readCompareSwitch(raw) {
  if (!isObject(raw)) return null;

  const cards = asArray(raw.cards)
    .filter(isObject)
    .map((card) => {
      const variants = asArray(card.variants)
        .filter(isObject)
        .map((variant) => ({
          label: cleanText(variant.label),
          headline: cleanText(variant.headline),
          notes: cleanTextList(variant.notes),
        }))
        .filter((variant) => variant.label && (variant.headline || variant.notes.length > 0));
      const from = cleanText(card.range?.from);
      const to = cleanText(card.range?.to);

      return {
        name: cleanText(card.name),
        switchLabel: cleanText(card.switchLabel) || 'Choose one',
        variants: variants.length >= 2 ? variants : [],
        headline: cleanText(card.headline),
        notes: cleanTextList(card.notes),
        range: from && to ? { from, to } : null,
        footnote: cleanText(card.footnote),
      };
    })
    .filter((card) => card.name && (card.variants.length > 0 || card.headline || card.notes.length > 0));

  const heading = readHeading(raw, 'Compare');
  if (!heading.title || cards.length === 0) return null;

  return { ...heading, afterSection: readPlacement(raw, 2), cards };
}

function readFlashCards(raw) {
  if (!isObject(raw)) return null;

  const cards = asArray(raw.cards)
    .filter(isObject)
    .map((card) => ({
      name: cleanText(card.name),
      tag: cleanText(card.tag),
      text: cleanText(card.text),
      notes: cleanTextList(card.notes),
      body: Number.isInteger(card.body) && card.body >= 1 && card.body <= 5 ? card.body : null,
      bodyLabel: cleanText(card.bodyLabel),
    }))
    .filter((card) => card.name && (card.text || card.notes.length > 0));

  const heading = readHeading(raw, 'Flash cards');
  if (!heading.title || cards.length === 0) return null;

  return {
    ...heading,
    afterSection: readPlacement(raw, 3),
    chooseLabel: cleanText(raw.chooseLabel) || 'Choose a card',
    cards,
  };
}

function readScenario(raw) {
  if (!isObject(raw)) return null;

  const choices = asArray(raw.choices)
    .filter(isObject)
    .map((choice) => ({
      text: cleanText(choice.text),
      correct: choice.correct === true,
      feedback: cleanText(choice.feedback),
    }))
    .filter((choice) => choice.text && choice.feedback);

  const heading = readHeading(raw, 'Your call');
  const prompt = cleanText(raw.prompt);
  const hasCorrectChoice = choices.some((choice) => choice.correct);
  if (!heading.title || !prompt || choices.length < 2 || !hasCorrectChoice) return null;

  return { ...heading, prompt, choices };
}

function readQuickCheck(raw) {
  if (!isObject(raw)) return null;

  const questions = asArray(raw.questions)
    .filter(isObject)
    .map((question) => ({
      prompt: cleanText(question.prompt),
      options: cleanTextList(question.options),
      answer: question.answer,
      explanation: cleanText(question.explanation),
    }))
    .filter(
      (question) =>
        question.prompt &&
        question.options.length >= 2 &&
        Number.isInteger(question.answer) &&
        question.answer >= 0 &&
        question.answer < question.options.length
    );

  const heading = readHeading(raw, 'Quick check');
  if (!heading.title || questions.length === 0) return null;

  return { ...heading, questions };
}

function readTryThisWeek(raw) {
  if (!isObject(raw)) return null;

  const items = cleanTextList(raw.items);
  if (items.length === 0) return null;

  return {
    eyebrow: cleanText(raw.eyebrow) || 'Take it to the glass',
    title: cleanText(raw.title) || 'Things to try this week',
    items,
  };
}

const READERS = {
  toggleBuilder: readToggleBuilder,
  compareSwitch: readCompareSwitch,
  flashCards: readFlashCards,
  scenario: readScenario,
  quickCheck: readQuickCheck,
  tryThisWeek: readTryThisWeek,
};

/**
 * Returns a lesson's hero summary and every interactive block it defines,
 * cleaned and validated. A block the file does not define, or defines
 * incompletely, is null; a missing summary is an empty string.
 *
 * @param {object|null} blockData - The lesson's file from data/lesson-blocks/, or null.
 * @param {string} lessonSlug - The lesson being shown; must match the file's "lessonSlug".
 * @returns {{ summary: string, toggleBuilder: object|null, compareSwitch: object|null,
 *             flashCards: object|null, scenario: object|null, quickCheck: object|null,
 *             tryThisWeek: object|null }}
 */
export function getLessonBlocks(blockData, lessonSlug) {
  const blocks = { summary: '' };
  for (const field of Object.keys(READERS)) blocks[field] = null;

  if (!isObject(blockData)) return blocks;

  // A file labeled for a different lesson shows nothing rather than the wrong content.
  if (blockData.lessonSlug !== lessonSlug) {
    reportProblem(lessonSlug, `its block file is labeled "${blockData.lessonSlug}", so nothing is shown`);
    return blocks;
  }

  blocks.summary = cleanText(blockData.summary);

  for (const [field, read] of Object.entries(READERS)) {
    const raw = blockData[field];
    blocks[field] = raw === undefined ? null : read(raw);

    if (raw !== undefined && blocks[field] === null) {
      reportProblem(lessonSlug, `"${field}" is missing required parts, so it is hidden`);
    }
  }

  return blocks;
}

/** The first rule whose conditions all match the current selection, or null. */
export function findRule(rules, selection) {
  return (
    rules.find((rule) =>
      Object.entries(rule.when).every(([controlId, optionId]) => selection[controlId] === optionId)
    ) || null
  );
}

/** Starting selection for a toggle builder: the first option of every control. */
export function getDefaultSelection(builder) {
  return Object.fromEntries(builder.controls.map((control) => [control.id, control.options[0].id]));
}

/** What the glass shows for the current toggle builder selection. */
export function getToggleResult(builder, selection) {
  const chosen = builder.controls.map(
    (control) =>
      control.options.find((option) => option.id === selection[control.id]) || control.options[0]
  );

  return {
    style: findRule(builder.styles, selection)?.name || '',
    glass: findRule(builder.glass, selection),
    notes: [...new Set(chosen.flatMap((option) => option.notes))],
    description: chosen
      .map((option) => option.line)
      .filter(Boolean)
      .join(' '),
  };
}

/** Number of quick check questions answered correctly. */
export function countCorrect(questions, answers) {
  return questions.reduce(
    (total, question, index) => total + (answers[index] === question.answer ? 1 : 0),
    0
  );
}