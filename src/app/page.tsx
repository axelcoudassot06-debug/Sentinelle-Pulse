'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { articles } from '@/lib/data';
import styles from './page.module.css';

// ── HOTSPOT DATA ──────────────────────────────────────────────────────────────
const SPOTS = [
  { nx: .558, ny: .208, l: 'UKR', c: '#ae3a2e' },
  { nx: .612, ny: .278, l: 'IRN', c: '#c8a24a' },
  { nx: .882, ny: .265, l: 'TWN', c: '#ae3a2e' },
  { nx: .607, ny: .347, l: 'YEM', c: '#c8a24a' },
  { nx: .575, ny: .292, l: 'ISR', c: '#ae3a2e' },
  { nx: .888, ny: .218, l: 'PRK', c: '#3d6fa0' },
  { nx: .485, ny: .382, l: 'MLI', c: '#c8a24a' },
  { nx: .843, ny: .374, l: 'SCS', c: '#3d6fa0' },
  { nx: .562, ny: .246, l: 'SYR', c: '#ae3a2e' },
  { nx: .506, ny: .188, l: 'POL', c: '#3d6fa0' },
] as const;

const LAND_REGIONS: Array<[[number, number], [number, number]]> = [
  [[.04,.28],[.10,.44]], [[.0,.10],[.06,.25]], [[.27,.38],[.03,.22]], [[.06,.14],[.26,.35]],
  [[.10,.20],[.30,.42]], [[.14,.19],[.38,.46]], [[.15,.32],[.36,.78]],
  [[.455,.61],[.09,.33]], [[.49,.56],[.03,.21]], [[.455,.478],[.12,.22]],
  [[.447,.624],[.21,.77]], [[.565,.68],[.22,.48]],
  [[.54,.94],[.04,.38]], [[.62,.75],[.29,.56]],
  [[.75,.93],[.31,.55]], [[.86,.935],[.14,.31]], [[.755,.815],[.40,.57]],
  [[.79,.97],[.53,.76]], [[.625,.647],[.51,.63]], [[.945,.97],[.64,.76]],
  [[.434,.46],[.10,.17]], [[.0,1.0],[.87,1.0]],
];

function isLand(nx: number, ny: number): boolean {
  const n = (Math.sin(nx * 397 + ny * 173) * .5 + .5) * .015 - .007;
  return LAND_REGIONS.some(([[x0, x1], [y0, y1]]) =>
    nx + n >= x0 && nx + n <= x1 && ny + n >= y0 && ny + n <= y1
  );
}

// ── CATEGORIES ────────────────────────────────────────────────────────────────
const CATEGORIES = [
  {
    id: 'geo', tag: '01 —', cat: 'Géopolitique', color: '#c8a24a',
    name: 'Conflits &\nRelations internationales',
    sub: 'Alliances · Puissances\nZones de tension mondiale',
    href: '/geopolitique',
    img: 'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=900&q=80&auto=format&fit=crop',
    imgPos: 'center 40%',
  },
  {
    id: 'def', tag: '02 —', cat: 'Défense', color: '#5888b2',
    name: 'Armement &\nStratégie militaire',
    sub: 'Doctrines · OTAN\nSécurité nationale',
    href: '/defense',
    img: 'https://images.unsplash.com/photo-1583953479406-e3b6e7e3ec67?w=900&q=80&auto=format&fit=crop',
    imgPos: 'center 35%',
  },
  {
    id: 'eco', tag: '03 —', cat: 'Économie', color: '#4a9068',
    name: 'Marchés &\nPolitique monétaire',
    sub: 'Commerce · Sanctions\nFlux de capitaux',
    href: '/economie',
    img: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=900&q=80&auto=format&fit=crop',
    imgPos: 'center 30%',
  },
  {
    id: 'cyb', tag: '04 —', cat: 'Cyber & OSINT', color: '#7090b8',
    name: 'Menaces &\nRenseignement',
    sub: 'Imagerie satellite · Attribution\nIntelligence numérique',
    href: '/osint',
    img: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=900&q=80&auto=format&fit=crop',
    imgPos: 'center 50%',
  },
];

