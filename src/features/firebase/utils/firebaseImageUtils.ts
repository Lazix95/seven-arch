import { deleteObject, getDownloadURL, listAll, ref as storageRef, uploadBytes } from 'firebase/storage';
import { firebaseStorage } from '../firebase';
import { FolderKeys } from '../models/firebaseBaseModels';
import { Optional } from '@/models/generalModels';
import { deleteImageDocument, getDocument, storeImageDocument } from '@/features/firebase/utils/firebaseDocumentUtils';
import { uuidV4 } from '@/plugins/uuid';

export async function storeImage({ image, folder, name }: { image: File; name?: string; folder: FolderKeys }): Promise<FirebaseImage> {
  const id = name ?? uuidV4();
  const imageRef = storageRef(firebaseStorage, `images/${folder}/${name ?? image.name}`);
  const uploadedImage = await uploadBytes(imageRef, image);
  const firebaseImage: FirebaseImage = { id, type: 'firebaseImage', url: await getDownloadURL(uploadedImage.ref), dbPath: imageRef.fullPath };
  await storeImageDocument(folder, id, firebaseImage);
  return firebaseImage;
}

export async function storeExternalImage({ url, folder, name }: { url: string; folder: FolderKeys; name?: string }): Promise<ExternalImage> {
  const id = name ?? uuidV4();
  const externalImage: ExternalImage = { id, type: 'externalImage', url, dbPath: null };
  await storeImageDocument(folder, id, externalImage);
  return externalImage;
}

export async function deleteExternalImage({ folder, name }: { folder: FolderKeys; name: string }): Promise<void> {
  //await storeImageDocument(folder, name, null);
  await deleteImageDocument(folder, name);
}

export async function storeExternalImages<T extends { [key: string]: Optional<string> }>(folder: FolderKeys, images: Partial<T>): Promise<ImagesRecord> {
  let imagesLinks: Record<keyof T, FirebaseImage> = {} as Record<keyof T, FirebaseImage>;
  if (images) {
    for (const imgKey of Object.keys(images)) {
      const externalImage = await storeExternalImage({ url: images[imgKey] as string, name: imgKey, folder });
      imagesLinks = { ...imagesLinks, [imgKey]: externalImage };
    }
  }
  return imagesLinks;
}

export async function storeExternalImageList({ images, folder }: { folder: FolderKeys; images: string[] }): Promise<ExternalImage[]> {
  let imagesLinks: ExternalImage[] = [];
  if (images) {
    for (const img of images) {
      const externalImage = await storeExternalImage({ url: img, folder });
      imagesLinks = [...imagesLinks, externalImage];
    }
  }
  return imagesLinks;
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

export async function getImageLink({ folder, name }: { name: string; folder: FolderKeys }): Promise<FirebaseImage | ExternalImage | null> {
  try {
    // TODO: Query specific image, not the whole document;
    const images = await getDocument<ImagesRecord>(folder, 'images');
    return images[name] ?? null;
  } catch (e) {
    return null;
  }
}

export async function getAllImageLinks({ folder }: { folder: FolderKeys }): Promise<(FirebaseImage | ExternalImage)[]> {
  try {
    const images = await getDocument<ImagesRecord>(folder, 'images');
    return Object.values(images ?? {});
  } catch (e) {
    return [];
  }
}

export async function removeFirebaseImage(image: FirebaseImage) {
  const imageRef = storageRef(firebaseStorage, image.dbPath);
  await deleteObject(imageRef);
  //await storeImageDocument(image.id, null); // TODO: Implement this function, folder is missing
}

export interface FirebaseImage {
  readonly id: string;
  readonly type: 'firebaseImage';
  readonly url: string;
  readonly dbPath: string;
}

export interface ExternalImage {
  readonly id: string;
  readonly type: 'externalImage';
  readonly url: string;
  readonly dbPath: null;
}

export type ImagesRecord = Record<string, FirebaseImage | ExternalImage>;
