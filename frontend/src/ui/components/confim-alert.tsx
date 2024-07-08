import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../shadcn/alert-dialog";
import { Button } from "../shadcn/button";

type ConfirmAlertProps = {
  isOpen: boolean;
  close: () => void;
  title: string;
  description: string;
  onConfirm: () => any;
  isPending?: boolean;
};

export function ConfirmAlert({
  title,
  description,
  isOpen,
  close,
  onConfirm,
  isPending,
}: ConfirmAlertProps) {
  return (
    <AlertDialog open={isOpen} onOpenChange={close}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>Cancelar</AlertDialogCancel>
          <Button disabled={isPending} onClick={() => onConfirm()}>
            Confirmar
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
