import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Link from 'next/link';
import styles from '../legal-pages.module.css';

export default function TermsOfUse() {
  return (
    <div className={styles.pageContainer}>
      <Header />
      <div className={styles.contentWrapper}>
        <section className={styles.section}>
          <h1 className={styles.title}>Terms of Use</h1>
          <p className={styles.lastUpdated}>Last Updated: November 4, 2025</p>
          
          <div className={styles.content}>
            <p>
              Welcome to SOMM.SITE. By accessing or using our website and services, you agree to be bound by 
              these Terms of Use. Please read them carefully before using our platform.
            </p>

            <h2>Acceptance of Terms</h2>
            <p>
              By accessing, browsing, or using SOMM.SITE, you acknowledge that you have read, understood, and 
              agree to be bound by these Terms of Use and our Privacy Policy. If you do not agree to these terms, 
              you may not use our website or services.
            </p>

            <h2>Description of Service</h2>
            <p>
              SOMM.SITE provides educational content and resources related to wine, beverage service, and 
              hospitality industry standards. Our services include online courses, articles, reference materials, 
              and related educational content designed for hospitality professionals and enthusiasts.
            </p>

            <h2>User Accounts and Registration</h2>
            <p>
              To access certain features of our website, you may be required to create an account. You agree to:
            </p>
            <ul>
              <li>Provide accurate, current, and complete information during registration</li>
              <li>Maintain and promptly update your account information</li>
              <li>Maintain the security and confidentiality of your account credentials</li>
              <li>Accept responsibility for all activities that occur under your account</li>
              <li>Notify us immediately of any unauthorized access or security breach</li>
            </ul>

            <h2>Intellectual Property Rights</h2>
            <p>
              All content on SOMM.SITE, including text, graphics, logos, images, videos, course materials, and 
              software, is the property of SOMM.SITE or its content creators and is protected by United States 
              and international copyright, trademark, and other intellectual property laws.
            </p>

            <h3>Limited License</h3>
            <p>
              We grant you a limited, non-exclusive, non-transferable license to access and use our educational 
              content for personal, non-commercial purposes. You may not:
            </p>
            <ul>
              <li>Reproduce, distribute, or publicly display our content without permission</li>
              <li>Modify, create derivative works, or reverse engineer any part of our services</li>
              <li>Use our content for commercial purposes without written authorization</li>
              <li>Remove or alter any copyright, trademark, or proprietary notices</li>
              <li>Share your account credentials or course access with others</li>
            </ul>

            <h2>User Conduct</h2>
            <p>You agree not to:</p>
            <ul>
              <li>Violate any applicable laws or regulations</li>
              <li>Infringe upon the rights of others, including intellectual property rights</li>
              <li>Transmit harmful code, viruses, or malicious software</li>
              <li>Attempt to gain unauthorized access to our systems or networks</li>
              <li>Engage in data scraping, harvesting, or automated data collection</li>
              <li>Impersonate any person or entity or misrepresent your affiliation</li>
              <li>Harass, abuse, or harm other users</li>
              <li>Use our services for any unlawful or fraudulent purpose</li>
            </ul>

            <h2>Educational Content Disclaimer</h2>
            <p>
              The educational content provided on SOMM.SITE is for informational and educational purposes only. 
              While we strive for accuracy, we make no guarantees regarding the completeness, reliability, or 
              accuracy of the information. Professional certification and licensing requirements vary by 
              jurisdiction, and our content should not be considered a substitute for official certification programs.
            </p>

            <h2>Third-Party Links and Services</h2>
            <p>
              Our website may contain links to third-party websites and services that are not owned or controlled 
              by SOMM.SITE. We have no control over and assume no responsibility for the content, privacy policies, 
              or practices of any third-party websites or services. You acknowledge and agree that we shall not be 
              responsible or liable for any damage or loss caused by your use of any third-party content or services.
            </p>

            <h2>Payment and Subscription Terms</h2>
            <p>
              Certain features and content may require payment or subscription. By making a purchase, you agree to:
            </p>
            <ul>
              <li>Provide accurate and complete payment information</li>
              <li>Authorize us to charge the applicable fees to your payment method</li>
              <li>Pay all fees and applicable taxes associated with your purchase</li>
            </ul>
            <p>
              All sales are final unless otherwise stated. Refund policies, if applicable, will be clearly 
              communicated at the time of purchase.
            </p>

            <h2>Disclaimers and Limitation of Liability</h2>
            <p>
              Our services are provided "as is" and "as available" without warranties of any kind, either express 
              or implied. We do not warrant that our services will be uninterrupted, error-free, or secure.
            </p>
            <p>
              To the fullest extent permitted by law, SOMM.SITE shall not be liable for any indirect, incidental, 
              special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred 
              directly or indirectly, or any loss of data, use, goodwill, or other intangible losses resulting 
              from your use of our services.
            </p>

            <h2>Indemnification</h2>
            <p>
              You agree to indemnify, defend, and hold harmless SOMM.SITE and its officers, directors, employees, 
              and agents from any claims, liabilities, damages, losses, and expenses, including reasonable attorney's 
              fees, arising out of or in any way connected with your access to or use of our services, your violation 
              of these Terms of Use, or your infringement of any rights of another party.
            </p>

            <h2>Termination</h2>
            <p>
              We reserve the right to suspend or terminate your access to our services at any time, without notice, 
              for conduct that we believe violates these Terms of Use or is harmful to other users, us, or third 
              parties, or for any other reason in our sole discretion.
            </p>

            <h2>Governing Law and Dispute Resolution</h2>
            <p>
              These Terms of Use shall be governed by and construed in accordance with the laws of the United States, 
              without regard to conflict of law principles. Any disputes arising from these terms or your use of our 
              services shall be resolved through binding arbitration in accordance with the rules of the American 
              Arbitration Association, except where prohibited by law.
            </p>

            <h2>Changes to Terms</h2>
            <p>
              We reserve the right to modify these Terms of Use at any time. We will notify users of material 
              changes by posting the updated terms on this page and updating the "Last Updated" date. Your continued 
              use of our services following any changes constitutes acceptance of the modified terms.
            </p>

            <h2>Severability</h2>
            <p>
              If any provision of these Terms of Use is found to be invalid or unenforceable, the remaining 
              provisions shall continue in full force and effect.
            </p>

            <h2>Contact Information</h2>
            <p>
              If you have questions about these Terms of Use, please contact us through the information provided 
              on our <Link href="/about">About page</Link>.
            </p>

            <div className={styles.navigationLinks}>
              <Link href="/about" className={styles.navLink}>About</Link>
              <Link href="/" className={styles.navLink}>Home</Link>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
}