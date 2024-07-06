import { describe, expect, it, vi } from "vitest";

import { InspectOrderQuery } from "./inspect-order";
import { OrderNotFoundError } from "../errors/not-foud";

import { OrderEnum } from "@/domain/entities/order";
import { OrderDataSoruceMemory } from "@/infra/db/memory/order-data-source";

describe("InspectOrderQuery", () => {
  it("should return order details", async () => {
    const dataSource = new OrderDataSoruceMemory();

    const sut = new InspectOrderQuery(dataSource);

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
    ];

    const inspectSpy = vi.spyOn(dataSource, "inspect");

    const input = { id: "1" };
    const output = await sut.execute(input);

    expect(output).toBeTruthy();

    expect(inspectSpy).toHaveBeenCalledWith(input.id);
  });

  it("should return error if not find order", async () => {
    const dataSource = new OrderDataSoruceMemory();

    const sut = new InspectOrderQuery(dataSource);

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
    ];

    const input = { id: "2" };

    await expect(sut.execute(input)).rejects.toThrowError(
      new OrderNotFoundError("2"),
    );
  });
});
