import { getAuth, User as AuthUser } from "firebase/auth";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import { createContext, FC, useContext, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDocumentData } from "react-firebase-hooks/firestore";

export type User = {
  id: string;
  name?: string;
  photoURL?: string;
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
      error: Error;
      user?: undefined;
    };

const userContext = createContext<UserState>({ state: "LOADING_AUTH" });

const getUserFromAuth = (authUser: AuthUser): User =>
  authUser && {
    id: authUser.uid,
    // convert null to undefined
    photoURL: authUser.photoURL ?? undefined,
    name: authUser.displayName ?? undefined,
  };

const useUserProviderState = (): UserState => {
  const [authUser, authLoading, authError] = useAuthState(getAuth());

  const userId = authUser?.uid;

  const userDoc =
    userId !== undefined ? doc(getFirestore(), "users", userId) : undefined;

  const [firestoreUser, firestoreLoading, firestoreError] =
    useDocumentData<User>(userDoc);

  useEffect(() => {
    if (userDoc === undefined || firestoreUser !== undefined) {
      return;
    }

    setDoc(userDoc, getUserFromAuth(authUser));
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
