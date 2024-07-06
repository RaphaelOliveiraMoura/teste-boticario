import { Controller } from ".";
import { signInUseCase } from "../application";

import { IHttpServer } from "@/domain/services/http-server";

export class AuthController implements Controller {
  route(httpServer: IHttpServer): void {
    httpServer.bind<{ Body: { username: string; password: string } }>(
      "POST",
      "/sign-in",
      async ({ body }) => {
        const data = await signInUseCase.execute(body);
        return { data, status: 200 };
      },
    );
  }
}
