// app/page.js
// Purpose: Homepage. Section-labeled article hero (one featured + three
// sub-featured), a "Latest Videos" rail, the Regional Reports slider, the
// infinite article list, and two subcategory showcases (Grapes, Regions)
// presented oldest-to-newest to resurface older articles.

import { client } from '../sanity/lib/client.ts';
import { allArticlesQuery, allStudyGuidesQuery } from '../sanity/queries';
import { getVideos } from '../lib/vimeo';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import SectionHeading from '../components/homepage/SectionHeading';
import FeaturedArticle from '../components/homepage/FeaturedArticle';
import SubFeaturedArticles from '../components/homepage/SubFeaturedArticles';
import VideoRail from '../components/homepage/VideoRail';
import StudyGuideSlider from '../components/homepage/StudyGuideSlider';
import InfiniteArticleList from '../components/homepage/InfiniteArticleList';
import CategorySection from '../components/homepage/CategorySection';
import styles from './page.module.css';

export const metadata = {
  title: "Somm.Site - Wine Education & Articles",
  description: "Free wine education covering grape varieties, wine regions, winemaking techniques, tasting methods, and sommelier knowledge. Comprehensive articles on Cabernet Sauvignon, Pinot Noir, Chardonnay, Champagne, Bordeaux, Burgundy, Napa Valley, and world wine regions. Professional hospitality training for sommeliers, servers, and wine enthusiasts.",
  keywords: "wine education, sommelier training, grape varieties, wine regions, wine tasting, Cabernet Sauvignon, Pinot Noir, Chardonnay, Bordeaux, Burgundy, Napa Valley, wine knowledge, free wine course, hospitality training",
  openGraph: {
    title: "Somm.Site - Free Wine Education & Articles",
    description: "Comprehensive wine education covering grape varieties, regions, and sommelier knowledge"
  }
};

// Oldest-to-newest slice of a single subcategory, capped at four.
function bySubcategoryOldestFirst(articles, subcategory, limit = 4) {
  return articles
    .filter((a) => a.subcategory === subcategory)
    .sort((a, b) => new Date(a.publishedAt) - new Date(b.publishedAt))
    .slice(0, limit);
}

export default async function Home() {
  // Fetch all Wine articles from Sanity
  const articles = await client.fetch(allArticlesQuery, {}, { cache: 'no-store' });

  // Fetch study guides published to somm.site
  const studyGuides = await client.fetch(allStudyGuidesQuery, {}, { cache: 'no-store' });

  // Videos for the "Latest Videos" rail, newest first, capped at 12.
  // Wrapped in try/catch so a Vimeo outage can never take down the homepage:
  // on failure the rail simply does not render and the rest of the page is fine.
  let latestVideos = [];
  try {
    const videos = await getVideos();
    latestVideos = [...videos]
      .sort((a, b) => new Date(b.uploadDate) - new Date(a.uploadDate))
      .slice(0, 12);
  } catch (err) {
    console.error('Homepage video rail failed to load:', err);
  }

  // Split articles: [0] = featured, [1,2,3] = sub-featured (3), [4+] = infinite
  const featuredArticle = articles[0];
  const subFeaturedArticles = articles.slice(1, 4);
  const infiniteScrollArticles = articles.slice(4);

  // Subcategory showcases, oldest-to-newest
  const grapesArticles = bySubcategoryOldestFirst(articles, 'Grapes');
  const regionsArticles = bySubcategoryOldestFirst(articles, 'Regions');

  return (
    <div>
      <Header />

      {/* Hero Grid - Editorial layout (side-by-side on desktop) */}
      <div className={styles.heroGrid}>
        {/* Featured Article - Latest */}
        {featuredArticle && <FeaturedArticle article={featuredArticle} />}

        {/* Sub-Featured Articles - 2nd, 3rd & 4th Latest */}
        {subFeaturedArticles.length > 0 && (
          <SubFeaturedArticles articles={subFeaturedArticles} />
        )}
      </div>

      {/* Latest Videos - Vimeo rail (hidden if no videos load) */}
      {latestVideos.length > 0 && (
        <>
          <SectionHeading title="Latest Videos" />
          <VideoRail videos={latestVideos} />
        </>
      )}

      {/* Regional Reports - Study Guide Slider */}
      <StudyGuideSlider guides={studyGuides} />

      {/* More Articles - Infinite Scroll (5th Article Onward) */}
      {infiniteScrollArticles.length > 0 && (
        <InfiniteArticleList articles={infiniteScrollArticles} />
      )}

      {/* Explore Wine Grapes - oldest first */}
      <CategorySection title="Explore Wine Grapes" articles={grapesArticles} variant="dark" />

      {/* Explore Wine Regions - oldest first */}
      <CategorySection title="Explore Wine Regions" articles={regionsArticles} variant="light" />

      <Footer />
    </div>
  );
}