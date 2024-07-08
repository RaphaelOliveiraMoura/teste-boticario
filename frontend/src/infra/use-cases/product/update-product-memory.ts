import {
  UpdateProductUseCase,
  Input,
  Output,
} from "@/domain/use-cases/product/update";
import { freeze } from "@/infra/utils/freeze";

export class UpdateProductMemoryUseCase implements UpdateProductUseCase {
  async execute(props: Input): Promise<Output> {
    console.log(props);
    await freeze();
  }
}
