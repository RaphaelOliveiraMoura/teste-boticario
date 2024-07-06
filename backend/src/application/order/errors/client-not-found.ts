import { HttpError } from "@/application";

export class ClientNotFoundError extends HttpError {
  public status = 404;

  constructor(id: string) {
    super(`ClientNotFoundError [${id}]`);
  }
}
