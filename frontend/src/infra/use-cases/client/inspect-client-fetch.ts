import { ValidationError } from "@/domain/errors/validation";
import { HttpClient } from "@/domain/services/http-client";
import {
  InspectClientUseCase,
  Input,
  Output,
} from "@/domain/use-cases/client/inspect";
import { cepMask, cpfMask, dateMask, phoneMask } from "@/infra/services/masks";

export class InspectClientFetchUseCase implements InspectClientUseCase {
  constructor(private readonly httpClient: HttpClient) {}

  async execute(props: Input): Promise<Output> {
    const { data, status } = await this.httpClient.request<ApiReturnType>({
      method: "GET",
      url: `/clients/${props.id}`,
    });

    if (status !== 200) {
      throw new ValidationError();
    }

    return {
      id: data.id,
      username: data.username,
      name: data.name,
      email: data.email,
      cpf: cpfMask(data.cpf),
      phone: phoneMask(data.phone),
      password: "",
      birthDate: dateMask(data.birthDate),
      cep: cepMask(data.address.cep),
      state: data.address.state,
      city: data.address.city,
      neighborhood: data.address.neighborhood,
      address: data.address.address,
      number: data.address.number,
      complement: data.address.complement,
    };
  }
}

type ApiReturnType = {
  id: string;
  username: string;
  name: string;
  email: string;
  cpf: string;
  phone: string;
  password: string;
  birthDate: string;
  address: {
    cep: string;
    state: string;
    city: string;
    neighborhood: string;
    address: string;
    number: string;
    complement: string;
  };
};
