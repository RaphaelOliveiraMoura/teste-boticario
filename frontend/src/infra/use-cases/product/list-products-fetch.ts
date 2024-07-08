import { ValidationError } from "@/domain/errors/validation";
import { HttpClient } from "@/domain/services/http-client";
import { ListProductsUseCase, Output } from "@/domain/use-cases/product/list";

export class ListProductsFetchUseCase implements ListProductsUseCase {
  constructor(private readonly httpClient: HttpClient) {}

  async execute(): Promise<Output> {
    const { data, status } = await this.httpClient.request<ApiReturnType>({
      method: "GET",
      url: "/products",
    });

    if (status !== 200) {
      throw new ValidationError();
    }

    return {
      items: data.map((item) => ({
        id: item.id,
        name: item.name,
        description: item.description,
        price: item.price,
        stock: item.stock,
        image: item.image,
        createdAt: item.createdAt,
      })),
    };
  }
}

type ApiReturnType = {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  image: string;
  createdAt: string;
}[];
