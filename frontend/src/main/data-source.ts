import { AuthFetchDataSource } from "@/infra/data-source/auth-fetch";

import { httpClient } from "./services";

export const authDataSource = new AuthFetchDataSource(httpClient);
