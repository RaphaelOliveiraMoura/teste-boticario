import { ValidationError } from "@/domain/errors/validation";
import { HttpClient } from "@/domain/services/http-client";
import { ListOrdersUseCase, Output } from "@/domain/use-cases/order/list";

export class ListOrdersFetchUseCase implements ListOrdersUseCase {
  constructor(private readonly httpClient: HttpClient) {}

  async execute(): Promise<Output> {
    const { data, status } = await this.httpClient.request<ApiReturnType>({
      method: "GET",
      url: "/orders",
    });

    if (status !== 200) {
      throw new ValidationError();
    }

    return {
      items: data.map(() => ({
        id: "",
        client: "",
        price: 0,
        date: new Date().toISOString(),
        finished: false,
      })),
    };
  }
}

type ApiReturnType = {}[];
