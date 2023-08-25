import { SharedFirebaseImage } from '@/features/firebase/components/FirebaseImage/SharedFirebaseImage';
import { SharedGridContainer } from '../SharedDrawer/SharedGridContainer';
import { SharedGridItem } from '../grid/SharedGridItem';
import { SharedHeading } from '../SharedHeading';
import { useMemo } from 'react';
import { SharedIf } from '../SharedIf';
import { Hidden } from '@mui/material';
import styles from './SharedArticle.module.scss';
import { Article } from '@/models/articleModels';
import { SharedCardSubscribeToNewsTeller } from '@/features/shared/cards/SharedCardSubscribeToNewsTeller';
import { SharedCardDescription } from '@/features/shared/cards/SharedCardDescription';

export interface SharedArticleProps {
  readonly article?: Article;
  readonly onSubscribe?: (email: string) => void;
}

export const SharedArticleChildrenNames = {
  description: 'description',
} as const;

export function SharedArticle({ article, onSubscribe }: SharedArticleProps) {
  const imageWidth = useMemo(() => {
    if (article && article.size == 'large' && !article.feature) return 12;
    return 8;
  }, [article]);

  return (
    <SharedIf If={!!article}>
      <SharedGridContainer spacing={2}>
        <SharedGridItem xs={12}>
          <SharedHeading fontWeight={500} color={'white'} level={4}>
            {article?.title || ''}
          </SharedHeading>
        </SharedGridItem>

        <SharedGridItem xs={12} sm={12} md={imageWidth} className={styles.sharedArticle__height}>
          <SharedFirebaseImage url={article?.imageUrl} text={article?.content} />
        </SharedGridItem>

        <Hidden mdDown>
          <SharedIf If={!!article?.feature && article.feature.type === 'newsTeller'}>
            <SharedGridItem xs={4} className={styles.sharedArticle__height}>
              <SharedCardSubscribeToNewsTeller text={article?.feature?.content || ''} btnText={'Subscribe'} onSubscribe={onSubscribe} />
            </SharedGridItem>
          </SharedIf>
        </Hidden>

        <Hidden mdDown>
          <SharedIf If={!!article?.feature && article.feature.type === 'description'}>
            <SharedGridItem xs={4} className={styles.sharedArticle__height}>
              <SharedCardDescription text={article?.feature?.content || ''} />
            </SharedGridItem>
          </SharedIf>
        </Hidden>
      </SharedGridContainer>
    </SharedIf>
  );
}
