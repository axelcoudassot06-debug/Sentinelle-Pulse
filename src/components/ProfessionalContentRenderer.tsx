'use client';

import React, { useEffect, useRef } from 'react';

interface ContentRendererProps {
  content: string;
}

export default function ContentRenderer({ content }: ContentRendererProps) {
  const ref = useRef<HTMLDivElement>(null);

  // Convert raw content string to clean HTML
  let html = content;

  // 1. Collect & remove all DATA blocks at the very start (before first ##)
  //    They're rendered separately via ArticleCharts — just strip them here
  html = html.replace(/^(\s*<DATA>[^<]*<\/DATA>\s*)+/, '');

  // 2. Strip orphaned DATA blocks in body
  html = html.replace(/<DATA>(.*?)<\/DATA>/g, '');

  // 3. QUOTE blocks → pull-quote
  html = html.replace(/<QUOTE>([\s\S]*?)<\/QUOTE>/g, (_, p1) => {
    return `<blockquote class="pull-quote"><span class="pq-mark">"</span><p>${p1.trim()}</p></blockquote>`;
  });

  // 4. ALERT blocks
  html = html.replace(/<ALERT>([\s\S]*?)<\/ALERT>/g, (_, p1) => {
    return `<div class="callout warning"><div class="callout-icon">⚠</div><div class="callout-body">${p1.trim()}</div></div>`;
  });

  // 4c. DEBATE blocks — Thèse / Antithèse / Synthèse ou Objection / Réponse
  html = html.replace(/<DEBATE>([\s\S]*?)<\/DEBATE>/g, (_, p1) => {
    const body = p1.trim();

    // Format new : **Thèse ...** / **Antithèse ...** / **Synthèse ...**
    if (/\*\*Thès/i.test(body) || /\*\*Antithès/i.test(body)) {
      // Split on bold section headers
      const thèseMatch   = body.match(/\*\*Thès[^*]*\*\*[^]*?(?=\*\*Antithès|\*\*Synthès|$)/i);
      const antithèseMatch = body.match(/\*\*Antithès[^*]*\*\*[^]*?(?=\*\*Synthès|$)/i);
      const synthèseMatch = body.match(/\*\*Synthès[^*]*\*\*[^]*/i);

      const fmt = (s: string | null) => (s || '').replace(/\*\*[^*]+\*\*\s*:?\s*/, '').replace(/\n/g, ' ').trim();

      const these    = fmt(thèseMatch   ? thèseMatch[0]   : null);
      const antithese = fmt(antithèseMatch ? antithèseMatch[0] : null);
      const synthese  = fmt(synthèseMatch ? synthèseMatch[0] : null);

      return `<div class="debate-trio">` +
        `<div class="debate-item debate-these"><div class="debate-label">🔵 Thèse</div><p>${these}</p></div>` +
        `<div class="debate-item debate-antithese"><div class="debate-label">🔴 Antithèse</div><p>${antithese}</p></div>` +
        (synthese ? `<div class="debate-item debate-synthese"><div class="debate-label">✅ Synthèse</div><p>${synthese}</p></div>` : '') +
        `</div>`;
    }

    // Format legacy : texte ||| texte
    const parts = body.split('|||');
    const claim = (parts[0] || '').trim();
    const response = (parts[1] || '').trim();
    return `<div class="debate-wrap"><div class="debate-claim"><div class="debate-label">⚡ Objection</div><p>${claim}</p></div><div class="debate-response"><div class="debate-label">✓ Réponse analytique</div><p>${response}</p></div></div>`;
  });

  // 4b. Horizontal rules
  html = html.replace(/^---$/gm, '<hr class="art-hr">');

  // 5. Headings
  html = html.replace(/^## (.+)$/gm, '<h2 class="art-h2">$1</h2>');
  html = html.replace(/^### (.+)$/gm, '<h3 class="art-h3">$1</h3>');
  html = html.replace(/^#### (.+)$/gm, '<h4 class="art-h4">$1</h4>');

  // 6. Bold **text**
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');

  // 6b. Markdown lists → <ul><li>
  html = html.replace(/((?:^- .+\n?)+)/gm, (match) => {
    const items = match.trim().split('\n')
      .filter(l => l.trim().startsWith('- '))
      .map(l => `<li>${l.replace(/^- /, '').trim()}</li>`)
      .join('');
    return `<ul>${items}</ul>`;
  });

  // 7a. Markdown tables → HTML table
  html = html.replace(/((?:^\|.+\n?)+)/gm, (match) => {
    const rows = match.trim().split('\n').filter(r => r.trim());
    const isHeader = (r: string) => /^\|\s*[-:]+\s*(\|\s*[-:]+\s*)+\|?\s*$/.test(r);
    const parseRow = (r: string) =>
      r.replace(/^\||\|$/g, '').split('|').map(c => c.trim());

    // Find separator row index
    const sepIdx = rows.findIndex(isHeader);
    if (sepIdx < 0 || rows.length < 2) return match; // not a valid table

    const headerRow = rows[sepIdx - 1] ?? rows[0];
    const dataRows = rows.filter((_, i) => i !== sepIdx && i !== (sepIdx - 1 < 0 ? -1 : sepIdx - 1));

    const ths = parseRow(headerRow).map(c => `<th>${c}</th>`).join('');
    const trs = dataRows.map(r => {
      const tds = parseRow(r).map(c => `<td>${c}</td>`).join('');
      return `<tr>${tds}</tr>`;
    }).join('\n');

    return `<div class="table-wrap"><table><thead><tr>${ths}</tr></thead><tbody>${trs}</tbody></table></div>`;
  });

  // 7. Paragraphs — wrap double-newline separated blocks
  html = html
    .split(/\n\n+/)
    .map(block => {
      block = block.trim();
      if (!block) return '';
      if (/^<(h[2-4]|blockquote|div|ul|ol|table)/.test(block)) return block;
      return `<p>${block.replace(/\n/g, ' ')}</p>`;
    })
    .join('\n');

  // 8. Clean up empty paragraphs and <p> wrapping block elements
  html = html.replace(/<p>\s*<\/p>/g, '');
  html = html.replace(/<p>(\s*<(h[2-4]|blockquote|div|ul|ol)[^>]*>)/g, '$1');
  html = html.replace(/(<\/(h[2-4]|blockquote|div|ul|ol)>)\s*<\/p>/g, '$1');

  // 9. Drop cap on first <p>
  html = html.replace(/<p>([A-ZÀ-Ü])/, '<p class="dropcap">$1');

  // Inline styles as a <style> tag
  const css = `
    .art-body {
      font-family: var(--font-body);
      font-size: 1.0625rem;
      line-height: 1.9;
      color: var(--text-primary);
      letter-spacing: 0.01em;
    }

    /* ── Drop cap ── */
    .art-body p.dropcap::first-letter {
      float: left;
      font-family: var(--font-heading);
      font-size: 4.2rem;
      line-height: 0.78;
      font-weight: 700;
      margin-right: 0.1em;
      margin-top: 0.08em;
      color: var(--accent-primary);
    }

    /* ── Paragraphs ── */
    .art-body p {
      margin: 0 0 1.65rem;
      text-align: left;
      hyphens: auto;
    }

    /* ── Headings ── */
    .art-body h2.art-h2 {
      font-family: var(--font-heading);
      font-size: 1.5rem;
      font-weight: 700;
      color: var(--text-primary);
      margin: 3.5rem 0 1.25rem;
      padding-bottom: 0.75rem;
      border-bottom: 2px solid var(--border);
      position: relative;
      text-transform: uppercase;
      letter-spacing: 0.04em;
    }
    .art-body h2.art-h2::after {
      content: '';
      position: absolute;
      bottom: -2px;
      left: 0;
      width: 48px;
      height: 2px;
      background: var(--accent-primary);
    }

    .art-body h3.art-h3 {
      font-family: var(--font-heading);
      font-size: 1.25rem;
      font-weight: 700;
      color: var(--text-primary);
      margin: 2.5rem 0 1rem;
      padding-left: 1rem;
      border-left: 3px solid var(--accent-primary);
    }

    .art-body h4.art-h4 {
      font-size: 1rem;
      font-weight: 700;
      color: var(--text-secondary);
      margin: 2rem 0 0.75rem;
      text-transform: uppercase;
      letter-spacing: 0.06em;
      font-size: 0.875rem;
    }

    /* ── Pull quote ── */
    .art-body blockquote.pull-quote {
      position: relative;
      margin: 2.5rem 0;
      padding: 1.75rem 2rem 1.75rem 2.5rem;
      border-left: 4px solid var(--accent-primary);
      background: linear-gradient(135deg, rgba(196,30,58,0.04), rgba(196,30,58,0.01));
      border-radius: 0 8px 8px 0;
    }
    .art-body blockquote.pull-quote .pq-mark {
      position: absolute;
      top: -0.2rem;
      left: 0.6rem;
      font-family: Georgia, serif;
      font-size: 3.5rem;
      line-height: 1;
      color: var(--accent-primary);
      opacity: 0.25;
      pointer-events: none;
    }
    .art-body blockquote.pull-quote p {
      font-style: italic;
      font-size: 1.0625rem;
      line-height: 1.7;
      color: var(--text-primary);
      margin: 0;
      font-weight: 500;
    }

    /* ── Callout ── */
    .art-body .callout {
      display: flex;
      gap: 14px;
      padding: 1.25rem 1.5rem;
      border-radius: 8px;
      margin: 2rem 0;
    }
    .art-body .callout.warning {
      background: rgba(245,158,11,0.08);
      border: 1px solid rgba(245,158,11,0.25);
    }
    .art-body .callout-icon {
      font-size: 1.125rem;
      color: #f59e0b;
      flex-shrink: 0;
      margin-top: 1px;
    }
    .art-body .callout-body {
      font-size: 0.9375rem;
      line-height: 1.6;
      color: var(--text-primary);
    }

    /* ── Inline stat badge ── */
    .art-body .inline-stat {
      display: inline-block;
      background: rgba(196,30,58,0.1);
      color: var(--accent-primary);
      border: 1px solid rgba(196,30,58,0.2);
      border-radius: 4px;
      padding: 1px 7px;
      font-family: var(--font-mono);
      font-size: 0.85em;
      font-weight: 700;
      vertical-align: baseline;
      margin: 0 2px;
    }

    /* ── Strong ── */
    .art-body strong {
      font-weight: 700;
      color: var(--text-primary);
    }

    /* ── Tables ── */
    .art-body .table-wrap {
      overflow-x: auto;
      margin: 2rem 0;
      border-radius: 8px;
      box-shadow: var(--shadow-sm);
    }
    .art-body table {
      width: 100%;
      min-width: 560px;
      border-collapse: collapse;
      font-size: 0.82rem;
      border-radius: 8px;
      overflow: hidden;
    }
    .art-body th {
      background: var(--accent-secondary);
      color: white;
      padding: 11px 14px;
      text-align: left;
      font-weight: 600;
      font-size: 0.8rem;
      text-transform: uppercase;
      letter-spacing: 0.04em;
    }
    .art-body td {
      padding: 10px 14px;
      border-bottom: 1px solid var(--border);
      color: var(--text-primary);
      vertical-align: top;
    }
    .art-body tr:nth-child(even) td { background: rgba(0,0,0,0.02); }
    .art-body tr:hover td { background: rgba(196,30,58,0.03); }

    /* ── Lists ── */
    .art-body ul { margin: 1.2rem 0 1.2rem 1.5rem; padding: 0; list-style: disc; }
    .art-body ul li { margin-bottom: 0.4rem; line-height: 1.7; color: var(--text-primary); }
    .art-body ul li::marker { color: var(--accent-secondary); }

    /* ── HR ── */
    .art-body .art-hr { border: none; border-top: 1px solid var(--border); margin: 2.5rem 0; }

    /* ── Debate (Objection / Réponse) ── */
    .art-body .debate-wrap {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 0;
      border: 1px solid var(--border);
      border-radius: 10px;
      overflow: hidden;
      margin: 2.5rem 0;
    }
    .art-body .debate-claim {
      padding: 1.5rem;
      background: rgba(245,158,11,0.06);
      border-right: 1px solid var(--border);
    }
    .art-body .debate-response {
      padding: 1.5rem;
      background: rgba(5,150,105,0.05);
    }
    .art-body .debate-label {
      font-size: 0.72rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      margin-bottom: 0.75rem;
    }
    .art-body .debate-claim .debate-label { color: #f59e0b; }
    .art-body .debate-response .debate-label { color: #059669; }
    .art-body .debate-claim p,
    .art-body .debate-response p {
      font-size: 0.9rem;
      line-height: 1.7;
      margin: 0;
    }
    .art-body .debate-claim p { font-style: italic; color: var(--text-secondary); }
    @media (max-width: 640px) {
      .art-body .debate-wrap { grid-template-columns: 1fr; }
      .art-body .debate-claim { border-right: none; border-bottom: 1px solid var(--border); }
    }

    /* ── Debate trio (Thèse / Antithèse / Synthèse) ── */
    .art-body .debate-trio {
      display: flex;
      flex-direction: column;
      gap: 0;
      border: 1px solid var(--border);
      border-radius: 10px;
      overflow: hidden;
      margin: 2.5rem 0;
    }
    .art-body .debate-item {
      padding: 1.25rem 1.5rem;
      border-bottom: 1px solid var(--border);
    }
    .art-body .debate-item:last-child { border-bottom: none; }
    .art-body .debate-these   { background: rgba(8,145,178,0.05); }
    .art-body .debate-antithese { background: rgba(220,38,38,0.05); }
    .art-body .debate-synthese  { background: rgba(5,150,105,0.05); }
    .art-body .debate-these   .debate-label { color: #0891B2; }
    .art-body .debate-antithese .debate-label { color: #DC2626; }
    .art-body .debate-synthese  .debate-label { color: #059669; }
    .art-body .debate-item p {
      font-size: 0.9rem;
      line-height: 1.7;
      margin: 0;
      color: var(--text-primary);
    }

    /* ── Responsive ── */
    @media (max-width: 640px) {
      .art-body { font-size: 1rem; }
      .art-body h2.art-h2 { font-size: 1.25rem; }
      .art-body h3.art-h3 { font-size: 1.1rem; }
      .art-body blockquote.pull-quote { padding: 1.25rem 1.25rem 1.25rem 1.75rem; }
      .art-body p.dropcap::first-letter { font-size: 3.2rem; }
    }
  `;

  return (
    <div className="art-body" ref={ref}>
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
}
