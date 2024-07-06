import { HttpError } from "@/application";

export class CategoryAlreadyCreatedError extends HttpError {
  public status = 400;

  constructor(name: string) {
    super(`CategoryAlreadyCreatedError [${name}]`);
  }
}
