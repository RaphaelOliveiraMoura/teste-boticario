import { describe, expect, it, vi } from "vitest";

import { UpdateClientCommand } from "./update-client";
import { ClientAlreadyCreatedError } from "../errors/already-created";
import { ClientNotFoundError } from "../errors/not-foud";

import { Client } from "@/domain/entities/client";
import { ClientFakersFactory } from "@/domain/fakers/client";
import { IEncryptService } from "@/domain/services/encrypt";
import { Address } from "@/domain/value-objects/address";
import { Cpf } from "@/domain/value-objects/cpf";
import { Email } from "@/domain/value-objects/email";
import { Phone } from "@/domain/value-objects/phone";
import { ClientRepositoryMemory } from "@/infra/db/memory/client-repository";

const encrypter: IEncryptService = {
  encrypt: async (value) => value,
  compare: async () => true,
};

describe("UpdateClientCommand", () => {
  it("should update a client", async () => {
    const repository = new ClientRepositoryMemory();

    const client = ClientFakersFactory.generate({});

    repository.storage.clients = [client];

    const sut = new UpdateClientCommand(repository, encrypter);

    const updateSpy = vi.spyOn(repository, "update");
    const findByIdSpy = vi.spyOn(repository, "findById");
    const violateConstraintSpy = vi.spyOn(repository, "violateConstraint");

    expect(repository.storage.clients).toHaveLength(1);

    const input = {
      id: client.props.id,
      email: "email@example.com",
      username: "example username",
      name: "example name",
      password: "example password",
      cpf: "00000000000",
      phone: "00000000000",
      birthDate: new Date(),
      address: {
        cep: "000000000",
        state: "example state",
        city: "examplel city",
        neighborhood: "example neighborhood",
        address: "example address",
        number: "example number",
        complement: "example complement",
      },
    };

    await sut.execute(input);

    expect(updateSpy).toHaveBeenCalledWith(
      new Client({
        id: client.props.id,
        email: new Email(input.email),
        username: input.username,
        name: input.name,
        password: input.password,
        cpf: new Cpf(input.cpf),
        phone: new Phone(input.phone),
        birthDate: input.birthDate,
        address: new Address(input.address),
      }),
    );
    expect(findByIdSpy).toHaveBeenCalledWith(input.id);
    expect(violateConstraintSpy).toHaveBeenCalledTimes(1);

    expect(repository.storage.clients).toHaveLength(1);
    expect(repository.storage.clients[0].props.email.value).toMatchObject(
      input.email,
    );
  });

  it("should return error if not found client to update", async () => {
    const repository = new ClientRepositoryMemory();

    const sut = new UpdateClientCommand(repository, encrypter);

    const input = {
      id: "1",
      email: "email@example.com",
      username: "example username",
      name: "example name",
      password: "example password",
      cpf: "00000000000",
      phone: "00000000000",
      birthDate: new Date(),
      address: {
        cep: "000000000",
        state: "example state",
        city: "examplel city",
        neighborhood: "example neighborhood",
        address: "example address",
        number: "example number",
        complement: "example complement",
      },
    };

    await expect(sut.execute(input)).rejects.toThrow(
      new ClientNotFoundError(input.id),
    );

    expect(repository.storage.clients).toHaveLength(0);
  });

  it("should return error if try update a client with a already used email", async () => {
    const repository = new ClientRepositoryMemory();

    const clients = [
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
    ];

    repository.storage.clients = clients;

    const sut = new UpdateClientCommand(repository, encrypter);

    const input = {
      id: "1",
      email: "email2@example.com",
      username: "example username",
      name: "example name",
      password: "example password",
      cpf: "00000000000",
      phone: "00000000000",
      birthDate: new Date(),
      address: {
        cep: "000000000",
        state: "example state",
        city: "examplel city",
        neighborhood: "example neighborhood",
        address: "example address",
        number: "example number",
        complement: "example complement",
      },
    };

    await expect(sut.execute(input)).rejects.toThrow(
      new ClientAlreadyCreatedError(input.name),
    );

    expect(repository.storage.clients[1].props.email.value).toBe(
      "email2@example.com",
    );
  });
});
