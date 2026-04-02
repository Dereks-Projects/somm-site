import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import ProjectsCTA from '../../components/ProjectsCTA';
import { getAllCourses } from '../../data/getCourseData';
import Link from 'next/link';
import styles from './page.module.css';

export const metadata = {
  title: "Free Sommelier Courses & Wine Education",
  description: "Free sommelier courses covering wine fundamentals, professional wine service, and beverage management. Comprehensive wine education for hospitality professionals and enthusiasts at every level.",
  openGraph: {
    title: "Free Sommelier Courses & Wine Education - Somm.Site",
    description: "Free sommelier courses covering wine fundamentals, professional wine service, and beverage management. Built for the hospitality community.",
    type: "website"
  }
};

export default function CourseCatalog() {
  const courses = getAllCourses();

  const courseListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Free Sommelier Courses and Wine Education",
    "description": "Professional sommelier courses and wine education covering wine fundamentals, wine service, and beverage management.",
    "numberOfItems": courses.length,
    "itemListElement": courses.map((course, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "Course",
        "name": course.courseTitle,
        "description": course.courseDescription,
        "provider": {
          "@type": "Organization",
          "name": "SOMM.SITE",
          "url": "https://somm.site"
        },
        "isAccessibleForFree": true,
        "educationalLevel": course.difficulty,
        "url": `https://somm.site/courses/${course.courseSlug}`
      }
    }))
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Are these sommelier courses free?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. Every course on Somm.Site is completely free with no paywalls, subscriptions, or hidden costs. Our mission is to make professional wine and sommelier education accessible to everyone in the hospitality community."
        }
      },
      {
        "@type": "Question",
        "name": "Who are these wine courses designed for?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Our courses serve hospitality professionals at every level, from someone beginning their wine education to experienced sommeliers and beverage directors looking for structured reference material. The Introduction to Wine course is built for beginners, The Sommelier Position targets working wine service professionals, and the Beverage Management Proseminar is designed for current and aspiring food and beverage directors."
        }
      },
      {
        "@type": "Question",
        "name": "Do these courses prepare me for sommelier certification exams?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Our courses build foundational and intermediate wine knowledge that supports preparation for certification exams through the Court of Master Sommeliers and the Wine and Spirit Education Trust. They cover grape varieties, wine regions, tasting methodology, service technique, and beverage program management. While no online course replaces hands-on tasting practice, these lessons provide the theoretical framework that certification study requires."
        }
      },
      {
        "@type": "Question",
        "name": "How long does each course take to complete?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The Introduction to Wine course contains 9 lessons and takes approximately 4.5 hours to complete. The Sommelier Position and Beverage Management Proseminar courses each contain 6 lessons and take approximately 3 hours each. All courses are self-paced, so you can work through them on your own schedule."
        }
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseListJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <div>
        <Header />
        <main className={styles.catalogMain}>
          <div className={styles.catalogHeader}>
            <p className={styles.catalogLabel}>SOMM.SITE</p>
            <h1 className={styles.catalogTitle}>Free Sommelier Courses & Wine Education</h1>
            <p className={styles.catalogDescription}>
              Professional education in wine, sommelier practice, and beverage management. Free, comprehensive, and built for the hospitality community.
            </p>
          </div>

          <div className={styles.catalogIntro}>
            <p className={styles.catalogIntroText}>
              Three courses. Twenty-one lessons. From your first glass to the director's chair.
            </p>
            <p className={styles.catalogIntroSub}>
              Whether you are studying for sommelier certification or building a beverage program from scratch, start here.
            </p>
          </div>

          <div className={styles.catalogGrid}>
            {courses.map((course) => (
              <Link
                key={course.id}
                href={`/courses/${course.courseSlug}`}
                className={styles.card}
              >
                <div className={styles.cardImageContainer}>
                  <img
                    src={course.courseImage}
                    alt={course.courseImageAlt}
                    className={styles.cardImage}
                  />
                  <div className={styles.cardImageOverlay} />
                </div>
                <div className={styles.cardContent}>
                  <p className={styles.cardDifficulty}>{course.difficulty}</p>
                  <h2 className={styles.cardTitle}>{course.courseTitle}</h2>
                  <p className={styles.cardDescription}>{course.courseDescription}</p>
                  <div className={styles.cardMeta}>
                    <span className={styles.cardMetaItem}>{course.lessonCount} Lessons</span>
                    <span className={styles.cardMetaDivider} aria-hidden="true" />
                    <span className={styles.cardMetaItem}>{course.estimatedTime}</span>
                  </div>
                  <span className={styles.cardCta}>View Course</span>
                </div>
              </Link>
            ))}
          </div>

          <section className={styles.faqSection}>
            <h2 className={styles.faqTitle}>Frequently Asked Questions</h2>
            <div className={styles.faqList}>
              <details className={styles.faqItem}>
                <summary className={styles.faqQuestion}>Are these sommelier courses free?</summary>
                <p className={styles.faqAnswer}>
                  Yes. Every course on Somm.Site is completely free with no paywalls, subscriptions, or hidden costs. Our mission is to make professional wine and sommelier education accessible to everyone in the hospitality community.
                </p>
              </details>
              <details className={styles.faqItem}>
                <summary className={styles.faqQuestion}>Who are these wine courses designed for?</summary>
                <p className={styles.faqAnswer}>
                  Our courses serve hospitality professionals at every level, from someone beginning their wine education to experienced sommeliers and beverage directors looking for structured reference material. The Introduction to Wine course is built for beginners, The Sommelier Position targets working wine service professionals, and the Beverage Management Proseminar is designed for current and aspiring food and beverage directors.
                </p>
              </details>
              <details className={styles.faqItem}>
                <summary className={styles.faqQuestion}>Do these courses prepare me for sommelier certification exams?</summary>
                <p className={styles.faqAnswer}>
                  Our courses build foundational and intermediate wine knowledge that supports preparation for certification exams through the Court of Master Sommeliers and the Wine and Spirit Education Trust. They cover grape varieties, wine regions, tasting methodology, service technique, and beverage program management. While no online course replaces hands-on tasting practice, these lessons provide the theoretical framework that certification study requires.
                </p>
              </details>
              <details className={styles.faqItem}>
                <summary className={styles.faqQuestion}>How long does each course take to complete?</summary>
                <p className={styles.faqAnswer}>
                  The Introduction to Wine course contains 9 lessons and takes approximately 4.5 hours to complete. The Sommelier Position and Beverage Management Proseminar courses each contain 6 lessons and take approximately 3 hours each. All courses are self-paced, so you can work through them on your own schedule.
                </p>
              </details>
            </div>
          </section>

        </main>
        <ProjectsCTA />
        <Footer />
      </div>
    </>
  );
}