import { FeatureAdminBasicInfoAdminView, FeatureAdminBasicInfoAdminViewFormPayload } from './FeatureAdminBasicInfoView';
import { useContainerData } from '../../../hooks/useContainerData';
import { createGetStaticProps } from '@/utils/ssgUtils';
import { fetchBasicInfo, DataBasicInfo } from '../../firebase/api/basicDataApi';
import { updateObjectEnteries } from '@/utils/objectUtils';
import { storeImages } from '@/features/firebase/utils/firebaseImageUtils';
import { storeDocument } from '@/features/firebase/utils/firebaseDocumentUtils';

export const getStaticProps = createGetStaticProps([fetchBasicInfo]);

interface FeatureAdminBasicInfoState extends DataBasicInfo {
  readonly isSubmitLoading: boolean;
}

interface FeatureAdminBasicInfoContainerProps extends DataBasicInfo {
  readonly admin: boolean;
}

export function FeatureAdminBasicInfoContainer({ basicInfo, basicInfoImages }: FeatureAdminBasicInfoContainerProps) {
  const { updateState, state } = useContainerData<FeatureAdminBasicInfoState>({
    isSubmitLoading: false,
    basicInfo,
    basicInfoImages,
  });

  async function handleSubmitBasicInfo(payload: FeatureAdminBasicInfoAdminViewFormPayload) {
    let newImages = basicInfoImages;
    try {
      updateState({ isSubmitLoading: true });

      if (payload.images) {
        const newSavedImages = await storeImages({ images: payload.images, folder: 'general' });
        newImages = updateObjectEnteries(newImages, newSavedImages);
      }

      const newBasicInfo = await storeDocument('general', 'basicInfo', payload.data);
      updateState({ basicInfoImages: newImages, basicInfo: newBasicInfo });
    } finally {
      updateState({ isSubmitLoading: false });
    }
  }

  return (
    <FeatureAdminBasicInfoAdminView isSubmitLoading={state.isSubmitLoading} onSubmit={handleSubmitBasicInfo} images={{ ...state.basicInfoImages }} data={{ ...state.basicInfo }} />
  );
}
