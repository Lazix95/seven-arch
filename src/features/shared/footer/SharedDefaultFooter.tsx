import { SharedGridItem } from '../grid/SharedGridItem';
import { SharedCardSocialNetworks } from '../cards/SharedCardSocialNetworks';
import { SharedGridContainer } from '../SharedDrawer/SharedGridContainer';
import { Divider, Typography, useTheme } from '@mui/material';
import { SharedButton } from '../SharedButton';
import { mainDrawerItems } from '@/constants/mainDrawerItems';
import { SharedCopyright } from './SharedCopyright';
import { SharedDrawerItem } from '../SharedDrawer/SharedDrawer';
import { SocialNetwork } from '@/models/generalModels';
import { ThemeType } from '@/themes/sharedThemeDefault';
import { useMemo } from 'react';

interface SharedDefaultFooterProps {
  themeType?: ThemeType;
  companyName?: string;
  onLegalAndPoliciesClick?: () => void;
  onMenuLinkClick?: (link: SharedDrawerItem) => void;
  onSocialNetworkClick?: (socialNetwork: SocialNetwork) => void;
}

export function SharedDefaultFooter({ themeType, companyName = 'Seven Arch', onLegalAndPoliciesClick, onMenuLinkClick, onSocialNetworkClick }: SharedDefaultFooterProps) {
  const color = useMemo(() => {
    if (themeType === 'transparentDark') return 'white';
    return 'inherit';
  }, [themeType]);

  return (
    <SharedGridContainer centerX={false} style={{ paddingBottom: '50px' }}>
      <Divider style={{ borderColor: color, width: 'calc(100% - 24px)', borderStyle: 'dashed', marginLeft: '24px' }} />
      <SharedGridItem xs={6}>
        <Typography fontSize={'25px'} fontWeight={500} color={color}>
          {companyName}
        </Typography>
      </SharedGridItem>

      <SharedGridItem xs={6}>
        <SharedCardSocialNetworks containerProps={{ style: { textAlign: 'end' } }} btnsProps={{ style: { color: color } }} onClick={onSocialNetworkClick} />
      </SharedGridItem>

      <SharedGridItem xs={6}>
        {mainDrawerItems.map((link) => (
          <SharedButton style={{ color: color, marginRight: '10px' }} btnType={'Link'} key={link.id} onClick={() => onMenuLinkClick?.(link)}>
            {link.label}
          </SharedButton>
        ))}
      </SharedGridItem>

      <SharedGridItem xs={6}>
        <SharedCopyright style={{ textAlign: 'end', color }} onLegalAndPoliciesClick={onLegalAndPoliciesClick} />
      </SharedGridItem>
    </SharedGridContainer>
  );
}
