export interface UseCase<I, O> {
  execute(input: I): Promise<O>;
}

export abstract class HttpError extends Error {
  public abstract status: number;
}
