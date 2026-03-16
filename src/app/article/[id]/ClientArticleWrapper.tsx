'use client';

import dynamic from 'next/dynamic';

const ClaudeAI = dynamic(() => import('@/components/ClaudeAI'), { 
  ssr: false,
  loading: () => <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>IA...</span>
});

interface ClientArticleWrapperProps {
  articleTitle: string;
  articleContent: string;
}

export default function ClientArticleWrapper({ articleTitle, articleContent }: ClientArticleWrapperProps) {
  return (
    <ClaudeAI 
      articleTitle={articleTitle}
      articleContent={articleContent}
    />
  );
}
