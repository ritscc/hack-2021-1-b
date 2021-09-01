import { Button, VStack } from "@chakra-ui/react";
import { NextPage } from "next";
import Head from "next/head";
import NextLink from "next/link";
import { Bedtime } from "../components/Bedtime";
import { CaffeineCalender } from "../components/CaffeineCalender";
import { Layout } from "../components/Layout";
import { PrivatePage } from "../components/PrivatePage";
import { RemainingCoffees } from "../components/RemainingCoffees";

const IndexPage: NextPage = () => {
  return (
    <Layout>
      <Head>
        <title>Caffeine Busters</title>
      </Head>

      <PrivatePage
        renderOnSignedIn={() => {
          return (
            <VStack spacing="4" align="stretch">
              <RemainingCoffees />
              <Bedtime />
              <VStack align="stretch" gap="4">
                <NextLink href="/caffeine/new">
                  <Button size="lg" as="a">
                    飲んだ
                  </Button>
                </NextLink>
                <NextLink href="/caffeine/">
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
