import Typography, { TypographyProps } from '@mui/material/Typography';
import { ReactNode } from 'react';

export interface SharedHeadingProps extends TypographyProps {
  readonly text?: string;
  readonly level: 1 | 2 | 3 | 4 | 5 | 6;
  readonly color?: string;
  readonly children?: ReactNode;
}

export function SharedHeading({ level, text, children, color = 'text.primary', ...rest }: SharedHeadingProps) {
  return (
    <Typography variant={`h${level}`} color={color} {...rest}>
      {children || text}
    </Typography>
  );
}
