import { describe, expect, it, vi } from "vitest";

import { ListClientsQuery } from "./list-clients";

import { ClientFakersFactory } from "@/domain/fakers/client";
import { ClientDataSoruceMemory } from "@/infra/db/memory/client-data-source";

describe("ListClientsQuery", () => {
  it("should return clients", async () => {
    const dataSource = new ClientDataSoruceMemory();

    const sut = new ListClientsQuery(dataSource);

    dataSource.storage.clients = [
      ClientFakersFactory.generate({
        id: "1",
        email: "email1@example.com",
        cpf: "11111111111",
        phone: "11111111111",
      }),
      ClientFakersFactory.generate({
        id: "2",
        email: "email2@example.com",
        cpf: "22222222222",
        phone: "22222222222",
      }),
      ClientFakersFactory.generate({
        id: "3",
        email: "email3@example.com",
        cpf: "33333333333",
        phone: "33333333333",
      }),
    ];

    const listSpy = vi.spyOn(dataSource, "list");

    const output = await sut.execute();

    expect(listSpy).toHaveBeenCalledTimes(1);

    expect(output).toMatchObject([
      {
        id: "1",
        name: "Categoria 1",
        description: "Descricao 1",
      },
      {
        id: "2",
        name: "Categoria 2",
        description: "Descricao 2",
      },
      {
        id: "3",
        name: "Categoria 3",
        description: "Descricao 3",
      },
    ]);
  });
});
