import { FeatureAdminBasicInfoAdminView, FeatureAdminBasicInfoAdminViewFormPayload } from './FeatureAdminBasicInfoView';
import { useContainerData } from '@/hooks/useContainerData';
import { createGetStaticProps } from '@/utils/ssgUtils';
import { fetchBasicInfo, DataBasicInfo } from '@/firebase/api/basicDataApi';
import { updateObjectEnteries } from '@/utils/objectUtils';
import { storeExternalImages, storeImages } from '@/firebase/utils/firebaseImageUtils';
import { storeDocument } from '@/firebase/utils/firebaseDocumentUtils';

export const getStaticProps = createGetStaticProps([]);

interface FeatureAdminBasicInfoState extends DataBasicInfo {
  readonly isSubmitLoading: boolean;
}

interface FeatureAdminBasicInfoContainerProps extends DataBasicInfo {
  readonly admin: boolean;
}

export function FeatureAdminBasicInfoContainer({ basicInfo, basicInfoImages }: FeatureAdminBasicInfoContainerProps) {
  const { updateState, state, initialLoading } = useContainerData<FeatureAdminBasicInfoState>(
    {
      isSubmitLoading: false,
      basicInfo,
      basicInfoImages,
    },
    [fetchBasicInfo],
  );

  async function handleSubmitBasicInfo(payload: FeatureAdminBasicInfoAdminViewFormPayload) {
    let newImages = basicInfoImages;
    try {
      updateState({ isSubmitLoading: true });

      if (payload.images) {
        const newSavedImages = await storeImages({ images: payload.images, folder: 'general' });
        newImages = updateObjectEnteries(newImages, newSavedImages);
      }

      if (payload.externalImages) {
        const newExternalImages = await storeExternalImages('general', payload.externalImages);
        newImages = updateObjectEnteries(newImages, newExternalImages);
      }

      const newBasicInfo = await storeDocument('general', 'basicInfo', payload.data);
      updateState({ basicInfoImages: newImages, basicInfo: newBasicInfo });
    } finally {
      updateState({ isSubmitLoading: false });
    }
  }

  return (
    <FeatureAdminBasicInfoAdminView
      initialLoading={initialLoading}
      isSubmitLoading={state.isSubmitLoading}
      onSubmit={handleSubmitBasicInfo}
      images={{ ...state.basicInfoImages }}
      data={{ ...state.basicInfo }}
    />
  );
}
