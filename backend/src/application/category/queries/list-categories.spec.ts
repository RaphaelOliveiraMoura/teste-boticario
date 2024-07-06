import { describe, expect, it, vi } from "vitest";

import { ListCategoriesQuery } from "./list-categories";

import { Category } from "@/domain/entities/category";
import { CategoryDataSoruceMemory } from "@/infra/db/memory/category-data-source";

describe("ListCategoriesQuery", () => {
  it("should return categories", async () => {
    const dataSource = new CategoryDataSoruceMemory();

    const sut = new ListCategoriesQuery(dataSource);

    dataSource.storage.categories = [
      new Category({
        id: "1",
        name: "Categoria 1",
        description: "Descricao 1",
      }),
      new Category({
        id: "2",
        name: "Categoria 2",
        description: "Descricao 2",
      }),
      new Category({
        id: "3",
        name: "Categoria 3",
        description: "Descricao 3",
      }),
    ];

    const listSpy = vi.spyOn(dataSource, "list");

    const output = await sut.execute();

    expect(listSpy).toHaveBeenCalledTimes(1);

    expect(output).toMatchObject([
      {
        id: "1",
        name: "Categoria 1",
        description: "Descricao 1",
      },
      {
        id: "2",
        name: "Categoria 2",
        description: "Descricao 2",
      },
      {
        id: "3",
        name: "Categoria 3",
        description: "Descricao 3",
      },
    ]);
  });
});
