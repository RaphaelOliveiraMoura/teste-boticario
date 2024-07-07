export interface AuthDataSource {
  getAuthToken(props: Props): Promise<Result>;
}

type Props = { login: string; password: string };
type Result = { token: string };
