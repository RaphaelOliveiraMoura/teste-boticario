import { InvalidCredentialsError } from "@/domain/errors/auth";
import { SignInUseCase, Input, Output } from "@/domain/use-cases/sign-in";

export class SignInMemoryUseCase implements SignInUseCase {
  async execute(props: Input): Promise<Output> {
    if (props.username !== "admin" && props.password !== "admin123") {
      throw new InvalidCredentialsError();
    }

    return { token: "fake-token" };
  }
}
