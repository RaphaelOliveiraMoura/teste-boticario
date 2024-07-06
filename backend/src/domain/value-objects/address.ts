interface AddressProps {
  cep: string;
  state: string;
  city: string;
  neighborhood: string;
  address: string;
  number: string;
  complement: string;
}

export class Address {
  constructor(public readonly props: AddressProps) {}
}
