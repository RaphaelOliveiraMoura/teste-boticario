import { randomUUID } from "crypto";

import { Order } from "@/domain/entities/order";
import { IOrderRepository } from "@/domain/repositories/order-repository";

export class OrderRepositoryMemory implements IOrderRepository {
  storage = [] as Order[];

  async findById(id: string): Promise<Order | null> {
    const order = this.storage.find((order) => order.props.id === id);

    if (!order) return null;

    return new Order({ ...order.props });
  }

  async create(order: Order): Promise<void> {
    const cloneOrder: Order = new Order({
      ...order.props,
      id: randomUUID(),
    });

    this.storage.push(cloneOrder);
  }

  async update(order: Order): Promise<void> {
    const idx = this.storage.findIndex(
      ({ props }) => props.id === order.props.id,
    );

    if (idx < 0) return;

    this.storage[idx] = new Order({ ...order.props });
  }

  async remove(id: string): Promise<void> {
    const idx = this.storage.findIndex((order) => order.props.id === id);

    if (idx < 0) return;

    this.storage.splice(idx, 1);
  }
}
