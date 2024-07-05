export interface EnvType {
  DB_CONNECION_URL: boolean;
}

export interface ConfigService {
  get(key: keyof EnvType): string;
}
