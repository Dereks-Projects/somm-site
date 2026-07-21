import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import styles from './page.module.css';

export const metadata = {
  title: "About Us",
  description: "Somm.Site is a free wine education platform founded by Derek Engles, a hospitality professional with 20+ years of experience. Part of Informative Media.",
  openGraph: {
    title: "About Somm.Site - Wine Education Platform",
    description: "Founded by Derek Engles. Democratizing wine and hospitality education for professionals worldwide."
  }
};

export default function About() {
  const founderSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Derek Engles",
    "jobTitle": "Founder & CEO",
    "worksFor": {
      "@type": "Organization",
      "name": "Informative Media"
    },
    "alumniOf": [
      {
        "@type": "Organization",
        "name": "Harvard Business School"
      },
      {
        "@type": "Organization",
        "name": "Wynn Las Vegas"
      }
    ],
    "knowsAbout": ["Wine Education", "Sommelier Training", "Hospitality Management", "Beverage Programs"],
    "sameAs": [
      "https://derekengles.com",
      "https://www.linkedin.com/company/somm-site/",
      "https://informativemedia.com",
      "https://somm.site",
      "https://beverage.fyi",
      "https://somm.tips",
      "https://restaurantstandards.com",
      "https://hospitality.fyi"
    ]
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Informative Media",
    "url": "https://informativemedia.com",
    "founder": {
      "@type": "Person",
      "name": "Derek Engles"
    },
    "brand": [
      { "@type": "Brand", "name": "Somm.Site", "url": "https://somm.site" },
      { "@type": "Brand", "name": "Beverage.fyi", "url": "https://beverage.fyi" },
      { "@type": "Brand", "name": "Somm.Tips", "url": "https://somm.tips" },
      { "@type": "Brand", "name": "RestaurantStandards.com", "url": "https://restaurantstandards.com" },
      { "@type": "Brand", "name": "Hospitality.fyi", "url": "https://hospitality.fyi" }
    ]
  };

  return (
    <div>
      <Header />

      {/* Founder Entity Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(founderSchema) }}
      />

      {/* Organization Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />

      <main className={styles.aboutMain}>
        {/* Hero Section */}
        <section className={styles.hero}>
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>About Us</h1>
            <p className={styles.heroSubtitle}>
              Somm.Site is a digital wine education platform built for curious enthusiasts, 
              hospitality professionals, and aspiring sommeliers. We offer free courses, quizzes, 
              and in-depth articles to help you build real knowledge. No memberships required.
            </p>
          </div>
        </section>

        {/* Our Mission Section */}
        <section className={styles.missionSection}>
          <div className={styles.container}>
            <h2 className={styles.sectionTitle}>Our Mission</h2>
            <p className={styles.missionText}>
              Great wine education shouldn't be locked behind expensive certifications or 
              scattered across countless sources that demand your data before offering a single 
              insight. Somm.Site exists to{' '}
              <span className={styles.highlight}>democratize wine knowledge</span>. We present 
              grape varieties, regional traditions, and historical context with clarity and depth 
              for all levels of learners. From the soils of 
              Burgundy to the volcanic slopes in Sicily, we help you build deep, applicable knowledge.
            </p>
          </div>
        </section>

        {/* About Informative Media Section */}
        <section className={styles.companySection}>
          <div className={styles.container}>
            <h2 className={styles.sectionTitle}>About Informative Media</h2>
            <p className={styles.companyText}>
              Somm.Site is part of Informative Media Group, a technology company operating a 
              portfolio of digital platforms dedicated to solving the pain points in hospitality. 
              Founded by Derek Engles, a lifelong sommelier and hospitality professional, with over 20 years of industry 
              experience in training and developing hospitality teams. Somm.Site combines deep industry expertise with modern technology to create 
              content that makes a real impact, whether studying for a certification of learning more about your favorite region.
            </p>
            <a
              href="https://informativemedia.com"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.companyLink}
            >
              Learn more about Informative Media →
            </a>
            
            <a
              href="https://derekengles.com"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.companyLink}
            >
              Learn more about Derek Engles →
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
              put quality education in front of future industry leaders... we'd love to hear from you.
            </p>
            <a href="mailto:derek@informativemedia.com" className={styles.ctaButton}>
              Get in Touch
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}