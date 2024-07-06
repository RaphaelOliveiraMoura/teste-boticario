import { UseCase } from "@/application";
import { IOrderDataSource, ListOrderDto } from "@/domain/data-sources/order";

export class ListOrdersQuery implements UseCase<undefined, Output> {
  constructor(private readonly orderDataSource: IOrderDataSource) {}

  async execute(): Promise<Output> {
    return this.orderDataSource.list();
  }
}

type Output = ListOrderDto[];
