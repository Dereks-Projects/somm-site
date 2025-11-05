import Header from '../../components/Header';
import Footer from '../../components/Footer';
import styles from './page.module.css';

export const metadata = {
  title: "About Us",
  description: "Learn about SOMM.SITE's mission to democratize wine and hospitality education. Founded by Derek Engles, bringing 20+ years of luxury hospitality experience to free online education.",
  openGraph: {
    title: "About SOMM.SITE - Wine Education Platform",
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
            <h1 className={styles.heroTitle}>About SOMM.SITE</h1>
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
              SOMM.SITE exists to make professional wine and hospitality knowledge accessible to everyone. Whether you're just beginning your journey into the world of wine or you're a seasoned hospitality professional looking to refine your expertise, our free courses and curated resources provide the foundation you need to succeed.
            </p>
            <p className={styles.missionText}>
              We believe that exceptional service and deep beverage knowledge shouldn't be locked behind expensive certifications or exclusive institutions. By offering comprehensive, free education alongside our ecosystem of professional tools, we're leveling the playing field for aspiring sommeliers, servers, bartenders, and wine enthusiasts around the globe.
            </p>
          </div>
        </section>

        {/* Ecosystem Section */}
        <section className={styles.ecosystemSection}>
          <div className={styles.container}>
            <h2 className={styles.sectionTitle}>Our Ecosystem</h2>
            <p className={styles.ecosystemIntro}>
              SOMM.SITE is part of a comprehensive suite of tools designed to support your hospitality education journey:
            </p>
            
            <div className={styles.ecosystemGrid}>
              <div className={styles.ecoCard}>
                <h3 className={styles.ecoTitle}>Beverage.fyi</h3>
                <p className={styles.ecoDescription}>
                  Your comprehensive beverage knowledge platform. From insightful articles to wine pairings and cocktail suggestions, Beverage.fyi covers everything you need to master the beverage side of hospitality.
                </p>
                <a href="https://beverage.fyi" target="_blank" rel="noopener noreferrer" className={styles.ecoLink}>
                  Visit Beverage.fyi →
                </a>
              </div>

              <div className={styles.ecoCard}>
                <h3 className={styles.ecoTitle}>Restaurant Standards</h3>
                <p className={styles.ecoDescription}>
                  High-performance training built for Michelin, AAA, and Forbes 5-Star achievement. Reverse-engineer world-class hospitality standards and bring them to your team.
                </p>
                <a href="https://restaurantstandards.com" target="_blank" rel="noopener noreferrer" className={styles.ecoLink}>
                  Visit RestaurantStandards.com →
                </a>
              </div>

              <div className={styles.ecoCard}>
                <h3 className={styles.ecoTitle}>Somm.Tips</h3>
                <p className={styles.ecoDescription}>
                  Your personal wine and cocktail recommendation engine. Get expert pairing suggestions, discover new favorites, and elevate your beverage knowledge with intelligent recommendations tailored to your taste.
                </p>
                <a href="https://www.somm.tips" target="_blank" rel="noopener noreferrer" className={styles.ecoLink}>
                  Visit Somm.Tips →
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Founder Section */}
        <section className={styles.founderSection}>
          <div className={styles.container}>
            <h2 className={styles.sectionTitle}>The Founder</h2>
            <div className={styles.founderContent}>
              <div className={styles.founderBio}>
                <p className={styles.bioText}>
                  <strong>Derek Engles</strong> is a hospitality professional with over 20 years of experience in luxury hotels, including the Wynn Resort and MGM Resorts International. As a sommelier and wine director, he's served more than 200,000 guests and trained countless team members in the art of exceptional service.
                </p>
                <p className={styles.bioText}>
                  After two decades in the industry, Derek recognized that the knowledge gatekept by expensive certifications and exclusive programs should be accessible to everyone. He taught himself full-stack development and built SOMM.SITE and its entire ecosystem from scratch using modern web technologies: React, Next.js, CSS Modules, and JavaScript.
                </p>
                <p className={styles.bioText}>
                  Derek holds business education credentials from Harvard Business School and Northwestern University, and is currently pursuing IBM's Full-Stack Developer certification while supplementing with Harvard's CS50 course. He's the author of "The Beverage Compass," "Restaurant Standards," and "Wine Fundamentals."
                </p>
                <p className={styles.bioText}>
                  His mission is simple: democratize hospitality excellence by making world-class training accessible to anyone with the drive to learn.
                </p>
                <a href="https://derekengles.com" target="_blank" rel="noopener noreferrer" className={styles.founderLink}>
                  Visit DerekEngles.com →
                </a>
              </div>
            </div>
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