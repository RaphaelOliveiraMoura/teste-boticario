export interface ProductBody {
  name: string;
  description: string;
  price: number;
  stock: number;
  idCategory: string;
  image: string;
}

export const validateBody = async (body: ProductBody) => {
  const errors = [];

  if (!body.name) errors.push("name is required");
  if (!body.description) errors.push("description is required");
  if (!body.price) errors.push("price is required");
  if (!body.image) errors.push("image is required");
  if (!body.stock) errors.push("stock is required");
  if (!body.idCategory) errors.push("idCategory is required");

  return { valid: errors.length === 0, errors };
};
