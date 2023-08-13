import React, { Fragment } from 'react';
import { FeatureBasicInfoView } from './FeatureBasicInfoView';
import { FeatureBasicInfoAdminView, FeatureBasicInfoAdminViewFields } from './FeatureBasicInfoAdminView';
import { storeDocument, storeImages } from '../firebase/firebase';
import { SharedIf } from '../shared/SharedIf';
import { useContainerData } from '../../hooks/useContainerData';
import { createGetStaticProps } from '@/utils/ssgUtils';
import { fetchBasicInfo, fetchSliderImages } from '../firebase/api/basicDataApi';

export const getStaticProps = createGetStaticProps([fetchBasicInfo]);

interface FeatureBasicInfoState {
  readonly basicInfo: { companyName: string };
  readonly savedImages: { loadingScreenImage: string | null };
  readonly sliderImages: { sliderImage1: string | null; sliderImage2: string | null; sliderImage3: string | null };
  readonly isSubmitLoading: boolean;
}

interface FeatureBasicInfoContainerProps {
  readonly admin: boolean;
  readonly basicInfo: FeatureBasicInfoState['basicInfo'];
  readonly savedImages: FeatureBasicInfoState['savedImages'];
  readonly sliderImages: FeatureBasicInfoState['sliderImages'];
}

export function FeatureBasicInfoContainer({ admin, basicInfo, savedImages, sliderImages }: FeatureBasicInfoContainerProps) {
  const { updateState, state } = useContainerData<FeatureBasicInfoState>({
    isSubmitLoading: false,
    basicInfo,
    savedImages,
    sliderImages,
  });

  async function handleSubmitBasicInfo(payload: FeatureBasicInfoAdminViewFields) {
    let newImages = savedImages;
    try {
      updateState({ isSubmitLoading: true });
      const { images, ...rest } = payload;
      if (images) {
        const newSavedImages = await storeImages({ images: images, folder: 'general' });
        Object.keys(newSavedImages).forEach((imgKey) => {
          newImages = { ...newImages, [imgKey]: newSavedImages[imgKey as keyof typeof newSavedImages] };
        });
      }
      const newBasicInfo = await storeDocument('general', 'basicInfo', rest);
      updateState({ savedImages: newImages, basicInfo: newBasicInfo });
    } finally {
      updateState({ isSubmitLoading: false });
    }
  }

  return (
    <Fragment>
      <SharedIf RIf={admin}>
        <FeatureBasicInfoAdminView
          isSubmitLoading={state.isSubmitLoading}
          onSubmit={handleSubmitBasicInfo}
          images={{ ...state.savedImages, ...state.sliderImages }}
          data={{ ...state.basicInfo }}
        />
      </SharedIf>

      <SharedIf RIf={!admin}>
        <FeatureBasicInfoView />
      </SharedIf>
    </Fragment>
  );
}
