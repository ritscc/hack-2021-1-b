import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { UserProvider } from "../lib/user";
import dayjs from "dayjs";
import "dayjs/locale/ja";
import relativeTime from "dayjs/plugin/relativeTime";
import customParseFormat from "dayjs/plugin/customParseFormat";
import isBetween from "dayjs/plugin/isBetween";
import { theme } from "../lib/theme";

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

dayjs.extend(relativeTime);
dayjs.locale("ja");
dayjs.extend(customParseFormat);
dayjs.extend(isBetween);

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <UserProvider>
        <Component {...pageProps} />
      </UserProvider>
    </ChakraProvider>
  );
}

export default MyApp;
