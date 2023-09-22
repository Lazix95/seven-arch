import { ExternalImage, FirebaseImage } from '../firebase/utils/firebaseImageUtils';
import { MainArticle } from '@/components/MainArticle/MainArticle';
import { MainGridContainer } from '@/components/MainDrawer/MainGridContainer';
import { MainSlider } from '@/components/MainSlider/MainSlider';
import { SharedGridItem } from '@/components/shared/grid/SharedGridItem';
import { Article, SubArticle } from '@/models/articleModels';

interface FeatureHomePageViewProps {
  images: (FirebaseImage | ExternalImage)[];
  articles: Article[];
  onSubscribe: (email: string) => Promise<void>;
  onArticleCLick?: (article: Article) => void;
  onSubArticleClick?: (article: SubArticle) => void;
}

export function FeatureHomePageView({ images, articles, onSubscribe, onArticleCLick, onSubArticleClick }: FeatureHomePageViewProps) {
  return (
    <>
      <div>
        <MainSlider images={images} />
      </div>
      <MainGridContainer mt={0} mb={3} pt={0}>
        <SharedGridItem xs={12}>
          {(articles || []).map((article) => (
            <MainArticle key={article.id} article={article} onSubscribe={onSubscribe} onArticleCLick={onArticleCLick} onSubArticleClick={onSubArticleClick} />
          ))}
        </SharedGridItem>
      </MainGridContainer>
    </>
  );
}
