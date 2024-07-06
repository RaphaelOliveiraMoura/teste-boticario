import {
  InspectClientDto,
  ListClientDto,
  IClientDataSource,
} from "@/application/client/queries/data-source";
import { Client } from "@/domain/entities/client";

export class ClientDataSoruceMemory implements IClientDataSource {
  storage = {
    clients: [] as Client[],
  };

  async inspect(id: string): Promise<InspectClientDto | null> {
    const client = this.storage.clients.find(({ props }) => props.id === id);

    if (!client) return null;

    return {
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
    };
  }

  async list(): Promise<ListClientDto[]> {
    return this.storage.clients.map((client) => ({
      id: client.props.id,
      email: client.props.email.value,
      username: client.props.username,
      name: client.props.name,
      cpf: client.props.cpf.value,
      phone: client.props.phone.value,
      birthDate: client.props.birthDate.toISOString(),
    }));
  }
}
