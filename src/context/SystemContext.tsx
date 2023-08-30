import { Breakpoint } from '@mui/material';
import { ReactNode, createContext, useCallback, useContext, useMemo, useState } from 'react';

interface SystemContextValues {
  mainViewMaxWidth: Breakpoint;
  isTransparentAppBar: boolean;
  setIsTransparentAppBar: (value: boolean) => void;
  setMainViewMaxWidth: (brakepoint: Breakpoint) => void;
  setFullWidth: () => void;
  resetMainViewMaxWidthToDefault: () => void;
}

const SystemContext = createContext<SystemContextValues>({
  mainViewMaxWidth: 'sm',
  isTransparentAppBar: false,
  setMainViewMaxWidth: () => {},
  setIsTransparentAppBar: () => {},
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
  const [isTransparentAppBar, setIsTransparentAppBar] = useState(false);

  const resetMainViewMaxWidthToDefault = useCallback(() => {
    setMainViewMaxWidth('sm');
  }, []);

  const setFullWidth = useCallback(() => {
    setMainViewMaxWidth('xl');
  }, []);

  const providerValue = useMemo(() => {
    return { mainViewMaxWidth, setMainViewMaxWidth, setFullWidth, resetMainViewMaxWidthToDefault, isTransparentAppBar, setIsTransparentAppBar };
  }, [mainViewMaxWidth, setFullWidth, resetMainViewMaxWidthToDefault, isTransparentAppBar]);

  return <SystemContext.Provider value={providerValue}>{children}</SystemContext.Provider>;
}
