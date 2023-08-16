import { useCallback, useEffect, useState } from 'react';
import { FolderKeys } from '../models/firebaseBaseModels';
import { getImageLink } from '../utils/firebaseImageUtils';

export function useFirebaseImage(folder: FolderKeys, name: string) {
  const [image, setImage] = useState('');

  const getImage = useCallback(async () => {
    const imgUrl = await getImageLink({ folder, name });
    setImage(imgUrl?.url as string);
  }, [folder, name]);

  useEffect(() => {
    getImage();
  }, [folder, getImage, name]);

  return { image, getImage };
}
