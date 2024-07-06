import { CategoryDrizzleDataSource } from "@/infra/db/drizzle/data-sources/category";
import { ClientDrizzleDataSource } from "@/infra/db/drizzle/data-sources/client";
import { OrderDrizzleDataSource } from "@/infra/db/drizzle/data-sources/order";
import { ProductDrizzleDataSource } from "@/infra/db/drizzle/data-sources/product";
import { CategoryDrizzleRepository } from "@/infra/db/drizzle/repositories/category";
import { ClientDrizzleRepository } from "@/infra/db/drizzle/repositories/client";
import { OrderDrizzleRepository } from "@/infra/db/drizzle/repositories/order";
import { ProductDrizzleRepository } from "@/infra/db/drizzle/repositories/product";

export const categoryRepository = new CategoryDrizzleRepository();
export const categoryDataSource = new CategoryDrizzleDataSource();

export const clientRepository = new ClientDrizzleRepository();
export const clientDataSource = new ClientDrizzleDataSource();

export const productRepository = new ProductDrizzleRepository();
export const productDataSource = new ProductDrizzleDataSource();

export const orderRepository = new OrderDrizzleRepository();
export const orderDataSource = new OrderDrizzleDataSource();
