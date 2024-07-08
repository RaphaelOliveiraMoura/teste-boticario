import { CreateCategoryUseCase } from "@/domain/use-cases/category/create";
import { DeleteCategoryUseCase } from "@/domain/use-cases/category/delete";
import { InspectCategoryUseCase } from "@/domain/use-cases/category/inspect";
import { ListCategoriesUseCase } from "@/domain/use-cases/category/list";
import { UpdateCategoryUseCase } from "@/domain/use-cases/category/update";
import { CreateClientUseCase } from "@/domain/use-cases/client/create";
import { DeleteClientUseCase } from "@/domain/use-cases/client/delete";
import { InspectClientUseCase } from "@/domain/use-cases/client/inspect";
import { ListClientsUseCase } from "@/domain/use-cases/client/list";
import { UpdateClientUseCase } from "@/domain/use-cases/client/update";
import { CreateOrderUseCase } from "@/domain/use-cases/order/create";
import { DeleteOrderUseCase } from "@/domain/use-cases/order/delete";
import { InspectOrderUseCase } from "@/domain/use-cases/order/inspect";
import { ListOrdersUseCase } from "@/domain/use-cases/order/list";
import { UpdateOrderUseCase } from "@/domain/use-cases/order/update";
import { CreateProductUseCase } from "@/domain/use-cases/product/create";
import { DeleteProductUseCase } from "@/domain/use-cases/product/delete";
import { InspectProductUseCase } from "@/domain/use-cases/product/inspect";
import { ListProductsUseCase } from "@/domain/use-cases/product/list";
import { UpdateProductUseCase } from "@/domain/use-cases/product/update";
import { SignInUseCase } from "@/domain/use-cases/sign-in";
import { SignUpUseCase } from "@/domain/use-cases/sign-up";
import {
  SignInFetchUseCase,
  SignInMemoryUseCase,
  SignUpFetchUseCase,
  SignUpMemoryUseCase,
} from "@/infra/use-cases/auth";
import {
  CreateCategoryFetchUseCase,
  CreateCategoryMemoryUseCase,
  UpdateCategoryFetchUseCase,
  UpdateCategoryMemoryUseCase,
  DeleteCategoryFetchUseCase,
  DeleteCategoryMemoryUseCase,
  ListCategoriesFetchUseCase,
  ListCategoriesMemoryUseCase,
  InspectCategoryFetchUseCase,
  InspectCategoryMemoryUseCase,
} from "@/infra/use-cases/category";
import {
  CreateClientFetchUseCase,
  CreateClientMemoryUseCase,
  UpdateClientFetchUseCase,
  UpdateClientMemoryUseCase,
  DeleteClientFetchUseCase,
  DeleteClientMemoryUseCase,
  ListClientsFetchUseCase,
  ListClientsMemoryUseCase,
  InspectClientFetchUseCase,
  InspectClientMemoryUseCase,
} from "@/infra/use-cases/client";
import {
  CreateOrderFetchUseCase,
  CreateOrderMemoryUseCase,
  UpdateOrderFetchUseCase,
  UpdateOrderMemoryUseCase,
  DeleteOrderFetchUseCase,
  DeleteOrderMemoryUseCase,
  ListOrdersFetchUseCase,
  ListOrdersMemoryUseCase,
  InspectOrderFetchUseCase,
  InspectOrderMemoryUseCase,
} from "@/infra/use-cases/order";
import {
  CreateProductFetchUseCase,
  CreateProductMemoryUseCase,
  UpdateProductFetchUseCase,
  UpdateProductMemoryUseCase,
  DeleteProductFetchUseCase,
  DeleteProductMemoryUseCase,
  ListProductsFetchUseCase,
  ListProductsMemoryUseCase,
  InspectProductFetchUseCase,
  InspectProductMemoryUseCase,
} from "@/infra/use-cases/product";

import { httpClient } from "./services";
import { MockStrategyUseCase } from "./use-case-builder";

export const auth = {
  signIn: new MockStrategyUseCase<SignInUseCase>()
    .set(new SignInFetchUseCase(httpClient))
    .mock(new SignInMemoryUseCase())
    .build(),

  signUp: new MockStrategyUseCase<SignUpUseCase>()
    .set(new SignUpFetchUseCase(httpClient))
    .mock(new SignUpMemoryUseCase())
    .build(),
};

