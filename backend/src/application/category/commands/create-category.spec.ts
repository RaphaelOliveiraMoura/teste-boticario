import { describe, expect, it, vi } from "vitest";

import { CreateCategoryCommand } from "./create-category";
import { CategoryAlreadyCreatedError } from "../errors/already-created";

import { Category } from "@/domain/entities/category";
import { CategoryRepositoryMemory } from "@/infra/db/memory/category-repository";

describe("CreateCategoryCommand", () => {
  it("should create a category", async () => {
    const repository = new CategoryRepositoryMemory();

    const sut = new CreateCategoryCommand(repository);

    const createSpy = vi.spyOn(repository, "create");
    const violateNameUniqueConstraintSpy = vi.spyOn(
      repository,
      "violateNameUniqueConstraint",
    );

    expect(repository.storage.categories).toHaveLength(0);

    const input = {
      name: "Categoria de testes",
      description: "Descrição de exemplo",
    };

    await sut.execute(input);

    expect(createSpy).toHaveBeenCalledWith(new Category({ id: "", ...input }));
    expect(violateNameUniqueConstraintSpy).toHaveBeenCalledWith(input.name);

    expect(repository.storage.categories).toHaveLength(1);

    expect(repository.storage.categories[0].props).toMatchObject({
      id: expect.any(String),
      ...input,
    });
  });

  it("should throw error with try create a category that already exists", async () => {
    const repository = new CategoryRepositoryMemory();

    const sut = new CreateCategoryCommand(repository);

    const input = {
      name: "Categoria de testes",
      description: "Descrição de exemplo",
    };

    expect(repository.storage.categories).toHaveLength(0);
    await sut.execute(input);
    expect(repository.storage.categories).toHaveLength(1);

    await expect(sut.execute(input)).rejects.toThrow(
      new CategoryAlreadyCreatedError(input.name),
    );
    expect(repository.storage.categories).toHaveLength(1);
  });
});
