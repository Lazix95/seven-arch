import { ChangeEvent, useEffect, useState } from 'react';
import { SharedButton } from '@/components/shared/form/SharedButton';
import { SharedHeading } from '@/components/shared/text/SharedHeading';
import { SharedImageUpload } from '@/components/shared/SharedImageUpload/SharedImageUpload';
import { SharedForm } from '@/components/shared/form/SharedForm';
import { SharedGridInput } from '@/components/shared/form/SharedGridInput';
import { SharedGridItem } from '@/components/shared/grid/SharedGridItem';
import { GeneralFormSubmitModel } from '@/models/generalModels';
import { ExternalImage, FirebaseImage } from '@/firebase/utils/firebaseImageUtils';

export interface FeatureAdminBasicInfoAdminViewData extends Record<string, unknown> {
  readonly companyName: string;
}

export interface FeatureAdminBasicInfoAdminViewImages {
  readonly loadingScreenImage?: FirebaseImage | ExternalImage | null;
}

export interface FeatureAdminBasicInfoAdminViewFields {
  readonly data: FeatureAdminBasicInfoAdminViewData;
  readonly externalImages: {
    readonly loadingScreenImage?: string | null;
  };
  readonly images: {
    readonly loadingScreenImage?: File | null;
  };
}

export interface FeatureAdminBasicInfoAdminViewFormPayload
  extends GeneralFormSubmitModel<
    FeatureAdminBasicInfoAdminViewData,
    FeatureAdminBasicInfoAdminViewFields['images'],
    FeatureAdminBasicInfoAdminViewFields['externalImages']
  > {}

export interface FeatureAdminBasicInfoAdminViewProps {
  readonly initialLoading?: boolean;
  readonly isSubmitLoading?: boolean;
  readonly onSubmit: (payload: FeatureAdminBasicInfoAdminViewFormPayload) => void;
  readonly data: FeatureAdminBasicInfoAdminViewData;
  readonly images: FeatureAdminBasicInfoAdminViewImages;
}

const initFields: FeatureAdminBasicInfoAdminViewFields = {
  data: { companyName: '' },
  externalImages: {
    loadingScreenImage: null,
  },
  images: {
    loadingScreenImage: null,
  },
};

export function FeatureAdminBasicInfoAdminView({ onSubmit, data, images, isSubmitLoading, initialLoading }: FeatureAdminBasicInfoAdminViewProps) {
  const [fields, setFields] = useState<FeatureAdminBasicInfoAdminViewFields>(initFields);

  useEffect(() => {
    if (data && !isSubmitLoading) {
      let externalImages = {};

      if (images.loadingScreenImage && images.loadingScreenImage.type === 'externalImage') {
        externalImages = { loadingScreenImage: images.loadingScreenImage.url };
      }

      setFields({ data, images: {}, externalImages });
    }
  }, [data, isSubmitLoading]);

  function handleImageUpload(name: string, file: File | null) {
    setFields((oldFields) => ({ ...oldFields, images: { ...oldFields.images, [name]: file } }));
  }

  function handleExternalLinkChange(name: string, link: string | null) {
    setFields((oldFields) => ({ ...oldFields, externalImages: { ...oldFields.externalImages, [name]: link } }));
  }

  function handleDataChange(event: ChangeEvent<HTMLInputElement>) {
    const name = event.target.name;
    const value = event.target.value;
    setFields((oldFields) => ({ ...oldFields, data: { ...oldFields.data, [name]: value } }));
  }

  function handleSubmit() {
    const { images, externalImages, data } = fields;
    onSubmit({ images, externalImages, data });
  }

  return (
    <SharedForm isLoading={initialLoading} onSubmit={handleSubmit}>
      <SharedGridItem centerText>
        <SharedHeading level={4}> Basic Info </SharedHeading>
      </SharedGridItem>

      <SharedGridInput required name={'companyName'} label={'Company Name'} value={fields.data.companyName} onChange={handleDataChange} />
      <SharedImageUpload
        useExternalLink={true}
        label={'Splash Screen Image'}
        name={'loadingScreenImage'}
        previewUrl={images?.loadingScreenImage?.url}
        externalLink={fields.externalImages?.loadingScreenImage}
        onExternalLinkChange={(link) => handleExternalLinkChange('loadingScreenImage', link)}
        onChange={handleImageUpload}
      />

      <SharedGridItem>
        <SharedButton fullWidth btnType={'LoadingButton'} loading={isSubmitLoading} type={'submit'}>
          Save
        </SharedButton>
      </SharedGridItem>
    </SharedForm>
  );
}
