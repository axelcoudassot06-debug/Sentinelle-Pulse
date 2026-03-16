'use client';

import { useEffect, useRef } from 'react';

interface GiscusProps {
  repo: string;
  repoId: string;
  category: string;
  categoryId: string;
  mapping: string;
}

export default function Giscus({ 
  repo = 'axelcoudassot06-debug/Sentinelle-Pulse',
  repoId = 'R_placeholder',
  category = 'General',
  categoryId = 'DIC_placeholder',
  mapping = 'pathname'
}: GiscusProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const script = document.createElement('script');
    script.src = 'https://giscus.app/client.js';
    script.setAttribute('data-repo', repo);
    script.setAttribute('data-repo-id', repoId);
    script.setAttribute('data-category', category);
    script.setAttribute('data-category-id', categoryId);
    script.setAttribute('data-mapping', mapping);
    script.setAttribute('data-strict', '0');
    script.setAttribute('data-reactions-enabled', '1');
    script.setAttribute('data-emit-metadata', '0');
    script.setAttribute('data-input-position', 'bottom');
    script.setAttribute('data-theme', 'preferred_color_scheme');
    script.setAttribute('data-lang', 'fr');
    script.setAttribute('data-loading', 'lazy');
    script.crossOrigin = 'anonymous';
    script.async = true;

    ref.current.appendChild(script);

    return () => {
      if (ref.current) {
        ref.current.innerHTML = '';
      }
    };
  }, [repo, repoId, category, categoryId, mapping]);

  return (
    <div 
      ref={ref}
      style={{ 
        marginTop: '48px', 
        paddingTop: '32px', 
        borderTop: '1px solid var(--border)' 
      }}
    />
  );
}
