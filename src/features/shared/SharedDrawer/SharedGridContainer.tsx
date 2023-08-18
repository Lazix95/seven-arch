import { ReactNode } from 'react';
import Grid from '@mui/material/Grid';
import { GridProps } from '@mui/material';

type CustomGridContainerProps = {
  readonly children: ReactNode;
  readonly centerX?: boolean;
  readonly centerY?: boolean;
  readonly column?: boolean;
};

type SharedGridContainerProps = CustomGridContainerProps & GridProps;

interface Optionals {
  justifyContent?: string;
  alignItems?: string;
  direction?: 'column';
}

export function SharedGridContainer({ children, centerX = true, centerY, column, spacing = 3, mt = 0, mb = 3, ...rest }: SharedGridContainerProps) {
  const optionals: Optionals = {
    ...(centerX && { justifyContent: 'center' }),
    ...(centerY && { alignItems: 'center' }),
    ...(column && { direction: 'column' }),
  };

  return (
    <Grid container spacing={spacing} mt={mt} mb={mb} {...rest} {...optionals}>
      {children}
    </Grid>
  );
}
