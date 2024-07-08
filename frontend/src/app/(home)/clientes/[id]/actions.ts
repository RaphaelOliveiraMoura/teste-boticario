"use server";

import { revalidatePath } from "next/cache";

import { Input as InputCreate } from "@/domain/use-cases/client/create";
import { Input as InputInspect } from "@/domain/use-cases/client/inspect";
import { Input as InputUpdate } from "@/domain/use-cases/client/update";
import { errorHandler } from "@/infra/services/error-handler";
import { client } from "@/main/use-cases";
import { Pages } from "@/ui/pages";

export const handle = async (input: InputInspect) => {
  try {
    return await client.inspect.execute(input);
  } catch (error) {
    return errorHandler(error);
  }
};

export const create = async (input: InputCreate) => {
  try {
    await client.create.execute(input);
    revalidatePath(Pages.ListClients());
  } catch (error) {
    return errorHandler(error);
  }
};

export const update = async (input: InputUpdate) => {
  try {
    await client.update.execute(input);
    revalidatePath(Pages.ListClients());
    revalidatePath(Pages.InspectClient(input.id));
  } catch (error) {
    return errorHandler(error);
  }
};
