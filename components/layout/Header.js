'use client'

import { useState } from 'react'
import Link from 'next/link'
import HamburgerMenu from './HamburgerMenu'
import styles from './Header.module.css'

export default function Header() {
  const [isPortfolioOpen, setIsPortfolioOpen] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  // Toggle portfolio panel (closes menu if open)
  const togglePortfolio = () => {
    if (isMenuOpen) setIsMenuOpen(false)
    setIsPortfolioOpen(!isPortfolioOpen)
  }

  // Toggle nav menu (closes portfolio if open)
  const toggleMenu = () => {
    if (isPortfolioOpen) setIsPortfolioOpen(false)
    setIsMenuOpen(!isMenuOpen)
  }

  // Close everything (used by overlay click and nav links)
  const closeAll = () => {
    setIsMenuOpen(false)
    setIsPortfolioOpen(false)
  }

  return (
    <>
      <header className={styles.header}>

        {/* Down-arrow / chevron button — LEFT SIDE */}
        <button
          className={styles.portfolioButton}
          onClick={togglePortfolio}
          aria-label={isPortfolioOpen ? 'Close portfolio menu' : 'Open portfolio menu'}
          aria-expanded={isPortfolioOpen}
        >
          {isPortfolioOpen ? (
            <svg
              className={styles.portfolioIcon}
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path d="M18 6L6 18M6 6l12 12" stroke="white" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          ) : (
            <svg
              className={styles.portfolioIcon}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          )}
        </button>

        {/* Centered logo */}
        <Link href="/" className={styles.logoLink}>
          <h1 className={styles.logo}>Somm.Site</h1>
        </Link>

        {/* Hamburger button — RIGHT SIDE (rendered by HamburgerMenu) */}
        <HamburgerMenu
          isOpen={isMenuOpen}
          onToggle={toggleMenu}
          onClose={closeAll}
        />
      </header>

      {/* Dark overlay — covers page when EITHER panel is open */}
      <div
        className={`${styles.overlay} ${(isMenuOpen || isPortfolioOpen) ? styles.overlayVisible : ''}`}
        onClick={closeAll}
        aria-hidden="true"
      />

      {/* Portfolio panel — slides from LEFT */}
      <nav
        className={`${styles.portfolioPanel} ${isPortfolioOpen ? styles.portfolioPanelOpen : ''}`}
        aria-hidden={!isPortfolioOpen}
      >
        <div className={styles.portfolioContent}>
          <div className={styles.portfolioLabel}>Our Portfolio</div>

          <div className={styles.portfolioLinks}>
            <a
              href="https://somm.tips"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.portfolioItem}
              onClick={closeAll}
            >
              <div className={styles.portfolioSiteName}>Somm.Tips</div>
              <div className={styles.portfolioSiteDesc}>Wine Pairings & Shopping Insights</div>
            </a>

            <a
              href="https://beverage.fyi"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.portfolioItem}
              onClick={closeAll}
            >
              <div className={styles.portfolioSiteName}>Beverage.fyi</div>
              <div className={styles.portfolioSiteDesc}>Online Magazine</div>
            </a>

            <a
              href="https://backbar.fyi"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.portfolioItem}
              onClick={closeAll}
            >
              <div className={styles.portfolioSiteName}>Backbar.fyi</div>
              <div className={styles.portfolioSiteDesc}>Spirits Journal</div>
            </a>

            <a
              href="https://hospitality.fyi"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.portfolioItem}
              onClick={closeAll}
            >
              <div className={styles.portfolioSiteName}>Hospitality.fyi</div>
              <div className={styles.portfolioSiteDesc}>Industry Insights</div>
            </a>
          </div>

          {/* Divider */}
          <div className={styles.portfolioDivider}></div>

          {/* Parent company */}
          <div className={styles.presentedByLabel}>Presented By</div>
          <a
            href="https://informativemedia.com"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.parentCompanyLink}
            onClick={closeAll}
          >
            Informative Media
          </a>
        </div>
      </nav>

      <div className={styles.headerSpacer}></div>
    </>
  )
}