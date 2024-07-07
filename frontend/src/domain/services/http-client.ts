export interface HttpClient {
  request<T>(params: {
    method: "GET" | "POST" | "PUT" | "DELETE";
    url: string;
    headers?: Record<string, string>;
    body?: any;
  }): Promise<{ data: T; status: number }>;
}
