import Image from 'next/image';
import Link from 'next/link';
import styles from './SubFeaturedArticles.module.css';

export default function SubFeaturedArticles({ articles }) {
  if (!articles || articles.length === 0) return null;

  return (
    <section className={styles.container}>
      {articles.map((article) => (
        <article key={article._id} className={styles.card}>
          {/* Image */}
          <div className={styles.imageWrapper}>
            <Image
              src={article.mainImage.asset.url}
              alt={article.mainImage.alt || article.title}
              fill
              className={styles.image}
            />
          </div>

          {/* Content */}
          <div className={styles.content}>
            {article.subcategory && (
              <p className={styles.subcategory}>{article.subcategory.toUpperCase()}</p>
            )}
            <Link href={`/articles/${article.slug.current}`} className={styles.titleLink}>
              <h2 className={styles.title}>{article.title}</h2>
            </Link>
            
            {/* Read More Link */}
            <Link href={`/articles/${article.slug.current}`} className={styles.readMore}>
              Read More
            </Link>
          </div>
        </article>
      ))}
    </section>
  );
}