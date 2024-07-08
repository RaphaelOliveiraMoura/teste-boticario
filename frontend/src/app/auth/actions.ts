"use server";

import { redirect } from "next/navigation";

import { InvalidCredentialsError } from "@/domain/errors/invalid-credentials";
import { Input } from "@/domain/use-cases/sign-in";
import { errorHandler } from "@/infra/services/error-handler";
import { auth } from "@/main/use-cases";
import { Pages } from "@/ui/pages";

export const submit = async (data: Input) => {
  try {
    await auth.signIn.execute(data);
  } catch (error) {
    return errorHandler(error, () => {
      if (error instanceof InvalidCredentialsError) {
        return {
          error: "Credenciais inválidas",
          description: "Verifique se digitou seus dados corretamente",
        };
      }
    });
  }

  redirect(Pages.ListProducts());
};
