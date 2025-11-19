'use client';

import { useState } from 'react';
import ArticleCard from './ArticleCard';
import styles from './InfiniteArticleList.module.css';

export default function InfiniteArticleList({ articles }) {
  const [visibleCount, setVisibleCount] = useState(9);
  
  if (!articles || articles.length === 0) return null;

  const visibleArticles = articles.slice(0, visibleCount);
  const hasMore = visibleCount < articles.length;

  const loadMore = () => {
    setVisibleCount(prev => prev + 9);
  };

  return (
    <section className={styles.container}>
      {/* "MORE STORIES" heading */}
      <h2 className={styles.heading}>MORE STORIES</h2>

      {/* Grid of article cards */}
      <div className={styles.articleGrid}>
        {visibleArticles.map((article) => (
          <ArticleCard key={article._id} article={article} />
        ))}
      </div>

      {/* Load More Button */}
      {hasMore && (
        <button onClick={loadMore} className={styles.loadMoreButton}>
          Load More Stories
        </button>
      )}
    </section>
  );
}