import { Button, Text, VStack } from "@chakra-ui/react";
import { NextPage } from "next";
import NextLink from "next/link";
import { Bedtime } from "../components/Bedtime";
import { CaffeineCalender } from "../components/CaffeineCalender";
import { Layout } from "../components/Layout";
import { Poem } from "../components/Poem";
import { PrivatePage } from "../components/PrivatePage";
import { RemainingCoffees } from "../components/RemainingCoffees";
import { SEO } from "../components/SEO";

const IndexPage: NextPage = () => {
  return (
    <Layout>
      <SEO title="" description="Caffeine Busters" path="/" />

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
            <Poem />
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
