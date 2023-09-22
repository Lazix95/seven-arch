import { StorageReference, deleteObject, ref as storageRef } from 'firebase/storage';
import { firebaseStorage } from '../firebase';

export async function deleteByDbRef(dbRef: StorageReference) {
  await deleteObject(dbRef);
}

export async function deleteByDbPath(dbPath: string | null | undefined) {
  const dbRef = getStorageReferenceBydbPath(dbPath);
  if (!dbRef) throw new Error('Storage Reference do not exist');
  await deleteObject(dbRef);
}

export function getStorageReferenceBydbPath(path: string | null | undefined) {
  if (!path) return null;
  return storageRef(firebaseStorage, path);
}
