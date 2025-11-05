import Header from '../../components/Header';
import Footer from '../../components/Footer';
import BackButton from '../../components/BackButton';
import ProjectsCTA from '../../components/ProjectsCTA';
import CourseCard from '../../components/CourseCard';
import courseData from '../../data/courseData.json';
import styles from './page.module.css';

export const metadata = {
  title: "Introductory Wine Course",
  description: "Free comprehensive wine course covering white wines, red wines, wine geography, and great producers. Perfect for beginners and hospitality professionals.",
  openGraph: {
    title: "Free Introductory Wine Course - SOMM.SITE",
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