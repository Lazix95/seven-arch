import { SharedFirebaseImage } from '../firebase/components/FirebaseImage/SharedFirebaseImage';
import { FirebaseImage } from '../firebase/utils/firebaseImageUtils';
import { SharedArticle, SharedArticleChildrenNames } from '../shared/SharedArticle/SharedArticle';
import { SharedGridContainer } from '../shared/SharedDrawer/SharedGridContainer';
import { SharedNamedChild } from '../shared/SharedNamedChild';
import { SharedSlider } from '../shared/SharedSlider/SharedSlider';
import { SharedCardSubscribeToNewsteller } from '../shared/cards/SharedCardSubscribeToNewsteller';
import { SharedGridItem } from '../shared/grid/SharedGridItem';

interface FeatureHomePageViewProps {
  images: FirebaseImage[];
  onSubscribe: (email: string) => Promise<void>;
}

export function FeatureHomePageView({ images, onSubscribe }: FeatureHomePageViewProps) {
  return (
    <>
      <div>
        <SharedSlider images={images} />
      </div>
      <SharedGridContainer centerX column mt={0} mb={3} pt={0}>
        <SharedGridItem>
          <SharedArticle image={images[0]} title={'News'} text={'All News'}>
            <SharedNamedChild name={SharedArticleChildrenNames.prepend}>
              <SharedCardSubscribeToNewsteller text={'Stay up to date with the latest Seven Arch projects and news.'} btnText={'Subscribe'} onSubscribe={onSubscribe} />
            </SharedNamedChild>
          </SharedArticle>
        </SharedGridItem>
      </SharedGridContainer>
    </>
  );
}
