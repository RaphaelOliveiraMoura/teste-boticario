import { HttpError } from "@/application";

export class ClientAlreadyCreatedError extends HttpError {
  public status = 400;

  constructor(name: string) {
    super(`ClientAlreadyCreatedError [${name}]`);
  }
}
