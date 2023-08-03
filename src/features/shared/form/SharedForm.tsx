import { FormEvent, ReactNode, useRef } from 'react';
import { SharedGridContainer } from '../SharedDrawer/SharedGridContainer';
import { SharedIf } from '../SharedIf';
import { convertFormDataToObject } from '@/utils/formUtils';

export interface SharedFormProps {
  onSubmit?: () => void;
  validation?: boolean;
  children?: ReactNode;
  grid?: boolean;
}

export function SharedForm({ onSubmit, children, validation = true, grid = true }: SharedFormProps) {
  const formRef = useRef<HTMLFormElement>(null);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (validation && formRef.current && !formRef.current.checkValidity()) return;

    const data = new FormData(event.currentTarget);

    console.log('data', convertFormDataToObject(data));
    onSubmit?.();
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit}>
      <SharedIf RIf={grid} Fallback={() => <>{children}</>}>
        <SharedGridContainer centerX column spacing={3} mt={0} mb={0}>
          {children}
        </SharedGridContainer>
      </SharedIf>
    </form>
  );
}
