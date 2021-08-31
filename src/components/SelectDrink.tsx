import { VFC } from "react";
import { Select, Button, Center, SimpleGrid } from "@chakra-ui/react";

type Props = {
  drinks: string[];
  onSelect: (index: number | undefined) => void;
  selected: number | undefined;
};

export const SelectDrink: VFC<Props> = ({ drinks, onSelect, selected }) => {
  return (
    <div>
      <Select
        placeholder="商品を選択"
        value={selected}
        onChange={(e) => {
          if (e.currentTarget.value === "") {
            onSelect(undefined);
            return;
          }
          onSelect(parseInt(e.currentTarget.value));
        }}
      >
        {drinks.map((drink, i) => (
          <option key={drink} value={i}>
            {drink}
          </option>
        ))}
      </Select>
    </div>
  );
};

