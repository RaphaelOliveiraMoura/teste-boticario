export class CategoryAlreadyCreatedError extends Error {
  constructor(name: string) {
    super(`CategoryAlreadyCreatedError ${name}`);
  }
}
