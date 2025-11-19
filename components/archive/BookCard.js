import styles from './BookCard.module.css';

export default function BookCard({ book }) {
  return (
    <a href={book.link} target="_blank" rel="noopener noreferrer" className={styles.card}>
      <div className={styles.imageContainer}>
        <img 
          src={book.image} 
          alt={book.altImage}
          className={styles.image}
        />
      </div>
      <div className={styles.content}>
        <h3 className={styles.title}>{book.title}</h3>
        <p className={styles.subtitle}>{book.subtitle}</p>
        <p className={styles.link}>Buy on Amazon</p>
      </div>
    </a>
  );
}