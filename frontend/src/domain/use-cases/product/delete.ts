import { UseCase } from "..";

export interface DeleteProductUseCase extends UseCase<Input, Output> {}

export type Input = { id: string };
export type Output = void;
