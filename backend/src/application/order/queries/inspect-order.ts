import { OrderNotFoundError } from "../errors/not-foud";

import { UseCase } from "@/application";
import { IOrderDataSource, InspectOrderDto } from "@/domain/data-sources/order";

export class InspectOrderQuery implements UseCase<Input, Output> {
  constructor(private readonly orderDataSource: IOrderDataSource) {}

  async execute(input: Input): Promise<Output> {
    const order = await this.orderDataSource.inspect(input.id);

    if (!order) {
      throw new OrderNotFoundError(input.id);
    }

    return order;
  }
}

interface Input {
  id: string;
}

type Output = InspectOrderDto;
