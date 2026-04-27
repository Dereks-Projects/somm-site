import { client } from '../../sanity/lib/client';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import ArticleCard from '../../components/homepage/ArticleCard';
import Link from 'next/link';
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

async function getArticles(subcategory: string | null, tag: string | null) {
  // "Other" catches everything that is NOT Grapes, Regions, or Producers
  const otherExclusions = '&& !(subcategory in ["Grapes", "Regions", "Producers"])';

  let filter = '';

  if (tag) {
    // Tag filter — search the tags array for a case-insensitive match
    filter = `*[_type == "article" && category == "wine" && "somm" in sites && "${tag}" in tags] | order(publishedAt desc)`;
  } else if (subcategory === 'other') {
    filter = `*[_type == "article" && category == "wine" && "somm" in sites ${otherExclusions}] | order(publishedAt desc)`;
  } else if (subcategory) {
    filter = `*[_type == "article" && category == "wine" && "somm" in sites && lower(subcategory) == lower("${subcategory}")] | order(publishedAt desc)`;
  } else {
    filter = `*[_type == "article" && category == "wine" && "somm" in sites] | order(publishedAt desc)`;
  }

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

  return await client.fetch(query, {}, { cache: 'no-store' });
}

export default async function ArticlesPage({ searchParams }: { searchParams: any }) {
  const params = await searchParams;
  const subcategoryFilter = params?.subcategory || null;
  const tagFilter = params?.tag || null;

  const articles = await getArticles(subcategoryFilter, tagFilter);

  // Determine the subtitle based on active filter
  let subtitle = 'All Articles';
  if (tagFilter) {
    subtitle = tagFilter.charAt(0).toUpperCase() + tagFilter.slice(1);
  } else if (subcategoryFilter) {
    subtitle = subcategoryFilter === 'other'
      ? 'Other Articles'
      : subcategoryFilter.charAt(0).toUpperCase() + subcategoryFilter.slice(1);
  }

  // Pill definitions
  const pills = [
    { label: 'All', href: '/articles', value: null },
    { label: 'Grapes', href: '/articles?subcategory=grapes', value: 'grapes' },
    { label: 'Regions', href: '/articles?subcategory=regions', value: 'regions' },
    { label: 'Producers', href: '/articles?subcategory=producers', value: 'producers' },
    { label: 'Other', href: '/articles?subcategory=other', value: 'other' },
  ];

  // Determine which pill is active
  // If a tag filter is active, no pill is highlighted (tag overrides pills)
  const activePill = tagFilter ? '__none__' : (subcategoryFilter || null);

  return (
    <>
      <Header />
      <div className={styles.container}>
        <div className={styles.content}>

          {/* PAGE TITLE — Always "Article Collection" */}
          <h1 className={styles.heading}>Article Collection</h1>

          {/* SUBTITLE — Dynamic based on filter */}
          <p className={styles.subtitle}>{subtitle}</p>

          {/* PILL SELECTORS — Subcategory filters */}
          <div className={styles.pillRow}>
            {pills.map((pill) => (
              <Link
                key={pill.label}
                href={pill.href}
                className={
                  activePill === pill.value
                    ? `${styles.pill} ${styles.pillActive}`
                    : styles.pill
                }
              >
                {pill.label}
              </Link>
            ))}
          </div>

          {/* TAG CLEAR — Shows only when filtering by tag */}
          {tagFilter && (
            <div className={styles.tagFilterInfo}>
              <p className={styles.resultCount}>
                {articles.length} {articles.length === 1 ? 'article' : 'articles'} tagged "{tagFilter}"
              </p>
              <Link href="/articles" className={styles.clearFilter}>
                Clear Filter
              </Link>
            </div>
          )}

          {/* ARTICLES GRID */}
          {articles.length > 0 ? (
            <div className={styles.articleGrid}>
              {articles.map((article: any) => (
                <ArticleCard key={article._id} article={article} />
              ))}
            </div>
          ) : (
            <p className={styles.noResults}>
              No articles found{tagFilter && ` tagged "${tagFilter}"`}
              {subcategoryFilter && !tagFilter && ` in ${subtitle}`}
            </p>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}