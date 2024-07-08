import { UseCase } from "..";

export interface ListProductsUseCase extends UseCase<Input, Output> {}

export type Input = void;
export type Output = { items: ListItem[] };

export type ListItem = {
  id: string;
  name: string;
  price: number;
  stock: number;
  createdAt: string;
};
