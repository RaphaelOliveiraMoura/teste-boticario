"use server";

import { redirect } from "next/navigation";

import { defaultErrorMessages } from "@/domain/errors/messages";
import { ValidationError } from "@/domain/errors/validation";
import { Input } from "@/domain/use-cases/sign-up";
import { errorHandler } from "@/infra/services/error-handler";
import { auth } from "@/main/use-cases";
import { Pages } from "@/ui/pages";

export const submit = async (data: Input) => {
  try {
    await auth.signUp.execute(data);
  } catch (error) {
    return errorHandler(error, () => {
      if (error instanceof ValidationError) {
        return defaultErrorMessages.validation;
      }
    });
  }

  redirect(Pages.ListProducts());
};
