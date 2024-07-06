import { OrderNotFoundError } from "../errors/not-foud";

import { UseCase } from "@/application";
import { IOrderRepository } from "@/domain/repositories/order-repository";

export class DeleteOrderCommand implements UseCase<Input, void> {
  constructor(private readonly orderRepository: IOrderRepository) {}

  async execute(input: Input): Promise<void> {
    const order = await this.orderRepository.findById(input.id);

    if (!order) {
      throw new OrderNotFoundError(input.id);
    }

    await this.orderRepository.remove(order.props.id);
  }
}

interface Input {
  id: string;
}
