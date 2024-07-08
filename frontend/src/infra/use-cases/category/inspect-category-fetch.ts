import { ValidationError } from "@/domain/errors/validation";
import { HttpClient } from "@/domain/services/http-client";
import {
  InspectCategoryUseCase,
  Input,
  Output,
} from "@/domain/use-cases/category/inspect";

export class InspectCategoryFetchUseCase implements InspectCategoryUseCase {
  constructor(private readonly httpClient: HttpClient) {}

  async execute(props: Input): Promise<Output> {
    const { data, status } = await this.httpClient.request<ApiReturnType>({
      method: "GET",
      url: `/categories/${props.id}`,
    });

    if (status !== 200) {
      throw new ValidationError();
    }

    return {
      id: data.id,
      name: data.name,
      description: data.description,
    };
  }
}

type ApiReturnType = {
  id: string;
  name: string;
  description: string;
};
