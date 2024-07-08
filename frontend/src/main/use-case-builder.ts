import { config } from "./services";

export class MockStrategyUseCase<T> {
  private useCase!: T;
  private mockUseCase!: T;

  constructor() {}

  set(useCase: T) {
    this.useCase = useCase;
    return this;
  }

  mock(mockUseCase: T) {
    this.mockUseCase = mockUseCase;
    return this;
  }

  build() {
    return config.get("USE_MOCKS") === "true" ? this.mockUseCase : this.useCase;
  }
}
