import { CreateOrderUseCase, Output } from "@/domain/use-cases/order/create";
import { freeze } from "@/infra/utils/freeze";

export class CreateOrderMemoryUseCase implements CreateOrderUseCase {
  async execute(): Promise<Output> {
    await freeze();
  }
}
