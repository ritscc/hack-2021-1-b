import firebase from "firebase/app";
import { createContext, FC, useContext, useEffect } from "react";
import { useAuthState, AuthStateHook } from "react-firebase-hooks/auth";
import { useDocumentData } from "react-firebase-hooks/firestore";

export type User = {
  id: string;
  name: string | null;
  photoURL: string | null;
  bedtime: string | null;
};

type UserState =
  | {
      state: "LOADING_AUTH";
      error?: undefined;
      user?: undefined;
    }
  | {
      state: "UNAUTHORIZED";
      error?: undefined;
      user?: undefined;
    }
  | {
      state: "LOADING_DB";
      error?: undefined;
      user?: undefined;
    }
  | {
      state: "LOADED";
      error?: undefined;
      user: User;
    }
  | {
      state: "ERROR";
      error: Error | firebase.auth.Error;
      user?: undefined;
    };

const userContext = createContext<UserState>({ state: "LOADING_AUTH" });

const getUserFromAuth = (authUser: firebase.User): User => ({
  id: authUser.uid,
  photoURL: authUser.photoURL,
  name: authUser.displayName,
  bedtime: null,
});

const useUserProviderState = (): UserState => {
  const [authUser, authLoading, authError] = useAuthState(firebase.auth());

  const userId = authUser?.uid;

  const userDoc =
    userId !== undefined
      ? firebase.firestore().doc(`users/${userId}`)
      : undefined;

  const [firestoreUser, firestoreLoading, firestoreError] =
    useDocumentData<User>(userDoc);

  useEffect(() => {
    (async () => {
      // not logged in
      if (authUser == null || userDoc === undefined) {
        return;
      }

      const userData = await userDoc.get();

      if (!userData.exists) {
        userDoc.set(getUserFromAuth(authUser));
      }
    })();
  }, [authUser, firestoreUser, userDoc]);

  if (authError !== undefined) {
    return { state: "ERROR", error: authError };
  }

  if (authLoading) {
    return { state: "LOADING_AUTH" };
  }

  if (firestoreError !== undefined) {
    return { state: "ERROR", error: firestoreError };
  }

  if (authUser == null) {
    return { state: "UNAUTHORIZED" };
  }

  if (firestoreLoading) {
    return { state: "LOADING_DB" };
  }

  return {
    state: "LOADED",
    user: firestoreUser ?? getUserFromAuth(authUser),
  };
};

export const UserProvider: FC = ({ children }) => {
  const userState = useUserProviderState();
  return (
    <userContext.Provider value={userState}>{children}</userContext.Provider>
  );
};

export const useUser = (): UserState => useContext(userContext);
