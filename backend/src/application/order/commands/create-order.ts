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

    const products = input.products.map(
      (product) =>
        new OrderProduct({
          idProduct: product.idProduct,
          name: product.name,
          quantity: product.quantity,
          price: product.price,
        }),
    );

    const order = new Order({
      id: "",
      ...input,
      code: String(Math.random() * 1000), // todo: fix
      status: OrderEnum.pending,
      createdAt: new Date(),
      products,
    });

    await this.orderRepository.create(order);
  }
}

interface Input {
  idClient: string;
  products: {
    idProduct: string;
    name: string;
    price: number;
    quantity: number;
  }[];
}
