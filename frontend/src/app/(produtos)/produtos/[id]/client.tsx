"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import { ListItem as CategoryItem } from "@/domain/use-cases/category/list";
import { FormType, formSchema } from "@/domain/use-cases/product/create";
import { Form } from "@/ui/components/form";
import { InputSelect } from "@/ui/components/input-select";
import { InputText } from "@/ui/components/input-text";
import { useService } from "@/ui/hooks/use-service";
import { Pages } from "@/ui/pages";
import { Button } from "@/ui/shadcn/button";
import { useToast } from "@/ui/shadcn/use-toast";

import { create, update } from "./actions";

type PageClientProps = {
  id: string;
  defaultValues: FormType;
  isCreating: boolean;
  categories: CategoryItem[];
};

export function PageClient({
  defaultValues,
  isCreating,
  id,
  categories,
}: PageClientProps) {
  const router = useRouter();
  const { toast } = useToast();

  const { isPending, onSubmit } = useService({
    submit: isCreating ? create : (form: FormType) => update({ ...form, id }),
    onSuccess: () => {
      router.push(Pages.ListProducts());

      if (isCreating) {
        toast({ title: "Item cadastrado com sucesso" });
      } else {
        toast({ title: "Item atualizado com sucesso" });
      }
    },
  });

  const form = useForm<FormType>({
    resolver: zodResolver(formSchema),
    disabled: isPending,
    defaultValues,
  });

  return (
    <section>
      <Form {...form} onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-4">
          <InputText form={form} label="Nome do produto" name="name" />
          <InputText
            form={form}
            label="Descrição do produto"
            name="description"
          />
          <InputSelect
            form={form}
            label="Categoria"
            name="category"
            options={categories.map((category) => ({
              label: category.name,
              value: category.id,
            }))}
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
