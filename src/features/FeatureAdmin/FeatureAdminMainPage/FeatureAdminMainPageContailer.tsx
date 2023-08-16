import { fetchBasicInfo, DataBasicInfo } from '@/features/firebase/api/basicDataApi';
import { createGetStaticProps } from '@/utils/ssgUtils';
import { FeatureAdminMainPageView } from './FeatureAdminMainPageView';
import { useEffect } from 'react';
import { DataSliderImages, fetchSliderImages } from '@/features/firebase/api/mainPageApi';
import { useContainerData } from '@/hooks/useContainerData';
import { FirebaseImage, storeImage } from '@/features/firebase/utils/firebaseImageUtils';
import { deleteByDbPath } from '@/features/firebase/utils/firebaseGeneralUtils';

export const getStaticProps = createGetStaticProps([fetchBasicInfo, fetchSliderImages]);

interface FeatureAdminMainPageContainerState {
  sliderImages: FirebaseImage[];
  isSaveLoading?: boolean;
  isDeleteLoading?: boolean;
}

export interface FeatureAdminMainPageContainerProps extends DataBasicInfo, DataSliderImages {}

export function FeatureAdminMainPageContainer({ sliderImages }: FeatureAdminMainPageContainerProps) {
  const { state, addToArrayInState, updateState, deleteFromArrayInState } = useContainerData<FeatureAdminMainPageContainerState>({ sliderImages: sliderImages ?? [] });

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
    <FeatureAdminMainPageView isUploadLoading={state.isSaveLoading ?? false} onUploadImage={handleAddNewImage} onRemoveImage={handleDeleteImage} images={state.sliderImages} />
  );
}
