import { Image, Box, Text } from "@chakra-ui/react";
import { NextPage } from "next";
import Head from "next/head";
import { Layout } from "../../components/Layout";


const IndexPage: NextPage = () => {
    const nowStr = Date();
    return (
      <Layout>
        <Head>
          <title>Caffeine Busters</title>
        </Head>
        <Text textAlign="left">カフェイン記録</Text>
        <Text>2021/8/31 23:59</Text>

        <Box boxSize="sm">
        <Image
            boxSize="400px"
            objectFit="cover"
            src="https://3.bp.blogspot.com/-7A9qrVipedQ/VyNdIMyg-fI/AAAAAAAA6LI/kGw0Eqa17-UxwtCiulVzHTwfHI_9lBzKwCLcB/s800/coffee01_blend.png"
            alt="coffee"
        />
        </Box>

        <Text textAlign="center">ドリップコーヒー 100mg</Text>
        
      </Layout>
    );
  };
  
  export default IndexPage;