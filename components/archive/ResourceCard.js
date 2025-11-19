import styles from './ResourceCard.module.css';

export default function ResourceCard({ resource }) {
  return (
    <a href={resource.link} target="_blank" rel="noopener noreferrer" className={styles.card}>
      <div className={styles.imageContainer}>
        <img 
          src={resource.image} 
          alt={resource.altImage}
          className={styles.image}
        />
      </div>
      <div className={styles.content}>
        <h3 className={styles.title}>{resource.title}</h3>
        <p className={styles.subtitle}>{resource.subtitle}</p>
        <p className={styles.link}>Visit {resource.title}</p>
      </div>
    </a>
  );
}