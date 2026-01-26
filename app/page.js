import { client } from '../sanity/lib/client.ts';
import { allArticlesQuery } from '../sanity/queries';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import FeaturedArticle from '../components/homepage/FeaturedArticle';
import SubFeaturedArticles from '../components/homepage/SubFeaturedArticles';
import InfiniteArticleList from '../components/homepage/InfiniteArticleList';

export const metadata = {
  title: "Somm.Site - Wine Education & Articles",
  description: "Free wine education covering grape varieties, wine regions, winemaking techniques, tasting methods, and sommelier knowledge. Comprehensive articles on Cabernet Sauvignon, Pinot Noir, Chardonnay, Champagne, Bordeaux, Burgundy, Napa Valley, and world wine regions. Professional hospitality training for sommeliers, servers, and wine enthusiasts.",
  keywords: "wine education, sommelier training, grape varieties, wine regions, wine tasting, Cabernet Sauvignon, Pinot Noir, Chardonnay, Bordeaux, Burgundy, Napa Valley, wine knowledge, free wine course, hospitality training",
  openGraph: {
    title: "Somm.Site - Free Wine Education & Articles",
    description: "Comprehensive wine education covering grape varieties, regions, and sommelier knowledge"
  }
};

export default async function Home() {
  // Fetch all Wine articles from Sanity
  const articles = await client.fetch(allArticlesQuery, {}, { cache: 'no-store' });

  // Split articles: [0] = featured, [1,2] = sub-featured, [3+] = infinite scroll
  const featuredArticle = articles[0];
  const subFeaturedArticles = articles.slice(1, 3);
  const infiniteScrollArticles = articles.slice(3);

  return (
    <div>
      <Header />
      
      {/* Featured Article - Latest */}
      {featuredArticle && <FeaturedArticle article={featuredArticle} />}
      
      {/* Sub-Featured Articles - 2nd & 3rd Latest */}
      {subFeaturedArticles.length > 0 && (
        <SubFeaturedArticles articles={subFeaturedArticles} />
      )}
      
      {/* Infinite Scroll - 4th Article Onward */}
      {infiniteScrollArticles.length > 0 && (
        <InfiniteArticleList articles={infiniteScrollArticles} />
      )}
      
      <Footer />
    </div>
  );
}