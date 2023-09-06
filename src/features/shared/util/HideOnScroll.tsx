import { Slide, useScrollTrigger } from '@mui/material';
import { ReactNode } from 'react';

export function HideOnScroll({ children }: { children: ReactNode }) {
  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children as any}
    </Slide>
  );
}
