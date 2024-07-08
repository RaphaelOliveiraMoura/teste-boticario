import { HttpClient } from "@/domain/services/http-client";
import {
  UpdateProductUseCase,
  Input,
  Output,
} from "@/domain/use-cases/product/update";

export class UpdateProductFetchUseCase implements UpdateProductUseCase {
  constructor(private readonly httpClient: HttpClient) {}

  async execute(props: Input): Promise<Output> {
    await this.httpClient.request({
      method: "PUT",
      url: `/products/${props.id}`,
      body: {
        name: props.name,
        description: props.description,
        price: props.price,
        stock: props.stock,
        image: props.image,
      },
    });
  }
}
