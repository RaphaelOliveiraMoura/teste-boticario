import { describe, expect, it, vi } from "vitest";

import { InspectClientQuery } from "./inspect-client";
import { ClientNotFoundError } from "../errors/not-foud";

import { ClientFakersFactory } from "@/domain/fakers/client";
import { ClientDataSoruceMemory } from "@/infra/db/memory/client-data-source";

describe("InspectClientQuery", () => {
  it("should return client details", async () => {
    const dataSource = new ClientDataSoruceMemory();

    const sut = new InspectClientQuery(dataSource);

    const client = ClientFakersFactory.generate({});
    dataSource.storage.clients = [client];

    const inspectSpy = vi.spyOn(dataSource, "inspect");

    const input = { id: "1" };
    const output = await sut.execute(input);

    expect(output).toMatchObject({
      id: client.props.id,
      email: client.props.email.value,
      username: client.props.username,
      name: client.props.name,
      cpf: client.props.cpf.value,
      phone: client.props.phone.value,
      birthDate: client.props.birthDate.toISOString(),
      address: {
        cep: client.props.address?.props.cep ?? "",
        state: client.props.address?.props.state ?? "",
        city: client.props.address?.props.city ?? "",
        neighborhood: client.props.address?.props.neighborhood ?? "",
        address: client.props.address?.props.address ?? "",
        number: client.props.address?.props.number ?? "",
        complement: client.props.address?.props.complement ?? "",
      },
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
