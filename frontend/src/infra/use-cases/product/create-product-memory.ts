import {
  CreateProductUseCase,
  Input,
  Output,
} from "@/domain/use-cases/product/create";

export class CreateProductMemoryUseCase implements CreateProductUseCase {
  async execute(props: Input): Promise<Output> {
    console.log(props);
  }
}
