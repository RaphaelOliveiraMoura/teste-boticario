import { FormType } from "./create";
import { UseCase } from "..";

export interface InspectOrderUseCase extends UseCase<Input, Output> {}

export type Input = { id: string };
export type Output = FormType & { id: string };
