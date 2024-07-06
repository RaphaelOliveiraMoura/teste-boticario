import {
  InspectOrderDto,
  ListOrderDto,
  IOrderDataSource,
} from "@/domain/data-sources/order";
import { Order } from "@/domain/entities/order";

export class OrderDataSoruceMemory implements IOrderDataSource {
  storage = [] as Order[];

  async inspect(id: string): Promise<InspectOrderDto | null> {
    const order = this.storage.find(({ props }) => props.id === id);

    if (!order) return null;

    return {
      id: order.props.id,
      code: order.props.code,
      totalPrice: order.props.totalPrice,
      createdAt: order.props.createdAt,
      status: order.props.status,
      client: order.props.client,
      products: order.props.products.map((product) => ({
        id: product.props.idProduct,
        name: product.props.name,
        price: product.props.price,
        quantity: product.props.quantity,
      })),
    };
  }

  async list(): Promise<ListOrderDto[]> {
    return this.storage.map((order) => ({
      id: order.props.id,
      code: order.props.code,
      totalPrice: order.props.totalPrice,
      createdAt: order.props.createdAt,
      status: order.props.status,
      client: order.props.client,
    }));
  }
}
