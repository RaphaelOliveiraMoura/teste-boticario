import { HttpError } from "@/application";

export class CategoryNotFoundError extends HttpError {
  public status = 404;

  constructor(id: string) {
    super(`CategoryNotFoundError [${id}]`);
  }
}
