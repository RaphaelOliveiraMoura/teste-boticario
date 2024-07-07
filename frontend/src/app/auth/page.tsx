"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";

import { formSchema } from "@/domain/use-cases/sign-in";
import { Form } from "@/ui/components/form";
import { InputText } from "@/ui/components/input-text";
import { useService } from "@/ui/hooks/use-service";
import { Pages } from "@/ui/pages";
import { Button } from "@/ui/shadcn/button";

import { submit } from "./actions";

export default function Page() {
  const { isPending, onSubmit } = useService({ submit });

  const form = useForm({
    resolver: zodResolver(formSchema),
    disabled: isPending,
    defaultValues: {
      username: "",
      password: "",
    },
  });

  return (
    <Form {...form} onSubmit={form.handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-5">
        <InputText form={form} label="Usuário" name="username" />
        <InputText form={form} label="Senha" name="password" type="password" />

        <Button disabled={isPending} type="submit">
          Entrar
        </Button>

        <Link href={Pages.SignUp()} className="text-center">
          <button type="button">Não tem cadastro?</button>
        </Link>
      </div>
    </Form>
  );
}
