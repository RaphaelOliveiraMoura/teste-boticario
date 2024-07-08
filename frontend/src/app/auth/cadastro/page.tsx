"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import { formSchema, Input } from "@/domain/use-cases/sign-up";
import {
  cepMask,
  cpfMask,
  dateMask,
  onlyTextWithLimit,
  phoneMask,
} from "@/infra/services/masks";
import { Form } from "@/ui/components/form";
import { InputText } from "@/ui/components/input-text";
import { Link } from "@/ui/components/link";
import { useService } from "@/ui/hooks/use-service";
import { Pages } from "@/ui/pages";
import { Button } from "@/ui/shadcn/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/ui/shadcn/card";
import { Separator } from "@/ui/shadcn/separator";
import { useToast } from "@/ui/shadcn/use-toast";

import { submit } from "./actions";

export default function Page() {
  const router = useRouter();
  const { toast } = useToast();

  const { isPending, onSubmit } = useService({
    submit,
    onSuccess: () => {
      router.push(Pages.SignIn());
      toast({ title: "Usuário cadastrado com sucesso" });
    },
  });

  const defaultValues: Input = {
    username: "",
    email: "",
    cpf: "",
    name: "",
    password: "",
    phone: "",
    birthDate: "",
    cep: "",
    state: "",
    city: "",
    neighborhood: "",
    address: "",
    number: "",
    complement: "",
  };

  const form = useForm<Input>({
    resolver: zodResolver(formSchema),
    disabled: isPending,
    defaultValues,
  });

  return (
    <Card className="w-full max-w-[800px] flex-1">
      <CardHeader>
        <CardTitle className="flex justify-between">
          <div>Faça seu cadastro</div>

          <div className="text-base font-normal">
            <Link href={Pages.SignIn()}>Já tenho cadastro</Link>
          </div>
        </CardTitle>
        <CardDescription>
          Crie seu usuário e desfrute de todos os recursos do nosso sistema
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form} onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-4">
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
              <InputText
                form={form}
                label="Senha"
                name="password"
                type="password"
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <InputText form={form} label="CPF" name="cpf" mask={cpfMask} />
              <InputText
                form={form}
                label="Telefone"
                name="phone"
                mask={phoneMask}
              />
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

            <Button disabled={isPending} type="submit">
              Cadastrar
            </Button>
          </div>
        </Form>
      </CardContent>
    </Card>
  );
}
