import { doc, getDoc, setDoc } from 'firebase/firestore';
import { firebaseDB } from '../firebase';
import { DocumentKeys, FolderKeys } from '../models/firebaseBaseModels';

export async function storeDocument<T = object>(folder: FolderKeys, docName: DocumentKeys, payload: Partial<T>): Promise<T> {
  const docRef = doc(firebaseDB, folder, docName);
  await setDoc(docRef, payload, { merge: true });
  const docSnap = await getDoc(docRef);
  return docSnap.data() as T;
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
  return docSnap.data() as T;
}