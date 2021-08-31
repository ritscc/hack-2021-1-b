import { NextPage } from "next";
import Head from "next/head";
import { Layout } from "../components/Layout";
import { useUser } from "../lib/user";
import {
  Button,
  Center,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  VStack,
} from "@chakra-ui/react";
import firebase from "firebase/app";
import { SignUpForm } from "../components/SignUpForm";
import { SignInForm } from "../components/SignInForm";
import NextLink from "next/link";

const signUp = async (data: { email: string; password: string }) => {
  await firebase
    .auth()
    .createUserWithEmailAndPassword(data.email, data.password);
};

const signIn = async (data: { email: string; password: string }) => {
  await firebase.auth().signInWithEmailAndPassword(data.email, data.password);
};

const LoginPage: NextPage = () => {
  const userState = useUser();

  return (
    <Layout>
      <Head>
        <title>ログイン | Caffeine Busters</title>
      </Head>
      {userState.state === "UNAUTHORIZED" && (
        <Tabs isFitted>
          <TabList>
            <Tab>新規登録</Tab>
            <Tab>ログイン</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <SignUpForm onSubmit={signUp} />
            </TabPanel>

            <TabPanel>
              <SignInForm onSubmit={signIn} />
            </TabPanel>
          </TabPanels>
        </Tabs>
      )}
      {userState.state === "LOADED" && (
        <Center>
          <VStack>
            <Text>すでにログインされています。</Text>

            <NextLink href="/">
              <Button as="a">トップへ</Button>
            </NextLink>
          </VStack>
        </Center>
      )}
    </Layout>
  );
};

export default LoginPage;
