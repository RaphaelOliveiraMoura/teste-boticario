import { InvalidCredentialsError } from "@/domain/errors/auth";
import { SignInUseCase } from "@/domain/use-cases/sign-in";

export class SignInMemoryUseCase implements SignInUseCase {
  async execute(props: {
    login: string;
    password: string;
  }): Promise<{ token: string }> {
    if (props.login !== "admin" && props.password !== "admin") {
      throw new InvalidCredentialsError();
    }

    return { token: "fake-token" };
  }
}
