import { SignUpUseCase, Output } from "@/domain/use-cases/sign-up";
import { freeze } from "@/infra/utils/freeze";

export class SignUpMemoryUseCase implements SignUpUseCase {
  async execute(): Promise<Output> {
    await freeze();
  }
}