// ── TICKER ITEMS ──────────────────────────────────────────────────────────────
const TICKERS = [
  { tag: 'FLASH', text: 'Iran · Négociations nucléaires à Genève — délai de 72h, position iranienne durcie' },
  { tag: 'GÉO',   text: 'Arctique 2027 · La course aux ressources entre Moscou et Ottawa franchit un seuil critique' },
  { tag: 'DEF',   text: 'OTAN · Réarmement européen : objectif 5% du PIB acté à Bruxelles' },
  { tag: 'ÉCO',   text: 'Tarifs Trump · Onde de choc sur marchés asiatiques — yuan sous pression record' },
  { tag: 'OSINT', text: 'Imagerie satellite : déploiement de forces détecté à la frontière nord-coréenne' },
  { tag: 'GÉO',   text: 'mBridge · 12 nouveaux membres rejoignent l\'alternative au SWIFT' },
];

// ── COMPONENT ─────────────────────────────────────────────────────────────────
export default function LandingPage() {
  const router = useRouter();
  const canvasRef   = useRef<HTMLCanvasElement>(null);
  const cursorRef   = useRef<HTMLDivElement>(null);
  const cursorDotRef  = useRef<HTMLDivElement>(null);
  const cursorRingRef = useRef<HTMLDivElement>(null);

  const [show, setShow]   = useState(false);
  const [time, setTime]   = useState('');
  const [fade, setFade]   = useState(false);

  const articleCount = articles.length;

  // ── CANVAS WORLD MAP ──────────────────────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let mT = 0, hP = 0, raf = 0;
    interface Dot { x: number; y: number; ph: number; s: number; }
    let dots: Dot[] = [];
    let W = 0, H = 0;

    function buildDots() {
      dots = [];
      const step = 10;
      const cols = Math.floor(W / step);
      const rows = Math.floor(H / step);
      for (let c = 0; c < cols; c++) {
        for (let r = 0; r < rows; r++) {
          if (isLand(c / cols, r / rows)) {
            dots.push({ x: c * step + 5, y: r * step + 5, ph: Math.random() * Math.PI * 2, s: Math.random() * .3 + .8 });
          }
        }
      }
    }

    function resize() {
      if (!canvas) return;
      W = canvas.width  = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
      buildDots();
    }

    function draw() {
      if (!ctx) return;
      ctx.clearRect(0, 0, W, H);
      mT += .007;
      hP += .028;

      // Grid lines
      ctx.strokeStyle = 'rgba(200,162,74,.016)';
      ctx.lineWidth = 1;
      for (let x = 0; x < W; x += W / 14) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
      }
      for (let y = 0; y < H; y += H / 7) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
      }

      // Land dots
      dots.forEach(d => {
        const a = .09 + Math.sin(mT * .55 + d.ph) * .028;
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.s, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(200,162,74,${a})`;
        ctx.fill();
      });

      // Connection arcs between hotspots
      const pairs: [number, number][] = [[0,1],[1,4],[3,4],[2,7],[8,1],[9,0]];
      pairs.forEach(([a, b]) => {
        const ax = SPOTS[a].nx * W, ay = SPOTS[a].ny * H;
        const bx = SPOTS[b].nx * W, by = SPOTS[b].ny * H;
        const mx = (ax + bx) / 2;
        const my = (ay + by) / 2 - Math.hypot(bx - ax, by - ay) * .25;
        ctx.beginPath();
        ctx.moveTo(ax, ay);
        ctx.quadraticCurveTo(mx, my, bx, by);
        ctx.strokeStyle = `rgba(200,162,74,${.03 + Math.sin(mT * .4 + a) * .01})`;
        ctx.lineWidth = .7;
        ctx.stroke();
      });

      // Hotspot pulses + labels
      SPOTS.forEach((s, i) => {
        const px = s.nx * W, py = s.ny * H, ph = hP + i * .85;
        for (let r = 0; r < 3; r++) {
          const tt = ((ph + r * 1.1) % 3.3) / 3.3;
          const rad = tt * 20, al = (1 - tt) * .35;
          ctx.beginPath();
          ctx.arc(px, py, rad, 0, Math.PI * 2);
          ctx.strokeStyle = s.c;
          ctx.globalAlpha = al;
          ctx.lineWidth = .9;
          ctx.stroke();
        }
        ctx.globalAlpha = 1;
        ctx.beginPath();
        ctx.arc(px, py, 2, 0, Math.PI * 2);
        ctx.fillStyle = s.c;
        ctx.globalAlpha = .8;
        ctx.fill();
        ctx.globalAlpha = 1;
        ctx.fillStyle = s.c;
        ctx.globalAlpha = .4;
        ctx.font = '6.5px JetBrains Mono, monospace';
        ctx.fillText(s.l, px + 4, py - 4);
        ctx.globalAlpha = 1;
      });

      raf = requestAnimationFrame(draw);
    }

    resize();
    window.addEventListener('resize', resize);
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, []);

  // ── CURSOR ────────────────────────────────────────────────────────────────
  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;
    const move = (e: MouseEvent) => {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top  = e.clientY + 'px';
    };
    document.addEventListener('mousemove', move);
    return () => document.removeEventListener('mousemove', move);
  }, []);

  // ── REVEAL ────────────────────────────────────────────────────────────────
  useEffect(() => {
    const t = setTimeout(() => setShow(true), 80);
    return () => clearTimeout(t);
  }, []);

  // ── CLOCK ─────────────────────────────────────────────────────────────────
  useEffect(() => {
    const tick = () => setTime(new Date().toLocaleTimeString('fr-FR'));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  // ── KEYBOARD ──────────────────────────────────────────────────────────────
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Enter') navigate('/analyses');
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── NAVIGATION ────────────────────────────────────────────────────────────
  const navigate = useCallback((href: string) => {
    setFade(true);
    setTimeout(() => router.push(href), 700);
  }, [router]);

  const onHover = useCallback((on: boolean) => {
    if (cursorDotRef.current)  cursorDotRef.current.style.transform  = on ? 'scale(1.4)' : '';
    if (cursorRingRef.current) {
      cursorRingRef.current.style.width       = on ? '42px' : '20px';
      cursorRingRef.current.style.height      = on ? '42px' : '20px';
      cursorRingRef.current.style.borderColor = on ? 'rgba(200,162,74,.58)' : 'rgba(200,162,74,.32)';
    }
  }, []);

  return (
    <div className={styles.root}>

      {/* ── CANVAS ── */}
      <canvas ref={canvasRef} className={styles.canvas} />

      {/* ── VIGNETTE + GRAIN ── */}
      <div className={styles.vignette} />
      <div className={styles.grain} />

      {/* ── CUSTOM CURSOR ── */}
      <div ref={cursorRef} className={styles.cursor}>
        <div ref={cursorDotRef}  className={styles.cursorDot} />
        <div ref={cursorRingRef} className={styles.cursorRing} />
      </div>

      {/* ── TICKER ── */}
      <div className={`${styles.ticker} ${show ? styles.tickerShow : ''}`}>
        <div className={styles.tickerLeft}>
          <div className={styles.tickerDot} />
          <div className={styles.tickerLabel}>LIVE</div>
        </div>
        <div className={styles.tickerScroll}>
          <div className={styles.tickerInner}>
            {TICKERS.map((t, i) => (
              <div key={i} className={styles.tickerItem}>
                <span className={styles.tickerTag}>{t.tag}</span>
                {t.text}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── HUD TL ── */}
      <div className={`${styles.hud} ${styles.hudTL} ${show ? styles.hudShow : ''}`}>
        <div><span className={styles.hudAccent}>SENTINELLE PULSE</span></div>
        <div>Édition Stratégique · 2026</div>
        <div><span className={styles.hudAccent}>STATUT</span> · <span className={styles.hudHi}>OPÉRATIONNEL</span></div>
      </div>

      {/* ── HUD TR ── */}
      <div className={`${styles.hud} ${styles.hudTR} ${show ? styles.hudShow : ''}`}>
        <div className={styles.hudHi}>19 AVR. 2026</div>
        <div><span className={styles.hudAccent}>COUVERTURE</span> · MONDIALE</div>
        <div>4 piliers · {articleCount} analyses</div>
      </div>

      {/* ── HUD BR ── */}
      <div className={`${styles.hud} ${styles.hudBR} ${show ? styles.hudShow : ''}`}>
        <div><span className={styles.hudAccent}>SYS</span> v2.6 · Actif</div>
        <div className={styles.hudHi}>{time}</div>
      </div>

      {/* ── MAIN CONTENT ── */}
      <div className={styles.main}>

        {/* Eyebrow */}
        <div className={`${styles.eyebrow} ${show ? styles.eyebrowShow : ''}`}>
          Édition Stratégique
        </div>

        {/* SENTINELLE — chaque lettre animée via CSS custom property --d */}
        <div className={styles.logoS}>
          {'SENTINELLE'.split('').map((ch, i) => (
            <span
              key={i}
              className={`${styles.char} ${show ? styles.charShow : ''}`}
              style={{ '--d': `${0.70 + i * 0.042}s` } as React.CSSProperties}
            >
              {ch}
            </span>
          ))}
        </div>

        {/* PULSE */}
        <div className={styles.logoP}>
          {'PULSE'.split('').map((ch, i) => (
            <span
              key={i}
              className={`${styles.char} ${show ? styles.charShow : ''}`}
              style={{ '--d': `${1.15 + i * 0.052}s` } as React.CSSProperties}
            >
              {ch}
            </span>
          ))}
        </div>

        {/* Rule — délai hardcodé dans le CSS (.4s) */}
        <div className={`${styles.rule} ${show ? styles.ruleShow : ''}`}>
          <div className={styles.ruleDiamond} />
        </div>

        {/* Tagline — délai hardcodé dans le CSS (.5s) */}
        <div className={`${styles.tagline} ${show ? styles.taglineShow : ''}`}>
          Intelligence · Géopolitique · Défense · Économie · Cyber & OSINT
        </div>

        {/* Category cards — délai hardcodé dans le CSS (.6s) */}
        <div className={`${styles.cards} ${show ? styles.cardsShow : ''}`}>
          {CATEGORIES.map(cat => (
            <div
              key={cat.id}
              className={styles.card}
              style={{ '--cc': cat.color } as React.CSSProperties}
              onMouseEnter={() => onHover(true)}
              onMouseLeave={() => onHover(false)}
              onClick={() => navigate(cat.href)}
              role="button"
              tabIndex={0}
              onKeyDown={e => e.key === 'Enter' && navigate(cat.href)}
            >
              <div
                className={styles.cardPhoto}
                style={{ backgroundImage: `url('${cat.img}')`, backgroundPosition: cat.imgPos }}
              />
              <div className={styles.cardGrad} />
              <div className={styles.cardAccent} />
              <div className={styles.cardInner}>
                <div className={styles.cardNum}>{cat.tag}</div>
                <div className={styles.cardBadge}>
                  <div className={styles.cardDot} />
                  <div className={styles.cardCat}>{cat.cat}</div>
                </div>
                <div className={styles.cardName}>{cat.name}</div>
                <div className={styles.cardSub}>{cat.sub}</div>
                <div className={styles.cardCta}>Accéder aux articles →</div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* ── STATUS BAR ── */}
      <div className={`${styles.status} ${show ? styles.statusShow : ''}`}>
        <div className={styles.statusItem}>
          <div className={styles.statusDot} style={{ background: '#5888b2' }} />
          Flux actif
        </div>
        <div className={styles.statusItem}>
          <div className={styles.statusDot} style={{ background: '#c8a24a' }} />
          {articleCount} analyses
        </div>
        <div className={styles.statusItem}>
          <div className={styles.statusDot} style={{ background: '#4a9068' }} />
          4 piliers
        </div>
        <div className={styles.statusClock}>{time}</div>
      </div>

      {/* ── SKIP BUTTON ── */}
      <button
        className={`${styles.skipBtn} ${show ? styles.skipBtnShow : ''}`}
        onClick={() => navigate('/analyses')}
        onMouseEnter={() => onHover(true)}
        onMouseLeave={() => onHover(false)}
        aria-label="Voir toutes les analyses"
      >
        Toutes les analyses →
      </button>

      {/* ── FADE COVER ── */}
      <div className={`${styles.fadeCover} ${fade ? styles.fadeOn : ''}`} />

    </div>
  );
}
