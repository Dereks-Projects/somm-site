import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import styles from './not-found.module.css'

export const metadata = {
  title: '404 - Page Not Found',
  description: 'The page you are looking for does not exist.',
}

export default function NotFound() {
  return (
    <>
      <Header />
      <div className={styles.container}>
        <h1 className={styles.heading}>404</h1>
        <p className={styles.message}>This page doesn't exist.</p>
        <a href="/" className={styles.button}>← Back to Home</a>
      </div>
      <Footer />
    </>
  )
}