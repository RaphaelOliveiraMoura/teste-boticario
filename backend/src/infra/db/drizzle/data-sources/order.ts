import { eq } from "drizzle-orm";

import { DbConnectionDrizzleService } from "../db-connection";
import { schema } from "../schema";

import {
  ListOrderDto,
  InspectOrderDto,
  IOrderDataSource,
} from "@/domain/data-sources/order";
import { OrderEnum } from "@/domain/entities/order";

export class OrderDrizzleDataSource implements IOrderDataSource {
  private drizzle = DbConnectionDrizzleService.getInstance().drizzle();

  async inspect(id: string): Promise<InspectOrderDto | null> {
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
      );

    if (!result) return null;

    return {
      id: String(result.pedido.cliente_id),
      code: String(result.pedido.numero_pedido),
      status: result.pedido.status ? OrderEnum.finished : OrderEnum.pending,
      createdAt: new Date(result.pedido.data_pedido).toISOString(),
      totalPrice: Number(result.pedido.valor_total_pedido ?? 0),
      client: result.cliente.nome ?? "",
      products: products.map(({ produto, produto_pedido }) => {
        return {
          id: String(produto.produto_id),
          name: produto.nome_produto ?? "",
          price: produto.preco_produto ? +produto.preco_produto : 0,
          quantity: Number(produto_pedido.qtd_produto_pedido),
        };
      }),
    };
  }

  async list(): Promise<ListOrderDto[]> {
    const results = await this.drizzle
      .select()
      .from(schema.pedido)
      .innerJoin(
        schema.cliente,
        eq(schema.cliente.cliente_id, schema.pedido.cliente_id),
      );

    return results.map((result) => ({
      id: String(result.pedido.cliente_id),
      code: String(result.pedido.numero_pedido),
      status: result.pedido.status ? OrderEnum.finished : OrderEnum.pending,
      createdAt: new Date(result.pedido.data_pedido).toISOString(),
      totalPrice: Number(result.pedido.valor_total_pedido ?? 0),
      client: result.cliente.nome ?? "",
    }));
  }
}
