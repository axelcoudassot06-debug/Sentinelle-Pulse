'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Search, LayoutGrid, Info } from 'lucide-react';
import styles from './MobileBottomNav.module.css';

const navItems = [
  { href: '/', icon: Home, label: 'Accueil' },
  { href: '/search', icon: Search, label: 'Recherche' },
  { href: '/categories', icon: LayoutGrid, label: 'Catégories' },
  { href: '/a-propos', icon: Info, label: 'À propos' },
];

export default function MobileBottomNav() {
  const pathname = usePathname();
  return (
    <nav className={styles.bottomNav} aria-label="Navigation mobile">
      {navItems.map(({ href, icon: Icon, label }) => {
        const isActive =
          href === '/' ? pathname === '/' : pathname.startsWith(href);
        return (
          <Link
            key={href}
            href={href}
            className={`${styles.navItem} ${isActive ? styles.active : ''}`}
          >
            <Icon size={22} />
            <span className={styles.label}>{label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
