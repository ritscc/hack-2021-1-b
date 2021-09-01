import {
  Image,
  Box,
  Text,
  Heading,
  Spinner,
  Center,
  VStack,
} from "@chakra-ui/react";
import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useDocument } from "react-firebase-hooks/firestore";
import { Layout } from "../../components/Layout";
import { useUser } from "../../lib/user";
import firebase from "firebase";
import { beverageImageSrcs, beverageTexts, Caffeine } from "../../lib/caffeine";
import dayjs from "dayjs";
import { PrivatePage } from "../../components/PrivatePage";
import { SEO } from "../../components/SEO";

const IndexPage: NextPage = () => {
  const router = useRouter();
  const userState = useUser();

  const caffeineId =
    router.query.caffeineId && Array.isArray(router.query.caffeineId)
      ? router.query.caffeineId[0]
      : router.query.caffeineId;

  const [caffeine] = useDocument<Caffeine>(
    userState.user !== undefined && caffeineId !== undefined
      ? firebase
          .firestore()
          .doc(`/users/${userState.user.id}/caffeine/${caffeineId}`)
      : undefined
  );

  return (
    <Layout>
      <Head>
        <SEO
          title="カフェイン記録"
          description=""
          path={`/caffeine/${caffeineId}`}
        />
      </Head>
      <PrivatePage
        renderOnSignedIn={() => {
          if (caffeine === undefined) {
            return <Spinner size="xl" m="auto" />;
          }
          const data = caffeine.data();

          if (data === undefined) {
            return <Heading>404 カフェイン記録が見つかりません</Heading>;
          }

          return (
            <>
              <Heading>カフェイン記録</Heading>
              <Text>
                {dayjs(data.time.toDate()).format("YYYY年 M月 D日 H時 m分")}
              </Text>

              <Center>
                <VStack>
                  <Image
                    src={beverageImageSrcs[data.beverageType]}
                    alt={`${beverageTexts[data.beverageType]}の画像`}
                    h="40"
                    w="40"
                  />
                  <Text>{beverageTexts[data.beverageType]}</Text>
                </VStack>
              </Center>

              <Text textAlign="center" fontSize="2xl">
                {data.beverage}
              </Text>
              <Text textAlign="center" fontSize="xl">
                カフェイン {data.amount} mg
              </Text>
            </>
          );
        }}
      />
    </Layout>
  );
};

export default IndexPage;
