import {
  Flex,
  Text,
  VStack,
  Spacer,
  Center,
  Spinner,
  Image,
} from "@chakra-ui/react";
import { NextPage } from "next";
import { useCollection } from "react-firebase-hooks/firestore";
import { Layout } from "../../components/Layout";
import firebase from "firebase/app";
import { useUser } from "../../lib/user";
import { beverageImageSrcs, beverageTexts, Caffeine } from "../../lib/caffeine";
import dayjs from "dayjs";
import NextLink from "next/link";
import { PrivatePage } from "../../components/PrivatePage";
import { SEO } from "../../components/SEO";

const IndexPage: NextPage = () => {
  const userState = useUser();

  const [caffeineList, loadingCaffeineList] = useCollection<Caffeine>(
    userState.user &&
      firebase.firestore().collection(`/users/${userState.user.id}/caffeine`)
  );

  return (
    <Layout>
      <SEO title="カフェイン記録一覧" description="" path="/caffeine" />
      <PrivatePage
        renderOnSignedIn={() => (
          <>
            {loadingCaffeineList && (
              <Center h="100%" w="100%" m="auto">
                <Spinner size="xl" />
              </Center>
            )}
            {caffeineList && (
              <VStack align="stretch">
                {caffeineList.docs.map((doc, i, self) => {
                  const data = doc.data();
                  const time = dayjs(data.time.toDate());
                  const isLast = i === self.length - 1;

                  return (
                    <NextLink
                      href={`/caffeine/${doc.id}`}
                      key={doc.id}
                      passHref
                    >
                      <Flex
                        as="a"
                        p="2"
                        align="center"
                        borderBottomWidth={!isLast ? "thin" : undefined}
                      >
                        <Image
                          src={beverageImageSrcs[data.beverageType]}
                          alt={`${beverageTexts[data.beverageType]}の画像`}
                          h="10"
                          w="10"
                        />
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
          </>
        )}
      />
    </Layout>
  );
};

export default IndexPage;
