import { Center, Spinner, Text, VStack } from "@chakra-ui/react";
import dayjs from "dayjs";
import firebase from "firebase";
import React, { useMemo, VFC } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { Caffeine } from "../lib/caffeine";
import { useUser } from "../lib/user";

export const RemainingCoffees: VFC = () => {
  const userState = useUser();

  const todayCaffeinesQuery = useMemo(
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

  const [todayCaffeineList] = useCollection<Caffeine>(todayCaffeinesQuery);

  const todayCaffeineTotal = todayCaffeineList?.docs.reduce(
    (previous, current) => previous + current.data().amount,
    0
  );

  return (
    <Center h="72">
      {todayCaffeineTotal === undefined && <Spinner size="lg" />}
      {todayCaffeineTotal !== undefined && (
        <VStack spacing="4" align="stretch" justify="center">
          <Text textAlign="center" style={{ fontSize: 30 }}>
            今日飲めるのは
            <br />
            あと
          </Text>
          <Text textAlign="center" style={{ fontSize: 50 }}>
            ☕️× {Math.floor((400 - todayCaffeineTotal) / 84)} 杯
          </Text>
        </VStack>
      )}
    </Center>
  );
};
