import { ExternalImage, FirebaseImage } from '@/features/firebase/utils/firebaseImageUtils';
import { SharedGalery } from '@/features/shared/SharedGalery/SharedGalery';
import { SharedImageUpload } from '@/features/shared/SharedImageUpload/SharedImageUpload';
import { SharedForm } from '@/features/shared/form/SharedForm';
import { SharedGridHeading } from '@/features/shared/grid/SharedGridHeading';
import { func } from 'prop-types';
import { useState } from 'react';
import { AdminSharedForm } from '@/features/FeatureAdmin/AdminShared/AdminSharedForm';

export interface FeatureAdminHomeViewProps {
  images: FirebaseImage[];
  isUploadLoading: boolean;
  onUploadImage: (file: File) => Promise<void>;
  onSaveExternalLink: (link: string) => Promise<void>;
  onRemoveImage: (image: FirebaseImage | ExternalImage) => void;
  isLoading?: boolean;
}

export function FeatureAdminHomeView({ images, isUploadLoading, isLoading, onUploadImage, onRemoveImage, onSaveExternalLink }: FeatureAdminHomeViewProps) {
  const [fileToUpload, setFileToUpload] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [externalLink, setExternalLink] = useState<string | null>(null);

  function handleImageUpload(name: string, file: File | null) {
    setFileToUpload(file);
  }

  function handleExternalLinkChange(value: string | null) {
    setExternalLink(value);
  }

  function handleRemoveImage(image: FirebaseImage) {
    onRemoveImage(image);
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
    <AdminSharedForm noArticle initialLoading={isLoading} title={'Home Page'} isSubmitLoading={isUploadLoading} onSubmit={handleSubmit}>
      <SharedGalery onRemoveImage={handleRemoveImage} images={images} />
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
