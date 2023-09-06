import { Typography } from '@mui/material';
import { SharedGridContainer } from '../SharedDrawer/SharedGridContainer';
import { SharedGridItem } from '../grid/SharedGridItem';
import { FeatureFontSize, FeatureTextAlign } from '@/models/articleModels';
import { useMemo } from 'react';
import classes from '@/features/shared/SharedArticle/SharedArticle.module.scss';

export interface SharedCardDescriptionProps {
  readonly text: string;
  readonly align?: FeatureTextAlign;
  readonly fontSize?: FeatureFontSize;
}

export function SharedCardDescription({ text, align, fontSize = 'normal' }: SharedCardDescriptionProps) {
  const styles = useMemo(() => ({ overflow: 'auto', backgroundColor: '#333', height: '100%', width: '100%', margin: 0, padding: '24px' }), []);

  return (
    <SharedGridContainer centerX={false} centerY={false} style={styles}>
      <SharedGridContainer spacing={0} sx={{ margin: 'auto auto auto auto' }}>
        <SharedGridItem centerText xs={12}>
          <Typography fontWeight={500} color="white" align={align} className={classes[`sharedArticle__font_${fontSize ?? 'normal'}`]}>
            {text}
          </Typography>
        </SharedGridItem>
      </SharedGridContainer>
    </SharedGridContainer>
  );
}
