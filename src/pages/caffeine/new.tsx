import { Button, Text, Center, SimpleGrid, VStack } from "@chakra-ui/react";
import { NextPage } from "next";
import Head from "next/head";
import { Layout } from "../../components/Layout";
import React, { useState } from "react";
import { SelectDrink } from "../../components/SelectDrink";
import { beverageList, BeverageType, Caffeine } from "../../lib/caffeine";
import { InputCaffeine } from "../../components/InputCaffeine";
import firebase from "firebase";
import { useUser } from "../../lib/user";
import Router from "next/router";

const CaffeineNewPage: NextPage = () => {
  const userState = useUser();

  const [beverageType, setBeverageType] = useState<BeverageType | undefined>(
    undefined
  );
  const [beverageIndex, setBeverageIndex] = useState<number | undefined>(
    undefined
  );
  const [inputCaffeine, setInputCaffeine] = useState<number | undefined>(
    undefined
  );

  const createCaffeine = async () => {
    if (userState.state !== "LOADED") {
      return;
    }

    if (beverageType === undefined || beverageIndex === undefined) {
      return;
    }

    const amount =
      beverageList[beverageType][beverageIndex].amount ?? inputCaffeine;

    if (amount === undefined) {
      return;
    }

    const caffeine: Caffeine = {
      amount,
      time: firebase.firestore.Timestamp.now(),
      beverage: beverageList[beverageType][beverageIndex].name,
    };

    const added = await firebase
      .firestore()
      .collection(`/users/${userState.user.id}/caffeine`)
      .add(caffeine);

    Router.push(`/caffeine/${added.id}`);
  };

  return (
    <Layout>
      <Head>
        <title>カフェイン記録登録 | Caffeine Busters</title>
      </Head>
      <VStack
        as="form"
        onSubmit={(e) => {
          e.preventDefault();
          createCaffeine();
        }}
      >
        <Center>
          <Text fontSize="2xl">飲んだのは</Text>
        </Center>
        <SimpleGrid columns={[3, null, 3]} spacing="30px">
          <Button
            colorScheme="black"
            variant="outline"
            onClick={() => {
              setBeverageIndex(undefined);
              setBeverageType("energy");
            }}
          >
            エナドリ
          </Button>
          <Button
            colorScheme="black"
            variant="outline"
            onClick={() => {
              setBeverageIndex(undefined);
              setBeverageType("coffee");
            }}
          >
            コーヒー
          </Button>
          <Button
            colorScheme="black"
            variant="outline"
            onClick={() => {
              setBeverageIndex(undefined);
              setBeverageType("others");
            }}
          >
            その他
          </Button>
        </SimpleGrid>
        {beverageType !== undefined && (
          <SelectDrink
            drinks={beverageList[beverageType].map(({ name }) => name)}
            selected={beverageIndex}
            onSelect={setBeverageIndex}
          />
        )}
        {beverageType !== undefined &&
          beverageIndex !== undefined &&
          beverageList[beverageType][beverageIndex].amount === undefined && (
            <InputCaffeine value={inputCaffeine} onChange={setInputCaffeine} />
          )}
        {beverageType !== undefined &&
          beverageIndex !== undefined &&
          (beverageList[beverageType][beverageIndex].amount !== undefined ||
            inputCaffeine !== undefined) && (
            <Center>
              <SimpleGrid columns={[1, null, 1]} spacing="30px">
                <Button
                  type="submit"
                  colorScheme="black"
                  variant="outline"
                  onClick={() => {}}
                >
                  登録
                </Button>
              </SimpleGrid>
            </Center>
          )}
      </VStack>
    </Layout>
  );
};

export default CaffeineNewPage;
