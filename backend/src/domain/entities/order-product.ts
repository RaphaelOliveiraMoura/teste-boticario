import { Product } from "./product";

interface OrderProductProps {
  quantity: number;
  product: Product;
}

export class OrderProduct {
  constructor(public props: OrderProductProps) {}

  calculateTotal() {
    return this.props.quantity * this.props.product.props.price;
  }
}
