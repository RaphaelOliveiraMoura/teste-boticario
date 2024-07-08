import { ListClientsUseCase, Output } from "@/domain/use-cases/client/list";
import { freeze } from "@/infra/utils/freeze";

export class ListClientsMemoryUseCase implements ListClientsUseCase {
  async execute(): Promise<Output> {
    await freeze();
    return {
      items: [],
    };
  }
}
