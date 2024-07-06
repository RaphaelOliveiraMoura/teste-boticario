import { eq } from "drizzle-orm";

import { DbConnectionDrizzleService } from "../db-connection";
import { schema } from "../schema";

import {
  ListProductDto,
  InspectProductDto,
  IProductDataSource,
} from "@/domain/data-sources/product";

export class ProductDrizzleDataSource implements IProductDataSource {
  private drizzle = DbConnectionDrizzleService.getInstance().drizzle();

  async inspect(id: string): Promise<InspectProductDto | null> {
    const [result] = await this.drizzle
      .select()
      .from(schema.produto)
      .where(eq(schema.produto.produto_id, +id))
      .innerJoin(
        schema.categoria,
        eq(schema.categoria.categoria_id, schema.produto.categoria_id),
      )
      .limit(1);

    if (!result) return null;

    return {
      id: String(result.produto.produto_id),
      name: result.produto.nome_produto ?? "",
      description: result.produto.descricao_produto ?? "",
      price: Number(result.produto.preco_produto),
      stock: Number(result.produto.qtd_estoque),
      category: result.produto.nome_produto ?? "",
      image: result.produto.imagem ?? "",
      createdAt: new Date(result.produto.data_cadastro_produto ?? ""),
    };
  }

  async list(): Promise<ListProductDto[]> {
    const results = await this.drizzle
      .select()
      .from(schema.produto)
      .innerJoin(
        schema.categoria,
        eq(schema.categoria.categoria_id, schema.produto.categoria_id),
      );

    return results.map((result) => ({
      id: String(result.produto.produto_id),
      name: result.produto.nome_produto ?? "",
      description: result.produto.descricao_produto ?? "",
      price: Number(result.produto.preco_produto),
      stock: Number(result.produto.qtd_estoque),
      category: result.produto.nome_produto ?? "",
      image: result.produto.imagem ?? "",
      createdAt: new Date(result.produto.data_cadastro_produto ?? ""),
    }));
  }
}
