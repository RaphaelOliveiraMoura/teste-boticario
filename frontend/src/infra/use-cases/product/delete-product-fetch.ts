import { ValidationError } from "@/domain/errors/validation";
import { HttpClient } from "@/domain/services/http-client";
import {
  DeleteProductUseCase,
  Input,
  Output,
} from "@/domain/use-cases/product/delete";

export class DeleteProductFetchUseCase implements DeleteProductUseCase {
  constructor(private readonly httpClient: HttpClient) {}

  async execute(props: Input): Promise<Output> {
    const { status } = await this.httpClient.request({
      method: "DELETE",
      url: `/products/${props.id}`,
    });

    if (status !== 204) {
      throw new ValidationError();
    }
  }
}
