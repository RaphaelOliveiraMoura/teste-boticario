import { describe, expect, it, vi } from "vitest";

import { DeleteCategoryCommand } from "./delete-category";
import { CategoryNotFoundError } from "../errors/not-foud";

import { Category } from "@/domain/entities/category";
import { CategoryRepositoryMemory } from "@/infra/db/memory/category-repository";

describe("DeleteCategoryCommand", () => {
  it("should update a category", async () => {
    const repository = new CategoryRepositoryMemory();

    const category = new Category({
      id: "1",
      name: "Categoria de testes",
      description: "Descrição de exemplo",
    });

    repository.storage = [category];

    const sut = new DeleteCategoryCommand(repository);

    const removeSpy = vi.spyOn(repository, "remove");
    const findByIdSpy = vi.spyOn(repository, "findById");

    expect(repository.storage).toHaveLength(1);

    const input = { id: "1" };
    await sut.execute(input);

    expect(removeSpy).toHaveBeenCalledWith(input.id);
    expect(findByIdSpy).toHaveBeenCalledWith(input.id);

    expect(repository.storage).toHaveLength(0);
  });

  it("should return error if not found category to update", async () => {
    const repository = new CategoryRepositoryMemory();

    const sut = new DeleteCategoryCommand(repository);

    const input = { id: "1" };

    await expect(sut.execute(input)).rejects.toThrow(
      new CategoryNotFoundError(input.id),
    );

    expect(repository.storage).toHaveLength(0);
  });
});
