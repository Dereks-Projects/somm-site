'use client'

import { useRef, useState } from 'react';
import Link from 'next/link';
import { urlFor } from '../../sanity/lib/imageUrl';
import styles from './StudyGuideSlider.module.css';

export default function StudyGuideSlider({ guides }) {
  const scrollRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [hasDragged, setHasDragged] = useState(false);

  if (!guides || guides.length === 0) return null;

  // Arrow button scroll
  const scroll = (direction) => {
    if (!scrollRef.current) return;
    const scrollAmount = 324;
    scrollRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  // Mouse drag handlers
  const handleMouseDown = (e) => {
    if (!scrollRef.current) return;
    setIsDragging(true);
    setHasDragged(false);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleMouseMove = (e) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = x - startX;
    if (Math.abs(walk) > 5) {
      setHasDragged(true);
    }
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  // Prevent click navigation if user was dragging
  const handleCardClick = (e) => {
    if (hasDragged) {
      e.preventDefault();
    }
  };

  return (
    <section className={styles.section} aria-label="Regional Reports">
      {/* Section Header */}
      <div className={styles.header}>
        <div className={styles.headerText}>
          <p className={styles.label}>Regional Reports</p>
          <h2 className={styles.heading}>
            Explore the important wine regions from around the globe.
          </h2>
        </div>
        <div className={styles.headerControls}>
          <div className={styles.arrowButtons}>
            <button
              className={styles.arrowButton}
              onClick={() => scroll('left')}
              aria-label="Scroll left"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            <button
              className={styles.arrowButton}
              onClick={() => scroll('right')}
              aria-label="Scroll right"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 6 15 12 9 18" />
              </svg>
            </button>
          </div>
          <Link href="/study-guides" className={styles.browseButtonDesktop}>
            Browse Guides
          </Link>
        </div>
      </div>

      {/* Scrollable Card Row */}
      <div
        className={`${styles.scrollContainer} ${isDragging ? styles.scrollDragging : ''}`}
        ref={scrollRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
      >
        <div className={styles.cardRow}>
          {guides.map((guide) => {
            const imageUrl = guide.mainImage
              ? urlFor(guide.mainImage).width(600).height(338).format('webp').quality(80).url()
              : null;

            return (
              <Link
                key={guide._id}
                href={`/study-guides/${guide.slug.current}`}
                className={styles.card}
                onClick={handleCardClick}
                draggable={false}
              >
                {/* Card Image */}
                <div className={styles.cardImageWrapper}>
                  {imageUrl ? (
                    <img
                      src={imageUrl}
                      alt={guide.mainImage?.alt || guide.title}
                      className={styles.cardImage}
                      loading="lazy"
                      width={600}
                      height={338}
                      draggable={false}
                    />
                  ) : (
                    <div className={styles.cardImagePlaceholder} />
                  )}
                </div>

                {/* Card Content */}
                <div className={styles.cardContent}>
                  <h3 className={styles.cardTitle}>{guide.title}</h3>
                  {guide.subtitle && (
                    <p className={styles.cardSubtitle}>{guide.subtitle}</p>
                  )}
                  <span className={styles.cardLink}>Read Guide</span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Browse Button - Mobile Only (below cards) */}
      <div className={styles.browseButtonMobileWrapper}>
        <Link href="/study-guides" className={styles.browseButtonMobile}>
          Browse Guides
        </Link>
      </div>
    </section>
  );
}