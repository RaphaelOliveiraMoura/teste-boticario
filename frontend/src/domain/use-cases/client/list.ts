import { UseCase } from "..";

export interface ListClientsUseCase extends UseCase<Input, Output> {}

export type Input = void;
export type Output = { items: ListItem[] };

export type ListItem = {
  id: string;
  name: string;
  cpf: string;
  email: string;
  birthDate: string;
};
