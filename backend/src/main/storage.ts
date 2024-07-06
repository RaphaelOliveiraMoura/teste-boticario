import { CategoryDrizzleDataSource } from "@/infra/db/drizzle/data-sources/category";
import { CategoryDrizzleRepository } from "@/infra/db/drizzle/repositories/category";

export const categoryRepository = new CategoryDrizzleRepository();
export const categoryDataSource = new CategoryDrizzleDataSource();
