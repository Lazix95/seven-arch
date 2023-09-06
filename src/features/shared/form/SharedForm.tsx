import { ReactNode, useMemo, useRef } from 'react';
import { SharedGridContainer } from '../SharedDrawer/SharedGridContainer';
import { SharedIf } from '../util/SharedIf';
import { SharedCircularLoader } from './../loaders/SharedCircularLoader';

export interface SharedFormProps {
  validation?: boolean;
  children?: ReactNode;
  grid?: boolean;
  isLoading?: boolean;
  spacing?: number;
  onSubmit?: () => void;
}

export function SharedForm({ children, validation = true, grid = true, isLoading, spacing = 3, onSubmit }: SharedFormProps) {
  const formRef = useRef<HTMLFormElement>(null);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // if (validation && formRef.current && !formRef.current.checkValidity()) return;
    onSubmit?.();
  }

  if (isLoading) return <SharedCircularLoader />;
  return (
    <form ref={formRef} onSubmit={handleSubmit}>
      <SharedIf RIf={grid}>
        <SharedGridContainer centerX column spacing={spacing} mt={0} mb={5}>
          {children}
        </SharedGridContainer>
      </SharedIf>

      <SharedIf If={!grid}>
        <div className={'u-mb--6'}>{children}</div>
      </SharedIf>
    </form>
  );
}
