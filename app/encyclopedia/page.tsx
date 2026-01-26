import Link from 'next/link'
import Header from '../../components/layout/Header'
import Footer from '../../components/layout/Footer'
import styles from './encyclopedia.module.css'

// Import all letter data to get first/last terms
import A from '../../data/encyclopedia/A.json'
import B from '../../data/encyclopedia/B.json'
import C from '../../data/encyclopedia/C.json'
import D from '../../data/encyclopedia/D.json'
import E from '../../data/encyclopedia/E.json'
import F from '../../data/encyclopedia/F.json'
import G from '../../data/encyclopedia/G.json'
import H from '../../data/encyclopedia/H.json'
import I from '../../data/encyclopedia/I.json'
import J from '../../data/encyclopedia/J.json'
import K from '../../data/encyclopedia/K.json'
import L from '../../data/encyclopedia/L.json'
import M from '../../data/encyclopedia/M.json'
import N from '../../data/encyclopedia/N.json'
import O from '../../data/encyclopedia/O.json'
import P from '../../data/encyclopedia/P.json'
import Q from '../../data/encyclopedia/Q.json'
import R from '../../data/encyclopedia/R.json'
import S from '../../data/encyclopedia/S.json'
import T from '../../data/encyclopedia/T.json'
import U from '../../data/encyclopedia/U.json'
import V from '../../data/encyclopedia/V.json'
import W from '../../data/encyclopedia/W.json'
import X from '../../data/encyclopedia/X.json'
import Y from '../../data/encyclopedia/Y.json'
import Z from '../../data/encyclopedia/Z.json'

export const metadata = {
  title: 'Wine Encyclopedia | Somm.Site',
  description: 'A comprehensive encyclopedia of wine and beverage terminology. Explore definitions for grape varieties, wine regions, tasting terms, and more.',
  alternates: {
    canonical: 'https://somm.site/encyclopedia'
  }
}

const letterData: { [key: string]: { term: string; definition: string }[] } = {
  A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, U, V, W, X, Y, Z
}

export default function EncyclopediaPage() {
  const letters = Object.keys(letterData)

  return (
    <>
      <Header />
      <div className={styles.container}>
        <div className={styles.content}>
          <h1 className={styles.heading}>Encyclopedia</h1>
          <p className={styles.subheading}>
            Enjoy this collection of encyclopedia-style entries covering the world of beverages.
          </p>

          <div className={styles.letterGrid}>
            {letters.map((letter) => {
              const terms = letterData[letter]
              const firstTerm = terms[0]?.term || ''
              const lastTerm = terms[terms.length - 1]?.term || ''

              return (
                <Link 
                  key={letter} 
                  href={`/encyclopedia/${letter.toLowerCase()}`}
                  className={styles.letterCard}
                >
                  <span className={styles.letter}>{letter}</span>
                  <div className={styles.termRange}>
                    <span className={styles.termFirst}>{firstTerm}</span>
                    <span className={styles.termLast}>{lastTerm}</span>
                  </div>
                  <span className={styles.arrow}>→</span>
                </Link>
              )
            })}
          </div>

          <div className={styles.navSection}>
            <Link href="/" className={styles.navButton}>
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}