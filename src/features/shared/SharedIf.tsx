import { ReactNode, Fragment } from 'react';

export function SharedIf({ children, RIf, Fallback }: { children: ReactNode; RIf: boolean | undefined; Fallback?: () => JSX.Element }) {
  return (
    <Fragment>
      {RIf ? children : null}
      {!RIf && Fallback && <Fallback />}
    </Fragment>
  );
}
