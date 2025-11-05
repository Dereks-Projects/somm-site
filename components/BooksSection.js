import styles from './BooksSection.module.css';
import BookCard from './BookCard';
import resourcesData from '../data/resourcesData.json';

export default function BooksSection() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.heading}>Our Amazon Kindle Bookshelf</h2>
        <div className={styles.grid}>
          {resourcesData.books.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </div>
    </section>
  );
}