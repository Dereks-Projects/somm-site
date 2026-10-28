// app/about/page.js
// About page: founder story, credentials, process, and the Somm.Site + Somm.Tips
// ecosystem. Fully server-rendered. Emits one connected JSON-LD graph
// (AboutPage, Person, Somm.Site, Informative Media) to support entity
// disambiguation between Derek Engles, Somm.Site, and Informative Media.

import Image from 'next/image';
import Link from 'next/link';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import styles from './page.module.css';

const SITE_URL = 'https://somm.site';
const PAGE_URL = `${SITE_URL}/about`;

// Stable entity IDs. Reuse these exact strings anywhere these entities are
// described (layout.js, derekengles.com, informativemedia.com) so search
// engines merge them into one entity each.
const PERSON_ID = 'https://derekengles.com/#person';
const SITE_ORG_ID = `${SITE_URL}/#organization`;
const PARENT_ORG_ID = 'https://informativemedia.com/#organization';

// Official Somm.Site profiles. Keep in sync with app/layout.js.
const SITE_SOCIAL_PROFILES = [
  'https://www.instagram.com/somm.site/',
  'https://tiktok.com/@somm.site',
  'https://www.linkedin.com/company/somm-site/',
];

const PAGE_TITLE = 'About Derek Engles, Founder of Somm.Site';
const PAGE_DESCRIPTION =
  'Somm.Site is free wine education built by Derek Engles, an Advanced Sommelier with 20+ years in luxury hospitality. Courses, quizzes, articles, and videos.';
const SOCIAL_IMAGE = '/ss-social-card.png';

const IMAGES = {
  portrait: '/images/about/derek-engles-portrait.jpg',
  whiteboard: '/images/about/derek-engles-whiteboard.jpg',
  desk: '/images/about/derek-engles-desk.jpg',
};

export const metadata = {
  // "absolute" skips the layout's "%s | Somm.Site" template (no doubled suffix).
  title: { absolute: PAGE_TITLE },
  description: PAGE_DESCRIPTION,
  alternates: { canonical: '/about' },
  // Page-level openGraph replaces the layout's entirely, so every field is restated.
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Somm.Site',
    url: '/about',
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    images: [
      {
        url: SOCIAL_IMAGE,
        width: 1200,
        height: 630,
        alt: 'Somm.Site wine education platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    images: [SOCIAL_IMAGE],
  },
};

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'AboutPage',
      '@id': `${PAGE_URL}#webpage`,
      url: PAGE_URL,
      name: PAGE_TITLE,
      description: PAGE_DESCRIPTION,
      inLanguage: 'en-US',
      about: { '@id': SITE_ORG_ID },
      mainEntity: { '@id': PERSON_ID },
    },
    {
      '@type': 'Person',
      '@id': PERSON_ID,
      name: 'Derek Engles',
      url: 'https://derekengles.com',
      image: `${SITE_URL}${IMAGES.portrait}`,
      jobTitle: 'Founder and CEO',
      worksFor: { '@id': PARENT_ORG_ID },
      knowsAbout: [
        'Wine',
        'Wine Education',
        'Sommelier Training',
        'Hospitality Management',
        'Beverage Programs',
      ],
      // Only credentials shown on this page are marked up here.
      hasCredential: [
        {
          '@type': 'EducationalOccupationalCredential',
          name: 'Advanced Sommelier',
          credentialCategory: 'certification',
          recognizedBy: {
            '@type': 'Organization',
            name: 'Court of Master Sommeliers',
            url: 'https://www.mastersommeliers.org',
          },
        },
      ],
    },
    {
      '@type': 'EducationalOrganization',
      '@id': SITE_ORG_ID,
      name: 'Somm.Site',
      url: SITE_URL,
      logo: `${SITE_URL}/ss-favicon.png`,
      sameAs: SITE_SOCIAL_PROFILES,
      founder: { '@id': PERSON_ID },
      parentOrganization: { '@id': PARENT_ORG_ID },
    },
    {
      '@type': 'Organization',
      '@id': PARENT_ORG_ID,
      name: 'Informative Media',
      url: 'https://informativemedia.com',
      founder: { '@id': PERSON_ID },
      brand: [
        { '@type': 'Brand', name: 'Somm.Site', url: 'https://somm.site' },
        { '@type': 'Brand', name: 'Somm.Tips', url: 'https://somm.tips' },
        { '@type': 'Brand', name: 'Beverage.fyi', url: 'https://beverage.fyi' },
        { '@type': 'Brand', name: 'RestaurantStandards.com', url: 'https://restaurantstandards.com' },
        { '@type': 'Brand', name: 'Hospitality.fyi', url: 'https://hospitality.fyi' },
      ],
    },
  ],
};

// Escape "<" so the JSON can never close the script tag early.
const structuredDataJson = JSON.stringify(structuredData).replace(/</g, '\\u003c');

function ArrowIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
      <path d="M5 12h14" />
      <path d="M13 6l6 6-6 6" />
    </svg>
  );
}

function BookIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
      <path d="M2 5.5C4.5 4 8 4 12 6c4-2 7.5-2 10-.5V19c-2.5-1.5-6-1.5-10 .5-4-2-7.5-2-10-.5z" />
      <path d="M12 6v13.5" />
    </svg>
  );
}

function GlassIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
      <path d="M7.5 3h9c0 4.8-1.8 8-4.5 8s-4.5-3.2-4.5-8z" />
      <path d="M12 11v9" />
      <path d="M8.5 20h7" />
    </svg>
  );
}

const CARD_VARIANTS = {
  dark: styles.cardDark,
  yellow: styles.cardYellow,
};

function PlatformCard({ variant, label, watermark, icon, title, description, tags, href, linkLabel, external = false }) {
  const linkContent = (
    <>
      <span className={styles.cardArrow} aria-hidden="true">
        <ArrowIcon />
      </span>
      {linkLabel}
    </>
  );

  return (
    <article className={`${styles.card} ${CARD_VARIANTS[variant]}`}>
      <span className={styles.cardWatermark} aria-hidden="true">
        {watermark}
      </span>

      <div className={styles.cardTop}>
        <span className={styles.cardIcon} aria-hidden="true">
          {icon}
        </span>
        <span className={styles.cardLabel}>{label}</span>
      </div>

      <h3 className={styles.cardTitle}>{title}</h3>
      <p className={styles.cardText}>{description}</p>

      <ul className={styles.cardTags}>
        {tags.map((tag) => (
          <li key={tag} className={styles.cardTag}>
            {tag}
          </li>
        ))}
      </ul>

      {external ? (
        <a href={href} target="_blank" rel="noopener" className={styles.cardLink}>
          {linkContent}
        </a>
      ) : (
        <Link href={href} className={styles.cardLink}>
          {linkContent}
        </Link>
      )}
    </article>
  );
}

