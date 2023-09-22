import {
  Auth,
  browserSessionPersistence,
  browserLocalPersistence,
  getAuth,
  onAuthStateChanged,
  setPersistence,
  signInWithEmailAndPassword,
  signOut,
  User,
} from 'firebase/auth';

export async function signIn(email: string, password: string, rememberMe?: boolean) {
  const auth = getAuth();
  await saveUserSession(auth, rememberMe);
  return signInUserWithEmailAndPass(auth, email, password);
}

export function signUserOut() {
  const auth = getAuth();
  return signOut(auth);
}

export function watchForUserData(onUserStatusChanged: (user: User | null) => void) {
  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    onUserStatusChanged(user);
  });
}

function saveUserSession(auth: Auth, rememberMe?: boolean) {
  return setPersistence(auth, rememberMe ? browserLocalPersistence : browserSessionPersistence);
}

function signInUserWithEmailAndPass(auth: Auth, email: string, password: string) {
  return signInWithEmailAndPassword(auth, email, password);
}
