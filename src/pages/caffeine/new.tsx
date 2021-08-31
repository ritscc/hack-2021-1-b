import { Button, Text, Center, SimpleGrid, Select } from "@chakra-ui/react";
import { NextPage } from "next";
import Head from "next/head";
import { Layout } from "../../components/Layout";
import React, { useState } from "react";
import { SelectDrink } from "../../components/SelectDrink";
import { beverageList, BeverageName, BeverageType } from "../../lib/caffeine";
import { InputCaffeine } from "../../components/InputCaffeine";

const CaffeineNewPage: NextPage = () => {
  const [beverageType, setBeverageType] =
    useState<BeverageType | undefined>(undefined);
  const [beverageIndex, setBeverageIndex] =
    useState<number | undefined>(undefined);
  const [inputCaffeine, setInputCaffeine] =
    useState<number | undefined>(undefined);

  return (
    <Layout>
      <Head>
        <title>カフェイン記録登録 | Caffeine Busters</title>
      </Head>
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
              <Button colorScheme="black" variant="outline" onClick={() => {}}>
                登録
              </Button>
            </SimpleGrid>
          </Center>
        )}
    </Layout>
  );
};

export default CaffeineNewPage;
