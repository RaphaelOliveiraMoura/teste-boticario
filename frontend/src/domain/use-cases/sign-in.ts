import { UseCase } from ".";

export interface SignInUseCase extends UseCase<Input, Output> {}

export type Input = {
  login: string;
  password: string;
};

export type Output = {
  token: string;
};
