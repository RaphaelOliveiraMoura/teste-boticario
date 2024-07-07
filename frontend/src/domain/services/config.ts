export interface EnvType {
  API_BASE_URL: string;
  USE_MOCKS: string;
}

export interface IConfigService {
  get(key: keyof EnvType): string;
}
