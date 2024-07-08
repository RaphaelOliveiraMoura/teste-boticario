"use server";

import { Input } from "@/domain/use-cases/order/delete";
import { errorHandler } from "@/infra/services/error-handler";
import { order } from "@/main/use-cases";

export const handle = async () => {
  try {
    return await order.list.execute();
  } catch (error) {
    return errorHandler(error);
  }
};

export const remove = async (input: Input) => {
  try {
    await order.delete.execute(input);
  } catch (error) {
    return errorHandler(error);
  }
};
