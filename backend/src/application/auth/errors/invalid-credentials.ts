import { HttpError } from "@/application";

export class InvalidCredentialsError extends HttpError {
  public status = 401;

  constructor() {
    super(`InvalidCredentialsError`);
  }
}
