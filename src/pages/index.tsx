import { Box, Button, Flex, Text, VStack } from "@chakra-ui/react";
import { NextPage } from "next";
import Head from "next/head";
import { Layout } from "../components/Layout";

const IndexPage: NextPage = () => {
  return (
    <Layout>
      <Head>
        <title>Caffeine Busters</title>
      </Head> 
      <Text textAlign="center" style={{fontSize: 30 }}>今日飲めるのは<br/>あと</Text>
      <Text textAlign="center" style={{fontSize: 50 }}>☕️×n</Text>
      <Flex>
        <Text flexGrow ={1}>就寝6時間前の<br />19時まで飲めます</Text>
        <Box>
          <Button onClick={() => alert("こんにちは")}>就寝時刻の設定</Button>
        </Box>
      </Flex>
      <VStack align="stretch" gap = "4">
        <Button size="lg"  onClick={() => alert("こんにちは")}>飲んだ</Button>
        <Button size="lg"  onClick={() => alert("こんにちは")}>記録を確認</Button>
      </VStack>

      <Text>カフェインカレンダー</Text>

    </Layout>
  );
};

export default IndexPage;
