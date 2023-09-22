import Head from 'next/head';
import { ReactNode } from 'react';

interface SharedHeadProps {
  title: string;
  children?: ReactNode;
  preloadImageUrls?: (string | null | undefined)[];
}

export function SharedHead({ title, preloadImageUrls, children }: SharedHeadProps) {
  return (
    <Head>
      {preloadImageUrls?.filter(Boolean).map((imageUrl) => <link rel="prefetch" href={imageUrl || ''} key={imageUrl} />)}
      <title>{title}</title>
      {children}
    </Head>
  );
}
