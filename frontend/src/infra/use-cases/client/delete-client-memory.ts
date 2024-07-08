import { DeleteClientUseCase, Output } from "@/domain/use-cases/client/delete";
import { freeze } from "@/infra/utils/freeze";

export class DeleteClientMemoryUseCase implements DeleteClientUseCase {
  async execute(): Promise<Output> {
    await freeze();
  }
}
