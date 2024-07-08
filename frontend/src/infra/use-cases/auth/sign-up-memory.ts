import { SignUpUseCase, Input, Output } from "@/domain/use-cases/sign-up";

export class SignUpMemoryUseCase implements SignUpUseCase {
  async execute(props: Input): Promise<Output> {
    console.log(props);
  }
}
