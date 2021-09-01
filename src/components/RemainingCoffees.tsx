import { Box, Progress, Spinner, Text, VStack } from "@chakra-ui/react";
import dayjs from "dayjs";
import firebase from "firebase/app";
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
    <VStack spacing="4" alignItems="stretch" justify="center" h="72">
      {todayCaffeineTotal === undefined && <Spinner size="lg" m="auto" />}
      {todayCaffeineTotal !== undefined && (
        <Progress
          colorScheme="orange"
          value={Math.min((todayCaffeineTotal / 400) * 100, 100)}
        />
      )}
      {todayCaffeineTotal !== undefined && todayCaffeineTotal <= 400 && (
        <Box>
          <Text textAlign="center" fontSize="30">
            今日飲めるのは
            <br />
            あと
          </Text>
          <Text textAlign="center" fontSize="50">
            ☕️× {Math.floor((400 - todayCaffeineTotal) / 84)} 杯
          </Text>
          <Text textAlign="center">
            <b>現在の摂取量:</b>
            {todayCaffeineTotal}
            mg
          </Text>
        </Box>
      )}
      {todayCaffeineTotal !== undefined && todayCaffeineTotal > 400 && (
        <Box>
          <Text
            textAlign="center"
            fontSize="30"
            color="red.500"
            fontWeight="bold"
          >
            もう飲めません！
          </Text>
          <Text fontSize="30" textAlign="center">
            😰
          </Text>
          <Text textAlign="center">
            カフェインの摂取量が、健康な成人の推奨摂取量上限である 400mg
            を超えています。
          </Text>
        </Box>
      )}
    </VStack>
  );
};
