import { Button, Link as MuiLink } from '@mui/material';
import Link from 'next/link';
import { Fragment, ReactNode } from 'react';
import { SharedIf } from './SharedIf';

interface SharedLinkProps {
  readonly children?: ReactNode;
  readonly label?: string;
  readonly type?: 'button' | 'link';
  readonly href?: string;
  readonly color?: 'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning';
  readonly sx?: Record<string, unknown>;
}

export function SharedLink({ children, label, href, type = 'button', color = 'inherit', sx = {} }: SharedLinkProps) {
  return (
    <Fragment>
      <SharedIf RIf={type === 'button'}>
        <Button color={color} href={href} LinkComponent={Link} variant="outlined" sx={{ my: 1, mr: 1.5, ...sx }}>
          {children ? children : label}
        </Button>
      </SharedIf>

      <SharedIf RIf={type === 'link'}>
        <MuiLink color={color} href={href} component={Link as any} sx={{ p: 1, flexShrink: 0, ...sx }}>
          {children ? children : label}
        </MuiLink>
      </SharedIf>
    </Fragment>
  );
}
