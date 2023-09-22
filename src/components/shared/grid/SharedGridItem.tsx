import { Grid, GridProps } from '@mui/material';

type CustomPops = {
  centerText?: boolean;
  readonly paddingTop?: number | string;
  readonly paddingLeft?: number | string;
  readonly fullSize?: boolean;
};

export type SharedGridItemProps = CustomPops & GridProps;

interface Optionals {
  readonly textAlign?: 'center';
}

export function SharedGridItem({ children, centerText, paddingTop, paddingLeft, fullSize, ...rest }: SharedGridItemProps) {
  const optionals: Optionals = {
    ...(centerText && { textAlign: 'center' }),
    ...(fullSize && { width: '100%', height: '100%' }),
  };

  const styleOptionals = {
    ...((paddingTop || paddingTop === 0) && { paddingTop }),
    ...((paddingLeft || paddingLeft === 0) && { paddingLeft }),
  };

  return (
    <Grid item xs={'auto'} {...rest} {...optionals} style={{ ...styleOptionals, ...rest.style }}>
      {children}
    </Grid>
  );
}
