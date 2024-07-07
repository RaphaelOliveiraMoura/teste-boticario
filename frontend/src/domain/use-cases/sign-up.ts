import { z } from "zod";

import { UseCase } from ".";

export interface SignUpUseCase extends UseCase<Input, Output> {}

export type Input = z.infer<typeof formSchema>;
export type Output = void;

export const formSchema = z.object({
  username: z.string().trim().min(1, "Preencha o campo"),
  name: z.string().trim().min(1, "Preencha o campo"),
  email: z
    .string()
    .trim()
    .min(1, "Preencha o campo")
    .email("Preencha com um E-mail válido"),
  cpf: z.string().trim().min(1, "Preencha o campo"),
  phone: z.string().trim().min(1, "Preencha o campo"),
  password: z.string().min(8, "A senha deve ter pelo menos 8 caracteres"),
});
