import { Box, Container, Text, VStack } from "@chakra-ui/react";
import { FC } from "react";
import { Header } from "./Header";

export const Layout: FC = ({ children }) => (
  <Container maxW="container.md">
    <VStack spacing="4" w="100%" minH="100vh" py="4" alignItems="stretch">
      <Header />
      <VStack flexGrow={1} as="main" alignItems="stretch">
        {children}
      </VStack>
      <Text as="footer" textAlign="center" color="orange.800">
        © 2021 Caffeine Busters
      </Text>
    </VStack>
  </Container>
);
