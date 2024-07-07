export interface EnvType {
  API_BASE_URL: string;
}

export interface IConfigService {
  get(key: keyof EnvType): string;
}
