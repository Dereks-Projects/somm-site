import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import styles from './page.module.css';

export const metadata = {
  title: "About Us",
  description: "Learn about Somm.Site, our mission to democratize wine education, and the company behind the platform.",
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
            <h1 className={styles.heroTitle}>About Us</h1>
            <p className={styles.heroSubtitle}>
              Somm.Site is a digital wine education platform built for aspiring sommeliers, 
              hospitality professionals, and curious enthusiasts — offering free courses, quizzes, 
              and in-depth articles to help you build real knowledge. No memberships. No paywalls.
            </p>
          </div>
        </section>

        {/* Our Mission Section */}
        <section className={styles.missionSection}>
          <div className={styles.container}>
            <h2 className={styles.sectionTitle}>Our Mission</h2>
            <p className={styles.missionText}>
              Great wine education shouldn't be locked behind expensive certifications or 
              scattered across countless sources that demand your email before offering a single 
              insight. Somm.Site exists to{' '}
              <span className={styles.highlight}>democratize wine knowledge</span> — presenting 
              grape varieties, regional traditions, and tasting methodology with clarity and depth 
              for hospitality professionals and enthusiasts alike. From the limestone soils of 
              Burgundy to the volcanic slopes of Mount Etna, from blind tasting technique to 
              tableside service — we bring you the education that builds real careers, no strings 
              attached.
            </p>
          </div>
        </section>

        {/* About Informative Media Section */}
        <section className={styles.companySection}>
          <div className={styles.container}>
            <h2 className={styles.sectionTitle}>About Informative Media</h2>
            <p className={styles.companyText}>
              Somm.Site is part of Informative Media, a hospitality education company operating a 
              portfolio of digital platforms dedicated to beverage knowledge and service excellence. 
              From wine and spirits to fine dining standards, our platforms serve professionals and 
              enthusiasts who believe that quality education should be accessible to everyone. 
              We combine over two decades of luxury hospitality experience with modern technology 
              to create content that makes a real impact.
            </p>
            <a
              href="https://informativemedia.com"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.companyLink}
            >
              Learn more about Informative Media →
            </a>
          </div>
        </section>

        {/* Let's Collaborate Section */}
        <section className={styles.ctaSection}>
          <div className={styles.ctaContainer}>
            <h2 className={styles.ctaTitle}>Let&#39;s Collaborate</h2>
            <p className={styles.ctaText}>
              Whether you're a wine brand looking to reach an engaged audience, a hospitality 
              group seeking to elevate your team's knowledge, or an organization that wants to 
              put quality education in front of future industry leaders — we'd love to hear from you.
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