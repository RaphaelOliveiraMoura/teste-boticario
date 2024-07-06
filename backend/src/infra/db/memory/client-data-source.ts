import {
  InspectClientDto,
  ListClientDto,
  IClientDataSource,
} from "@/domain/data-sources/client";

export class ClientDataSoruceMemory implements IClientDataSource {
  storage = [] as InspectClientDto[];

  async inspect(id: string): Promise<InspectClientDto | null> {
    const client = this.storage.find((client) => client.id === id);
    if (!client) return null;
    return client;
  }

  async list(): Promise<ListClientDto[]> {
    return this.storage;
  }
}
