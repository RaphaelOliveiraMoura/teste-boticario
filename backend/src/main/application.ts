import { encrypter, hasher } from "./services";
import {
  categoryDataSource,
  categoryRepository,
  clientRepository,
} from "./storage";

import { SignInUseCase } from "@/application/auth/use-case/sign-in";
import { CreateCategoryCommand } from "@/application/category/commands/create-category";
import { DeleteCategoryCommand } from "@/application/category/commands/delete-category";
import { UpdateCategoryCommand } from "@/application/category/commands/update-category";
import { InspectCategoryQuery } from "@/application/category/queries/inspect-category";
import { ListCategoriesQuery } from "@/application/category/queries/list-categories";

export const inspectCategoryQuery = new InspectCategoryQuery(
  categoryDataSource,
);
export const listCategoriesQuery = new ListCategoriesQuery(categoryDataSource);
export const createCategoryCommand = new CreateCategoryCommand(
  categoryRepository,
);
export const updateCategoryCommand = new UpdateCategoryCommand(
  categoryRepository,
);
export const deleteCategoryCommand = new DeleteCategoryCommand(
  categoryRepository,
);

export const signInUseCase = new SignInUseCase(
  clientRepository,
  encrypter,
  hasher,
);
