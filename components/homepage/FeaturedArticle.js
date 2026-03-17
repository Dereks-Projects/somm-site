import Image from 'next/image';
import Link from 'next/link';
import styles from './FeaturedArticle.module.css';
import { urlFor } from '../../sanity/lib/imageUrl';

export default function FeaturedArticle({ article }) {
  if (!article) return null;

  const heroImageUrl = urlFor(article.mainImage)
    .width(1600)
    .format('webp')
    .quality(80)
    .url();

  return (
    <article className={styles.container}>
      {/* Full-width hero image */}
      <div className={styles.imageWrapper}>
        <Image
          src={heroImageUrl}
          alt={article.mainImage.alt || article.title}
          fill
          sizes="100vw"
          className={styles.image}
          priority
          unoptimized
          fetchPriority="high"
        />
      </div>

      {/* Content below image */}
      <div className={styles.content}>
        {article.subcategory && (
          <Link href={`/articles?subcategory=${article.subcategory.toLowerCase()}`} className={styles.subcategory}>
            {article.subcategory.toUpperCase()}
          </Link>
        )}

        <Link href={`/articles/${article.slug.current}`} className={styles.titleLink}>
          <h1 className={styles.title}>{article.title}</h1>
        </Link>

        {article.subtitle && (
          <p className={styles.subtitle}>{article.subtitle}</p>
        )}

        <Link
          href={`/articles/${article.slug.current}`}
          className={styles.readMore}
          aria-label={`Read more about ${article.title}`}
        >
          Read More
        </Link>
      </div>
    </article>
  );
}