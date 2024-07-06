import { eq } from "drizzle-orm";

import { DbConnectionDrizzleService } from "../db-connection";
import { schema } from "../schema";

import {
  ListClientDto,
  InspectClientDto,
  IClientDataSource,
} from "@/application/client/queries/data-source";

export class ClientDrizzleDataSource implements IClientDataSource {
  private drizzle = DbConnectionDrizzleService.getInstance().drizzle();

  async inspect(id: string): Promise<InspectClientDto | null> {
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

    return {
      id: String(result.cliente.cliente_id),
      email: result.cliente.email ?? "",
      username: result.cliente.username ?? "",
      name: result.cliente.nome ?? "",
      cpf: result.cliente.cpf,
      phone: result.cliente.telefone ?? "",
      birthDate: result.cliente.data_nascimento ?? "",
      address: {
        cep: result.endereco?.cep ?? "",
        state: result.endereco?.uf ?? "",
        city: result.endereco?.cidade ?? "",
        neighborhood: result.endereco?.bairro ?? "",
        address: result.endereco?.rua ?? "",
        number: result.endereco?.numero ?? "",
        complement: result.endereco?.complemento ?? "",
      },
    };
  }

  async list(): Promise<ListClientDto[]> {
    const results = await this.drizzle.select().from(schema.cliente);

    return results.map((result) => ({
      id: String(result.cliente_id),
      email: result.email ?? "",
      username: result.username ?? "",
      name: result.nome ?? "",
      cpf: result.cpf,
      phone: result.telefone ?? "",
      birthDate: result.data_nascimento ?? "",
    }));
  }
}
