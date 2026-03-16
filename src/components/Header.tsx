'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Search, Moon, Sun, Menu, X } from 'lucide-react';
import styles from './Header.module.css';

const navItems = [
  { href: '/economie', label: 'Économie' },
  { href: '/geopolitique', label: 'Géopolitique' },
  { href: '/defense', label: 'Défense' },
  { href: '/osint', label: 'OSINT' },
];

function useTheme() {
  const [theme, setTheme] = useState<string>(() => {
    if (typeof window === 'undefined') return 'light';
    return localStorage.getItem('theme') || 
      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  });

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  return { theme, toggleTheme };
}

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
    }
  };

  return (
    <header className={styles.header}>
      <div className={styles.headerInner}>
        <Link href="/" className={styles.logo}>
          <img src="/logo.svg" alt="Sentinelle Pulse" style={{ height: '40px' }} />
        </Link>

        <nav className={styles.nav}>
          {navItems.map(item => (
            <Link
              key={item.href}
              href={item.href}
              className={`${styles.navLink} ${pathname === item.href ? styles.navLinkActive : ''}`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className={styles.actions}>
          {searchOpen ? (
            <form onSubmit={handleSearch} style={{ display: 'flex', alignItems: 'center' }}>
              <input
                type="text"
                placeholder="Rechercher..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
                style={{
                  padding: '8px 12px',
                  border: '1px solid var(--border)',
                  borderRadius: '8px 0 0 8px',
                  background: 'var(--surface)',
                  color: 'var(--text-primary)',
                  fontSize: '0.875rem',
                  width: '200px'
                }}
              />
              <button
                type="submit"
                style={{
                  padding: '8px 12px',
                  border: '1px solid var(--border)',
                  borderLeft: 'none',
                  borderRadius: '0 8px 8px 0',
                  background: 'var(--accent-primary)',
                  color: 'white',
                  cursor: 'pointer'
                }}
              >
                <Search size={16} />
              </button>
            </form>
          ) : (
            <button className={styles.searchBtn} onClick={() => setSearchOpen(true)}>
              <Search size={20} />
            </button>
          )}
          <button className={styles.themeToggle} onClick={toggleTheme}>
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </button>
          <button className={styles.mobileMenuBtn} onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <nav className={`${styles.mobileNav} ${mobileOpen ? styles.mobileNavOpen : ''}`}>
        {navItems.map(item => (
          <Link
            key={item.href}
            href={item.href}
            className={`${styles.navLink} ${pathname === item.href ? styles.navLinkActive : ''}`}
            onClick={() => setMobileOpen(false)}
          >
            {item.label}
          </Link>
        ))}
        <Link href="/search" className={styles.navLink} onClick={() => setMobileOpen(false)}>
          Recherche
        </Link>
      </nav>
    </header>
  );
}
