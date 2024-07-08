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
      items: data.map((item) => ({
        id: item.id,
        client: item.client,
        price: item.totalPrice,
        date: new Date(item.createdAt).toISOString(),
        finished: item.status === "finished",
      })),
    };
  }
}

type ApiReturnType = {
  id: string;
  code: string;
  totalPrice: number;
  createdAt: Date;
  status: string;
  client: string;
}[];
