import { describe, expect, it, vi } from "vitest";

import { InspectCategoryQuery } from "./inspect-category";
import { CategoryNotFoundError } from "../errors/not-foud";

import { Category } from "@/domain/entities/category";
import { CategoryDataSoruceMemory } from "@/infra/db/memory/category-data-source";

describe("InspectCategoryQuery", () => {
  it("should return category details", async () => {
    const dataSource = new CategoryDataSoruceMemory();

    const sut = new InspectCategoryQuery(dataSource);

    dataSource.storage.categories = [
      new Category({
        id: "1",
        name: "Categoria 1",
        description: "Descricao 1",
      }),
    ];

    const inspectSpy = vi.spyOn(dataSource, "inspect");

    const input = { id: "1" };
    const output = await sut.execute(input);

    expect(output).toMatchObject({
      id: "1",
      name: "Categoria 1",
      description: "Descricao 1",
    });

    expect(inspectSpy).toHaveBeenCalledWith(input.id);
  });

  it("should return error if not find category", async () => {
    const dataSource = new CategoryDataSoruceMemory();

    const sut = new InspectCategoryQuery(dataSource);

    dataSource.storage.categories = [
      new Category({
        id: "1",
        name: "Categoria 1",
        description: "Descricao 1",
      }),
    ];

    const input = { id: "2" };

    await expect(sut.execute(input)).rejects.toThrowError(
      new CategoryNotFoundError("2"),
    );
  });
});
