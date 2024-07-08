import { FormType } from "./create";
import { UseCase } from "..";

export interface UpdateProductUseCase extends UseCase<Input, Output> {}

export type Input = FormType & { id: string };
export type Output = void;
