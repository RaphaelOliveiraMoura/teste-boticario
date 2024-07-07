import { AuthDataSource } from "@/domain/data-source/auth";
import { InvalidCredentialsError } from "@/domain/errors/auth";

export class AuthMemoryDataSource implements AuthDataSource {
  async getAuthToken(props: {
    login: string;
    password: string;
  }): Promise<{ token: string }> {
    if (props.login !== "admin" && props.password !== "admin") {
      throw new InvalidCredentialsError();
    }

    return { token: "fake-token" };
  }
}
