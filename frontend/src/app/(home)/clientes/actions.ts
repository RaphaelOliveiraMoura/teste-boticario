"use server";

import { Input } from "@/domain/use-cases/product/delete";
import { errorHandler } from "@/infra/services/error-handler";
import { product } from "@/main/use-cases";

export const handle = async () => {
  try {
    return await product.list.execute();
  } catch (error) {
    return errorHandler(error);
  }
};

export const remove = async (input: Input) => {
  try {
    await product.delete.execute(input);
  } catch (error) {
    return errorHandler(error);
  }
};
