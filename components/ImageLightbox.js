'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import styles from './ImageLightbox.module.css'

export default function ImageLightbox({ src, alt, caption }) {
  const [isOpen, setIsOpen] = useState(false)

  const openLightbox = () => setIsOpen(true)
  const closeLightbox = useCallback(() => setIsOpen(false), [])

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
      <div className={styles.imageWrapper} onClick={openLightbox} role="button" tabIndex={0} aria-label={`Expand image: ${alt}`}>
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
        <div className={styles.overlay} onClick={closeLightbox}>
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
            />
            {caption && (
              <span className={styles.imageCaption}>{caption}</span>
            )}
          </div>
        </div>
      )}
    </>
  )
}