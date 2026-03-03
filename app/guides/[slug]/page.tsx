import { client } from '../../../sanity/lib/client'
import { PortableText } from '@portabletext/react'
import Header from '../../../components/layout/Header'
import Footer from '../../../components/layout/Footer'
import styles from './guide.module.css'
import Link from 'next/link'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const guide = await getGuide(slug)
  
  if (!guide) {
    return {
      title: 'Study Guide Not Found',
    }
  }

  return {
    title: `${guide.title} — SOMM.SITE Study Guide`,
    description: guide.subtitle || `Comprehensive study guide: ${guide.title}`,
    openGraph: {
      title: guide.title,
      description: guide.subtitle || `Comprehensive study guide: ${guide.title}`,
      images: guide.imageUrl ? [guide.imageUrl] : [],
      type: 'article',
      publishedTime: guide.publishedAt,
      authors: [guide.author || 'Derek Engles'],
    },
    twitter: {
      card: 'summary_large_image',
      title: guide.title,
      description: guide.subtitle || `Comprehensive study guide: ${guide.title}`,
      images: guide.imageUrl ? [guide.imageUrl] : [],
    }
  }
}

async function getGuide(slug: string) {
  const query = `*[_type == "studyGuide" && slug.current == $slug][0] {
    _id,
    title,
    subtitle,
    body[]{
      ...,
      _type == "image" => {
        ...,
        "url": asset->url
      },
      markDefs[]{
        ...,
        _type == "internalLink" => {
          ...,
          "slug": reference->slug.current,
          "docType": reference->_type
        }
      }
    },
    publishedAt,
    category,
    author,
    tags,
    keyFacts,
    mainImage {
      asset-> {
        url
      },
      alt
    },
    "childArticles": *[_type == "article" && parentGuide._ref == ^._id] | order(publishedAt desc) {
      title,
      subtitle,
      slug,
      "imageUrl": mainImage.asset->url
    }
  }`
  
  const guide = await client.fetch(query, { slug }, { cache: 'no-store' })
  
  if (!guide) return null

  return {
    ...guide,
    imageUrl: guide.mainImage?.asset?.url
  }
}

const portableTextComponents = {
  block: {
    normal: ({ children }: any) => <p>{children}</p>,
    h2: ({ children }: any) => <h2>{children}</h2>,
    h3: ({ children }: any) => <h3>{children}</h3>,
    h4: ({ children }: any) => <h4>{children}</h4>,
    blockquote: ({ children }: any) => <blockquote>{children}</blockquote>,
  },
  marks: {
    link: ({ children, value }: any) => (
      <a href={value.href} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    ),
    internalLink: ({ children, value }: any) => {
      const path = value.docType === 'studyGuide' 
        ? `/guides/${value.slug}` 
        : `/articles/${value.slug}`
      return (
        <Link href={path}>
          {children}
        </Link>
      )
    },
  },
  types: {
    image: ({ value }: any) => {
      const imageUrl = value?.url
      if (!imageUrl) return null
      
      return (
        <div className={styles.imageWrapper}>
          <img src={imageUrl} alt={value.alt || ""} className={styles.bodyImage} />
          {value.caption && (
            <p className={styles.imageCaption}>{value.caption}</p>
          )}
        </div>
      )
    },
    separator: () => (
      <hr className={styles.separator} />
    ),
  },
}

