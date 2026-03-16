import Link from 'next/link';
import { Linkedin, Github } from 'lucide-react';
import styles from './Footer.module.css';

function TikTokIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
    </svg>
  );
}

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
              <a href="#" className={styles.socialLink}><TikTokIcon /></a>
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
