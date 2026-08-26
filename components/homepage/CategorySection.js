// components/homepage/CategorySection.js
// Purpose: A reusable homepage section that showcases one subcategory in the
// hero's one-big-plus-three layout, on a colored background with white cards.
// Used for "Explore Wine Grapes" (dark) and "Explore Wine Regions" (light).
// Fed oldest-to-newest so older articles get resurfaced. Renders nothing if the
// subcategory has no articles, and gracefully shows fewer than four.

import Image from 'next/image';
import Link from 'next/link';
import { urlFor } from '../../sanity/lib/imageUrl';
import styles from './CategorySection.module.css';

export default function CategorySection({ title, articles, variant = 'light' }) {
  if (!articles || articles.length === 0) return null;

  const featured = articles[0];
  const subs = articles.slice(1, 4);
  const featuredImg = urlFor(featured.mainImage).width(1000).format('webp').quality(80).url();

  return (
    <section className={`${styles.section} ${variant === 'dark' ? styles.dark : styles.light}`}>
      <div className={styles.heading}>
        <h2 className={styles.title}>{title}</h2>
        <div className={styles.rule} />
      </div>

      <div className={styles.grid}>
        {/* Featured (big) */}
        <article className={styles.featuredCard}>
          <Link href={`/articles/${featured.slug.current}`} className={styles.imageLink}>
            <div className={styles.featuredImageWrap}>
              <Image
                src={featuredImg}
                alt={featured.mainImage?.alt || featured.title}
                fill
                sizes="(max-width: 768px) 100vw, 55vw"
                className={styles.image}
                unoptimized
              />
            </div>
          </Link>
          <div className={styles.featuredContent}>
            {featured.subcategory && (
              <Link href={`/articles?subcategory=${featured.subcategory.toLowerCase()}`} className={styles.subcategory}>
                {featured.subcategory.toUpperCase()}
              </Link>
            )}
            <Link href={`/articles/${featured.slug.current}`} className={styles.titleLink}>
              <h3 className={styles.featuredTitle}>{featured.title}</h3>
            </Link>
            {featured.subtitle && (
              <p className={styles.featuredSubtitle}>{featured.subtitle}</p>
            )}
          </div>
        </article>

        {/* Sub-featured (up to 3) */}
        {subs.length > 0 && (
          <div className={styles.subList}>
            {subs.map((a) => {
              const img = urlFor(a.mainImage).width(600).format('webp').quality(80).url();
              return (
                <article key={a._id} className={styles.subCard}>
                  <Link href={`/articles/${a.slug.current}`} className={styles.imageLink}>
                    <div className={styles.subImageWrap}>
                      <Image
                        src={img}
                        alt={a.mainImage?.alt || a.title}
                        fill
                        sizes="(max-width: 768px) 30vw, 20vw"
                        className={styles.image}
                        unoptimized
                      />
                    </div>
                  </Link>
                  <div className={styles.subContent}>
                    {a.subcategory && (
                      <Link href={`/articles?subcategory=${a.subcategory.toLowerCase()}`} className={styles.subcategory}>
                        {a.subcategory.toUpperCase()}
                      </Link>
                    )}
                    <Link href={`/articles/${a.slug.current}`} className={styles.titleLink}>
                      <h3 className={styles.subTitle}>{a.title}</h3>
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}