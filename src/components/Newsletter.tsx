'use client';

import { useState } from 'react';
import styles from './Newsletter.module.css';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        setSubmitted(true);
        setEmail('');
      } else {
        const data = await res.json();
        setError(data.error || 'Une erreur est survenue');
      }
    } catch {
      setError('Une erreur est survenue');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className={styles.newsletter}>
        <h3 className={styles.title}>Merci pour votre inscription !</h3>
        <p className={styles.success}>
          Vérifiez votre boîte mail pour confirmer votre inscription.
        </p>
      </div>
    );
  }

  return (
    <div className={styles.newsletter}>
      <h3 className={styles.title}>Newsletter</h3>
      <p className={styles.desc}>
        Recevez nos dernières analyses directement dans votre boîte mail.
      </p>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Votre adresse email"
          className={styles.input}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={loading}
        />
        <button type="submit" className={styles.button} disabled={loading}>
          {loading ? 'Inscription...' : "S'abonner"}
        </button>
      </form>
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
}
