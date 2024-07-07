import { SignInUseCase } from "@/domain/use-cases/sign-in";

import { authDataSource } from "./data-source";

export const signInUseCase = new SignInUseCase(authDataSource);
