import { CollectionReference, addDoc, collection, deleteDoc, doc, getDoc, getDocs } from 'firebase/firestore';
import { EntityKeys, GenericPayload } from '../models/firebaseBaseModels';
import { firebaseDB } from '../firebase';

export async function storeEntity<T extends GenericPayload>({ entity, payload }: { entity: EntityKeys; payload: T }) {
  const entityCollection = collection(firebaseDB, entity) as CollectionReference<T>;
  const entityRef = await addDoc(entityCollection, payload);
  const docRef = doc(firebaseDB, entity, entityRef.id);
  const res = await getDoc(docRef);
  return res;
}

export async function getEntities<T = unknown>(entity: EntityKeys): Promise<T[]> {
  let results: T[] = [];
  const query = await getDocs(collection(firebaseDB, entity));
  query.forEach((entity) => (results = [...results, entity.data() as T]));
  return results;
}

export async function getEntityById<T = unknown>(entity: EntityKeys, id: string): Promise<T> {
  const docRef = doc(firebaseDB, entity, `${id}`);
  const docSnap = await getDoc(docRef);
  return docSnap.data() as T;
}

export async function deleteEntity(entity: EntityKeys, id: string): Promise<void> {
  const docRef = doc(firebaseDB, entity, `${id}`);
  await deleteDoc(docRef);
}
