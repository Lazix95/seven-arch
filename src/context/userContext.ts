import { createContext, useContext } from 'react';
import { User } from '../features/firebase/firebase';

export const UserContext = createContext<User | null | undefined>(undefined);

export function useUserContext() {
  return useContext(UserContext);
}

export const UserContextProvider = UserContext.Provider;