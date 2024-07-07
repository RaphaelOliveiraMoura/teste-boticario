"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { formSchema, Input } from "@/domain/use-cases/sign-in";
import { Form } from "@/ui/components/form";
import { InputText } from "@/ui/components/input-text";
import { Link } from "@/ui/components/link";
import { useService } from "@/ui/hooks/use-service";
import { Pages } from "@/ui/pages";
import { Button } from "@/ui/shadcn/button";
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/ui/shadcn/card";

import { submit } from "./actions";

export default function Page() {
  const { isPending, onSubmit } = useService({ submit });

  const form = useForm<Input>({
    resolver: zodResolver(formSchema),
    disabled: isPending,
    defaultValues: {
      username: "",
      password: "",
    },
  });

  return (
    <>
      <CardHeader>
        <CardTitle>Faça seu login</CardTitle>
        <CardDescription>
          Utilize o seu usuário se senha para acessar a plataforma
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form} onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-5">
            <InputText form={form} label="Usuário" name="username" />
            <InputText
              form={form}
              label="Senha"
              name="password"
              type="password"
            />

            <Button disabled={isPending} type="submit">
              Entrar
            </Button>
          </div>
        </Form>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Link href={Pages.SignUp()}>Não possuo cadastro</Link>
      </CardFooter>
    </>
  );
}
