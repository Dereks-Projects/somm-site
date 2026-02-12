'use client'

import { useState } from 'react'
import Link from 'next/link'
import HamburgerMenu from './HamburgerMenu'
import styles from './Header.module.css'

export default function Header() {
  const [isPortfolioOpen, setIsPortfolioOpen] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const togglePortfolio = () => {
    if (isMenuOpen) setIsMenuOpen(false)
    setIsPortfolioOpen(!isPortfolioOpen)
  }

  const toggleMenu = () => {
    if (isPortfolioOpen) setIsPortfolioOpen(false)
    setIsMenuOpen(!isMenuOpen)
  }

  const closeAll = () => {
    setIsMenuOpen(false)
    setIsPortfolioOpen(false)
  }

  return (
    <>
      <header className={styles.header}>
        <button
          className={styles.portfolioButton}
          onClick={togglePortfolio}
          aria-label={isPortfolioOpen ? 'Close portfolio menu' : 'Open portfolio menu'}
          aria-expanded={isPortfolioOpen}
        >
          {isPortfolioOpen ? (
            <svg className={styles.portfolioIcon} width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path d="M18 6L6 18M6 6l12 12" stroke="white" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          ) : (
            <svg className={styles.portfolioIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          )}
        </button>

        <Link href="/" className={styles.logoLink}>
          <h1 className={styles.logo}>Somm.Site</h1>
        </Link>

        <HamburgerMenu
          isOpen={isMenuOpen}
          onToggle={toggleMenu}
          onClose={closeAll}
        />
      </header>

      {/* Overlay — outside header */}
      <div
        className={`${styles.overlay} ${(isMenuOpen || isPortfolioOpen) ? styles.overlayVisible : ''}`}
        onClick={closeAll}
        aria-hidden="true"
      />

      {/* Portfolio panel — outside header, slides from left */}
      <nav
        className={`${styles.portfolioPanel} ${isPortfolioOpen ? styles.portfolioPanelOpen : ''}`}
        aria-hidden={!isPortfolioOpen}
      >
        <div className={styles.portfolioContent}>
          <div className={styles.portfolioLabel}>Our Portfolio</div>
          <div className={styles.portfolioLinks}>
            <a href="https://somm.tips" target="_blank" rel="noopener noreferrer" className={styles.portfolioItem} onClick={closeAll}>
              <div className={styles.portfolioSiteName}>Somm.Tips</div>
              <div className={styles.portfolioSiteDesc}>Wine Pairings & Shopping Insights</div>
            </a>
            <a href="https://beverage.fyi" target="_blank" rel="noopener noreferrer" className={styles.portfolioItem} onClick={closeAll}>
              <div className={styles.portfolioSiteName}>Beverage.fyi</div>
              <div className={styles.portfolioSiteDesc}>Online Magazine</div>
            </a>
            <a href="https://backbar.fyi" target="_blank" rel="noopener noreferrer" className={styles.portfolioItem} onClick={closeAll}>
              <div className={styles.portfolioSiteName}>Backbar.fyi</div>
              <div className={styles.portfolioSiteDesc}>Spirits Education</div>
            </a>
            <a href="https://hospitality.fyi" target="_blank" rel="noopener noreferrer" className={styles.portfolioItem} onClick={closeAll}>
              <div className={styles.portfolioSiteName}>Hospitality.fyi</div>
              <div className={styles.portfolioSiteDesc}>Hospitality Industry Insights</div>
            </a>
          </div>
          <div className={styles.portfolioDivider}></div>
          <div className={styles.presentedByLabel}>Presented By</div>
          <a href="https://informativemedia.com" target="_blank" rel="noopener noreferrer" className={styles.parentCompanyLink} onClick={closeAll}>
            Informative Media
          </a>
        </div>
      </nav>

      <div className={styles.headerSpacer}></div>
    </>
  )
}