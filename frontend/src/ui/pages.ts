export const CreatePageKey = "novo";

export const Pages = {
  SignIn: () => "/auth",
  SignUp: () => "/auth/cadastro",

  ListProducts: () => "/produtos",
  InspectProduct: (id: string) => `/produtos/${id}`,
  CreateProduct: () => `/produtos/${CreatePageKey}`,

  ListCategories: () => "/categorias",
  InspectCategory: (id: string) => `/categorias/${id}`,
  CreateCategory: () => `/categorias/${CreatePageKey}`,

  ListClients: () => "/clientes",
  InspectClient: (id: string) => `/clientes/${id}`,
  CreateClient: () => `/clientes/${CreatePageKey}`,

  ListOrders: () => "/pedidos",
  InspectOrder: (id: string) => `/pedidos/${id}`,
  CreateOrder: () => `/pedidos/${CreatePageKey}`,
};
