# SITE STRUCTURE TEMPLATE
**Article-Centric Education Platform | Sanity CMS Integration**

---

## OVERVIEW

This is the architectural blueprint for building article-centric education sites in the hospitality ecosystem (somm.site, beverage.fyi, restaurantstandards.com, somm.tips). Use this as a template when starting a new site.

---

## CORE ARCHITECTURE

### Content Strategy
- **Article-first design** - Homepage displays latest articles, not static content
- **Infinite scroll pattern** - Featured article → Sub-featured (2-3) → Grid with Load More
- **Filtering by subcategory** - Clickable tags filter articles (e.g., "GRAPES", "REGIONS")
- **Evergreen content** - Articles are timeless educational resources, not news

### CMS Backend
- **Sanity.io headless CMS** - Content lives in Sanity, site pulls via API
- **Category-based** - Filter articles by category (wine, spirits, beer, coffee-tea, etc.)
- **Subcategory tagging** - Secondary classification (grapes, regions, producers, etc.)
- **Rich text body** - Portable Text format with images, headings, blockquotes

---

## FOLDER STRUCTURE
```
project-root/
├── app/
│   ├── page.js                    # Homepage (article feed)
│   ├── layout.js                  # Root layout (metadata, fonts, analytics)
│   ├── globals.css                # Global styles + font imports
│   ├── articles/
│   │   ├── page.tsx               # Articles archive (all articles grid)
│   │   ├── articles.module.css    # Articles archive styles
│   │   └── [slug]/
│   │       ├── page.tsx           # Individual article template
│   │       └── article.module.css # Article detail styles
│   ├── about/
│   │   ├── page.js
│   │   └── page.module.css
│   ├── disclaimer/page.js         # Legal (REQUIRED)
│   ├── privacy/page.js            # Legal (REQUIRED)
│   ├── terms/page.js              # Legal (REQUIRED)
│   ├── cookies/page.js            # Legal (REQUIRED)
│   ├── sitemap.js                 # Dynamic sitemap (fetches from Sanity)
│   └── legal-pages.module.css     # Shared legal page styles
│
├── components/
│   ├── layout/
│   │   ├── Header.js + Header.module.css
│   │   ├── Footer.js + Footer.module.css
│   │   └── HamburgerMenu.js + HamburgerMenu.module.css
│   ├── homepage/
│   │   ├── FeaturedArticle.js + FeaturedArticle.module.css
│   │   ├── SubFeaturedArticles.js + SubFeaturedArticles.module.css
│   │   ├── ArticleCard.js + ArticleCard.module.css
│   │   └── InfiniteArticleList.js + InfiniteArticleList.module.css
│   └── (other components as needed)
│
├── sanity/
│   ├── lib/
│   │   └── client.ts              # Sanity client config
│   ├── queries.js                 # Article queries
│   ├── schemaTypes/
│   │   ├── article.ts             # Article schema
│   │   └── index.ts
│   └── env.ts
│
├── data/
│   └── (JSON files for static content if needed)
│
├── public/
│   ├── robots.txt                 # SEO crawl rules
│   ├── [site]-favicon.png
│   ├── [site]-social-card.png     # 1200x630px OG image
│   └── images/
│
├── .env.local                     # Sanity credentials
├── next.config.mjs                # Next.js config (includes Sanity CDN)
└── package.json
```

---

## CSS METHODOLOGY

### Philosophy
- **Mobile-first** - Default styles are mobile, desktop in `@media (min-width: 768px)`
- **CSS Modules** - Component-scoped styles, no global pollution
- **Consistent naming** - `.container`, `.content`, `.heading`, `.card` patterns
- **No Tailwind** - Custom CSS for full design control and brand differentiation

### Color Palette Pattern
```css
/* Light background */
background: #fafafa;

/* Black accents */
header/footer: #000000;

/* Text hierarchy */
primary: #000000;
secondary: #333333;
tertiary: #555555;
labels: #777777;

/* Brand accent (site-specific) */
somm.site: #ffde59 (yellow)
beverage.fyi: (define per site)
restaurantstandards: (define per site)
```

