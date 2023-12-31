import { ExternalImage, FirebaseImage } from '@/firebase/utils/firebaseImageUtils';
import { SharedGalery } from '@/components/shared/SharedGalery/SharedGalery';
import { SharedImageUpload } from '@/components/shared/SharedImageUpload/SharedImageUpload';
import { SharedForm } from '@/components/shared/form/SharedForm';
import { SharedGridHeading } from '@/components/shared/grid/SharedGridHeading';
import { func } from 'prop-types';
import { useState } from 'react';
import { AdminSharedForm } from '@/features/FeatureAdmin/AdminShared/AdminSharedForm';

export interface FeatureAdminHomeViewProps {
  images: (FirebaseImage | ExternalImage)[];
  isUploadLoading: boolean;
  onUploadImage: (file: File) => Promise<void>;
  onSaveExternalLink: (link: string) => Promise<void>;
  onRemoveImage: (image: FirebaseImage | ExternalImage) => void;
  onChangeImageOrder?: (image: FirebaseImage | ExternalImage, order: number) => Promise<void>;
  isLoading?: boolean;
}

export function FeatureAdminHomeView({
  images,
  isUploadLoading,
  isLoading,
  onUploadImage,
  onRemoveImage,
  onSaveExternalLink,
  onChangeImageOrder,
}: FeatureAdminHomeViewProps) {
  const [fileToUpload, setFileToUpload] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [externalLink, setExternalLink] = useState<string | null>(null);

  function handleImageUpload(name: string, file: File | null) {
    setFileToUpload(file);
  }

  function handleExternalLinkChange(value: string | null) {
    setExternalLink(value);
  }

  function handleRemoveImage(image: FirebaseImage | ExternalImage) {
    onRemoveImage(image);
  }

  async function handleOrderChange(image: FirebaseImage | ExternalImage, order: number) {
    await onChangeImageOrder?.(image, order);
  }

  async function handleSubmit() {
    if (fileToUpload) {
      await onUploadImage(fileToUpload);
      setFileToUpload(null);
      setPreviewUrl(null);
    } else if (externalLink) {
      await onSaveExternalLink(externalLink);
      setExternalLink(null);
    }
  }

  return (
    <AdminSharedForm noArticle btnText={'Add'} initialLoading={isLoading} title={'Home Page'} isSubmitLoading={isUploadLoading} onSubmit={handleSubmit}>
      <SharedGalery onRemoveImage={handleRemoveImage} onChangeImageOrder={handleOrderChange} images={images} />
      <SharedImageUpload
        useExternalLink
        externalLink={externalLink ?? ''}
        onExternalLinkChange={handleExternalLinkChange}
        onPreviewUrlChange={setPreviewUrl}
        previewUrl={previewUrl}
        label={'Add Slider Image'}
        onChange={handleImageUpload}
      />
    </AdminSharedForm>
  );
}
