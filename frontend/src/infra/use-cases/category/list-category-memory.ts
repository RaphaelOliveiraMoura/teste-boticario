import {
  ListCategoriesUseCase,
  Output,
} from "@/domain/use-cases/category/list";
import { freeze } from "@/infra/utils/freeze";

export class ListCategoriesMemoryUseCase implements ListCategoriesUseCase {
  async execute(): Promise<Output> {
    await freeze();
    return {
      items: [
        {
          id: "1",
          name: "Categoria 1",
        },
        {
          id: "2",
          name: "Categoria 2",
        },
        {
          id: "3",
          name: "Categoria 3",
        },
      ],
    };
  }
}
