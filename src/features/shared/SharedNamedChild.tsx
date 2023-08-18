import { ReactNode, Fragment } from 'react';

export function SharedNamedChild({ children }: { children: ReactNode; name: string }) {
  return <Fragment>{children}</Fragment>;
}
