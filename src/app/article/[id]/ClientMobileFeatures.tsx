'use client';

import { useState, useEffect } from 'react';
import ReadingProgress from '@/components/ReadingProgress';
import { ArrowUp } from 'lucide-react';

interface ClientMobileFeaturesProps {
  color: string;
}

export default function ClientMobileFeatures({ color }: ClientMobileFeaturesProps) {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 500);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <>
      <ReadingProgress color={color} />
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          aria-label="Retour en haut"
          className="mobile-scroll-top"
          style={{
            position: 'fixed',
            bottom: 80,
            right: 16,
            zIndex: 98,
            width: 42,
            height: 42,
            borderRadius: '50%',
            background: color,
            border: 'none',
            color: '#fff',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
          }}
        >
          <ArrowUp size={20} />
        </button>
      )}
      <style>{`
        @media (min-width: 769px) {
          .mobile-scroll-top { display: none !important; }
        }
      `}</style>
    </>
  );
}
