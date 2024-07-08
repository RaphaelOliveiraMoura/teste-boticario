import { ValidationError } from "@/domain/errors/validation";
import { HttpClient } from "@/domain/services/http-client";
import {
  UpdateOrderUseCase,
  Input,
  Output,
} from "@/domain/use-cases/order/update";

export class UpdateOrderFetchUseCase implements UpdateOrderUseCase {
  constructor(private readonly httpClient: HttpClient) {}

  async execute(props: Input): Promise<Output> {
    const { status } = await this.httpClient.request({
      method: "PUT",
      url: `/orders/${props.id}`,
    });

    if (status !== 200) {
      throw new ValidationError();
    }
  }
}
