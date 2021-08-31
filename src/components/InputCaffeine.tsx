import React, { VFC } from "react";
import {
  Input,
  InputGroup,
  InputRightAddon,
  FormLabel,
} from "@chakra-ui/react";

type Props = {
  value: number | undefined;
  onChange: (index: number) => void;
};

export const InputCaffeine: VFC<Props> = ({ value, onChange }) => {
  return (
    <div>
      <FormLabel>カフェイン</FormLabel>
      <InputGroup>
        <Input
          value={value ?? ""}
          onChange={(e) => {
            onChange(parseInt(e.currentTarget.value));
          }}
          type="number"
          placeholder="140"
        />
        <InputRightAddon children="mg" />
      </InputGroup>
    </div>
  );
};
