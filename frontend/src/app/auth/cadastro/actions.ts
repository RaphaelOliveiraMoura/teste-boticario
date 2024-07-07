"use server";

import { redirect } from "next/navigation";

import { defaultErrorMessages } from "@/domain/errors/messages";
import { ValidationError } from "@/domain/errors/validation";
import { Input } from "@/domain/use-cases/sign-up";
import { signUpUseCase } from "@/main/use-cases";
import { Pages } from "@/ui/pages";

export const submit = async (data: Input) => {
  try {
    await signUpUseCase.execute(data);
  } catch (error) {
    console.error(error);

    if (error instanceof ValidationError) {
      return defaultErrorMessages.validation;
    }

    return defaultErrorMessages.default;
  }

  redirect(Pages.ListOrder());
};
