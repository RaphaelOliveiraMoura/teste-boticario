export interface IDbConnectionService {
  rawQuery: (sql: string) => Promise<void>;
}
