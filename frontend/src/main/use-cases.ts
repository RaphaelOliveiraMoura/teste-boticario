import { SignInUseCase } from "@/domain/use-cases/sign-in";
import { SignInFetchUseCase } from "@/infra/use-cases/sign-in-fetch";
import { SignInMemoryUseCase } from "@/infra/use-cases/sign-in-memory";

import { config, httpClient } from "./services";

export const signInUseCase: SignInUseCase =
  config.get("USE_MOCKS") === "true"
    ? new SignInMemoryUseCase()
    : new SignInFetchUseCase(httpClient);
