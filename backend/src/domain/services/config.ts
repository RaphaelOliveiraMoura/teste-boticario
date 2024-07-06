export interface EnvType {
  PORT: string;
  DB_CONNECION_URL: string;
}

export interface IConfigService {
  get(key: keyof EnvType): string;
}
