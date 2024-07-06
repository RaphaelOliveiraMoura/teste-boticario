import { describe, expect, it, vi } from "vitest";

import { DeleteClientCommand } from "./delete-client";
import { ClientNotFoundError } from "../errors/not-foud";

import { ClientFakersFactory } from "@/domain/fakers/client";
import { ClientRepositoryMemory } from "@/infra/db/memory/client-repository";

describe("DeleteClientCommand", () => {
  it("should update a client", async () => {
    const repository = new ClientRepositoryMemory();

    const client = ClientFakersFactory.generate({});

    repository.storage.clients = [client];

    const sut = new DeleteClientCommand(repository);

    const removeSpy = vi.spyOn(repository, "remove");
    const findByIdSpy = vi.spyOn(repository, "findById");

    expect(repository.storage.clients).toHaveLength(1);

    const input = { id: "1" };
    await sut.execute(input);

    expect(removeSpy).toHaveBeenCalledWith(input.id);
    expect(findByIdSpy).toHaveBeenCalledWith(input.id);

    expect(repository.storage.clients).toHaveLength(0);
  });

  it("should return error if not found client to update", async () => {
    const repository = new ClientRepositoryMemory();

    const sut = new DeleteClientCommand(repository);

    const input = { id: "1" };

    await expect(sut.execute(input)).rejects.toThrow(
      new ClientNotFoundError(input.id),
    );

    expect(repository.storage.clients).toHaveLength(0);
  });
});
