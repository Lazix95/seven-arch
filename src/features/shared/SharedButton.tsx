import { Button, IconButton, IconButtonProps, ButtonProps } from '@mui/material';
import { LoadingButton, LoadingButtonProps } from '@mui/lab';
import { ReactNode } from 'react';

interface SharedButtonIconProps extends IconButtonProps {
  btnType?: 'Icon';
  children?: ReactNode;
}

interface SharedButtonProps extends ButtonProps {
  btnType?: 'Button';
  children?: ReactNode;
}

interface SharedLoadingButtonProps extends LoadingButtonProps {
  btnType?: 'LoadingButton';
  children?: ReactNode;
}

export function SharedButton(props: SharedButtonProps | SharedLoadingButtonProps | SharedButtonIconProps) {
  const { children, btnType = 'Button', ...rest } = props;

  if (btnType === 'Icon') {
    return (
      <IconButton color="inherit" {...rest}>
        {children}
      </IconButton>
    );
  }

  if (btnType === 'Button') {
    return (
      <Button variant={'contained'} {...(rest as ButtonProps)}>
        {children}
      </Button>
    );
  }

  if (btnType === 'LoadingButton') {
    return (
      <LoadingButton variant={'contained'} {...(rest as ButtonProps)}>
        {children}
      </LoadingButton>
    );
  }
}
