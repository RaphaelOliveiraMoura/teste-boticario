import { OrderProduct } from "./order-product";

export enum OrderEnum {
  pending = "pending",
  finished = "finished",
}

interface OrderProps {
  id: string;
  code: string;
  createdAt: Date;
  status: OrderEnum;
  idClient: string;
  products: OrderProduct[];
}

export class Order {
  constructor(public props: OrderProps) {}

  calculateTotal() {
    return this.props.products.reduce(
      (total, product) => total + product.calculateTotal(),
      0,
    );
  }
}
