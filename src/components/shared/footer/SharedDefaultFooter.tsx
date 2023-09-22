import { SharedGridItem } from '../grid/SharedGridItem';
import { SharedCardSocialNetworks } from '../cards/SharedCardSocialNetworks';
import { MainGridContainer } from '@/components/MainDrawer/MainGridContainer';
import { Divider, Typography, useMediaQuery, useTheme } from '@mui/material';
import { SharedButton } from '../form/SharedButton';
import { mainDrawerItems } from '@/constants/mainDrawerItems';
import { SharedCopyright } from './SharedCopyright';
import { MainDrawerItem } from '@/components/MainDrawer/MainDrawer';
import { DocumentSocialNetwork } from '@/models/socialNetworks';
import { ThemeType } from '@/themes/sharedThemeDefault';
import { useMemo } from 'react';
import { useDevices } from '@/hooks/useDevices';

interface SharedDefaultFooterProps {
  themeType?: ThemeType;
  companyName?: string;
  socialNetworks?: DocumentSocialNetwork[];
  onLegalAndPoliciesClick?: () => void;
  onMenuLinkClick?: (link: MainDrawerItem) => void;
  onSocialNetworkClick?: (socialNetwork: DocumentSocialNetwork) => void;
}

export function SharedDefaultFooter(props: SharedDefaultFooterProps) {
  const { themeType, socialNetworks, companyName = 'Seven Arch', onLegalAndPoliciesClick, onMenuLinkClick, onSocialNetworkClick } = props;
  const { isDesktop, isMobile } = useDevices();
  const color = useMemo(() => {
    if (themeType === 'transparentDark') return 'white';
    return 'inherit';
  }, [themeType]);

  return (
    <MainGridContainer centerX={false} style={{ paddingBottom: '50px' }}>
      <Divider style={{ borderColor: color, width: 'calc(100% - 24px)', borderStyle: 'dashed', marginLeft: '24px' }} />
      <SharedGridItem xs={12} sm={6} centerText={isMobile}>
        <Typography fontSize={'25px'} fontWeight={500} color={color}>
          {companyName}
        </Typography>
      </SharedGridItem>

      <SharedGridItem xs={12} sm={6}>
        <SharedCardSocialNetworks
          socialNetworks={socialNetworks}
          containerProps={{ style: { textAlign: isDesktop ? 'end' : 'center' } }}
          btnsProps={{ style: { color: color } }}
          onClick={onSocialNetworkClick}
        />
      </SharedGridItem>

      <SharedGridItem xs={12} sm={6} centerText={isMobile}>
        {mainDrawerItems.map((link) => (
          <SharedButton style={{ color: color, marginRight: '10px' }} btnType={'Link'} key={link.id} onClick={() => onMenuLinkClick?.(link)}>
            {link.label}
          </SharedButton>
        ))}
      </SharedGridItem>

      <SharedGridItem xs={12} sm={6}>
        <SharedCopyright style={{ textAlign: isDesktop ? 'end' : 'center', color }} companyName={companyName} onLegalAndPoliciesClick={onLegalAndPoliciesClick} />
      </SharedGridItem>
    </MainGridContainer>
  );
}
