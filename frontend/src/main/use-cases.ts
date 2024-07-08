import { CreateCategoryUseCase } from "@/domain/use-cases/category/create";
import { DeleteCategoryUseCase } from "@/domain/use-cases/category/delete";
import { InspectCategoryUseCase } from "@/domain/use-cases/category/inspect";
import { ListCategoriesUseCase } from "@/domain/use-cases/category/list";
import { UpdateCategoryUseCase } from "@/domain/use-cases/category/update";
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
import { CreateCategoryFetchUseCase } from "@/infra/use-cases/category/create-category-fetch";
import { CreateCategoryMemoryUseCase } from "@/infra/use-cases/category/create-category-memory";
import { DeleteCategoryFetchUseCase } from "@/infra/use-cases/category/delete-category-fetch";
import { DeleteCategoryMemoryUseCase } from "@/infra/use-cases/category/delete-category-memory";
import { InspectCategoryFetchUseCase } from "@/infra/use-cases/category/inspect-category-fetch";
import { InspectCategoryMemoryUseCase } from "@/infra/use-cases/category/inspect-category-memory";
import { ListCategoriesFetchUseCase } from "@/infra/use-cases/category/list-category-fetch";
import { ListCategoriesMemoryUseCase } from "@/infra/use-cases/category/list-category-memory";
import { UpdateCategoryFetchUseCase } from "@/infra/use-cases/category/update-category-fetch";
import { UpdateCategoryMemoryUseCase } from "@/infra/use-cases/category/update-category-memory";
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
