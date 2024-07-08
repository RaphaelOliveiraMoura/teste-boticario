"use server";

import { Input } from "@/domain/use-cases/client/delete";
import { errorHandler } from "@/infra/services/error-handler";
import { client } from "@/main/use-cases";

export const handle = async () => {
  try {
    return await client.list.execute();
  } catch (error) {
    return errorHandler(error);
  }
};

export const remove = async (input: Input) => {
  try {
    await client.delete.execute(input);
  } catch (error) {
    return errorHandler(error);
  }
};
