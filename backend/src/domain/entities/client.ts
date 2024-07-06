import { Address } from "../value-objects/address";
import { Cpf } from "../value-objects/cpf";
import { Email } from "../value-objects/email";
import { Phone } from "../value-objects/phone";

interface ClientProps {
  id: string;
  email: Email;
  username: string;
  name: string;
  password: string;
  cpf: Cpf;
  phone: Phone;
  birthDate: Date;
  address: Address | null;
}

export class Client {
  constructor(public props: ClientProps) {}
}
