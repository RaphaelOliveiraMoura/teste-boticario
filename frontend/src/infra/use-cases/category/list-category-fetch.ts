import { ValidationError } from "@/domain/errors/validation";
import { HttpClient } from "@/domain/services/http-client";
import {
  ListCategoriesUseCase,
  Output,
} from "@/domain/use-cases/category/list";

export class ListCategoriesFetchUseCase implements ListCategoriesUseCase {
  constructor(private readonly httpClient: HttpClient) {}

  async execute(): Promise<Output> {
    const { data, status } = await this.httpClient.request<ApiReturnType>({
      method: "GET",
      url: "/categories",
    });

    if (status !== 200) {
      throw new ValidationError();
    }

    return {
      items: data.map((item) => ({
        id: item.id,
        name: item.name,
        description: item.description,
      })),
    };
  }
}

type ApiReturnType = {
  id: string;
  name: string;
  description: string;
}[];
