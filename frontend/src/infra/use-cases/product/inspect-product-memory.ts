import {
  InspectProductUseCase,
  Input,
  Output,
} from "@/domain/use-cases/product/inspect";

export class InspectProductMemoryUseCase implements InspectProductUseCase {
  async execute(props: Input): Promise<Output> {
    console.log(props);
    return {
      id: "",
      name: "",
      description: "",
      price: 0,
      stock: 0,
      image: "",
      createdAt: "",
    };
  }
}
