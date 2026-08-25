// app/videos/[slug]/page.js
// Purpose: One indexable page per video. Server-rendered with full SEO signals:
// metadata, VideoObject + BreadcrumbList structured data, a semantic heading, and
// crawlable internal links. The player is a click-to-load facade so the heavy
// embed never weighs down the initial load. Every hashtag links into the Article
// Collection. Previous/Next walk the videos newest-first, each to its own URL,
// and a calm footer nav returns to the grid or home.

import { client } from '../../../sanity/lib/client';
import { getVideos } from '../../../lib/vimeo';
import { urlFor } from '../../../sanity/lib/imageUrl';
import Header from '../../../components/layout/Header';
import Footer from '../../../components/layout/Footer';
import VideoEmbed from './VideoEmbed';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import styles from './page.module.css';

// Seconds -> ISO 8601 duration, e.g. 62 -> "PT1M2S".
function isoDuration(seconds) {
  const s = Math.max(0, Math.floor(seconds || 0));
  return `PT${Math.floor(s / 60)}M${s % 60}S`;
}

// Newest first, matching the feed.
function byNewest(a, b) {
  return new Date(b.uploadDate) - new Date(a.uploadDate);
}

// Related articles that share any of the video's hashtags (somm only).
async function getRelatedArticles(hashtags) {
  const tagList = (hashtags || []).map((t) => t.toLowerCase());
  if (tagList.length === 0) return [];

  return client.fetch(
    `*[_type == "article" && "somm" in sites && count(tags[lower(@) in $tagList]) > 0]
      | order(publishedAt desc)[0...4]{
        _id, title, slug,
        mainImage { asset->{ _id, url }, alt }
      }`,
    { tagList },
    { cache: 'no-store' }
  );
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const video = (await getVideos()).find((v) => v.slug === slug);
  if (!video) return { title: 'Video Not Found' };

  const description = video.description
    ? video.description.slice(0, 155)
    : `Watch ${video.title} on Somm.Site.`;

  return {
    title: video.title,
    description,
    alternates: { canonical: `https://somm.site/videos/${video.slug}` },
    openGraph: {
      title: video.title,
      description,
      type: 'video.other',
      url: `https://somm.site/videos/${video.slug}`,
      images: video.thumbnail ? [video.thumbnail] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: video.title,
      description,
      images: video.thumbnail ? [video.thumbnail] : [],
    },
  };
}

export default async function VideoPage({ params }) {
  const { slug } = await params;

  const sorted = [...(await getVideos())].sort(byNewest);
  const index = sorted.findIndex((v) => v.slug === slug);
  if (index === -1) notFound();

  const video = sorted[index];
  const prev = index > 0 ? sorted[index - 1] : null; // newer
  const next = index < sorted.length - 1 ? sorted[index + 1] : null; // older

  const articles = await getRelatedArticles(video.hashtags);

  const videoSchema = {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: video.title,
    description: video.description || video.title,
    thumbnailUrl: video.thumbnail ? [video.thumbnail] : [],
    uploadDate: video.uploadDate,
    duration: isoDuration(video.duration),
    embedUrl: `https://player.vimeo.com/video/${video.id}`,
    publisher: {
      '@type': 'Organization',
      name: 'SOMM.SITE',
      logo: {
        '@type': 'ImageObject',
        url: 'https://somm.site/ss-favicon.png',
      },
    },
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://somm.site' },
      { '@type': 'ListItem', position: 2, name: 'Videos', item: 'https://somm.site/videos' },
      {
        '@type': 'ListItem',
        position: 3,
        name: video.title,
        item: `https://somm.site/videos/${video.slug}`,
      },
    ],
  };

  return (
    <>
      <Header />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(videoSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <main className={styles.wrapper}>
        <div className={styles.content}>
          <p className={styles.breadcrumb}>
            <Link href="/">Home</Link>
            {' > '}
            <Link href="/videos">Videos</Link>
            {' > '}
            <span>{video.title}</span>
          </p>

          <h1 className={styles.title}>{video.title}</h1>

          <VideoEmbed
            id={video.id}
            title={video.title}
            thumbnail={video.thumbnail}
            thumbnailWidth={video.thumbnailWidth}
            thumbnailHeight={video.thumbnailHeight}
          />

          {video.description && (
            <p className={styles.description}>{video.description}</p>
          )}

          {video.hashtags && video.hashtags.length > 0 && (
            <div className={styles.tags}>
              {video.hashtags.map((tag) => (
                <Link
                  key={tag}
                  href={`/articles?tag=${encodeURIComponent(tag.toLowerCase())}`}
                  className={styles.tagLink}
                >
                  #{tag}
                </Link>
              ))}
            </div>
          )}

          <Link href={`/videos/scroll?v=${video.id}`} className={styles.feedLink}>
            Watch in the feed →
          </Link>

          {articles.length > 0 && (
            <section className={styles.related}>
              <h2 className={styles.relatedHeading}>Related Reading</h2>
              <div className={styles.relatedGrid}>
                {articles.map((a) => {
                  const img = a.mainImage
                    ? urlFor(a.mainImage).width(600).format('webp').quality(80).url()
                    : null;
                  return (
                    <Link
                      key={a._id}
                      href={`/articles/${a.slug.current}`}
                      className={styles.relatedCard}
                    >
                      {img && (
                        <div className={styles.relatedImageWrap}>
                          <Image
                            src={img}
                            alt={a.mainImage?.alt || a.title}
                            fill
                            sizes="(max-width: 768px) 100vw, 50vw"
                            className={styles.relatedImage}
                          />
                        </div>
                      )}
                      <h3 className={styles.relatedTitle}>{a.title}</h3>
                    </Link>
                  );
                })}
              </div>
            </section>
          )}

          {/* Chronological previous / next (newest-first), each its own URL */}
          <nav className={styles.pager}>
            {prev ? (
              <Link href={`/videos/${prev.slug}`} className={styles.pagerLink}>
                ← Previous
              </Link>
            ) : (
              <span className={styles.pagerDisabled}>← Previous</span>
            )}

            {next ? (
              <Link href={`/videos/${next.slug}`} className={`${styles.pagerLink} ${styles.pagerNext}`}>
                Next →
              </Link>
            ) : (
              <span className={`${styles.pagerDisabled} ${styles.pagerNext}`}>Next →</span>
            )}
          </nav>

          {/* Footer nav, styled to match the article pages */}
          <div className={styles.footerNav}>
            <Link href="/videos" className={styles.footerLink}>← All Videos</Link>
            <Link href="/" className={styles.footerLink}>← Back to Home</Link>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}