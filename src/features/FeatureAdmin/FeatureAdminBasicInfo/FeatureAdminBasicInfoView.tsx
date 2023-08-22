import { ChangeEvent, useEffect, useState } from 'react';
import { SharedButton } from '../../shared/SharedButton';
import { SharedHeading } from '../../shared/SharedHeading';
import { SharedImageUpload } from '../../shared/SharedImageUpload/SharedImageUpload';
import { SharedForm } from '../../shared/form/SharedForm';
import { SharedGridInput } from '../../shared/form/SharedGridInput';
import { SharedGridItem } from '../../shared/grid/SharedGridItem';
import { GeneralFormSubmitModel } from '@/models/generalModels';
import { FirebaseImage } from '@/features/firebase/utils/firebaseImageUtils';

export interface FeatureAdminBasicInfoAdminViewData extends Record<string, unknown> {
  readonly companyName: string;
}

export interface FeatureAdminBasicInfoAdminViewImages {
  readonly loadingScreenImage?: FirebaseImage | null;
}

export interface FeatureAdminBasicInfoAdminViewFields {
  readonly data: FeatureAdminBasicInfoAdminViewData;
  readonly images: {
    readonly loadingScreenImage?: File | null;
  };
}

export interface FeatureAdminBasicInfoAdminViewFormPayload extends GeneralFormSubmitModel<FeatureAdminBasicInfoAdminViewData, FeatureAdminBasicInfoAdminViewFields['images']> {}

export interface FeatureAdminBasicInfoAdminViewProps {
  readonly initialLoading?: boolean;
  readonly isSubmitLoading?: boolean;
  readonly onSubmit: (payload: FeatureAdminBasicInfoAdminViewFormPayload) => void;
  readonly data: FeatureAdminBasicInfoAdminViewData;
  readonly images: FeatureAdminBasicInfoAdminViewImages;
}

const initFields: FeatureAdminBasicInfoAdminViewFields = {
  data: { companyName: '' },
  images: {
    loadingScreenImage: null,
  },
};

export function FeatureAdminBasicInfoAdminView({ onSubmit, data, images, isSubmitLoading, initialLoading }: FeatureAdminBasicInfoAdminViewProps) {
  const [fields, setFields] = useState<FeatureAdminBasicInfoAdminViewFields>(initFields);

  useEffect(() => {
    if (data && !isSubmitLoading) {
      setFields({ data, images: {} });
    }
  }, [data, isSubmitLoading]);

  function handleImageUpload(name: string, file: File | null) {
    setFields((oldFields) => ({ ...oldFields, images: { ...oldFields.images, [name]: file } }));
  }

  function handleDataChange(event: ChangeEvent<HTMLInputElement>) {
    const name = event.target.name;
    const value = event.target.value;
    setFields((oldFields) => ({ ...oldFields, data: { ...oldFields.data, [name]: value } }));
  }

  function handleSubmit() {
    const { images, data } = fields;
    onSubmit({ images, data });
  }

  return (
    <SharedForm isLoading={initialLoading} onSubmit={handleSubmit}>
      <SharedGridItem centerText>
        <SharedHeading level={4}> Basic Info </SharedHeading>
      </SharedGridItem>

      <SharedGridInput required name={'companyName'} label={'Company Name'} value={fields.data.companyName} onChange={handleDataChange} />
      <SharedImageUpload label={'Splash Screen Image'} name={'loadingScreenImage'} previewUrl={images?.loadingScreenImage?.url} onChange={handleImageUpload} />

      <SharedGridItem>
        <SharedButton fullWidth btnType={'LoadingButton'} loading={isSubmitLoading} type={'submit'}>
          Save
        </SharedButton>
      </SharedGridItem>
    </SharedForm>
  );
}
