import { useTransition } from "react";

import { useToast } from "../shadcn/use-toast";

type Props<Input, Output> = {
  submit: (input: Input) => Promise<Output>;
  onSuccess?: () => void;
};

export const useService = <Input, Output extends object>({
  submit,
}: Props<Input, Output>) => {
  const { toast } = useToast();

  const [isPending, startTransition] = useTransition();

  const onSubmit = async (data: Input) => {
    startTransition(async () => {
      const output = await submit(data);

      if (output && "error" in output && typeof output.error === "string") {
        const description =
          "description" in output ? (output.description as string) : undefined;
        toast({ variant: "destructive", title: output.error, description });
      }
    });
  };

  return {
    isPending,
    onSubmit,
  };
};
