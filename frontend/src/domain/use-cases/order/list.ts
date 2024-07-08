import { UseCase } from "..";

export interface ListOrdersUseCase extends UseCase<Input, Output> {}

export type Input = void;
export type Output = { items: ListItem[] };

export type ListItem = {
  id: string;
  client: string;
  price: number;
  date: string;
  finished: boolean;
};
