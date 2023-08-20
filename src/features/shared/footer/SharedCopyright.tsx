import { ReactElement } from 'react';
import Typography, { TypographyProps } from '@mui/material/Typography';
import { SharedButton } from '../SharedButton';

export interface SharedCopyrightProps extends TypographyProps {
  onLegalAndPoliciesClick?: () => void;
}

export function SharedCopyright({ onLegalAndPoliciesClick, ...rest }: SharedCopyrightProps): ReactElement {
  return (
    <Typography variant="body2" color="text.secondary" {...rest}>
      <SharedButton btnType={'Link'} onClick={onLegalAndPoliciesClick}>
        Legal and policies
      </SharedButton>
      <span> © {new Date().getFullYear()} Seven Arch. All Rights Reserved.</span>
    </Typography>
  );
}
