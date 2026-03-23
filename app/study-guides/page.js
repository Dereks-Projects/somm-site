import { client } from '../../sanity/lib/client';
import { allStudyGuidesQuery } from '../../sanity/queries';
import { urlFor } from '../../sanity/lib/imageUrl';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Image from 'next/image';
import Link from 'next/link';
import styles from './page.module.css';

export const metadata = {
  title: 'Regional Reports - Wine Region Study Guides | Somm.Site',
  description:
    'Comprehensive wine region guides covering the most important wine-producing areas in the world. Free, in-depth study guides for sommeliers, hospitality professionals, and wine enthusiasts.',
  openGraph: {
    title: 'Regional Reports - Wine Region Study Guides | Somm.Site',
    description:
      'Comprehensive wine region guides covering the most important wine-producing areas in the world.',
    type: 'website',
  },
};

export default async function StudyGuidesPage() {
  const guides = await client.fetch(allStudyGuidesQuery, {}, { cache: 'no-store' });

  // Breadcrumb structured data
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://somm.site',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Regional Reports',
        item: 'https://somm.site/study-guides',
      },
    ],
  };

  // CollectionPage structured data
  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Regional Reports',
    description:
      'Comprehensive wine region guides covering the most important wine-producing areas in the world.',
    url: 'https://somm.site/study-guides',
    publisher: {
      '@type': 'Organization',
      name: 'SOMM.SITE',
      logo: {
        '@type': 'ImageObject',
        url: 'https://somm.site/ss-favicon.png',
      },
    },
  };

  return (
    <>
      <Header />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />

      <main className={styles.pageWrapper}>
        {/* HEADER SECTION */}
        <div className={styles.headerSection}>
          <p className={styles.label}>Regional Reports</p>
          <h1 className={styles.heading}>Wine Region Study Guides</h1>
          <p className={styles.description}>
            Comprehensive guides to the most important wine-producing regions in
            the world. Each report covers key grapes, classifications,
            producers, and the information you need to master the region.
          </p>
        </div>

        {/* BREADCRUMB */}
        <div className={styles.breadcrumb}>
          <p className={styles.breadcrumbText}>
            <Link href="/">Home</Link>
            {' > '}
            <span>Regional Reports</span>
          </p>
        </div>

        {/* GUIDE GRID */}
        {guides && guides.length > 0 ? (
          <div className={styles.guideGrid}>
            {guides.map((guide) => {
              const imageUrl = guide.mainImage
                ? urlFor(guide.mainImage)
                    .width(800)
                    .height(450)
                    .format('webp')
                    .quality(80)
                    .url()
                : null;

              return (
                <Link
                  key={guide._id}
                  href={`/study-guides/${guide.slug.current}`}
                  className={styles.guideCard}
                >
                  {imageUrl && (
                    <div className={styles.cardImageWrapper}>
                      <Image
                        src={imageUrl}
                        alt={guide.mainImage?.alt || guide.title}
                        width={800}
                        height={450}
                        className={styles.cardImage}
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </div>
                  )}
                  <div className={styles.cardContent}>
                    <h2 className={styles.cardTitle}>{guide.title}</h2>
                    {guide.subtitle && (
                      <p className={styles.cardSubtitle}>{guide.subtitle}</p>
                    )}
                    <span className={styles.cardLink}>Read Guide</span>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <p className={styles.emptyState}>Study guides coming soon.</p>
        )}
      </main>

      <Footer />
    </>
  );
}