import { describe, expect, it, vi } from "vitest";

import { CreateProductCommand } from "./create-product";

import { Category } from "@/domain/entities/category";
import { CategoryRepositoryMemory } from "@/infra/db/memory/category-repository";
import { ProductRepositoryMemory } from "@/infra/db/memory/product-repository";

describe("CreateProductCommand", () => {
  it("should create a product", async () => {
    const productRepository = new ProductRepositoryMemory();
    const categoryRepository = new CategoryRepositoryMemory();

    categoryRepository.storage = [
      new Category({
        id: "1",
        name: "category name",
        description: "category description",
      }),
    ];

    const sut = new CreateProductCommand(productRepository, categoryRepository);

    const createSpy = vi.spyOn(productRepository, "create");
    const alreadyInUseSpy = vi.spyOn(productRepository, "alreadyInUse");

    expect(productRepository.storage).toHaveLength(0);

    const input = {
      name: "product name",
      description: "product description",
      price: 100,
      stock: 100,
      idCategory: "1",
      image: "product image",
      createdAt: new Date(),
    };

    await sut.execute(input);

    expect(createSpy).toHaveBeenCalledTimes(1);
    expect(alreadyInUseSpy).toHaveBeenCalledTimes(1);

    expect(productRepository.storage).toHaveLength(1);

    expect(productRepository.storage[0].props).toMatchObject({
      id: expect.any(String),
      ...input,
    });
  });
});
