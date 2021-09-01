import { Button, Flex, Text, VStack } from "@chakra-ui/react";
import dayjs from "dayjs";
import { useState, VFC } from "react";
import { useUser } from "../lib/user";
import { BedtimeForm } from "./BedtimeForm";

export const Bedtime: VFC = () => {
  const userState = useUser();
  const [showBedtimeForm, setShowBedtimeForm] = useState<boolean>(false);

  if (userState.user === undefined) {
    return null;
  }

  const caffeineTimeLimitText = dayjs(userState.user.bedtime, "HH:mm")
    .subtract(6, "hour")
    .format("HH:mm");

  const isAfterCaffeineTimeLimitText = dayjs().isAfter(
    dayjs(caffeineTimeLimitText, "HH:mm")
  );

  return (
    <VStack spacing="4" align="stretch">
      <Flex align="center">
        {userState.user.bedtime !== null && !isAfterCaffeineTimeLimitText && (
          <Text flexGrow={1}>
            就寝6時間前の
            {caffeineTimeLimitText}
            までは飲めます
          </Text>
        )}
        {userState.user.bedtime !== null && isAfterCaffeineTimeLimitText && (
          <Text flexGrow={1} color="red.500">
            就寝6時間前の
            {caffeineTimeLimitText}
            を過ぎています。 もう飲まないようにしましょう。
          </Text>
        )}
        {userState.user.bedtime === null && (
          <Text flexGrow={1}>就寝時刻が未設定です</Text>
        )}

        <Button onClick={() => setShowBedtimeForm(!showBedtimeForm)}>
          就寝時刻の設定
        </Button>
      </Flex>
      {showBedtimeForm && (
        <BedtimeForm
          onClose={() => {
            setShowBedtimeForm(false);
          }}
        />
      )}
    </VStack>
  );
};
