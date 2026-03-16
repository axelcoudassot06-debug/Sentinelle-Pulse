'use client';

import { usePathname } from 'next/navigation';

interface JsonLdProps {
  data: Record<string, unknown>;
}

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function useJsonLd(data: Record<string, unknown>) {
  const pathname = usePathname();
  return <JsonLd key={pathname} data={data} />;
}
