import { CategoryDrizzleDataSource } from "@/infra/db/drizzle/data-sources/category";
import { CategoryDrizzleRepository } from "@/infra/db/drizzle/repositories/category";
import { ClientDrizzleRepository } from "@/infra/db/drizzle/repositories/client";

export const categoryRepository = new CategoryDrizzleRepository();
export const categoryDataSource = new CategoryDrizzleDataSource();

export const clientRepository = new ClientDrizzleRepository();
