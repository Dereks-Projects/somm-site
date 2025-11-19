# SOMM.SITE - Free Wine Education Platform

**Live Site:** [https://somm.site](https://somm.site)

A modern, article-centric wine education platform built with Next.js and Sanity CMS. Professional wine knowledge made accessible to hospitality professionals and enthusiasts worldwide.

---

## 🍷 About

SOMM.SITE provides comprehensive, free wine education covering grape varieties, wine regions, winemaking techniques, and sommelier knowledge. Built by Derek Engles, a hospitality professional with 20+ years of experience as a sommelier and wine director at luxury properties including Wynn Resort and MGM Grand.

### Key Features

- **Article Library** - Evergreen educational content on wine fundamentals
- **Dynamic Filtering** - Browse articles by subcategory (Grapes, Regions, Producers)
- **Mobile-First Design** - Optimized for phones and tablets
- **SEO Optimized** - Full metadata, structured data, and sitemaps for search engines
- **Sanity CMS Integration** - Headless CMS for easy content management
- **Responsive Layout** - Clean, professional design across all devices

---

## 🛠 Tech Stack

- **Framework:** Next.js 14+ (App Router)
- **CMS:** Sanity.io (Headless)
- **Styling:** CSS Modules (Mobile-First)
- **Deployment:** Vercel
- **Package Manager:** pnpm
- **Language:** JavaScript/TypeScript

---

## 📁 Project Structure
```
somm-site/
├── app/
│   ├── page.js                    # Homepage (article feed)
│   ├── layout.js                  # Root layout with metadata
│   ├── globals.css                # Global styles
│   ├── articles/
│   │   ├── page.tsx               # Articles archive
│   │   └── [slug]/page.tsx        # Individual article template
│   ├── about/page.js              # About page
│   ├── intro-course/              # Introductory wine course
│   ├── disclaimer/page.js         # Content disclaimer
│   ├── privacy/page.js            # Privacy policy
│   ├── terms/page.js              # Terms of use
│   ├── cookies/page.js            # Cookie policy
│   └── sitemap.js                 # Dynamic sitemap
│
├── components/
│   ├── layout/
│   │   ├── Header.js              # Site header (fixed)
│   │   ├── Footer.js              # Site footer
│   │   └── HamburgerMenu.js       # Mobile navigation
│   ├── homepage/
│   │   ├── FeaturedArticle.js     # Hero article component
│   │   ├── SubFeaturedArticles.js # Secondary articles
│   │   ├── ArticleCard.js         # Reusable article card
│   │   └── InfiniteArticleList.js # Article grid with Load More
│   └── (other components)
│
├── sanity/
│   ├── lib/client.ts              # Sanity client configuration
│   ├── queries.js                 # Article queries
│   ├── schemaTypes/
│   │   └── article.ts             # Article content schema
│   └── env.ts                     # Environment config
│
├── data/                          # Static JSON data files
├── public/                        # Static assets (images, favicon)
├── .env.local                     # Environment variables (not in repo)
├── next.config.mjs                # Next.js configuration
└── package.json                   # Dependencies
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- pnpm package manager (`npm install -g pnpm`)
- Sanity account and project set up

### Installation

1. **Clone the repository**
```bash
   git clone https://github.com/yourusername/somm-site.git
   cd somm-site
```

2. **Install dependencies**
```bash
   pnpm install
```

3. **Set up environment variables**
   
   Create `.env.local` in the project root:
```env
   NEXT_PUBLIC_SANITY_PROJECT_ID="your-project-id"
   NEXT_PUBLIC_SANITY_DATASET="production"
   NEXT_PUBLIC_SANITY_API_VERSION="2025-11-10"
```

4. **Run development server**
```bash
   pnpm dev
```

5. **Open in browser**
```
   http://localhost:3000
```

6. **Access Sanity Studio** (if configured)
```
   http://localhost:3000/studio
```

---

## 📝 Content Management

### Sanity CMS

Articles are managed through Sanity Studio. Each article includes:

- **Title** - Main article heading
- **Subtitle** - Supporting description
- **Slug** - URL-friendly identifier (auto-generated)
- **Category** - Primary classification (wine, spirits, beer, etc.)
- **Subcategory** - Secondary tag (Grapes, Regions, Producers, etc.)
- **Main Image** - Featured image with alt text
- **Body** - Rich text content (Portable Text format)
- **Published Date** - Publication timestamp
- **Author** - Content creator name
- **Tags** - Keywords for categorization
- **Featured** - Highlight flag

### Adding New Articles

1. Log into Sanity Studio at `/studio`
2. Create new Article document
3. Fill in all required fields
4. Add main image with descriptive alt text
5. Write content using rich text editor
6. Publish when ready

Articles automatically appear on the homepage and in the sitemap.

---

## 🎨 Design System

### Colors

- **Background:** `#fafafa` (Light gray)
- **Header/Footer:** `#000000` (Black)
- **Text Primary:** `#000000` (Black)
- **Text Secondary:** `#555555`, `#777777` (Grays)
- **Accent:** `#ffde59` (Yellow)

### Typography

- **Font:** Montserrat (Google Fonts)
- **Hero Titles:** 38-48px (desktop), 28-36px (mobile)
- **Body Text:** 16-18px
- **Labels:** 11-14px

### Spacing

- **Desktop Padding:** 100px horizontal
- **Mobile Padding:** 20px horizontal
- **Grid Gap:** 40px (desktop), 30px (mobile)

---

## 🔍 SEO Features

### Metadata

- Dynamic page titles with template pattern
- Descriptive meta descriptions (150-160 characters)
- Open Graph tags for social sharing
- Twitter Card support
- Canonical URLs to prevent duplicate content

### Structured Data

- **Organization Schema** - Site-wide business information
- **Article Schema** - Individual article metadata
- **Breadcrumb Schema** - Navigation hierarchy

### Sitemap

Dynamic XML sitemap generated from Sanity content:
- Homepage
- All article pages
- About page
- Course pages
- Legal pages

Accessible at: `https://somm.site/sitemap.xml`

### robots.txt

Configured to allow search engine crawling while blocking admin areas:
```
User-agent: *
Allow: /
Disallow: /api/
Disallow: /admin/
Disallow: /studio/

Sitemap: https://somm.site/sitemap.xml
```

---

## 📱 Responsive Design

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
- **Desktop:** ≥ 768px

---

## 🔧 Development

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
2. Add `page.js` (component)
3. Add `page.module.css` (styles)
4. Export metadata for SEO
5. Update sitemap if needed

---

## 🌐 Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Connect repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically on push

### Environment Variables (Production)

Set these in your deployment platform:
```
NEXT_PUBLIC_SANITY_PROJECT_ID
NEXT_PUBLIC_SANITY_DATASET
NEXT_PUBLIC_SANITY_API_VERSION
```

---

## 📄 Legal & Compliance

The site includes comprehensive legal pages:

- **Privacy Policy** - Data collection and usage
- **Terms of Use** - Site usage terms
- **Cookie Policy** - Cookie usage and Google Analytics
- **Content Disclaimer** - Educational purpose disclaimers

All legal pages use shared CSS module for consistent styling.

---

## 🤝 Contributing

This is a personal educational project. For questions or collaboration inquiries, contact Derek Engles via the About page.

---

## 📚 Related Projects

Part of the hospitality education ecosystem:

- **[Beverage.fyi](https://beverage.fyi)** - Comprehensive beverage knowledge platform
- **[RestaurantStandards.com](https://restaurantstandards.com)** - High-performance training for fine dining
- **[Somm.Tips](https://somm.tips)** - Wine and cocktail recommendation engine

---

## 📧 Contact

**Derek Engles**
- Website: [derekengles.com](https://derekengles.com)
- Email: derekengles@gmail.com
- LinkedIn: [linkedin.com/company/somm-site](https://www.linkedin.com/company/somm-site/)

---

## 📜 License

© 2025 SOMM.SITE. All rights reserved.

Content is provided for educational purposes. See [Content Disclaimer](https://somm.site/disclaimer) for full terms.

---

## 🎯 Project Goals

- **Democratize wine education** - Make professional knowledge accessible to everyone
- **Free forever** - No paywalls, no subscriptions
- **Professional quality** - Industry-standard content and design
- **SEO optimized** - Rank well for wine education searches
- **Mobile-first** - Optimized for on-the-go learning
- **Scalable** - Easy to add content without code changes

---

**Built with ❤️ for the hospitality community**