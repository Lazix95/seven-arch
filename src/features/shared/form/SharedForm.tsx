import { ReactNode, useRef } from 'react';
import { SharedGridContainer } from '../SharedDrawer/SharedGridContainer';
import { SharedIf } from '../SharedIf';
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
    if (validation && formRef.current && !formRef.current.checkValidity()) return;

    const data = new FormData(event.currentTarget);

    onSubmit?.();
  }

  if (isLoading) return <SharedCircularLoader />;

  return (
    <form ref={formRef} onSubmit={handleSubmit}>
      <SharedIf RIf={grid} Fallback={() => <>{children}</>}>
        <SharedGridContainer style={{ width: '100%' }} centerX column spacing={spacing} mt={0} mb={5}>
          {children}
        </SharedGridContainer>
      </SharedIf>
    </form>
  );
}
