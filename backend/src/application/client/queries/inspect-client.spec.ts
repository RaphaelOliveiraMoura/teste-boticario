import { describe, expect, it, vi } from "vitest";

import { InspectClientQuery } from "./inspect-client";
import { ClientNotFoundError } from "../errors/not-foud";

import { ClientFakersFactory } from "@/domain/fakers/client";
import { ClientDataSoruceMemory } from "@/infra/db/memory/client-data-source";

describe("InspectClientQuery", () => {
  it("should return client details", async () => {
    const dataSource = new ClientDataSoruceMemory();

    const sut = new InspectClientQuery(dataSource);

    dataSource.storage.clients = [ClientFakersFactory.generate({})];

    const inspectSpy = vi.spyOn(dataSource, "inspect");

    const input = { id: "1" };
    const output = await sut.execute(input);

    expect(output).toMatchObject({
      id: "1",
      name: "Categoria 1",
      description: "Descricao 1",
    });

    expect(inspectSpy).toHaveBeenCalledWith(input.id);
  });

  it("should return error if not find client", async () => {
    const dataSource = new ClientDataSoruceMemory();

    const sut = new InspectClientQuery(dataSource);

    dataSource.storage.clients = [ClientFakersFactory.generate({})];

    const input = { id: "2" };

    await expect(sut.execute(input)).rejects.toThrowError(
      new ClientNotFoundError("2"),
    );
  });
});