export const product = {
  create: new MockStrategyUseCase<CreateProductUseCase>()
    .set(new CreateProductFetchUseCase(httpClient))
    .mock(new CreateProductMemoryUseCase())
    .build(),
  update: new MockStrategyUseCase<UpdateProductUseCase>()
    .set(new UpdateProductFetchUseCase(httpClient))
    .mock(new UpdateProductMemoryUseCase())
    .build(),
  delete: new MockStrategyUseCase<DeleteProductUseCase>()
    .set(new DeleteProductFetchUseCase(httpClient))
    .mock(new DeleteProductMemoryUseCase())
    .build(),
  list: new MockStrategyUseCase<ListProductsUseCase>()
    .set(new ListProductsFetchUseCase(httpClient))
    .mock(new ListProductsMemoryUseCase())
    .build(),
  inspect: new MockStrategyUseCase<InspectProductUseCase>()
    .set(new InspectProductFetchUseCase(httpClient))
    .mock(new InspectProductMemoryUseCase())
    .build(),
};

export const category = {
  create: new MockStrategyUseCase<CreateCategoryUseCase>()
    .set(new CreateCategoryFetchUseCase(httpClient))
    .mock(new CreateCategoryMemoryUseCase())
    .build(),
  update: new MockStrategyUseCase<UpdateCategoryUseCase>()
    .set(new UpdateCategoryFetchUseCase(httpClient))
    .mock(new UpdateCategoryMemoryUseCase())
    .build(),
  delete: new MockStrategyUseCase<DeleteCategoryUseCase>()
    .set(new DeleteCategoryFetchUseCase(httpClient))
    .mock(new DeleteCategoryMemoryUseCase())
    .build(),
  list: new MockStrategyUseCase<ListCategoriesUseCase>()
    .set(new ListCategoriesFetchUseCase(httpClient))
    .mock(new ListCategoriesMemoryUseCase())
    .build(),
  inspect: new MockStrategyUseCase<InspectCategoryUseCase>()
    .set(new InspectCategoryFetchUseCase(httpClient))
    .mock(new InspectCategoryMemoryUseCase())
    .build(),
};

export const order = {
  create: new MockStrategyUseCase<CreateOrderUseCase>()
    .set(new CreateOrderFetchUseCase(httpClient))
    .mock(new CreateOrderMemoryUseCase())
    .build(),
  update: new MockStrategyUseCase<UpdateOrderUseCase>()
    .set(new UpdateOrderFetchUseCase(httpClient))
    .mock(new UpdateOrderMemoryUseCase())
    .build(),
  delete: new MockStrategyUseCase<DeleteOrderUseCase>()
    .set(new DeleteOrderFetchUseCase(httpClient))
    .mock(new DeleteOrderMemoryUseCase())
    .build(),
  list: new MockStrategyUseCase<ListOrdersUseCase>()
    .set(new ListOrdersFetchUseCase(httpClient))
    .mock(new ListOrdersMemoryUseCase())
    .build(),
  inspect: new MockStrategyUseCase<InspectOrderUseCase>()
    .set(new InspectOrderFetchUseCase(httpClient))
    .mock(new InspectOrderMemoryUseCase())
    .build(),
};

export const client = {
  create: new MockStrategyUseCase<CreateClientUseCase>()
    .set(new CreateClientFetchUseCase(httpClient))
    .mock(new CreateClientMemoryUseCase())
    .build(),
  update: new MockStrategyUseCase<UpdateClientUseCase>()
    .set(new UpdateClientFetchUseCase(httpClient))
    .mock(new UpdateClientMemoryUseCase())
    .build(),
  delete: new MockStrategyUseCase<DeleteClientUseCase>()
    .set(new DeleteClientFetchUseCase(httpClient))
    .mock(new DeleteClientMemoryUseCase())
    .build(),
  list: new MockStrategyUseCase<ListClientsUseCase>()
    .set(new ListClientsFetchUseCase(httpClient))
    .mock(new ListClientsMemoryUseCase())
    .build(),
  inspect: new MockStrategyUseCase<InspectClientUseCase>()
    .set(new InspectClientFetchUseCase(httpClient))
    .mock(new InspectClientMemoryUseCase())
    .build(),
};
