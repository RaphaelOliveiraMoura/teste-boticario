export interface HttpCallbackParamsTypes {
  Headers?: Record<string, string>;
  Body?: object;
  Params?: Record<string, string>;
}

export type CallbackFunction<T extends HttpCallbackParamsTypes> = (props: {
  headers: T["Headers"];
  body: T["Body"];
  params: T["Params"];
}) => Promise<{ data: unknown; status: number }>;

export interface IHttpServer {
  listen(port: number): void;

  bind<T extends HttpCallbackParamsTypes>(
    method: "POST" | "GET" | "PUT" | "DELETE",
    path: string,
    callback: CallbackFunction<T>,
  ): void;
}
