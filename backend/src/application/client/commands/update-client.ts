import { ClientAlreadyCreatedError } from "../errors/already-created";
import { ClientNotFoundError } from "../errors/not-foud";

import { UseCase } from "@/application";
import { Client } from "@/domain/entities/client";
import { IClientRepository } from "@/domain/repositories/client-repository";
import { IEncryptService } from "@/domain/services/encrypt";
import { Address } from "@/domain/value-objects/address";
import { Cpf } from "@/domain/value-objects/cpf";
import { Email } from "@/domain/value-objects/email";
import { Phone } from "@/domain/value-objects/phone";

export class UpdateClientCommand implements UseCase<Input, void> {
  constructor(
    private readonly clientRepository: IClientRepository,
    private readonly encrypter: IEncryptService,
  ) {}

  async execute(input: Input): Promise<void> {
    const client = await this.clientRepository.findById(input.id);

    if (!client) {
      throw new ClientNotFoundError(input.id);
    }

    const duplicatedClient = await this.clientRepository.violateConstraint(
      client,
      client.props.id,
    );

    if (duplicatedClient) {
      throw new ClientAlreadyCreatedError(input.name);
    }

    const updatedClient = new Client({
      id: client.props.id,
      email: new Email(input.email),
      username: input.username,
      name: input.name,
      password: await this.encrypter.encrypt(input.password),
      cpf: new Cpf(input.cpf),
      phone: new Phone(input.phone),
      birthDate: input.birthDate,
      address: new Address(input.address),
    });

    await this.clientRepository.update(updatedClient);
  }
}

interface Input {
  id: string;
  email: string;
  username: string;
  name: string;
  password: string;
  cpf: string;
  phone: string;
  birthDate: Date;
  address: {
    cep: string;
    state: string;
    city: string;
    neighborhood: string;
    address: string;
    number: string;
    complement: string;
  };
}
