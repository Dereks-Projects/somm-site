import Header from '../components/Header';
import Footer from '../components/Footer';
import Hero from '../components/Hero';
import SplitSection from '../components/SplitSection';
import ResourceSection from '../components/ResourceSection';
import BooksSection from '../components/BooksSection';
import CTASection from '../components/CTASection';
import CoursePreview from '../components/CoursePreview';
import courseData from '../data/courseData.json';
import styles from './page.module.css';

export const metadata = {
  
  description: "Free introductory wine course, sommelier resources, and hospitality training. Learn wine fundamentals, service standards, and beverage knowledge from industry professionals.",
  openGraph: {
    title: "SOMM.SITE - Free Wine Education & Resources",
    description: "Free introductory wine course and hospitality training resources"
  }
};

export default function Home() {
  return (
    <div>
      <Header />
      <Hero />
      <SplitSection />
      <div id="resources">
        <ResourceSection />
      </div>
      
      <section className={styles.courseSection}>
        <div className={styles.courseContainer}>
          <CoursePreview 
            courses={courseData}
            heading="Introductory Wine Course"
            description="This introductory look into the world of wine is a great place to start for beginners, and the perfect place for professionals to brush up on their current knowledge."
            buttonText="View Full Course"
            buttonLink="/intro-course"
            variant="highlighted"
          />
        </div>
      </section>
      
      <BooksSection />
      <CTASection />
      <Footer />
    </div>
  );
}