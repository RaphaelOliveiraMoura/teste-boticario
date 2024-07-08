import { encrypter, hasher } from "./services";
import {
  categoryDataSource,
  categoryRepository,
  clientDataSource,
  clientRepository,
  orderDataSource,
  orderRepository,
  productDataSource,
  productRepository,
} from "./storage";

import { SignInUseCase } from "@/application/auth/use-case/sign-in";
import { VerifyAuthUseCase } from "@/application/auth/use-case/verify-auth";
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
import { CreateOrderCommand } from "@/application/order/commands/create-order";
import { DeleteOrderCommand } from "@/application/order/commands/delete-order";
import { UpdateOrderCommand } from "@/application/order/commands/update-order";
import { InspectOrderQuery } from "@/application/order/queries/inspect-order";
import { ListOrdersQuery } from "@/application/order/queries/list-orders";
import { CreateProductCommand } from "@/application/product/commands/create-product";
import { DeleteProductCommand } from "@/application/product/commands/delete-product";
import { UpdateProductCommand } from "@/application/product/commands/update-product";
import { InspectProductQuery } from "@/application/product/queries/inspect-product";
import { ListProductsQuery } from "@/application/product/queries/list-products";

export const auth = {
  signIn: new SignInUseCase(clientRepository, encrypter, hasher),
  verifyAuth: new VerifyAuthUseCase(clientRepository, hasher),
};

export const category = {
  inspect: new InspectCategoryQuery(categoryDataSource),
  list: new ListCategoriesQuery(categoryDataSource),
  create: new CreateCategoryCommand(categoryRepository),
  update: new UpdateCategoryCommand(categoryRepository),
  delete: new DeleteCategoryCommand(categoryRepository),
};

export const client = {
  inspect: new InspectClientQuery(clientDataSource),
  list: new ListClientsQuery(clientDataSource),
  create: new CreateClientCommand(clientRepository, encrypter),
  update: new UpdateClientCommand(clientRepository, encrypter),
  delete: new DeleteClientCommand(clientRepository),
};

export const product = {
  inspect: new InspectProductQuery(productDataSource),
  list: new ListProductsQuery(productDataSource),
  create: new CreateProductCommand(productRepository, categoryRepository),
  update: new UpdateProductCommand(productRepository, categoryRepository),
  delete: new DeleteProductCommand(productRepository),
};

export const order = {
  inspect: new InspectOrderQuery(orderDataSource),
  list: new ListOrdersQuery(orderDataSource),
  create: new CreateOrderCommand(
    orderRepository,
    clientRepository,
    productRepository,
  ),
  update: new UpdateOrderCommand(orderRepository),
  delete: new DeleteOrderCommand(orderRepository),
};
