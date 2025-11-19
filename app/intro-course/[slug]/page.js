import Header from '../../../components/layout/Header';
import Footer from '../../../components/layout/Footer';
import courseData from '../../../data/courseData.json';
import styles from './page.module.css';
import BackButton from '../../../components/BackButton';
import ProjectsCTA from '../../../components/ProjectsCTA';

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const lesson = courseData.find((lesson) => lesson.slug === resolvedParams.slug);

  if (!lesson) {
    return {
      title: "Lesson Not Found"
    };
  }

  return {
    title: lesson.subtitle,
    description: lesson.introductionparagraph.slice(0, 160) + "...",
    keywords: lesson.tags,
    openGraph: {
      title: `${lesson.subtitle} - ${lesson.title}`,
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
      title: `${lesson.subtitle} - ${lesson.title}`,
      description: lesson.introductionparagraph.slice(0, 160) + "...",
      images: [lesson.heroImage]
    }
  };
}

export default async function ClassPage({ params }) {
  const resolvedParams = await params;
  const lesson = courseData.find((lesson) => lesson.slug === resolvedParams.slug);

  if (!lesson) {
    return <div>Lesson not found</div>;
  }

  // JSON-LD Structured Data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": lesson.subtitle,
    "description": lesson.introductionparagraph,
    "provider": {
      "@type": "Organization",
      "name": "SOMM.SITE",
      "url": "https://somm.site"
    },
    "courseCode": lesson.articlenumber,
    "hasCourseInstance": {
      "@type": "CourseInstance",
      "courseMode": "online",
      "courseWorkload": "PT1H"
    },
    "image": lesson.heroImage,
    "author": {
      "@type": "Person",
      "name": lesson.author || "Derek Engles"
    },
    "keywords": lesson.tags,
    "educationalLevel": "Beginner to Intermediate",
    "inLanguage": "en-US",
    "isAccessibleForFree": true
  };

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <div>
        <Header />
        <main className={styles.articleMain}>
          
          <article className={styles.articleContainer}>
            {/* Hero Section */}
            <div 
              className={styles.articleHero}
              style={{ backgroundImage: `url(${lesson.heroImage})` }}
            >
              <div className={styles.articleHeroOverlay}>
                <h1 className={styles.articleTitle}>{lesson.title}</h1>
                <h2 className={styles.articleSubtitle}>{lesson.subtitle}</h2>
              </div>
            </div>

            {/* Intro Paragraph Section */}
            <div className={styles.introSection}>
              <p className={styles.introText}>{lesson.introductionparagraph}</p>
            </div>
            

            {/* Article Content */}
            <div className={styles.articleContent}>
              <section className={styles.articleSection}>
                <h3 className={styles.sectionTitle}>{lesson.paragraph1title}</h3>
                <p className={styles.sectionText}>{lesson.paragraph1}</p>
              </section>

              {lesson.bodyquote && (
                <blockquote className={styles.articleQuote}>
                  {lesson.bodyquote}
                </blockquote>
              )}

              <section className={styles.articleSection}>
                <h3 className={styles.sectionTitle}>{lesson.paragraph2title}</h3>
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
                <h3 className={styles.sectionTitle}>{lesson.paragraph3title}</h3>
                <p className={styles.sectionText}>{lesson.paragraph3}</p>
              </section>

              <section className={styles.articleConclusion}>
                <p className={styles.sectionText}>{lesson.conclusion}</p>
              </section>
            </div>
          </article>
          <BackButton href="/intro-course" text="Back to Course" />
          
        </main>
        <ProjectsCTA />
        <Footer />
      </div>
    </>
  );
}