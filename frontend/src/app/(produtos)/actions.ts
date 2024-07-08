"use server";

import { defaultErrorMessages } from "@/domain/errors/messages";
import { Input } from "@/domain/use-cases/product/delete";
import { product } from "@/main/use-cases";

export const handle = async () => {
  try {
    return await product.list.execute();
  } catch (error) {
    console.error(error);
    return defaultErrorMessages.default;
  }
};

export const remove = async (input: Input) => {
  try {
    await product.delete.execute(input);
  } catch (error) {
    console.error(error);
    return defaultErrorMessages.default;
  }
};
