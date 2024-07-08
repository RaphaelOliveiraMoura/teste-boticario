import { CreateProductUseCase } from "@/domain/use-cases/product/create";
import { DeleteProductUseCase } from "@/domain/use-cases/product/delete";
import { InspectProductUseCase } from "@/domain/use-cases/product/inspect";
import { ListProductsUseCase } from "@/domain/use-cases/product/list";
import { UpdateProductUseCase } from "@/domain/use-cases/product/update";
import { SignInUseCase } from "@/domain/use-cases/sign-in";
import { SignUpUseCase } from "@/domain/use-cases/sign-up";
import { SignInFetchUseCase } from "@/infra/use-cases/auth/sign-in-fetch";
import { SignInMemoryUseCase } from "@/infra/use-cases/auth/sign-in-memory";
import { SignUpFetchUseCase } from "@/infra/use-cases/auth/sign-up-fetch";
import { SignUpMemoryUseCase } from "@/infra/use-cases/auth/sign-up-memory";
import { CreateProductFetchUseCase } from "@/infra/use-cases/product/create-product-fetch";
import { CreateProductMemoryUseCase } from "@/infra/use-cases/product/create-product-memory";
import { DeleteProductFetchUseCase } from "@/infra/use-cases/product/delete-product-fetch";
import { DeleteProductMemoryUseCase } from "@/infra/use-cases/product/delete-product-memory";
import { InspectProductFetchUseCase } from "@/infra/use-cases/product/inspect-product-fetch";
import { InspectProductMemoryUseCase } from "@/infra/use-cases/product/inspect-product-memory";
import { ListProductsFetchUseCase } from "@/infra/use-cases/product/list-products-fetch";
import { ListProductsMemoryUseCase } from "@/infra/use-cases/product/list-products-memory";
import { UpdateProductFetchUseCase } from "@/infra/use-cases/product/update-product-fetch";
import { UpdateProductMemoryUseCase } from "@/infra/use-cases/product/update-product-memory";

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
