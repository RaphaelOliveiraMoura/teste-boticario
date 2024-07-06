import { Client } from "../entities/client";
import { Address } from "../value-objects/address";
import { Cpf } from "../value-objects/cpf";
import { Email } from "../value-objects/email";
import { Phone } from "../value-objects/phone";

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class ClientFakersFactory {
  static generate(input: Input) {
    return new Client({
      id: input.id ?? "1",
      email: new Email(input.email ?? "email@example.com"),
      username: input.username ?? "client username",
      name: input.name ?? "client name",
      password: input.password ?? "client password",
      cpf: new Cpf(input.cpf ?? "00000000000"),
      phone: new Phone(input.phone ?? "00000000000"),
      birthDate: input.birthDate ?? new Date(),
      address: new Address({
        cep: input.address?.cep ?? "00000000",
        state: input.address?.state ?? "MG",
        city: input.address?.city ?? "Ibirité",
        neighborhood: input.address?.neighborhood ?? "Jardim das Rosas",
        address: input.address?.address ?? "Rua Ouro Preto",
        number: input.address?.number ?? "239",
        complement: input.address?.complement ?? "casa 10",
      }),
    });
  }
}

interface Input {
  id?: string;
  email?: string;
  username?: string;
  name?: string;
  password?: string;
  cpf?: string;
  phone?: string;
  birthDate?: Date;
  address?: {
    cep?: string;
    state?: string;
    city?: string;
    neighborhood?: string;
    address?: string;
    number?: string;
    complement?: string;
  };
}
