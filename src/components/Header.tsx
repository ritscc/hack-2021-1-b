import { Flex, Heading,Button, Spacer } from "@chakra-ui/react";
import { VFC } from "react";
import { Link } from "./Link";
import { Logo } from "./Logo";

export const Header: VFC = () => {
  return (
    <Flex as="header">
      <Heading color="orange.900" fontSize="3xl">
        <Link href="/">
          <Logo />
        </Link>
      </Heading>
      <Spacer />
      <Button>ログアウト</Button>
    </Flex>
  );
};
