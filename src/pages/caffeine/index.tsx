import { Flex, Text, VStack, Spacer, Box } from "@chakra-ui/react";
import { NextPage } from "next";
import Head from "next/head";
import { useCollection } from "react-firebase-hooks/firestore";
import { Layout } from "../../components/Layout";
import firebase from "firebase";
import { useUser } from "../../lib/user";
import { Caffeine } from "../../lib/caffeine";
import dayjs from "dayjs";
import NextLink from "next/link";

const IndexPage: NextPage = () => {
  const userState = useUser();

  const [caffeineList, loadingCaffeineList] = useCollection<Caffeine>(
    userState.user &&
      firebase.firestore().collection(`/users/${userState.user.id}/caffeine`)
  );

  return (
    <Layout>
      <Head>
        <title>カフェイン記録一覧 | Caffeine Busters</title>
      </Head>

      {loadingCaffeineList && <Text align="center">Loading...</Text>}
      {caffeineList && (
        <VStack align="stretch">
          {caffeineList.docs.map((doc, i, self) => {
            const data = doc.data();
            const time = dayjs(data.time.toDate());
            const isLast = i === self.length - 1;

            return (
              <NextLink href={`/caffeine/${doc.id}`} key={doc.id}>
                <Flex
                  as="a"
                  p="2"
                  align="center"
                  borderBottomWidth={!isLast ? "thin" : undefined}
                >
                  <Text px="2" fontSize="lg">
                    {data.beverage}
                  </Text>
                  <Spacer />
                  <Flex flexDir="column" fontSize="sm" textAlign="right">
                    <Text>{data.amount} mg</Text>
                    <Text title={time.format("YYYY/MM/DD HH:mm:ss")}>
                      {time.fromNow()}
                    </Text>
                  </Flex>
                </Flex>
              </NextLink>
            );
          })}
        </VStack>
      )}
    </Layout>
  );
};

export default IndexPage;
