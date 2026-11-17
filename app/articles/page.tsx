// app/articles/page.tsx

import { client } from '../../sanity/lib/client';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import ArticleCard from '../../components/homepage/ArticleCard';
import Link from 'next/link';
import styles from './articles.module.css';

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

// A query value can arrive as a list (?tag=a&tag=b); use the first one.
function firstValue(value: string | string[] | undefined): string | null {
  const first = Array.isArray(value) ? value[0] : value;
  return first ? first : null;
}

export async function generateMetadata({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  const isFiltered = Boolean(firstValue(params?.tag) || firstValue(params?.subcategory));

  return {
    title: "Wine Articles & Education",
    description: "Comprehensive wine education articles covering grape varieties, wine regions, producers, and tasting techniques. Free professional wine knowledge for sommeliers and enthusiasts.",
    // Filtered views (?tag= and ?subcategory=) stay out of Google, but Google
    // still follows their links to the articles. Only /articles is indexed.
    ...(isFiltered
      ? { robots: { index: false, follow: true } }
      : { alternates: { canonical: '/articles' } }),
    openGraph: {
      title: "Wine Articles & Education - Somm.Site",
      description: "Professional wine articles and educational resources",
      url: '/articles'
    }
  };
}

async function getArticles(subcategory: string | null, tag: string | null) {
  // Visitor input is passed as query parameters ($tag, $subcategory), never
  // pasted into the query text, so no value can break or alter the query.
  const base = '_type == "article" && category == "wine" && "somm" in sites';
  let filter = '';
  let queryParams: Record<string, string> = {};

  if (tag) {
    // Tag filter: case-insensitive match against the tags array
    filter = `*[${base} && count(tags[lower(@) == lower($tag)]) > 0] | order(publishedAt desc)`;
    queryParams = { tag };
  } else if (subcategory === 'other') {
    // "Other" catches everything that is NOT Grapes, Regions, or History
    filter = `*[${base} && !(subcategory in ["Grapes", "Regions", "History"])] | order(publishedAt desc)`;
  } else if (subcategory) {
    filter = `*[${base} && lower(subcategory) == lower($subcategory)] | order(publishedAt desc)`;
    queryParams = { subcategory };
  } else {
    filter = `*[${base}] | order(publishedAt desc)`;
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

  return await client.fetch(query, queryParams, { cache: 'no-store' });
}

export default async function ArticlesPage({ searchParams }: { searchParams: any }) {
  const params = await searchParams;
  const subcategoryFilter = firstValue(params?.subcategory);
  const tagFilter = firstValue(params?.tag);

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
    { label: 'History', href: '/articles?subcategory=history', value: 'history' },
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