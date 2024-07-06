import { UseCase } from "@/application";
import { IClientDataSource, ListClientDto } from "@/domain/data-sources/client";

export class ListClientsQuery implements UseCase<undefined, Output> {
  constructor(private readonly clientDataSource: IClientDataSource) {}

  async execute(): Promise<Output> {
    return this.clientDataSource.list();
  }
}

type Output = ListClientDto[];
