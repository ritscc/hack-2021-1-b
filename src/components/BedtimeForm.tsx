import React, { useState, VFC } from "react";
import {
  Input,
  InputGroup,
  FormControl,
  Button,
  HStack,
  Spacer,
} from "@chakra-ui/react";
import dayjs from "dayjs";
import firebase from "firebase/app";
import { useUser } from "../lib/user";

type Props = {
  onClose: () => void;
};

export const BedtimeForm: VFC<Props> = ({ onClose }) => {
  const [inputTime, setInputTime] = useState<string>("");
  const userState = useUser();

  return (
    <HStack
      as="form"
      onSubmit={async (e) => {
        e.preventDefault();

        // not logged in.
        if (userState.user === undefined) {
          return;
        }

        try {
          if (!dayjs(inputTime, "HH:mm").isValid()) {
            throw new Error("時間の入力が間違っています🥺");
          }
          await firebase.firestore().doc(`users/${userState.user.id}`).set(
            {
              bedtime: inputTime,
            },
            { merge: true }
          );
        } catch (error) {
          if (error instanceof Error) {
            alert(error.message);
          }
        }

        onClose();
      }}
    >
      <FormControl id="caffeine">
        <InputGroup>
          <Input
            value={inputTime}
            onChange={(e) => {
              setInputTime(e.currentTarget.value);
            }}
            type="time"
          />
        </InputGroup>
      </FormControl>
      <Spacer />
      <Button type="submit" px="9">
        就寝時刻登録
      </Button>
    </HStack>
  );
};
