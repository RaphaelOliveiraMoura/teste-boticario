import { InspectOrderUseCase, Output } from "@/domain/use-cases/order/inspect";
import { freeze } from "@/infra/utils/freeze";

export class InspectOrderMemoryUseCase implements InspectOrderUseCase {
  async execute(): Promise<Output> {
    await freeze();
    return {
      id: "",
      products: [],
    };
  }
}
