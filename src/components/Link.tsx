import React from "react";
import NextLink from "next/link";
import { Link as ChakraLink, LinkProps } from "@chakra-ui/react";

export const Link: React.FC<LinkProps & { href: string }> = (props) => {
  return (
    <NextLink href={props.href}>
      <ChakraLink
        {...props}
        onClick={() => (document.activeElement as HTMLElement).blur()}
      />
    </NextLink>
  );
};
