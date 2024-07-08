import { cookies } from "next/headers";

import { InvalidAuthError } from "@/domain/errors/invliad-auth";
import { IConfigService } from "@/domain/services/config";
import { HttpClient } from "@/domain/services/http-client";

export class HttpClientFetch implements HttpClient {
  private baseUrl: string;

  constructor(private readonly configService: IConfigService) {
    this.baseUrl = configService.get("API_BASE_URL");
  }

  async request<T>(params: {
    method: "GET" | "POST" | "PUT" | "DELETE";
    url: string;
    headers?: Record<string, string> | undefined;
    body?: any;
  }): Promise<{ data: T; status: number }> {
    const token = cookies().get("token");

    const body = params.body ? JSON.stringify(params.body) : undefined;

    console.info(`[${params.method} ${params.url}]`, { body });

    const response = await fetch(this.baseUrl + params.url, {
      method: params.method,
      headers: {
        ...(body ? { "Content-Type": "application/json" } : {}),
        Authorization: token?.value ?? "",
        ...params.headers,
      },
      body,
    });

    const data = await response.json().catch(() => undefined);
    const status = response.status;

    console.info(`[${params.method} ${params.url}]`, { data, status });

    if (status === 401) {
      throw new InvalidAuthError();
    }

    return { data, status };
  }
}
