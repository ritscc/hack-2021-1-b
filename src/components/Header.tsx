import { Flex, Heading, Button, Spacer } from "@chakra-ui/react";
import { VFC } from "react";
import { useUser } from "../lib/user";
import { Link } from "./Link";
import { Logo } from "./Logo";
import firebase from "firebase";

const signOut = () => firebase.auth().signOut();

export const Header: VFC = () => {
  const userState = useUser();
  return (
    <Flex as="header">
      <Heading color="orange.900" fontSize="3xl">
        <Link href="/">
          <Logo />
        </Link>
      </Heading>
      <Spacer />
      {userState.state === "LOADED" && (
        <Button onClick={signOut}>ログアウト</Button>
      )}
    </Flex>
  );
};
