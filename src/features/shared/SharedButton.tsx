import { Button, IconButton, IconButtonProps, ButtonProps } from '@mui/material';
import { LoadingButton, LoadingButtonProps } from '@mui/lab';
import { ReactNode } from 'react';

interface SharedButtonBase {
  children?: ReactNode;
  submit?: boolean;
}

interface SharedButtonIconProps extends IconButtonProps, SharedButtonBase {
  btnType?: 'Icon';
}

interface SharedButtonProps extends ButtonProps, SharedButtonBase {
  btnType?: 'Button';
}

interface SharedLoadingButtonProps extends LoadingButtonProps, SharedButtonBase {
  btnType?: 'LoadingButton';
}

export function SharedButton(props: SharedButtonProps | SharedLoadingButtonProps | SharedButtonIconProps) {
  const { children, submit, btnType = 'Button', ...rest } = props;

  const optionals: any = {
    ...(submit && { type: 'submit' }),
  };

  if (btnType === 'Icon') {
    return (
      <IconButton {...optionals} color="inherit" {...rest}>
        {children}
      </IconButton>
    );
  }

  if (btnType === 'Button') {
    return (
      <Button variant={'contained'} {...optionals} {...(rest as ButtonProps)}>
        {children}
      </Button>
    );
  }

  if (btnType === 'LoadingButton') {
    return (
      <LoadingButton {...optionals} variant={'contained'} {...(rest as ButtonProps)}>
        {children}
      </LoadingButton>
    );
  }
}
