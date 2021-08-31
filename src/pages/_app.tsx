import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
import { UserProvider } from "../lib/user";

const firebaseConfig = {
  apiKey: "AIzaSyBznwwXlS_GUVrn9_ooOAZB0NJvNeYpvcc",
  authDomain: "caffeine-busters.firebaseapp.com",
  projectId: "caffeine-busters",
  storageBucket: "caffeine-busters.appspot.com",
  messagingSenderId: "581791488894",
  appId: "1:581791488894:web:0e5e33d97d38bb2f2df12f",
};

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <UserProvider>
        <Component {...pageProps} />
      </UserProvider>
    </ChakraProvider>
  );
}

export default MyApp;
