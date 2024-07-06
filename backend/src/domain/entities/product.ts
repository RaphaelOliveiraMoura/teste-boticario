import { Category } from "./category";

interface ProductProps {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: Category;
  image: string;
  createdAt: Date;
}

export class Product {
  constructor(public props: ProductProps) {}

  decreaseStock(quantity: number) {
    if (this.props.stock - quantity < 0) {
      throw new Error(
        `ProductOutOfStock [${this.props.name} - ${this.props.stock}]`,
      );
    }

    this.props.stock -= quantity;
  }
}
