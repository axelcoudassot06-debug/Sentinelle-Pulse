'use client';

import { useState } from 'react';
import { X, Sparkles, Loader2 } from 'lucide-react';
import styles from './ClaudeAI.module.css';

interface ClaudeAIProps {
  articleTitle?: string;
  articleContent?: string;
}

type AIOption = 'summary' | 'keyPoints' | 'context' | 'questions';

const AI_PROMPT = {
  summary: (title: string, content: string) => 
    `Tu es un journaliste professionnel. Résume cet article de manière concise et informative:\n\nTitre: ${title}\n\nContenu: ${content}\n\nRègles:\n- Maximum 3 paragraphes\n- Style journalistique professionnel\n- Ton objectif et informatif
- Ne invente pas d'informations`,

  keyPoints: (title: string, content: string) =>
    `Tu es un analyste. Extrais les 5 points clés de cet article:\n\nTitre: ${title}\n\nContenu: ${content}\n\nRègles:\n- Format bullets numérotés
- Chaque point une phrase concise
- Ordre d'importance décroissant`,

  context: (title: string, content: string) =>
    `Tu es un expert géopolitique/économique. Provide un contexte et background pour cet article:\n\nTitre: ${title}\n\nContenu: ${content}\n\nRègles:\n- Contexte historique si pertinent\n- Acteurs impliqués
- Implications potentielles
- Style analytique professionnel`,

  questions: (title: string, content: string) =>
    `Tu es un éditeur. Propose 3 questions que ce article soulève:\n\nTitre: ${title}\n\nContenu: ${content}\n\nRègles:\n- Questions ouvertes et stimulantes
- Reliées au contenu
- Format numéroté`,
};

export default function ClaudeAI({ articleTitle, articleContent }: ClaudeAIProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<AIOption>('summary');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [showApiInput, setShowApiInput] = useState(false);

  const handleSubmit = async () => {
    if (!articleTitle || !articleContent) return;
    
    setLoading(true);
    setError('');
    setResponse('');

    const key = localStorage.getItem('claude_api_key') || apiKey;
    
    if (!key) {
      setShowApiInput(true);
      setLoading(false);
      return;
    }

    try {
      const prompt = AI_PROMPT[selectedOption](articleTitle, articleContent);
      
      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': key,
          'anthropic-version': '2023-06-01'
        },
        body: JSON.stringify({
          model: 'claude-3-haiku-20240307',
          max_tokens: 1024,
          messages: [{ role: 'user', content: prompt }]
        })
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error?.message || 'Erreur API');
      }

      const data = await res.json();
      setResponse(data.content[0].text);
      
      if (apiKey) {
        localStorage.setItem('claude_api_key', apiKey);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue');
    } finally {
      setLoading(false);
    }
  };

  const options: { id: AIOption; label: string }[] = [
    { id: 'summary', label: 'Résumé' },
    { id: 'keyPoints', label: 'Points clés' },
    { id: 'context', label: 'Contexte' },
    { id: 'questions', label: 'Questions' },
  ];

  return (
    <>
      <button className={styles.aiButton} onClick={() => setIsOpen(true)}>
        <Sparkles size={16} />
        IA Assistant
      </button>

      {isOpen && (
        <div className={styles.modal} onClick={() => setIsOpen(false)}>
          <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <div className={styles.modalTitle}>
                <Sparkles size={20} />
                Assistant IA
              </div>
              <button className={styles.closeBtn} onClick={() => setIsOpen(false)}>
                <X size={20} />
              </button>
            </div>

            <div className={styles.modalBody}>
              {showApiInput && !apiKey && !localStorage.getItem('claude_api_key') ? (
                <div>
                  <p style={{ marginBottom: '16px', color: 'var(--text-secondary)' }}>
                    Entrez votre clé API Anthropic pour utiliser l&apos;assistant IA :
                  </p>
                  <div className={styles.inputGroup}>
                    <input
                      type="password"
                      className={styles.input}
                      placeholder="sk-ant-..."
                      value={apiKey}
                      onChange={e => setApiKey(e.target.value)}
                    />
                    <button className="btn btn-primary" onClick={() => setShowApiInput(false)}>
                      Sauvegarder
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className={styles.optionButtons}>
                    {options.map(opt => (
                      <button
                        key={opt.id}
                        className={`${styles.optionBtn} ${selectedOption === opt.id ? styles.optionBtnActive : ''}`}
                        onClick={() => setSelectedOption(opt.id)}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>

                  <button 
                    className="btn btn-primary" 
                    style={{ width: '100%', marginBottom: '20px' }}
                    onClick={handleSubmit}
                    disabled={loading || !articleTitle}
                  >
                    {loading ? (
                      <>
                        <Loader2 size={16} className={styles.spinner} style={{ animation: 'none' }} />
                        Analyse en cours...
                      </>
                    ) : (
                      <>
                        <Sparkles size={16} />
                        Générer
                      </>
                    )}
                  </button>

                  {error && <div className={styles.error}>{error}</div>}

                  {loading && (
                    <div className={styles.loading}>
                      <div className={styles.spinner} />
                      L&apos;IA analyse le contenu...
                    </div>
                  )}

                  {response && (
                    <div className={styles.response}>
                      {response}
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
