import { z } from "zod";

import { UseCase } from "..";

export interface CreateProductUseCase extends UseCase<Input, Output> {}

export type Input = FormType;
export type Output = void;

export type FormType = z.infer<typeof formSchema>;

export const formSchema = z.object({
  name: z.string().trim().min(1, "Preencha o campo"),
  description: z.string().trim().min(1, "Preencha o campo"),
  price: z.string().trim().min(1, "Preencha o campo"),
  stock: z.string().trim().min(1, "Preencha o campo"),
  image: z.string().trim().min(1, "Preencha o campo"),
});
