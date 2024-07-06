import { describe, expect, it, vi } from "vitest";

import { InspectProductQuery } from "./inspect-product";
import { ProductNotFoundError } from "../errors/not-foud";

import { ProductDataSoruceMemory } from "@/infra/db/memory/product-data-source";

describe("InspectProductQuery", () => {
  it("should return product details", async () => {
    const dataSource = new ProductDataSoruceMemory();

    const sut = new InspectProductQuery(dataSource);

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
    ];

    const inspectSpy = vi.spyOn(dataSource, "inspect");

    const input = { id: "1" };
    const output = await sut.execute(input);

    expect(output).toMatchObject({
      id: "1",
      name: "product name",
      description: "product description",
      price: 100,
      stock: 100,
      image: "product image",
      category: "category name",
    });

    expect(inspectSpy).toHaveBeenCalledWith(input.id);
  });

  it("should return error if not find product", async () => {
    const dataSource = new ProductDataSoruceMemory();

    const sut = new InspectProductQuery(dataSource);

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
    ];

    const input = { id: "2" };

    await expect(sut.execute(input)).rejects.toThrowError(
      new ProductNotFoundError("2"),
    );
  });
});
