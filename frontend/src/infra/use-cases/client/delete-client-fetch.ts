import { ValidationError } from "@/domain/errors/validation";
import { HttpClient } from "@/domain/services/http-client";
import {
  DeleteClientUseCase,
  Input,
  Output,
} from "@/domain/use-cases/client/delete";

export class DeleteClientFetchUseCase implements DeleteClientUseCase {
  constructor(private readonly httpClient: HttpClient) {}

  async execute(props: Input): Promise<Output> {
    const { status } = await this.httpClient.request({
      method: "DELETE",
      url: `/clients/${props.id}`,
    });

    if (status !== 204) {
      throw new ValidationError();
    }
  }
}
