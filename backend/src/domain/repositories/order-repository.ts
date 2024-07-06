import { Order } from "../entities/order";

export interface IOrderRepository {
  findById(id: string): Promise<Order | null>;
  create(order: Order): Promise<void>;
  update(order: Order): Promise<void>;
  remove(id: string): Promise<void>;
}
