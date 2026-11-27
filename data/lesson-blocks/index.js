// data/lesson-blocks/index.js
//
// The list of lessons that have interactive content (the hero summary, quiz,
// flash cards, guest question, and the other blocks). Each lesson's content
// lives in its own small JSON file, named after the lesson's slug, inside a
// folder named after its course. The lesson text itself stays in the
// *-lessons.json files and is never edited for these blocks.
//
// To add a lesson: create its JSON file, import it below, and add one line
// under its course. A lesson that is not listed has no interactive blocks.
//
// Server only: the lesson page reads this file on the server, so visitors
// receive only the content for the lesson they are reading.

import introCourseWhiteWine from './introduction-to-wine/intro-course-white-wine.json';

const LESSON_BLOCKS = {
  'introduction-to-wine': {
    'intro-course-white-wine': introCourseWhiteWine,
  },
};

/**
 * The interactive content file for one lesson, or null when it has none.
 *
 * @param {string} courseSlug - For example "introduction-to-wine".
 * @param {string} lessonSlug - For example "intro-course-white-wine".
 * @returns {object|null}
 */
export function getLessonBlockData(courseSlug, lessonSlug) {
  const course = Object.hasOwn(LESSON_BLOCKS, courseSlug) ? LESSON_BLOCKS[courseSlug] : null;
  if (!course || !Object.hasOwn(course, lessonSlug)) return null;
  return course[lessonSlug];
}