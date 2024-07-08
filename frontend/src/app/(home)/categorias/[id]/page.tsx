import { CreatePageKey } from "@/ui/pages";

import { handle } from "./actions";
import { PageClient } from "./client";

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

  return (
    <div>
      <PageClient
        id={id}
        isCreating={isCreating}
        defaultValues={output ?? { name: "", description: "" }}
      />
    </div>
  );
}
