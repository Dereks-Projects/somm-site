// components/homepage/BackToTopButton.js
// Purpose: End-of-homepage "Back to Top" button, matching the "Load More
// Articles" button styling, with a smooth scroll to the top. Client component
// because it needs a click handler.

'use client';

import styles from './BackToTopButton.module.css';

export default function BackToTopButton() {
  const toTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className={styles.wrap}>
      <button type="button" className={styles.button} onClick={toTop}>
        Back to Top
      </button>
    </div>
  );
}