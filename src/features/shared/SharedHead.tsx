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
      <link rel="preconnect" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
      {children}
    </Head>
  );
}
