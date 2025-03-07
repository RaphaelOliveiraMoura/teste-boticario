import { ValidationError } from "@/domain/errors/validation";
import { HttpClient } from "@/domain/services/http-client";
import {
  UpdateProductUseCase,
  Input,
  Output,
} from "@/domain/use-cases/product/update";

export class UpdateProductFetchUseCase implements UpdateProductUseCase {
  constructor(private readonly httpClient: HttpClient) {}

  async execute(props: Input): Promise<Output> {
    const { status } = await this.httpClient.request({
      method: "PUT",
      url: `/products/${props.id}`,
      body: {
        name: props.name,
        description: props.description,
        price: props.price,
        stock: props.stock,
        image: props.image,
        idCategory: props.category.value,
      },
    });

    if (status !== 200) {
      throw new ValidationError();
    }
  }
}
