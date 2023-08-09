import { ChangeEvent, useEffect, useState } from 'react';
import { SharedButton } from '../shared/SharedButton';
import { SharedHeading } from '../shared/SharedHeading';
import { SharedImageUpload } from '../shared/SharedImageUpload/SharedImageUpload';
import { SharedForm } from '../shared/form/SharedForm';
import { SharedGridInput } from '../shared/form/SharedGridInput';
import { SharedGridItem } from '../shared/grid/SharedGridItem';

export interface FeatureBasicInfoAdminViewData extends Record<string, unknown> {
  companyName: string;
}

export interface FeatureBasicInfoAdminViewImages {
  loadingScreenImage: string | null;
}

export interface FeatureBasicInfoAdminViewFields extends FeatureBasicInfoAdminViewData {
  images: {
    loadingScreenImage: File | null;
  };
}

export interface FeatureBasicInfoAdminViewProps {
  isSubmitLoading?: boolean;
  onSubmit: (payload: FeatureBasicInfoAdminViewFields) => void;
  data: FeatureBasicInfoAdminViewFields;
  images: FeatureBasicInfoAdminViewImages;
}

const initFields: FeatureBasicInfoAdminViewFields = {
  companyName: '',
  images: {
    loadingScreenImage: null,
  },
};

export function FeatureBasicInfoAdminView({ onSubmit, data, images, isSubmitLoading }: FeatureBasicInfoAdminViewProps) {
  const [fields, setFields] = useState<FeatureBasicInfoAdminViewFields>(initFields);

  useEffect(() => {
    if (data) {
      setFields({ ...data });
    }
  }, [data]);

  function handleImageUpload(name: string, file: File | null) {
    setFields((oldFields) => ({ ...oldFields, images: { ...oldFields.images, [name]: file } }));
  }

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    const name = event.target.name;
    const value = event.target.value;
    setFields((oldFields) => ({ ...oldFields, [name]: value }));
  }

  function handleSubmit() {
    onSubmit(fields);
  }

  return (
    <SharedForm onSubmit={handleSubmit}>
      <SharedGridItem centerText>
        <SharedHeading level={4}> Basic Info </SharedHeading>
      </SharedGridItem>

      <SharedGridInput required name={'companyName'} label={'Company Name'} value={fields.companyName} onChange={handleInputChange} />
      <SharedImageUpload name={'loadingScreenImage'} previewUrl={images?.loadingScreenImage ?? undefined} onChange={handleImageUpload} />

      <SharedButton btnType={'LoadingButton'} loading={isSubmitLoading} type={'submit'}>
        Save
      </SharedButton>
    </SharedForm>
  );
}