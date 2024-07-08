import { InvalidCredentialsError } from "@/domain/errors/auth";
import { SignInUseCase, Input, Output } from "@/domain/use-cases/sign-in";
import { freeze } from "@/infra/utils/freeze";

export class SignInMemoryUseCase implements SignInUseCase {
  async execute(props: Input): Promise<Output> {
    await freeze();

    if (props.username !== "admin" && props.password !== "admin123") {
      throw new InvalidCredentialsError();
    }

    return { token: "fake-token" };
  }
}
