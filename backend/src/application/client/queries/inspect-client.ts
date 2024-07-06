import { ClientNotFoundError } from "../errors/not-foud";

import { UseCase } from "@/application";
import {
  IClientDataSource,
  InspectClientDto,
} from "@/domain/data-sources/client";

export class InspectClientQuery implements UseCase<Input, Output> {
  constructor(private readonly clientDataSource: IClientDataSource) {}

  async execute(input: Input): Promise<Output> {
    const client = await this.clientDataSource.inspect(input.id);

    if (!client) {
      throw new ClientNotFoundError(input.id);
    }

    return client;
  }
}

interface Input {
  id: string;
}

type Output = InspectClientDto;
