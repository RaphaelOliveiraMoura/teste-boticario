import { HttpClient } from "@/domain/services/http-client";
import {
  InspectProductUseCase,
  Input,
  Output,
} from "@/domain/use-cases/product/inspect";

export class InspectProductFetchUseCase implements InspectProductUseCase {
  constructor(private readonly httpClient: HttpClient) {}

  async execute(props: Input): Promise<Output> {
    const { data } = await this.httpClient.request<ApiReturnType>({
      method: "GET",
      url: `/products/${props.id}`,
    });

    return {
      id: data.id,
      name: data.name,
      description: data.description,
      price: data.price,
      stock: data.stock,
      image: data.image,
      createdAt: data.createdAt,
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
};
