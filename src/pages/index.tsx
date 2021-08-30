import { Box, Button, Text } from "@chakra-ui/react";
import { NextPage } from "next";
import Head from "next/head";
import { Layout } from "../components/Layout";

const IndexPage: NextPage = () => {
  return (
    <Layout>
      <Head>
        <title>Caffeine Busters</title>
      </Head>
      <Text textAlign="center">超カフェインバスターズ</Text>
      <Box textAlign="center">
        <Button onClick={() => alert("こんにちは")}>ボタンだよ</Button>
      </Box>
    </Layout>
  );
};

export default IndexPage;
