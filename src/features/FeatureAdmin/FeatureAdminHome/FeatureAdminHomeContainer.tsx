import { fetchBasicInfo, DataBasicInfo } from '@/features/firebase/api/basicDataApi';
import { createGetStaticProps } from '@/utils/ssgUtils';
import { FeatureAdminHomeView } from './FeatureAdminHomeView';
import { DataSliderImages, fetchSliderImages } from '@/features/firebase/api/homeApi';
import { useContainerData } from '@/hooks/useContainerData';
import { FirebaseImage, storeImage } from '@/features/firebase/utils/firebaseImageUtils';
import { deleteByDbPath } from '@/features/firebase/utils/firebaseGeneralUtils';

const hydrationFncs = [fetchBasicInfo, fetchSliderImages];

export const getStaticProps = createGetStaticProps(hydrationFncs);

interface FeatureAdminMainPageContainerState {
  sliderImages: FirebaseImage[];
  isSaveLoading?: boolean;
  isDeleteLoading?: boolean;
}

export interface FeatureAdminHomeContainerProps extends DataBasicInfo, DataSliderImages {}

export function FeatureAdminHomeContainer({ sliderImages }: FeatureAdminHomeContainerProps) {
  const { state, addToArrayInState, updateState, deleteFromArrayInState, initialLoading } = useContainerData<FeatureAdminMainPageContainerState>(
    { sliderImages: sliderImages ?? [] },
    hydrationFncs
  );

  async function handleAddNewImage(image: File) {
    try {
      updateState({ isSaveLoading: true });
      const newImage = await storeImage({ folder: 'sliderImages', image });
      addToArrayInState('sliderImages', newImage);
    } finally {
      updateState({ isSaveLoading: false });
    }
  }

  async function handleDeleteImage(image: FirebaseImage) {
    try {
      updateState({ isDeleteLoading: true });
      await deleteByDbPath(image.dbPath);
      deleteFromArrayInState('sliderImages', 'dbPath', image.dbPath);
    } finally {
      updateState({ isDeleteLoading: false });
    }
  }

  return (
    <FeatureAdminHomeView
      isLoading={initialLoading}
      isUploadLoading={state.isSaveLoading ?? false}
      onUploadImage={handleAddNewImage}
      onRemoveImage={handleDeleteImage}
      images={state.sliderImages}
    />
  );
}
