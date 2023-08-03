import React, { Fragment, useState } from 'react';
import { FeatureBasicInfoView } from './FeatureBasicInfoView';
import { FeatureBasicInfoAdminView } from './FeatureBasicInfoAdminView';
import { getDocument, storeDocument } from '../firebase/firebase';
import { SharedIf } from '../shared/SharedIf';

export const getStaticProps = async () => {
  const basicInfo = await getDocument('general', 'basicInfo');
  return { props: { basicInfo, images: {} } };
};

interface FeatureBasicInfoContainerProps {
  readonly admin: boolean;
  readonly basicInfo: { companyName: string; images: { loadingScreenImage: File | null } };
}

export function FeatureBasicInfoContainer({ admin, basicInfo }: FeatureBasicInfoContainerProps) {
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);

  async function handleSubmit(payload: Record<string, unknown>) {
    try {
      setIsSubmitLoading(true);
      await storeDocument('general', 'basicInfo', payload);
    } finally {
      setIsSubmitLoading(false);
    }
  }

  return (
    <Fragment>
      <SharedIf RIf={admin}>
        <FeatureBasicInfoAdminView isSubmitLoading={isSubmitLoading} onSubmit={handleSubmit} data={basicInfo} />
      </SharedIf>

      <SharedIf RIf={!admin}>
        <FeatureBasicInfoView />
      </SharedIf>
    </Fragment>
  );
}
