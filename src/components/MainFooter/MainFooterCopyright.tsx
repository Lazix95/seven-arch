import { ReactElement } from 'react';
import Typography, { TypographyProps } from '@mui/material/Typography';
import { SharedButton } from '../shared/form/SharedButton';

export interface MainFooterCopyrightProps extends TypographyProps {
  companyName?: string;
  onLegalAndPoliciesClick?: () => void;
}

export function MainFooterCopyright({ onLegalAndPoliciesClick, companyName, ...rest }: MainFooterCopyrightProps): ReactElement {
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
