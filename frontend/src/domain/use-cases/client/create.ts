import { z } from "zod";

import { UseCase } from "..";

export interface CreateClientUseCase extends UseCase<Input, Output> {}

export type Input = FormType;
export type Output = void;

export type FormType = z.infer<typeof formSchema>;

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
  birthDate: z.string().trim().min(1, "Preencha o campo"),

  cep: z.string().trim().min(1, "Preencha o campo"),
  state: z.string().trim().min(1, "Preencha o campo"),
  city: z.string().trim().min(1, "Preencha o campo"),
  neighborhood: z.string().trim().min(1, "Preencha o campo"),
  address: z.string().trim().min(1, "Preencha o campo"),
  number: z.string().trim().min(1, "Preencha o campo"),
  complement: z.string().trim().min(1, "Preencha o campo"),
});
