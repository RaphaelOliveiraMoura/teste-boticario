import { SignInFetchUseCase } from "@/infra/use-cases/sign-in-fetch";

import { httpClient } from "./services";

export const signInUseCase = new SignInFetchUseCase(httpClient);
