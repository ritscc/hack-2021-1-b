import { VFC } from "react";
import { useForm } from "react-hook-form";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
} from "@chakra-ui/react";

type Inputs = {
  email: string;
  password: string;
};

type Props = {
  onSubmit: (data: Inputs) => Promise<unknown>;
};

export const SignInForm: VFC<Props> = ({ onSubmit }) => {
  const { register, handleSubmit } = useForm<Inputs>();

  return (
    <VStack spacing="4" as="form" onSubmit={handleSubmit(onSubmit)}>
      <FormControl id="email" isRequired>
        <FormLabel>メールアドレス</FormLabel>
        <Input
          type="email"
          placeholder="test@example.com"
          {...register("email", { required: true })}
        />
      </FormControl>

      <FormControl id="email" isRequired>
        <FormLabel>パスワード</FormLabel>
        <Input type="password" {...register("password", { required: true })} />
      </FormControl>

      <Button mt={4} type="submit">
        ログイン
      </Button>
    </VStack>
  );
};
