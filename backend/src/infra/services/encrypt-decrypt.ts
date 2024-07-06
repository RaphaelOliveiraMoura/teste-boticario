import bcrypt from "bcrypt";

import { IEncryptService } from "@/domain/services/encrypt";

export class EncryptDecryptService implements IEncryptService {
  SALT_ROUNDS = 10;

  async encrypt(value: string): Promise<string> {
    return bcrypt.hash(value, this.SALT_ROUNDS);
  }

  async compare(encrypted: string, raw: string): Promise<boolean> {
    return bcrypt.compare(raw, encrypted);
  }
}
