import { ValidationError } from "@/domain/errors/validation";
import { HttpClient } from "@/domain/services/http-client";
import { SignUpUseCase, Input, Output } from "@/domain/use-cases/sign-up";

export class SignUpFetchUseCase implements SignUpUseCase {
  constructor(private readonly httpClient: HttpClient) {}

  async execute(props: Input): Promise<Output> {
    const response = await this.httpClient.request({
      method: "POST",
      url: "/clients",
      body: {
        username: props.username,
        name: props.name,
        email: props.email,
        cpf: props.cpf,
        phone: props.phone,
        password: props.password,
      },
    });

    if (response.status !== 201) {
      throw new ValidationError();
    }
  }
}
