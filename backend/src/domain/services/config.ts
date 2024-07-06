export interface EnvType {
  PORT: string;
  DB_CONNECION_URL: string;
  PRIVATE_KEY: string;
}

export interface IConfigService {
  get(key: keyof EnvType): string;
}
