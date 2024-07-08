export interface OrderBody {
  products: {
    idProduct: string;
    name: string;
    quantity: number;
  }[];
}

export const validateBody = async (body: OrderBody) => {
  const errors = [];

  if (body.products.length === 0)
    errors.push("products must have at least one item");

  body.products.forEach((product) => {
    if (!product.quantity) errors.push("product.quantity is required");
    if (!product.idProduct) errors.push("product.idProduct is required");
  });

  return { valid: errors.length === 0, errors };
};
