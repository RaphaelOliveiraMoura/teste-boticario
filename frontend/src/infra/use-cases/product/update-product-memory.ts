import {
  UpdateProductUseCase,
  Input,
  Output,
} from "@/domain/use-cases/product/update";

export class UpdateProductMemoryUseCase implements UpdateProductUseCase {
  async execute(props: Input): Promise<Output> {
    console.log(props);
  }
}
