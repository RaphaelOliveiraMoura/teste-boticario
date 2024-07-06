import { ClientNotFoundError } from "../errors/client-not-found";
import { ProductNotFoundError } from "../errors/product-not-found";

import { UseCase } from "@/application";
import { Order, OrderEnum } from "@/domain/entities/order";
import { OrderProduct } from "@/domain/entities/order-product";
import { IClientRepository } from "@/domain/repositories/client-repository";
import { IOrderRepository } from "@/domain/repositories/order-repository";
import { IProductRepository } from "@/domain/repositories/product-repository";

export class CreateOrderCommand implements UseCase<Input, void> {
  constructor(
    private readonly orderRepository: IOrderRepository,
    private readonly clientRepository: IClientRepository,
    private readonly productRepository: IProductRepository,
  ) {}

  async execute(input: Input): Promise<void> {
    const category = await this.clientRepository.findById(input.idClient);

    if (!category) {
      throw new ClientNotFoundError(input.idClient);
    }

    const products = [];

    for (const productItem of input.products) {
      const product = await this.productRepository.findById(
        productItem.idProduct,
      );

      if (!product) {
        throw new ProductNotFoundError(productItem.idProduct);
      }

      products.push(
        new OrderProduct({ product, quantity: productItem.quantity }),
      );

      product.decreaseStock(productItem.quantity);
    }

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
    quantity: number;
  }[];
}
