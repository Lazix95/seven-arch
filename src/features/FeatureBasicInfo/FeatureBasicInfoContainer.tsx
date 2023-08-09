import React, { Fragment, useEffect, useState } from 'react';
import { FeatureBasicInfoView } from './FeatureBasicInfoView';
import { FeatureBasicInfoAdminView, FeatureBasicInfoAdminViewFields } from './FeatureBasicInfoAdminView';
import { getDocument, getImageLink, storeDocument, storeImages } from '../firebase/firebase';
import { SharedIf } from '../shared/SharedIf';
import { useContainerData } from '../firebase/hooks/useContainerData';

export const getStaticProps = async () => {
  const basicInfo = await getDocument('general', 'basicInfo');
  const savedImages = { loadingScreenImage: await getImageLink({ folder: 'general', name: 'loadingScreenImage' }) };
  return { props: { basicInfo, savedImages } };
};

interface FeatureBasicInfoState {
  readonly basicInfo: { companyName: string };
  readonly images: { loadingScreenImage: File | null };
  readonly savedImages: { loadingScreenImage: string | null };
  readonly isSubmitLoading: boolean;
}

interface FeatureBasicInfoContainerProps {
  readonly admin: boolean;
  readonly basicInfo: FeatureBasicInfoState['basicInfo'];
  readonly savedImages: FeatureBasicInfoState['savedImages'];
}

export function FeatureBasicInfoContainer({ admin, basicInfo, savedImages }: FeatureBasicInfoContainerProps) {
  const { setState, updateState, state } = useContainerData<FeatureBasicInfoState>({
    isSubmitLoading: false,
    basicInfo,
    savedImages,
    images: { loadingScreenImage: null },
  });

  async function handleSubmitBasicInfo(payload: FeatureBasicInfoAdminViewFields) {
    let newImages = savedImages;
    try {
      updateState({ isSubmitLoading: true });
      const { images, ...rest } = payload;
      if (images) {
        newImages = await storeImages({ images: images, folder: 'general' });
      }
      const newBasicInfo = await storeDocument('general', 'basicInfo', rest);
      updateState({ savedImages: newImages });
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
          images={state.savedImages}
          data={{ ...state.basicInfo, images: state.images }}
        />
      </SharedIf>

      <SharedIf RIf={!admin}>
        <FeatureBasicInfoView />
      </SharedIf>
    </Fragment>
  );
}
