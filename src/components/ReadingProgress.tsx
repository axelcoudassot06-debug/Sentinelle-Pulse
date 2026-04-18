'use client';

import { useState, useEffect } from 'react';

interface ReadingProgressProps {
  color: string;
}

export default function ReadingProgress({ color }: ReadingProgressProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.body.scrollHeight - window.innerHeight;
      if (docHeight <= 0) return;
      const pct = Math.min(100, Math.max(0, (scrollTop / docHeight) * 100));
      if (!isNaN(pct) && isFinite(pct)) setProgress(pct);
    };

    window.addEventListener('scroll', updateProgress, { passive: true });
    updateProgress();
    return () => window.removeEventListener('scroll', updateProgress);
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        height: '3px',
        width: `${progress}%`,
        background: color,
        zIndex: 1000,
        transition: 'width 0.1s linear',
        borderRadius: '0 2px 2px 0',
        pointerEvents: 'none',
      }}
      role="progressbar"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Progression de lecture"
    />
  );
}
