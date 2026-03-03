'use client'

import { useState, useRef, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import styles from './EncyclopediaSearch.module.css'

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

const allTerms = [
  ...A, ...B, ...C, ...D, ...E, ...F, ...G, ...H, ...I,
  ...J, ...K, ...L, ...M, ...N, ...O, ...P, ...Q, ...R,
  ...S, ...T, ...U, ...V, ...W, ...X, ...Y, ...Z
]

function generateSlug(term) {
  return term
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function getTermUrl(term) {
  const letter = term.charAt(0).toLowerCase()
  const slug = generateSlug(term)
  return `/encyclopedia/${letter}/${slug}`
}

export default function EncyclopediaSearch({ onNavigate, menuOpen }) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [isOpen, setIsOpen] = useState(false)
  const wrapperRef = useRef(null)
  const pathname = usePathname()

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Clear search when navigating to a new page
  useEffect(() => {
    setQuery('')
    setResults([])
    setIsOpen(false)
  }, [pathname])

  // Clear search when hamburger menu closes
  useEffect(() => {
    if (menuOpen === false) {
      setQuery('')
      setResults([])
      setIsOpen(false)
    }
  }, [menuOpen])

  function handleChange(e) {
    const value = e.target.value
    setQuery(value)

    if (value.trim().length < 2) {
      setResults([])
      setIsOpen(false)
      return
    }

    const filtered = allTerms
      .filter((item) => item.term.toLowerCase().startsWith(value.toLowerCase()))
      .slice(0, 8)

    setResults(filtered)
    setIsOpen(filtered.length > 0)
  }

  function handleSelect() {
    setQuery('')
    setResults([])
    setIsOpen(false)
    if (onNavigate) onNavigate()
  }

  return (
    <div className={styles.wrapper} ref={wrapperRef}>
      <input
        type="text"
        value={query}
        onChange={handleChange}
        onFocus={() => { if (results.length > 0) setIsOpen(true) }}
        placeholder="Search encyclopedia..."
        className={styles.input}
        autoComplete="off"
      />
      {isOpen && (
        <div className={styles.dropdown}>
          {results.map((item) => (
            <Link
              key={item.term}
              href={getTermUrl(item.term)}
              className={styles.result}
              onClick={handleSelect}
            >
              {item.term}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}