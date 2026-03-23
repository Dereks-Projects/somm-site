import { client } from '../../../sanity/lib/client';
import { studyGuideBySlugQuery, childArticlesQuery } from '../../../sanity/queries';
import { urlFor } from '../../../sanity/lib/imageUrl';
import { PortableText } from '@portabletext/react';
import Header from '../../../components/layout/Header';
import Footer from '../../../components/layout/Footer';
import Image from 'next/image';
import Link from 'next/link';
import styles from './page.module.css';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const guide = await getGuide(slug);

  if (!guide) {
    return { title: 'Guide Not Found' };
  }

  return {
    title: `${guide.title} | Regional Reports | Somm.Site`,
    description: guide.subtitle || `Read about ${guide.title} on SOMM.SITE`,
    openGraph: {
      title: guide.title,
      description: guide.subtitle || `Read about ${guide.title}`,
      images: guide.imageUrl ? [guide.imageUrl] : [],
      type: 'article',
      publishedTime: guide.publishedAt,
      authors: [guide.author || 'Derek Engles'],
    },
    twitter: {
      card: 'summary_large_image',
      title: guide.title,
      description: guide.subtitle || `Read about ${guide.title}`,
      images: guide.imageUrl ? [guide.imageUrl] : [],
    },
  };
}

async function getGuide(slug) {
  const guide = await client.fetch(studyGuideBySlugQuery, { slug }, { cache: 'no-store' });

  if (!guide) return null;

  return {
    ...guide,
    imageUrl: guide.mainImage?.asset?.url,
  };
}

const portableTextComponents = {
  block: {
    normal: ({ children }) => <p>{children}</p>,
    h2: ({ children }) => <h2>{children}</h2>,
    h3: ({ children }) => <h3>{children}</h3>,
    h4: ({ children }) => <h4>{children}</h4>,
    blockquote: ({ children }) => <blockquote>{children}</blockquote>,
  },
  marks: {
    link: ({ children, value }) => (
      <a href={value.href} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    ),
    internalLink: ({ children, value }) => {
      const path =
        value.docType === 'studyGuide'
          ? `/study-guides/${value.slug}`
          : `/articles/${value.slug}`;
      return <Link href={path}>{children}</Link>;
    },
  },
  types: {
    image: ({ value }) => {
      const imageUrl = value?.url;
      if (!imageUrl) return null;

      return (
        <div className={styles.imageWrapper}>
          <Image
            src={imageUrl}
            alt={value.alt || ''}
            width={896}
            height={500}
            className={styles.bodyImage}
            style={{ width: '100%', height: 'auto' }}
          />
          {value.caption && (
            <p className={styles.imageCaption}>{value.caption}</p>
          )}
        </div>
      );
    },
    separator: () => <hr className={styles.bodySeparator} />,
  },
};

