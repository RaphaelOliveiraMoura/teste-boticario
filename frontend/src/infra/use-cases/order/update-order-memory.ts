import { UpdateOrderUseCase, Output } from "@/domain/use-cases/order/update";
import { freeze } from "@/infra/utils/freeze";

export class UpdateOrderMemoryUseCase implements UpdateOrderUseCase {
  async execute(): Promise<Output> {
    await freeze();
  }
}
