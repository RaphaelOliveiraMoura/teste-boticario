import { ValidationError } from "@/domain/errors/validation";
import { HttpClient } from "@/domain/services/http-client";
import {
  InspectProductUseCase,
  Input,
  Output,
} from "@/domain/use-cases/product/inspect";

export class InspectProductFetchUseCase implements InspectProductUseCase {
  constructor(private readonly httpClient: HttpClient) {}

  async execute(props: Input): Promise<Output> {
    const { data, status } = await this.httpClient.request<ApiReturnType>({
      method: "GET",
      url: `/products/${props.id}`,
    });

    if (status !== 200) {
      throw new ValidationError();
    }

    return {
      id: data.id,
      name: data.name,
      description: data.description,
      price: String(data.price),
      stock: String(data.stock),
      image: data.image,
      category: {
        label: "",
        value: "",
      },
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
