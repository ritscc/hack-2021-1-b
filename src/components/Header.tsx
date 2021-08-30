import { Flex, Heading } from "@chakra-ui/react";
import { VFC } from "react";

export const Header: VFC = () => {
  return (
    <Flex as="header">
      <Heading>Caffeine Busters</Heading>
    </Flex>
  );
};
