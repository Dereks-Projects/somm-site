// app/videos/page.js
// Purpose: Server-rendered "Video Collection" grid. Newest-first, 9:16 cards,
// 2-across on mobile and 4-across on desktop. Each card opens that video's own
// page. Crawlable and indexable.

import { getVideos } from '../../lib/vimeo';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import VideoCard from '../../components/videos/VideoCard';
import styles from './page.module.css';

export const metadata = {
  title: 'Video Collection',
  description:
    'Short wine education videos covering grape varieties, regions, and sommelier knowledge. One-minute lessons from Somm.Site.',
  alternates: {
    canonical: 'https://somm.site/videos',
  },
  openGraph: {
    title: 'Video Collection - Somm.Site',
    description: 'Short wine education videos from Somm.Site',
    url: 'https://somm.site/videos',
  },
};

export default async function VideosPage() {
  const videos = await getVideos();
  const ordered = [...videos].sort(
    (a, b) => new Date(b.uploadDate) - new Date(a.uploadDate)
  );

  return (
    <>
      <Header />
      <main className={styles.container}>
        <div className={styles.content}>
          <h1 className={styles.heading}>Video Collection</h1>

          {ordered.length > 0 ? (
            <div className={styles.grid}>
              {ordered.map((video) => (
                <VideoCard
                  key={video.id}
                  video={video}
                  href={`/videos/${video.slug}`}
                />
              ))}
            </div>
          ) : (
            <p className={styles.empty}>No videos found.</p>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}