'use client';

import dynamic from 'next/dynamic';
import type { ArticleChart } from '@/lib/chartData';

const ArticleCharts = dynamic(() => import('@/components/ArticleCharts'), { ssr: false });

export default function ClientChartsWrapper({ chart }: { chart: ArticleChart }) {
  return <ArticleCharts chart={chart} />;
}
