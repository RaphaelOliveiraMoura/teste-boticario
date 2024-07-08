"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, PlusCircle } from "lucide-react";
import { useState } from "react";

import { ListItem, Output } from "@/domain/use-cases/product/list";
import { formatCurrency, formatDate } from "@/infra/services/formatters";
import { ConfirmAlert } from "@/ui/components/confim-alert";
import { DataTable } from "@/ui/components/data-table";
import { Link } from "@/ui/components/link";
import { useService } from "@/ui/hooks/use-service";
import { Pages } from "@/ui/pages";
import { Button } from "@/ui/shadcn/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/ui/shadcn/dropdown-menu";
import { useToast } from "@/ui/shadcn/use-toast";

import { remove } from "./actions";

type PageClientProps = {
  output: Output;
};

export function PageClient({ output }: PageClientProps) {
  const { toast } = useToast();

  const [productToRemove, setProductToRemove] = useState<ListItem | undefined>(
    undefined,
  );
  const { onSubmit: handleRemove, isPending: handleRemoveIsPending } =
    useService({
      submit: remove,
      onSuccess: () => {
        toast({ title: "Produto excluído com sucesso", description: "" });
        setProductToRemove(undefined);
      },
    });

  const columns: ColumnDef<ListItem>[] = [
    {
      accessorKey: "name",
      header: "Nome",
    },
    {
      accessorKey: "price",
      header: "Preço",
      cell: ({ row }) => formatCurrency(row.original.price),
    },
    {
      accessorKey: "stock",
      header: "Qtd. Estoque",
    },
    {
      accessorKey: "createdAt",
      header: "Data de cadastro",
      cell: ({ row }) => formatDate(new Date(row.original.createdAt)),
    },
    {
      id: "actions",
      cell: ({ row }) => {
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Ações</DropdownMenuLabel>
              <Link href={Pages.InspectProduct(row.original.id)}>
                <DropdownMenuItem>Editar</DropdownMenuItem>
              </Link>
              <DropdownMenuItem
                onClick={() => setProductToRemove(row.original)}
              >
                Excluir
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  return (
    <section>
      <div className="my-4 flex items-center justify-between">
        <h1 className="text-xl">Listagem de Produtos</h1>
        <Link href={Pages.CreateProduct()}>
          <Button>
            <PlusCircle className="mr-2" />
            Adicionar
          </Button>
        </Link>
      </div>

      <DataTable data={output.items} columns={columns} />

      {productToRemove && (
        <ConfirmAlert
          isOpen={!!productToRemove}
          close={() => setProductToRemove(undefined)}
          title={`Tem certeza que deseja excluir o item "${productToRemove.name}"`}
          description="Essa ação é irreversível, caso queira recuperar o produto não será mais possível"
          onConfirm={() => handleRemove({ id: productToRemove.id })}
          isPending={handleRemoveIsPending}
        />
      )}
    </section>
  );
}
