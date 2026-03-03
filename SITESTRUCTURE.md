# SOMM.SITE - Free Wine Education Platform

**Live Site:** [https://somm.site](https://somm.site)

A modern, article-centric wine education platform built with Next.js and Sanity CMS. Professional wine knowledge made accessible to hospitality professionals and enthusiasts worldwide.

---

## About

SOMM.SITE provides comprehensive, free wine education covering grape varieties, wine regions, winemaking techniques, and sommelier knowledge. Built by Derek Engles, a hospitality professional with 20+ years of experience as a sommelier and wine director at luxury properties including Wynn Resort and MGM Grand.

### Key Features

- **Article Library** - Evergreen educational content on wine fundamentals
- **Study Guides** - Comprehensive country and region deep-dives with child article clusters
- **Encyclopedia** - A-to-Z searchable dictionary of wine and beverage terminology
- **Wine Quiz** - Interactive knowledge testing
- **Intro Course** - Structured introductory wine education
- **FAQ Sections** - Per-article FAQ dropdowns with Google FAQ rich result structured data
- **Topic Clusters** - Parent Study Guides linked to child articles for SEO authority building
- **Internal Linking** - Hand-picked Related Reading boxes and in-body contextual links
- **Encyclopedia Search** - Type-ahead search bar in the navigation menu and footer
- **Dynamic Filtering** - Article collection page with subcategory pills and tag-based filtering
- **Multi-Site Publishing** - Articles assignable to Somm.Site, Backbar.fyi, Beverage.fyi, Hospitality.fyi, and Restaurant Standards
- **Mobile-First Design** - Optimized for phones and tablets
- **SEO Optimized** - Full metadata, structured data, sitemaps, topic clusters, and internal linking architecture

---

## Tech Stack

- **Framework:** Next.js 14+ (App Router)
- **CMS:** Sanity.io (Headless)
- **Styling:** CSS Modules (Mobile-First)
- **Deployment:** Vercel
- **Package Manager:** pnpm
- **Language:** JavaScript/TypeScript

---

## Project Structure

```
somm-site/
├── app/
│   ├── page.js                              # Homepage (featured + infinite scroll feed)
│   ├── layout.js                            # Root layout with metadata + analytics
│   ├── globals.css                          # Global styles + Tailwind imports
│   ├── sitemap.js                           # Dynamic XML sitemap
│   │
│   ├── articles/
│   │   ├── page.tsx                         # Article collection (pills + tag filtering)
│   │   ├── articles.module.css
│   │   └── [slug]/
│   │       ├── page.tsx                     # Individual article template
│   │       └── article.module.css
│   │
│   ├── guides/
│   │   └── [slug]/
│   │       ├── page.tsx                     # Study Guide template
│   │       └── guide.module.css
│   │
│   ├── encyclopedia/
│   │   ├── page.tsx                         # Encyclopedia hub (A-Z letter grid)
│   │   ├── encyclopedia.module.css
│   │   ├── [letter]/
│   │   │   ├── page.tsx                     # Letter page (term list)
│   │   │   ├── letter.module.css
│   │   │   └── [slug]/
│   │   │       ├── page.tsx                 # Individual term definition
│   │   │       └── definition.module.css
│   │
│   ├── intro-course/                        # Introductory wine course
│   ├── quizzes/                             # Wine quiz pages
│   ├── about/page.js                        # About page
│   ├── disclaimer/page.js                   # Content disclaimer
│   ├── privacy/page.js                      # Privacy policy
│   ├── terms/page.js                        # Terms of use
│   └── cookies/page.js                      # Cookie policy
│
├── components/
│   ├── layout/
│   │   ├── Header.js                        # Fixed site header with portfolio dropdown
│   │   ├── Header.module.css
│   │   ├── Footer.js                        # Site footer with encyclopedia search
│   │   ├── Footer.module.css
│   │   ├── HamburgerMenu.js                 # Slide-in navigation with encyclopedia search
│   │   ├── HamburgerMenu.module.css
│   │   ├── EncyclopediaSearch.js            # Type-ahead term search component
│   │   └── EncyclopediaSearch.module.css
│   │
│   ├── homepage/
│   │   ├── FeaturedArticle.js               # Hero article component
│   │   ├── FeaturedArticle.module.css
│   │   ├── SubFeaturedArticles.js           # Secondary articles (side-by-side mobile)
│   │   ├── SubFeaturedArticles.module.css
│   │   ├── ArticleCard.js                   # Reusable article card
│   │   ├── ArticleCard.module.css
│   │   ├── InfiniteArticleList.js           # Article grid with Load More
│   │   └── InfiniteArticleList.module.css
│   │
│   └── BackButton.js                        # Reusable back navigation
│
├── sanity/
│   ├── lib/client.ts                        # Sanity client configuration
│   ├── queries.js                           # Shared GROQ queries
│   ├── env.ts                               # Environment config
│   └── schemaTypes/
│       ├── article.ts                       # Article schema (full content type)
│       ├── studyGuide.ts                    # Study Guide schema (parent guides)
│       └── geography.ts                     # Geography taxonomy (countries/regions)
│
├── data/
│   └── encyclopedia/
│       ├── A.json                           # Encyclopedia entries A
│       ├── B.json                           # Encyclopedia entries B
│       ├── ...                              # (one JSON file per letter)
│       └── Z.json                           # Encyclopedia entries Z
│
├── public/                                  # Static assets (images, icons, favicon)
├── .env.local                               # Environment variables (not in repo)
├── next.config.mjs                          # Next.js configuration
└── package.json                             # Dependencies
```

---

## Content Management

### Sanity CMS - Article Schema

Articles are managed through Sanity Studio. Each article includes:

**Core Fields:**
- Title, subtitle, slug (auto-generated), author, published date
- Category (wine, spirits, beer, sake, coffee/tea, education, hospitality, service, industry)
- Subcategory (Grapes, Regions, Producers, History, Business, and others)
- Main image with alt text
- Body content (Portable Text with rich text, images, captions)
- Tags (keyword array for filtering)
- Series/Course grouping
- Featured flag

**SEO and Linking Fields:**
- Parent Study Guide (reference to the guide this article belongs to)
- Related Articles (hand-picked articles for the "Related Reading" box)
- Internal Link annotations (highlight text in body, link to another article or study guide)
- FAQ (array of question/answer pairs, renders as dropdowns and generates FAQPage JSON-LD)
- Geography (optional country/region taxonomy references)

**Multi-Site Publishing:**
- Sites array (publish to Somm.Site, Backbar.fyi, Beverage.fyi, Restaurant Standards, Hospitality.fyi)

### Sanity CMS - Study Guide Schema

Study Guides are parent-level documents that sit above articles in the topic cluster hierarchy:

- Title, subtitle, slug, author, published date
- Category (same options as articles)
- Sites array (multi-site publishing)
- Main image with alt text
- Body content with h2, h3, h4 headings, internal links, section separators
- Tags, featured flag
- Child articles auto-populate via reverse query (articles pointing up to this guide via parentGuide)

### Encyclopedia (Static JSON)

Encyclopedia entries live in `/data/encyclopedia/` as JSON files (one per letter). Each entry contains:

- `term` - The encyclopedia term name
- `definition` - Primary definition text
- `definition2` - Optional additional context (renders in darker gray below the definition)

### Adding New Content

**Articles:**
1. Log into Sanity Studio at `/studio`
2. Create new Article document
3. Fill in required fields (title, category, subcategory, image, body, sites)
4. Optionally set Parent Study Guide, Related Articles, FAQ, and tags
5. Publish. Article automatically appears on homepage, collection page, and sitemap.

**Study Guides:**
1. Create new Study Guide in Sanity Studio
2. Write comprehensive body content with h2/h3/h4 hierarchy
3. Use internal links in body text to link down to child articles
4. Child articles connect by setting their Parent Study Guide field to this guide
5. Deep Dives section auto-populates at the bottom of the guide page

**Encyclopedia Terms:**
1. Open the relevant letter JSON file in `/data/encyclopedia/`
2. Add new entry object with `term`, `definition`, and optional `definition2`
3. Entries are alphabetical within each file
4. Push to deploy. Search component automatically includes new terms.

---

## SEO Architecture

### Topic Cluster Strategy

The site uses a hub-and-spoke internal linking model for SEO:

- **Study Guides** act as hub pages (e.g., "Wines of Italy")
- **Articles** act as spoke pages (e.g., "Barolo and Barbaresco", "Sardinia")
- Articles link up to their parent guide via the `parentGuide` field
- Study Guides link down to children via in-body internal links and the auto-generated Deep Dives section
- Articles link sideways to siblings via Related Reading boxes and body links
- This interconnected structure builds topical authority for Google

### Structured Data

- **Article Schema** - Every article page generates Article JSON-LD
- **FAQPage Schema** - Articles with FAQ entries generate FAQPage JSON-LD for Google FAQ rich results
- **Organization Schema** - Site-wide EducationalOrganization markup in root layout
- **Breadcrumb navigation** - Category and subcategory breadcrumb on article pages

### Internal Linking Features

- **Related Reading Box** - Hand-picked article links, appears after the first image in article body
- **Internal Link Annotations** - Highlight any text in article/guide body, link to another article or study guide
- **Bottom 3 Related Articles** - Auto-pulled from same subcategory, displayed as image cards
- **Deep Dives (Study Guides)** - Auto-pulled child articles displayed at bottom of guide pages
- **Tag Links** - Clickable tags on articles route to the collection page filtered by that tag

### Sitemap

Dynamic XML sitemap generated from Sanity content. Accessible at: `https://somm.site/sitemap.xml`

### robots.txt

```
User-agent: *
Allow: /
Disallow: /api/
Disallow: /admin/
Disallow: /studio/

Sitemap: https://somm.site/sitemap.xml
```

---

## Article Collection Page

The `/articles` page supports two independent filter systems (one active at a time):

**Subcategory Pills:** All, Grapes, Regions, Producers, Other
- URL pattern: `/articles?subcategory=grapes`
- "Other" catches everything not in the first three subcategories
- Active pill is highlighted, subtitle updates dynamically

**Tag Filtering:** Clicking a tag on any article page routes to the collection filtered by that tag
- URL pattern: `/articles?tag=corsica`
- Subtitle shows the tag name, "Clear Filter" link appears
- No subcategory pill is highlighted during tag filtering

---

## Design System

### Colors

- **Background:** `#fafafa` (Light gray)
- **Header/Footer:** `#000000` (Black)
- **Text Primary:** `#000000` (Black)
- **Text Secondary:** `#555555`, `#777777` (Grays)
- **Accent:** `#ffde59` (Yellow, used for dividers and focus states)
- **Related Reading Box:** `#f3f4f6` (Light gray background)
- **Tags:** `#000000` background, `#ffffff` text
- **FAQ Borders:** `#e5e7eb` (Light gray)

### Typography

- **Font:** Montserrat (Google Fonts) - 400, 600, 700 weights
- **Hero Titles:** 38-44px (desktop), 24-33px (mobile)
- **Article Body:** 17px with 1.6 line height
- **Section Headings:** 24px bold
- **Labels/Subcategories:** 11-14px uppercase with letter spacing

### Component Patterns

- **Article Cards (mobile):** Side-by-side layout with 120x120 image
- **Sub-Featured (mobile):** Side-by-side layout with 140x140 image
- **Article Cards (desktop):** Stacked with full-width 240px image
- **FAQ Accordion:** Native `<details>`/`<summary>` elements, no JavaScript
- **Pill Selectors:** Rounded buttons with active/inactive states
- **Encyclopedia Search:** Type-ahead input with dropdown results

### Spacing

- **Desktop Padding:** 100px horizontal
- **Mobile Padding:** 20px horizontal
- **Grid Gap:** 40px (desktop), 16-30px (mobile)
- **Content Max Width:** 896px (articles), 1400px (grids), 1200px (encyclopedia)

---

## Responsive Design

### Mobile-First Approach

All CSS is written mobile-first with desktop enhancements:

```css
/* Mobile (default) */
.container {
  padding: 20px;
}

/* Desktop (768px+) */
@media (min-width: 768px) {
  .container {
    padding: 100px;
  }
}
```

### Breakpoints

- **Mobile:** < 768px
- **Desktop:** >= 768px

---

## Development

### Available Scripts

```bash
pnpm dev          # Start development server
pnpm build        # Build for production
pnpm start        # Start production server
pnpm lint         # Run ESLint
```

### CSS Modules

Component styles are scoped using CSS Modules:

```javascript
import styles from './Component.module.css';

<div className={styles.container}>...</div>
```

### Adding New Pages

1. Create new folder in `app/`
2. Add `page.js` or `page.tsx` (component)
3. Add corresponding `.module.css` (styles)
4. Export metadata object for SEO
5. Update sitemap if needed

---

## Deployment

### Vercel

1. Push code to GitHub
2. Connect repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploys automatically on push to main branch

### Environment Variables (Production)

```
NEXT_PUBLIC_SANITY_PROJECT_ID
NEXT_PUBLIC_SANITY_DATASET
NEXT_PUBLIC_SANITY_API_VERSION
```

---

## Related Projects

Part of the Informative Media hospitality education ecosystem:

- **[Beverage.fyi](https://beverage.fyi)** - Online beverage magazine
- **[Backbar.fyi](https://backbar.fyi)** - Spirits education platform
- **[Hospitality.fyi](https://hospitality.fyi)** - Online hospitality magazine
- **[RestaurantStandards.com](https://restaurantstandards.com)** - Training and development for fine dining
- **[Somm.Tips](https://somm.tips)** - Wine pairings and shopping insights

---

## Legal and Compliance

The site includes comprehensive legal pages:

- **Privacy Policy** - Data collection and usage
- **Terms of Use** - Site usage terms
- **Cookie Policy** - Cookie usage and Google Analytics
- **Content Disclaimer** - Educational purpose disclaimers

All legal pages use shared CSS module for consistent styling.

---

## Contact

**Derek Engles**
- Website: [derekengles.com](https://derekengles.com)
- Email: derekengles@gmail.com
- LinkedIn: [linkedin.com/company/somm-site](https://www.linkedin.com/company/somm-site/)
- Instagram: [@somm.site](https://www.instagram.com/somm.site/)
- TikTok: [@somm.site](https://tiktok.com/@somm.site)

---

## License

Copyright 2026 SOMM.SITE / Informative Media. All rights reserved.

Content is provided for educational purposes. See [Content Disclaimer](https://somm.site/disclaimer) for full terms.

---

**Built for the hospitality community by Derek Engles**