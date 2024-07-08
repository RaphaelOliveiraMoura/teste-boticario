import { UseCase } from "..";

export interface ListCategoriesUseCase extends UseCase<Input, Output> {}

export type Input = void;
export type Output = { items: ListItem[] };

export type ListItem = {
  id: string;
  name: string;
};
