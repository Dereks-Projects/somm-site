// components/lesson/LessonHero.js
// Top of every lesson page.
// 1. The hero: the lesson image, full width and darkened, with the breadcrumb,
//    the course and lesson label, the title, and an optional one-line summary
//    on top. The image is the first thing on screen, so it loads first.
// 2. The lesson bar: a slim black band under the hero with the course progress
//    bar and the "In this lesson" jump links to each numbered section.
// Server component: renders plain HTML with no browser JavaScript.

import Image from 'next/image';
import Link from 'next/link';
import styles from './LessonHero.module.css';

// Longer titles step down in size so they stay within a few lines.
function getTitleSizeClass(title) {
  if (title.length > 40) return styles.titleLong;
  if (title.length > 24) return styles.titleMedium;
  return '';
}

function formatNumber(number) {
  return String(number).padStart(2, '0');
}

export default function LessonHero({ course, lesson, lessonPosition, totalLessons, sections = [] }) {
  const summary = typeof lesson.summary === 'string' ? lesson.summary.trim() : '';
  const titleClassName = [styles.title, getTitleSizeClass(lesson.lessonTitle)]
    .filter(Boolean)
    .join(' ');
  const jumpSections = sections.filter((section) => section.title);

  return (
    <>
      <header className={styles.hero}>
        {lesson.heroImage && (
          <Image
            src={lesson.heroImage}
            alt={lesson.heroImageAlt || ''}
            fill
            sizes="100vw"
            loading="eager"
            fetchPriority="high"
            className={styles.heroImage}
          />
        )}

        <div className={styles.heroInner}>
          <nav aria-label="Breadcrumb">
            <ol className={styles.breadcrumb}>
              <li className={styles.crumb}>
                <Link href="/courses" className={styles.crumbLink}>
                  Courses
                </Link>
              </li>
              <li className={styles.crumb}>
                <Link href={`/courses/${course.courseSlug}`} className={styles.crumbLink}>
                  {course.courseTitle}
                </Link>
              </li>
              <li className={`${styles.crumb} ${styles.crumbCurrent}`} aria-current="page">
                {lesson.lessonTitle}
              </li>
            </ol>
          </nav>

          <div className={styles.titleBlock}>
            <span className={styles.accentBar} aria-hidden="true" />
            <p className={styles.subtitle}>
              {course.courseTitle} · Lesson {lesson.lessonNumber} of {totalLessons}
            </p>
            <h1 className={titleClassName}>{lesson.lessonTitle}</h1>
            {summary && <p className={styles.summary}>{summary}</p>}
          </div>
        </div>
      </header>

      <div className={styles.lessonBar}>
        <div className={styles.lessonBarInner}>
          <div>
            <p className={styles.barLabel}>Course progress</p>
            <div
              className={styles.progress}
              role="progressbar"
              aria-label="Course progress"
              aria-valuemin={1}
              aria-valuemax={totalLessons}
              aria-valuenow={lessonPosition}
              aria-valuetext={`Lesson ${lessonPosition} of ${totalLessons}`}
            >
              {Array.from({ length: totalLessons }, (_, index) => (
                <span
                  key={index}
                  className={
                    index < lessonPosition
                      ? `${styles.segment} ${styles.segmentDone}`
                      : styles.segment
                  }
                />
              ))}
            </div>
          </div>

          {jumpSections.length > 0 && (
            <nav aria-labelledby="lesson-contents-label">
              <p id="lesson-contents-label" className={styles.barLabel}>
                In this lesson
              </p>
              <ol className={styles.jumpList}>
                {jumpSections.map((section) => (
                  <li key={section.id} className={styles.jumpItem}>
                    <a href={`#${section.id}`} className={styles.jumpLink}>
                      <span className={styles.jumpNumber} aria-hidden="true">
                        {formatNumber(section.number)}
                      </span>
                      <span className={styles.jumpTitle}>{section.title}</span>
                      <svg
                        className={styles.jumpIcon}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                        focusable="false"
                      >
                        <path d="M12 5v14M5 12l7 7 7-7" />
                      </svg>
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          )}
        </div>
      </div>
    </>
  );
}