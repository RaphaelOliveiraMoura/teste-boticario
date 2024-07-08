import {
  InspectClientUseCase,
  Output,
} from "@/domain/use-cases/client/inspect";
import { freeze } from "@/infra/utils/freeze";

export class InspectClientMemoryUseCase implements InspectClientUseCase {
  async execute(): Promise<Output> {
    await freeze();
    return {
      id: "",
      username: "",
      password: "",
      phone: "",
      name: "",
      cpf: "",
      email: "",
      birthDate: new Date().toISOString(),
      cep: "",
      state: "",
      city: "",
      neighborhood: "",
      address: "",
      number: "",
      complement: "",
    };
  }
}
