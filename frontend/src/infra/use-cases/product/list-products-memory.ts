import { ListProductsUseCase, Output } from "@/domain/use-cases/product/list";
import { freeze } from "@/infra/utils/freeze";

export class ListProductsMemoryUseCase implements ListProductsUseCase {
  async execute(): Promise<Output> {
    await freeze();
    return {
      items: [
        {
          id: "1",
          name: "Smartphone",
          price: 1999.99,
          stock: 50,
          createdAt: new Date().toISOString(),
        },
        {
          id: "2",
          name: "Camiseta",
          price: 49.99,
          stock: 200,
          createdAt: new Date().toISOString(),
        },
        {
          id: "3",
          name: "Livro de Ficção",
          price: 29.99,
          stock: 100,
          createdAt: new Date().toISOString(),
        },
        {
          id: "4",
          name: "Sofá",
          price: 999.99,
          stock: 10,
          createdAt: new Date().toISOString(),
        },
        {
          id: "5",
          name: "Pizza",
          price: 29.99,
          stock: 50,
          createdAt: new Date().toISOString(),
        },
      ],
    };
  }
}
