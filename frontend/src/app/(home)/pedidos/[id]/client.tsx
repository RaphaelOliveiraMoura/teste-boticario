"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeftCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import { ListItem as CategoryItem } from "@/domain/use-cases/category/list";
import { FormType, formSchema } from "@/domain/use-cases/order/create";
import { Form } from "@/ui/components/form";
import { InputSelect } from "@/ui/components/input-select";
import { InputText } from "@/ui/components/input-text";
import { Link } from "@/ui/components/link";
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
      router.push(Pages.ListOrders());

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
      <header className="mb-8 flex items-center gap-4">
        <Button size="icon" variant="ghost">
          <Link href={Pages.ListOrders()}>
            <ArrowLeftCircle />
          </Link>
        </Button>
        <h1 className="text-xl">
          {isCreating ? "Cadastrar Produto" : "Editar Produto"}
        </h1>
      </header>

      <Form {...form} onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-[1fr_2fr] gap-4">
            <InputText form={form} label="Nome do produto" name="name" />
            <InputText
              form={form}
              label="Descrição do produto"
              name="description"
            />
          </div>

          <div className="grid grid-cols-[1fr_2fr_1fr_1fr] gap-4">
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
          </div>

          <Button disabled={isPending} type="submit" className="self-end">
            {isCreating ? "Cadastrar" : "Atualizar"}
          </Button>
        </div>
      </Form>
    </section>
  );
}
