import { CreatePageKey } from "@/ui/pages";

import { handle } from "./actions";
import { PageClient } from "./client";
import { handle as handleProducts } from "../../produtos/actions";

type PageProps = {
  params: {
    id: string;
  };
};

export default async function Page({ params }: PageProps) {
  const id = params.id;
  const isCreating = params.id === CreatePageKey;
  const output = !isCreating ? await handle({ id }) : undefined;

  if (output && "error" in output) {
    return <>erro ao carregar detalhes do produto</>;
  }

  const products = await handleProducts();

  if (products && "error" in products) {
    return <>erro ao carregar produtos</>;
  }

  return (
    <div>
      <PageClient
        id={id}
        isCreating={isCreating}
        defaultValues={
          output ?? {
            products: [
              {
                quantity: "1",
                product: { label: "", value: "" },
              },
            ],
          }
        }
        products={products.items}
      />
    </div>
  );
}
