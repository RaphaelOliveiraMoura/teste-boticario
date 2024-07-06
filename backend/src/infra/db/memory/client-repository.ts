import { randomUUID } from "crypto";

import { Client } from "@/domain/entities/client";
import { IClientRepository } from "@/domain/repositories/client-repository";

export class ClientRepositoryMemory implements IClientRepository {
  storage = {
    clients: [] as Client[],
  };

  async violateConstraint(
    client: Client,
    id?: string | undefined,
  ): Promise<boolean> {
    return this.storage.clients.some(
      ({ props }) =>
        (props.email.value === client.props.email.value ||
          props.cpf.value === client.props.cpf.value ||
          props.phone.value === client.props.phone.value) &&
        props.id !== id,
    );
  }

  async findByUsername(username: string): Promise<Client | null> {
    return (
      this.storage.clients.find(
        (client) => client.props.username === username,
      ) ?? null
    );
  }

  async findById(id: string): Promise<Client | null> {
    return (
      this.storage.clients.find((client) => client.props.id === id) ?? null
    );
  }

  async create(client: Client): Promise<void> {
    const cloneClient: Client = new Client({
      ...client.props,
      id: randomUUID(),
    });

    this.storage.clients.push(cloneClient);
  }

  async update(client: Client): Promise<void> {
    const dbClient = await this.findById(client.props.id);
    if (!dbClient) throw new Error("ClientNotFound");
    dbClient.props = client.props;
  }

  async remove(id: string): Promise<void> {
    const idx = this.storage.clients.findIndex(
      (client) => client.props.id === id,
    );

    if (idx < 0) return;

    this.storage.clients.splice(idx, 1);
  }
}
