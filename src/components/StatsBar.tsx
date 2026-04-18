import { articles } from '@/lib/data';
import styles from './StatsBar.module.css';
import { BookOpen, Layers, Clock, Calendar } from 'lucide-react';

export default function StatsBar() {
  const totalMinutes = articles.reduce((s, a) => s + a.readTime, 0);
  const cats = new Set(articles.map(a => a.category)).size;
  const lastDate = articles
    .map(a => new Date(a.date))
    .sort((a, b) => b.getTime() - a.getTime())[0]
    .toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });

  const stats = [
    { icon: <BookOpen size={13} />, value: `${articles.length}`, label: 'analyses' },
    { icon: <Layers size={13} />,   value: `${cats}`,            label: 'domaines' },
    { icon: <Clock size={13} />,    value: `${totalMinutes.toLocaleString('fr-FR')} min`, label: 'de lecture' },
    { icon: <Calendar size={13} />, value: lastDate,             label: 'mise à jour' },
  ];

  return (
    <div className={styles.bar}>
      <div className={styles.inner}>
        {stats.map((s, i) => (
          <div key={i} className={styles.stat}>
            <span className={styles.icon}>{s.icon}</span>
            <strong className={styles.value}>{s.value}</strong>
            <span className={styles.label}>{s.label}</span>
          </div>
        ))}
        <div className={styles.badge}>
          <span className={styles.dot} />
          Données 2025-2026
        </div>
      </div>
    </div>
  );
}
