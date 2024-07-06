import { randomUUID } from "crypto";

import { Client } from "@/domain/entities/client";
import { IClientRepository } from "@/domain/repositories/client-repository";

export class ClientRepositoryMemory implements IClientRepository {
  storage = [] as Client[];

  async alreadyInUse(client: Client): Promise<boolean> {
    return this.storage.some(
      ({ props }) =>
        (props.email.value === client.props.email.value ||
          props.cpf.value === client.props.cpf.value ||
          props.phone.value === client.props.phone.value) &&
        props.id !== client.props.id,
    );
  }

  async findByUsername(username: string): Promise<Client | null> {
    const client = this.storage.find(
      (client) => client.props.username === username,
    );

    if (!client) return null;

    return new Client({ ...client.props });
  }

  async findById(id: string): Promise<Client | null> {
    const client = this.storage.find((client) => client.props.id === id);

    if (!client) return null;

    return new Client({ ...client.props });
  }

  async create(client: Client): Promise<void> {
    const cloneClient: Client = new Client({
      ...client.props,
      id: randomUUID(),
    });

    this.storage.push(cloneClient);
  }

  async update(client: Client): Promise<void> {
    const idx = this.storage.findIndex(
      ({ props }) => props.id === client.props.id,
    );

    if (idx < 0) return;

    this.storage[idx] = new Client({ ...client.props });
  }

  async remove(id: string): Promise<void> {
    const idx = this.storage.findIndex((client) => client.props.id === id);

    if (idx < 0) return;

    this.storage.splice(idx, 1);
  }
}
