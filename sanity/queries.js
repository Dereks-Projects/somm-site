// ─── ARTICLE QUERIES ───

// Get ALL wine articles with full data
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

// ─── STUDY GUIDE QUERIES ───

// Get all study guides published to somm.site (homepage slider + landing page)
export const allStudyGuidesQuery = `
  *[_type == "studyGuide" && "somm" in sites] | order(publishedAt desc) {
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
    category,
    publishedAt
  }
`;

// Get a single study guide by slug (individual guide page)
export const studyGuideBySlugQuery = `
  *[_type == "studyGuide" && slug.current == $slug][0] {
    _id,
    title,
    subtitle,
    slug,
    category,
    mainImage {
      asset -> {
        _id,
        url
      },
      alt
    },
    author,
    publishedAt,
    body[] {
      ...,
      markDefs[] {
        ...,
        _type == "internalLink" => {
          "slug": reference -> slug.current,
          "docType": reference -> _type
        }
      },
      _type == "image" => {
        ...,
        asset -> {
          _id,
          url
        }
      }
    },
    keyFacts,
    faq,
    tags,
    geography[] -> {
      _id,
      title
    }
  }
`;

// Get child articles belonging to a specific study guide
export const childArticlesQuery = `
  *[_type == "article" && parentGuide._ref == $guideId] | order(publishedAt desc) {
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
    publishedAt
  }
`;