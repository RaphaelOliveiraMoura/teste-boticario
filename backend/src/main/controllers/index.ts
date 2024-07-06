import { IHttpServer } from "@/domain/services/http-server";

export interface Controller {
  route(httpServer: IHttpServer): void;
}
