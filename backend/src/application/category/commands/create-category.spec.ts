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
    const alreadyInUseSpy = vi.spyOn(repository, "alreadyInUse");

    expect(repository.storage).toHaveLength(0);

    const input = {
      name: "Categoria de testes",
      description: "Descrição de exemplo",
    };

    await sut.execute(input);

    expect(createSpy).toHaveBeenCalledWith(new Category({ id: "", ...input }));
    expect(alreadyInUseSpy).toHaveBeenCalledWith(
      new Category({ id: "", ...input }),
    );

    expect(repository.storage).toHaveLength(1);

    expect(repository.storage[0].props).toMatchObject({
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

    expect(repository.storage).toHaveLength(0);
    await sut.execute(input);
    expect(repository.storage).toHaveLength(1);

    await expect(sut.execute(input)).rejects.toThrow(
      new CategoryAlreadyCreatedError(input.name),
    );
    expect(repository.storage).toHaveLength(1);
  });
});
