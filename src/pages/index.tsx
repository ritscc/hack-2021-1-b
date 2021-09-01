import { Box, Button, Image, Text, VStack } from "@chakra-ui/react";
import { NextPage } from "next";
import Head from "next/head";
import NextLink from "next/link";
import { Bedtime } from "../components/Bedtime";
import { CaffeineCalender } from "../components/CaffeineCalender";
import { Layout } from "../components/Layout";
import { Logo } from "../components/Logo";
import { PrivatePage } from "../components/PrivatePage";
import { RemainingCoffees } from "../components/RemainingCoffees";

const IndexPage: NextPage = () => {
  return (
    <Layout>
      <Head>
        <title>Caffeine Busters</title>
      </Head>

      <PrivatePage
        renderOnUnauthorized={() => (
          <VStack alignItems="stretch">
            <Text textAlign="center" p="8">
              <NextLink href="/auth" passHref>
                <Button as="a" size="lg">
                  ログイン
                </Button>
              </NextLink>
            </Text>
            <VStack alignItems="stretch" bgColor="black" color="white" p="8">
              <Text>
                <Box display="inline-block" color="orange.700">
                  <Logo />
                  <br />
                </Box>
                の世界を体感せよ！
              </Text>
              <Text>
                ハッカソンで生まれ、RCC で一大ブームを巻き起こしている
                カフェイン管理アプリ、
                <Box display="inline-block" color="orange.700">
                  <Logo />
                  <br />
                </Box>
                ！ 誰もがハマる使用感とパンチのあるアプリです。
              </Text>
              <Text>
                日本のカフェインファンのために、独自のシステムを実現、
                <br />
                <Box display="inline-block" color="orange.700">
                  <Logo />
                  <br />
                </Box>
                ならではのゾクゾク感を体感ください！
              </Text>
              <Text>
                一度使えば、世界中のツイ廃や受験生、そして全ての
                <Box display="inline-block" color="orange.700">
                  <Logo />
                  <br />
                </Box>
                ファンが熱狂するワケを実感できるはず！
              </Text>
              <Text color="green.400">
                <Image
                  src="/assets/images/suppress-the-beast.svg"
                  alt="Suppress the Beast!"
                  w="auto"
                  h="12"
                />
              </Text>
            </VStack>
          </VStack>
        )}
        renderOnSignedIn={() => {
          return (
            <VStack spacing="4" align="stretch">
              <RemainingCoffees />
              <Bedtime />
              <VStack align="stretch" gap="4">
                <NextLink href="/caffeine/new" passHref>
                  <Button size="lg" as="a">
                    飲んだ
                  </Button>
                </NextLink>
                <NextLink href="/caffeine/" passHref>
                  <Button size="lg" as="a">
                    記録を確認
                  </Button>
                </NextLink>
              </VStack>

              <CaffeineCalender />
            </VStack>
          );
        }}
      />
    </Layout>
  );
};

export default IndexPage;
