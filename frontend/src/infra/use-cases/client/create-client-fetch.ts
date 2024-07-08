import { ClientAlreadyCreatedError } from "@/domain/errors/user-already-created";
import { ValidationError } from "@/domain/errors/validation";
import { HttpClient } from "@/domain/services/http-client";
import {
  CreateClientUseCase,
  Input,
  Output,
} from "@/domain/use-cases/client/create";
import { formatDateIso } from "@/infra/services/formatters";
import { justNumbers } from "@/infra/services/masks";

export class CreateClientFetchUseCase implements CreateClientUseCase {
  constructor(private readonly httpClient: HttpClient) {}

  async execute(props: Input): Promise<Output> {
    const response = await this.httpClient.request<{ message: string }>({
      method: "POST",
      url: "/clients",
      body: {
        username: props.username,
        name: props.name,
        email: props.email,
        cpf: justNumbers(props.cpf),
        phone: justNumbers(props.phone),
        password: props.password,
        birthDate: formatDateIso(props.birthDate),
        address: {
          cep: justNumbers(props.cep),
          state: props.state,
          city: props.city,
          neighborhood: props.neighborhood,
          address: props.address,
          number: props.number,
          complement: props.complement,
        },
      },
    });

    if (response.status === 201) return;

    const data = response.data;

    if (data.message.includes("ClientAlreadyCreatedError")) {
      throw new ClientAlreadyCreatedError();
    }

    throw new ValidationError();
  }
}
