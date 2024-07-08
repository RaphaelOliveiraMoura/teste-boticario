export const CreatePageKey = "novo";

export const Pages = {
  SignIn: () => "/auth",
  SignUp: () => "/auth/cadastro",

  ListProducts: () => "/",
  InspectProduct: (id: string) => `/produtos/${id}`,
  CreateProduct: () => `/produtos/${CreatePageKey}`,

  ListCategories: () => "/",
  InspectCategory: (id: string) => `/categorias/${id}`,
  CreateCategory: () => `/categorias/${CreatePageKey}`,
};
