// app/courses/[courseSlug]/[lessonSlug]/page.js

import { notFound } from 'next/navigation';
import Header from '../../../../components/layout/Header';
import Footer from '../../../../components/layout/Footer';
import ProjectsCTA from '../../../../components/ProjectsCTA';
import ImageLightbox from '../../../../components/ImageLightbox';
import FeatureVideo from '../../../../components/FeatureVideo';
import LessonHero from '../../../../components/lesson/LessonHero';
import LessonSection from '../../../../components/lesson/LessonSection';
import ToggleBuilder from '../../../../components/lesson/ToggleBuilder';
import CompareSwitch from '../../../../components/lesson/CompareSwitch';
import FlashCards from '../../../../components/lesson/FlashCards';
import Scenario from '../../../../components/lesson/Scenario';
import QuickCheck from '../../../../components/lesson/QuickCheck';
import TryThisWeek from '../../../../components/lesson/TryThisWeek';
import { getLessonBlocks } from '../../../../lib/lessonBlocks';
import { splitLead, splitParagraphs } from '../../../../lib/splitParagraphs';
import { getFeatureVideo } from '../../../../lib/vimeo';
import { getCourseBySlug, getLessonsByCourse, getLesson } from '../../../../data/getCourseData';
import { getLessonBlockData } from '../../../../data/lesson-blocks/index';
import Link from 'next/link';
import styles from './page.module.css';

// Pull quotes longer than this use a smaller size so the band stays compact.
const LONG_QUOTE_CHARACTERS = 140;

// Optional "Further Reading" links from the lesson JSON. Each entry needs a
// non-empty title and article slug; incomplete entries are skipped so a typo
// can never render a broken link.
function getFurtherReading(lesson) {
  if (!Array.isArray(lesson.furtherReading)) return [];

  return lesson.furtherReading
    .filter(
      (item) =>
        typeof item?.title === 'string' &&
        item.title.trim() !== '' &&
        typeof item?.slug === 'string' &&
        item.slug.trim() !== ''
    )
    .map((item) => ({ title: item.title.trim(), slug: item.slug.trim() }));
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const course = getCourseBySlug(resolvedParams.courseSlug);
  const lesson = getLesson(resolvedParams.courseSlug, resolvedParams.lessonSlug);

  if (!course || !lesson) {
    return { title: "Lesson Not Found" };
  }

  return {
    title: `${lesson.lessonTitle} - ${course.courseTitle}`,
    description: lesson.introductionparagraph.slice(0, 160) + "...",
    keywords: lesson.tags,
    alternates: { canonical: `/courses/${course.courseSlug}/${lesson.slug}` },
    openGraph: {
      title: `${lesson.lessonTitle} - ${course.courseTitle} - Somm.Site`,
      description: lesson.introductionparagraph.slice(0, 160) + "...",
      images: [
        {
          url: lesson.heroImage,
          width: 1200,
          height: 630,
          alt: lesson.heroImageAlt
        }
      ],
      type: "article"
    },
    twitter: {
      card: "summary_large_image",
      title: `${lesson.lessonTitle} - ${course.courseTitle}`,
      description: lesson.introductionparagraph.slice(0, 160) + "...",
      images: [lesson.heroImage]
    }
  };
}

