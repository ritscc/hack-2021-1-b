import { Box, Button, Flex, Text, VStack } from "@chakra-ui/react";
import { NextPage } from "next";
import Head from "next/head";
import { Layout } from "../../components/Layout";

const IndexPage: NextPage = () => {
  return (
    <Layout>
      <Head>
        <title>カフェイン記録一覧 | Caffeine Busters</title>
      </Head>
      <VStack align="stretch">
        <Flex>
          <Text flexGrow={1}>☕ ドリップコーヒー</Text>
          <Text>今日</Text>
        </Flex>
        <Flex>
          <Text flexGrow={1}>☕ ドリップコーヒー</Text>
          <Text>今日</Text>
        </Flex>
        <Flex>
          <Text flexGrow={1}>☕ ドリップコーヒー</Text>
          <Text>今日</Text>
        </Flex>
        <Flex>
          <Text flexGrow={1}>☕ ドリップコーヒー</Text>
          <Text>今日</Text>
        </Flex>
        <Flex>
          <Text flexGrow={1}>☕ ドリップコーヒー</Text>
          <Text>今日</Text>
        </Flex>
      </VStack>
    </Layout>
  );
};

export default IndexPage;
