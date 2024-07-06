import { Client } from "../entities/client";

export interface IClientRepository {
  alreadyInUse(client: Client): Promise<boolean>;

  findByUsername(username: string): Promise<Client | null>;
  findById(id: string): Promise<Client | null>;
  create(client: Client): Promise<void>;
  update(client: Client): Promise<void>;
  remove(id: string): Promise<void>;
}
