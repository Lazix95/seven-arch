import { collection, deleteDoc, doc, getDoc, getDocs, setDoc } from 'firebase/firestore';
import { EntityKeys, FolderKeys, GenericPayload } from '../models/firebaseBaseModels';
import { firebaseDB } from '../firebase';
import { uuidV4 } from '@/plugins/uuid';

export async function storeEntity<T extends GenericPayload>({ entity, payload, id }: { entity: EntityKeys; payload: Partial<T>; id?: string }) {
  const uuid = id ?? uuidV4();
  const docRef = doc(firebaseDB, entity, uuid);
  await setDoc(docRef, { id, ...payload });
  return (await getDoc(docRef)).data() as T;
}

export async function updateEntityById<T extends GenericPayload>({ entity, id, payload }: { entity: EntityKeys; id: string; payload: T }) {
  const docRef = doc(firebaseDB, entity, id);
  await setDoc(docRef, { ...payload, id }, { merge: true });
  return (await getDoc(docRef)).data() as T;
}

export async function getEntities<T = unknown>(entity: EntityKeys | FolderKeys): Promise<T[]> {
  let results: T[] = [];
  const query = await getDocs(collection(firebaseDB, entity));
  query.forEach((entity) => (results = [...results, entity.data() as T]));
  return results;
}

export async function getEntityById<T = unknown>(entity: EntityKeys, id: string): Promise<T> {
  const docRef = doc(firebaseDB, entity, id);
  const docSnap = await getDoc(docRef);
  return docSnap.data() as T;
}

export async function deleteEntity(entity: EntityKeys, id: string): Promise<void> {
  const docRef = doc(firebaseDB, entity, id);
  await deleteDoc(docRef);
}
