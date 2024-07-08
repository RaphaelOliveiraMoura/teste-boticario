"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeftCircle, MinusCircle, PlusCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useFieldArray, useForm } from "react-hook-form";

import { FormType, formSchema } from "@/domain/use-cases/order/create";
import { ListItem as ProductItem } from "@/domain/use-cases/product/list";
import { justNumbers } from "@/infra/services/masks";
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
  products: ProductItem[];
};

export function PageClient({
  defaultValues,
  isCreating,
  id,
  products,
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

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "products",
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
          <ul className="m-auto flex w-full max-w-[800px] flex-col gap-4">
            <li className="grid w-full grid-cols-[2fr_1fr_40px] gap-6 font-bold">
              <span>Produto</span>
              <span>Quantidade</span>
              <div></div>
            </li>
            {fields.map((field, index) => (
              <li
                key={field.id}
                className="grid w-full grid-cols-[2fr_1fr_auto] gap-6"
              >
                <InputSelect
                  form={form}
                  label=""
                  name={`products.${index}.product`}
                  showClearOption={false}
                  options={products.map((product) => ({
                    label: product.name,
                    value: product.id,
                  }))}
                />
                <InputText
                  form={form}
                  label=""
                  name={`products.${index}.quantity`}
                  type="number"
                  mask={justNumbers}
                />

                <Button
                  size="icon"
                  onClick={() => remove(index)}
                  className="mt-2"
                >
                  <MinusCircle />
                </Button>
              </li>
            ))}
            <li>
              <Button
                variant="outline"
                onClick={() =>
                  append({
                    quantity: "1",
                    product: { label: "", value: "" },
                  })
                }
              >
                <PlusCircle className="mr-2" />
                Adicionar produto
              </Button>
            </li>
          </ul>

          <Button disabled={isPending} type="submit" className="self-end">
            {isCreating ? "Finalizar pedido" : "Atualizar"}
          </Button>
        </div>
      </Form>
    </section>
  );
}
