// components/ImageLightbox.js
// Inline image that opens full screen on click or tap. In the full-screen view,
// tapping the image toggles between "fit to screen" and "full size" (scroll to
// pan) so infographics stay readable on phones. Used by study guides and lessons.

'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import styles from './ImageLightbox.module.css'

export default function ImageLightbox({ src, alt, caption }) {
  const [isOpen, setIsOpen] = useState(false)
  const [isZoomed, setIsZoomed] = useState(false)

  const openLightbox = () => setIsOpen(true)
  const closeLightbox = useCallback(() => {
    setIsOpen(false)
    setIsZoomed(false)
  }, [])
  const toggleZoom = () => setIsZoomed((zoomed) => !zoomed)

  // Enter or Space opens the lightbox for keyboard users
  const handleWrapperKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      openLightbox()
    }
  }

  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') closeLightbox()
    }

    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [isOpen, closeLightbox])

  return (
    <>
      <div className={styles.imageWrapper} onClick={openLightbox} onKeyDown={handleWrapperKeyDown} role="button" tabIndex={0} aria-label={`Expand image: ${alt}`}>
        <Image
          src={src}
          alt={alt || ''}
          width={896}
          height={500}
          className={styles.bodyImage}
          style={{ width: '100%', height: 'auto' }}
        />
        {caption && (
          <span className={styles.imageCaption}>{caption}</span>
        )}
        <div className={styles.expandHint} aria-hidden="true">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 3 21 3 21 9" />
            <polyline points="9 21 3 21 3 15" />
            <line x1="21" y1="3" x2="14" y2="10" />
            <line x1="3" y1="21" x2="10" y2="14" />
          </svg>
        </div>
      </div>

      {isOpen && (
        <div className={isZoomed ? `${styles.overlay} ${styles.overlayZoomed}` : styles.overlay} onClick={closeLightbox}>
          <button
            className={styles.closeButton}
            onClick={closeLightbox}
            aria-label="Close expanded image"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
          <div className={styles.lightboxContent} onClick={(e) => e.stopPropagation()}>
            <img
              src={src}
              alt={alt || ''}
              className={styles.lightboxImage}
              onClick={toggleZoom}
            />
            {caption && (
              <span className={styles.imageCaption}>{caption}</span>
            )}
          </div>
          <span className={styles.zoomHint} aria-hidden="true">
            {isZoomed ? 'Tap image to fit screen' : 'Tap image to zoom'}
          </span>
        </div>
      )}
    </>
  )
}