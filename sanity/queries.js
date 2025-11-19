// Get ALL articles with full data
export const allArticlesQuery = `
  *[_type == "article" && category == "wine"] | order(publishedAt desc) {
    _id,
    title,
    subtitle,
    slug,
    mainImage {
      asset -> {
        _id,
        url
      },
      alt
    },
    subcategory,
    category,
    publishedAt,
    author
  }
`;