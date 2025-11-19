import Image from 'next/image';
import Link from 'next/link';
import styles from './ArticleCard.module.css';

export default function ArticleCard({ article }) {
  if (!article) return null;

  return (
    <article className={styles.card}>
      {/* Image on top */}
      <div className={styles.imageWrapper}>
        <Image
          src={article.mainImage.asset.url}
          alt={article.mainImage.alt || article.title}
          fill
          sizes="(max-width: 768px) 120px, 33vw"
          className={styles.image}
        />
      </div>

      {/* Content below */}
      <div className={styles.content}>
        {article.subcategory && (
          <Link href={`/articles?subcategory=${article.subcategory.toLowerCase()}`} className={styles.subcategory}>
            {article.subcategory.toUpperCase()}
          </Link>
        )}
        <Link href={`/articles/${article.slug.current}`} className={styles.titleLink}>
          <h3 className={styles.title}>{article.title}</h3>
        </Link>
        
        {article.subtitle && (
          <p className={styles.subtitle}>{article.subtitle}</p>
        )}

        {/* Read More Link */}
        <Link href={`/articles/${article.slug.current}`} className={styles.readMore}>
          Read More
        </Link>
      </div>
    </article>
  );
}