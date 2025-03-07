"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, PlusCircle } from "lucide-react";
import { useState } from "react";

import { ListItem, Output } from "@/domain/use-cases/category/list";
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

  const [categoryToRemove, setCategoryToRemove] = useState<
    ListItem | undefined
  >(undefined);
  const { onSubmit: handleRemove, isPending: handleRemoveIsPending } =
    useService({
      submit: remove,
      onSuccess: () => {
        toast({ title: "Categoria excluído com sucesso", description: "" });
        setCategoryToRemove(undefined);
      },
    });

  const columns: ColumnDef<ListItem>[] = [
    {
      accessorKey: "name",
      header: "Nome",
    },
    {
      accessorKey: "description",
      header: "Descrição",
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
              <Link href={Pages.InspectCategory(row.original.id)}>
                <DropdownMenuItem>Editar</DropdownMenuItem>
              </Link>
              <DropdownMenuItem
                onClick={() => setCategoryToRemove(row.original)}
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
        <h1 className="text-xl">Listagem de Categorias</h1>

        <Link href={Pages.CreateCategory()}>
          <Button>
            <PlusCircle className="mr-2" />
            Adicionar
          </Button>
        </Link>
      </div>

      <DataTable data={output.items} columns={columns} />

      {categoryToRemove && (
        <ConfirmAlert
          isOpen={!!categoryToRemove}
          close={() => setCategoryToRemove(undefined)}
          title={`Tem certeza que deseja excluir o item "${categoryToRemove.name}"`}
          description="Essa ação é irreversível, caso queira recuperar a categoria não será mais possível"
          onConfirm={() => handleRemove({ id: categoryToRemove.id })}
          isPending={handleRemoveIsPending}
        />
      )}
    </section>
  );
}
