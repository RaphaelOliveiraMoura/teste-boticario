import { UseCase } from "..";

export interface DeleteOrderUseCase extends UseCase<Input, Output> {}

export type Input = { id: string };
export type Output = void;
