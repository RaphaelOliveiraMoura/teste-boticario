import { HttpError } from "@/application";

export class ProductNotFoundError extends HttpError {
  public status = 404;

  constructor(id: string) {
    super(`ProductNotFoundError [${id}]`);
  }
}
