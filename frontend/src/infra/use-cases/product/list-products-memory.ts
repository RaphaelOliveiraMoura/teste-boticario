import { ListProductsUseCase, Output } from "@/domain/use-cases/product/list";

export class ListProductsMemoryUseCase implements ListProductsUseCase {
  async execute(): Promise<Output> {
    return {
      items: [],
    };
  }
}
