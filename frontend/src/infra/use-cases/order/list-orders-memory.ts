import { ListOrdersUseCase, Output } from "@/domain/use-cases/order/list";
import { freeze } from "@/infra/utils/freeze";

export class ListOrdersMemoryUseCase implements ListOrdersUseCase {
  async execute(): Promise<Output> {
    await freeze();
    return {
      items: [],
    };
  }
}
