import { Flex, Text, VStack,Spacer } from "@chakra-ui/react";
import { NextPage } from "next";
import Head from "next/head";
import { Layout } from "../../components/Layout";

const IndexPage: NextPage = () => {
  return (
    <Layout>
      <Head>
        <title>カフェイン記録一覧 | Caffeine Busters</title>
      </Head>
      <VStack align="stretch" border="solid" borderColor="orange.600">
        <Flex p="4" borderBottom="solid" borderColor="orange.600">
            <Text>ドリップコーヒー</Text>
            <Spacer />
              <Text>今日</Text>
        </Flex>
        <Flex p="4" borderBottom="solid" borderColor="orange.600">
            <Text>ドリップコーヒー</Text>
            <Spacer />
              <Text>今日</Text>
        </Flex>
        <Flex p="4" borderBottom="solid" borderColor="orange.600">
            <Text>ドリップコーヒー</Text>
            <Spacer />
              <Text>今日</Text>
        </Flex>
        <Flex p="4" borderColor="orange.600">
            <Text>ドリップコーヒー</Text>
            <Spacer />
              <Text>今日</Text>
        </Flex>
      </VStack>
    </Layout>
    
  );
};

export default IndexPage;
