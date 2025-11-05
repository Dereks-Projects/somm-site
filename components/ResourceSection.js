import styles from './ResourceSection.module.css';
import ResourceCard from './ResourceCard';
import resourcesData from '../data/resourcesData.json';

export default function ResourcesSection() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.heading}>Educational Resources from Around the Web</h2>
        <div className={styles.grid}>
          {resourcesData.websites.map((resource) => (
            <ResourceCard key={resource.id} resource={resource} />
          ))}
        </div>
      </div>
    </section>
  );
}