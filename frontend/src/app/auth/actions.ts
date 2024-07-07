"use server";

import { redirect } from "next/navigation";

import { InvalidCredentialsError } from "@/domain/errors/auth";
import { Input } from "@/domain/use-cases/sign-in";
import { signInUseCase } from "@/main/use-cases";
import { Pages } from "@/ui/pages";

export const submit = async (data: Input) => {
  try {
    await signInUseCase.execute(data);
  } catch (error) {
    console.error(error);

    if (error instanceof InvalidCredentialsError) {
      return {
        error: "Credenciais inválidas",
        description: "Verifique se digitou seus dados corretamente",
      };
    }

    return {
      error: "Erro ao se comunicar com o servidor",
      description: "Verifique se está conectado a internet",
    };
  }

  redirect(Pages.ListOrder());
};
