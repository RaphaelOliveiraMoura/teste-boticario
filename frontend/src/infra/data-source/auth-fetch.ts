import { AuthDataSource } from "@/domain/data-source/auth";
import { InvalidCredentialsError } from "@/domain/errors/auth";
import { HttpClient } from "@/domain/services/http-client";

export class AuthFetchDataSource implements AuthDataSource {
  constructor(private readonly httpClient: HttpClient) {}

  async getAuthToken(props: {
    login: string;
    password: string;
  }): Promise<{ token: string }> {
    const response = await this.httpClient.request<{ token: string }>({
      method: "POST",
      url: "/sign-in",
      body: {
        login: props.login,
        password: props.password,
      },
    });

    if (response.status !== 200) {
      throw new InvalidCredentialsError();
    }

    return { token: response.data.token };
  }
}
