import { HttpError } from "@/application";

export class ProductAlreadyCreatedError extends HttpError {
  public status = 400;

  constructor(name: string) {
    super(`ProductAlreadyCreatedError [${name}]`);
  }
}
