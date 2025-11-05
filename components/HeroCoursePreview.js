import styles from './HeroCoursePreview.module.css';
import CourseCard from './CourseCard';

export default function HeroCoursePreview({ courses, heading, buttonText, buttonLink }) {
  return (
    <div className={styles.heroCoursePreview}>
      <h2 className={styles.heading}>{heading}</h2>
      
      <div className={styles.cardsContainer}>
  {courses.slice(0, 4).map((lesson) => (
    <CourseCard key={lesson.id} lesson={lesson} />
  ))}
  <a href={buttonLink} className={styles.arrow}>
            →
        </a>
        </div>

        <div className={styles.buttonContainer}>
        <a href={buttonLink} className={styles.button}>
            {buttonText}
        </a>
        <a href="#resources" className={styles.secondaryButton}>
            Learn More
        </a>
        </div>
    </div>
  );
}