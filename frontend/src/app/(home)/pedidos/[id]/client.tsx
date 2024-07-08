"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeftCircle, MinusCircle, PlusCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useFieldArray, useForm, useWatch } from "react-hook-form";

import { FormType, formSchema } from "@/domain/use-cases/order/create";
import { ListItem as ProductItem } from "@/domain/use-cases/product/list";
import { formatCurrency } from "@/infra/services/formatters";
import { justNumbers } from "@/infra/services/masks";
import { Form } from "@/ui/components/form";
import { InputSelect } from "@/ui/components/input-select";
import { InputText } from "@/ui/components/input-text";
import { Link } from "@/ui/components/link";
import { useService } from "@/ui/hooks/use-service";
import { Pages } from "@/ui/pages";
import { Button } from "@/ui/shadcn/button";
import { useToast } from "@/ui/shadcn/use-toast";
import { cn } from "@/ui/utils";

import { create } from "./actions";

type PageClientProps = {
  id: string;
  defaultValues: FormType;
  isCreating: boolean;
  products: ProductItem[];
};

export function PageClient({
  defaultValues,
  isCreating,
  products,
}: PageClientProps) {
  const router = useRouter();
  const { toast } = useToast();

  const { isPending, onSubmit } = useService({
    submit: create,
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

  const watchedProducts = useWatch({ control: form.control, name: "products" });
  const watchedFields = fields.map((field, index) => {
    return { ...field, ...watchedProducts[index] };
  });

  const total = watchedProducts.reduce((acc, item) => {
    const product = products.find((p) => p.id === item.product.value);
    if (!product) return acc;
    return +product.price * +item.quantity + acc;
  }, 0);

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
            <li className="grid w-full grid-cols-[100px_2fr_100px_40px] gap-6 font-bold">
              <span>Quantidade</span>
              <span>Produto</span>
              <span>Valor</span>
              <span></span>
            </li>
            {watchedFields.map((field, index) => {
              const product = products.find(
                ({ id }) => id === field.product.value,
              );
              return (
                <li
                  key={field.id}
                  className="grid w-full grid-cols-[100px_2fr_100px_40px] items-center gap-6"
                >
                  <InputText
                    form={form}
                    label=""
                    name={`products.${index}.quantity`}
                    type="number"
                    mask={justNumbers}
                  />
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
                  <div>
                    {product
                      ? formatCurrency(product.price * +field.quantity)
                      : "-"}
                  </div>
                  <Button
                    size="icon"
                    onClick={() => remove(index)}
                    className={cn("mt-2", !isCreating && "invisible")}
                  >
                    <MinusCircle />
                  </Button>
                </li>
              );
            })}
            {isCreating && (
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
            )}
          </ul>

          <strong className="mt-6 text-center text-lg">
            Valor total: {formatCurrency(total)}
          </strong>

          {isCreating && (
            <Button disabled={isPending} type="submit" className="self-end">
              Finalizar pedido
            </Button>
          )}
        </div>
      </Form>
    </section>
  );
}
