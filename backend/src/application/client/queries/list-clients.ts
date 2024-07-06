import { IClientDataSource, ListClientDto } from "./data-source";

import { UseCase } from "@/application";

export class ListClientsQuery implements UseCase<undefined, Output> {
  constructor(private readonly clientDataSource: IClientDataSource) {}

  async execute(): Promise<Output> {
    return this.clientDataSource.list();
  }
}

type Output = ListClientDto[];
