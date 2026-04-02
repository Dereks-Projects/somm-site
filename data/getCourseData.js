import courses from './courses.json';
import introLessons from './introduction-to-wine-lessons.json';
import sommLessons from './the-sommelier-position-lessons.json';
import bevMgmtLessons from './beverage-management-lessons.json';

const lessonsByCourse = {
  'introduction-to-wine': introLessons,
  'the-sommelier-position': sommLessons,
  'beverage-management-proseminar': bevMgmtLessons,
};

/** Returns all courses for the catalog page. */
export function getAllCourses() {
  return courses;
}

/** Returns a single course object by its slug, or null if not found. */
export function getCourseBySlug(courseSlug) {
  return courses.find((course) => course.courseSlug === courseSlug) || null;
}

/** Returns all lessons for a given course slug, sorted by lessonNumber. */
export function getLessonsByCourse(courseSlug) {
  const lessons = lessonsByCourse[courseSlug];
  if (!lessons) return null;
  return [...lessons].sort((a, b) => a.lessonNumber - b.lessonNumber);
}

/** Returns a single lesson by course slug and lesson slug, or null if not found. */
export function getLesson(courseSlug, lessonSlug) {
  const lessons = lessonsByCourse[courseSlug];
  if (!lessons) return null;
  return lessons.find((lesson) => lesson.slug === lessonSlug) || null;
}