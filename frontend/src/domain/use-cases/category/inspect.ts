import { FormType } from "./create";
import { UseCase } from "..";

export interface InspectCategoryUseCase extends UseCase<Input, Output> {}

export type Input = { id: string };
export type Output = FormType & { id: string };
