import { Grid, GridProps } from '@mui/material';

type CustomPops = {
  centerText?: boolean;
  readonly paddingTop?: number | string;
  readonly paddingLeft?: number | string;
};

export type SharedGridItemProps = CustomPops & GridProps;

interface Optionals {
  readonly textAlign?: 'center';
}

export function SharedGridItem({ children, centerText, paddingTop = 0, paddingLeft = 0, ...rest }: SharedGridItemProps) {
  const optionals: Optionals = {
    ...(centerText && { textAlign: 'center' }),
  };

  return (
    <Grid item xs={'auto'} {...rest} {...optionals} style={{ paddingLeft, paddingTop, ...rest.style }}>
      {children}
    </Grid>
  );
}
