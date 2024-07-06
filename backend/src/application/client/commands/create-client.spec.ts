import { describe, expect, it, vi } from "vitest";

import { CreateClientCommand } from "./create-client";
import { ClientAlreadyCreatedError } from "../errors/already-created";

import { Client } from "@/domain/entities/client";
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

describe("CreateClientCommand", () => {
  it("should create a client", async () => {
    const repository = new ClientRepositoryMemory();

    const sut = new CreateClientCommand(repository, encrypter);

    const createSpy = vi.spyOn(repository, "create");
    const alreadyInUseSpy = vi.spyOn(repository, "alreadyInUse");

    expect(repository.storage).toHaveLength(0);

    const input = {
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

    expect(createSpy).toHaveBeenCalledWith(
      new Client({
        id: "",
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
    expect(alreadyInUseSpy).toHaveBeenCalledTimes(1);

    expect(repository.storage).toHaveLength(1);

    expect(repository.storage[0].props).toMatchObject({
      id: expect.any(String),
    });
    expect(repository.storage[0].props.email.value).toBe("email@example.com");
  });

  it("should throw error with try create a client that already exists", async () => {
    const repository = new ClientRepositoryMemory();

    const sut = new CreateClientCommand(repository, encrypter);

    const input = {
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

    expect(repository.storage).toHaveLength(0);
    await sut.execute(input);
    expect(repository.storage).toHaveLength(1);

    await expect(sut.execute(input)).rejects.toThrow(
      new ClientAlreadyCreatedError(input.name),
    );
    expect(repository.storage).toHaveLength(1);
  });
});
