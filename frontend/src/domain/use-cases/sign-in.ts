import { z } from "zod";

import { UseCase } from ".";

export interface SignInUseCase extends UseCase<Input, Output> {}

export type Input = z.infer<typeof formSchema>;
export type Output = { token: string };

export const formSchema = z.object({
  username: z.string().trim().min(1, "Preencha o campo"),
  password: z.string().min(8, "A senha deve ter pelo menos 8 caracteres"),
});
