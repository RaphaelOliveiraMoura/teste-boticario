import { FormType } from "./create";
import { UseCase } from "..";

export interface UpdateClientUseCase extends UseCase<Input, Output> {}

export type Input = FormType & { id: string };
export type Output = void;
