import { InvalidCredentialsError } from "../errors/invalid-credentials";

import { UseCase } from "@/application";
import { IClientRepository } from "@/domain/repositories/client-repository";
import { IEncryptService } from "@/domain/services/encrypt";
import { IHashService } from "@/domain/services/hash";

export class SignInUseCase implements UseCase<Input, Output> {
  constructor(
    private readonly clientRepository: IClientRepository,
    private readonly encryptService: IEncryptService,
    private readonly hashService: IHashService,
  ) {}

  async execute(input: Input): Promise<Output> {
    const client = await this.clientRepository.findByUsername(input.username);

    if (!client) {
      throw new InvalidCredentialsError();
    }

    const passwordIsValid = await this.encryptService.compare(
      client.props.password,
      input.password,
    );

    if (!passwordIsValid) {
      throw new InvalidCredentialsError();
    }

    const token = await this.hashService.hash({
      id: client.props.id,
      username: client.props.username,
    });

    return { token };
  }
}

interface Input {
  username: string;
  password: string;
}

interface Output {
  token: string;
}
