import { Breakpoint } from '@mui/material';
import { ReactNode, createContext, useCallback, useContext, useMemo, useState } from 'react';

interface SystemContextValues {
  mainViewMaxWidth: Breakpoint;
  setMainViewMaxWidth: (brakepoint: Breakpoint) => void;
  setFullWidth: () => void;
  resetMainViewMaxWidthToDefault: () => void;
}

const SystemContext = createContext<SystemContextValues>({
  mainViewMaxWidth: 'sm',
  setMainViewMaxWidth: () => {},
  setFullWidth: () => {},
  resetMainViewMaxWidthToDefault: () => {},
});

interface SystemContextProviderProps {
  children: ReactNode;
}

export function useSystemContext() {
  return useContext(SystemContext);
}

export function SystemContextProvider({ children }: SystemContextProviderProps) {
  const [mainViewMaxWidth, setMainViewMaxWidth] = useState<Breakpoint>('sm');

  const resetMainViewMaxWidthToDefault = useCallback(() => {
    setMainViewMaxWidth('sm');
  }, []);

  const setFullWidth = useCallback(() => {
    setMainViewMaxWidth('xl');
  }, []);

  const providerValue = useMemo(() => {
    return { mainViewMaxWidth, setMainViewMaxWidth, setFullWidth, resetMainViewMaxWidthToDefault };
  }, [mainViewMaxWidth, setFullWidth, resetMainViewMaxWidthToDefault]);

  return <SystemContext.Provider value={providerValue}>{children}</SystemContext.Provider>;
}
