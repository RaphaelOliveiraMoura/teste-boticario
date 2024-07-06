export interface InspectClientDto {
  id: string;
  email: string;
  username: string;
  name: string;
  cpf: string;
  phone: string;
  birthDate: string;
  address: {
    cep: string;
    state: string;
    city: string;
    neighborhood: string;
    address: string;
    number: string;
    complement: string;
  };
}

export interface ListClientDto {
  id: string;
  email: string;
  username: string;
  name: string;
  cpf: string;
  phone: string;
  birthDate: string;
}

export interface IClientDataSource {
  inspect(id: string): Promise<InspectClientDto | null>;
  list(): Promise<ListClientDto[]>;
}
