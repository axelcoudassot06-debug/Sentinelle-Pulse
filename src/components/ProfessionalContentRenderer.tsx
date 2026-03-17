'use client';

import React from 'react';

interface ContentRendererProps {
  content: string;
}

export default function ContentRenderer({ content }: ContentRendererProps) {
  let html = content;

  html = html.replace(/<DATA>(.*?)<\/DATA>/g, (match, p1) => {
    const parts = p1.trim().split(/\s+/);
    const value = parts[0] || p1;
    const label = parts.slice(1).join(' ');
    return `<div class="data-box"><span class="value">${value}</span>${label ? `<span class="label">${label}</span>` : ''}</div>`;
  });

  html = html.replace(/<ALERT>(.*?)<\/ALERT>/g, (match, p1) => {
    return `<div class="alert-box warning"><div class="alert-title">⚠️ Point d'attention</div><p>${p1}</p></div>`;
  });

  html = html.replace(/<QUOTE>(.*?)<\/QUOTE>/g, (match, p1) => {
    return `<div class="quote-block"><div class="quote-icon">"</div><p>${p1}</p></div>`;
  });

  html = html.replace(/^## (.+)$/gm, '<h2 class="section-header">$1</h2>');
  html = html.replace(/^### (.+)$/gm, '<h3 class="subsection">$1</h3>');
  html = html.replace(/^#### (.+)$/gm, '<h4 class="subsubsection">$1</h4>');

  html = html.replace(/\n\n/g, '</p><p>');
  html = '<p>' + html + '</p>';

  html = html.replace(/<p>\s*<\/p>/g, '');
  html = html.replace(/<p>\s*<(h[234]|div)/g, '<$1');
  html = html.replace(/<\/(h[234]|div)>\s*<\/p>/g, '</$1>');

  return (
    <div className="article-content">
      <style>{`
        .article-content {
          font-size: 1.125rem;
          line-height: 1.85;
          color: #1f2937;
        }

        .article-content h2.section-header {
          font-size: 1.75rem;
          font-weight: 700;
          color: #111827;
          margin-top: 3rem;
          margin-bottom: 1.5rem;
          padding-bottom: 0.75rem;
          border-bottom: 3px solid #dc2626;
          letter-spacing: -0.02em;
          position: relative;
        }

        .article-content h2.section-header::before {
          content: '';
          position: absolute;
          bottom: -3px;
          left: 0;
          width: 60px;
          height: 3px;
          background: linear-gradient(90deg, #dc2626, #7c3aed);
        }

        .article-content h3.subsection {
          font-size: 1.375rem;
          font-weight: 600;
          color: #111827;
          margin-top: 2.5rem;
          margin-bottom: 1rem;
          padding-left: 1rem;
          border-left: 4px solid #7c3aed;
        }

        .article-content h4.subsubsection {
          font-size: 1.125rem;
          font-weight: 600;
          color: #4b5563;
          margin-top: 1.75rem;
          margin-bottom: 0.75rem;
        }

        .article-content p {
          margin-bottom: 1.5rem;
          text-align: justify;
          color: #374151;
        }

        .article-content .data-box {
          display: inline-flex;
          flex-direction: column;
          background: linear-gradient(135deg, #fef3c7 0%, #fef9c3 100%);
          border-left: 4px solid #f59e0b;
          padding: 1.25rem 1.5rem;
          margin: 1.5rem 0;
          border-radius: 0 12px 12px 0;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }

        .article-content .data-box .value {
          font-size: 1.75rem;
          font-weight: 700;
          color: #b45309;
          display: block;
          font-family: 'SF Mono', 'Monaco', 'Inconsolata', monospace;
        }

        .article-content .data-box .label {
          font-size: 0.8125rem;
          color: #92400e;
          margin-top: 0.375rem;
          display: block;
          font-weight: 500;
        }

        .article-content .alert-box {
          padding: 1.25rem 1.5rem;
          margin: 1.5rem 0;
          border-radius: 12px;
          border-left: 4px solid;
        }

        .article-content .alert-box.warning {
          background: linear-gradient(135deg, #fef3c7 0%, #fef9c3 100%);
          border-color: #f59e0b;
        }

        .article-content .alert-box.risk {
          background: linear-gradient(135deg, #fee2e2 0%, #fecaca 100%);
          border-color: #ef4444;
        }

        .article-content .alert-box .alert-title {
          font-weight: 600;
          font-size: 0.9375rem;
          margin-bottom: 0.5rem;
          color: #92400e;
        }

        .article-content .quote-block {
          font-style: italic;
          padding: 2rem;
          margin: 2rem 0;
          background: linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%);
          border-left: 4px solid #7c3aed;
          border-radius: 0 16px 16px 0;
          position: relative;
        }

        .article-content .quote-block .quote-icon {
          position: absolute;
          top: 0.5rem;
          left: 1rem;
          font-size: 3rem;
          color: #7c3aed;
          opacity: 0.3;
          font-family: Georgia, serif;
          line-height: 1;
        }

        .article-content .quote-block p {
          color: #4b5563;
          font-size: 1.125rem;
          line-height: 1.8;
          margin: 0;
        }

        .article-content .table-container {
          overflow-x: auto;
          margin: 2rem 0;
          border-radius: 12px;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          background: white;
        }

        .article-content table {
          width: 100%;
          border-collapse: collapse;
          font-size: 0.9375rem;
        }

        .article-content th {
          background: linear-gradient(135deg, #1f2937 0%, #374151 100%);
          color: white;
          padding: 1rem;
          text-align: left;
          font-weight: 600;
          border-bottom: 3px solid #dc2626;
          white-space: nowrap;
        }

        .article-content td {
          padding: 0.875rem 1rem;
          border-bottom: 1px solid #e5e7eb;
          color: #374151;
        }

        .article-content tr:nth-child(even) {
          background: #f9fafb;
        }

        .article-content tr:hover {
          background: #f3f4f6;
        }

        @media (max-width: 768px) {
          .article-content {
            font-size: 1rem;
          }

          .article-content h2.section-header {
            font-size: 1.5rem;
          }

          .article-content h3.subsection {
            font-size: 1.25rem;
          }

          .article-content .data-box {
            padding: 1rem;
          }

          .article-content .data-box .value {
            font-size: 1.375rem;
          }

          .article-content .quote-block {
            padding: 1.5rem 1rem;
          }

          .article-content .table-container {
            font-size: 0.8125rem;
          }
          
          .article-content th,
          .article-content td {
            padding: 0.5rem;
          }
        }
      `}</style>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
}
