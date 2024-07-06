import { HttpError } from "@/application";

export class OrderNotFoundError extends HttpError {
  public status = 404;

  constructor(id: string) {
    super(`OrderNotFoundError [${id}]`);
  }
}