export default async function ClassPage({ params }) {
  const resolvedParams = await params;
  const course = getCourseBySlug(resolvedParams.courseSlug);
  const lessons = getLessonsByCourse(resolvedParams.courseSlug);
  const lesson = getLesson(resolvedParams.courseSlug, resolvedParams.lessonSlug);

  if (!course || !lessons || !lesson) {
    notFound();
  }

  const totalLessons = lessons.length;
  const currentIndex = lessons.findIndex((l) => l.slug === lesson.slug);
  const prevLesson = currentIndex > 0 ? lessons[currentIndex - 1] : null;
  const nextLesson = currentIndex < totalLessons - 1 ? lessons[currentIndex + 1] : null;
  const lessonPosition = currentIndex + 1;
  const furtherReading = getFurtherReading(lesson);
  const sections = [1, 2, 3].map((number) => ({
    id: `section-${number}`,
    number,
    title: lesson[`paragraph${number}title`],
    text: lesson[`paragraph${number}`],
  }));
  const { lead: introLead, rest: introRest } = splitLead(lesson.introductionparagraph);
  const conclusionParagraphs = splitParagraphs(lesson.conclusion);
  // Optional hero summary and interactive blocks from the lesson's own file in
  // data/lesson-blocks/; each block is null when absent.
  const blocks = getLessonBlocks(getLessonBlockData(course.courseSlug, lesson.slug), lesson.slug);
  // The rich blocks that follow a given numbered section, in a fixed order.
  const renderBlocksAfter = (sectionNumber) => (
    <>
      {blocks.toggleBuilder?.afterSection === sectionNumber && (
        <ToggleBuilder builder={blocks.toggleBuilder} />
      )}
      {blocks.compareSwitch?.afterSection === sectionNumber && (
        <CompareSwitch compare={blocks.compareSwitch} />
      )}
      {blocks.flashCards?.afterSection === sectionNumber && (
        <FlashCards flash={blocks.flashCards} />
      )}
    </>
  );
  // Optional lesson video. No videoId means no Vimeo call; any failure returns null.
  const lessonVideo = await getFeatureVideo(lesson.videoId);

  const courseJsonLd = {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": lesson.lessonTitle,
    "description": lesson.introductionparagraph,
    "provider": {
      "@type": "Organization",
      "@id": "https://somm.site/#organization",
      "name": "Somm.Site",
      "url": "https://www.somm.site"
    },
    "hasCourseInstance": {
      "@type": "CourseInstance",
      "courseMode": "online",
      "courseWorkload": "PT30M"
    },
    "image": lesson.heroImage,
    "author": {
      "@type": "Person",
      "name": lesson.author || "Derek Engles"
    },
    "keywords": lesson.tags,
    "educationalLevel": course.difficulty,
    "inLanguage": "en-US",
    "isAccessibleForFree": true,
    "isPartOf": {
      "@type": "Course",
      "name": course.courseTitle,
      "url": `https://www.somm.site/courses/${course.courseSlug}`
    }
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Courses",
        "item": "https://www.somm.site/courses"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": course.courseTitle,
        "item": `https://www.somm.site/courses/${course.courseSlug}`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": lesson.lessonTitle,
        "item": `https://www.somm.site/courses/${course.courseSlug}/${lesson.slug}`
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <div>
        <Header />
        <main className={styles.lessonMain}>
          <LessonHero
            course={course}
            lesson={lesson}
            summary={blocks.summary}
            lessonPosition={lessonPosition}
            totalLessons={totalLessons}
            sections={sections}
          />

          <article>
            {/* Intro: the opening sentences are set large as the lead */}
            {introLead && (
              <div className={styles.intro}>
                <div className={styles.bandInner}>
                  <p className={styles.eyebrow}>Start here</p>
                  <div className={styles.introBody}>
                    <p className={styles.introLead}>{introLead}</p>
                    {introRest.map((paragraph, index) => (
                      <p key={index} className={styles.introText}>
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            )}

            <LessonSection {...sections[0]} />
            {renderBlocksAfter(1)}

            {/* Lesson Video: only renders when the lesson has a working videoId */}
            {lessonVideo && (
              <section className={styles.videoBand} aria-labelledby="lesson-video-title">
                <div className={styles.bandInner}>
                  <div className={styles.bandHeading}>
                    <p className={styles.eyebrowAccent}>Watch</p>
                    <h3 id="lesson-video-title" className={styles.bandTitle}>
                      The lesson on video
                    </h3>
                  </div>
                  <div className={styles.videoFrame}>
                    <FeatureVideo
                      id={lessonVideo.id}
                      title={lessonVideo.title}
                      thumbnail={lessonVideo.thumbnail}
                      duration={lessonVideo.duration}
                    />
                  </div>
                </div>
              </section>
            )}

            {lesson.bodyquote && (
              <div className={styles.quoteBand}>
                <blockquote
                  className={
                    lesson.bodyquote.length > LONG_QUOTE_CHARACTERS
                      ? `${styles.quote} ${styles.quoteLong}`
                      : styles.quote
                  }
                >
                  <p className={styles.quoteText}>{lesson.bodyquote}</p>
                </blockquote>
              </div>
            )}

            <LessonSection {...sections[1]} />
            {renderBlocksAfter(2)}

            <LessonSection
              {...sections[2]}
              media={
                lesson.bodyImage ? (
                  <ImageLightbox src={lesson.bodyImage} alt={lesson.bodyImageAlt} />
                ) : null
              }
            />
            {renderBlocksAfter(3)}

            {blocks.scenario && <Scenario scenario={blocks.scenario} />}
            {blocks.quickCheck && <QuickCheck quiz={blocks.quickCheck} />}

            {/* The takeaway: replaces the old "In Conclusion" card */}
            {conclusionParagraphs.length > 0 && (
              <section className={styles.takeaway} aria-labelledby="takeaway-title">
                <div className={styles.bandInner}>
                  <div className={styles.bandHeading}>
                    <span className={styles.accentBar} aria-hidden="true" />
                    <h2 id="takeaway-title" className={styles.takeawayTitle}>
                      The takeaway
                    </h2>
                  </div>
                  <div className={styles.takeawayBody}>
                    {conclusionParagraphs.map((paragraph, index) => (
                      <p key={index} className={styles.takeawayText}>
                        {paragraph}
                      </p>
                    ))}
                    {blocks.tryThisWeek && <TryThisWeek tasks={blocks.tryThisWeek} />}
                  </div>
                </div>
              </section>
            )}

            {/* Further Reading: only renders when the lesson lists at least one article */}
            {furtherReading.length > 0 && (
              <aside className={styles.furtherReading} aria-labelledby="further-reading-title">
                <div className={styles.furtherInner}>
                  <h2 id="further-reading-title" className={styles.furtherTitle}>
                    Further reading on this topic
                  </h2>
                  <ul className={styles.cardGrid}>
                    {furtherReading.map((item) => (
                      <li key={item.slug} className={styles.cardItem}>
                        <Link href={`/articles/${item.slug}`} className={styles.card}>
                          <span className={styles.cardTitle}>{item.title}</span>
                          <span className={styles.cardAction} aria-hidden="true">
                            Read the article
                            <svg
                              className={styles.cardArrow}
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              focusable="false"
                            >
                              <path d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </aside>
            )}
          </article>

          {/* Lesson Navigation: Previous as a text link, Next as the yellow band */}
          <nav aria-label="Lesson navigation">
            {prevLesson && (
              <div className={styles.prevRow}>
                <Link
                  href={`/courses/${course.courseSlug}/${prevLesson.slug}`}
                  className={styles.prevLink}
                >
                  <svg
                    className={styles.prevArrow}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                    focusable="false"
                  >
                    <path d="M19 12H5M12 19l-7-7 7-7" />
                  </svg>
                  <span className={styles.prevLabel}>Previous lesson</span>
                  <span className={styles.prevTitle}>{prevLesson.lessonTitle}</span>
                </Link>
              </div>
            )}

            <Link
              href={
                nextLesson
                  ? `/courses/${course.courseSlug}/${nextLesson.slug}`
                  : `/courses/${course.courseSlug}`
              }
              className={styles.nextBand}
            >
              <span className={styles.nextInner}>
                <span className={styles.nextText}>
                  <span className={styles.nextLabel}>
                    {nextLesson
                      ? `Up next · Lesson ${nextLesson.lessonNumber} of ${totalLessons}`
                      : 'Course complete'}
                  </span>
                  <span className={styles.nextTitle}>
                    {nextLesson ? nextLesson.lessonTitle : `Back to ${course.courseTitle}`}
                  </span>
                </span>
                <svg
                  className={styles.nextArrow}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                  focusable="false"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </span>
            </Link>
          </nav>
        </main>
        <ProjectsCTA />
        <Footer />
      </div>
    </>
  );
}