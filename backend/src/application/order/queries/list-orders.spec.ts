import { describe, expect, it, vi } from "vitest";

import { ListOrdersQuery } from "./list-orders";

import { OrderEnum } from "@/domain/entities/order";
import { OrderDataSoruceMemory } from "@/infra/db/memory/order-data-source";

describe("ListOrdersQuery", () => {
  it("should return categories", async () => {
    const dataSource = new OrderDataSoruceMemory();

    const sut = new ListOrdersQuery(dataSource);

    dataSource.storage = [
      {
        id: "1",
        code: "123",
        client: "client",
        products: [],
        status: OrderEnum.finished,
        createdAt: new Date(),
        totalPrice: 100,
      },
      {
        id: "2",
        code: "345",
        client: "client",
        products: [],
        status: OrderEnum.finished,
        createdAt: new Date(),
        totalPrice: 100,
      },
    ];

    const listSpy = vi.spyOn(dataSource, "list");

    const output = await sut.execute();

    expect(listSpy).toHaveBeenCalledTimes(1);

    expect(output).toBeTruthy();
  });
});
