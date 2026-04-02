import { notFound } from 'next/navigation';
import Header from '../../../../components/layout/Header';
import Footer from '../../../../components/layout/Footer';
import ProjectsCTA from '../../../../components/ProjectsCTA';
import { getCourseBySlug, getLessonsByCourse, getLesson } from '../../../../data/getCourseData';
import Link from 'next/link';
import styles from './page.module.css';

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
  const progressPercent = ((currentIndex + 1) / totalLessons) * 100;

  const courseJsonLd = {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": lesson.lessonTitle,
    "description": lesson.introductionparagraph,
    "provider": {
      "@type": "Organization",
      "name": "SOMM.SITE",
      "url": "https://somm.site"
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
      "url": `https://somm.site/courses/${course.courseSlug}`
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
        "item": "https://somm.site/courses"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": course.courseTitle,
        "item": `https://somm.site/courses/${course.courseSlug}`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": lesson.lessonTitle,
        "item": `https://somm.site/courses/${course.courseSlug}/${lesson.slug}`
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
        <main className={styles.classMain}>

          {/* Hero Section */}
          <div
            className={styles.classHero}
            style={{ backgroundImage: `url(${lesson.heroImage})` }}
          >
            <div className={styles.classHeroOverlay}>
              <nav className={styles.breadcrumb} aria-label="Breadcrumb">
                <Link href="/courses" className={styles.breadcrumbLink}>Courses</Link>
                <span className={styles.breadcrumbSeparator} aria-hidden="true">/</span>
                <Link
                  href={`/courses/${course.courseSlug}`}
                  className={styles.breadcrumbLink}
                >
                  {course.courseTitle}
                </Link>
                <span className={styles.breadcrumbSeparator} aria-hidden="true">/</span>
                <span className={styles.breadcrumbCurrent}>{lesson.lessonTitle}</span>
              </nav>
              <h1 className={styles.classTitle}>{lesson.lessonTitle}</h1>
              <p className={styles.classCourseLabel}>
                {course.courseTitle}
              </p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className={styles.progressContainer}>
            <div className={styles.progressInfo}>
              <span className={styles.progressLabel}>
                Lesson {lesson.lessonNumber} of {totalLessons}
              </span>
            </div>
            <div className={styles.progressTrack}>
              <div
                className={styles.progressFill}
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Article Content */}
          <article className={styles.articleContainer}>

            {/* Intro Paragraph */}
            <div className={styles.introSection}>
              <p className={styles.introText}>{lesson.introductionparagraph}</p>
            </div>

            {/* Content Sections */}
            <div className={styles.articleContent}>
              <section className={styles.articleSection}>
                <h2 className={styles.sectionTitle}>{lesson.paragraph1title}</h2>
                <p className={styles.sectionText}>{lesson.paragraph1}</p>
              </section>

              {lesson.bodyquote && (
                <blockquote className={styles.articleQuote}>
                  {lesson.bodyquote}
                </blockquote>
              )}

              <section className={styles.articleSection}>
                <h2 className={styles.sectionTitle}>{lesson.paragraph2title}</h2>
                <p className={styles.sectionText}>{lesson.paragraph2}</p>
              </section>

              {lesson.bodyImage && (
                <div className={styles.articleImageContainer}>
                  <img
                    src={lesson.bodyImage}
                    alt={lesson.bodyImageAlt}
                    className={styles.articleImage}
                  />
                </div>
              )}

              <section className={styles.articleSection}>
                <h2 className={styles.sectionTitle}>{lesson.paragraph3title}</h2>
                <p className={styles.sectionText}>{lesson.paragraph3}</p>
              </section>

              <section className={styles.articleConclusion}>
                <p className={styles.sectionText}>{lesson.conclusion}</p>
              </section>
            </div>
          </article>

          {/* Lesson Navigation */}
          <nav className={styles.lessonNav} aria-label="Lesson navigation">
            {prevLesson ? (
              <Link
                href={`/courses/${course.courseSlug}/${prevLesson.slug}`}
                className={styles.lessonNavPrev}
              >
                <span className={styles.lessonNavDirection}>Previous Lesson</span>
                <span className={styles.lessonNavTitle}>{prevLesson.lessonTitle}</span>
              </Link>
            ) : (
              <div />
            )}
            {nextLesson ? (
              <Link
                href={`/courses/${course.courseSlug}/${nextLesson.slug}`}
                className={styles.lessonNavNext}
              >
                <span className={styles.lessonNavDirection}>Next Lesson</span>
                <span className={styles.lessonNavTitle}>{nextLesson.lessonTitle}</span>
              </Link>
            ) : (
              <Link
                href={`/courses/${course.courseSlug}`}
                className={styles.lessonNavNext}
              >
                <span className={styles.lessonNavDirection}>Course Complete</span>
                <span className={styles.lessonNavTitle}>Back to {course.courseTitle}</span>
              </Link>
            )}
          </nav>

        </main>
        <ProjectsCTA />
        <Footer />
      </div>
    </>
  );
}