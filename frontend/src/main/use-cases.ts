import { SignInUseCase } from "@/domain/use-cases/sign-in";
import { SignUpUseCase } from "@/domain/use-cases/sign-up";
import { SignInFetchUseCase } from "@/infra/use-cases/sign-in-fetch";
import { SignInMemoryUseCase } from "@/infra/use-cases/sign-in-memory";
import { SignUpFetchUseCase } from "@/infra/use-cases/sign-up-fetch";
import { SignUpMemoryUseCase } from "@/infra/use-cases/sign-up-memory";

import { config, httpClient } from "./services";

export const signInUseCase: SignInUseCase =
  config.get("USE_MOCKS") === "true"
    ? new SignInMemoryUseCase()
    : new SignInFetchUseCase(httpClient);

export const signUpUseCase: SignUpUseCase =
  config.get("USE_MOCKS") === "true"
    ? new SignUpMemoryUseCase()
    : new SignUpFetchUseCase(httpClient);
