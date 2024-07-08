import {
  UpdateClientUseCase,
  Output,
} from "@/domain/use-cases/client/update";
import { freeze } from "@/infra/utils/freeze";

export class UpdateClientMemoryUseCase implements UpdateClientUseCase {
  async execute(): Promise<Output> {
    await freeze();
  }
}