### Typography Pattern
```css
font-family: 'Montserrat', sans-serif; /* or site-specific */

/* Sizing scale */
Hero title: 38-48px (desktop), 28-36px (mobile)
Section titles: 24-32px
Body text: 16-18px
Labels/captions: 11-14px
```

### Spacing Pattern
```css
/* Desktop padding */
.content { padding: 0 100px; }

/* Mobile padding */
.content { padding: 0 20px; }

/* Section spacing */
padding: 80px 20px (mobile), 100px 60px (desktop)
```

---

## SANITY INTEGRATION

### Required Schema Fields
```javascript
{
  title: string (required)
  subtitle: text
  slug: slug (required, auto-generated)
  category: dropdown (wine, spirits, beer, etc.) - lowercase
  subcategory: string (Grapes, Regions, Producers, etc.)
  mainImage: image (required, with alt text)
  body: array (Portable Text - rich content)
  publishedAt: datetime
  author: string (default: site owner)
  tags: array of strings
  featured: boolean
}
```

### Query Pattern
```javascript
// All articles by category
*[_type == "article" && category == "wine"] | order(publishedAt desc) {
  _id,
  title,
  subtitle,
  slug,
  mainImage { asset -> { url }, alt },
  subcategory,
  category,
  publishedAt,
  author
}

// Single article by slug
*[_type == "article" && slug.current == $slug][0] {
  (all fields including body)
}
```

### Environment Variables
```
NEXT_PUBLIC_SANITY_PROJECT_ID="[project-id]"
NEXT_PUBLIC_SANITY_DATASET="production"
NEXT_PUBLIC_SANITY_API_VERSION="YYYY-MM-DD"
```

---

## HOMEPAGE STRUCTURE

### Layout Pattern
1. **Header** (fixed position)
2. **FeaturedArticle** (latest article, hero size)
3. **SubFeaturedArticles** (articles 2-3, side-by-side desktop)
4. **InfiniteArticleList** (articles 4+, 3-column grid, Load More button)
5. **Footer**

### Data Flow
```javascript
const articles = await client.fetch(allArticlesQuery);
const featuredArticle = articles[0];
const subFeaturedArticles = articles.slice(1, 3);
const infiniteScrollArticles = articles.slice(3);
```

---

## ARTICLES ARCHIVE PAGE

### Features
- All articles in 3-column grid (desktop), stacked (mobile)
- Filterable by subcategory via URL params (`?subcategory=grapes`)
- Shows article count when filtered
- "View All Articles" button to clear filter
- Uses same ArticleCard component as homepage

### URL Structure
```
/articles                    # All articles
/articles?subcategory=grapes # Filtered articles
```

---

## INDIVIDUAL ARTICLE PAGE

### Required Elements
1. **Breadcrumb** - Category > Subcategory
2. **Title** (H1)
3. **Subtitle** (if exists)
4. **Main image** (full-width)
5. **Author name**
6. **Social share buttons** (Twitter, Facebook, LinkedIn)
7. **Body content** (Portable Text rendered)
8. **Tags** (if exists)
9. **Related articles** (3 articles from same category)
10. **Back to Articles button**

### Portable Text Rendering
- First paragraph gets drop cap (large first letter)
- H2 headings for sections
- Images with captions (flush against image, small gray text)
- Blockquotes with left border

---

## SEO REQUIREMENTS

### Every Page Must Have
```javascript
export const metadata = {
  title: "Page Title",
  description: "Detailed description 150-160 chars",
  keywords: "relevant, keywords, here",
  alternates: {
    canonical: 'https://site.com/page'
  },
  openGraph: {
    title: "OG Title",
    description: "OG Description",
    images: ["image-url"],
    type: "website" // or "article"
  },
  twitter: {
    card: "summary_large_image",
    title: "Twitter Title",
    description: "Twitter Description",
    images: ["image-url"]
  }
};
```

### Root Layout Requirements
- Metadata base URL
- Google Analytics (if applicable)
- Structured Data (Organization schema)
- Viewport config
- Font imports

