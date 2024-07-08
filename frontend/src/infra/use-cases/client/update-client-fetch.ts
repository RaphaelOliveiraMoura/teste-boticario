import { ValidationError } from "@/domain/errors/validation";
import { HttpClient } from "@/domain/services/http-client";
import {
  UpdateClientUseCase,
  Input,
  Output,
} from "@/domain/use-cases/client/update";
import { formatDateIso } from "@/infra/services/formatters";
import { justNumbers } from "@/infra/services/masks";

export class UpdateClientFetchUseCase implements UpdateClientUseCase {
  constructor(private readonly httpClient: HttpClient) {}

  async execute(props: Input): Promise<Output> {
    const { status } = await this.httpClient.request({
      method: "PUT",
      url: `/clients/${props.id}`,
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

    if (status !== 200) {
      throw new ValidationError();
    }
  }
}
