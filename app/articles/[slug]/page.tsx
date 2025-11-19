import { client } from '../../../sanity/lib/client'
import { PortableText } from '@portabletext/react'
import Header from '../../../components/layout/Header'
import Footer from '../../../components/layout/Footer'
import BackButton from '../../../components/BackButton'
import styles from './article.module.css'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const article = await getArticle(slug)
  
  if (!article) {
    return {
      title: 'Article Not Found',
    }
  }

  return {
    title: article.title,
    description: article.subtitle || `Read about ${article.title} on SOMM.SITE`,
    openGraph: {
      title: article.title,
      description: article.subtitle || `Read about ${article.title}`,
      images: article.imageUrl ? [article.imageUrl] : [],
      type: 'article',
      publishedTime: article.publishedAt,
      authors: [article.author || 'Derek Engles'],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.subtitle || `Read about ${article.title}`,
      images: article.imageUrl ? [article.imageUrl] : [],
    }
  }
}

async function getArticle(slug: string) {
  const query = `*[_type == "article" && slug.current == $slug][0] {
    _id,
    title,
    subtitle,
    body[]{
      ...,
      _type == "image" => {
        ...,
        "url": asset->url
      }
    },
    publishedAt,
    category,
    subcategory,
    author,
    tags,
    mainImage {
      asset-> {
        url
      },
      alt
    },
    "relatedArticles": *[_type == "article" && category == ^.category && _id != ^._id][0...3]{
      title,
      slug,
      "imageUrl": mainImage.asset->url
    }
  }`
  
  const article = await client.fetch(query, { slug }, { cache: 'no-store' })
  
  if (!article) return null

  return {
    ...article,
    imageUrl: article.mainImage?.asset?.url
  }
}

const portableTextComponents = {
  block: {
    normal: ({ children }: any) => <p>{children}</p>,
    h2: ({ children }: any) => <h2>{children}</h2>,
    blockquote: ({ children }: any) => <blockquote>{children}</blockquote>,
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
  },
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const article = await getArticle(slug)

  if (!article) {
    // Structured data for article
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": article.title,
    "description": article.subtitle || article.title,
    "image": article.imageUrl || "https://somm.site/ss-social-card.png",
    "author": {
      "@type": "Person",
      "name": article.author || "Derek Engles"
    },
    "publisher": {
      "@type": "Organization",
      "name": "SOMM.SITE",
      "logo": {
        "@type": "ImageObject",
        "url": "https://somm.site/ss-favicon.png"
      }
    },
    "datePublished": article.publishedAt,
    "dateModified": article.publishedAt,
    "articleSection": article.subcategory || article.category,
    "keywords": article.tags ? article.tags.join(", ") : "wine education",
    "inLanguage": "en-US",
    "about": {
      "@type": "Thing",
      "name": article.subcategory || "Wine"
    }
  };

  return (
    <>
      <Header />
      
      {/* Article Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      
      <div className={styles.pageWrapper}>
          <div style={{ padding: '32px', fontFamily: 'Montserrat, sans-serif' }}>
            Article not found
          </div>
        </div>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Header />
      <div className={styles.pageWrapper}>
        {/* BREADCRUMB */}
        <div className={styles.breadcrumb}>
          <p className={styles.breadcrumbText}>
            {article.category}
            {article.subcategory && ` > ${article.subcategory}`}
          </p>
        </div>

        {/* TITLE & SUBTITLE */}
        <div className={styles.titleSection}>
          <h1 className={styles.title}>
            {article.title}
          </h1>
          {article.subtitle && (
            <p className={styles.subtitle}>
              {article.subtitle}
            </p>
          )}
        </div>

        {/* MAIN IMAGE */}
        {article.imageUrl && (
          <div className={styles.mainImageWrapper}>
            <img 
              src={article.imageUrl} 
              alt={article.mainImage?.alt || article.title}
              className={styles.mainImage}
            />
          </div>
        )}

        {/* AUTHOR & SOCIAL SHARE */}
        <div className={styles.authorSection}>
          <p className={styles.authorName}>
            {article.author || 'Derek Engles'}
          </p>
          <div className={styles.socialLinks}>
            <a 
              href={`https://twitter.com/intent/tweet?url=${encodeURIComponent('https://somm.site/articles/' + slug)}&text=${encodeURIComponent(article.title)}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className={styles.socialLink}
            >
              <svg className={styles.socialIcon} fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
            <a 
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent('https://somm.site/articles/' + slug)}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className={styles.socialLink}
            >
              <svg className={styles.socialIcon} fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
            <a 
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent('https://somm.site/articles/' + slug)}`} 
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

        {/* BODY */}
        <article className={styles.bodyContent}>
          <PortableText value={article.body} components={portableTextComponents} />
        </article>

        {/* SUMMARY DIVIDER */}
        <div className={styles.dividerSection}>
          <hr className={styles.divider} />
        </div>

        {/* TAGS */}
        {article.tags && article.tags.length > 0 && (
          <div className={styles.tagsSection}>
            <div className={styles.tagsContainer}>
              {article.tags.map((tag: string, i: number) => (
                <span key={i} className={styles.tag}>
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* RELATED ARTICLES */}
        {article.relatedArticles && article.relatedArticles.length > 0 && (
          <div className={styles.relatedSection}>
            <h3 className={styles.relatedHeading}>Related Articles</h3>
            <div className={styles.relatedGrid}>
              {article.relatedArticles.map((related: any) => (
                <a 
                  key={related.slug.current} 
                  href={`/articles/${related.slug.current}`} 
                  className={styles.relatedCard}
                >
                  {related.imageUrl && (
                    <img 
                      src={related.imageUrl} 
                      alt={related.title} 
                      className={styles.relatedImage}
                    />
                  )}
                  <h4 className={styles.relatedTitle}>{related.title}</h4>
                </a>
              ))}
            </div>
          </div>
        )}

        {/* BACK BUTTON */}
        {/* NAVIGATION BUTTONS */}
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