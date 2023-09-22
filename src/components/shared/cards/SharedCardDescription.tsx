import { Typography } from '@mui/material';
import { MainGridContainer } from '@/components/MainDrawer/MainGridContainer';
import { SharedGridItem } from '../grid/SharedGridItem';
import { FeatureFontSize, FeatureTextAlign } from '@/models/articleModels';
import { useMemo } from 'react';
import classes from '@/components/MainArticle/MainArticle.module.scss';

export interface SharedCardDescriptionProps {
  readonly text: string;
  readonly align?: FeatureTextAlign;
  readonly fontSize?: FeatureFontSize;
}

export function SharedCardDescription({ text, align, fontSize = 'normal' }: SharedCardDescriptionProps) {
  const styles = useMemo(() => ({ overflow: 'auto', backgroundColor: '#333', height: '100%', width: '100%', margin: 0, padding: '24px' }), []);

  return (
    <MainGridContainer centerX={false} centerY={false} style={styles}>
      <MainGridContainer spacing={0} sx={{ margin: 'auto auto auto auto' }}>
        <SharedGridItem centerText xs={12}>
          <Typography fontWeight={500} color="white" align={align} className={classes[`sharedArticle__font_${fontSize ?? 'normal'}`]}>
            {text}
          </Typography>
        </SharedGridItem>
      </MainGridContainer>
    </MainGridContainer>
  );
}
