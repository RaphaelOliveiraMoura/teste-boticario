export interface IHashService {
  hash<T extends Record<string, string>>(value: T): Promise<string>;
  decode<T extends Record<string, string>>(hash: string): Promise<T>;
}
