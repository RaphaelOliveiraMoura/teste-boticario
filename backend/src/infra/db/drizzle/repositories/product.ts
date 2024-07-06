import { and, eq, ne } from "drizzle-orm";

import { DbConnectionDrizzleService } from "../db-connection";
import { schema } from "../schema";

import { Category } from "@/domain/entities/category";
import { Product } from "@/domain/entities/product";
import { IProductRepository } from "@/domain/repositories/product-repository";

export class ProductDrizzleRepository implements IProductRepository {
  private drizzle = DbConnectionDrizzleService.getInstance().drizzle();

  async alreadyInUse(product: Product): Promise<boolean> {
    const [inUse] = await this.drizzle
      .select()
      .from(schema.produto)
      .where(
        and(
          eq(schema.categoria.nome_categoria, product.props.name),
          ne(schema.categoria.categoria_id, Number(product.props.id)).if(
            product.props.id !== undefined && product.props.id !== "",
          ),
        ),
      )
      .limit(1);

    return !!inUse;
  }

  async findById(id: string): Promise<Product | null> {
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

    return new Product({
      id: String(result.produto.produto_id),
      name: result.produto.nome_produto ?? "",
      description: result.produto.descricao_produto ?? "",
      createdAt: new Date(result.produto.data_cadastro_produto ?? ""),
      image: result.produto.imagem ?? "",
      price: result.produto.preco_produto ? +result.produto.preco_produto : 0,
      stock: result.produto.qtd_estoque ?? 0,
      category: new Category({
        id: String(result.categoria.categoria_id),
        name: result.categoria.nome_categoria ?? "",
        description: result.categoria.descricao_categoria ?? "",
      }),
    });
  }

  async create(product: Product): Promise<void> {
    await this.drizzle.insert(schema.produto).values({
      nome_produto: product.props.name,
      descricao_produto: product.props.description,
      data_cadastro_produto: product.props.createdAt.toISOString(),
      imagem: product.props.image,
      preco_produto: String(product.props.price),
      qtd_estoque: product.props.stock,
      categoria_id: +product.props.category.props.id,
    });
  }

  async update(product: Product): Promise<void> {
    await this.drizzle
      .update(schema.produto)
      .set({
        nome_produto: product.props.name,
        descricao_produto: product.props.description,
        data_cadastro_produto: product.props.createdAt.toISOString(),
        imagem: product.props.image,
        preco_produto: String(product.props.price),
        qtd_estoque: product.props.stock,
        categoria_id: +product.props.category.props.id,
      })
      .where(eq(schema.categoria.categoria_id, +product.props.id));
  }

  async remove(id: string): Promise<void> {
    await this.drizzle
      .delete(schema.produto)
      .where(eq(schema.produto.produto_id, +id));
  }
}
