import { Container, Text, VStack } from "@chakra-ui/react";
import { FC } from "react";
import { Header } from "./Header";

export const Layout: FC = ({ children }) => (
  <Container maxW="container.md" py="4">
    <VStack spacing="4" align="stretch">
      <Header />

      {children}
    </VStack>
    <Text as="footer" textAlign="center" color="orange.800">
      © 2021 Caffeine Busters
    </Text>
  </Container>
);
