import { ValidationError } from "@/domain/errors/validation";
import { HttpClient } from "@/domain/services/http-client";
import {
  InspectOrderUseCase,
  Input,
  Output,
} from "@/domain/use-cases/order/inspect";

export class InspectOrderFetchUseCase implements InspectOrderUseCase {
  constructor(private readonly httpClient: HttpClient) {}

  async execute(props: Input): Promise<Output> {
    const { data, status } = await this.httpClient.request<ApiReturnType>({
      method: "GET",
      url: `/orders/${props.id}`,
    });

    if (status !== 200) {
      throw new ValidationError();
    }

    return {
      id: data.id,
      products: data.products.map((product) => ({
        product: { label: product.name, value: product.id },
        quantity: String(product.quantity),
      })),
    };
  }
}

type ApiReturnType = {
  id: string;
  products: {
    id: string;
    name: string;
    price: string;
    quantity: number;
  }[];
};
