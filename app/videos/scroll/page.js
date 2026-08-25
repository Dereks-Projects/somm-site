// app/videos/scroll/page.js
// Purpose: Server wrapper for the vertical scroll feed. Fetches the videos,
// orders them newest-first so the feed reads like a social timeline, reads the
// deep-link target from ?v=, and hands both to the client feed. Full takeover
// (no Header/Footer). noindex, and kept out of the sitemap.

import { getVideos } from '../../../lib/vimeo';
import ScrollFeed from './ScrollFeed';

export const metadata = {
  title: 'Video Feed',
  robots: { index: false, follow: false },
};

export default async function ScrollPage({ searchParams }) {
  const { v } = await searchParams;
  const videos = await getVideos();

  if (!videos || videos.length === 0) {
    return null;
  }

  // Newest first: the feed scrolls from the latest video back through time.
  const ordered = [...videos].sort(
    (a, b) => new Date(b.uploadDate) - new Date(a.uploadDate)
  );

  return <ScrollFeed videos={ordered} initialVideoId={v || null} />;
}