import { ClientNotFoundError } from "../errors/not-foud";

import { UseCase } from "@/application";
import { IClientRepository } from "@/domain/repositories/client-repository";

export class DeleteClientCommand implements UseCase<Input, void> {
  constructor(private readonly clientRepository: IClientRepository) {}

  async execute(input: Input): Promise<void> {
    const client = await this.clientRepository.findById(input.id);

    if (!client) {
      throw new ClientNotFoundError(input.id);
    }

    await this.clientRepository.remove(client.props.id);
  }
}

interface Input {
  id: string;
}
