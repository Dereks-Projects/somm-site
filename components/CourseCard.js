import styles from './CourseCard.module.css';

export default function CourseCard({ lesson, basePath = '/intro-course', label = 'INTRODUCTORY COURSE' }) {
  return (
    <a href={`${basePath}/${lesson.slug}`} className={styles.card}>
      <div className={styles.imageContainer}>
        <img 
          src={lesson.heroImage} 
          alt={lesson.heroImageAlt}
          className={styles.image}
        />
      </div>
      <div className={styles.content}>
        <p className={styles.label}>{label}</p>
        <h3 className={styles.title}>{lesson.subtitle}</h3>
        <p className={styles.description}>
          {lesson.introductionparagraph.substring(0, 120)}...
        </p>
      </div>
    </a>
  );
}