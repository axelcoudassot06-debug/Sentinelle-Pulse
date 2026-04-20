'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Search, Moon, Sun, Menu, X } from 'lucide-react';
import styles from './Header.module.css';

const navItems = [
  { href: '/geopolitique', label: 'Géopolitique', color: '#7C3AED', abbr: 'GÉO' },
  { href: '/defense',      label: 'Défense',       color: '#DC2626', abbr: 'DEF' },
  { href: '/economie',     label: 'Économie',       color: '#059669', abbr: 'ÉCO' },
  { href: '/osint',        label: 'OSINT',           color: '#0891B2', abbr: 'OST' },
];

interface TickerItem { tag: string; text: string; }

const TICKER_FALLBACK: TickerItem[] = [
  { tag: 'FLASH',    text: 'Iran · Négociations nucléaires à Genève — position iranienne durcie, compte à rebours activé' },
  { tag: 'ANALYSE',  text: 'OTAN 5% · 18 membres atteignent l\'objectif en 2026 — supercycle de réarmement confirmé' },
  { tag: 'SIGNAL',   text: 'Mer de Chine · Activité navale PLA inhabituellement dense autour de Taïwan — semaine 16' },
  { tag: 'DOSSIER',  text: 'Semi-conducteurs · TSMC sous pression américaine et chinoise simultanément — pivot décisif' },
  { tag: 'RAPPORT',  text: 'Sahel · Présence Wagner-Africa Corps confirmée dans 3 nouveaux pays — carte des déploiements' },
];

