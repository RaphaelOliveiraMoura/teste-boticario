import { z } from "zod";

import { UseCase } from "..";

export interface CreateOrderUseCase extends UseCase<Input, Output> {}

export type Input = FormType;
export type Output = void;

export type FormType = z.infer<typeof formSchema>;

export const formSchema = z.object({
  products: z.array(
    z.object({
      product: z
        .object({
          value: z.string(),
          label: z.string(),
        })
        .refine(({ value }) => !!value, { message: "Preencha o campo" }),
      quantity: z.string().trim().min(1, "Preencha o campo"),
    }),
  ),
});
