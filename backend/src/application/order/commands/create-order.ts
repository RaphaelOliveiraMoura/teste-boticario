import { ClientNotFoundError } from "../errors/client-not-found";

import { UseCase } from "@/application";
import { Order, OrderEnum } from "@/domain/entities/order";
import { OrderProduct } from "@/domain/entities/order-product";
import { IClientRepository } from "@/domain/repositories/client-repository";
import { IOrderRepository } from "@/domain/repositories/order-repository";

export class CreateOrderCommand implements UseCase<Input, void> {
  constructor(
    private readonly orderRepository: IOrderRepository,
    private readonly clientRepository: IClientRepository,
  ) {}

  async execute(input: Input): Promise<void> {
    const category = await this.clientRepository.findById(input.idClient);

    if (!category) {
      throw new ClientNotFoundError(input.idClient);
    }

    const order = new Order({
      id: "",
      ...input,
      code: String(Math.random() * 1000), // todo: fix
      status: OrderEnum.pending,
      createdAt: new Date(),
    });

    await this.orderRepository.create(order);
  }
}

interface Input {
  idClient: string;
  products: OrderProduct[];
}
