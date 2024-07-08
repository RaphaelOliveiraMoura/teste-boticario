import { z } from "zod";

import { formSchema } from "./create";
import { UseCase } from "..";

export interface UpdateProductUseCase extends UseCase<Input, Output> {}

export type Input = z.infer<typeof formSchema> & { id: string };
export type Output = void;
