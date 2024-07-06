import jwt from "jsonwebtoken";

import { IConfigService } from "@/domain/services/config";
import { IHashService } from "@/domain/services/hash";

export class HashJwtService implements IHashService {
  constructor(private readonly configService: IConfigService) {}

  async hash<T extends Record<string, string>>(value: T): Promise<string> {
    return jwt.sign(value, this.configService.get("PRIVATE_KEY"));
  }

  async decode<T extends Record<string, string>>(hash: string): Promise<T> {
    const value = jwt.verify(hash, this.configService.get("PRIVATE_KEY"));
    return value as T;
  }
}
