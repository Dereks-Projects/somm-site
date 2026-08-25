// app/sitemap.js

import { client } from '../sanity/lib/client';
import { getVideos } from '../lib/vimeo';
import courseData from '../data/courseData.json';

export default async function sitemap() {
  const baseUrl = 'https://somm.site';

  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/articles`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/study-guides`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/videos`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/intro-course`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/cookies`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/disclaimer`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ];

  // Fetch all articles from Sanity
  const articles = await client.fetch(`
    *[_type == "article" && category == "wine"] | order(publishedAt desc) {
      "slug": slug.current,
      publishedAt
    }
  `);

  // Fetch all study guides published to somm.site
  const studyGuides = await client.fetch(`
    *[_type == "studyGuide" && "somm" in sites] | order(publishedAt desc) {
      "slug": slug.current,
      publishedAt
    }
  `);

  // Fetch videos. /videos/scroll is intentionally left out (noindex feed).
  // Wrapped so a Vimeo outage can never break the whole sitemap.
  let videos = [];
  try {
    videos = await getVideos();
  } catch (err) {
    console.error('Sitemap: video fetch failed:', err);
  }

  // Dynamic article pages
  const articlePages = articles.map((article) => ({
    url: `${baseUrl}/articles/${article.slug}`,
    lastModified: article.publishedAt ? new Date(article.publishedAt) : new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  // Dynamic study guide pages
  const studyGuidePages = studyGuides.map((guide) => ({
    url: `${baseUrl}/study-guides/${guide.slug}`,
    lastModified: guide.publishedAt ? new Date(guide.publishedAt) : new Date(),
    changeFrequency: 'monthly',
    priority: 0.85,
  }));

  // Dynamic course pages
  const coursePages = courseData.map((lesson) => ({
    url: `${baseUrl}/intro-course/${lesson.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  // Dynamic video pages (lastmod from Vimeo upload date)
  const videoPages = videos.map((video) => ({
    url: `${baseUrl}/videos/${video.slug}`,
    lastModified: video.uploadDate ? new Date(video.uploadDate) : new Date(),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  return [
    ...staticPages,
    ...articlePages,
    ...studyGuidePages,
    ...coursePages,
    ...videoPages,
  ];
}