export interface IDbConnectionService {
  initialize: () => Promise<void>;
  rawQuery: (sql: string) => Promise<void>;
}
