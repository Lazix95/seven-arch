import { Typography } from '@mui/material';
import { SharedButton } from '../form/SharedButton';
import { MainGridContainer, MainGridContainerProps } from '@/components/MainDrawer/MainGridContainer';
import { SharedTextField } from '../form/SharedTextField';
import { SharedGridItem } from '../grid/SharedGridItem';
import { useMemo, useState } from 'react';
import { FeatureFontSize, FeatureTextAlign } from '@/models/articleModels';
import classes from '@/components/MainArticle/MainArticle.module.scss';

export interface SharedCardSubscribeToNewstellerProps {
  readonly text: string;
  readonly btnText: string;
  readonly onSubscribe?: (email: string) => void;
  readonly align?: FeatureTextAlign;
  readonly fontSize?: FeatureFontSize;
  readonly containerProps?: Omit<MainGridContainerProps, 'children'>;
}

export function SharedCardSubscribeToNewsTeller({
  text,
  btnText,
  onSubscribe,
  containerProps,
  align,
  fontSize = 'normal',
}: SharedCardSubscribeToNewstellerProps) {
  const [email, setEmail] = useState('');
  const styles = useMemo(() => ({ backgroundColor: '#333', height: '100%', width: '100%', margin: 0, padding: '24px' }), []);

  function handleSubscribeClick() {
    onSubscribe?.(email);
  }

  return (
    <MainGridContainer centerX={false} centerY={false} sx={styles} {...containerProps}>
      <MainGridContainer spacing={0} sx={{ margin: 'auto auto auto auto' }}>
        <SharedGridItem mb={2} xs={12}>
          <Typography fontWeight={500} color="white" align={align} className={classes[`sharedArticle__font_${fontSize ?? 'normal'}`]}>
            {text}
          </Typography>
        </SharedGridItem>

        <SharedGridItem xs={12}>
          <SharedTextField label={'Email'} onChange={(e) => setEmail(e.target.value)} />
        </SharedGridItem>

        <SharedGridItem xs={12}>
          <SharedButton onClick={handleSubscribeClick} fullWidth>
            {btnText}
          </SharedButton>
        </SharedGridItem>
      </MainGridContainer>
    </MainGridContainer>
  );
}
