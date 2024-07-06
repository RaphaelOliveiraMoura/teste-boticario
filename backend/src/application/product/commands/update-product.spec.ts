import { describe, expect, it, vi } from "vitest";

import { UpdateProductCommand } from "./update-product";
import { ProductNotFoundError } from "../errors/not-foud";

import { Category } from "@/domain/entities/category";
import { Product } from "@/domain/entities/product";
import { ProductRepositoryMemory } from "@/infra/db/memory/product-repository";

describe("UpdateProductCommand", () => {
  it("should update a product", async () => {
    const repository = new ProductRepositoryMemory();

    const product = new Product({
      id: "1",
      name: "product name",
      description: "product description",
      price: 100,
      stock: 100,
      image: "product image",
      createdAt: new Date(),
      category: new Category({
        id: "1",
        name: "category name",
        description: "category description",
      }),
    });
    repository.storage = [product];

    const sut = new UpdateProductCommand(repository);

    const updateSpy = vi.spyOn(repository, "update");
    const findByIdSpy = vi.spyOn(repository, "findById");
    const alreadyInUseSpy = vi.spyOn(repository, "alreadyInUse");

    expect(repository.storage).toHaveLength(1);

    const input = {
      id: "1",
      name: "Categoria de testes ATUALIZADO",
      description: "Descrição de exemplo ATUALIZADA",
    };

    await sut.execute(input);

    expect(updateSpy).toHaveBeenCalledTimes(1);
    expect(findByIdSpy).toHaveBeenCalledWith(input.id);
    expect(alreadyInUseSpy).toHaveBeenCalledTimes(1);

    expect(repository.storage).toHaveLength(1);
    expect(repository.storage[0].props).toMatchObject(input);
  });

  it("should return error if not found product to update", async () => {
    const repository = new ProductRepositoryMemory();

    const sut = new UpdateProductCommand(repository);

    const input = {
      id: "1",
      name: "Categoria de testes",
      description: "Descrição de exemplo",
    };

    await expect(sut.execute(input)).rejects.toThrow(
      new ProductNotFoundError(input.id),
    );

    expect(repository.storage).toHaveLength(0);
  });
});
