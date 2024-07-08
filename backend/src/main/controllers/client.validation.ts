export interface ClientBody {
  email: string;
  username: string;
  name: string;
  password: string;
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

export const validateBody = async (body: ClientBody) => {
  const errors = [];
  if (!body.email) errors.push("email is required");
  if (!body.email.includes("@")) errors.push("email not valid");
  if (body.email.length > 50)
    errors.push("email must be lower then 50 characters");

  if (!body.username) errors.push("username is required");
  if (body.username.length > 15)
    errors.push("username must be lower then 15 characters");

  if (!body.password) errors.push("password is required");
  if (body.password.length < 8)
    errors.push("password must be at least 8 characters");

  if (!body.cpf) errors.push("cpf is required");
  if (body.cpf.length !== 11) errors.push("cpf invalid");

  if (!body.phone) errors.push("phone is required");
  if (body.phone.length > 11) errors.push("phone invalid");

  if (!body.birthDate) errors.push("birthDate is required");

  if (!body.address.cep) errors.push("address.cep is required");
  if (body.address.cep.length !== 8) errors.push("cep invalid");

  if (!body.address.state) errors.push("address.state is required");
  if (body.address.state.length !== 2) errors.push("state invalid");

  if (!body.address.city) errors.push("address.city is required");
  if (body.address.city.length > 30)
    errors.push("address.city must be lower then 30 characters");

  if (!body.address.neighborhood)
    errors.push("address.neighborhood is required");
  if (body.address.neighborhood.length > 30)
    errors.push("address.neighborhood must be lower then 30 characters");

  if (!body.address.address) errors.push("address.address is required");
  if (body.address.address.length > 100)
    errors.push("address.address must be lower then 100 characters");

  if (!body.address.number) errors.push("address.number is required");
  if (body.address.number.length > 10)
    errors.push("address.number must be lower then 10 characters");

  if (!body.address.complement) errors.push("address.complement is required");
  if (body.address.complement.length > 100)
    errors.push("address.complement must be lower then 100 characters");

  return { valid: errors.length === 0, errors };
};
