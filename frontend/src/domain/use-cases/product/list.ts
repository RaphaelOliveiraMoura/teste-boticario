import { UseCase } from "..";

export interface ListProductsUseCase extends UseCase<Input, Output> {}

export type Input = undefined;
export type Output = { items: ListItem[] };

export type ListItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  image: string;
  createdAt: string;
};
