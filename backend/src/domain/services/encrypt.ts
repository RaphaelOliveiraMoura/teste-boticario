export interface IEncryptService {
  encrypt(value: string): Promise<string>;
  compare(encrypted: string, raw: string): Promise<boolean>;
}
