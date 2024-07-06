import {
  InspectOrderDto,
  ListOrderDto,
  IOrderDataSource,
} from "@/domain/data-sources/order";

export class OrderDataSoruceMemory implements IOrderDataSource {
  storage = [] as InspectOrderDto[];

  async inspect(id: string): Promise<InspectOrderDto | null> {
    const order = this.storage.find((data) => data.id === id);
    if (!order) return null;
    return order;
  }

  async list(): Promise<ListOrderDto[]> {
    return this.storage;
  }
}
