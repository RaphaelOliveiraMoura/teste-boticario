import { SignUpUseCase, Input, Output } from "@/domain/use-cases/sign-up";
import { freeze } from "@/infra/utils/freeze";

export class SignUpMemoryUseCase implements SignUpUseCase {
  async execute(props: Input): Promise<Output> {
    console.log(props);
    await freeze();
  }
}
