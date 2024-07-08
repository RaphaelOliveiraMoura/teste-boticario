import {
  CreateProductUseCase,
  Input,
  Output,
} from "@/domain/use-cases/product/create";
import { freeze } from "@/infra/utils/freeze";

export class CreateProductMemoryUseCase implements CreateProductUseCase {
  async execute(props: Input): Promise<Output> {
    console.log(props);
    await freeze();
  }
}
