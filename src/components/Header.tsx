import { Flex, Heading } from "@chakra-ui/react";
import { VFC } from "react";
import { Logo } from "./Logo";

export const Header: VFC = () => {
  return (
    <Flex as="header">
      <Heading color="orange.900" fontSize="3xl">
        <Logo />
      </Heading>
    </Flex>
  );
};