export default function Header() {
  const pathname = usePathname();
  const router   = useRouter();

  const [scrolled,    setScrolled]    = useState(false);
  const [mobileOpen,  setMobileOpen]  = useState(false);
  const [searchOpen,  setSearchOpen]  = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [tickerItems, setTickerItems] = useState<TickerItem[]>(TICKER_FALLBACK);
  const [tickerIdx,   setTickerIdx]   = useState(0);
  const [tickerFade,  setTickerFade]  = useState(true);
  const [theme,       setTheme]       = useState('dark');
  const [mounted,     setMounted]     = useState(false);

  /* ── mount & theme ─────────────────────────────────────── */
  useEffect(() => {
    const saved     = localStorage.getItem('theme');
    const preferred = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    const t         = saved || preferred;
    setTheme(t);
    document.documentElement.setAttribute('data-theme', t);
    setMounted(true);
  }, []);

  /* ── live ticker feed ────────────────────────────────────── */
  useEffect(() => {
    fetch('/api/ticker')
      .then(r => r.json())
      .then((data: { items?: TickerItem[] }) => {
        if (data?.items && data.items.length >= 3) {
          setTickerItems(data.items);
          setTickerIdx(0);
        }
      })
      .catch(() => { /* network error — TICKER_FALLBACK stays */ });
  }, []);

  /* ── scroll ─────────────────────────────────────────────── */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* ── ticker cycle ────────────────────────────────────────── */
  useEffect(() => {
    const interval = setInterval(() => {
      setTickerFade(false);
      setTimeout(() => {
        setTickerIdx(i => (i + 1) % tickerItems.length);
        setTickerFade(true);
      }, 350);
    }, 5000);
    return () => clearInterval(interval);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tickerItems.length]);

  /* ── close mobile on route change ───────────────────────── */
  useEffect(() => { setMobileOpen(false); }, [pathname]);

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    localStorage.setItem('theme', next);
    document.documentElement.setAttribute('data-theme', next);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  const activeCategory = navItems.find(n => pathname.startsWith(n.href));

  return (
    <header
      className={[
        styles.header,
        scrolled        ? styles.scrolled   : '',
        mobileOpen      ? styles.menuIsOpen : '',
      ].join(' ')}
      style={activeCategory ? { '--header-accent': activeCategory.color } as React.CSSProperties : {}}
    >

      {/* ══ TICKER BAR ════════════════════════════════════════ */}
      <div className={styles.ticker}>
        {/* Live badge */}
        <div className={styles.tickerBadge}>
          <span className={styles.liveDot} />
          <span className={styles.liveLabel}>LIVE</span>
        </div>

        {/* Rotating item */}
        <div className={styles.tickerContent}>
          <span
            className={styles.tickerTag}
            style={{ opacity: tickerFade ? 1 : 0, transition: 'opacity 0.35s' }}
          >
            {tickerItems[tickerIdx].tag}
          </span>
          <span
            className={styles.tickerText}
            style={{ opacity: tickerFade ? 1 : 0, transition: 'opacity 0.35s' }}
          >
            {tickerItems[tickerIdx].text}
          </span>
        </div>

        {/* Right: issue / date */}
        <div className={styles.tickerRight}>
          <span className={styles.tickerDate}>
            {mounted ? new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' }) : ''}
          </span>
          <span className={styles.tickerEdition}>· ÉDITION STRATÉGIQUE</span>
        </div>

        {/* Fade-out gradients */}
        <div className={styles.tickerFadeLeft}  />
        <div className={styles.tickerFadeRight} />
      </div>

      {/* ══ MAIN HEADER ═══════════════════════════════════════ */}
      <div className={styles.headerInner}>

        {/* ── Logo ─────────────────────────────────────────── */}
        <Link href="/" className={styles.logo}>
          <span className={styles.logoMark}>
            <span className={styles.logoSP}>SP</span>
          </span>
          <span className={styles.logoWords}>
            <span className={styles.logoSentinelle}>Sentinelle</span>
            <span className={styles.logoPulse}>Pulse</span>
          </span>
          <span className={styles.logoSeparator} />
          <span className={styles.logoSub}>Intelligence · Géopolitique</span>
        </Link>

        {/* ── Desktop nav ──────────────────────────────────── */}
        <nav className={styles.nav} role="navigation">
          {navItems.map(item => {
            const isActive = pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`${styles.navLink} ${isActive ? styles.navActive : ''}`}
                style={{ '--accent': item.color } as React.CSSProperties}
              >
                <span className={styles.navInner}>
                  <span
                    className={styles.navDot}
                    style={{ background: item.color, opacity: isActive ? 1 : 0.35 }}
                  />
                  <span className={styles.navLabel}>{item.label}</span>
                </span>
                <span
                  className={styles.navUnderline}
                  style={{ background: item.color }}
                />
              </Link>
            );
          })}
        </nav>

        {/* ── Actions ──────────────────────────────────────── */}
        <div className={styles.actions}>

          {/* Search */}
          <div className={`${styles.searchWrap} ${searchOpen ? styles.searchExpanded : ''}`}>
            {searchOpen ? (
              <form onSubmit={handleSearch} className={styles.searchForm}>
                <Search size={14} className={styles.searchIcon} />
                <input
                  autoFocus
                  type="text"
                  placeholder="Rechercher une analyse..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className={styles.searchInput}
                  onBlur={() => { if (!searchQuery) setSearchOpen(false); }}
                />
                <button
                  type="button"
                  className={styles.searchClose}
                  onClick={() => { setSearchOpen(false); setSearchQuery(''); }}
                >
                  <X size={13} />
                </button>
              </form>
            ) : (
              <button
                className={styles.iconBtn}
                onClick={() => setSearchOpen(true)}
                aria-label="Rechercher"
              >
                <Search size={17} />
              </button>
            )}
          </div>

          {/* Theme toggle */}
          <button className={styles.iconBtn} onClick={toggleTheme} aria-label="Thème">
            {mounted
              ? (theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />)
              : <Moon size={17} />}
          </button>

          {/* Classification badge (decorative) */}
          <span className={styles.classifiedBadge}>ACCÈS LIBRE</span>

          {/* Mobile burger */}
          <button
            className={`${styles.iconBtn} ${styles.burger}`}
            onClick={() => setMobileOpen(v => !v)}
            aria-label="Menu"
            aria-expanded={mobileOpen}
          >
            <span className={`${styles.burgerLine} ${mobileOpen ? styles.burgerOpen : ''}`} />
          </button>
        </div>
      </div>

      {/* ══ BOTTOM ACCENT LINE ════════════════════════════════ */}
      <div className={styles.accentLine}>
        <div className={styles.accentLineInner} />
      </div>

      {/* ══ MOBILE MENU ═══════════════════════════════════════ */}
      <div className={`${styles.mobileMenu} ${mobileOpen ? styles.mobileMenuOpen : ''}`}>
        <div className={styles.mobileGrid}>
          {navItems.map(item => {
            const isActive = pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`${styles.mobileCard} ${isActive ? styles.mobileCardActive : ''}`}
                style={{ '--accent': item.color } as React.CSSProperties}
                onClick={() => setMobileOpen(false)}
              >
                <span
                  className={styles.mobileCardBar}
                  style={{ background: item.color }}
                />
                <span className={styles.mobileCardAbbr}>{item.abbr}</span>
                <span className={styles.mobileCardLabel}>{item.label}</span>
              </Link>
            );
          })}
        </div>

        <div className={styles.mobileMeta}>
          <span className={styles.mobileMetaText}>
            © 2026 Sentinelle Pulse · Analyse Géopolitique
          </span>
        </div>
      </div>

    </header>
  );
}
