import { ReactNode, useMemo } from 'react';
import { ReactComponent } from '@/models/generalModels';

interface SharedIfProps {
  children: ReactNode;
  RIf?: boolean | undefined;
  If?: any;
  Fallback?: ReactComponent;
  Else?: ReactComponent;
}

export function SharedIf({ children, RIf, If, Fallback, Else }: SharedIfProps) {
  const ifValue = Boolean(If) || RIf; // RIf is deprecated, do not use it anymore !!

  return useMemo(() => {
    if (ifValue) return children;
    if (!ifValue && Else) return <Else />;
    if (!ifValue && !Else && Fallback) return <Fallback />; // Fallback is deprecated, do not use it anymore !!
  }, [Else, Fallback, children, ifValue]);
}
