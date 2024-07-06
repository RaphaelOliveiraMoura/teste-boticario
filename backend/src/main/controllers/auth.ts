import { Controller } from ".";
import { auth } from "../application";

import { IHttpServer } from "@/domain/services/http-server";

export class AuthController implements Controller {
  route(httpServer: IHttpServer): void {
    httpServer.bind<{ Body: { username: string; password: string } }>({
      method: "POST",
      path: "/sign-in",
      handle: async ({ body }) => {
        const data = await auth.signIn.execute(body);
        return { data, status: 200 };
      },
      validate: async ({ body }) => {
        const errors = [];
        if (!body.username) errors.push("username is required");
        if (!body.password) errors.push("password is required");
        return { valid: errors.length === 0, errors };
      },
    });
  }
}
