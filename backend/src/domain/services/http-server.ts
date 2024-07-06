import { Client } from "../entities/client";

export interface HttpCallbackParamsTypes {
  Headers?: Record<string, string>;
  Body?: object;
  Params?: Record<string, string>;
}

interface Props<T extends HttpCallbackParamsTypes> {
  headers: T["Headers"];
  body: T["Body"];
  params: T["Params"];
}

export type CallbackFunction<
  T extends HttpCallbackParamsTypes,
  RequireAuth extends boolean,
> = (
  props: Props<T> & (RequireAuth extends true ? { client: Client } : object),
) => Promise<{ data: unknown; status: number }>;

export type CallbackValidateFunction<T extends HttpCallbackParamsTypes> = (
  props: Props<T>,
) => Promise<{ data: unknown; status: number }>;

export interface IHttpServer {
  listen(port: number): void;

  bind<T extends HttpCallbackParamsTypes>(
    params: {
      method: "POST" | "GET" | "PUT" | "DELETE";
      path: string;
      validate?: CallbackValidateFunction<T>;
    } & (
      | { handleWithAuth: CallbackFunction<T, true> }
      | { handle: CallbackFunction<T, false> }
    ),
  ): void;
}
