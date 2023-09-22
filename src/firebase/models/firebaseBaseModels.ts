import { entities, documents, folders } from '@/constants/entitiesAndFoldersNames';

// Generic Payload need to be type of object that can receive any key and any value, but it must have key id of type string
export type GenericPayload = {
  [key: string]: any;
};

type FoldersKeys = keyof typeof folders;
export type FolderKeys = (typeof folders)[FoldersKeys];

type DocumentsKeys = keyof typeof documents;
export type DocumentKeys = (typeof documents)[DocumentsKeys];

type EntitiesKeys = keyof typeof entities;
export type EntityKeys = (typeof entities)[EntitiesKeys];
