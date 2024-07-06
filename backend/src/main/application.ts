import { encrypter, hasher } from "./services";
import {
  categoryDataSource,
  categoryRepository,
  clientDataSource,
  clientRepository,
} from "./storage";

import { SignInUseCase } from "@/application/auth/use-case/sign-in";
import { CreateCategoryCommand } from "@/application/category/commands/create-category";
import { DeleteCategoryCommand } from "@/application/category/commands/delete-category";
import { UpdateCategoryCommand } from "@/application/category/commands/update-category";
import { InspectCategoryQuery } from "@/application/category/queries/inspect-category";
import { ListCategoriesQuery } from "@/application/category/queries/list-categories";
import { CreateClientCommand } from "@/application/client/commands/create-client";
import { DeleteClientCommand } from "@/application/client/commands/delete-client";
import { UpdateClientCommand } from "@/application/client/commands/update-client";
import { InspectClientQuery } from "@/application/client/queries/inspect-client";
import { ListClientsQuery } from "@/application/client/queries/list-clients";

export const signInUseCase = new SignInUseCase(
  clientRepository,
  encrypter,
  hasher,
);

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

export const inspectClientQuery = new InspectClientQuery(clientDataSource);
export const listClientsQuery = new ListClientsQuery(clientDataSource);
export const createClientCommand = new CreateClientCommand(
  clientRepository,
  encrypter,
);
export const updateClientCommand = new UpdateClientCommand(
  clientRepository,
  encrypter,
);
export const deleteClientCommand = new DeleteClientCommand(clientRepository);
