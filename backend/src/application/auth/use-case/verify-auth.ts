import { InvalidAuthenticationError } from "../errors/invalid-authentication";

import { UseCase } from "@/application";
import { Client } from "@/domain/entities/client";
import { IClientRepository } from "@/domain/repositories/client-repository";
import { IHashService } from "@/domain/services/hash";

export class VerifyAuthUseCase implements UseCase<Input, Output> {
  constructor(
    private readonly clientRepository: IClientRepository,
    private readonly hashService: IHashService,
  ) {}

  async execute(input: Input): Promise<Output> {
    if (!input.token) {
      throw new InvalidAuthenticationError();
    }

    const token = await this.hashService
      .decode<{ id: string }>(input.token)
      .catch(() => {
        throw new InvalidAuthenticationError();
      });

    const client = await this.clientRepository.findById(token.id);

    if (!client) {
      throw new InvalidAuthenticationError();
    }

    return client;
  }
}

interface Input {
  token?: string;
}

type Output = Client;
