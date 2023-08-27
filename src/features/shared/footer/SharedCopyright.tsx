import { ReactElement } from 'react';
import Typography, { TypographyProps } from '@mui/material/Typography';
import { SharedButton } from '../SharedButton';

export interface SharedCopyrightProps extends TypographyProps {
  companyName?: string;
  onLegalAndPoliciesClick?: () => void;
}

export function SharedCopyright({ onLegalAndPoliciesClick, companyName, ...rest }: SharedCopyrightProps): ReactElement {
  return (
    <Typography variant="body2" color="text.secondary" {...rest}>
      <SharedButton btnType={'Link'} onClick={onLegalAndPoliciesClick}>
        Legal and policies
      </SharedButton>
      <span>
        {' '}
        © {new Date().getFullYear()} {companyName}. All Rights Reserved.
      </span>
    </Typography>
  );
}
