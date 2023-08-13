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
  sliderImage1: string | null;
  sliderImage2: string | null;
  sliderImage3: string | null;
}

export interface FeatureBasicInfoAdminViewFields extends FeatureBasicInfoAdminViewData {
  images: {
    loadingScreenImage?: File | null;
    sliderImage1?: File | null;
    sliderImage2?: File | null;
    sliderImage3?: File | null;
  };
}

export interface FeatureBasicInfoAdminViewProps {
  isSubmitLoading?: boolean;
  onSubmit: (payload: FeatureBasicInfoAdminViewFields) => void;
  data: FeatureBasicInfoAdminViewData;
  images: FeatureBasicInfoAdminViewImages;
}

const initFields: FeatureBasicInfoAdminViewFields = {
  companyName: '',
  images: {
    loadingScreenImage: null,
    sliderImage1: null,
    sliderImage2: null,
    sliderImage3: null,
  },
};

export function FeatureBasicInfoAdminView({ onSubmit, data, images, isSubmitLoading }: FeatureBasicInfoAdminViewProps) {
  const [fields, setFields] = useState<FeatureBasicInfoAdminViewFields>(initFields);

  useEffect(() => {
    if (data && !isSubmitLoading) {
      setFields({ ...data, images: {} });
    }
  }, [data, isSubmitLoading]);

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
      <SharedImageUpload label={'Splash Screen Image'} name={'loadingScreenImage'} previewUrl={images?.loadingScreenImage} onChange={handleImageUpload} />

      <SharedImageUpload label={'Slider Image 1'} name={'sliderImage1'} previewUrl={images?.sliderImage1} onChange={handleImageUpload} />
      <SharedImageUpload label={'Slider Image 2'} name={'sliderImage2'} previewUrl={images?.sliderImage2} onChange={handleImageUpload} />
      <SharedImageUpload label={'Slider Image 3'} name={'sliderImage3'} previewUrl={images?.sliderImage3} onChange={handleImageUpload} />

      <SharedButton btnType={'LoadingButton'} loading={isSubmitLoading} type={'submit'}>
        Save
      </SharedButton>
    </SharedForm>
  );
}
