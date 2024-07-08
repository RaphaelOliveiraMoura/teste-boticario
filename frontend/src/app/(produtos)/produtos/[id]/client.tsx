"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { FormType, formSchema } from "@/domain/use-cases/product/create";
import { Form } from "@/ui/components/form";
import { InputText } from "@/ui/components/input-text";
import { useService } from "@/ui/hooks/use-service";
import { Button } from "@/ui/shadcn/button";

import { create, update } from "./actions";

type PageClientProps = {
  id: string;
  defaultValues: FormType;
  isCreating: boolean;
};

export function PageClient({ defaultValues, isCreating, id }: PageClientProps) {
  const { isPending, onSubmit } = useService({
    submit: isCreating ? create : (form: FormType) => update({ ...form, id }),
  });

  const form = useForm<FormType>({
    resolver: zodResolver(formSchema),
    disabled: isPending,
    defaultValues,
  });

  return (
    <section>
      <Form {...form} onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-5">
          <InputText form={form} label="Nome do produto" name="name" />
          <InputText
            form={form}
            label="Descrição do produto"
            name="description"
          />
          <InputText
            form={form}
            label="URL com imagem do produto"
            name="image"
          />
          <InputText form={form} label="Valor do produto" name="price" />
          <InputText form={form} label="Quantidade em estoque" name="stock" />

          <Button disabled={isPending} type="submit">
            Atualizar
          </Button>
        </div>
      </Form>
    </section>
  );
}
