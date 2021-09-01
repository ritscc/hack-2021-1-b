import { Center, Spinner } from "@chakra-ui/react";
import { VFC } from "react";
import { User, useUser } from "../lib/user";

type Props = {
  renderOnSignedIn: (user: User) => JSX.Element;
  renderOnUnauthorized?: () => JSX.Element;
};

export const PrivatePage: VFC<Props> = ({
  renderOnSignedIn,
  renderOnUnauthorized,
}) => {
  const userState = useUser();

  if (userState.state === "UNAUTHORIZED") {
    if (renderOnUnauthorized !== undefined) {
      return renderOnUnauthorized();
    }
    return (
      <Center h="100%" w="100%" m="auto">
        ログインしてね！
      </Center>
    );
  }

  if (userState.state === "LOADED") {
    return renderOnSignedIn(userState.user);
  }

  return (
    <Center h="100%" w="100%" m="auto">
      <Spinner size="xl" />
    </Center>
  );
};
