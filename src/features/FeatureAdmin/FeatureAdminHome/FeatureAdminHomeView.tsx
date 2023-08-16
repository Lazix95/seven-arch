import { FirebaseImage } from '@/features/firebase/utils/firebaseImageUtils';
import { SharedGalery } from '@/features/shared/SharedGalery/SharedGalery';
import { SharedImageUpload } from '@/features/shared/SharedImageUpload/SharedImageUpload';
import { SharedForm } from '@/features/shared/form/SharedForm';
import { SharedGridHeading } from '@/features/shared/grid/SharedGridHeading';

export interface FeatureAdminHomeViewProps {
  images: FirebaseImage[];
  isUploadLoading: boolean;
  onUploadImage: (file: File) => void;
  onRemoveImage: (image: FirebaseImage) => void;
  isLoading?: boolean;
}

export function FeatureAdminHomeView({ images, isUploadLoading, isLoading, onUploadImage, onRemoveImage }: FeatureAdminHomeViewProps) {
  function handleImageUpload(name: string, file: File) {
    onUploadImage(file);
  }

  function handleRemoveImage(image: FirebaseImage) {
    onRemoveImage(image);
  }

  return (
    <SharedForm isLoading={isLoading}>
      <SharedGridHeading level={4} text={'Main Page'} />
      <SharedGalery loading={isUploadLoading} onRemoveImage={handleRemoveImage} images={images} />
      <SharedImageUpload label={'Splash Screen Image'} noPreview={true} onChange={handleImageUpload} />
    </SharedForm>
  );
}
