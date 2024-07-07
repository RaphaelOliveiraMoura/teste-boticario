import { UseCase } from ".";
import { AuthDataSource } from "../data-source/auth";

export class SignInUseCase implements UseCase<Input, Output> {
  constructor(private readonly authDataSource: AuthDataSource) {}

  execute(input: Input): Promise<Output> {
    return this.authDataSource.getAuthToken(input);
  }
}

type Input = {
  login: string;
  password: string;
};

type Output = {
  token: string;
};
