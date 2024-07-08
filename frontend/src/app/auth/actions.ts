"use server";

import { redirect } from "next/navigation";

import { InvalidCredentialsError } from "@/domain/errors/auth";
import { defaultErrorMessages } from "@/domain/errors/messages";
import { Input } from "@/domain/use-cases/sign-in";
import { auth } from "@/main/use-cases";
import { Pages } from "@/ui/pages";

export const submit = async (data: Input) => {
  try {
    await auth.signIn.execute(data);
  } catch (error) {
    console.error(error);

    if (error instanceof InvalidCredentialsError) {
      return {
        error: "Credenciais inválidas",
        description: "Verifique se digitou seus dados corretamente",
      };
    }

    return defaultErrorMessages.default;
  }

  redirect(Pages.ListOrder());
};
