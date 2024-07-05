export interface EnvType {
  DB_CONNECION_URL: boolean;
}

export interface IConfigService {
  get(key: keyof EnvType): string;
}
