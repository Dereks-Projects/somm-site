// app/sitemap.js
// Purpose: The list of pages handed to Google at /sitemap.xml.
// Only real Somm.Site pages belong here: no redirects, no 404s, no noindex pages
// (so /videos/scroll, /studio, and filtered /articles?tag= views stay out).

import { client } from '../sanity/lib/client';
import { getVideos } from '../lib/vimeo';
import { getAllCourses, getLessonsByCourse } from '../data/getCourseData';

import A from '../data/encyclopedia/A.json';
import B from '../data/encyclopedia/B.json';
import C from '../data/encyclopedia/C.json';
import D from '../data/encyclopedia/D.json';
import E from '../data/encyclopedia/E.json';
import F from '../data/encyclopedia/F.json';
import G from '../data/encyclopedia/G.json';
import H from '../data/encyclopedia/H.json';
import I from '../data/encyclopedia/I.json';
import J from '../data/encyclopedia/J.json';
import K from '../data/encyclopedia/K.json';
import L from '../data/encyclopedia/L.json';
import M from '../data/encyclopedia/M.json';
import N from '../data/encyclopedia/N.json';
import O from '../data/encyclopedia/O.json';
import P from '../data/encyclopedia/P.json';
import Q from '../data/encyclopedia/Q.json';
import R from '../data/encyclopedia/R.json';
import S from '../data/encyclopedia/S.json';
import T from '../data/encyclopedia/T.json';
import U from '../data/encyclopedia/U.json';
import V from '../data/encyclopedia/V.json';
import W from '../data/encyclopedia/W.json';
import X from '../data/encyclopedia/X.json';
import Y from '../data/encyclopedia/Y.json';
import Z from '../data/encyclopedia/Z.json';

// The live address. Must match metadataBase in app/layout.js and the primary domain in Vercel.
const BASE_URL = 'https://www.somm.site';

// Rebuild at most once an hour, so new Sanity articles and guides appear without a deploy.
export const revalidate = 3600;

const encyclopedia = {
  a: A, b: B, c: C, d: D, e: E, f: F, g: G, h: H, i: I, j: J, k: K, l: L, m: M,
  n: N, o: O, p: P, q: Q, r: R, s: S, t: T, u: U, v: V, w: W, x: X, y: Y, z: Z,
};

// Must stay identical to generateSlug() in the encyclopedia pages, or these URLs will 404.
function generateSlug(term) {
  return term
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// Somm.Site articles and guides only (matches the article and study guide pages).
const articlesQuery = `
  *[_type == "article" && "somm" in sites && defined(slug.current) && !(_id in path("drafts.**"))]
  | order(publishedAt desc) {
    "slug": slug.current,
    "lastModified": coalesce(_updatedAt, publishedAt)
  }
`;

const studyGuidesQuery = `
  *[_type == "studyGuide" && "somm" in sites && defined(slug.current) && !(_id in path("drafts.**"))]
  | order(publishedAt desc) {
    "slug": slug.current,
    "lastModified": coalesce(_updatedAt, publishedAt)
  }
`;

// Adds lastModified only when a real, valid date exists (an invalid date would break the sitemap).
function withDate(entry, value) {
  const date = value ? new Date(value) : null;
  return date && !Number.isNaN(date.getTime()) ? { ...entry, lastModified: date } : entry;
}

export default async function sitemap() {
  // Fixed pages. No lastModified: these have no reliable edit date, and a
  // date that always says "today" teaches Google to ignore the field.
  const staticPages = [
    { path: '', changeFrequency: 'daily', priority: 1.0 },
    { path: '/courses', changeFrequency: 'weekly', priority: 0.9 },
    { path: '/articles', changeFrequency: 'daily', priority: 0.9 },
    { path: '/study-guides', changeFrequency: 'weekly', priority: 0.9 },
    { path: '/videos', changeFrequency: 'weekly', priority: 0.8 },
    { path: '/about', changeFrequency: 'monthly', priority: 0.8 },
    { path: '/encyclopedia', changeFrequency: 'monthly', priority: 0.7 },
    { path: '/privacy', changeFrequency: 'yearly', priority: 0.3 },
    { path: '/terms', changeFrequency: 'yearly', priority: 0.3 },
    { path: '/cookies', changeFrequency: 'yearly', priority: 0.3 },
    { path: '/disclaimer', changeFrequency: 'yearly', priority: 0.3 },
  ].map(({ path, changeFrequency, priority }) => ({
    url: `${BASE_URL}${path}`,
    changeFrequency,
    priority,
  }));

  // Courses and lessons (from the course JSON files)
  const coursePages = [];
  for (const course of getAllCourses()) {
    coursePages.push({
      url: `${BASE_URL}/courses/${course.courseSlug}`,
      changeFrequency: 'monthly',
      priority: 0.9,
    });
    for (const lesson of getLessonsByCourse(course.courseSlug) || []) {
      coursePages.push({
        url: `${BASE_URL}/courses/${course.courseSlug}/${lesson.slug}`,
        changeFrequency: 'monthly',
        priority: 0.8,
      });
    }
  }

  // Encyclopedia letters and terms (letters with no terms are skipped)
  const encyclopediaPages = [];
  for (const [letter, terms] of Object.entries(encyclopedia)) {
    if (!Array.isArray(terms) || terms.length === 0) continue;
    encyclopediaPages.push({
      url: `${BASE_URL}/encyclopedia/${letter}`,
      changeFrequency: 'monthly',
      priority: 0.5,
    });
    const seen = new Set();
    for (const item of terms) {
      const slug = generateSlug(item.term || '');
      if (!slug || seen.has(slug)) continue;
      seen.add(slug);
      encyclopediaPages.push({
        url: `${BASE_URL}/encyclopedia/${letter}/${slug}`,
        changeFrequency: 'yearly',
        priority: 0.5,
      });
    }
  }

  // Sanity content
  const [articles, studyGuides] = await Promise.all([
    client.fetch(articlesQuery),
    client.fetch(studyGuidesQuery),
  ]);

  const articlePages = articles.map((article) =>
    withDate(
      { url: `${BASE_URL}/articles/${article.slug}`, changeFrequency: 'monthly', priority: 0.8 },
      article.lastModified
    )
  );

  const studyGuidePages = studyGuides.map((guide) =>
    withDate(
      { url: `${BASE_URL}/study-guides/${guide.slug}`, changeFrequency: 'monthly', priority: 0.85 },
      guide.lastModified
    )
  );

  // Videos. Wrapped so a Vimeo outage can never break the whole sitemap.
  let videos = [];
  try {
    videos = await getVideos();
  } catch (err) {
    console.error('Sitemap: video fetch failed:', err);
  }

  const videoPages = videos.map((video) =>
    withDate(
      { url: `${BASE_URL}/videos/${video.slug}`, changeFrequency: 'monthly', priority: 0.7 },
      video.uploadDate
    )
  );

  return [
    ...staticPages,
    ...coursePages,
    ...articlePages,
    ...studyGuidePages,
    ...encyclopediaPages,
    ...videoPages,
  ];
}