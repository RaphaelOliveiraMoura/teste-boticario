import { HttpError } from "@/application";

export class InvalidAuthenticationError extends HttpError {
  public status = 401;

  constructor() {
    super(`InvalidAuthenticationError`);
  }
}
