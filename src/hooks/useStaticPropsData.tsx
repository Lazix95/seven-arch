import { useContext, createContext, ReactNode, useReducer, useMemo, useState } from 'react';

interface ReduceAction {
  type: 'SET_DATA';
  payload: Record<string, unknown>;
}

const initState = {};

function reducer(state: Record<string, unknown>, action: ReduceAction) {
  switch (action.type) {
    case 'SET_DATA':
      return { ...state, ...action.payload };
    default:
      return state;
  }
}

export const StaticDataContext = createContext({});

export function useStaticDataContext() {
  return useContext(StaticDataContext);
}

export function StaticDataProvider({ children }: { children: ReactNode }) {
  const [data, dispatch] = useReducer(reducer, initState);
  const { getStaticData, registerDataGetter } = useStaticData();

  const providerValue = useMemo(() => ({ data, getStaticData, registerDataGetter }), [data, getStaticData, registerDataGetter]);

  return <StaticDataContext.Provider value={providerValue}>{children}</StaticDataContext.Provider>;
}

export function useStaticData() {
  const [getters, setGetters] = useState<Record<string, () => { props: Record<string, unknown> }>>({});

  function registerDataGetter(name: string, getter: () => { props: Record<string, unknown> }) {
    setGetters((oldGetters) => ({ ...oldGetters, [name]: getter }));
  }

  function getStaticData() {
    return Object.values(getters);
  }

  return { getStaticData, registerDataGetter };
}
