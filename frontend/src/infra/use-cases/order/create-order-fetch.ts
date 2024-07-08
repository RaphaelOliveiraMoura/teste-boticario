import { ValidationError } from "@/domain/errors/validation";
import { HttpClient } from "@/domain/services/http-client";
import {
  CreateOrderUseCase,
  Input,
  Output,
} from "@/domain/use-cases/order/create";

export class CreateOrderFetchUseCase implements CreateOrderUseCase {
  constructor(private readonly httpClient: HttpClient) {}

  async execute(props: Input): Promise<Output> {
    const { status } = await this.httpClient.request({
      method: "POST",
      url: "/orders",
      body: {
        products: props.products.map((product) => ({
          idProduct: product.product.value,
          quantity: Number(product.quantity),
        })),
      },
    });

    if (status !== 201) {
      throw new ValidationError();
    }
  }
}
