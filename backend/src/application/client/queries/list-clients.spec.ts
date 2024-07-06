import { describe, expect, it, vi } from "vitest";

import { ListClientsQuery } from "./list-clients";

import { ClientDataSoruceMemory } from "@/infra/db/memory/client-data-source";

describe("ListClientsQuery", () => {
  it("should return clients", async () => {
    const dataSource = new ClientDataSoruceMemory();

    const sut = new ListClientsQuery(dataSource);

    dataSource.storage = [
      {
        id: "1",
        email: "email1@example.com",
        cpf: "11111111111",
        phone: "11111111111",
        username: "client username",
        name: "client name",
        birthDate: new Date().toISOString(),
        address: {
          cep: "00000000",
          state: "MG",
          city: "Ibirité",
          neighborhood: "Jardim das Rosas",
          address: "Rua Ouro Preto",
          number: "239",
          complement: "casa 10",
        },
      },
      {
        id: "2",
        email: "email2@example.com",
        cpf: "22222222222",
        phone: "22222222222",
        username: "client username",
        name: "client name",
        birthDate: new Date().toISOString(),
        address: {
          cep: "00000000",
          state: "MG",
          city: "Ibirité",
          neighborhood: "Jardim das Rosas",
          address: "Rua Ouro Preto",
          number: "239",
          complement: "casa 10",
        },
      },
      {
        id: "3",
        email: "email3@example.com",
        cpf: "33333333333",
        phone: "33333333333",
        username: "client username",
        name: "client name",
        birthDate: new Date().toISOString(),
        address: {
          cep: "00000000",
          state: "MG",
          city: "Ibirité",
          neighborhood: "Jardim das Rosas",
          address: "Rua Ouro Preto",
          number: "239",
          complement: "casa 10",
        },
      },
    ];

    const listSpy = vi.spyOn(dataSource, "list");

    const output = await sut.execute();

    expect(listSpy).toHaveBeenCalledTimes(1);

    expect(output).toHaveLength(3);
  });
});
