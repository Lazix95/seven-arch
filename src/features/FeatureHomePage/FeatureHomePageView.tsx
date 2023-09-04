import { ExternalImage, FirebaseImage } from '../firebase/utils/firebaseImageUtils';
import { SharedArticle } from '../shared/SharedArticle/SharedArticle';
import { SharedGridContainer } from '../shared/SharedDrawer/SharedGridContainer';
import { SharedSlider } from '../shared/SharedSlider/SharedSlider';
import { SharedGridItem } from '../shared/grid/SharedGridItem';
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
        <SharedSlider images={images} />
      </div>
      <SharedGridContainer mt={0} mb={3} pt={0}>
        <SharedGridItem xs={12}>
          {(articles || []).map((article) => (
            <SharedArticle key={article.id} article={article} onSubscribe={onSubscribe} onArticleCLick={onArticleCLick} onSubArticleClick={onSubArticleClick} />
          ))}
        </SharedGridItem>
      </SharedGridContainer>
    </>
  );
}
