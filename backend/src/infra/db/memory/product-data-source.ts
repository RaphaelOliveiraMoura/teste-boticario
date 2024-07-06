import {
  InspectProductDto,
  ListProductDto,
  IProductDataSource,
} from "@/domain/data-sources/product";

export class ProductDataSoruceMemory implements IProductDataSource {
  storage = [] as InspectProductDto[];

  async inspect(id: string): Promise<InspectProductDto | null> {
    const product = this.storage.find((product) => product.id === id);
    if (!product) return null;
    return product;
  }

  async list(): Promise<ListProductDto[]> {
    return this.storage;
  }
}
