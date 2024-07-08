import { ValidationError } from "@/domain/errors/validation";
import { HttpClient } from "@/domain/services/http-client";
import {
  CreateCategoryUseCase,
  Input,
  Output,
} from "@/domain/use-cases/category/create";

export class CreateCategoryFetchUseCase implements CreateCategoryUseCase {
  constructor(private readonly httpClient: HttpClient) {}

  async execute(props: Input): Promise<Output> {
    const { status } = await this.httpClient.request({
      method: "POST",
      url: "/categories",
      body: {
        name: props.name,
        description: props.description,
      },
    });

    if (status !== 201) {
      throw new ValidationError();
    }
  }
}
