import { DocumentReference } from 'firebase/firestore';
import { entities, documents, folders } from '../../../constants/entitiesAndFoldersNames';

export type GenericPayload = {
  [key in EntityKeys]?: DocumentReference[];
} & {
  [key: string]: unknown;
};

type FoldersKeys = keyof typeof folders;
export type FolderKeys = (typeof folders)[FoldersKeys];

type DocumentsKeys = keyof typeof documents;
export type DocumentKeys = (typeof documents)[DocumentsKeys];

type EntitiesKeys = keyof typeof entities;
export type EntityKeys = (typeof entities)[EntitiesKeys];
