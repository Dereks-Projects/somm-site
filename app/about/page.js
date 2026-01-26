import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import booksData from '../../data/resourcesData.json';
import styles from './page.module.css';


export const metadata = {
  title: "About Us",
  description: "Learn about Somm.Site's mission to democratize wine and hospitality education. Founded by Derek Engles, bringing 20+ years of luxury hospitality experience to free online education.",
  openGraph: {
    title: "About Somm.Site - Wine Education Platform",
    description: "Democratizing wine and hospitality education for professionals worldwide"
  }
};

export default function About() {
  return (
    <div>
      <Header />
      
      <main className={styles.aboutMain}>
        {/* Hero Section */}
        <section className={styles.hero}>
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>About Somm.Site</h1>
            <p className={styles.heroSubtitle}>
              Democratizing wine and hospitality education for professionals and enthusiasts worldwide.
            </p>
          </div>
        </section>

        {/* Mission Section */}
        <section className={styles.missionSection}>
          <div className={styles.container}>
            <h2 className={styles.sectionTitle}>Our Mission</h2>
            <p className={styles.missionText}>
              Somm.Site exists to make professional wine and hospitality knowledge accessible to everyone. Whether you're just beginning your journey into the world of wine or you're a seasoned hospitality professional looking to refine your expertise, our free courses and curated resources provide the foundation you need to succeed.
            </p>
            <p className={styles.missionText}>
              We believe that exceptional service and deep beverage knowledge shouldn't be locked behind expensive certifications or exclusive institutions. By offering comprehensive, free education alongside our ecosystem of professional tools, we're leveling the playing field for aspiring sommeliers, servers, bartenders, and wine enthusiasts around the globe.
            </p>
          </div>
        </section>

        {/* Bookstore Section */}
        <section className={styles.bookstoreSection}>
          <div className={styles.container}>
            <h2 className={styles.sectionTitle}>Amazon Kindle Bookshelf</h2>
            <div className={styles.booksGrid}>
              {booksData.books.map((book) => (
                <a 
                  key={book.id} 
                  href={book.link} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className={styles.bookCard}
                >
                  <div className={styles.bookImageContainer}>
                    <img 
                      src={book.image} 
                      alt={book.altImage}
                      className={styles.bookImage}
                    />
                  </div>
                  <div className={styles.bookContent}>
                    <h3 className={styles.bookTitle}>{book.title}</h3>
                    <p className={styles.bookSubtitle}>{book.subtitle}</p>
                    <p className={styles.bookLink}>Buy on Amazon</p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Founder Section */}
        <section className={styles.founderSection}>
          <div className={styles.container}>
            <h3 className={styles.founderTitle}>Built by Derek Engles</h3>
            <p className={styles.founderText}>
              Derek Engles is a hospitality professional with over 20 years of experience as a sommelier and wine director at luxury properties including Wynn Resort and MGM Grand. After serving 200,000+ guests, he taught himself full-stack development to build this free education platform and democratize hospitality knowledge for professionals worldwide.
            </p>
          </div>
        </section>

        {/* CTA Section */}
        <section className={styles.ctaSection}>
          <div className={styles.container}>
            <h2 className={styles.ctaTitle}>Let's Collaborate</h2>
            <p className={styles.ctaText}>
              Interested in partnering, licensing our tools, or discussing hospitality education? Let's connect.
            </p>
            <a href="mailto:derekengles@gmail.com" className={styles.ctaButton}>
              Get in Touch
            </a>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}