'use client';

import styles from './Footer.module.css';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.content}>
        
        <div className={styles.linksSection}>
          <div className={styles.linksColumn}>
            <a href="/">Home</a>
            <a href="/articles">Wine Articles</a>
            <a href="/intro-course">Introductory Course</a>
            <a href="/about">About Us</a>
          </div>
          <div className={styles.linksColumn}>
            <a href="/terms">Terms of Use</a>
            <a href="/privacy">Privacy Policy</a>
            <a href="/cookies">Cookie Notice</a>
            <a href="/disclaimer">Content Disclaimer</a>
          </div>
        </div>

        <p className={styles.encyclopediaLink}>
          <a href="/encyclopedia">Visit our new <span className={styles.underline}>Encyclopedia</span> here.</a>
        </p>

        <div className={styles.socialIcons}>
          <a href="https://www.instagram.com/somm.site/" target="_blank" rel="noopener noreferrer">
            <img src="/images/icons/ig-icon.svg" alt="Instagram" className={styles.icon} />
          </a>
          <a href="https://www.linkedin.com/company/somm-site/" target="_blank" rel="noopener noreferrer">
            <img src="/images/icons/li-icon.svg" alt="LinkedIn" className={styles.icon} />
          </a>
          <a href="http://tiktok.com/@somm.site" target="_blank" rel="noopener noreferrer">
            <img src="/images/icons/tt-icon.svg" alt="TikTok" className={styles.icon} />
          </a>
        </div>

        
        <h2 className={styles.title}>Somm.Site</h2>
        <p className={styles.copyright}>Copyright 2025 • SOMMSITE • All Rights Reserved</p>
        
        <button onClick={scrollToTop} className={styles.backToTop}>
          Back to top ↑
        </button>
      </div>
    </footer>
  );
}