import { ReactNode, Fragment } from 'react';
import { ReactComponent } from '@/models/generalModels';

export function SharedIf({ children, RIf, If, Fallback, Else }: { children: ReactNode; RIf?: boolean | undefined; If?: any; Fallback?: ReactComponent; Else?: ReactComponent }) {
  const ifValue = Boolean(If) || RIf; // RIf is deprecated, do not use it anymore !!

  return (
    <Fragment>
      {ifValue ? children : null}
      {!ifValue && Else && <Else />}
      {!ifValue && !Else && Fallback && <Fallback />} {/* Fallback is deprecated, do not use it anymore !! */}
    </Fragment>
  );
}
