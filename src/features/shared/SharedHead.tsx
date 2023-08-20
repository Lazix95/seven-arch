import Head from 'next/head';
import { ReactNode } from 'react';

interface SharedHeadProps {
  title: string;
  children?: ReactNode;
}

export function SharedHead({ title, children }: SharedHeadProps) {
  return (
    <Head>
      <title>{title}</title>
      {children}
    </Head>
  );
}
