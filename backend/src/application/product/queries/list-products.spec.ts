import { describe, expect, it, vi } from "vitest";

import { ListProductsQuery } from "./list-products";

import { ProductDataSoruceMemory } from "@/infra/db/memory/product-data-source";

describe("ListProductsQuery", () => {
  it("should return categories", async () => {
    const dataSource = new ProductDataSoruceMemory();

    const sut = new ListProductsQuery(dataSource);

    dataSource.storage = [
      {
        id: "1",
        name: "product name",
        description: "product description",
        price: 100,
        stock: 100,
        image: "product image",
        createdAt: new Date(),
        category: "category name",
      },
      {
        id: "2",
        name: "product name 2",
        description: "product description",
        price: 100,
        stock: 100,
        image: "product image",
        createdAt: new Date(),
        category: "category name",
      },
    ];

    const listSpy = vi.spyOn(dataSource, "list");

    const output = await sut.execute();

    expect(listSpy).toHaveBeenCalledTimes(1);

    expect(output).toBeTruthy();
  });
});
