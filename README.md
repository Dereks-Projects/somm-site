# SOMM.SITE Redux

A modern, SEO-optimized educational platform for wine and hospitality professionals, rebuilt with Next.js.

---

## Overview

SOMM.SITE is a comprehensive wine education platform that offers:
- Free introductory wine courses
- Curated links to educational resources across the web
- Professional hospitality training materials
- Amazon Kindle bookshelf with published works

This project is a complete rebuild from the ground up using modern web technologies for better performance, SEO, and scalability.

---

## Tech Stack

### Framework & Core
- **Next.js 16.0.1** - React framework with App Router
- **React 19** - UI component library
- **JavaScript** (ES6+) - No TypeScript

### Styling
- **CSS Modules** - Component-scoped styling
- **Google Fonts** - Montserrat typography
- **Custom CSS** - No Tailwind, no CSS frameworks

### Development Tools
- **ESLint** - Code quality and linting
- **VS Code** - Primary development environment
- **npm** - Package management

### Hosting & Deployment
- **TBD** - Ready for Vercel, Netlify, or custom hosting

---

## Project Structure

```
new-somm-site/
├── app/                      # Next.js App Router pages
│   ├── globals.css          # Global styles
│   ├── layout.js            # Root layout wrapper
│   ├── page.js              # Homepage
│   ├── intro-course/        # Course landing page
│   │   ├── page.js
│   │   └── [slug]/          # Dynamic lesson pages
│   │       └── page.js
│
├── components/              # Reusable React components
│   ├── Header.js
│   ├── Footer.js
│   ├── CourseCard.js
│   ├── ResourceCard.js
│   ├── BookCard.js
│   └── ...
│
├── data/                    # JSON data files
│   ├── courseData.json     # Wine course lessons
│   └── resourcesData.json  # Sites and books
│
├── public/                  # Static assets
│   └── images/
│       ├── sites/          # Site showcase images
│       ├── books/          # Book cover images
│       ├── icons/          # Social media icons
│       └── blog-images/    # Course hero/body images
│
├── package.json
├── next.config.mjs
└── README.md
```

---

## Getting Started

### Prerequisites
- Node.js 18.x or higher
- npm 9.x or higher

### Installation

1. **Clone or open the project:**
```bash
cd new-somm-site
```

2. **Install dependencies:**
```bash
npm install
```

3. **Start development server:**
```bash
npm run dev
```

4. **Open browser:**
```
http://localhost:3000
```

The site will automatically reload when you save changes to files.

---

## Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server (after build)
npm start

# Run linter
npm run lint
```

---

## Key Features

### 🎓 Educational Content System
- Dynamic course pages with JSON-driven content
- Reusable article layout for future courses
- SEO-optimized with server-side rendering

### 🎨 Modern Design
- Mobile-first responsive design
- Custom CSS modules for component isolation
- Professional typography with Montserrat font
- Consistent color palette and spacing

### 🔗 Resource Hub
- Curated links to external educational resources
- Showcase of related websites and tools
- Amazon Kindle Direct Publishing integration

### 📱 Performance Optimized
- Next.js automatic code splitting
- Optimized image loading
- Server-side rendering for fast initial load
- Static generation where possible

---

## Pages & Routes

| URL | Description |
|-----|-------------|
| `/` | Homepage with hero, resources, courses, books |
| `/intro-course` | Course landing page with all 6 lessons |
| `/intro-course/[slug]` | Individual lesson articles |

### Planned Routes
- `/about` - About page
- `/contact` - Contact page
- Future courses: `/intermediate-course`, `/advanced-course`

---

## Content Management

### Adding New Course Lessons

1. Add lesson data to `/data/courseData.json`:
```json
{
  "id": 7,
  "title": "Course Title",
  "subtitle": "Lesson Name",
  "slug": "lesson-url-slug",
  "heroImage": "/blog-images/hero.jpg",
  "paragraph1": "Content...",
  ...
}
```

2. Add corresponding images to `/public/blog-images/`

3. Lesson automatically appears on course page and is accessible via URL

### Adding Resources or Books

Edit `/data/resourcesData.json` and add images to appropriate folders.

---

## Design System

### Colors
```css
--black: #000000
--white: #ffffff
--yellow-accent: #ffde59
--midnight-teal: #00343d
--card-dark: #1a1a1a
--gray-light: #f5f5f5
--text-gray: #333333
```

### Typography
- **Font Family:** Montserrat (Google Fonts)
- **Headings:** 700 weight
- **Body:** 400 weight
- **Buttons/Labels:** 600 weight

### Spacing
- **Section Padding:** 80px vertical, 40px horizontal
- **Max Width:** 1200px (sections), 800px (articles)
- **Grid Gap:** 20-30px

### Breakpoints
- **Mobile:** < 768px
- **Desktop:** ≥ 768px

---

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

---

## SEO Features

- Server-side rendering for all pages
- Semantic HTML structure
- Meta tags ready for customization
- Clean URL structure
- Fast page load times

---

## Development Notes

### Component Philosophy
- Each component has its own CSS module
- No global styles except fonts and resets
- Reusable and composable design
- Server components by default

### File Naming Conventions
- Pages: `page.js`
- Page styles: `page.module.css`
- Components: `ComponentName.js`
- Component styles: `ComponentName.module.css`
- Data: `camelCase.json`

### Best Practices
- Mobile-first responsive design
- Semantic HTML elements
- Accessible markup (ARIA when needed)
- Optimized images (WebP/JPEG for photos, SVG for icons)
- Clean, readable code with comments

---

## Deployment

This project is ready for deployment to:

**Vercel (Recommended):**
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

**Netlify:**
- Connect GitHub repository
- Build command: `npm run build`
- Publish directory: `.next`

**Custom Server:**
- Build: `npm run build`
- Start: `npm start`
- Requires Node.js runtime

---

## Future Enhancements

### Planned Features
- [ ] Mobile hamburger menu
- [ ] About page
- [ ] Contact page
- [ ] Intermediate course content
- [ ] Advanced course content
- [ ] User authentication (future)
- [ ] Course progress tracking (future)
- [ ] Newsletter signup (future)

### Technical Improvements
- [ ] Add meta tags for SEO
- [ ] Implement Open Graph tags
- [ ] Add structured data (JSON-LD)
- [ ] Performance monitoring
- [ ] Analytics integration
- [ ] Sitemap generation

---

## Contributing

This is a personal project by Derek Engles. Not currently accepting contributions.

---

## License

All rights reserved. © 2025 Derek Engles

### Content
- All written course content is proprietary
- All book materials are copyrighted
- Educational use only

### Code
- Source code is for portfolio demonstration
- Not for commercial reuse without permission

---

## Author

**Derek Engles**
- Hospitality professional with 20+ years experience
- Author: "The Beverage Compass," "Restaurant Standards," "Wine Fundamentals"
- Full-stack developer specializing in hospitality technology

### Related Projects
- [Beverage.fyi](https://beverage.fyi) - Beverage knowledge platform
- [RestaurantStandards.com](https://restaurantstandards.com) - Michelin/Forbes training
- [Somm.Tips](https://somm.tips) - Wine pairing engine

---

## Acknowledgments

- Built with Next.js by Vercel
- Typography by Google Fonts
- Hospitality expertise from 200,000+ guest interactions
- Inspired by democratizing fine dining knowledge

---

## Support

For questions or issues:
- Review the PROGRESSREPORT.md for current project status
- Check Next.js documentation: https://nextjs.org/docs
- Ensure all dependencies are installed: `npm install`

---

**Version:** 1.0.0  
**Last Updated:** October 31, 2025  
**Status:** Active Development