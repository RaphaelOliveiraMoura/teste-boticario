import { describe, expect, it, vi } from "vitest";

import { DeleteProductCommand } from "./delete-product";
import { ProductNotFoundError } from "../errors/not-foud";

import { Category } from "@/domain/entities/category";
import { Product } from "@/domain/entities/product";
import { ProductRepositoryMemory } from "@/infra/db/memory/product-repository";

describe("DeleteProductCommand", () => {
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

    const sut = new DeleteProductCommand(repository);

    const removeSpy = vi.spyOn(repository, "remove");
    const findByIdSpy = vi.spyOn(repository, "findById");

    expect(repository.storage).toHaveLength(1);

    const input = { id: "1" };
    await sut.execute(input);

    expect(removeSpy).toHaveBeenCalledWith(input.id);
    expect(findByIdSpy).toHaveBeenCalledWith(input.id);

    expect(repository.storage).toHaveLength(0);
  });

  it("should return error if not found product to update", async () => {
    const repository = new ProductRepositoryMemory();

    const sut = new DeleteProductCommand(repository);

    const input = { id: "1" };

    await expect(sut.execute(input)).rejects.toThrow(
      new ProductNotFoundError(input.id),
    );

    expect(repository.storage).toHaveLength(0);
  });
});
