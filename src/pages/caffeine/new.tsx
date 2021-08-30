import { Box, Button, Flex, Text, VStack } from "@chakra-ui/react";
import { NextPage } from "next";
import Head from "next/head";
import { Layout } from "../../components/Layout";

const IndexPage: NextPage = () => {
  return (
    <Layout>
      <Head>
        <title>カフェイン記録登録 | Caffeine Busters</title>
      </Head>
      <Text>カフェイン記録登録</Text>
    </Layout>
  );
};

export default IndexPage;
