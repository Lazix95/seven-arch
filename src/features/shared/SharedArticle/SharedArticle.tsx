import { SharedFirebaseImage } from '@/features/firebase/components/FirebaseImage/SharedFirebaseImage';
import { SharedGridContainer } from '../SharedDrawer/SharedGridContainer';
import { SharedGridItem } from '../grid/SharedGridItem';
import { SharedHeading } from '../text/SharedHeading';
import { useEffect, useMemo, useRef, useState } from 'react';
import { SharedIf } from '../util/SharedIf';
import { Fade, Hidden } from '@mui/material';
import classes from './SharedArticle.module.scss';
import { Article, SubArticle } from '@/models/articleModels';
import { SharedCardSubscribeToNewsTeller } from '@/features/shared/cards/SharedCardSubscribeToNewsTeller';
import { SharedCardDescription } from '@/features/shared/cards/SharedCardDescription';
import clsx from 'clsx';

export interface SharedArticleProps {
  readonly article: Article;
  readonly onArticleCLick?: (article: Article) => void;
  readonly onSubArticleClick?: (article: SubArticle) => void;
  readonly onSubscribe?: (email: string) => void;
}

export function SharedArticle({ article, onSubscribe, onArticleCLick, onSubArticleClick }: SharedArticleProps) {
  const [isShown, setIsShown] = useState(false);
  const imageWidth = useMemo(() => {
    // && (!article.subArticles || article.subArticles.length === 0)
    if (article && article.size == 'large' && !article.feature) return 12;
    return 8;
  }, [article]);

  const targetRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const options = {
      root: null, // Use the viewport as the root
      rootMargin: '0px', // No margin
      threshold: 0, // Trigger when 50% of the element is visible
    };

    const callback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsShown(true);
          console.log('in the view port');
          // Element is in the viewport
          console.log('Element is visible');
          // Perform your desired actions here
        }
      });
    };

    const observer = new IntersectionObserver(callback, options);

    if (targetRef.current) {
      observer.observe(targetRef.current);
    }

    return () => {
      if (targetRef.current) {
        observer.unobserve(targetRef.current);
      }
    };
  }, []);

  return (
    <SharedIf If={!!article}>
      <div ref={targetRef}>
        <Fade in={isShown} timeout={1000}>
          <div>
            <SharedGridContainer spacing={2} centerX={false}>
              <SharedGridItem xs={12}>
                <SharedHeading fontWeight={500} color={'white'} level={4}>
                  {article?.title || ''}
                </SharedHeading>
              </SharedGridItem>

              <SharedGridItem xs={12} sm={6} md={imageWidth} xl={imageWidth < 12 ? 9 : 12} className={classes['sharedArticle__height']}>
                <SharedFirebaseImage url={article.imageExternalUrl ?? article.image?.url} text={article?.content} onClick={() => onArticleCLick?.(article)} />
              </SharedGridItem>

              <Hidden mdDown>
                <SharedIf If={!!article?.feature && article.feature.type === 'newsTeller'}>
                  <SharedGridItem xs={6} sm={4} xl={3} className={clsx(classes.sharedArticle__height)}>
                    <SharedCardSubscribeToNewsTeller
                      containerProps={{ className: `u-overflow__auto` }}
                      text={article?.feature?.content || ''}
                      btnText={'Subscribe'}
                      align={article?.feature?.align}
                      fontSize={article.feature?.fontSize}
                      onSubscribe={onSubscribe}
                    />
                  </SharedGridItem>
                </SharedIf>
              </Hidden>

              <Hidden mdDown>
                <SharedIf If={!!article?.feature && article.feature.type === 'description'}>
                  <SharedGridItem xs={6} sm={4} xl={3} className={`${classes.sharedArticle__height} u-overflow__auto`}>
                    <SharedCardDescription text={article?.feature?.content || ''} align={article?.feature?.align} fontSize={article.feature?.fontSize} />
                  </SharedGridItem>
                </SharedIf>
              </Hidden>

              <Hidden smDown>
                <SharedIf If={!!article?.subArticles && article.subArticles.length > 0}>
                  {article?.subArticles?.map((subArticle) => (
                    <SharedGridItem key={subArticle.id} xs={6} sm={6} md={4} xl={3} className={classes.sharedArticle__height}>
                      <SharedFirebaseImage url={subArticle.imageExternalUrl ?? subArticle.image?.url} text={subArticle.content} onClick={() => onSubArticleClick?.(subArticle)} />
                    </SharedGridItem>
                  ))}
                </SharedIf>
              </Hidden>
            </SharedGridContainer>
          </div>
        </Fade>
      </div>
    </SharedIf>
  );
}
