import { FormType } from "./create";
import { UseCase } from "..";

export interface UpdateCategoryUseCase extends UseCase<Input, Output> {}

export type Input = FormType & { id: string };
export type Output = void;