export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const guide = await getGuide(slug)

  if (!guide) {
    return (
      <>
        <Header />
        <div className={styles.pageWrapper}>
          <div style={{ padding: '32px', fontFamily: 'Montserrat, sans-serif' }}>
            Study Guide not found
          </div>
        </div>
        <Footer />
      </>
    )
  }

  // Structured data
  const guideSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": guide.title,
    "description": guide.subtitle || guide.title,
    "image": guide.imageUrl || "https://somm.site/ss-social-card.png",
    "author": {
      "@type": "Person",
      "name": guide.author || "Derek Engles"
    },
    "publisher": {
      "@type": "Organization",
      "name": "SOMM.SITE",
      "logo": {
        "@type": "ImageObject",
        "url": "https://somm.site/ss-favicon.png"
      }
    },
    "datePublished": guide.publishedAt,
    "dateModified": guide.publishedAt,
    "articleSection": guide.category,
    "keywords": guide.tags ? guide.tags.join(", ") : "wine education",
    "inLanguage": "en-US",
  };

  // Split body at first image to insert Key Facts before it
  const hasKeyFacts = guide.keyFacts && guide.keyFacts.length > 0
  const firstImageIndex = guide.body 
    ? guide.body.findIndex((block: any) => block._type === 'image') 
    : -1
  
  const bodyBeforeFacts = (hasKeyFacts && firstImageIndex >= 0) 
    ? guide.body.slice(0, firstImageIndex) 
    : guide.body
  
  const bodyAfterFacts = (hasKeyFacts && firstImageIndex >= 0) 
    ? guide.body.slice(firstImageIndex) 
    : []

  return (
    <>
      <Header />
      
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(guideSchema) }}
      />
      
      <div className={styles.pageWrapper}>
        {/* BREADCRUMB */}
        <div className={styles.breadcrumb}>
          <p className={styles.breadcrumbText}>
            <Link href="/">Home</Link>
            {' > '}
            <Link href="/guides">Study Guides</Link>
            {guide.category && (
              <>
                {' > '}
                {guide.category}
              </>
            )}
          </p>
        </div>

        {/* TITLE & SUBTITLE */}
        <div className={styles.titleSection}>
          <p className={styles.guideLabel}>Study Guide</p>
          <h1 className={styles.title}>
            {guide.title}
          </h1>
          {guide.subtitle && (
            <p className={styles.subtitle}>
              {guide.subtitle}
            </p>
          )}
        </div>

        {/* MAIN IMAGE */}
        {guide.imageUrl && (
          <div className={styles.mainImageWrapper}>
            <img 
              src={guide.imageUrl} 
              alt={guide.mainImage?.alt || guide.title}
              className={styles.mainImage}
            />
          </div>
        )}

        {/* AUTHOR & SOCIAL SHARE */}
        <div className={styles.authorSection}>
          <p className={styles.authorName}>
            {guide.author || 'Derek Engles'}
          </p>
          <div className={styles.socialLinks}>
            <a 
              href={`https://twitter.com/intent/tweet?url=${encodeURIComponent('https://somm.site/guides/' + slug)}&text=${encodeURIComponent(guide.title)}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className={styles.socialLink}
            >
              <svg className={styles.socialIcon} fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
            <a 
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent('https://somm.site/guides/' + slug)}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className={styles.socialLink}
            >
              <svg className={styles.socialIcon} fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
            <a 
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent('https://somm.site/guides/' + slug)}`} 
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

        {/* BODY — Introduction section (before first image) */}
        <article className={styles.bodyContent}>
          <PortableText value={bodyBeforeFacts} components={portableTextComponents} />
        </article>

        {/* KEY FACTS — "At a Glance" box */}
        {hasKeyFacts && (
          <div className={styles.keyFactsBox}>
            <h4 className={styles.keyFactsHeading}>At a Glance</h4>
            <div className={styles.keyFactsGrid}>
              {guide.keyFacts.map((fact: any, i: number) => (
                <div key={i} className={styles.keyFactRow}>
                  <span className={styles.keyFactLabel}>{fact.label}</span>
                  <span className={styles.keyFactValue}>{fact.value}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* BODY — Remainder after Key Facts */}
        {bodyAfterFacts.length > 0 && (
          <article className={styles.bodyContent}>
            <PortableText value={bodyAfterFacts} components={portableTextComponents} />
          </article>
        )}

        {/* DIVIDER */}
        <div className={styles.dividerSection}>
          <hr className={styles.divider} />
        </div>

        {/* TAGS */}
        {guide.tags && guide.tags.length > 0 && (
          <div className={styles.tagsSection}>
            <div className={styles.tagsContainer}>
              {guide.tags.map((tag: string, i: number) => (
                <span key={i} className={styles.tag}>
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* CHILD ARTICLES — Deep dives from this topic cluster */}
        {guide.childArticles && guide.childArticles.length > 0 && (
          <div className={styles.childSection}>
            <h3 className={styles.childHeading}>Deep Dives</h3>
            <p className={styles.childSubheading}>Explore the topics covered in this guide</p>
            <div className={styles.childGrid}>
              {guide.childArticles.map((child: any) => (
                <a 
                  key={child.slug.current} 
                  href={`/articles/${child.slug.current}`} 
                  className={styles.childCard}
                >
                  {child.imageUrl && (
                    <img 
                      src={child.imageUrl} 
                      alt={child.title} 
                      className={styles.childImage}
                    />
                  )}
                  <h4 className={styles.childTitle}>{child.title}</h4>
                  {child.subtitle && (
                    <p className={styles.childSubtitle}>{child.subtitle}</p>
                  )}
                </a>
              ))}
            </div>
          </div>
        )}

        {/* NAVIGATION */}
        <div className={styles.navigationSection}>
          <a href="/articles" className={styles.navButton}>
            ← Back to Articles
          </a>
          <a href="/" className={styles.navButton}>
            ← Back to Home
          </a>
        </div>
      </div>
      <Footer />
    </>
  )
}