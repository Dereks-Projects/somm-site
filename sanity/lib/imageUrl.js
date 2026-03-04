import imageUrlBuilder from '@sanity/image-url';
import { client } from './client';

const builder = imageUrlBuilder(client);

/**
 * Generates an optimized Sanity image URL.
 *
 * @param {object} source - The Sanity image asset reference object
 * @returns {object} - A builder instance with chainable methods
 *
 * Usage examples:
 *   urlFor(article.mainImage).width(800).format('webp').quality(80).url()
 *   urlFor(article.mainImage).width(1600).format('webp').quality(80).url()
 */
export function urlFor(source) {
  return builder.image(source);
}