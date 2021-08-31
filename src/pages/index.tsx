import { Box, Button, Flex, Text, VStack } from "@chakra-ui/react";
import dayjs from "dayjs";
import { NextPage } from "next";
import Head from "next/head";
import NextLink from "next/link";
import { useState } from "react";
import { BedtimeForm } from "../components/BedtimeForm";
import { CaffeineCalender } from "../components/CaffeineCalender";
import { Layout } from "../components/Layout";
import { RemainingCoffees } from "../components/RemainingCoffees";
import { useUser } from "../lib/user";

const IndexPage: NextPage = () => {
  const userState = useUser();
  const [showBedtimeForm, setShowBedtimeForm] = useState<boolean>(false);

  return (
    <Layout>
      <Head>
        <title>Caffeine Busters</title>
      </Head>

      {userState.state === "UNAUTHORIZED" && (
        <NextLink href="/auth">
          <Button as="a">ログイン</Button>
        </NextLink>
      )}

      {userState.state === "LOADED" && (
        <VStack spacing="4" align="stretch">
          <RemainingCoffees />
          <Flex align="center">
            {userState.user.bedtime !== null && (
              <Text flexGrow={1}>
                就寝6時間前の
                <br />
                {dayjs(userState.user.bedtime, "HH:mm")
                  .subtract(6, "hour")
                  .format("HH:mm")}
                まで飲めます
              </Text>
            )}
            {userState.user.bedtime === null && (
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
      )}
    </Layout>
  );
};

export default IndexPage;
