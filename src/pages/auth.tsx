import { NextPage } from "next";
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
import Router from "next/router";
import { SEO } from "../components/SEO";

const getRedirectQuery = (): string => {
  const redirectQuery = Router.query.redirect;

  // when `redirect` query is not set, redirect to "/"
  if (redirectQuery === undefined) {
    return "/";
  }

  // with `?redirect=hoge&redirect=fuga` query, redirect to `hoge`
  if (Array.isArray(redirectQuery)) {
    return redirectQuery[0];
  }

  return redirectQuery;
};

const signUp = async (data: { email: string; password: string }) => {
  await firebase
    .auth()
    .createUserWithEmailAndPassword(data.email, data.password);

  Router.push(getRedirectQuery());
};

const signIn = async (data: { email: string; password: string }) => {
  await firebase.auth().signInWithEmailAndPassword(data.email, data.password);

  Router.push(getRedirectQuery());
};

const LoginPage: NextPage = () => {
  const userState = useUser();

  return (
    <Layout>
      <SEO title="ログイン" description="" path="/auth" />

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

            <NextLink href="/" passHref>
              <Button as="a">トップへ</Button>
            </NextLink>
          </VStack>
        </Center>
      )}
    </Layout>
  );
};

export default LoginPage;
