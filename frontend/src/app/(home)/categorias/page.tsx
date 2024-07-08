import { handle } from "./actions";
import { PageClient } from "./client";

export default async function Page() {
  const output = await handle();

  if ("error" in output) {
    return <>erro ao carregar categorias</>;
  }

  return (
    <div>
      <PageClient output={output} />
    </div>
  );
}
