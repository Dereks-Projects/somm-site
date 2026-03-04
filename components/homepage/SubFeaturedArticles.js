import Image from 'next/image';
import Link from 'next/link';
import styles from './SubFeaturedArticles.module.css';
import { urlFor } from '../../sanity/lib/imageUrl';

export default function SubFeaturedArticles({ articles }) {
  if (!articles || articles.length === 0) return null;

  return (
    <section className={styles.container}>
      {articles.map((article) => {
        const cardImageUrl = urlFor(article.mainImage)
          .width(800)
          .format('webp')
          .quality(80)
          .url();

        return (
          <article key={article._id} className={styles.card}>
            {/* Image */}
            <div className={styles.imageWrapper}>
              <Image
                src={cardImageUrl}
                alt={article.mainImage.alt || article.title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className={styles.image}
                unoptimized
              />
            </div>

            {/* Content */}
            <div className={styles.content}>
              {article.subcategory && (
                <Link href={`/articles?subcategory=${article.subcategory.toLowerCase()}`} className={styles.subcategory}>
                  {article.subcategory.toUpperCase()}
                </Link>
              )}
              <Link href={`/articles/${article.slug.current}`} className={styles.titleLink}>
                <h2 className={styles.title}>{article.title}</h2>
              </Link>

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
      })}
    </section>
  );
}