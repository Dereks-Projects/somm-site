import { notFound } from 'next/navigation';
import Header from '../../../components/layout/Header';
import Footer from '../../../components/layout/Footer';
import ProjectsCTA from '../../../components/ProjectsCTA';
import { getCourseBySlug, getLessonsByCourse } from '../../../data/getCourseData';
import Link from 'next/link';
import styles from './page.module.css';

const courseTitleSuffix = {
  'introduction-to-wine': 'Free Wine Course',
  'the-sommelier-position': 'Sommelier Course',
  'beverage-management-proseminar': 'Advanced Beverage Course',
};

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const course = getCourseBySlug(resolvedParams.courseSlug);

  if (!course) {
    return { title: "Course Not Found" };
  }

  const suffix = courseTitleSuffix[course.courseSlug] || 'Wine Course';

  return {
    title: `${course.courseTitle} | ${suffix}`,
    description: `${course.courseDescription} ${course.lessonCount} free lessons covering ${course.difficulty.toLowerCase()}-level content. Self-paced sommelier education from Somm.Site.`,
    openGraph: {
      title: `${course.courseTitle} | ${suffix} - Somm.Site`,
      description: course.courseDescription,
      images: [
        {
          url: course.courseImage,
          width: 1200,
          height: 630,
          alt: course.courseImageAlt
        }
      ],
      type: "website"
    }
  };
}

export default async function CoursePage({ params }) {
  const resolvedParams = await params;
  const course = getCourseBySlug(resolvedParams.courseSlug);
  const lessons = getLessonsByCourse(resolvedParams.courseSlug);

  if (!course || !lessons) {
    notFound();
  }

  const firstLesson = lessons[0];

  const courseJsonLd = {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": course.courseTitle,
    "description": course.courseDescription,
    "provider": {
      "@type": "Organization",
      "name": "SOMM.SITE",
      "url": "https://somm.site"
    },
    "numberOfCredits": course.lessonCount,
    "educationalLevel": course.difficulty,
    "isAccessibleForFree": true,
    "image": course.courseImage,
    "hasCourseInstance": {
      "@type": "CourseInstance",
      "courseMode": "online",
      "courseWorkload": `PT${course.estimatedTime.replace(' hours', 'H').replace(' hour', 'H')}`
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
        <main className={styles.courseMain}>

          {/* Course Hero */}
          <div className={styles.courseHero}>
            <nav className={styles.breadcrumb} aria-label="Breadcrumb">
              <Link href="/courses" className={styles.breadcrumbLink}>Courses</Link>
              <span className={styles.breadcrumbSeparator} aria-hidden="true">/</span>
              <span className={styles.breadcrumbCurrent}>{course.courseTitle}</span>
            </nav>
            <p className={styles.courseDifficulty}>{course.difficulty}</p>
            <h1 className={styles.courseTitle}>{course.courseTitle}</h1>
            <p className={styles.courseDescription}>{course.courseDescription}</p>
            <div className={styles.courseMeta}>
              <span className={styles.courseMetaItem}>{course.lessonCount} Lessons</span>
              <span className={styles.courseMetaDivider} aria-hidden="true" />
              <span className={styles.courseMetaItem}>{course.estimatedTime}</span>
            </div>
            <Link
              href={`/courses/${course.courseSlug}/${firstLesson.slug}`}
              className={styles.getStartedButton}
            >
              Get Started
            </Link>
          </div>

          {/* Lesson List */}
          <div className={styles.lessonListContainer}>
            <h2 className={styles.lessonListTitle}>Course Outline</h2>
            <ol className={styles.lessonList}>
              {lessons.map((lesson) => (
                <li key={lesson.id} className={styles.lessonItem}>
                  <Link
                    href={`/courses/${course.courseSlug}/${lesson.slug}`}
                    className={styles.lessonLink}
                  >
                    <span className={styles.lessonNumber}>
                      {String(lesson.lessonNumber).padStart(2, '0')}
                    </span>
                    <div className={styles.lessonInfo}>
                      <h3 className={styles.lessonTitle}>{lesson.lessonTitle}</h3>
                      <p className={styles.lessonExcerpt}>
                        {lesson.introductionparagraph.substring(0, 120)}...
                      </p>
                    </div>
                    <span className={styles.lessonArrow} aria-hidden="true">&#8250;</span>
                  </Link>
                </li>
              ))}
            </ol>
          </div>

        </main>
        <ProjectsCTA />
        <Footer />
      </div>
    </>
  );
}