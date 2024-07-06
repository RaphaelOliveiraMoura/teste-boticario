import { Controller } from ".";
import { auth } from "../application";

import { IHttpServer } from "@/domain/services/http-server";

export class AuthController implements Controller {
  route(httpServer: IHttpServer): void {
    httpServer.bind<{ Body: { username: string; password: string } }>(
      { method: "POST", path: "/sign-in" },
      async ({ body }) => {
        const data = await auth.signIn.execute(body);
        return { data, status: 200 };
      },
    );
  }
}
