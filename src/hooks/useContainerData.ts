import { Reducer, useReducer } from 'react';

interface ReduceActionAddToArray<T> {
  type: 'ADD_TO_ARRAY';
  payload: { key: KeyWithArrayValue<T>; item: unknown };
}

interface ReduceActionDeleteItemFromArray<T> {
  type: 'DELETE_ITEM_FROM_ARRAY';
  payload: { key: KeyWithArrayValue<T>; idKey: string | number; idValue: string | number };
}

interface ReduceAction<T> {
  type: 'SET_DATA' | 'UPDATE_DATA' | 'CLEAR';
  payload?: Partial<T>;
}

type ReduceActions<T> = ReduceAction<T> | ReduceActionAddToArray<T> | ReduceActionDeleteItemFromArray<T>;

function conteinerDataReducer<T>(state: T, action: ReduceActions<T>): T {
  switch (action.type) {
    case 'SET_DATA':
      return { ...(action.payload as T) };
    case 'UPDATE_DATA':
      return { ...state, ...action.payload };
    case 'CLEAR':
      return {} as T;
    case 'ADD_TO_ARRAY':
      const keyAdd = action.payload.key;
      const item = action.payload?.item;
      const st = state[keyAdd] as [];
      return { ...state, [keyAdd]: [...st, item] };
    case 'DELETE_ITEM_FROM_ARRAY':
      const keyDelete = action.payload.key;
      const idKey = action.payload.idKey;
      const idValue = action.payload.idValue;
      let newArray = (state[keyDelete] as []).filter((item: any) => item[idKey] !== idValue);
      return { ...state, [keyDelete]: newArray };
    default:
      return { ...state };
  }
}

export function useContainerData<T extends object = object>(initState: T) {
  const [state, dispatch] = useReducer(conteinerDataReducer<T>, initState);

  function setState(payload: T) {
    dispatch({ type: 'SET_DATA', payload });
  }

  function updateState(payload: Partial<T>) {
    dispatch({ type: 'UPDATE_DATA', payload });
  }

  function addToArrayInState(key: KeyWithArrayValue<T>, payload: unknown) {
    dispatch({ type: 'ADD_TO_ARRAY', payload: { key, item: payload } });
  }

  function deleteFromArrayInState(key: KeyWithArrayValue<T>, idKey: string | number, idValue: string | number) {
    dispatch({ type: 'DELETE_ITEM_FROM_ARRAY', payload: { key, idKey, idValue } });
  }
  function clearState() {
    dispatch({ type: 'CLEAR' });
  }

  return { state: state as T, setState, updateState, clearState, addToArrayInState, deleteFromArrayInState };
}

type KeyWithArrayValue<T> = {
  [K in keyof T]: T[K] extends Array<any> ? K : never;
}[keyof T];
