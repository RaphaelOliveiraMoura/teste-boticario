import { ValidationError } from "@/domain/errors/validation";
import { HttpClient } from "@/domain/services/http-client";
import { ListClientsUseCase, Output } from "@/domain/use-cases/client/list";

export class ListClientsFetchUseCase implements ListClientsUseCase {
  constructor(private readonly httpClient: HttpClient) {}

  async execute(): Promise<Output> {
    const { data, status } = await this.httpClient.request<ApiReturnType>({
      method: "GET",
      url: "/clients",
    });

    if (status !== 200) {
      throw new ValidationError();
    }

    return {
      items: data.map((item) => ({
        id: item.id,
        name: item.name,
        cpf: item.cpf,
        email: item.email,
        birthDate: item.birthDate,
      })),
    };
  }
}

type ApiReturnType = {
  id: string;
  name: string;
  cpf: string;
  email: string;
  birthDate: string;
}[];
