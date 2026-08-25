// lib/vimeo.js
// Purpose: Server-side data layer for the Vimeo folder ("Somm.Site Scroll").
// Fetches every video in the folder, normalizes each into a clean, predictable
// shape, and caches the result on an interval so new uploads appear without a
// redeploy. This is the SINGLE source of video data for all video surfaces.
//
// SERVER ONLY. Never import this into a 'use client' component. It reads the
// Vimeo access token from a server-side env var that must never reach the browser.

const VIMEO_API = 'https://api.vimeo.com';

// How long (seconds) to cache Vimeo's response before the next visitor triggers
// a refetch. 3600 = 1 hour. Lower = fresher, but more API calls.
const REVALIDATE_SECONDS = 3600;

// Only request the fields we use. Keeps the response small and the fetch fast.
const FIELDS = [
  'uri',
  'name',
  'description',
  'duration',
  'created_time',
  'width',
  'height',
  'pictures.sizes',
  'tags',
  'link',
  'player_embed_url',
].join(',');

function slugify(text) {
  return String(text)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// Vimeo returns thumbnails smallest to largest. Take the largest.
function pickThumbnail(pictures) {
  const sizes = pictures?.sizes || [];
  if (!sizes.length) return null;
  const largest = sizes[sizes.length - 1];
  return {
    url: largest.link || null,
    width: largest.width || null,
    height: largest.height || null,
  };
}

// Collapse Vimeo's raw video object into the shape our components expect.
function normalizeVideo(v) {
  const id = v.uri ? v.uri.split('/').pop() : '';
  const title = v.name || 'Untitled';
  const thumb = pickThumbnail(v.pictures);
  const hashtags = Array.isArray(v.tags)
    ? v.tags.map((t) => t.tag || t.name).filter(Boolean)
    : [];

  return {
    id,                                 // numeric Vimeo id
    slug: `${slugify(title)}-${id}`,    // e.g. "douro-valley-history-948271635"
    title,
    description: v.description || '',
    duration: v.duration || 0,          // seconds
    uploadDate: v.created_time || null, // ISO string
    thumbnail: thumb?.url || null,
    thumbnailWidth: thumb?.width || 1080,
    thumbnailHeight: thumb?.height || 1920,
    width: v.width || 1080,
    height: v.height || 1920,
    hashtags,
    embedUrl: v.player_embed_url || null,
    vimeoLink: v.link || null,
  };
}

// One authenticated GET against the Vimeo API, with caching applied.
async function fetchVimeo(url) {
  const token = process.env.VIMEO_ACCESS_TOKEN;
  if (!token) {
    throw new Error(
      '[vimeo] Missing VIMEO_ACCESS_TOKEN. Add it to .env.local and restart the dev server.'
    );
  }

  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/vnd.vimeo.*+json;version=3.4',
    },
    next: { revalidate: REVALIDATE_SECONDS },
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`[vimeo] API responded ${res.status}: ${body}`);
  }

  return res.json();
}

// Fetch and normalize every video in the folder. Follows Vimeo's paging if the
// folder ever grows beyond one page.
export async function getVideos() {
  const folderId = process.env.VIMEO_FOLDER_ID;
  if (!folderId) {
    throw new Error(
      '[vimeo] Missing VIMEO_FOLDER_ID. Add it to .env.local and restart the dev server.'
    );
  }

  const videos = [];
  // "projects" is Vimeo's API name for what the UI calls a Folder.
  let next = `${VIMEO_API}/me/projects/${folderId}/videos?fields=${FIELDS}&per_page=100`;

  while (next) {
    const data = await fetchVimeo(next);
    const page = Array.isArray(data.data) ? data.data : [];
    videos.push(...page.map(normalizeVideo));
    next = data.paging?.next ? `${VIMEO_API}${data.paging.next}` : null;
  }

  return videos;
}

// Single video by slug (used later by /videos/[slug]). Reads the cached list.
export async function getVideoBySlug(slug) {
  const videos = await getVideos();
  return videos.find((v) => v.slug === slug) || null;
}

// Single video by numeric id (used later by the /videos/scroll deep-link).
export async function getVideoById(id) {
  const videos = await getVideos();
  return videos.find((v) => v.id === String(id)) || null;
}