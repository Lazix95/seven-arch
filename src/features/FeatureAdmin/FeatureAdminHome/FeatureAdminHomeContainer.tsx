import { fetchBasicInfo, DataBasicInfo } from '@/features/firebase/api/basicDataApi';
import { createGetStaticProps } from '@/utils/ssgUtils';
import { FeatureAdminHomeView } from './FeatureAdminHomeView';
import { DataSliderImages, fetchSliderImages } from '@/features/firebase/api/homeApi';
import { useContainerData } from '@/hooks/useContainerData';
import { deleteExternalImage, ExternalImage, FirebaseImage, storeExternalImage, storeImage } from '@/features/firebase/utils/firebaseImageUtils';
import { deleteByDbPath } from '@/features/firebase/utils/firebaseGeneralUtils';
import { uuidV4 } from '@/plugins/uuid';
import { deleteImageDocument, storeImageDocument } from '@/features/firebase/utils/firebaseDocumentUtils';

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
    hydrationFncs,
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

  async function handleDeleteImage(image: FirebaseImage | ExternalImage) {
    try {
      updateState({ isDeleteLoading: true });
      if (image.type === 'firebaseImage') {
        await deleteByDbPath(image.dbPath);
        await deleteImageDocument('sliderImages', image.id);
        deleteFromArrayInState('sliderImages', 'dbPath', image.dbPath);
      }

      if (image.type === 'externalImage') {
        await deleteExternalImage({ folder: 'sliderImages', name: image.id });
        deleteFromArrayInState('sliderImages', 'id', image.id);
      }
    } finally {
      updateState({ isDeleteLoading: false });
    }
  }

  async function handleSaveExternalLink(link: string) {
    try {
      updateState({ isSaveLoading: true });
      const newImage = await storeExternalImage({ folder: 'sliderImages', url: link, name: uuidV4() });
      addToArrayInState('sliderImages', newImage);
    } finally {
      updateState({ isSaveLoading: false });
    }
  }

  return (
    <FeatureAdminHomeView
      isLoading={initialLoading}
      isUploadLoading={state.isSaveLoading ?? false}
      onUploadImage={handleAddNewImage}
      onSaveExternalLink={handleSaveExternalLink}
      onRemoveImage={handleDeleteImage}
      images={state.sliderImages}
    />
  );
}
