import Link from 'next/link'
import { notFound } from 'next/navigation'
import Header from '../../../components/layout/Header'
import Footer from '../../../components/layout/Footer'
import styles from './letter.module.css'

import A from '../../../data/encyclopedia/A.json'
import B from '../../../data/encyclopedia/B.json'
import C from '../../../data/encyclopedia/C.json'
import D from '../../../data/encyclopedia/D.json'
import E from '../../../data/encyclopedia/E.json'
import F from '../../../data/encyclopedia/F.json'
import G from '../../../data/encyclopedia/G.json'
import H from '../../../data/encyclopedia/H.json'
import I from '../../../data/encyclopedia/I.json'
import J from '../../../data/encyclopedia/J.json'
import K from '../../../data/encyclopedia/K.json'
import L from '../../../data/encyclopedia/L.json'
import M from '../../../data/encyclopedia/M.json'
import N from '../../../data/encyclopedia/N.json'
import O from '../../../data/encyclopedia/O.json'
import P from '../../../data/encyclopedia/P.json'
import Q from '../../../data/encyclopedia/Q.json'
import R from '../../../data/encyclopedia/R.json'
import S from '../../../data/encyclopedia/S.json'
import T from '../../../data/encyclopedia/T.json'
import U from '../../../data/encyclopedia/U.json'
import V from '../../../data/encyclopedia/V.json'
import W from '../../../data/encyclopedia/W.json'
import X from '../../../data/encyclopedia/X.json'
import Y from '../../../data/encyclopedia/Y.json'
import Z from '../../../data/encyclopedia/Z.json'

const letterData: { [key: string]: { term: string; definition: string }[] } = {
  a: A, b: B, c: C, d: D, e: E, f: F, g: G, h: H, i: I, j: J, k: K, l: L, m: M,
  n: N, o: O, p: P, q: Q, r: R, s: S, t: T, u: U, v: V, w: W, x: X, y: Y, z: Z
}

function generateSlug(term: string): string {
  return term
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export async function generateMetadata({ params }: { params: Promise<{ letter: string }> }) {
  const { letter } = await params
  const upperLetter = letter.toUpperCase()
  
  return {
    title: `${upperLetter} - Wine Encyclopedia | Somm.Site`,
    description: `Browse wine and beverage terms starting with ${upperLetter}. Definitions for grape varieties, regions, and tasting terminology.`,
  }
}

export default async function LetterPage({ params }: { params: Promise<{ letter: string }> }) {
  const { letter } = await params
  const terms = letterData[letter.toLowerCase()]

  if (!terms) {
    notFound()
  }

  return (
    <>
      <Header />
      <div className={styles.container}>
        <div className={styles.content}>
          <h1 className={styles.heading}>{letter.toUpperCase()}</h1>

          <p className={styles.termRange}>
            {terms[0]?.term} to {terms[terms.length - 1]?.term}
          </p>

          <div className={styles.termGrid}>
            {terms.map((item) => (
              <Link
                key={item.term}
                href={`/encyclopedia/${letter.toLowerCase()}/${generateSlug(item.term)}`}
                className={styles.termLink}
              >
                {item.term}
              </Link>
            ))}
          </div>

          <div className={styles.navSection}>
            <Link href="/encyclopedia" className={styles.navButton}>
              ← Back to Encyclopedia
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}