### Sitemap Requirements
- Dynamic sitemap that fetches articles from Sanity
- Include: homepage, /articles, all article slugs, about, legal pages
- Update frequency: daily (homepage/articles), monthly (articles), yearly (legal)
- Priority: 1.0 (home), 0.9 (articles archive), 0.8 (individual articles)

### robots.txt
```
User-agent: *
Allow: /
Disallow: /api/
Disallow: /admin/
Disallow: /studio/

Sitemap: https://site.com/sitemap.xml
```

### Structured Data
- **Organization schema** (root layout)
- **Article schema** (individual articles)
- Include: headline, description, image, author, publisher, dates, keywords

---

## COMPONENT PATTERNS

### ArticleCard (Reusable)
**Mobile:** Horizontal layout (thumbnail left, content right)
**Desktop:** Vertical layout in grid
**Elements:** Image, subcategory link, title link, subtitle, Read More link

### FeaturedArticle (Hero)
**Mobile:** Stacked (image on top, content below)
**Desktop:** Same layout, larger dimensions
**Elements:** Full-width image, subcategory, title, subtitle, Read More

### Header (Fixed)
**Mobile & Desktop:** Black background, logo left, hamburger menu right
**Fixed position:** `position: fixed; top: 0; z-index: 1000;`
**Spacer div:** Add spacer after header to prevent content hiding

### Footer (Static)
**Layout:** Copyright, social links, legal links
**Style:** Black background, white text, centered on mobile

---

## MOBILE-FIRST CSS EXAMPLE
```css
/* MOBILE FIRST */
.container {
  padding: 20px;
  background: #fafafa;
}

.grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 30px;
}

.title {
  font-size: 28px;
  color: #000000;
}

/* DESKTOP */
@media (min-width: 768px) {
  .container {
    padding: 100px;
  }
  
  .grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 40px;
  }
  
  .title {
    font-size: 38px;
  }
}
```

---

## LEGAL PAGES (REQUIRED)

All sites MUST include:
1. **Privacy Policy** - Data collection, cookies, user info
2. **Terms of Use** - Usage rules, liability limits
3. **Cookie Policy** - Cookie usage, Google Analytics disclosure
4. **Content Disclaimer** - Educational purpose, not professional advice, AI usage disclosure

**Shared CSS:** Use `legal-pages.module.css` for consistent styling across all legal pages

---

## DEPLOYMENT CHECKLIST

Before launch:
- [ ] All metadata filled in (titles, descriptions, OG images)
- [ ] Sitemap generates correctly with all articles
- [ ] robots.txt configured
- [ ] Google Analytics ID correct
- [ ] Social card image exists (1200x630px)
- [ ] Favicon exists
- [ ] All images have alt text in Sanity
- [ ] Legal pages complete
- [ ] Mobile responsive tested
- [ ] Fixed header working with spacer
- [ ] Sanity Studio deployed separately or blocked in robots.txt

---

## KEY PRINCIPLES

1. **Content is king** - Articles are the primary feature, not marketing copy
2. **Mobile-first always** - Most users are on phones
3. **Fast loading** - Optimize images, minimal JavaScript
4. **Accessible** - Alt text, semantic HTML, proper heading hierarchy
5. **SEO optimized** - Metadata, structured data, sitemap, canonical URLs
6. **LLM-friendly** - Detailed descriptions, keywords, structured data for AI indexing
7. **Scalable** - Easy to add new articles via Sanity, no code changes needed
8. **Professional** - Clean code, organized files, CSS Modules, acquisition-ready

---

## CUSTOMIZATION PER SITE

**When building a new site, customize:**
- Brand colors (accent color, possibly background tones)
- Font family (if different from Montserrat)
- Sanity project ID and dataset
- Category filter in queries (`category == "wine"` → `category == "spirits"`)
- Site-specific metadata (titles, descriptions, keywords)
- Social card image and favicon
- Google Analytics ID (if using)

**Keep consistent:**
- Folder structure
- Component architecture
- Mobile-first CSS methodology
- SEO patterns
- Legal pages structure

---

## END OF TEMPLATE

This blueprint ensures consistency across the hospitality education ecosystem while allowing brand-specific customization.