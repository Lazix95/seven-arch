import { Button, IconButton, IconButtonProps, ButtonProps, Link } from '@mui/material';
import { LoadingButton, LoadingButtonProps } from '@mui/lab';
import { ReactNode } from 'react';

interface SharedButtonBase {
  children?: ReactNode;
  submit?: boolean;
}

export interface SharedButtonIconProps extends IconButtonProps, SharedButtonBase {
  btnType: 'Icon';
}

export interface SharedButtonProps extends ButtonProps, SharedButtonBase {
  btnType?: 'Button';
}

export interface SharedLoadingButtonProps extends LoadingButtonProps, SharedButtonBase {
  btnType: 'LoadingButton';
}

export interface SharedLinkButtonProps extends ButtonProps, SharedButtonBase {
  btnType: 'Link';
}

export function SharedButton(props: SharedButtonProps | SharedLoadingButtonProps | SharedButtonIconProps | SharedLinkButtonProps) {
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
      <Button variant={'contained'} {...optionals} {...rest}>
        {children}
      </Button>
    );
  }

  if (btnType === 'LoadingButton') {
    return (
      <LoadingButton {...optionals} variant={'contained'} {...rest}>
        {children}
      </LoadingButton>
    );
  }

  if (btnType === 'Link') {
    return (
      <Link underline={'none'} component={'button'} {...optionals} {...rest}>
        {children}
      </Link>
    );
  }
}
