import { ValidationError } from "@/domain/errors/validation";
import { HttpClient } from "@/domain/services/http-client";
import {
  UpdateCategoryUseCase,
  Input,
  Output,
} from "@/domain/use-cases/category/update";

export class UpdateCategoryFetchUseCase implements UpdateCategoryUseCase {
  constructor(private readonly httpClient: HttpClient) {}

  async execute(props: Input): Promise<Output> {
    const { status } = await this.httpClient.request({
      method: "PUT",
      url: `/categories/${props.id}`,
      body: {
        name: props.name,
        description: props.description,
      },
    });

    if (status !== 200) {
      throw new ValidationError();
    }
  }
}
