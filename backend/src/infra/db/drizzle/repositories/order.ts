import { eq } from "drizzle-orm";

import { DbConnectionDrizzleService } from "../db-connection";
import { schema } from "../schema";

import { Category } from "@/domain/entities/category";
import { Order, OrderEnum } from "@/domain/entities/order";
import { OrderProduct } from "@/domain/entities/order-product";
import { Product } from "@/domain/entities/product";
import { IOrderRepository } from "@/domain/repositories/order-repository";

export class OrderDrizzleRepository implements IOrderRepository {
  private drizzle = DbConnectionDrizzleService.getInstance().drizzle();

  async findById(id: string): Promise<Order | null> {
    const [result] = await this.drizzle
      .select()
      .from(schema.pedido)
      .where(eq(schema.pedido.pedido_id, +id))
      .innerJoin(
        schema.cliente,
        eq(schema.cliente.cliente_id, schema.pedido.cliente_id),
      )
      .limit(1);

    const products = await this.drizzle
      .select()
      .from(schema.produto_pedido)
      .where(eq(schema.produto_pedido.pedido_id, +id))
      .innerJoin(
        schema.produto,
        eq(schema.produto.produto_id, schema.produto_pedido.produto_id),
      )
      .innerJoin(
        schema.categoria,
        eq(schema.categoria.categoria_id, schema.produto.categoria_id),
      );

    if (!result) return null;

    return new Order({
      id: String(result.pedido.cliente_id),
      code: String(result.pedido.numero_pedido),
      status: result.pedido.status ? OrderEnum.finished : OrderEnum.pending,
      createdAt: new Date(result.pedido.data_pedido),
      idClient: String(result.cliente.cliente_id ?? ""),
      products: products.map(({ produto, produto_pedido, categoria }) => {
        return new OrderProduct({
          product: new Product({
            id: String(produto.produto_id),
            name: produto.nome_produto ?? "",
            description: produto.descricao_produto ?? "",
            createdAt: new Date(produto.data_cadastro_produto ?? ""),
            image: produto.imagem ?? "",
            price: produto.preco_produto ? +produto.preco_produto : 0,
            stock: produto.qtd_estoque ?? 0,
            category: new Category({
              id: String(categoria.categoria_id),
              name: categoria.nome_categoria ?? "",
              description: categoria.descricao_categoria ?? "",
            }),
          }),
          quantity: Number(produto_pedido.qtd_produto_pedido),
        });
      }),
    });
  }

  async create(order: Order): Promise<void> {
    await this.drizzle.transaction(async (tx) => {
      const [{ pedido_id }] = await tx
        .insert(schema.pedido)
        .values({
          cliente_id: +order.props.idClient,
          data_pedido: order.props.createdAt.toISOString(),
          numero_pedido: +order.props.code,
          status: order.props.status === OrderEnum.finished ? true : false,
          valor_total_pedido: String(order.calculateTotal()),
        })
        .returning({ pedido_id: schema.pedido.pedido_id });

      for (const product of order.props.products) {
        await tx
          .update(schema.produto)
          .set({ qtd_estoque: product.props.product.props.stock });

        await tx.insert(schema.produto_pedido).values({
          pedido_id,
          produto_id: +product.props.product.props.id,
          qtd_produto_pedido: product.props.quantity,
          preco_produto_pedido: String(product.calculateTotal()),
        });
      }
    });
  }

  async update(order: Order): Promise<void> {
    await this.drizzle
      .update(schema.pedido)
      .set({
        status: order.props.status === OrderEnum.finished ? true : false,
      })
      .where(eq(schema.pedido, +order.props.id));
  }

  async remove(id: string): Promise<void> {
    await this.drizzle
      .delete(schema.pedido)
      .where(eq(schema.pedido.pedido_id, +id));
  }
}
