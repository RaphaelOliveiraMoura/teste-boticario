"use server";

import { Input as InputCreate } from "@/domain/use-cases/product/create";
import { Input as InputInspect } from "@/domain/use-cases/product/inspect";
import { Input as InputUpdate } from "@/domain/use-cases/product/update";
import { errorHandler } from "@/infra/services/error-handler";
import { product } from "@/main/use-cases";

export const handle = async (input: InputInspect) => {
  try {
    return await product.inspect.execute(input);
  } catch (error) {
    return errorHandler(error);
  }
};

export const create = async (input: InputCreate) => {
  try {
    await product.create.execute(input);
  } catch (error) {
    return errorHandler(error);
  }
};

export const update = async (input: InputUpdate) => {
  try {
    await product.delete.execute(input);
  } catch (error) {
    return errorHandler(error);
  }
};
