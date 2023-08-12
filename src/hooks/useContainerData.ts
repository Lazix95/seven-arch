import { Reducer, useReducer } from 'react';

interface ReduceAction {
  type: 'SET_DATA' | 'UPDATE_DATA' | 'CLEAR';
  payload?: object;
}

function conteinerDataReducer(state: object, action: ReduceAction) {
  switch (action.type) {
    case 'SET_DATA':
      return { ...action.payload };
    case 'UPDATE_DATA':
      return { ...state, ...action.payload };
    case 'CLEAR':
      return {};
    default:
      return { ...state };
  }
}

export function useContainerData<T extends object = object>(initState: T) {
  const [state, dispatch] = useReducer(conteinerDataReducer, initState);

  function setState(payload: T) {
    dispatch({ type: 'SET_DATA', payload });
  }

  function updateState(payload: Partial<T>) {
    dispatch({ type: 'UPDATE_DATA', payload });
  }

  function clearState() {
    dispatch({ type: 'CLEAR' });
  }

  return { state: state as T, setState, updateState, clearState };
}
