import { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { User } from '@/firebase/firebase';
import { watchForUserData } from '@/firebase';

export const UserContext = createContext<User | null | undefined>(undefined);

export function useUserContext() {
  return useContext(UserContext);
}

export function UserContextProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null | undefined>(undefined);

  useEffect(() => {
    watchForUserData((user) => {
      setUser?.(user);
    });
  }, []);

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}
