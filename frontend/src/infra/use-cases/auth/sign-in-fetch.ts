import { cookies } from "next/headers";

import { InvalidCredentialsError } from "@/domain/errors/invalid-credentials";
import { HttpClient } from "@/domain/services/http-client";
import { SignInUseCase, Input, Output } from "@/domain/use-cases/sign-in";

export class SignInFetchUseCase implements SignInUseCase {
  constructor(private readonly httpClient: HttpClient) {}

  async execute(props: Input): Promise<Output> {
    const response = await this.httpClient.request<{ token: string }>({
      method: "POST",
      url: "/sign-in",
      body: {
        username: props.username,
        password: props.password,
      },
    });

    if (response.status !== 200) {
      throw new InvalidCredentialsError();
    }

    const token = response.data.token;

    cookies().set("token", token);

    return { token };
  }
}
