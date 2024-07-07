"use server";

import { redirect } from "next/navigation";

import { InvalidCredentialsError } from "@/domain/errors/auth";
import { signInUseCase } from "@/main/use-cases";
import { Pages } from "@/ui/pages";

import { FormType } from "./form";

export const submit = async (data: FormType) => {
  try {
    await signInUseCase.execute({
      login: data.username,
      password: data.password,
    });

    redirect(Pages.ListOrder());
  } catch (error) {
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
};
