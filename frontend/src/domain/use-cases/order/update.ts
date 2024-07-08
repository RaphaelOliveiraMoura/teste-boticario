import { UseCase } from "..";

export interface UpdateOrderUseCase extends UseCase<Input, Output> {}

export type Input = { id: string };
export type Output = void;