export default async function StudyGuidePage({ params }) {
  const { slug } = await params;
  const guide = await getGuide(slug);

  if (!guide) {
    return (
      <>
        <Header />
        <div className={styles.pageWrapper}>
          <div className={styles.notFound}>Guide not found</div>
        </div>
        <Footer />
      </>
    );
  }

  // Fetch child articles for this guide
  const childArticles = await client.fetch(
    childArticlesQuery,
    { guideId: guide._id },
    { cache: 'no-store' }
  );

  // Build optimized main image URL
  const mainImageUrl = guide.mainImage
    ? urlFor(guide.mainImage).width(1200).format('webp').quality(80).url()
    : null;

  // Article structured data
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: guide.title,
    description: guide.subtitle || guide.title,
    image: guide.imageUrl || 'https://somm.site/ss-social-card.png',
    author: {
      '@type': 'Person',
      name: guide.author || 'Derek Engles',
    },
    publisher: {
      '@type': 'Organization',
      name: 'SOMM.SITE',
      logo: {
        '@type': 'ImageObject',
        url: 'https://somm.site/ss-favicon.png',
      },
    },
    datePublished: guide.publishedAt,
    dateModified: guide.publishedAt,
    articleSection: guide.category,
    keywords: guide.tags ? guide.tags.join(', ') : 'wine education',
    inLanguage: 'en-US',
  };

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
      {
        '@type': 'ListItem',
        position: 3,
        name: guide.title,
        item: `https://somm.site/study-guides/${guide.slug.current}`,
      },
    ],
  };

  // FAQ structured data
  const hasFaq = guide.faq && guide.faq.length > 0;
  const faqSchema = hasFaq
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: guide.faq.map((item) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: item.answer,
          },
        })),
      }
    : null;

  const hasKeyFacts = guide.keyFacts && guide.keyFacts.length > 0;
  const hasChildArticles = childArticles && childArticles.length > 0;

  return (
    <>
      <Header />

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      <main className={styles.pageWrapper}>
        {/* BREADCRUMB */}
        <div className={styles.breadcrumb}>
          <p className={styles.breadcrumbText}>
            <Link href="/">Home</Link>
            {' > '}
            <Link href="/study-guides">Regional Reports</Link>
            {' > '}
            <span>{guide.title}</span>
          </p>
        </div>

        {/* TITLE & SUBTITLE */}
        <div className={styles.titleSection}>
          <h1 className={styles.title}>{guide.title}</h1>
          {guide.subtitle && (
            <p className={styles.subtitle}>{guide.subtitle}</p>
          )}
        </div>

        {/* MAIN IMAGE */}
        {mainImageUrl && (
          <div className={styles.mainImageWrapper}>
            <Image
              src={mainImageUrl}
              alt={guide.mainImage?.alt || guide.title}
              width={1200}
              height={675}
              className={styles.mainImage}
              style={{ width: '100%', height: 'auto' }}
              priority
            />
          </div>
        )}

        {/* AUTHOR & SOCIAL SHARE */}
        <div className={styles.authorSection}>
          <p className={styles.authorName}>{guide.author || 'Derek Engles'}</p>
          <div className={styles.socialLinks}>
            <a
              href={`https://twitter.com/intent/tweet?url=${encodeURIComponent('https://somm.site/study-guides/' + slug)}&text=${encodeURIComponent(guide.title)}`}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
            >
              <svg className={styles.socialIcon} fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent('https://somm.site/study-guides/' + slug)}`}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
            >
              <svg className={styles.socialIcon} fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
            <a
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent('https://somm.site/study-guides/' + slug)}`}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
            >
              <svg className={styles.socialIcon} fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
          </div>
        </div>

        {/* KEY FACTS - At A Glance */}
        {hasKeyFacts && (
          <div className={styles.keyFactsCard}>
            <h3 className={styles.keyFactsHeading}>At a Glance</h3>
            <dl className={styles.keyFactsList}>
              {guide.keyFacts.map((fact, i) => (
                <div key={i} className={styles.keyFactItem}>
                  <dt className={styles.keyFactLabel}>{fact.label}</dt>
                  <dd className={styles.keyFactValue}>{fact.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        )}

        {/* BODY CONTENT */}
        {guide.body && (
          <article className={styles.bodyContent}>
            <PortableText
              value={guide.body}
              components={portableTextComponents}
            />
          </article>
        )}

        {/* FAQ */}
        {hasFaq && (
          <div className={styles.faqSection}>
            <h3 className={styles.faqHeading}>Frequently Asked Questions</h3>
            <div className={styles.faqList}>
              {guide.faq.map((item, i) => (
                <details key={i} className={styles.faqItem}>
                  <summary className={styles.faqQuestion}>
                    {item.question}
                  </summary>
                  <p className={styles.faqAnswer}>{item.answer}</p>
                </details>
              ))}
            </div>
          </div>
        )}

        {/* DIVIDER */}
        <div className={styles.dividerSection}>
          <hr className={styles.divider} />
        </div>

        {/* TAGS */}
        {guide.tags && guide.tags.length > 0 && (
          <div className={styles.tagsSection}>
            <div className={styles.tagsContainer}>
              {guide.tags.map((tag, i) => (
                <span key={i} className={styles.tag}>
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* ARTICLES IN THIS GUIDE */}
        {hasChildArticles && (
          <div className={styles.childArticlesSection}>
            <h3 className={styles.childArticlesHeading}>
              Articles in this Guide
            </h3>
            <div className={styles.childArticlesGrid}>
              {childArticles.map((article) => {
                const articleImageUrl = article.mainImage
                  ? urlFor(article.mainImage)
                      .width(600)
                      .format('webp')
                      .quality(80)
                      .url()
                  : null;

                return (
                  <Link
                    key={article._id}
                    href={`/articles/${article.slug.current}`}
                    className={styles.childArticleCard}
                  >
                    {articleImageUrl && (
                      <div className={styles.childArticleImageWrapper}>
                        <Image
                          src={articleImageUrl}
                          alt={article.mainImage?.alt || article.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 33vw"
                          className={styles.childArticleImage}
                        />
                      </div>
                    )}
                    <div className={styles.childArticleContent}>
                      <h4 className={styles.childArticleTitle}>
                        {article.title}
                      </h4>
                      {article.subtitle && (
                        <p className={styles.childArticleSubtitle}>
                          {article.subtitle}
                        </p>
                      )}
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}

        {/* NAVIGATION */}
        <div className={styles.navigationSection}>
          <Link href="/study-guides" className={styles.navButton}>
            ← Back to Regional Reports
          </Link>
          <Link href="/" className={styles.navButton}>
            ← Back to Home
          </Link>
        </div>
      </main>

      <Footer />
    </>
  );
}