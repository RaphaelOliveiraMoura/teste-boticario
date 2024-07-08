import {
  DeleteProductUseCase,
  Input,
  Output,
} from "@/domain/use-cases/product/delete";

export class DeleteProductMemoryUseCase implements DeleteProductUseCase {
  async execute(props: Input): Promise<Output> {
    console.log(props);
  }
}
