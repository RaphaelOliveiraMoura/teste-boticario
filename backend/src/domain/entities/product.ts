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
}
