import { SharedFirebaseImage } from '@/features/firebase/components/FirebaseImage/SharedFirebaseImage';
import { MainGridContainer } from '@/components/MainDrawer/MainGridContainer';
import { SharedGridItem } from '../shared/grid/SharedGridItem';
import { SharedHeading } from '../shared/text/SharedHeading';
import { useEffect, useMemo, useRef, useState } from 'react';
import { SharedIf } from '../shared/util/SharedIf';
import { Fade, Hidden } from '@mui/material';
import classes from './MainArticle.module.scss';
import { Article, SubArticle } from '@/models/articleModels';
import { SharedCardSubscribeToNewsTeller } from '@/components/shared/cards/SharedCardSubscribeToNewsTeller';
import { SharedCardDescription } from '@/components/shared/cards/SharedCardDescription';
import clsx from 'clsx';
import Slider, { Settings } from 'react-slick';
import { SharedButton } from '@/components/shared/form/SharedButton';
import { func } from 'prop-types';
import { ArrowBackIcon, ArrowForwardIcon } from '@/components/shared/icons/materialUiIcons';

export interface MainArticleProps {
  readonly article: Article;
  readonly onArticleCLick?: (article: Article) => void;
  readonly onSubArticleClick?: (article: SubArticle) => void;
  readonly onSubscribe?: (email: string) => void;
}

const settings: Settings = {
  lazyLoad: 'progressive',
  dots: false,
  infinite: true,
  speed: 500,
  adaptiveHeight: true,
  arrows: false,
  autoplay: false,
};

export function MainArticle({ article, onSubscribe, onArticleCLick, onSubArticleClick }: MainArticleProps) {
  const [isShown, setIsShown] = useState(false);
  const imageWidth = useMemo(() => {
    // && (!article.subArticles || article.subArticles.length === 0)
    if (article && article.size == 'large' && !article.feature) return 12;
    return 8;
  }, [article]);
  const targetRef = useRef<HTMLDivElement | null>(null);
  const sliderRef = useRef<Slider | null>(null);

  function handleGoNext() {
    sliderRef.current?.slickNext();
  }

  function handleGoPrev() {
    sliderRef.current?.slickPrev();
  }

  useEffect(() => {
    const targetRefCurrent = targetRef.current;
    if (!targetRefCurrent) return;
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0,
    };

    const callback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsShown(true);
        }
      });
    };

    const observer = new IntersectionObserver(callback, options);

    if (targetRef.current) {
      observer.observe(targetRefCurrent);
    }

    return () => {
      if (targetRefCurrent) observer.unobserve(targetRefCurrent);
    };
  }, []);

  return (
    <SharedIf If={!!article}>
      <div ref={targetRef} className={classes.sharedArticle}>
        <Fade in={isShown} timeout={1000}>
          <div>
            <MainGridContainer spacing={2} centerX={false}>
              <SharedGridItem xs={12}>
                <SharedHeading className={classes.sharedArticle__heading} fontWeight={500} color={'white'} level={4}>
                  {article?.title || ''}
                </SharedHeading>
              </SharedGridItem>

              <Hidden smDown>
                <SharedGridItem xs={12} sm={6} md={imageWidth} xl={imageWidth < 12 ? 9 : 12} className={classes['sharedArticle__height']}>
                  <SharedFirebaseImage url={article.imageExternalUrl ?? article.image?.url} text={article?.content} onClick={() => onArticleCLick?.(article)} />
                </SharedGridItem>

                <SharedIf If={!!article?.feature && article.feature.type === 'newsTeller'}>
                  <SharedGridItem xs={12} sm={6} md={4} xl={3} className={clsx(classes.sharedArticle__height)}>
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
                  <SharedGridItem xs={12} sm={6} md={4} xl={3} className={`${classes.sharedArticle__height} u-overflow__auto`}>
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

              <Hidden smUp>
                <SharedGridItem xs={12}>
                  <SharedIf If={article.subArticles && article.subArticles.length > 0}>
                    <SharedButton variant={'outlined'} className={classes.sharedArticle__sliderArrowNext} onClick={handleGoNext}>
                      <ArrowForwardIcon />
                    </SharedButton>
                    <SharedButton variant={'outlined'} className={classes.sharedArticle__sliderArrowPrev} onClick={handleGoPrev}>
                      <ArrowBackIcon />
                    </SharedButton>
                  </SharedIf>
                  <Slider ref={sliderRef} className={classes.sharedArticle__mobileSlider} {...settings}>
                    <SharedFirebaseImage url={article.imageExternalUrl ?? article.image?.url} text={article?.content} onClick={() => onArticleCLick?.(article)} />
                    {article?.subArticles?.map((subArticle) => (
                      <SharedFirebaseImage
                        key={subArticle.id}
                        url={subArticle.imageExternalUrl ?? subArticle.image?.url}
                        text={subArticle.content}
                        onClick={() => onSubArticleClick?.(subArticle)}
                      />
                    ))}
                  </Slider>
                </SharedGridItem>
              </Hidden>
            </MainGridContainer>
          </div>
        </Fade>
      </div>
    </SharedIf>
  );
}
