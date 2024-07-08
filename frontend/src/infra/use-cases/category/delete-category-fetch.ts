import { ValidationError } from "@/domain/errors/validation";
import { HttpClient } from "@/domain/services/http-client";
import {
  DeleteCategoryUseCase,
  Input,
  Output,
} from "@/domain/use-cases/category/delete";

export class DeleteCategoryFetchUseCase implements DeleteCategoryUseCase {
  constructor(private readonly httpClient: HttpClient) {}

  async execute(props: Input): Promise<Output> {
    const { status } = await this.httpClient.request({
      method: "DELETE",
      url: `/categories/${props.id}`,
    });

    if (status !== 200) {
      throw new ValidationError();
    }
  }
}
