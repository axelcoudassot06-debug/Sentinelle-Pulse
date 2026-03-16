import Link from 'next/link';
import { Twitter, Linkedin, Github } from 'lucide-react';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerInner}>
        <div className={styles.footerGrid}>
          <div>
            <div className={styles.footerBrand}>SENTINELLE PULSE</div>
            <p className={styles.footerDesc}>
              Votre source d&apos;information sur l&apos;économie, la géopolitique, la défense et l&apos;OSINT.
            </p>
          </div>

          <div>
            <h4 className={styles.footerTitle}>Catégories</h4>
            <div className={styles.footerLinks}>
              <Link href="/economie" className={styles.footerLink}>Économie</Link>
              <Link href="/geopolitique" className={styles.footerLink}>Géopolitique</Link>
              <Link href="/defense" className={styles.footerLink}>Défense</Link>
              <Link href="/osint" className={styles.footerLink}>OSINT</Link>
            </div>
          </div>

          <div>
            <h4 className={styles.footerTitle}>Légal</h4>
            <div className={styles.footerLinks}>
              <Link href="/mentions-legales" className={styles.footerLink}>Mentions légales</Link>
              <Link href="/confidentialite" className={styles.footerLink}>Confidentialité</Link>
              <Link href="/contact" className={styles.footerLink}>Contact</Link>
            </div>
          </div>

          <div>
            <h4 className={styles.footerTitle}>À propos</h4>
            <p className={styles.footerDesc} style={{ fontSize: '0.875rem' }}>
              <strong>Axel Coudassot-Berduou</strong> — Fondateur &amp; Directeur<br />
              Analyste indépendant spécialisé dans les enjeux stratégiques.
            </p>
          </div>

          <div>
            <h4 className={styles.footerTitle}>Suivez-nous</h4>
            <div className={styles.socials}>
              <a href="#" className={styles.socialLink}><Twitter size={18} /></a>
              <a href="https://www.linkedin.com/company/110721071" target="_blank" rel="noopener noreferrer" className={styles.socialLink}><Linkedin size={18} /></a>
              <a href="#" className={styles.socialLink}><Github size={18} /></a>
            </div>
          </div>
        </div>

        <div className={styles.footerBottom}>
          <span>© 2026 Sentinelle Pulse. Tous droits réservés.</span>
          <span>Développé avec Next.js</span>
        </div>
      </div>
    </footer>
  );
}
