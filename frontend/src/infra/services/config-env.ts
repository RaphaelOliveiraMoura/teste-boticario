import { IConfigService, EnvType } from "@/domain/services/config";

export class ConfigEnvService implements IConfigService {
  get(key: keyof EnvType): string {
    const value = process.env[key];

    if (value === undefined) throw new Error(`Config key not found ${key}`);

    return value;
  }
}
