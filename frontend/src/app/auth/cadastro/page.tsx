"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import { formSchema, Input } from "@/domain/use-cases/sign-up";
import { Form } from "@/ui/components/form";
import { Link } from "@/ui/components/link";
import { ClientForm } from "@/ui/containers/client-form";
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
            <ClientForm form={form} />
            <Button disabled={isPending} type="submit">
              Cadastrar
            </Button>
          </div>
        </Form>
      </CardContent>
    </Card>
  );
}
