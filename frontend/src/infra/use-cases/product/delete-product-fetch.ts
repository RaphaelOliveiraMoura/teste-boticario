import { HttpClient } from "@/domain/services/http-client";
import {
  DeleteProductUseCase,
  Input,
  Output,
} from "@/domain/use-cases/product/delete";

export class DeleteProductFetchUseCase implements DeleteProductUseCase {
  constructor(private readonly httpClient: HttpClient) {}

  async execute(props: Input): Promise<Output> {
    await this.httpClient.request({
      method: "DELETE",
      url: `/products/${props.id}`,
    });
  }
}
