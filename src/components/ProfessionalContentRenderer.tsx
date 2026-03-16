'use client';

import React from 'react';

interface ContentRendererProps {
  content: string;
}

export default function ContentRenderer({ content }: ContentRendererProps) {
  // Parse content with markers
  let html = content;

  // Replace DATA markers with styled divs
  html = html.replace(/<DATA>(.*?)<\/DATA>/g, (match, p1) => {
    const parts = p1.trim().split(/\s+/);
    const value = parts[0] || p1;
    const label = parts.slice(1).join(' ');
    return `<div class="data-box"><span class="value">${value}</span>${label ? `<span class="label">${label}</span>` : ''}</div>`;
  });

  // Replace ALERT markers
  html = html.replace(/<ALERT>(.*?)<\/ALERT>/g, (match, p1) => {
    return `<div class="alert-box warning"><div class="alert-title">⚠️ Point d'attention</div><p>${p1}</p></div>`;
  });

  // Replace QUOTE markers
  html = html.replace(/<QUOTE>(.*?)<\/QUOTE>/g, (match, p1) => {
    return `<div class="quote-block"><p>${p1}</p></div>`;
  });

  // Convert markdown-like headers to HTML
  html = html.replace(/^## (.+)$/gm, '<h2 class="section-header">$1</h2>');
  html = html.replace(/^### (.+)$/gm, '<h3 class="subsection">$1</h3>');
  html = html.replace(/^#### (.+)$/gm, '<h4 class="subsubsection">$1</h4>');

  // Convert paragraphs (lines followed by blank lines)
  html = html.replace(/\n\n/g, '</p><p>');
  html = '<p>' + html + '</p>';

  // Clean up empty paragraphs
  html = html.replace(/<p>\s*<\/p>/g, '');
  html = html.replace(/<p>\s*<(h[234]|div)/g, '<$1');
  html = html.replace(/<\/(h[234]|div)>\s*<\/p>/g, '</$1>');

  return (
    <div className="article-content">
      <style jsx>{`
        .article-content {
          font-size: 1.125rem;
          line-height: 1.85;
          color: var(--text-primary);
        }

        .article-content :global(h2.section-header) {
          font-size: 1.75rem;
          font-weight: 700;
          color: var(--text-primary);
          margin-top: 3rem;
          margin-bottom: 1.5rem;
          padding-bottom: 0.75rem;
          border-bottom: 3px solid var(--accent-primary);
          letter-spacing: -0.02em;
        }

        .article-content :global(h3.subsection) {
          font-size: 1.375rem;
          font-weight: 600;
          color: var(--text-primary);
          margin-top: 2.5rem;
          margin-bottom: 1rem;
        }

        .article-content :global(h4.subsubsection) {
          font-size: 1.125rem;
          font-weight: 600;
          color: var(--text-secondary);
          margin-top: 1.75rem;
          margin-bottom: 0.75rem;
        }

        .article-content :global(p) {
          margin-bottom: 1.5rem;
          text-align: justify;
        }

        .article-content :global(.data-box) {
          display: inline-block;
          background: linear-gradient(135deg, var(--surface) 0%, var(--background) 100%);
          border-left: 4px solid var(--accent-primary);
          padding: 1rem 1.5rem;
          margin: 1rem 0;
          border-radius: 0 8px 8px 0;
        }

        .article-content :global(.data-box .value) {
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--accent-primary);
          display: block;
        }

        .article-content :global(.data-box .label) {
          font-size: 0.8125rem;
          color: var(--text-secondary);
          margin-top: 0.25rem;
          display: block;
        }

        .article-content :global(.alert-box) {
          padding: 1.25rem 1.5rem;
          margin: 1.5rem 0;
          border-radius: 8px;
          border-left: 4px solid;
        }

        .article-content :global(.alert-box.warning) {
          background: linear-gradient(135deg, #fef3c7 0%, #fef9c3 100%);
          border-color: #f59e0b;
        }

        .article-content :global(.alert-box.risk) {
          background: linear-gradient(135deg, #fee2e2 0%, #fecaca 100%);
          border-color: #ef4444;
        }

        .article-content :global(.alert-box .alert-title) {
          font-weight: 600;
          font-size: 0.9375rem;
          margin-bottom: 0.5rem;
        }

        .article-content :global(.quote-block) {
          font-style: italic;
          padding: 1.5rem 2rem;
          margin: 2rem 0;
          background: var(--surface);
          border-left: 4px solid var(--accent-secondary);
          border-radius: 0 8px 8px 0;
        }

        .article-content :global(.table-container) {
          overflow-x: auto;
          margin: 2rem 0;
          border-radius: 8px;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }

        .article-content :global(table) {
          width: 100%;
          border-collapse: collapse;
          font-size: 0.9375rem;
        }

        .article-content :global(th) {
          background: var(--surface);
          padding: 1rem;
          text-align: left;
          font-weight: 600;
          border-bottom: 2px solid var(--border);
        }

        .article-content :global(td) {
          padding: 0.875rem 1rem;
          border-bottom: 1px solid var(--border);
        }

        @media (max-width: 768px) {
          .article-content {
            font-size: 1rem;
          }

          .article-content :global(h2.section-header) {
            font-size: 1.5rem;
          }

          .article-content :global(h3.subsection) {
            font-size: 1.25rem;
          }

          .article-content :global(.data-box) {
            padding: 0.75rem 1rem;
          }

          .article-content :global(.data-box .value) {
            font-size: 1.25rem;
          }
        }
      `}</style>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
}
