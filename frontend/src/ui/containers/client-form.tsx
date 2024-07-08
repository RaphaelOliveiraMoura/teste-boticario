import { UseFormReturn } from "react-hook-form";

import { Input } from "@/domain/use-cases/client/create";
import {
  cepMask,
  cpfMask,
  dateMask,
  onlyTextWithLimit,
  phoneMask,
} from "@/infra/services/masks";

import { InputText } from "../components/input-text";
import { Separator } from "../shadcn/separator";

type ClientFormProps = {
  form: UseFormReturn<Input>;
};

export function ClientForm({ form }: ClientFormProps) {
  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        <InputText form={form} label="E-mail" name="email" />
        <InputText form={form} label="Nome" name="name" />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <InputText
          form={form}
          label="Nome de usuário para login"
          name="username"
        />
        <InputText form={form} label="Senha" name="password" type="password" />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <InputText form={form} label="CPF" name="cpf" mask={cpfMask} />
        <InputText form={form} label="Telefone" name="phone" mask={phoneMask} />
        <InputText
          form={form}
          label="Data de nascimento"
          name="birthDate"
          mask={dateMask}
        />
      </div>

      <Separator className="my-4" />
      <h3 className="font-bold">Informações de Endereço</h3>

      <div className="grid grid-cols-3 gap-4">
        <InputText form={form} label="CEP" name="cep" mask={cepMask} />
        <InputText
          form={form}
          label="Estado"
          name="state"
          mask={(value) => onlyTextWithLimit(2)(value).toUpperCase()}
        />
        <InputText form={form} label="Cidade" name="city" />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <InputText form={form} label="Bairro" name="neighborhood" />
        <InputText form={form} label="Rua" name="address" />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <InputText form={form} label="Número" name="number" />
        <InputText form={form} label="Complemento" name="complement" />
      </div>
    </>
  );
}