export default function AboutPage() {
  return (
    <>
      <Header />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: structuredDataJson }} />

      <main className={styles.aboutMain}>
        {/* Hero */}
        <section className={styles.hero} aria-labelledby="about-title">
          <div className={`${styles.container} ${styles.heroGrid}`}>
            <div className={styles.heroText}>
              <p className={styles.eyebrow}>About Somm.Site</p>
              <h1 id="about-title" className={styles.heroTitle}>
                Covering the topics that matter. Colored by experience from the floor.
              </h1>
              <p className={styles.heroLead}>
                Somm.Site is a free wine education platform built by Derek Engles, an Advanced
                Sommelier with more than two decades in luxury hospitality. Courses, quizzes,
                articles, and videos for curious enthusiasts, hospitality professionals, and
                aspiring sommeliers. No paywall. No membership.
              </p>
              <div className={styles.heroActions}>
                <Link href="/courses" className={styles.buttonPrimary}>
                  Start learning
                </Link>
                <a href="#story" className={styles.buttonSecondary}>
                  Read the story
                </a>
              </div>
            </div>

            <figure className={styles.heroFigure}>
              <Image
                src={IMAGES.portrait}
                alt="Derek Engles, founder of Somm.Site"
                width={1080}
                height={1080}
                sizes="(min-width: 1240px) 560px, (min-width: 1024px) 45vw, 100vw"
                loading="eager"
                fetchPriority="high"
                className={styles.heroImage}
              />
              <figcaption className={styles.heroCaption}>
                <span className={styles.heroCaptionName}>Derek Engles</span>
                <span className={styles.heroCaptionRole}>Founder, Advanced Sommelier</span>
              </figcaption>
            </figure>
          </div>
        </section>

        {/* Story */}
        <section id="story" className={styles.story} aria-labelledby="story-title">
          <div className={`${styles.container} ${styles.storyGrid}`}>
            <div className={styles.storyHeading}>
              <span className={styles.accentBar} aria-hidden="true" />
              <p className={styles.eyebrowMuted}>The story</p>
              <h2 id="story-title" className={styles.sectionTitle}>
                Why I built Somm.Site
              </h2>
            </div>

            <div className={styles.storyBody}>
              <p className={styles.storyLead}>
                I spent more than twenty years on restaurant floors, many of them in Las Vegas,
                where a guest’s question about a bottle could come at any moment and the answer
                had to be right.
              </p>
              <p className={styles.bodyText}>
                Earning my Advanced certification from the Court of Master Sommeliers showed me
                what great wine education looks like. Years of training service teams showed me
                how few people ever get access to it. The best material was locked behind
                expensive programs, scattered across dozens of sources, or hidden behind a
                signup form.
              </p>
              <p className={styles.bodyText}>
                So I built the resource I wanted when I started: clear, accurate, and free.
                Somm.Site covers the grapes, regions, and history behind the bottle, with
                courses, quizzes, and short videos for every level. Whether you are studying for
                an exam or just want to understand what’s in your glass, it’s here for you.
              </p>
              <div className={styles.signature}>
                <span className={styles.signatureName}>Derek Engles</span>
                <span className={styles.signatureRole}>
                  Founder, Somm.Site · CEO, Informative Media
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Process */}
        <section className={styles.process} aria-labelledby="process-title">
          <div className={`${styles.container} ${styles.processStack}`}>
            <div className={styles.processHeader}>
              <div className={styles.processHeading}>
                <p className={styles.eyebrow}>The process</p>
                <h2 id="process-title" className={styles.sectionTitle}>
                  Refined through countless hours of study. Delivered with the best technology.
                </h2>
              </div>
              <p className={styles.processText}>
                Every lesson begins with hours of research into the regions, grapes, and history
                that matter at the table. I map each one out by hand, then deliver it on a fast,
                modern platform that works as well on your phone as it does at your desk.
              </p>
            </div>

            <div className={styles.gallery}>
              <figure className={styles.galleryItem}>
                <Image
                  src={IMAGES.whiteboard}
                  alt="Derek Engles mapping a Somm.Site course on a whiteboard"
                  width={1080}
                  height={1080}
                  sizes="(min-width: 1240px) 600px, (min-width: 768px) 50vw, 100vw"
                  className={styles.galleryImage}
                />
                <figcaption className={styles.galleryCaption}>01 · Mapping a course by hand</figcaption>
              </figure>
              <figure className={`${styles.galleryItem} ${styles.galleryItemOffset}`}>
                <Image
                  src={IMAGES.desk}
                  alt="Derek Engles building Somm.Site at his desk"
                  width={1080}
                  height={1080}
                  sizes="(min-width: 1240px) 600px, (min-width: 768px) 50vw, 100vw"
                  className={styles.galleryImage}
                />
                <figcaption className={styles.galleryCaption}>02 · Building the platform</figcaption>
              </figure>
            </div>
          </div>
        </section>

        {/* Ecosystem */}
        <section className={styles.ecosystem} aria-labelledby="ecosystem-title">
          <div className={`${styles.container} ${styles.ecosystemStack}`}>
            <div className={styles.ecosystemIntro}>
              <span className={styles.accentBar} aria-hidden="true" />
              <p className={styles.eyebrowMuted}>The ecosystem</p>
              <h2 id="ecosystem-title" className={styles.sectionTitle}>
                Learn the language. Then put it to work.
              </h2>
              <p className={styles.bodyText}>
                Somm.Site teaches how wine works. Somm.Tips helps you use that knowledge every
                time you order, pour, or pair.
              </p>
            </div>

            <div className={styles.cards}>
              <PlatformCard
                variant="dark"
                label="01 · Learn"
                watermark="Learn"
                icon={<BookIcon />}
                title={
                  <>
                    Somm<span className={styles.cardDot}>.</span>Site
                  </>
                }
                description="Free courses, regional guides, quizzes, and short videos that build real wine knowledge, from your first glass to your next exam."
                tags={['Courses', 'Regional guides', 'Quizzes', 'Videos']}
                href="/courses"
                linkLabel="Explore the courses"
              />
              <PlatformCard
                variant="yellow"
                label="02 · Apply"
                watermark="Apply"
                icon={<GlassIcon />}
                title="Somm.Tips"
                description="Map your palate and get pairing guidance built on wine styles, not bottles you can’t find. It turns what you learn here into confident choices at the table."
                tags={['Palate profile', 'Style guidance', 'Pairings']}
                href="https://somm.tips"
                linkLabel="Visit Somm.Tips"
                external
              />
            </div>

            <p className={styles.ecosystemNote}>
              Somm.Site and Somm.Tips are part of{' '}
              <a
                href="https://informativemedia.com"
                target="_blank"
                rel="noopener"
                className={styles.inlineLink}
              >
                Informative Media
              </a>
              , a hospitality education and technology company founded by Derek Engles.
            </p>
          </div>
        </section>

        {/* Work with me */}
        <section className={styles.cta} aria-labelledby="cta-title">
          <div className={`${styles.container} ${styles.ctaGrid}`}>
            <div className={styles.ctaContent}>
              <p className={styles.eyebrow}>Work with me</p>
              <h2 id="cta-title" className={styles.sectionTitle}>
                Let’s work together.
              </h2>
              <p className={styles.ctaText}>
                Wine brands that want to reach an engaged audience of learners. Hospitality
                groups that want to raise their team’s knowledge. Organizations that want quality
                education in front of the industry’s next leaders. I’d like to hear from you.
              </p>
            </div>
            <div className={styles.ctaActions}>
              <a href="mailto:derek@informativemedia.com" className={styles.buttonPrimary}>
                Get in touch
              </a>
              <a
                href="https://derekengles.com"
                target="_blank"
                rel="noopener"
                className={styles.textLink}
              >
                More about Derek →
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}