import { UseCase } from "..";

export interface DeleteCategoryUseCase extends UseCase<Input, Output> {}

export type Input = { id: string };
export type Output = void;
