import { describe, expect, it, vi } from "vitest";

import { UpdateOrderCommand } from "./update-order";
import { OrderNotFoundError } from "../errors/not-foud";

import { Order, OrderEnum } from "@/domain/entities/order";
import { OrderRepositoryMemory } from "@/infra/db/memory/order-repository";

describe("UpdateOrderCommand", () => {
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

    const sut = new UpdateOrderCommand(repository);

    const updateSpy = vi.spyOn(repository, "update");
    const findByIdSpy = vi.spyOn(repository, "findById");

    expect(repository.storage).toHaveLength(1);

    const input = {
      id: "1",
    };

    await sut.execute(input);

    expect(updateSpy).toHaveBeenCalledTimes(1);
    expect(findByIdSpy).toHaveBeenCalledWith(input.id);

    expect(repository.storage).toHaveLength(1);
    expect(repository.storage[0].props.status).toMatchObject(
      OrderEnum.finished,
    );
  });

  it("should return error if not found order to update", async () => {
    const repository = new OrderRepositoryMemory();

    const sut = new UpdateOrderCommand(repository);

    const input = {
      id: "1",
      name: "Categoria de testes",
      description: "Descrição de exemplo",
    };

    await expect(sut.execute(input)).rejects.toThrow(
      new OrderNotFoundError(input.id),
    );

    expect(repository.storage).toHaveLength(0);
  });
});
