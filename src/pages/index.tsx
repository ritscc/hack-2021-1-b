import { Box, Button, Flex, Text, VStack } from "@chakra-ui/react";
import dayjs from "dayjs";
import { NextPage } from "next";
import Head from "next/head";
import NextLink from "next/link";
import { useState } from "react";
import { BedtimeForm } from "../components/BedtimeForm";
import { CaffeineCalender } from "../components/CaffeineCalender";
import { Layout } from "../components/Layout";
import { PrivatePage } from "../components/PrivatePage";
import { RemainingCoffees } from "../components/RemainingCoffees";

const IndexPage: NextPage = () => {
  const [showBedtimeForm, setShowBedtimeForm] = useState<boolean>(false);

  return (
    <Layout>
      <Head>
        <title>Caffeine Busters</title>
      </Head>

      <PrivatePage
        renderOnSignedIn={(user) => {
          const caffeineTimeLimit = dayjs(user.bedtime, "HH:mm") //
            .subtract(6, "hour");

          const caffeineTimeLimitText = caffeineTimeLimit.format("HH:mm");

          const isAfterCaffeineTimeLimitText =
            dayjs().isAfter(caffeineTimeLimit);

          return (
            <VStack spacing="4" align="stretch">
              <RemainingCoffees />
              <Flex align="center">
                {user.bedtime !== null && !isAfterCaffeineTimeLimitText && (
                  <Text flexGrow={1}>
                    就寝6時間前の
                    {caffeineTimeLimitText}
                    までは飲めます
                  </Text>
                )}
                {user.bedtime !== null && isAfterCaffeineTimeLimitText && (
                  <Text flexGrow={1} color="red.500">
                    就寝6時間前の
                    {caffeineTimeLimitText}
                    を過ぎています。 もう飲まないようにしましょう。
                  </Text>
                )}
                {user.bedtime === null && (
                  <Text flexGrow={1}>就寝時刻が未設定です</Text>
                )}

                <Box>
                  <Button onClick={() => setShowBedtimeForm(!showBedtimeForm)}>
                    就寝時刻の設定
                  </Button>
                </Box>
              </Flex>
              {showBedtimeForm && (
                <BedtimeForm
                  onClose={() => {
                    setShowBedtimeForm(false);
                  }}
                />
              )}
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
