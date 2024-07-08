"use server";

import { Input } from "@/domain/use-cases/category/delete";
import { errorHandler } from "@/infra/services/error-handler";
import { category } from "@/main/use-cases";

export const handle = async () => {
  try {
    return await category.list.execute();
  } catch (error) {
    return errorHandler(error);
  }
};

export const remove = async (input: Input) => {
  try {
    await category.delete.execute(input);
  } catch (error) {
    return errorHandler(error);
  }
};
