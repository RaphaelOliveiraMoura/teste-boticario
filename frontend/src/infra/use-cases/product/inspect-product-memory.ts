import {
  InspectProductUseCase,
  Input,
  Output,
} from "@/domain/use-cases/product/inspect";
import { freeze } from "@/infra/utils/freeze";

export class InspectProductMemoryUseCase implements InspectProductUseCase {
  async execute(props: Input): Promise<Output> {
    console.log(props);
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
