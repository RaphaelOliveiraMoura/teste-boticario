import {
  InspectProductUseCase,
  Output,
} from "@/domain/use-cases/product/inspect";
import { freeze } from "@/infra/utils/freeze";

export class InspectProductMemoryUseCase implements InspectProductUseCase {
  async execute(): Promise<Output> {
    await freeze();
    return {
      id: "",
      name: "",
      description: "",
      price: "",
      stock: "",
      image: "",
    };
  }
}
