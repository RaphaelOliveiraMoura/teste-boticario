import { redirect } from "next/navigation";

import { InvalidAuthError } from "@/domain/errors/invliad-auth";
import { defaultErrorMessages } from "@/domain/errors/messages";
import { Pages } from "@/ui/pages";

export const errorHandler = (
  err: any,
  mapper?: () => void | { error: string; description: string },
) => {
  console.error(err);

  if (err instanceof InvalidAuthError) {
    redirect(Pages.SignIn());
    return defaultErrorMessages.auth;
  }

  return mapper?.() ?? defaultErrorMessages.default;
};
