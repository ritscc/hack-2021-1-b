import { Box, Button, Flex, Text, VStack } from "@chakra-ui/react";
import dayjs from "dayjs";
import firebase from "firebase";
import { NextPage } from "next";
import Head from "next/head";
import NextLink from "next/link";
import { useMemo, useState } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { BedtimeForm } from "../components/BedtimeForm";
import { Layout } from "../components/Layout";
import { Caffeine } from "../lib/caffeine";
import { useUser } from "../lib/user";

const IndexPage: NextPage = () => {
  const userState = useUser();
  const [showBedtimeForm, setShowBedtimeForm] = useState<boolean>(false);

  const query = useMemo(
    () =>
      userState.user &&
      firebase
        .firestore()
        .collection(`/users/${userState.user.id}/caffeine`)
        .where(
          "time",
          ">",
          firebase.firestore.Timestamp.fromDate(
            dayjs().subtract(1, "day").toDate()
          )
        )
        .orderBy("time"),
    [userState.user]
  );

  const [todayCaffeineList] = useCollection<Caffeine>(query);

  const todayCaffeineTotal = todayCaffeineList?.docs.reduce(
    (previous, current) => previous + current.data().amount,
    0
  );

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

      {userState.state === "LOADED" && todayCaffeineTotal !== undefined && (
        <VStack spacing="4" align="stretch">
          <Text textAlign="center" style={{ fontSize: 30 }}>
            今日飲めるのは
            <br />
            あと
          </Text>
          <Text textAlign="center" style={{ fontSize: 50 }}>
            ☕️× {Math.floor((400 - todayCaffeineTotal) / 84)} 杯
          </Text>
          <Flex>
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

          <Text>カフェインカレンダー</Text>
        </VStack>
      )}
    </Layout>
  );
};

export default IndexPage;
