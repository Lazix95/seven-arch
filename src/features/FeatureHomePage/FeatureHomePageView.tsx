import { SharedFirebaseImage } from '../firebase/components/FirebaseImage/SharedFirebaseImage';
import { FirebaseImage } from '../firebase/utils/firebaseImageUtils';
import { SharedArticle, SharedArticleChildrenNames } from '../shared/SharedArticle/SharedArticle';
import { SharedGridContainer } from '../shared/SharedDrawer/SharedGridContainer';
import { SharedNamedChild } from '../shared/SharedNamedChild';
import { SharedSlider } from '../shared/SharedSlider/SharedSlider';
import { SharedCardSubscribeToNewsTeller } from '../shared/cards/SharedCardSubscribeToNewsTeller';
import { SharedGridItem } from '../shared/grid/SharedGridItem';
import { Grid } from '@mui/material';

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
      <SharedGridContainer mt={0} mb={3} pt={0}>
        <SharedGridItem xs={12} sm={6} md={12} lg={12}>
          <SharedArticle />
        </SharedGridItem>
      </SharedGridContainer>
    </>
  );
}
