import { CreateClientUseCase, Output } from "@/domain/use-cases/client/create";
import { freeze } from "@/infra/utils/freeze";

export class CreateClientMemoryUseCase implements CreateClientUseCase {
  async execute(): Promise<Output> {
    await freeze();
  }
}
