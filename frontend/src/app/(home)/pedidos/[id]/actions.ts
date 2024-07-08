"use server";

import { revalidatePath } from "next/cache";

import { Input as InputCreate } from "@/domain/use-cases/order/create";
import { Input as InputInspect } from "@/domain/use-cases/order/inspect";
import { Input as InputUpdate } from "@/domain/use-cases/order/update";
import { errorHandler } from "@/infra/services/error-handler";
import { order } from "@/main/use-cases";
import { Pages } from "@/ui/pages";

export const handle = async (input: InputInspect) => {
  try {
    return await order.inspect.execute(input);
  } catch (error) {
    return errorHandler(error);
  }
};

export const create = async (input: InputCreate) => {
  try {
    await order.create.execute(input);
    revalidatePath(Pages.ListOrders());
  } catch (error) {
    return errorHandler(error);
  }
};

export const update = async (input: InputUpdate) => {
  try {
    await order.update.execute(input);
    revalidatePath(Pages.ListOrders());
    revalidatePath(Pages.InspectOrder(input.id));
  } catch (error) {
    return errorHandler(error);
  }
};
