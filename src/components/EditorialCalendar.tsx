import styles from './EditorialCalendar.module.css';
import { CalendarDays, Lock } from 'lucide-react';

const UPCOMING = [
  {
    week:     'Semaine 17 — 28 avr.',
    title:    'Corée du Nord 2026 : soldats en Russie, missiles intercontinentaux',
    category: 'Défense',
    color:    '#DC2626',
    status:   'En rédaction',
  },
  {
    week:     'Semaine 18 — 5 mai',
    title:    'IA et guerre cognitive : quand les algorithmes manipulent les élections',
    category: 'Géopolitique',
    color:    '#7C3AED',
    status:   'Planifié',
  },
  {
    week:     'Semaine 19 — 12 mai',
    title:    'L\'Arctique 2030 : course aux ressources, tensions OTAN-Russie-Chine',
    category: 'Géopolitique',
    color:    '#7C3AED',
    status:   'Planifié',
  },
  {
    week:     'Semaine 20 — 19 mai',
    title:    'Bulletin stratégique mensuel — Mai 2026 : synthèse & scénarios',
    category: 'Toutes catégories',
    color:    '#C41E3A',
    status:   'Récurrent',
  },
];

export default function EditorialCalendar() {
  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <div className={styles.titleRow}>
          <CalendarDays size={16} />
          <h2 className={styles.title}>Calendrier éditorial</h2>
        </div>
        <p className={styles.sub}>Prochaines analyses en préparation</p>
      </div>

      <div className={styles.list}>
        {UPCOMING.map((item, i) => (
          <div key={i} className={styles.item}>
            <div className={styles.itemLeft}>
              <span className={styles.week}>{item.week}</span>
              <span className={styles.catTag} style={{ color: item.color, borderColor: `${item.color}40` }}>
                {item.category}
              </span>
            </div>
            <div className={styles.itemCenter}>
              <h3 className={styles.itemTitle}>
                <Lock size={11} className={styles.lockIcon} />
                {item.title}
              </h3>
            </div>
            <span className={`${styles.status} ${styles[`status_${item.status.split(' ')[0].toLowerCase()}`]}`}>
              {item.status}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
