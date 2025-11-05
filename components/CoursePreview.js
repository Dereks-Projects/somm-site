import styles from './CoursePreview.module.css';
import CourseCard from './CourseCard';

export default function CoursePreview({ courses, heading, description, buttonText, buttonLink, secondaryButtonText, secondaryButtonLink, variant = 'default' }) {
  return (
    <div className={`${styles.coursePreview} ${variant === 'highlighted' ? styles.highlighted : ''}`}>
      <h2 className={styles.heading}>{heading}</h2>
      {description && <p className={styles.description}>{description}</p>}
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
          <span className={styles.buttonText}>{buttonText}</span>
          
        </a>
        {secondaryButtonText && (
          <a href={secondaryButtonLink} className={styles.secondaryButton}>
            {secondaryButtonText}
          </a>
        )}
      </div>
    </div>
  );
}