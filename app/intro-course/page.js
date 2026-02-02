import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import BackButton from '../../components/BackButton';
import ProjectsCTA from '../../components/ProjectsCTA';
import CourseCard from '../../components/CourseCard';
import courseData from '../../data/courseData.json';
import styles from './page.module.css';
import Link from 'next/link';

export const metadata = {
  title: "Introductory Wine Course",
  description: "Free comprehensive wine course covering white wines, red wines, wine geography, and great producers. Perfect for beginners and hospitality professionals.",
  alternates: {
    languages: {
      'en': '/intro-course',
      'es': '/curso-introductorio'
    }
  },
  openGraph: {
    title: "Free Introductory Wine Course - Somm.Site",
    description: "Learn wine fundamentals from grape varieties to wine regions"
  }
};

export default function IntroCourse() {
  return (
    <div>
      <Header />
      <main className={styles.coursePageMain}>
        <div className={styles.coursePageContainer}>
          <h1 className={styles.coursePageTitle}>Introductory Wine Course</h1>
          <p className={styles.coursePageDescription}>
            This course takes you through the basic principles of the wine world. A perfect place to begin for a novice, a great refresher for the professional.
          </p>
          <div className={styles.languageLink}>
            <Link href="/curso-introductorio">Español</Link>
          </div>
          <div className={styles.coursePageGrid}>
            {courseData.map((lesson) => (
              <CourseCard key={lesson.id} lesson={lesson} />
            ))}
          </div>
        </div>
        <BackButton href="/" text="Back to Home" />
        
      </main>
      <ProjectsCTA />
      <Footer />
    </div>
  );
}