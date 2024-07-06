interface OrderProductProps {
  idProduct: string;
  name: string;
  price: number;
  quantity: number;
}

export class OrderProduct {
  constructor(public props: OrderProductProps) {}

  calculateTotal() {
    return this.props.quantity * this.props.price;
  }
}
