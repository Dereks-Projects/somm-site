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
            <a href="/intro-course">Wine Course</a>
            <a href="/about">About</a>
          </div>
          <div className={styles.linksColumn}>
            <a href="/terms">Terms of Use</a>
            <a href="/privacy">Privacy Policy</a>
            <a href="/cookies">Cookie Notice</a>
          </div>
        </div>

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

        <p className={styles.subtitle}>EDUCATIONAL RESOURCES THAT TRANSFORM YOUR KNOWLEDGE</p>
        <h2 className={styles.title}>SOMM.SITE</h2>
        
        <button onClick={scrollToTop} className={styles.backToTop}>
          Back to top ↑
        </button>
      </div>
    </footer>
  );
}