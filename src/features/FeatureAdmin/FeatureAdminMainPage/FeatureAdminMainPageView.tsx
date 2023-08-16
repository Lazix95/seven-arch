import { FirebaseImage } from '@/features/firebase/utils/firebaseImageUtils';
import { SharedGalery } from '@/features/shared/SharedGalery/SharedGalery';
import { SharedImageUpload } from '@/features/shared/SharedImageUpload/SharedImageUpload';
import { SharedForm } from '@/features/shared/form/SharedForm';
import { SharedGridHeading } from '@/features/shared/grid/SharedGridHeading';

export interface FeatureAdminMainPageViewProps {
  images: FirebaseImage[];
  isUploadLoading: boolean;
  onUploadImage: (file: File) => void;
  onRemoveImage: (image: FirebaseImage) => void;
}

export function FeatureAdminMainPageView({ images, isUploadLoading, onUploadImage, onRemoveImage }: FeatureAdminMainPageViewProps) {
  function handleImageUpload(name: string, file: File) {
    onUploadImage(file);
  }

  function handleRemoveImage(image: FirebaseImage) {
    onRemoveImage(image);
  }

  return (
    <SharedForm>
      <SharedGridHeading level={4} text={'Main Page'} />
      <SharedGalery loading={isUploadLoading} onRemoveImage={handleRemoveImage} images={images} />
      <SharedImageUpload label={'Splash Screen Image'} noPreview={true} onChange={handleImageUpload} />
    </SharedForm>
  );
}
