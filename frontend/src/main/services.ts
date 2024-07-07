import { ConfigEnvService } from "@/infra/services/config-env";
import { HttpClientFetch } from "@/infra/services/http-client-fetch";

export const config = new ConfigEnvService();
export const httpClient = new HttpClientFetch(config);
