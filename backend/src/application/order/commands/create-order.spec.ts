import { describe, expect, it, vi } from "vitest";

import { CreateOrderCommand } from "./create-order";

import { ClientFakersFactory } from "@/domain/fakers/client";
import { ClientRepositoryMemory } from "@/infra/db/memory/client-repository";
import { OrderRepositoryMemory } from "@/infra/db/memory/order-repository";

describe("CreateOrderCommand", () => {
  it("should create a order", async () => {
    const orderRepository = new OrderRepositoryMemory();
    const clientRepository = new ClientRepositoryMemory();

    clientRepository.storage = [ClientFakersFactory.generate({})];

    const sut = new CreateOrderCommand(orderRepository, clientRepository);

    const createSpy = vi.spyOn(orderRepository, "create");

    expect(orderRepository.storage).toHaveLength(0);

    const input = {
      idClient: "1",
      products: [],
    };

    await sut.execute(input);

    expect(createSpy).toHaveBeenCalledTimes(1);

    expect(orderRepository.storage).toHaveLength(1);

    expect(orderRepository.storage[0].props).toMatchObject({
      id: expect.any(String),
      ...input,
    });
  });
});
