import { describe, expect, it, vi } from "vitest";

import { InspectClientQuery } from "./inspect-client";
import { ClientNotFoundError } from "../errors/not-foud";

import { ClientDataSoruceMemory } from "@/infra/db/memory/client-data-source";

describe("InspectClientQuery", () => {
  it("should return client details", async () => {
    const dataSource = new ClientDataSoruceMemory();

    const sut = new InspectClientQuery(dataSource);

    dataSource.storage = [
      {
        id: "1",
        email: "email@example.com",
        username: "client username",
        name: "client name",
        cpf: "00000000000",
        phone: "00000000000",
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

    const inspectSpy = vi.spyOn(dataSource, "inspect");

    const input = { id: "1" };
    const output = await sut.execute(input);

    expect(output).toBeTruthy();

    expect(inspectSpy).toHaveBeenCalledWith(input.id);
  });

  it("should return error if not find client", async () => {
    const dataSource = new ClientDataSoruceMemory();

    const sut = new InspectClientQuery(dataSource);

    dataSource.storage = [
      {
        id: "1",
        email: "email@example.com",
        username: "client username",
        name: "client name",
        cpf: "00000000000",
        phone: "00000000000",
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

    const input = { id: "2" };

    await expect(sut.execute(input)).rejects.toThrowError(
      new ClientNotFoundError("2"),
    );
  });
});
