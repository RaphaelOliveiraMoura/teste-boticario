import { InferSelectModel, and, eq, ne, or } from "drizzle-orm";

import { DbConnectionDrizzleService } from "../db-connection";
import { schema } from "../schema";

import { Client } from "@/domain/entities/client";
import { IClientRepository } from "@/domain/repositories/client-repository";
import { Address } from "@/domain/value-objects/address";
import { Cpf } from "@/domain/value-objects/cpf";
import { Email } from "@/domain/value-objects/email";
import { Phone } from "@/domain/value-objects/phone";

export class ClientDrizzleRepository implements IClientRepository {
  private drizzle = DbConnectionDrizzleService.getInstance().drizzle();

  private mapDrizzleClientToEntity(
    client: InferSelectModel<typeof schema.cliente>,
    address: InferSelectModel<typeof schema.endereco> | null,
  ) {
    return new Client({
      id: String(client.cliente_id),
      username: client.username ?? "",
      name: client.nome ?? "",
      cpf: new Cpf(client.cpf),
      email: new Email(client.email ?? ""),
      phone: new Phone(client.telefone ?? ""),
      birthDate: new Date(client.data_nascimento ?? ""),
      password: client.senha ?? "",
      address: address
        ? new Address({
            cep: address.cep ?? "",
            state: address.uf ?? "",
            city: address.cidade ?? "",
            neighborhood: address.bairro ?? "",
            address: address.rua ?? "",
            complement: address.complemento ?? "",
            number: address.numero ?? "",
          })
        : null,
    });
  }

  async alreadyInUse(client: Client): Promise<boolean> {
    const [inUse] = await this.drizzle
      .select()
      .from(schema.cliente)
      .where(
        and(
          or(
            eq(schema.cliente.username, client.props.username),
            eq(schema.cliente.cpf, client.props.cpf.value),
            eq(schema.cliente.telefone, client.props.phone.value),
          ),
          ne(schema.cliente.cliente_id, Number(client.props.id)).if(
            client.props.id !== undefined && client.props.id !== "",
          ),
        ),
      )
      .limit(1);

    return !!inUse;
  }

  async findById(id: string): Promise<Client | null> {
    const [result] = await this.drizzle
      .select()
      .from(schema.cliente)
      .where(eq(schema.cliente.cliente_id, +id))
      .leftJoin(
        schema.endereco,
        eq(schema.endereco.endereco_id, schema.cliente.endereco_id),
      )
      .limit(1);

    if (!result) return null;

    return this.mapDrizzleClientToEntity(result.cliente, result.endereco);
  }

  async findByUsername(username: string): Promise<Client | null> {
    const [result] = await this.drizzle
      .select()
      .from(schema.cliente)
      .where(eq(schema.cliente.username, username))
      .leftJoin(
        schema.endereco,
        eq(schema.endereco.endereco_id, schema.cliente.endereco_id),
      )
      .limit(1);

    if (!result) return null;

    return this.mapDrizzleClientToEntity(result.cliente, result.endereco);
  }

  async create(client: Client): Promise<void> {
    await this.drizzle.transaction(async (tx) => {
      const address = client.props.address?.props;

      if (!address) {
        throw new Error("InvalidClientState, missing address informations");
      }

      const [{ endereco_id }] = await tx
        .insert(schema.endereco)
        .values({
          cep: address.cep,
          uf: address.state,
          cidade: address.city,
          bairro: address.neighborhood,
          rua: address.address,
          complemento: address.complement,
          numero: address.number,
        })
        .returning({ endereco_id: schema.endereco.endereco_id });

      await tx.insert(schema.cliente).values({
        username: client.props.username,
        nome: client.props.name,
        cpf: client.props.cpf.value,
        email: client.props.email.value,
        telefone: client.props.phone.value,
        data_nascimento: client.props.birthDate.toISOString(),
        senha: client.props.password,
        endereco_id,
      });
    });
  }

  async update(client: Client): Promise<void> {
    await this.drizzle
      .update(schema.cliente)
      .set({
        username: client.props.username,
        nome: client.props.name,
        cpf: client.props.cpf.value,
        email: client.props.email.value,
        telefone: client.props.phone.value,
        data_nascimento: client.props.birthDate.toISOString(),
      })
      .where(eq(schema.cliente.cliente_id, +client.props.id));
  }

  async remove(id: string): Promise<void> {
    await this.drizzle
      .delete(schema.cliente)
      .where(eq(schema.cliente.cliente_id, +id));
  }
}
