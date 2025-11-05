import styles from './Hero.module.css';
import HeroCoursePreview from './HeroCoursePreview';
import courseData from '../data/courseData.json';

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.content}>
        
        <p className={styles.subtitle}>Educational Resources That Transform Your Knowledge</p>
        
        <div className={styles.socialIcons}>
          <a href="https://www.instagram.com/somm.site/" target="_blank" rel="noopener noreferrer" className={styles.iconLink}>
            <img src="/images/icons/ig-icon.svg" alt="Instagram" className={styles.icon} />
          </a>
          <a href="https://www.linkedin.com/company/somm-site/" target="_blank" rel="noopener noreferrer" className={styles.iconLink}>
            <img src="/images/icons/li-icon.svg" alt="LinkedIn" className={styles.icon} />
          </a>
          <a href="http://tiktok.com/@somm.site" target="_blank" rel="noopener noreferrer" className={styles.iconLink}>
            <img src="/images/icons/tt-icon.svg" alt="TikTok" className={styles.icon} />
          </a>
        </div>
        
        
          <HeroCoursePreview 
            courses={courseData}
            heading="Free Wine Course Preview"
            buttonText="Explore Course"
            buttonLink="/intro-course"
          />
          
        
      </div>
    </section>
  );
}