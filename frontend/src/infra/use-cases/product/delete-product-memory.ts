import {
  DeleteProductUseCase,
  Input,
  Output,
} from "@/domain/use-cases/product/delete";
import { freeze } from "@/infra/utils/freeze";

export class DeleteProductMemoryUseCase implements DeleteProductUseCase {
  async execute(props: Input): Promise<Output> {
    console.log(props);
    await freeze();
  }
}
