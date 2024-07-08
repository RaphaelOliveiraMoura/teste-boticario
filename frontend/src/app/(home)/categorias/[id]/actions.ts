"use server";

import { revalidatePath } from "next/cache";

import { Input as InputCreate } from "@/domain/use-cases/category/create";
import { Input as InputInspect } from "@/domain/use-cases/category/inspect";
import { Input as InputUpdate } from "@/domain/use-cases/category/update";
import { errorHandler } from "@/infra/services/error-handler";
import { category } from "@/main/use-cases";
import { Pages } from "@/ui/pages";

export const handle = async (input: InputInspect) => {
  try {
    return await category.inspect.execute(input);
  } catch (error) {
    return errorHandler(error);
  }
};

export const create = async (input: InputCreate) => {
  try {
    await category.create.execute(input);
    revalidatePath(Pages.ListCategories());
  } catch (error) {
    return errorHandler(error);
  }
};

export const update = async (input: InputUpdate) => {
  try {
    await category.update.execute(input);
    revalidatePath(Pages.ListCategories());
    revalidatePath(Pages.InspectCategory(input.id));
  } catch (error) {
    return errorHandler(error);
  }
};
