import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Link from 'next/link';
import styles from '../legal-pages.module.css';

export const metadata = {
  title: "Content Disclaimer - Somm.Site",
  description: "Important information about Somm.Site content, including educational disclaimers and liability limitations.",
};

export default function ContentDisclaimer() {
  return (
    <div className={styles.pageContainer}>
      <Header />
      <div className={styles.contentWrapper}>
        <section className={styles.section}>
          <h1 className={styles.title}>Content Disclaimer</h1>
          <p className={styles.lastUpdated}>Last Updated: November 18, 2025</p>
          
          <div className={styles.content}>
            <p>
              Somm.Site provides wine and hospitality education content for informational and educational 
              purposes only. By accessing and using this website, you acknowledge and agree to the terms 
              outlined in this Content Disclaimer. Please read this disclaimer carefully before using any 
              information from our platform.
            </p>

            <h2>General Educational Purpose</h2>
            <p>
              All content on SOMM.SITE—including articles, courses, guides, recommendations, and resources—is 
              provided solely for <strong>educational and informational purposes</strong>. Our content is 
              designed to help hospitality professionals, wine enthusiasts, and learners develop knowledge 
              and skills in wine appreciation, beverage service, and restaurant hospitality.
            </p>
            <p>
              This content should not be considered a substitute for professional training, certification 
              programs, or hands-on experience in the hospitality industry. While we strive for accuracy 
              and quality, our educational materials are intended to supplement—not replace—formal education, 
              professional development, or expert consultation.
            </p>

            <h2>Not Professional Advice</h2>
            
            <h3>Legal Disclaimer</h3>
            <p>
              Nothing on SOMM.SITE constitutes legal advice. Content related to alcohol service regulations, 
              licensing requirements, employment law, or business operations is provided for general 
              informational purposes only and should not be relied upon as legal counsel. Laws and regulations 
              governing alcohol service vary significantly by jurisdiction and change frequently.
            </p>
            <p>
              For legal matters affecting your business, employment, or personal circumstances, always consult 
              with a qualified attorney licensed to practice in your jurisdiction. We make no representations 
              or warranties regarding the legal accuracy, completeness, or applicability of any content to 
              your specific situation.
            </p>

            <h3>Financial Disclaimer</h3>
            <p>
              Any content related to wine investment, business operations, pricing strategies, or financial 
              planning is provided for informational purposes only and does not constitute financial advice. 
              We are not financial advisors, and nothing on this website should be interpreted as investment 
              recommendations or financial planning guidance.
            </p>
            <p>
              Wine collecting and wine-related business ventures involve financial risk. Past performance of 
              wines, wineries, or hospitality businesses does not guarantee future results. Before making any 
              financial decisions, consult with qualified financial professionals who understand your specific 
              circumstances and financial goals.
            </p>

            <h3>Health and Safety Disclaimer</h3>
            <p>
              Content discussing alcohol consumption, food and wine pairings, dietary considerations, or health 
              topics is provided for general educational purposes only and does not constitute medical advice. 
              We are not medical professionals, and you should not rely on any information from this website 
              as a substitute for professional medical consultation.
            </p>
            <p>
              <strong>Alcohol consumption carries health risks.</strong> If you have questions about how 
              alcohol may affect your health, are pregnant or nursing, have a medical condition, take 
              medications, or have concerns about alcohol use, please consult with qualified healthcare 
              professionals before consuming alcoholic beverages.
            </p>
            <p>
              Food allergy and dietary restriction information is provided for general awareness only. Always 
              verify ingredients, preparation methods, and potential allergens with qualified food service 
              professionals and your healthcare provider.
            </p>

            <h2>Content Sources and Methodology</h2>
            
            <h3>Information Compilation</h3>
            <p>
              Our educational content draws from a wide range of publicly available sources, including 
              industry publications, wine reference books, hospitality training materials, academic research, 
              and professional experience accumulated over decades in the hospitality industry. Information 
              presented on SOMM.SITE represents a synthesis of knowledge that is widely available across 
              multiple authoritative sources in the wine and hospitality fields.
            </p>
            <p>
              We make every reasonable effort to ensure accuracy and cite sources where appropriate. However, 
              the wine industry evolves constantly—new vintages are released, winemaking techniques change, 
              regulations are updated, and industry practices shift. Information that was accurate at the time 
              of publication may become outdated. We encourage users to verify critical information through 
              multiple sources and stay current with industry developments.
            </p>

            <h3>Editorial Process and Technology</h3>
            <p>
              In creating our educational content, we utilize modern editorial tools and technology to research, 
              organize, draft, and refine materials. This may include the use of artificial intelligence and 
              machine learning tools to assist with content research, editing, proofreading, formatting, and 
              quality control. All content undergoes human review and editorial oversight to ensure accuracy, 
              clarity, and educational value.
            </p>
            <p>
              The use of AI-assisted tools is part of our commitment to producing high-quality, comprehensive 
              educational content efficiently while maintaining professional standards. However, as with any 
              content creation process, errors or inaccuracies may occur. We welcome corrections and feedback 
              from our community to continuously improve our educational materials.
            </p>

            <h3>Visual Content and Images</h3>
            <p>
              Images and visual content on SOMM.SITE are sourced from freely licensed image repositories, 
              stock photography services (including Canva and similar platforms), and other sources where we 
              have obtained appropriate usage rights. We respect intellectual property rights and make every 
              effort to use only properly licensed imagery.
            </p>
            <p>
              If you believe any image on our website infringes on your copyright or intellectual property 
              rights, please contact us immediately through the information provided on our 
              <Link href="/about"> About page</Link>. We will promptly investigate any legitimate copyright 
              concerns and remove infringing content as appropriate. We are committed to respecting the 
              intellectual property rights of creators and rights holders.
            </p>

            <h2>Accuracy and Errors</h2>
            <p>
              While we strive for accuracy in all content, SOMM.SITE makes no representations or warranties 
              regarding the completeness, accuracy, reliability, or currentness of any information on this 
              website. Wine information is particularly subject to change—vintages vary, wineries close or 
              change ownership, wine regions evolve, and tasting notes are inherently subjective.
            </p>
            <p>
              We do not guarantee that content is free from errors, omissions, or inaccuracies. Users should 
              independently verify any information before making decisions based on content from this website. 
              We expressly disclaim all liability for any errors, inaccuracies, or omissions in our content.
            </p>

            <h2>Wine Recommendations and Reviews</h2>
            <p>
              Wine recommendations, tasting notes, pairing suggestions, and product reviews reflect general 
              educational guidance and subjective opinions. Wine appreciation is inherently personal—what one 
              person finds exceptional, another may not enjoy. Factors including serving temperature, glassware, 
              food pairings, personal taste preferences, and even mood can significantly affect wine perception.
            </p>
            <p>
              Our recommendations should be viewed as starting points for exploration rather than definitive 
              judgments. We encourage users to develop their own palates, trust their personal preferences, 
              and recognize that there are no objectively "right" or "wrong" opinions about wine quality or 
              enjoyment.
            </p>
            <p>
              <strong>We do not receive compensation for wine recommendations.</strong> We are not affiliated 
              with wine producers, distributors, or retailers unless explicitly disclosed. Our goal is education, 
              not promotion of specific commercial products.
            </p>

            <h2>Third-Party Links and Resources</h2>
            <p>
              SOMM.SITE may contain links to third-party websites, resources, or services for additional 
              information or reference purposes. These links are provided as a convenience and do not constitute 
              an endorsement, approval, or guarantee of the content, accuracy, or quality of these external 
              resources.
            </p>
            <p>
              We have no control over third-party websites and are not responsible for their content, privacy 
              practices, terms of service, or business practices. When you access third-party websites, you do 
              so at your own risk and subject to the terms and conditions of those websites.
            </p>

            <h2>User-Generated Content</h2>
            <p>
              If our platform includes features for user comments, reviews, or contributions, please understand 
              that user-generated content represents the views and opinions of individual contributors, not 
              SOMM.SITE. We do not endorse, verify, or take responsibility for user-generated content.
            </p>
            <p>
              Users who contribute content are responsible for ensuring their contributions do not violate 
              intellectual property rights, defame others, contain false information, or violate applicable 
              laws. We reserve the right to remove any user-generated content at our discretion.
            </p>

            <h2>Limitation of Liability</h2>
            <p>
              To the fullest extent permitted by law, SOMM.SITE, its creator, and any affiliated parties shall 
              not be liable for any direct, indirect, incidental, consequential, or punitive damages arising 
              from your use of this website or reliance on any content provided herein. This includes but is 
              not limited to damages for:
            </p>
            <ul>
              <li>Personal injury or property damage</li>
              <li>Financial losses or business decisions</li>
              <li>Errors, inaccuracies, or omissions in content</li>
              <li>Unauthorized access to or use of our servers</li>
              <li>Interruption or cessation of content availability</li>
              <li>Any third-party content or conduct</li>
            </ul>
            <p>
              <strong>You use this website and its content entirely at your own risk.</strong> By using 
              SOMM.SITE, you agree to indemnify and hold harmless SOMM.SITE and its affiliates from any 
              claims, damages, or expenses arising from your use of the website or your violation of this 
              disclaimer.
            </p>

            <h2>Age Restrictions and Responsible Service</h2>
            <p>
              Content on SOMM.SITE discusses alcoholic beverages and is intended for adults of legal drinking 
              age in their jurisdiction. We do not encourage, condone, or promote underage drinking, excessive 
              alcohol consumption, or irresponsible alcohol use.
            </p>
            <p>
              Hospitality professionals using our training materials are responsible for understanding and 
              complying with all applicable laws regarding alcohol service, including age verification, 
              responsible service practices, and local regulations.
            </p>

            <h2>Changes to Content and Services</h2>
            <p>
              We reserve the right to modify, update, or remove any content on SOMM.SITE at any time without 
              notice. We may also suspend or discontinue any features, courses, or services without liability. 
              Content availability is not guaranteed, and we make no commitments regarding future availability 
              of any specific content or features.
            </p>

            <h2>Geographic Limitations</h2>
            <p>
              Content on SOMM.SITE is created primarily with reference to wine regions, hospitality practices, 
              and regulations common in international wine trade and major wine-producing countries. Information 
              may not be applicable or appropriate for all geographic locations. Users outside major wine markets 
              should verify the relevance and applicability of content to their local context.
            </p>

            <h2>Professional Certifications</h2>
            <p>
              While SOMM.SITE provides educational content related to wine and hospitality, <strong>we do not 
              offer formal certifications, credentials, or professional qualifications</strong>. Our courses 
              and materials are not substitutes for recognized industry certifications such as those offered 
              by the Court of Master Sommeliers, Wine & Spirit Education Trust (WSET), or other professional 
              certifying bodies.
            </p>
            <p>
              Hospitality professionals seeking formal credentials should pursue appropriate certification 
              programs through recognized industry organizations. Our content can supplement but not replace 
              formal certification study.
            </p>

            <h2>Updates to This Disclaimer</h2>
            <p>
              We may revise this Content Disclaimer at any time without prior notice. Material changes will be 
              reflected in the "Last Updated" date above. Your continued use of SOMM.SITE after any modifications 
              indicates your acceptance of the updated disclaimer. We encourage you to review this disclaimer 
              periodically.
            </p>

            <h2>Questions or Concerns</h2>
            <p>
              If you have questions about this Content Disclaimer, concerns about specific content accuracy, 
              or wish to report potential copyright issues, please contact us through the information provided 
              on our <Link href="/about">About page</Link>.
            </p>
            <p>
              For information about how we handle personal data, see our <Link href="/privacy">Privacy Policy</Link>. 
              For our terms of use, see our <Link href="/terms">Terms of Use</Link>.
            </p>

            <div className={styles.navigationLinks}>
              <Link href="/privacy" className={styles.navLink}>Privacy Policy</Link>
              <Link href="/terms" className={styles.navLink}>Terms of Use</Link>
              <Link href="/cookies" className={styles.navLink}>Cookie Policy</Link>
              <Link href="/" className={styles.navLink}>Home</Link>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
}