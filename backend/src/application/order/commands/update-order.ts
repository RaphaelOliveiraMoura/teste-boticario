import { OrderNotFoundError } from "../errors/not-foud";

import { UseCase } from "@/application";
import { OrderEnum } from "@/domain/entities/order";
import { IOrderRepository } from "@/domain/repositories/order-repository";

export class UpdateOrderCommand implements UseCase<Input, void> {
  constructor(private readonly orderRepository: IOrderRepository) {}

  async execute(input: Input): Promise<void> {
    const order = await this.orderRepository.findById(input.id);

    if (!order) {
      throw new OrderNotFoundError(input.id);
    }

    order.props.status = OrderEnum.finished;

    await this.orderRepository.update(order);
  }
}

interface Input {
  id: string;
}
