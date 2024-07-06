import { describe, expect, it, vi } from "vitest";

import { ListCategoriesQuery } from "./list-products";

import { Category } from "@/domain/entities/category";
import { Product } from "@/domain/entities/product";
import { ProductDataSoruceMemory } from "@/infra/db/memory/product-data-source";

describe("ListCategoriesQuery", () => {
  it("should return categories", async () => {
    const dataSource = new ProductDataSoruceMemory();

    const sut = new ListCategoriesQuery(dataSource);

    dataSource.storage = [
      new Product({
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
      }),
      new Product({
        id: "2",
        name: "product name 2",
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
      }),
    ];

    const listSpy = vi.spyOn(dataSource, "list");

    const output = await sut.execute();

    expect(listSpy).toHaveBeenCalledTimes(1);

    expect(output).toMatchObject([
      {
        id: "1",
        name: "product name",
        description: "product description",
        price: 100,
        stock: 100,
        image: "product image",
        category: "category name",
      },
      {
        id: "2",
        name: "product name 2",
        description: "product description",
        price: 100,
        stock: 100,
        image: "product image",
        category: "category name",
      },
    ]);
  });
});
