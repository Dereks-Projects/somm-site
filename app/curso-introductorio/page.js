import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import BackButton from '../../components/BackButton';
import ProjectsCTA from '../../components/ProjectsCTA';
import CourseCard from '../../components/CourseCard';
import courseData from '../../data/courseData.es.json';
import styles from './page.module.css';
import Link from 'next/link';

export const metadata = {
  title: "Curso Introductorio de Vinos",
  description: "Curso gratuito y completo de vinos que cubre vinos blancos, vinos tintos, geografía del vino y grandes productores. Perfecto para principiantes y profesionales de la hospitalidad.",
  alternates: {
    languages: {
      'en': '/intro-course',
      'es': '/curso-introductorio'
    }
  },
  openGraph: {
    title: "Curso Introductorio de Vinos Gratuito - Somm.Site",
    description: "Aprende los fundamentos del vino, desde variedades de uva hasta regiones vinícolas"
  }
};

export default function CursoIntroductorio() {
  return (
    <div>
      <Header />
      <main className={styles.coursePageMain}>
        <div className={styles.coursePageContainer}>
          <h1 className={styles.coursePageTitle}>Curso Introductorio de Vinos</h1>
          <p className={styles.coursePageDescription}>
            Este curso te lleva a través de los principios básicos del mundo del vino. Un lugar perfecto para comenzar para un principiante, un gran repaso para el profesional.
          </p>
          <div className={styles.languageLink}>
            <Link href="/intro-course">English</Link>
          </div>
          <div className={styles.coursePageGrid}>
            {courseData.map((lesson) => (
              <CourseCard key={lesson.id} lesson={lesson} basePath="/curso-introductorio" label="CURSO INTRODUCTORIO" />
            ))}
          </div>
        </div>
        <BackButton href="/" text="Volver al Inicio" />
        
      </main>
      <ProjectsCTA />
      <Footer />
    </div>
  );
}