import { getDownloadURL, listAll, ref as storageRef, uploadBytes, deleteObject } from 'firebase/storage';
import { firebaseStorage } from '../firebase';
import { FolderKeys } from '../models/firebaseBaseModels';
import { Optional } from '@/models/generalModels';

export async function storeImage({ image, folder, name, subFolder = 'common' }: { image: File; name?: string; folder: FolderKeys; subFolder?: string }): Promise<FirebaseImage> {
  //const imgDocRef = doc(firebaseDB, 'images', folder, subFolder, imgID);
  // await setDoc(imgDocRef, { url: result.url, dbPath: result.dbPath, id: imgID, order: 0 });
  // const imgDocs = await getDocs(collection(firebaseDB, 'images', folder, subFolder));
  // console.log(imgDocs.docs.map((doc) => doc.data()));
  const imageRef = storageRef(firebaseStorage, `images/${folder}/${name ?? image.name}`);
  const uploadedImage = await uploadBytes(imageRef, image);
  return { url: await getDownloadURL(uploadedImage.ref), dbPath: imageRef.fullPath };
}

export async function storeImages<T extends { [key: string]: Optional<File> }>({
  images,
  folder,
}: {
  folder: FolderKeys;
  images: Partial<T>;
}): Promise<Record<keyof typeof images, FirebaseImage>> {
  let imagesLinks: Record<keyof T, FirebaseImage> = {} as Record<keyof T, FirebaseImage>;
  if (images) {
    for (const imgKey of Object.keys(images)) {
      const link = await storeImage({ image: images[imgKey] as File, name: imgKey, folder });
      imagesLinks = { ...imagesLinks, [imgKey]: link };
    }
  }
  return imagesLinks;
}

export async function storeImageList({ images, folder }: { folder: FolderKeys; images: File[] }): Promise<FirebaseImage[]> {
  let imagesLinks: FirebaseImage[] = [];
  if (images) {
    for (const img of images) {
      const link = await storeImage({ image: img as File, name: img.name, folder });
      imagesLinks = [...imagesLinks, link];
    }
  }
  return imagesLinks;
}

export async function getImageLink({ folder, name }: { name: string; folder: FolderKeys }): Promise<FirebaseImage | null> {
  try {
    const imageRef = storageRef(firebaseStorage, `/images/${folder}/${name}`);
    return { url: await getDownloadURL(imageRef), dbPath: imageRef.fullPath };
  } catch (e) {
    return null;
  }
}

export async function getAllImageLinks({ folder }: { folder: FolderKeys }): Promise<FirebaseImage[] | null> {
  try {
    const bucketRef = storageRef(firebaseStorage, `/images/${folder}`);
    const images = (await listAll(bucketRef)).items;
    const promises = images.map(async (image) => ({ url: await getDownloadURL(image), dbPath: image.fullPath }));
    return await Promise.all(promises);
  } catch (e) {
    return null;
  }
}

export async function removeFirebaseImage(image: FirebaseImage) {
  const imageRef = storageRef(firebaseStorage, image.dbPath);
  await deleteObject(imageRef);
}

export interface FirebaseImage {
  readonly url: string;
  readonly dbPath: string;
}
