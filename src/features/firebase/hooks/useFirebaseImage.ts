import { useCallback, useEffect, useState } from 'react';
import { getImageLink } from '../firebase';
import { FolderKeys } from '../models/firebaseBaseModels';

export function useFirebaseImage(folder: FolderKeys, name: string) {
  const [image, setImage] = useState('');

  const getImage = useCallback(async () => {
    const imgUrl = await getImageLink({ folder, name });
    setImage(imgUrl as string);
  }, [folder, name]);

  useEffect(() => {
    getImage();
  }, [folder, getImage, name]);

  return { image, getImage };
}
