import Image from 'next/image';
import Link from 'next/link';
import styles from './FeaturedArticle.module.css';

export default function FeaturedArticle({ article }) {
  if (!article) return null;

  return (
    <article className={styles.container}>
      {/* Full-width image */}
      <div className={styles.imageWrapper}>
        <Image
          src={article.mainImage.asset.url}
          alt={article.mainImage.alt || article.title}
          fill
          className={styles.image}
          priority
        />
      </div>

      {/* Content below image */}
      <div className={styles.content}>
        {/* Gray subcategory label */}
        {article.subcategory && (
          <Link href={`/articles?subcategory=${article.subcategory.toLowerCase()}`} className={styles.subcategory}>
            {article.subcategory.toUpperCase()}
          </Link>
        )}
        
        {/* Title */}
        <Link href={`/articles/${article.slug.current}`} className={styles.titleLink}>
          <h1 className={styles.title}>{article.title}</h1>
        </Link>
        
        {/* Subtitle */}
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