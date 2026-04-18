'use client';

import { useState, useEffect } from 'react';
import { X, Smartphone } from 'lucide-react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export default function MobileInstallPrompt() {
  const [show, setShow] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(display-mode: standalone)').matches) return;
    if (localStorage.getItem('install-prompt-dismissed') === 'true') return;
    if (window.innerWidth > 768) return;

    const ios = /iphone|ipad|ipod/i.test(navigator.userAgent);
    setIsIOS(ios);

    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setTimeout(() => setShow(true), 5000);
    };

    window.addEventListener('beforeinstallprompt', handler);
    if (ios) setTimeout(() => setShow(true), 5000);

    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const dismiss = () => {
    setShow(false);
    localStorage.setItem('install-prompt-dismissed', 'true');
  };

  const install = async () => {
    if (deferredPrompt) {
      await deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') setShow(false);
    }
    dismiss();
  };

  if (!show) return null;

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 68,
        left: 12,
        right: 12,
        zIndex: 99,
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: 14,
        padding: '14px 16px',
        boxShadow: '0 8px 30px rgba(0,0,0,0.2)',
        display: 'flex',
        alignItems: 'flex-start',
        gap: 12,
      }}
    >
      <Smartphone
        size={28}
        style={{ color: 'var(--accent-primary)', flexShrink: 0, marginTop: 2 }}
      />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            fontWeight: 700,
            fontSize: '0.85rem',
            marginBottom: 3,
            color: 'var(--text-primary)',
          }}
        >
          Lire hors-ligne
        </div>
        <div
          style={{
            fontSize: '0.75rem',
            color: 'var(--text-secondary)',
            marginBottom: 10,
            lineHeight: 1.4,
          }}
        >
          {isIOS
            ? "Touchez ⎙ puis \"Sur l'écran d'accueil\" pour installer Sentinelle Pulse"
            : "Ajoutez Sentinelle Pulse à votre écran d'accueil pour lire hors-ligne"}
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button
            onClick={dismiss}
            style={{
              padding: '6px 12px',
              borderRadius: 8,
              border: '1px solid var(--border)',
              background: 'transparent',
              color: 'var(--text-secondary)',
              fontSize: '0.75rem',
              cursor: 'pointer',
              fontWeight: 600,
            }}
          >
            Plus tard
          </button>
          {!isIOS && (
            <button
              onClick={install}
              style={{
                padding: '6px 14px',
                borderRadius: 8,
                border: 'none',
                background: 'var(--accent-primary)',
                color: '#fff',
                fontSize: '0.75rem',
                cursor: 'pointer',
                fontWeight: 700,
              }}
            >
              Ajouter
            </button>
          )}
        </div>
      </div>
      <button
        onClick={dismiss}
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          color: 'var(--text-secondary)',
          padding: 4,
          flexShrink: 0,
        }}
        aria-label="Fermer"
      >
        <X size={16} />
      </button>
    </div>
  );
}
