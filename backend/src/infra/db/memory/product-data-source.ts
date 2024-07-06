import {
  InspectProductDto,
  ListProductDto,
  IProductDataSource,
} from "@/domain/data-sources/product";
import { Product } from "@/domain/entities/product";

export class ProductDataSoruceMemory implements IProductDataSource {
  storage = [] as Product[];

  async inspect(id: string): Promise<InspectProductDto | null> {
    const product = this.storage.find(({ props }) => props.id === id);

    if (!product) return null;

    return {
      id: product.props.id,
      name: product.props.name,
      description: product.props.description,
      image: product.props.image,
      price: product.props.price,
      stock: product.props.stock,
      createdAt: product.props.createdAt,
      category: product.props.category.props.name,
    };
  }

  async list(): Promise<ListProductDto[]> {
    return this.storage.map((product) => ({
      id: product.props.id,
      name: product.props.name,
      description: product.props.description,
      image: product.props.image,
      price: product.props.price,
      stock: product.props.stock,
      createdAt: product.props.createdAt,
      category: product.props.category.props.name,
    }));
  }
}
