import { HttpClient } from "@/domain/services/http-client";
import {
  CreateProductUseCase,
  Input,
  Output,
} from "@/domain/use-cases/product/create";

export class CreateProductFetchUseCase implements CreateProductUseCase {
  constructor(private readonly httpClient: HttpClient) {}

  async execute(props: Input): Promise<Output> {
    await this.httpClient.request({
      method: "POST",
      url: "/products",
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
