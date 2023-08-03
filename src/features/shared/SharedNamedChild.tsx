import { ReactNode, Fragment } from 'react';

export function SharedNamedChild({ children }: { children: ReactNode; name: string }) {
  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <Fragment>{children}</Fragment>;
}
