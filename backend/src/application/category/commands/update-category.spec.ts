import { describe, expect, it, vi } from "vitest";

import { UpdateCategoryCommand } from "./update-category";
import { CategoryAlreadyCreatedError } from "../errors/already-created";
import { CategoryNotFoundError } from "../errors/not-foud";

import { Category } from "@/domain/entities/category";
import { CategoryRepositoryMemory } from "@/infra/db/memory/category-repository";

describe("UpdateCategoryCommand", () => {
  it("should update a category", async () => {
    const repository = new CategoryRepositoryMemory();

    const category = new Category({
      id: "1",
      name: "Categoria de testes",
      description: "Descrição de exemplo",
    });

    repository.storage.categories = [category];

    const sut = new UpdateCategoryCommand(repository);

    const updateSpy = vi.spyOn(repository, "update");
    const findByIdSpy = vi.spyOn(repository, "findById");
    const violateNameUniqueConstraintSpy = vi.spyOn(
      repository,
      "violateNameUniqueConstraint",
    );

    expect(repository.storage.categories).toHaveLength(1);

    const input = {
      id: "1",
      name: "Categoria de testes ATUALIZADO",
      description: "Descrição de exemplo ATUALIZADA",
    };

    await sut.execute(input);

    expect(updateSpy).toHaveBeenCalledWith(new Category(input));
    expect(findByIdSpy).toHaveBeenCalledWith(input.id);
    expect(violateNameUniqueConstraintSpy).toHaveBeenCalledWith(
      input.name,
      input.id,
    );

    expect(repository.storage.categories).toHaveLength(1);
    expect(repository.storage.categories[0].props).toMatchObject(input);
  });

  it("should return error if not found category to update", async () => {
    const repository = new CategoryRepositoryMemory();

    const sut = new UpdateCategoryCommand(repository);

    const input = {
      id: "1",
      name: "Categoria de testes",
      description: "Descrição de exemplo",
    };

    await expect(sut.execute(input)).rejects.toThrow(
      new CategoryNotFoundError(input.id),
    );

    expect(repository.storage.categories).toHaveLength(0);
  });

  it("should return error if try update a category with a already usage name", async () => {
    const repository = new CategoryRepositoryMemory();

    repository.storage.categories = [
      new Category({
        id: "1",
        name: "Categoria 1",
        description: "Descrição categoria 1",
      }),
      new Category({
        id: "2",
        name: "Categoria 2",
        description: "Descrição categoria 2",
      }),
    ];

    const sut = new UpdateCategoryCommand(repository);

    await sut.execute({
      id: "2",
      name: "Categoria 2 atualizada",
      description: "Outra descrição",
    });

    const input = {
      id: "2",
      name: "Categoria 1",
      description: "Outra descrição",
    };

    await expect(sut.execute(input)).rejects.toThrow(
      new CategoryAlreadyCreatedError(input.name),
    );

    expect(repository.storage.categories[1].props).toMatchObject({
      id: "2",
      name: "Categoria 2 atualizada",
      description: "Outra descrição",
    });
  });
});
