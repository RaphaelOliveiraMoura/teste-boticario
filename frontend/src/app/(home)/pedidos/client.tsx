"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, PlusCircle } from "lucide-react";
import { useState } from "react";

import { ListItem, Output } from "@/domain/use-cases/order/list";
import { formatCurrency, formatDate } from "@/infra/services/formatters";
import { ConfirmAlert } from "@/ui/components/confim-alert";
import { DataTable } from "@/ui/components/data-table";
import { Link } from "@/ui/components/link";
import { useService } from "@/ui/hooks/use-service";
import { Pages } from "@/ui/pages";
import { Badge } from "@/ui/shadcn/badge";
import { Button } from "@/ui/shadcn/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/ui/shadcn/dropdown-menu";
import { useToast } from "@/ui/shadcn/use-toast";

import { update } from "./[id]/actions";
import { remove } from "./actions";

type PageClientProps = {
  output: Output;
};

export function PageClient({ output }: PageClientProps) {
  const { toast } = useToast();

  const [orderToRemove, setOrderToRemove] = useState<ListItem | undefined>(
    undefined,
  );
  const { onSubmit: handleRemove, isPending: handleRemoveIsPending } =
    useService({
      submit: remove,
      onSuccess: () => {
        toast({ title: "Pedido excluído com sucesso", description: "" });
        setOrderToRemove(undefined);
      },
    });

  const [orderToFinish, setOrderToFinish] = useState<ListItem | undefined>(
    undefined,
  );
  const { onSubmit: handleFinish, isPending: handleFinishIsPending } =
    useService({
      submit: update,
      onSuccess: () => {
        toast({ title: "Pedido finalizado com sucesso", description: "" });
        setOrderToFinish(undefined);
      },
    });

  const columns: ColumnDef<ListItem>[] = [
    {
      accessorKey: "client",
      header: "Cliente",
    },
    {
      accessorKey: "price",
      header: "Preço",
      cell: ({ row }) => formatCurrency(row.original.price),
    },
    {
      accessorKey: "date",
      header: "Data de cadastro",
      cell: ({ row }) => formatDate(new Date(row.original.date)),
    },
    {
      accessorKey: "Status",
      header: "Status",
      cell: ({ row }) =>
        row.original.finished ? (
          <Badge className="bg-green-400">Finalizado</Badge>
        ) : (
          <Badge>Pendente</Badge>
        ),
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
              <Link href={Pages.InspectOrder(row.original.id)}>
                <DropdownMenuItem>Detalhes</DropdownMenuItem>
              </Link>
              {!row.original.finished && (
                <DropdownMenuItem
                  onClick={() => setOrderToFinish(row.original)}
                >
                  Finalizar Pedido
                </DropdownMenuItem>
              )}
              <DropdownMenuItem onClick={() => setOrderToRemove(row.original)}>
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
        <h1 className="text-xl">Listagem de Pedidos</h1>
        <Link href={Pages.CreateOrder()}>
          <Button>
            <PlusCircle className="mr-2" />
            Adicionar
          </Button>
        </Link>
      </div>

      <DataTable data={output.items} columns={columns} />

      {orderToRemove && (
        <ConfirmAlert
          isOpen={!!orderToRemove}
          close={() => setOrderToRemove(undefined)}
          title={`Tem certeza que deseja excluir o pedido do cliente "${orderToRemove.client}"`}
          description="Essa ação é irreversível, caso queira recuperar o pedido não será mais possível"
          onConfirm={() => handleRemove({ id: orderToRemove.id })}
          isPending={handleRemoveIsPending}
        />
      )}

      {orderToFinish && (
        <ConfirmAlert
          isOpen={!!orderToFinish}
          close={() => setOrderToFinish(undefined)}
          title={`Tem certeza que deseja finalizar o pedido do cliente "${orderToFinish.client}"`}
          description="Essa ação é irreversível, caso queira reverter o status do pedido não será mais possível"
          onConfirm={() => handleFinish({ id: orderToFinish.id })}
          isPending={handleFinishIsPending}
        />
      )}
    </section>
  );
}
