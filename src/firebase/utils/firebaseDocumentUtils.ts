import { doc, getDoc, setDoc, collection, updateDoc, FieldValue, deleteField } from 'firebase/firestore';
import { firebaseDB } from '../firebase';
import { DocumentKeys, FolderKeys } from '../models/firebaseBaseModels';
import { ExternalImage, FirebaseImage } from '@/firebase/utils/firebaseImageUtils';

export async function storeDocument<T = object>(folder: FolderKeys, docName: DocumentKeys, payload: Partial<T>): Promise<T> {
  const docRef = doc(firebaseDB, folder, docName);
  await setDoc(docRef, payload, { merge: true });
  const docSnap = await getDoc(docRef);
  return docSnap.data() as T;
}

export async function storeImageDocument<T = FirebaseImage | ExternalImage>(folder: FolderKeys, imageName: string, payload: Partial<T> | null): Promise<T> {
  const docRef = doc(firebaseDB, folder, 'images');
  await setDoc(docRef, { [imageName]: payload }, { merge: true });
  const docSnap = await getDoc(docRef);
  return docSnap.data() as T;
}

export async function deleteImageDocument(folder: FolderKeys, imageName: string): Promise<void> {
  const docRef = doc(firebaseDB, folder, 'images');
  await updateDoc(docRef, { [imageName]: deleteField() });
}

export async function updateImageDocument({
  folder,
  payload,
}: {
  folder: FolderKeys;
  payload: FirebaseImage | ExternalImage;
}): Promise<FirebaseImage | ExternalImage> {
  if (!payload.id) throw new Error('Image id is required');
  const docRef = doc(firebaseDB, folder, 'images');
  await updateDoc(docRef, { [payload.id]: payload });
  return payload;
}

export async function replaceDocument<T = object>(folder: FolderKeys, docName: DocumentKeys, payload: Partial<T>): Promise<T> {
  const docRef = doc(firebaseDB, folder, docName);
  await setDoc(docRef, payload, { merge: true });
  const docSnap = await getDoc(docRef);
  return docSnap.data() as T;
}

export async function getDocument<T = object>(folder: FolderKeys, docName: DocumentKeys): Promise<T> {
  const docRef = doc(firebaseDB, folder, docName);
  const docSnap = await getDoc(docRef);
  return (docSnap.data() || null) as T;
}

// TODO: Implement this function
// export async function getAllDocuments<T = object[]>(folder: FolderKeys): Promise<T> {
//   const docRef = await collection(firebaseDB, folder).firestore.toJSON();
//   return docRef as T;
// }
