import { z } from "zod";

export const formSchema = z.object({
  username: z.string().trim().min(1, "Preencha o campo"),
  password: z.string().min(8, "A senha deve ter pelo menos 8 caracteres"),
});

export type FormType = z.infer<typeof formSchema>;
