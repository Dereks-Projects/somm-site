/**
 * HamburgerMenu Component
 * Slide-in navigation menu for mobile and desktop
 * Includes main nav, social links, legal links, and partner sites
 */

'use client';

import { useState } from 'react';
import Link from 'next/link';
import styles from './HamburgerMenu.module.css';

export default function HamburgerMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* Hamburger Button */}
      <button 
        className={styles.hamburgerButton} 
        onClick={toggleMenu}
        aria-label="Toggle menu"
      >
        <div className={`${styles.iconCircle} ${isOpen ? styles.iconOpen : ''}`}>
          {isOpen ? (
            // X icon when open
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M18 6L6 18M6 6l12 12" stroke="white" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          ) : (
            // Hamburger icon when closed
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M4 6h16M4 12h16M4 18h16" stroke="white" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          )}
        </div>
      </button>

      {/* Overlay - click to close */}
      {isOpen && (
        <div 
          className={styles.overlay} 
          onClick={closeMenu}
        />
      )}

      {/* Slide-in Menu Panel */}
      <div className={`${styles.menuPanel} ${isOpen ? styles.menuOpen : ''}`}>
        {/* Main Navigation Links */}
        <nav className={styles.mainNav}>
          <Link href="/" className={styles.mainLink} onClick={closeMenu}>
            Home
          </Link>
          <Link href="/articles" className={styles.mainLink} onClick={closeMenu}>
            Wine Articles
          </Link>
          <Link href="/intro-course" className={styles.mainLink} onClick={closeMenu}>
            Introductory Course
          </Link>
          <Link href="/about" className={styles.mainLink} onClick={closeMenu}>
            About Us
          </Link>
        </nav>

        {/* Social Links */}
        <div className={styles.socialLinks}>
          <a 
            href="https://www.instagram.com/somm.site/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className={styles.socialLink}
          >
            Instagram
          </a>
          <a 
            href="http://tiktok.com/@somm.site" 
            target="_blank" 
            rel="noopener noreferrer" 
            className={styles.socialLink}
          >
            Tiktok
          </a>
          <a 
            href="https://www.linkedin.com/company/somm-site/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className={styles.socialLink}
          >
            LinkedIn
          </a>
        </div>

        {/* Legal Links */}
        <div className={styles.legalLinks}>
          <Link href="/cookies" className={styles.legalLink} onClick={closeMenu}>
            Cookie Policy
          </Link>
          <Link href="/terms" className={styles.legalLink} onClick={closeMenu}>
            Terms of Use
          </Link>
          <Link href="/privacy" className={styles.legalLink} onClick={closeMenu}>
            Privacy Policy
          </Link>
          <Link href="/disclaimer" className={styles.legalLink} onClick={closeMenu}>
            Content Disclaimer
          </Link>
        </div>

        {/* Yellow Divider */}
        <div className={styles.divider}></div>

        {/* Partner Sites */}
        <div className={styles.partnerSection}>
          <h3 className={styles.partnerHeading}>Partner Sites</h3>
          <a 
            href="https://somm.tips" 
            target="_blank" 
            rel="noopener noreferrer" 
            className={styles.partnerLink}
          >
            somm.tips
          </a>
          <a 
            href="https://beverage.fyi" 
            target="_blank" 
            rel="noopener noreferrer" 
            className={styles.partnerLink}
          >
            beverage.fyi
          </a>
          <a 
            href="https://backbar.fyi" 
            target="_blank" 
            rel="noopener noreferrer" 
            className={styles.partnerLink}
          >
            backbar.fyi
          </a>
          <a 
            href="https://hospitality.fyi" 
            target="_blank" 
            rel="noopener noreferrer" 
            className={styles.partnerLink}
          >
            hospitality.fyi
          </a>
        </div>
      </div>
    </>
  );
}