'use client';

import { useState } from 'react';
import styles from './Newsletter.module.css';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setEmail('');
    }
  };

  if (submitted) {
    return (
      <div className={styles.newsletter}>
        <h3 className={styles.title}>Merci pour votre inscription !</h3>
        <p className={styles.success}>Vous recevrez nos prochaines actualités.</p>
      </div>
    );
  }

  return (
    <div className={styles.newsletter}>
      <h3 className={styles.title}>Newsletter</h3>
      <p className={styles.desc}>
        Recevez nos dernières actualités directement dans votre boîte mail.
      </p>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Votre adresse email"
          className={styles.input}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit" className={styles.button}>
          S&apos;abonner
        </button>
      </form>
    </div>
  );
}
