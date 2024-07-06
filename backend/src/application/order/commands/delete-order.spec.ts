import { describe, expect, it, vi } from "vitest";

import { DeleteOrderCommand } from "./delete-order";
import { OrderNotFoundError } from "../errors/not-foud";

import { Order, OrderEnum } from "@/domain/entities/order";
import { OrderRepositoryMemory } from "@/infra/db/memory/order-repository";

describe("DeleteOrderCommand", () => {
  it("should update a order", async () => {
    const repository = new OrderRepositoryMemory();

    const order = new Order({
      id: "1",
      code: "123",
      createdAt: new Date(),
      idClient: "1",
      products: [],
      status: OrderEnum.pending,
    });

    repository.storage = [order];

    const sut = new DeleteOrderCommand(repository);

    const removeSpy = vi.spyOn(repository, "remove");
    const findByIdSpy = vi.spyOn(repository, "findById");

    expect(repository.storage).toHaveLength(1);

    const input = { id: "1" };
    await sut.execute(input);

    expect(removeSpy).toHaveBeenCalledWith(input.id);
    expect(findByIdSpy).toHaveBeenCalledWith(input.id);

    expect(repository.storage).toHaveLength(0);
  });

  it("should return error if not found order to update", async () => {
    const repository = new OrderRepositoryMemory();

    const sut = new DeleteOrderCommand(repository);

    const input = { id: "1" };

    await expect(sut.execute(input)).rejects.toThrow(
      new OrderNotFoundError(input.id),
    );

    expect(repository.storage).toHaveLength(0);
  });
});
