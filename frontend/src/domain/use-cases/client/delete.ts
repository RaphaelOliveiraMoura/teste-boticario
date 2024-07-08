import { UseCase } from "..";

export interface DeleteClientUseCase extends UseCase<Input, Output> {}

export type Input = { id: string };
export type Output = void;
