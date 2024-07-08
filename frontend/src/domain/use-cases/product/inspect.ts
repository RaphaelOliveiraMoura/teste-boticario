import { UseCase } from "..";

export interface InspectProductUseCase extends UseCase<Input, Output> {}

export type Input = { id: string };
export type Output = Item;

export type Item = {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  image: string;
  createdAt: string;
};
