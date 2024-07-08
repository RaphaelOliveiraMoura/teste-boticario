import { CreatePageKey } from "@/ui/pages";

import { handle } from "./actions";
import { PageClient } from "./client";
import { handle as handleCategories } from "../../categories/actions";

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

  const categories = await handleCategories();

  if (categories && "error" in categories) {
    return <>erro ao carregar categorias</>;
  }

  return (
    <div>
      <PageClient
        id={id}
        isCreating={isCreating}
        defaultValues={
          output ?? {
            name: "",
            image: "",
            price: "",
            stock: "",
            description: "",
            category: { label: "", value: "" },
          }
        }
        categories={categories.items}
      />
    </div>
  );
}
