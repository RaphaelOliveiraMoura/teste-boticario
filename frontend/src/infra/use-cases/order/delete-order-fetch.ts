import { ValidationError } from "@/domain/errors/validation";
import { HttpClient } from "@/domain/services/http-client";
import {
  DeleteOrderUseCase,
  Input,
  Output,
} from "@/domain/use-cases/order/delete";

export class DeleteOrderFetchUseCase implements DeleteOrderUseCase {
  constructor(private readonly httpClient: HttpClient) {}

  async execute(props: Input): Promise<Output> {
    const { status } = await this.httpClient.request({
      method: "DELETE",
      url: `/orders/${props.id}`,
    });

    if (status !== 204) {
      throw new ValidationError();
    }
  }
}
