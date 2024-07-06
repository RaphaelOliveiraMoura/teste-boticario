export class CategoryNotFoundError extends Error {
  constructor(id: string) {
    super(`CategoryNotFoundError [${id}]`);
  }
}
