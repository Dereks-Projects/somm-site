import { client } from '../../sanity/lib/client';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import ArticleCard from '../../components/homepage/ArticleCard';
import styles from './articles.module.css';

export const metadata = {
  title: "Wine Articles & Education",
  description: "Comprehensive wine education articles covering grape varieties, wine regions, producers, and tasting techniques. Free professional wine knowledge for sommeliers and enthusiasts.",
  alternates: {
    canonical: 'https://somm.site/articles'
  },
  openGraph: {
    title: "Wine Articles & Education - SOMM.SITE",
    description: "Professional wine articles and educational resources",
    url: 'https://somm.site/articles'
  }
};

// Query to get all articles or filtered by subcategory
async function getArticles(subcategory = null) {
  const filter = subcategory 
    ? `*[_type == "article" && category == "wine" && subcategory == "${subcategory}"] | order(publishedAt desc)`
    : `*[_type == "article" && category == "wine"] | order(publishedAt desc)`;
  
  const query = `${filter} {
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
  }`;
  
  return await client.fetch(query);
}

export default async function ArticlesPage({ searchParams }) {
  // Get subcategory filter from URL (?subcategory=grapes)
  const params = await searchParams;
  const subcategoryFilter = params?.subcategory || null;
  
  // Fetch articles (all or filtered)
  const articles = await getArticles(subcategoryFilter);
  
  // Create heading based on filter
  const pageHeading = subcategoryFilter 
    ? `${subcategoryFilter.toUpperCase()} ARTICLES`
    : 'ALL ARTICLES';

  return (
    <>
      <Header />
      <div className={styles.container}>
        <div className={styles.content}>
          {/* Page Heading */}
          <h1 className={styles.heading}>{pageHeading}</h1>
          
          {/* Show count and clear filter button if filtered */}
          {subcategoryFilter && (
            <div className={styles.filterInfo}>
              <p className={styles.resultCount}>
                {articles.length} {articles.length === 1 ? 'article' : 'articles'} found
              </p>
              <a href="/articles" className={styles.clearFilter}>
                View All Articles
              </a>
            </div>
          )}
          
          {/* Articles Grid */}
          {articles.length > 0 ? (
            <div className={styles.articleGrid}>
              {articles.map((article) => (
                <ArticleCard key={article._id} article={article} />
              ))}
            </div>
          ) : (
            <p className={styles.noResults}>
              No articles found {subcategoryFilter && `in ${subcategoryFilter.toUpperCase()}`}
            </p>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}