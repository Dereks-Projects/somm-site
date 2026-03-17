'use strict';

export default function sanityImageLoader({ src, width, quality }) {
  const url = new URL(src);
  url.searchParams.set('w', width.toString());
  url.searchParams.set('fm', 'webp');
  url.searchParams.set('q', (quality || 80).toString());
  return url.toString();
}