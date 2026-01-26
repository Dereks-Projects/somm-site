import Link from 'next/link';
import HamburgerMenu from './HamburgerMenu';
import styles from './Header.module.css';

export default function Header() {
  return (
    <>
      <header className={styles.header}>
        <Link href="/" className={styles.logoLink}>
          <h1 className={styles.logo}>Somm.Site</h1>
        </Link>
        <HamburgerMenu />
      </header>
      <div className={styles.headerSpacer}></div>
    </>
  );
}